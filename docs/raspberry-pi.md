# GPU Memory

show current gpu memory config
```bash
vcgencmd get_mem gpu
```

change gpu memory
```bash
vi /boot/config.txt
# add/change the following line
[all]
gpu_mem=256
```