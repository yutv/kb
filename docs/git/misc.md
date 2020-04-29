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