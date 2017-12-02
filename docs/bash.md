##Bash prompt w/ path and colors

Add the following line to your `~/.bash_profile`:

    export PS1="\[\e[0;38;05;15m\][\[\e[0;38;05;47m\]\u\[\e[0;38;05;15m\]@\[\e[0;38;05;208m\]\h:\[\e[0;38;05;111m\]\w\[\e[0;38;05;15m\]]\\$ \[\e[0m\]"

Show colors:
```bash
for i in {0..255}; do echo -e "\e[38;05;${i}m${i}"; done | column -c 80 -s '  '; echo -e "\e[m"
```
```bash
for code in $(seq -w 0 255); do for attr in 0 1; do printf "%s-%03s %bTest%b\n" "${attr}" "${code}" "\e[${attr};38;05;${code}m" "\e[m"; done; done | column -c $((COLUMNS*2))
```    

##Convert DOS to Unix newlines in current directory excluding .git directory

    find . -type f -not -path './.git/*' -print0 | xargs -0 dos2unix
    
##Use custom SSH port with rsync/ssh/scp/sshfs

    rsync -avz -e "ssh -p 2244" --exclude=var user@server.com:/html/ .
    ssh user@server.com -p 2244
    scp -P 2244 user@server.com:/html/website_db.sql .
    sshfs user@server.com:/html -p 2244 server.com