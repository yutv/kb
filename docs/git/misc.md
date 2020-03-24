1. define parent branch 
    ```bash
    parent=$(git log --pretty=format:'%D' HEAD^ | grep 'origin/' | head -n1 | sed 's@origin/@@' | sed 's@,.*@@')
    ```
2. list of unmerged files and locally changed files:
    ```bash
    (git diff --no-commit-id --name-only origin/$parent..HEAD; git status --porcelain | sed s/^...//) | sort | uniq
    ```
