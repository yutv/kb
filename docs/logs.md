# Analyze apache/nginx access logs

Show logs for the specific error code
```bash
cat /var/log/access.log | awk '($9 ~ /400/)'
```
Show access logs with non 200 response code
```bash
cat /var/log/access.log | grep -F 'stripe/webhooks' |  awk '($9 !~ /200/)'
```
Show unique user agents
```bash
cat /var/log/access.log | grep -F '/rest/' | awk -F\" '($2 ~ "^GET /"){print $6}'
```
