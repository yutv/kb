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

## Create Windows USB flash

1. Install [WoeUSB](https://github.com/WoeUSB/WoeUSB)
2. Unmount flash drive using Disks program
3. Write ISO
```bash
bash woeusb-5.2.4.bash --device windows.iso /dev/sdc
```
4. Reboot and install Windows

## ACL

### Full access for two users
```bash
setfacl -R -d -m u:user1:rwx,u:user2:rwx .
setfacl -R -m u:user1:rwx,u:user2:rwx .
```
## Check read-only file systems
```bash
grep "[[:space:]]ro[[:space:],]" /proc/mounts
```
Source: [serverfault.com](https://serverfault.com/questions/193971/determine-if-filesystem-or-partition-is-mounted-ro-or-rw-via-bash-script#answer-349025)
