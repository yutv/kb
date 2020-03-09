##Daily Routine

### Push w/o user/password prompt

Change origin from https to ssh

    git remote set-url origin git@github.com:username/projectname.git

###Update local list of remote branches
```bash
git branch -a
git remote update origin --prune
```

###Adding a remote
```bash
git remote -v
git remote add origin https://domain.com/myrepo.git
```

###Merge branch as new commit
```bash
git merge --squash branch_name
git commit
```

## Misc

1. define parent branch 
    ```bash
    parent=$(git log --pretty=format:'%D' HEAD^ | grep 'origin/' | head -n1 | sed 's@origin/@@' | sed 's@,.*@@')
    ```
2. list of unmerged files and locally changed files:
    ```bash
    (git diff --no-commit-id --name-only origin/$parent..HEAD; git status --porcelain | sed s/^...//) | sort | uniq
    ```

##Setup
###Global .gitignore
```bash
git config --global core.excludesfile ~/.gitignore
vi ~/.gitignore
```
Add your global ignores, e.g:

    .idea
    vendor
    studio
    .sass-cache
    .unison*
    
###Store passwords
```bash
git config --global credential.helper store
```

###Workaround with 403 error 
```bash
git config --global --unset-all credential.helper
git config --unset-all credential.helper
```

### git lg

    git config --global alias.lg "log --all --color --graph --pretty=format:'%Cred%h%Creset - %s %Cgreen(%cr) %C(bold blue)<%an>%Creset %C(yellow)%d%Creset' --abbrev-commit"