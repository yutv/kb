##Get my IP Address

```bash
ifconfig eth1 | awk '/inet addr/{print substr($2,6)}'
```

##LEDE/OpenWRT
###Speed test with iperf (Kyivstar)
```bash
opkg update
opkg install iperf
iperf -c 193.41.63.185 -u -b 100m -r
```
###Set up Dropbear public key authentication
```bash
ssh-copy-id  root@192.168.1.1
ssh root@192.168.1.1
cp /root/.ssh/authorized_keys /etc/dropbear/
chmod 700 /etc/dropbear
chmod 600 /etc/dropbear/authorized_keys
```
###IP Addresses daily log (cron job) 
```cron
0 4 * * * echo "`date +%Y-%m-%d` $(ifconfig eth1 | awk '/inet addr/{print substr($2,6)}')" >> /root/ip.log
```
