## Shortcuts
```bash
gsettings set org.gnome.desktop.wm.keybindings switch-applications "['<Super>Tab']" # don't group windows on Alt+Tab
gsettings set org.gnome.desktop.wm.keybindings switch-windows "['<Alt>Tab']"        # don't group windows on Alt+Tab
gsettings set org.gnome.desktop.wm.keybindings begin-move '[]'                      # release Alt+F7 shortcut for PhpStorm
gsettings list-recursively org.gnome.desktop.wm.keybindings | grep -F '<Alt>F7'     # find specific shortcut
```

## Default GUI text editor

Find the `text/plain=gedit.desktop` text in the one of the following files:

```bash
vi ~/.local/share/applications/mimeapps.list   # local user
sudo vi /usr/share/applications/defaults.list  # all users
sudo vi /etc/gnome/defaults.list               # defaults
```
and replace to

    text/plain=sublime_text.desktop
    
## Default Console Text Editor

    sudo update-alternatives --config editor
    
## Other
    
1. [Make notify-send work from user cron file in ubuntu](https://selivan.github.io/2016/07/08/notify-send-from-cron-in-ubuntu.html)
