## write iso to disk
```bash
dd if=os.img of=/dev/sdX bs=1M status=progress oflag=dsync
```
where
- oflag=dsync - synchronize I/O for data.

## RAM disk
```bash
sudo mount -o size=2G -t tmpfs none my.project.com
```
    
## ACL

### Full access for two users
```bash
setfacl -R -d -m u:user1:rwx,u:user2:rwx .
setfacl -R -m u:user1:rwx,u:user2:rwx .
```
