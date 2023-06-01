1. list of unmerged files and locally changed files:
    ```bash
    (git diff --no-commit-id --name-only origin/$parent..HEAD; git status --porcelain | sed s/^...//) | sort | uniq
    ```
2. Skip gitlab CI
```bash
git push -o ci.skip
``` 
Source: [1](https://devops.stackexchange.com/questions/6809/is-there-a-ci-skip-option-in-gitlab-ci)
3. Restore staged file
```bash
git restore --staged <file>
```
4. Remove a git commit which has not been pushed
```bash
git reset --hard HEAD^
```
Source: [1](https://stackoverflow.com/questions/1611215/remove-a-git-commit-which-has-not-been-pushed)
