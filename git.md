# 1. Switch to your local main branch
git checkout main

# 2. Download the latest changes from the main repo (does not modify your code yet)
git fetch upstream

# 3. Safely merge those changes into your local main branch
git merge upstream/main

# Switch to your feature branch
git checkout sub-branch

# Move your feature's starting point to the absolute latest commit on main
git rebase main

# --- The Two Ways to Do It ---

## 1. `git switch -c <branch-name>` (Recommended)
The `-c` stands for **create**. This is the modern, cleaner Git command introduced to replace the confusing `checkout` command.

## 2. `git checkout -b <branch-name>` (Classic)
The `-b` stands for **branch**. This is the older, classic command that does the exact same thing. You will still see this used in most tutorials.
