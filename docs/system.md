## Info

    #system info in short format
    inxi -F

## Disable Selinu
    
    #runtime
    sudo setenforce 0
    
    #permanently
    /etc/selinux/config
    SELINUX=disabled
