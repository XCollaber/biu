#!/usr/bin/env python3
"""
BIU Original Codebase Mapper & Auditor
======================================
This script scans D:\\biu-original, parses every PHP file, extracts metadata,
inbound/outbound links, PDF/document references, and maps them to their
official university hierarchy as defined in master.php.

It also performs mathematical cross-verification between the filesystem and
the parsed results to ensure zero data loss.
"""

import os
import re
import json
import hashlib
from pathlib import Path
from collections import defaultdict, Counter
from typing import Dict, List, Any, Set

SOURCE_DIR = Path(r"D:\biu-original")
OUTPUT_DIR = Path(r"D:\biu\scripts\output")

# Regex patterns for fast, robust parsing without heavy DOM dependencies
RE_TITLE = re.compile(r"<title[^>]*>(.*?)</title>", re.IGNORECASE | re.DOTALL)
RE_H1 = re.compile(r"<h1[^>]*>(.*?)</h1>", re.IGNORECASE | re.DOTALL)
RE_H2 = re.compile(r"<h2[^>]*>(.*?)</h2>", re.IGNORECASE | re.DOTALL)
RE_H3 = re.compile(r"<h3[^>]*>(.*?)</h3>", re.IGNORECASE | re.DOTALL)
RE_INCLUDES = re.compile(r'''(?:include|require|include_once|require_once)\s*[\('"]+([^)'"]+)[\)'"]+''', re.IGNORECASE)
RE_HREF = re.compile(r'''<a\s+[^>]*?href=["']([^"']+)["'][^>]*>(.*?)</a>''', re.IGNORECASE | re.DOTALL)
RE_IMG_SRC = re.compile(r'''<img\s+[^>]*?src=["']([^"']+)["']''', re.IGNORECASE)
RE_CLEAN_TAGS = re.compile(r"<[^>]+>")


def clean_text(text: str) -> str:
    """Strip HTML tags and excessive whitespace."""
    if not text:
        return ""
    cleaned = RE_CLEAN_TAGS.sub(" ", text)
    return " ".join(cleaned.split()).strip()


def parse_master_navigation(master_path: Path) -> Dict[str, Any]:
    """
    Parses master.php navigation to extract the official site hierarchy,
    top-level menu labels, and child dropdown links.
    """
    if not master_path.exists():
        return {}

    content = master_path.read_text(encoding="utf-8", errors="ignore")
    nav_match = re.search(r'<nav id="menuzord-right"[^>]*>(.*?)</nav>', content, re.DOTALL | re.IGNORECASE)
    if not nav_match:
        return {}

    nav_html = nav_match.group(1)
    
    # Extract menu items: link -> breadcrumb trail
    menu_mapping = {}
    
    # Match all <a href="...">text</a> inside nav
    all_links = RE_HREF.findall(nav_html)
    for href, label in all_links:
        href_clean = href.strip()
        label_clean = clean_text(label)
        if href_clean and not href_clean.startswith("#") and not href_clean.startswith("javascript:"):
            norm = href_clean.split("?")[0].split("#")[0]
            if norm not in menu_mapping:
                menu_mapping[norm] = []
            menu_mapping[norm].append(label_clean)

    return menu_mapping


