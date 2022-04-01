# Composer

## Install
```bash
curl -sS https://getcomposer.org/installer | sudo php -- --install-dir=/usr/bin --filename=composer
```

## Add a custom packages repository

    composer config --global repositories.example composer https://packages.example.com/
    
##  Install composer package from a local folder

    mkdir -p ~/composer-packages/
    cp vendor-module-x.x.x.zip ~/composer-packages/
    cd ~/public_html/
    composer config repositories.local artifact ~/composer-packages/
    composer require vendor/module
    #or
    composer update vendor/module   