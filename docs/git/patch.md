## Create a Git Patch
```bash
git format-patch -1 HEAD
```
where
 - `-n` number of commits from the topmost one  

Source: [stackoweflow](https://stackoverflow.com/questions/6658313/how-to-generate-a-git-patch-for-a-specific-commit) 

## Apply Git Patch
```bash
git am < file.patch
```