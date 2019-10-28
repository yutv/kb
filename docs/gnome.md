## Sublime as a default text editor

Find the `text/plain=gedit.desktop` text in the one of the following files:

    # local user
    vi ~/.local/share/applications/mimeapps.list
    # or 
    sudo vi /usr/share/applications/defaults.list
    # or 
    sudo vi /etc/gnome/defaults.list

and replace to

    text/plain=sublime_text.desktop
    
## Other

1. [Make notify-send work from user cron file in ubuntu](https://selivan.github.io/2016/07/08/notify-send-from-cron-in-ubuntu.html)