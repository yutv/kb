## List of global configs
```bash
git config --global -l
```

## Global .gitignore
```bash
git config --global core.excludesfile ~/.gitignore
```
```bash
vi ~/.gitignore
```
```
.idea
vendor
studio
.phpv
.sass-cache
```

## Log alias 
```bash
git config --global alias.lg "log --color --pretty=format:'%Cred%h%Creset - %s %Cgreen(%cr %ci) %C(bold blue)<%an>%Creset %C(yellow)%d%Creset' --abbrev-commit"
```
```bash
git config --global alias.lgm "log --pretty=oneline --abbrev-commit"
```

## Automatically prune

Before fetching, automatically remove any remote-tracking references that no longer exist on the remote.
```bash
git config --global fetch.prune true
```

## Remote
```bash
git remote -v                                          # show
git remote add origin git@github.com:user/repo.git     # add
git remote set-url origin git@github.com:user/repo.git # change
```

# MISC
```bash
git config --global core.commentChar ';' # change comment character
```