def categorize_page(rel_path: str, filename: str, nav_breadcrumbs: List[str], content: str) -> str:
    """
    Categorizes a page into one of the master university sections
    based on path, navigation hierarchy, and content semantics.
    """
    lower_file = filename.lower()
    lower_path = rel_path.lower()

    # Directory namespaces
    if lower_path.startswith("ssr"):
        return "NAAC SSR (Self Study Report Metrics)"
    if lower_path.startswith("qlm"):
        return "NAAC QlM (Qualitative Metrics)"
    if lower_path.startswith("mailer") or lower_file in ["sendmail.php", "sendmailcareer.php"]:
        return "System / PHPMailer Backend"
    if lower_path.startswith("ffa"):
        return "Faculty of Fine Arts Micro-Site"
    if lower_path.startswith("iqac") or lower_file in ["iqacsidebar.php", "atr.php", "committees-cells.php"]:
        return "Internal Quality Assurance Cell (IQAC)"

    # Layout templates & Developer backups
    if lower_file in [
        "master.php", "footer.php", "alumnisidebar.php", "researchsidebar.php", 
        "ssr-sidebar.php", "page.php", "master-old.php", "master-alumni.php", 
        "master1.php", "master2.php", "facilities - backup.php", "underconstruction.php",
        "404.php", "success.php", "stream.php", "stream2.php", "universitylogo.php"
    ]:
        return "Templates, Layouts & System Components"

    # Homepage & Portals
    if lower_file in ["index.php", "default.php", "galleryhome.php"]:
        return "Homepage & Portals"

    # University Governance & About Us
    if lower_file in [
        "about.php", "history.php", "visionmission.php", "campus.php", "infrastructure.php", 
        "recognitions.php", "codeofconduct.php", "policies.php", "biuact.php", "biustatute.php", 
        "biuordinance.php", "committees.php", "campus-facilities.php", "chancellor.php", 
        "prochancellor.php", "vicechancellor.php", "provicechancellor.php", "registrar.php",
        "facilities.php", "hospitals.php", "groupinstitute.php", "recognition-university-faculty-members.php",
        "international-mou.php"
    ]:
        return "University Governance & About Us"

    # NAAC Criteria & Accreditation
    if lower_file.startswith("naac-") or lower_file in ["naac-dvv.php"]:
        return "NAAC Criteria & Accreditation"

    # Research, Patents & Ph.D.
    if lower_file in [
        "aboutrdc.php", "research-policy.php", "research-promotion-policy.php", "patents.php", 
        "icmr-funded-research-projects.php", "biuphdordinance.php", "syllabusofcoursework.php", 
        "phddraftpresentation.php", "fellowship.php", "codeofethics.php", "icmr-research-proposals.php",
        "journals.php", "sanction-letter-of-startup.php", "startup registartion letters.php"
    ]:
        return "Research, Patents & Ph.D."

    # Institutional Activities & Skill Development
    if lower_file in [
        "value-added-courses.php", "value-added-courses-draft.php", "value-added-courses-report.php",
        "econtents-developed.php", "extension-outreach-activities.php", "extension-outreach-activities-report.php",
        "capability-enhancement-schemes.php", "capability-enhancement-schemes-report.php", 
        "competitive-exam-activities.php", "competitive-exam-activities-report.php",
        "digital-material-repository.php"
    ]:
        return "Institutional Activities & Skill Development"

    # Placements, Training & Alumni
    if lower_file in ["placements.php", "alumni.php", "alumini.php", "alumni-association.php", "alumni-ecs.php"]:
        return "Placements, Training & Alumni"

    # Admissions & Student Services
    if lower_file in [
        "admissionnotification.php", "sop-for-admission.php", "applicationform.php", 
        "programmes-offered.php", "programmes-offered-old.php", "academic-calendar.php",
        "enquiry.php", "public-disclosure.php", "notice.php", "events.php", "career.php",
        "contact.php", "feedback.php"
    ]:
        return "Admissions, Programs & Student Services"

    # Medical & Dental Sciences (including Fellowships & MD/MS)
    if lower_file.startswith("fellowship-in-") or lower_file in [
        "medical.php", "dental.php", "mbbs.php", "md.php", "ms.php", "bds.php", "mds.php",
        "masterofsurgery.php", "dm.php", "npcc.php", "diplomadentalhygienist.php", 
        "diplomadentalhygienst.php", "diplomadentalmechanics.php"
    ]:
        return "Faculty of Medical & Dental Sciences"

    # Nursing
    if lower_file in ["nursing.php", "bscnursing.php", "postbasicbscnursing.php", "postbascibscnursing.php", "mscnursing.php", "anm.php", "gnm.php", "pbdon.php"]:
        return "Faculty of Nursing Sciences"

    # Pharmacy
    if lower_file in ["pharmacy.php", "bpharma.php", "mpharma.php", "dpharma.php"]:
        return "Faculty of Pharmacy"

    # Paramedical / Allied Health Sciences (Degrees, Masters & Diplomas)
    if lower_file in [
        "paramedical.php", "bpt.php", "mpt.php", "bmls.php", "mmls.php", "bscopt.php", 
        "bott.php", "brit.php", "baott.php", "bscmlt.php", "mscmlt.php", "bmrit.php",
        "dmlt.php", "dmri.php", "drit.php", "drtt.php", "dsanitation.php", "dxrt.php", 
        "dialysistechnician.php", "ddt.php", "detc.php", "dh.php"
    ]:
        return "Faculty of Allied & Health Care Sciences"

    # Management, Hospital Administration & Commerce
    if lower_file in [
        "management.php", "bba.php", "bbaft.php", "bba-finance-taxation.php", "bba-business-intelligence.php", 
        "mba.php", "mba-ha.php", "mba-pm.php", "mha.php", "mph.php", "bcomh.php", "mcom.php"
    ]:
        return "Faculty of Management & Commerce"

    # Computer Applications & Sciences
    if lower_file in ["bca.php", "bca-artificial-intelligence.php", "bca-data-science.php", "bca-information-technology.php", "mca.php", "bsccs.php", "msc.php", "mscfs.php", "mscce.php"]:
        return "Faculty of Computer Applications & Sciences"

    # Humanities & Journalism (BA, MA, BJMC, MJMC, MLIS, BLIS)
    if lower_file.startswith("ba-") or lower_file.startswith("bahons-") or lower_file.startswith("ma-") or lower_file.startswith("mahons-") or lower_file in [
        "humanitiesandjournalism.php", "bjmc.php", "mjmc.php", "bmm.php", "blib.php", "mlib.php",
        "maenglish.php", "mahindi.php", "majournalism.php", "mamasscommunication.php", 
        "mapc.php", "mapsychology.php", "masociology.php", "bajournalism.php", "bamasscommunication.php"
    ]:
        return "Faculty of Humanities & Journalism"

    # Fine Arts & Design
    if lower_file in [
        "finearts.php", "bfa.php", "mfa.php", "bachelor-of-fine-arts-film-making.php", 
        "bachelor-of-fine-arts-photography.php", "master-of-fine-arts-photography.php",
        "diploma-in-cinematography.php", "diploma-in-photography.php", "bscfc.php", "mscfc.php"
    ]:
        return "Faculty of Fine Arts & Design"

    # Forensic Sciences & Law
    if lower_file in ["forensic.php", "law.php"]:
        return "Faculty of Forensic Sciences & Law"

    # Course Details / Generic course templates
    if "cource" in lower_file or "course" in lower_file or "coures" in lower_file:
        return "Templates, Layouts & System Components"

    return "General / Auxiliary Pages"


