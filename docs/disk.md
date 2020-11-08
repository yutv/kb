## write iso to disk
```bash
    dd if=os.img of=/dev/sdX bs=1M status=progress oflag=dsync
```
where
- oflag=dsync - synchronize I/O for data.

## RAM disk

    sudo mount -o size=2G -t tmpfs none my.project.com

## Create Windows usb flash
1) `sudo apt install gparted`
2) create gpt partition and format it as ntfs [more info](https://www.linuxbabe.com/ubuntu/easily-create-windows-10-bootable-usb-ubuntu)
    - run gparted, choose flash drive and unmount it
    - Main Menu: Devide > Create Partition: gpt
    - right click on unlocated partition, New, ntfs
    - apply changes
3) mount iso and copy files to flash drive:
```bash
sudo mkdir /mnt/win10/
sudo mount -t auto -o loop  ~/Downloads/win10.iso /mnt/win10/
rsync -ah --info=progress2 /mnt/win10/ cd /media/$USER/{usb-mount-point}/
```
4) reboot and install Windows

## ACL

### Full access for two users
```bash
setfacl -R -d -m u:user1:rwx,u:user2:rwx .
setfacl -R -m u:user1:rwx,u:user2:rwx .
```
