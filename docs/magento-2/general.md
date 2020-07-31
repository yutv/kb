
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
Install via CLI (since Magento 2.4 there is no Web installer)
```bash
m2 setup:install --use-rewrites --use-secure=1 --base-url-secure=https://dev.local/m24x/ --use-secure-admin=1 --base-url=https://dev.local/m24x/ --backend-frontname=admin --db-name=m24x --db-user=duser --db-password=dpass --session-save=files
```

## Add Administrator
```bash
m2 admin:user:create --admin-user=admin --admin-password=password --admin-email=support@example.com --admin-firstname=Support --admin-lastname=Account
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

## Data Patch Development
```bash
mysql -e 'DELETE FROM patch_list WHERE patch_name = "Vendor\\Module\\Setup\\Patch\\Data\\InitializeStoresAndWebsites"' && m2x setup:upgrade
```
## Recompile
```bash
m2="php -d memory_limit=-1 bin/magento" \
    && $m2 maintenance:enable \
    && $m2 cache:clean \
    && rm -Rf generated/code/* var/cache/* var/page_cache/* var/di/* var/view_preprocessed/* pub/static/* \
    && redis-cli FLUSHALL \
    && $m2 setup:di:compile \
    && $m2 setup:static-content:deploy -t Vendor/default fr_FR en_US \
    && $m2 setup:static-content:deploy -t Magento/backend fr_FR en_US \
    && $m2 maintenance:disable \
    && sudo systemctl restart varnish
```