## filter output keeping the first line
```bash
df -h | awk 'NR==1||/var$/' 
Filesystem                                     Size  Used Avail Use% Mounted on
/dev/mapper/system-var                         9.8G  6.2G  3.2G  67% /var
```

## path info

    file="/home/user/file.inc.php"
    basename=${file##*/}       # file.inc.php
    filename=${basename%.*}    # file.inc
    extension=${file##*.}      # php
    dirname=${file%/*}         # /home/user      

## SSH authentication by key
```bash
cd ~/.ssh
ssh-keygen
ssh-copy-id -i ~/.ssh/id_rsa.pub remote.host.com
ssh-add
ssh remote.host.com
``` 
If username has a “@” symbol then use the following:
```bash
ssh -l user@example.com example.com
mkdir .ssh
touch .ssh/authorized_keys
exit
cat ~/.ssh/id_rsa.pub | ssh -l user@example.com example.com 'cat >> .ssh/authorized_keys'
chmod 700 .ssh
chmod 400 .ssh/authorized_keys
ssh -l user@example.com example.com
```

## Bash prompt w/ path and colors

`~/.bash_profile`:

Local (green)
```bash
export PS1="\[\e[0;38;05;15m\][\[\e[0;38;05;47m\]\u\[\e[0;38;05;15m\]@\[\e[0;38;05;208m\]\h:\[\e[0;38;05;111m\]\w\[\e[0;38;05;15m\]]\\$ \[\e[0m\]"
```
Remote (yellow):
```bash
export PS1="\[\e[0;38;05;15m\][\[\e[0;38;05;226m\]\u\[\e[0;38;05;15m\]@\[\e[0;38;05;226m\]\h:\[\e[0;38;05;180m\]\w\[\e[0;38;05;15m\]]\\$ \[\e[0m\]"
```
Root (red and yellow)
```bash
export PS1="\[\e[0;38;05;15m\][\[\e[0;38;05;196m\]\u\[\e[0;38;05;15m\]@\[\e[0;38;05;226m\]\h:\[\e[0;38;05;180m\]\w\[\e[0;38;05;15m\]]\\$ \[\e[0m\]"
```
    
## Colors
```bash
for i in {0..255}; do echo -e "\e[38;05;${i}m${i}"; done | column -c 80 -s '  '; echo -e "\e[m"
```
```bash
for code in $(seq -w 0 255); do for attr in 0 1; do printf "%s-%03s %bTest%b\n" "${attr}" "${code}" "\e[${attr};38;05;${code}m" "\e[m"; done; done | column -c $((COLUMNS*2))
```    

## Vim

~/.vimrc
```bash
set nocompatible
set backspace=2
set tabstop=4
set expandtab
set number
```
## Load additional php.ini when run php from terminal
1. Add the following line into **~/.bashrc** file:

    ```export PHP_INI_SCAN_DIR=":$HOME/etc/php70"```

2. Put additional config into **~/etc/php70/php.ini**, e.g:

    ```memory_limit = -1```
    
3. Run the command #1 or re-login terminal 
4. Check ini paths:
    
    ```php --ini```

5. Check memory limit:
    
        $ php -i | grep memory_limit
        memory_limit => -1 => -1

[More info on php.net](http://php.net/manual/en/configuration.file.php#configuration.file.scan)

## Convert DOS to Unix newlines in current directory excluding .git directory
```bash
find . -type f -not -path './.git/*' -print0 | xargs -0 dos2unix
``` 
## Use custom SSH port with rsync/ssh/scp/sshfs

    rsync -avz -e "ssh -p 2244" --exclude=var user@server.com:/html/ .
    ssh user@server.com -p 2244
    scp -P 2244 user@server.com:/html/website_db.sql .
    sshfs user@server.com:/html -p 2244 server.com

## Upload multiple files w/o file name duplication
```bash
scp {,user@example.com:~/}public_html/index.php
scp {,user@example.com:~/}public_html/.htaccess
scp {,user@example.com:~/}public_html/images/logo.png
scp {,user@example.com:~/}public_html/js/jquery.js 
```
## FIX permissions

    find . -type f -exec chmod 640 {} \;
    find . -type d -exec chmod 750 {} \;
    
## Statistics

### Find # of code lines in directory
```bash
(find . -type f -name '*.php' -print0 | xargs -0 cat) | wc -l
```

## Date/Time format
```bash
date +%Y-%m-%d\ %H:%M:%S\ %:z     # 2020-04-02 21:53:08 +03:00
date -Iseconds                    # 2020-04-02T23:02:42+03:00
``` 

## Ctrl+C Hook

    trap ctrl_c INT
    
    function ctrl_c() {
        echo "Triggered CTRL+C event"
    }

## Process start end time
```
ps -eo pid,lstart,etime,args | sed '1p;/php/!d'
```

## Diff large files
```bash
diff -y --suppress-common-lines --speed-large-files file1 file2
```
Source: [unix.stackexchange.com](https://unix.stackexchange.com/questions/458834/side-by-side-diff-of-large-files#answer-458846)

## Useful links
1. [How to parse command line arguments](https://stackoverflow.com/questions/192249/how-do-i-parse-command-line-arguments-in-bash)
