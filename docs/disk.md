## write iso to disk
```bash
    dd if=os.img of=/dev/sdX bs=1M status=progress oflag=dsync
```
where
- oflag=dsync - synchronize I/O for data.

##RAM disk

    sudo mount -o size=2G -t tmpfs none my.project.com
    