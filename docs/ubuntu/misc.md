## Check whether the X11 or Wayland is active.
```bash
echo $XDG_SESSION_TYPE
```

## Disable Wayland
```bash
sudo nano /etc/gdm3/custom.conf
```
```ini
WaylandEnable=false
```
```bash
restart
```


