# Install

--8<-- "m2.md"

## Create Magento Project

Latest Magento version:

=== "Magento Open Source"
    ```bash
    composer create-project --repository-url=https://repo.magento.com/ magento/project-community-edition mce24x
    ```
=== "Magento Commerce"
    ```bash
    composer create-project --repository-url=https://repo.magento.com/ magento/project-enterprise-edition mee24x
    ```
=== "Magento Cloud"
    ```bash
    composer create-project --repository-url=https://repo.magento.com/ magento/magento-cloud-metapackage mc24x
    ```

Specific Magento version:

=== "Magento Open Source"
    ```bash
    composer create-project --repository-url=https://repo.magento.com/ magento/project-community-edition=2.4.0 mce240
    ```
=== "Magento Commerce"
    ```bash 
    composer create-project --repository-url=https://repo.magento.com/ magento/project-enterprise-edition=2.4.0 mee240
    ```
=== "Magento Cloud"
    ```bash 
    composer create-project --repository-url=https://repo.magento.com/ magento/magento-cloud-metapackage=2.4.0 mc240
    ```

Show available versions:

=== "Magento Open Source"
    ```bash 
    composer show magento/product-community-edition 2.4.* --all | grep -m 1 versions
    ```
=== "Magento Commerce"
    ```bash
    composer show magento/product-enterprise-edition 2.4.* --all | grep -m 1 versions
    ```
=== "Magento Cloud"
    ```bash
    composer show magento/magento-cloud-metapackage 2.4.* --all | grep -m 1 versions
    ```

## Install Magento from CLI
```bash
php bin/magento setup:install \
    --use-rewrites=1 \
    --use-secure=1 \
    --base-url-secure=https://m24x.dev.local/ \
    --use-secure-admin=1 \
    --base-url=https://m24x.dev.local/ \
    --backend-frontname=admin \
    --db-name=m24x \
    --db-user=duser \
    --db-password=dpass \
    --session-save=files
```

## Add Administrator
```bash
php bin/magento admin:user:create \
    --admin-user=admin \
    --admin-password=password \
    --admin-email=$USER@dev.local \
    --admin-firstname=Support \
    --admin-lastname=Account
```

## Disable Two factor Authentication
```bash
php bin/magento module:disable Magento_TwoFactorAuth
php bin/magento setup:upgrade
```

## Upgrade Magento Project
```bash
cp composer.json composer.json.bak
composer require magento/product-community-edition 2.3.3 --no-update
composer update
php bin/magento setup:upgrade
```
