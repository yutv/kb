##Daily Routine
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
###Store passwords
```bash
git config --global credential.helper store
```

###Workaround with 403 error 
```bash
git config --global --unset-all credential.helper
git config --unset-all credential.helper
```