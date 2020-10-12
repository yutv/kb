
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

## Useful Links

1. `Magento\CatalogInventory\Model\StockStateProvider::checkQty(StockItemInterface $stockItem, $qty)` ([view](https://github.com/magento/magento2/blob/2.3.3/app/code/Magento/CatalogInventory/Model/StockStateProvider.php#L240))
2. `Magento\PageCache\Observer\FlushCacheByTags::execute(Observer $observer)` ([view](https://github.com/magento/magento2/blob/2.3.3/app/code/Magento/PageCache/Observer/FlushCacheByTags.php#L57))
3. `Magento\Framework\App\Request\CsrfValidator` 
4. Quote
    - `\Magento\Quote\Model\Quote\Item\Processor::prepare`
    - `\Magento\Tax\Model\Sales\Total\Quote\CommonTaxCollector::updateItemTaxInfo`
5. 
 