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
