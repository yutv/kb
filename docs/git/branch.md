## Misc

### Remove gone branches
```bash
git fetch -p && git branch -vv | awk '/: gone]/{print $1}' | xargs git branch -D
```
Sources: [1](https://stackoverflow.com/a/59912825/5575527), [2](https://stackoverflow.com/a/38404202/5575527).

### Replace local branch with origin
```bash
git reset --hard origin/featureXXX
```
Source: [1](https://stackoverflow.com/a/9210705/5575527)

## Merge
### Check if commit merged:
```bash
git fetch origin # ??
git branch -r --contains <commit>
```
### Merged branches
```bash
git branch --merged master      # local branches
git branch -r --merged master   # remote branches
git branch -a --merged master   # all branches
```
### Not merged branches
```bash
git branch --no-merged master      # local branches
git branch -r --no-merged master   # remote branches
git branch -a --no-merged master   # all branches
```
### --dry-run
```bash
git merge --no-commit --no-ff my_branch
git diff --cached
git merge --abort
```
see [stackoverflow](https://stackoverflow.com/questions/501407/is-there-a-git-merge-dry-run-option)

### Squash

Merge branch as a new single commit:
```bash
git checkout master
git merge --squash bugfix
git commit
```

## Remove

```bash
git branch -a                             # show list of branches
git branch -d <branch_name>               # remove “<branch_name>” branch locally
git push origin --delete <branch_name>    # remove remote “<branch_name>” branch
git branch -a                             # show list of branches to ensure “<branch_name>” is removed
```

## Rename
```bash
git branch -m old-name new-name           # rename
git push origin :old-name new-name        # push to origin
git push origin -u new-name               # add upstream (tracking) reference
```
Source: [1](https://stackoverflow.com/a/40034426/5575527)

## Rebase

```bash
git checkout master
git pull
git checkout my_brarch
git rebase -i master        # pick first comment and fixup the rest ones
git push
#git push -f                # if changed were already pushed to remote
```

### Rebase onto another branch

Precondition:
```bash
git checkout master
git checkout -b feature_1 # create a branch from master
# add & commit changes
git checkout -b feature_2 # create a branch from feature_1
# add & commit changes
```
Rebase `feature_2` onto `master` branch: 
```bash
git checkout feature_2
git rebase --onto master feature_1
```
[More info](https://git-scm.com/book/en/v2/Git-Branching-Rebasing#_more_interesting_rebases)

### Rebase onto a rebased branch
```bash
 git rebase --onto feature1 feature1@{1} feature2
```
[More info](https://stackoverflow.com/questions/31881885/how-to-rebase-a-branch-off-a-rebased-branch#answer-53928753)

## Reverting git rebase
```bash
git reflog
git reset --hard HEAD@{2} # be absolutely sure before resetting with the --hard option
```
Source: [1](https://stackoverflow.com/questions/134882/undoing-a-git-rebase)

## Undoing a 'git push'
```bash
git push -f origin last_known_good_commit:branch_name
```
Source: [1](https://stackoverflow.com/questions/1270514/undoing-a-git-push)

## Copy commit to a new branch:
```bash
git checkout -b new_branch_name
git cherry-pick <commit>
```
## Back branch to the last good commit:
```bash
git checkout branch_name
git reset --hard <last_good_commit>
git push -f
```