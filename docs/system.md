## Info

    #system info in short format
    inxi -F

## Disable Selinux
    
    #runtime
    sudo setenforce 0
    
    #permanently
    /etc/selinux/config
    SELINUX=disabled

## Kernel parameters

**vi /etc/sysctl.conf**

    # custom settings
    
    $ disable IPv6
    net.ipv6.conf.all.disable_ipv6 = 1
    net.ipv6.conf.default.disable_ipv6 = 1
    net.ipv6.conf.lo.disable_ipv6 = 1
    
    # Increase inotify.max_user_watches (https://github.com/guard/listen/wiki/Increasing-the-amount-of-inotify-watchers)   
    fs.inotify.max_user_watches = 524288

**Reload kernel parameters**

    sysctl -p
# Battery Info

```bash
upower -i /org/freedesktop/UPower/devices/battery_BAT0
```
output:
```bash
native-path:          BAT0
vendor:               Hewlett-Packard
model:                Primary
power supply:         yes
updated:              Fri 12 Mar 2021 11:39:46 EET (58 seconds ago)
has history:          yes
has statistics:       yes
battery
present:             yes
rechargeable:        yes
state:               discharging
warning-level:       none
energy:              58.7664 Wh
energy-empty:        0 Wh
energy-full:         58.7664 Wh
energy-full-design:  57.288 Wh
energy-rate:         6.8376 W
voltage:             12.783 V
time to empty:       8.6 hours
percentage:          100%
capacity:            100%
technology:          lithium-ion
icon-name:          'battery-full-symbolic'
History (rate):
1615541986	6.838	discharging
```

# Show list of files accessed by the process

```bash
strace -f -t -e trace=file mgc project:info 2>&1 | grep access | sort | uniq
```

# Manage monitors brightness
```bash
#!/bin/bash

if [ $# -ne 1 ] ; then
    echo "Usage: "
    echo "$0 <brightness-level>"
    echo "e.g.: $0 0.8"
    exit 0
fi

for output in $(xrandr | grep ' connected' | awk '{print $1}'); do
    xrandr --output "$output" --brightness $1
done
```