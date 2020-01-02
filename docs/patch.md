## Create Directory Patch

    diff --exclude=".git" -ruN orig/ new/ | sed "s#new/#b/#" | sed 's#orig/#a/#' > patch.sql

where

    -r == recursive, so do subdirectories
    -u == unified style, if your system lacks it or if recipient may not have it, use "-c"
    -N == treat absent files as empty
    
References: [1](https://stackoverflow.com/questions/9980186/how-to-create-a-patch-for-a-whole-directory-to-update-it),
[2](https://superuser.com/questions/644680/how-can-i-make-diff-x-ignore-specific-paths-and-not-file-names).

## Apply Patch

    patch '-p1' --no-backup-if-mismatch -d 'vendor/vendor-name/module-name' < '_extra/patches/vendor-name/module-name/patch-name.patch'
    