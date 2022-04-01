## Composer

### Install
```bash
curl -sS https://getcomposer.org/installer | sudo php -- --install-dir=/usr/bin --filename=composer
```

## Date Diff
    php -r "echo (new DateTime('2019-10-31 14:37:17'))->diff(new DateTime('2019-10-29 10:03:05'))->format('%R%ad%Hh');"

## Useful links

- [Accessing private properties in PHP](https://www.lambda-out-loud.com/posts/accessing-private-properties-php/)

## phpcs & phpcbf

    cd ~/bin
    wget https://squizlabs.github.io/PHP_CodeSniffer/phpcs.phar -O phpcs && chmod +x phpcs
    wget https://squizlabs.github.io/PHP_CodeSniffer/phpcbf.phar -O phpcbf && chmod +x phpcbf
    
    # check supported standards
    $ phpcs -i
    The installed coding standards are MySource, PEAR, PSR1, PSR12, PSR2, Squiz and Zend
    
    # add custom standard, e.g
    cd ~/opt
    git clone https://github.com/magento/magento-coding-standard
    cd magento-coding-standard
    composer install
    
    # add custom standsrd to phpcs
    phpcs --config-set installed_paths /opt/magento-coding-standard
    # check supported standards (see that Magento2 standsrd is added)
    $ phpcs -i
    The installed coding standards are MySource, PEAR, PSR1, PSR12, PSR2, Squiz, Zend and Magento2

Other commands may be useful:

    phpcs --config-show installed_paths
    
    # remove installed_paths if they are wrong
    phpcs --config-delete installed_paths