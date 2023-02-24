1. define parent branch 
    ```bash
    parent=$(git log --pretty=format:'%D' HEAD^ | grep 'origin/' | head -n1 | sed 's@origin/@@' | sed 's@,.*@@')
    ```
2. list of unmerged files and locally changed files:
    ```bash
    (git diff --no-commit-id --name-only origin/$parent..HEAD; git status --porcelain | sed s/^...//) | sort | uniq
    ```
3. Skip gitlab CI
```bash
git push -o ci.skip
``` 
Source: [1](https://devops.stackexchange.com/questions/6809/is-there-a-ci-skip-option-in-gitlab-ci)
4. Restore staged file
```bash
git restore --staged <file>
```
5. Remove a git commit which has not been pushed
```bash
git reset --hard HEAD^
```
Source: [1](https://stackoverflow.com/questions/1611215/remove-a-git-commit-which-has-not-been-pushed)

6. Find removed file
```bash
git log --all --full-history -- app/code/file/name.php 
```
Source [1](https://stackoverflow.com/questions/7203515/how-to-find-a-deleted-file-in-the-project-commit-history)