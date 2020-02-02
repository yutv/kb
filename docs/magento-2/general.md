
--8<-- "m2.md"

## PhpStorm Urn
1. container:
```bash
m2 dev:urn-catalog:generate .idea/misc.xml
```
2. host:
```bash
sed -i "s|/var/www/myproject|`pwd`|g" .idea/misc.xml
```
3. PhpStorm: synchronize root directory & wait 10 seconds.
    
## Create Magento Project

Latest Magento version:
```bash
composer create-project --repository-url=https://repo.magento.com/ magento/project-community-edition m23x
```
Specific Magento version:
```bash
composer create-project --repository-url=https://repo.magento.com/ magento/project-community-edition=2.3.3 m233
```
 
## Upgrade Magento Project
```bash
cp composer.json composer.json.bak
composer require magento/product-community-edition 2.3.3 --no-update
composer update
m2 setup:upgrade
```

## Create module package

For Marketplace:

    git clone https://git.example.com/Vendor_Module.git
    cd Vendor_Module
    zip -r9 "vendor-module-1.0.0.zip" . -x *.git* *.idea*
    
Alternative way (archive will have a path app/code/Vendor/Module/):

    zip -r9 "vendor-module-1.0.0.zip" app/code/Vendor/Module/ -x *.git*

## Add Administrator
```bash
m2 admin:user:create --admin-user=admin --admin-password=password --admin-email=support@example.com --admin-firstname=Support --admin-lastname=Account
```
