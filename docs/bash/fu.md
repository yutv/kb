# FU

## Generate a random password 30 characters long
```bash
strings /dev/urandom | grep -o '[[:alnum:]]' | head -n 30 | tr -d '\n'; echo
```
