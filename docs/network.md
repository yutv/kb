## Check if port is opened

    $ nc -zvw5 google.com 80
    Connection to google.com 80 port [tcp/http] succeeded!

## Get my IP Address

```bash
ifconfig eth1 | awk '/inet addr/{print substr($2,6)}'
```

# View SSL Certificate on remote host
```bash
echo | openssl s_client -showcerts -servername gnupg.org -connect gnupg.org:443 2>/dev/null | openssl x509 -inform pem -noout -text
```

```bash
nmap -p 443 --script ssl-cert gnupg.org
```

## Set interface zone permanently

Create a new `if-up` script
```bash
touch /etc/network/if-up.d/internal-zone && chmod +x $_ && vi $_
```

Put the following content and save (Shift+ZZ)
```bash
#!/bin/sh

if [ "$IFACE" != "lxcbr0" ]; then
    exit 0
fi
firewall-cmd --zone=internal --change-interface="$IFACE"
```
Note: the latest docker has issues if the `docker0` interface isn't in the `docker` zone.  
```bash
sudo firewall-cmd --zone=docker --change-interface=docker0
```
See [stackoverflow](https://stackoverflow.com/questions/65213831/failed-to-start-daemon-error-initializing-network-controller-error-creating-de)

Reboot and check
```bash
$ sudo firewall-cmd --get-active-zones
docker
  interfaces: docker0
internal
  interfaces: lxcbr0
...
```

##OpenWRT
###Speed test with iperf3
```bash
# iperf3 -c ping.online.net -u -b 1G 
Connecting to host ping.online.net, port 5201
[  5] local xxx.xxx.xxx.xxx port 46361 connected to 62.210.18.40 port 5201
[ ID] Interval           Transfer     Bitrate         Total Datagrams
[  5]   0.00-1.00   sec   114 MBytes   956 Mbits/sec  82519  
[  5]   1.00-2.00   sec   111 MBytes   931 Mbits/sec  80335  
[  5]   2.00-3.00   sec   108 MBytes   909 Mbits/sec  78439  
[  5]   3.00-4.00   sec   109 MBytes   918 Mbits/sec  79250  
[  5]   4.00-5.00   sec   109 MBytes   914 Mbits/sec  78939  
[  5]   5.00-6.00   sec   109 MBytes   917 Mbits/sec  79203  
[  5]   6.00-7.00   sec   111 MBytes   930 Mbits/sec  80253  
[  5]   7.00-8.00   sec   110 MBytes   924 Mbits/sec  79802  
[  5]   8.00-9.00   sec   110 MBytes   923 Mbits/sec  79676  
[  5]   9.00-10.00  sec   111 MBytes   931 Mbits/sec  80381  
- - - - - - - - - - - - - - - - - - - - - - - - -
[ ID] Interval           Transfer     Bitrate         Jitter    Lost/Total Datagrams
[  5]   0.00-10.00  sec  1.08 GBytes   925 Mbits/sec  0.000 ms  0/798797 (0%)  sender
[  5]   0.00-10.00  sec   114 MBytes  95.7 Mbits/sec  0.009 ms  716162/798783 (90%)  receiver

iperf Done.
```
- [Results interpretation](https://github.com/esnet/iperf/issues/480#issuecomment-307205313)
- [iperf3 servers](https://iperf.fr/iperf-servers.php)

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
