## List of changed files
```bash
git diff --name-only SHA1 SHA2        # between two comments
git diff --name-only HEAD~2 HEAD      # between last two comments
```
## List of commits
```bash
git log --oneline release-1..develop  # between last release and current develop branch
```
## Log with file list
```bash
git log --name-status
```