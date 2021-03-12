## Misc

### Remove all images except phpmyadmin
```bash
docker image rm -f $(docker image ls -a | grep -v phpmyadmin | awk '{print $3}' | tail -n +2)
```



