## Strace

Slow SQL Queries
```bash
strace -p<FPM_PID> -T -r --trace=sendto,recvfrom 
``` 

Slow Filesystem
```bash
strace -p<FPM_PID> -T --trace=access,open 
``` 