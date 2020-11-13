## Installation

1.  Checkout oh-my-git and switch to the "theme" branch
```bash
sudo su -
cd /opt
git clone https://github.com/yutv/oh-my-git
cd oh-my-git
git checkout theme
exit
```

2. Add the following lines into your **~/.bashrc**
```bash
declare -A OMG_THEME=(["right_side_bg"]='green')
source /opt/oh-my-git/prompt.sh    
```
     
3. Install FontAwesome

    === "Ubuntu"
        1. 
        ```bash
        apt install fonts-font-awesome
        ```
        2. Gnome Tweaks > Fonts > Monospace Text = SourceCodePro+PowerLine+Awesome Regular Regular    11 
    
    === "Fedora"
        ```bash
        cd /tmp
        git clone http://github.com/gabrielelana/awesome-terminal-fonts
        cd awesome-terminal-fonts
        git checkout patching-strategy
        mkdir -p ~/.fonts
        cp patched/*.ttf ~/.fonts
        
        # update the font-info cache
        sudo fc-cache -fv ~/.fonts
        
        rm -Rf /tmp/awesome-terminal-fonts
        ``` 

4. Now try to change directory to a git repo and you will see a git info bar, e.g.: 
![](../images/gnome-terminal.gif)
