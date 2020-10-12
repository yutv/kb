# Install

--8<-- "m2.md"

## Create Magento Project

Latest Magento version:

```bash tab="Magento Open Source"
composer create-project --repository-url=https://repo.magento.com/ magento/project-community-edition mce24x
```

```bash tab="Magento Commerce"
composer create-project --repository-url=https://repo.magento.com/ magento/product-enterprise-edition mee24x
```

```bash tab="Magento Cloud"
composer create-project --repository-url=https://repo.magento.com/ magento/magento-cloud-metapackage mc24x
```

Specific Magento version:

```bash tab="Magento Open Source"
composer create-project --repository-url=https://repo.magento.com/ magento/project-community-edition=2.4.0 mce240
```

```bash tab="Magento Commerce"
composer create-project --repository-url=https://repo.magento.com/ magento/product-enterprise-edition=2.4.0 mee240
```

```bash tab="Magento Cloud"
composer create-project --repository-url=https://repo.magento.com/ magento/magento-cloud-metapackage=2.4.0 mc240
```

Show available versions:

```bash tab="Magento Open Source"
composer show magento/product-community-edition 2.4.* --all | grep -m 1 versions
```

```bash tab="Magento Commerce"
composer show magento/product-enterprise-edition 2.4.* --all | grep -m 1 versions
```

```bash tab="Magento Cloud"
composer show magento/magento-cloud-metapackage 2.4.* --all | grep -m 1 versions
```

## Install Magento from CLI
```bash
m2 setup:install \
    --use-rewrites=1 \
    --use-secure=1 \
    --base-url-secure=https://dev.local/m24x/ \
    --use-secure-admin=1 \
    --base-url=https://dev.local/m24x/ \
    --backend-frontname=admin \
    --db-name=m24x \
    --db-user=duser \
    --db-password=dpass \
    --session-save=files
```

## Add Administrator
```bash
m2 admin:user:create \
    --admin-user=admin \
    --admin-password=password \ 
    --admin-email=$USER@dev.local \
    --admin-firstname=Support \
    --admin-lastname=Account
```

## Upgrade Magento Project
```bash
cp composer.json composer.json.bak
composer require magento/product-community-edition 2.3.3 --no-update
composer update
m2 setup:upgrade
```