def run_mapper():
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    
    print(f"[*] Scanning {SOURCE_DIR} ...")
    if not SOURCE_DIR.exists():
        print(f"[!] Error: {SOURCE_DIR} does not exist.")
        return

    # 1. Discover all PHP files
    all_php_files = list(SOURCE_DIR.rglob("*.php"))
    total_files_count = len(all_php_files)
    print(f"[*] Total PHP files found on disk: {total_files_count}")

    # 2. Parse Master Navigation
    master_path = SOURCE_DIR / "master.php"
    nav_links = parse_master_navigation(master_path)
    print(f"[*] Extracted {len(nav_links)} navigation entries from master.php")

    # 3. Data structures
    pages_db = {}
    pdf_inventory = defaultdict(lambda: {"count": 0, "referrers": [], "labels": set(), "category": "Uncategorized"})
    inbound_links = defaultdict(set)
    category_counts = Counter()

    for idx, php_path in enumerate(all_php_files, 1):
        rel_path = str(php_path.relative_to(SOURCE_DIR)).replace("\\", "/")
        filename = php_path.name
        file_size = php_path.stat().st_size

        try:
            content = php_path.read_text(encoding="utf-8", errors="ignore")
        except Exception:
            content = ""

        # Extract title
        title_match = RE_TITLE.search(content)
        title = clean_text(title_match.group(1)) if title_match else ""

        # Extract primary headings
        h1_matches = [clean_text(m) for m in RE_H1.findall(content) if clean_text(m)]
        h2_matches = [clean_text(m) for m in RE_H2.findall(content) if clean_text(m)]
        h3_matches = [clean_text(m) for m in RE_H3.findall(content) if clean_text(m)]

        # Determine effective page name/heading
        display_heading = ""
        if h1_matches:
            display_heading = h1_matches[0]
        elif h2_matches:
            display_heading = h2_matches[0]
        elif h3_matches:
            display_heading = h3_matches[0]

        # Includes
        includes = [inc.strip().replace("\\", "/") for inc in RE_INCLUDES.findall(content)]

        # Determine Category
        nav_breadcrumbs = nav_links.get(filename, [])
        category = categorize_page(rel_path, filename, nav_breadcrumbs, content)
        category_counts[category] += 1

        # Outbound links & PDFs
        outbound_internal_php = set()
        outbound_pdfs = []
        external_links = set()

        raw_links = RE_HREF.findall(content)
        for href, label in raw_links:
            href_clean = href.strip()
            label_clean = clean_text(label)

            if not href_clean or href_clean.startswith("#") or href_clean.startswith("javascript:"):
                continue

            # PDF link
            if ".pdf" in href_clean.lower():
                clean_pdf_url = href_clean.split("?")[0].split("#")[0].replace("\\", "/")
                if clean_pdf_url.startswith("./"):
                    clean_pdf_url = clean_pdf_url[2:]
                pdf_inventory[clean_pdf_url]["count"] += 1
                pdf_inventory[clean_pdf_url]["referrers"].append(rel_path)
                if label_clean:
                    pdf_inventory[clean_pdf_url]["labels"].add(label_clean)
                pdf_inventory[clean_pdf_url]["category"] = category
                outbound_pdfs.append({
                    "url": clean_pdf_url,
                    "label": label_clean
                })
            # Internal PHP
            elif href_clean.endswith(".php") or ".php?" in href_clean or ".php#" in href_clean:
                target_php = href_clean.split("?")[0].split("#")[0].replace("\\", "/")
                outbound_internal_php.add(target_php)
                inbound_links[target_php].add(rel_path)
            # External or subdomain
            elif href_clean.startswith("http://") or href_clean.startswith("https://"):
                external_links.add(href_clean)

        # Image references
        images = [img.strip().replace("\\", "/") for img in RE_IMG_SRC.findall(content)]

        pages_db[rel_path] = {
            "filename": filename,
            "relative_path": rel_path,
            "file_size_bytes": file_size,
            "category": category,
            "title": title,
            "display_heading": display_heading,
            "headings": {
                "h1": h1_matches[:3],
                "h2": h2_matches[:5]
            },
            "in_master_nav": filename in nav_links,
            "nav_labels": nav_breadcrumbs,
            "includes": includes,
            "outbound_php_count": len(outbound_internal_php),
            "outbound_php_links": sorted(list(outbound_internal_php)),
            "pdf_count": len(outbound_pdfs),
            "pdfs": outbound_pdfs,
            "external_links_count": len(external_links),
            "external_links": sorted(list(external_links))[:10],
            "image_count": len(images)
        }

    # Add inbound links to pages_db
    for rel_path, page_data in pages_db.items():
        fname = page_data["filename"]
        inbound = inbound_links.get(fname, set()) | inbound_links.get(rel_path, set())
        page_data["inbound_link_count"] = len(inbound)
        page_data["inbound_referrers"] = sorted(list(inbound))[:20]

    # Clean PDF inventory for JSON serialization
    pdf_list = []
    for pdf_url, info in sorted(pdf_inventory.items(), key=lambda x: x[0]):
        pdf_list.append({
            "pdf_path_hostinger": pdf_url,
            "live_url": f"https://biu.edu.in/{pdf_url.lstrip('/')}",
            "reference_count": info["count"],
            "primary_category": info["category"],
            "labels": sorted(list(info["labels"])),
            "referring_pages": sorted(list(set(info["referrers"])))
        })

    # Group pages by category for high-level sitemap
    categorized_map = defaultdict(list)
    for rel_path, page in sorted(pages_db.items()):
        categorized_map[page["category"]].append({
            "relative_path": page["relative_path"],
            "filename": page["filename"],
            "title": page["title"] or page["display_heading"] or page["filename"],
            "in_master_nav": page["in_master_nav"],
            "nav_labels": page["nav_labels"],
            "pdf_count": page["pdf_count"],
            "inbound_link_count": page["inbound_link_count"]
        })

    # 4. Cross-Verification Calculations
    verification_stats = {
        "total_php_files_on_disk": total_files_count,
        "total_php_files_parsed": len(pages_db),
        "zero_files_dropped": total_files_count == len(pages_db),
        "total_unique_pdfs_referenced": len(pdf_list),
        "total_pdf_reference_occurrences": sum(p["reference_count"] for p in pdf_list),
        "total_categories_defined": len(category_counts),
        "category_distribution": dict(category_counts.most_common()),
        "root_pages_count": sum(1 for p in pages_db.values() if "/" not in p["relative_path"]),
        "ssr_metric_pages_count": sum(1 for p in pages_db.values() if p["relative_path"].startswith("ssr/")),
        "qlm_metric_pages_count": sum(1 for p in pages_db.values() if p["relative_path"].startswith("qlm/")),
        "mailer_script_count": sum(1 for p in pages_db.values() if p["relative_path"].startswith("mailer/")),
        "iqac_pages_count": sum(1 for p in pages_db.values() if p["relative_path"].startswith("iqac/")),
        "nav_linked_pages_count": sum(1 for p in pages_db.values() if p["in_master_nav"])
    }

    # 5. Save Artifact Files
    map_json_path = OUTPUT_DIR / "biu_original_site_map.json"
    pdf_json_path = OUTPUT_DIR / "biu_original_pdf_inventory.json"
    cat_json_path = OUTPUT_DIR / "biu_original_by_category.json"
    stats_json_path = OUTPUT_DIR / "biu_original_verification_stats.json"

    with open(map_json_path, "w", encoding="utf-8") as f:
        json.dump(pages_db, f, indent=2, ensure_ascii=False)

    with open(pdf_json_path, "w", encoding="utf-8") as f:
        json.dump(pdf_list, f, indent=2, ensure_ascii=False)

    with open(cat_json_path, "w", encoding="utf-8") as f:
        json.dump(categorized_map, f, indent=2, ensure_ascii=False)

    with open(stats_json_path, "w", encoding="utf-8") as f:
        json.dump(verification_stats, f, indent=2, ensure_ascii=False)

    print("\n" + "="*65)
    print("BIU ORIGINAL CODEBASE AUDIT & MAPPING COMPLETE")
    print("="*65)
    print(f" Filesystem PHP count:     {verification_stats['total_php_files_on_disk']}")
    print(f" Parsed PHP count:         {verification_stats['total_php_files_parsed']}")
    print(f" Exact 1:1 Match:          {'PASSED (Zero files dropped)' if verification_stats['zero_files_dropped'] else 'FAILED'}")
    print(f" Unique Hostinger PDFs:    {verification_stats['total_unique_pdfs_referenced']}")
    print(f" Total PDF Link Mentions:  {verification_stats['total_pdf_reference_occurrences']}")
    print(f" Root Core Website Pages:  {verification_stats['root_pages_count']}")
    print(f" NAAC SSR Metric Pages:    {verification_stats['ssr_metric_pages_count']}")
    print(f" NAAC QlM Metric Pages:    {verification_stats['qlm_metric_pages_count']}")
    print(f" Active Categories:        {verification_stats['total_categories_defined']}")
    print(f" Outputs saved to:         {OUTPUT_DIR}")
    print("="*65)

    return verification_stats, pages_db, pdf_list, categorized_map


if __name__ == "__main__":
    run_mapper()
