## write iso to disk
```bash
    dd if=os.img of=/dev/sdX bs=1M status=progress oflag=dsync
```
where
- oflag=dsync - synchronize I/O for data.

## RAM disk

    sudo mount -o size=2G -t tmpfs none my.project.com

## Create Windows usb flash
1) Install WoeUSB: https://github.com/slacka/WoeUSB
2) Unmount flash drive using Disks program
3) Write ISO
4) Reboot and install Windows

## ACL

### Full access for two users
```bash
setfacl -R -d -m u:user1:rwx,u:user2:rwx .
setfacl -R -m u:user1:rwx,u:user2:rwx .
```
