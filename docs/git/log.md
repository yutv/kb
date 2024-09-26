## Find a deleted file in the commit history
```bash
git log --all --full-history -- "**/thefile.*"
```
```bash
git log --all --full-history -- <path-to-file>
```
[source](https://stackoverflow.com/questions/7203515/how-to-find-a-deleted-file-in-the-project-commit-history)

## List of commits between branches
```bash
git log --oneline release-1..develop
```
## Log with file list
```bash
git log --name-status
```

## define parent branch
```bash
git log --pretty=format:'%D' HEAD^ | grep 'origin/' | head -n1 | sed 's@origin/@@' | sed 's@,.*@@'
```
# find deleted file
```bash
git log --all --full-history -- '**/file.*'
```