
--8<-- "m2.md"

## PhpStorm Urn
1. container:
```bash
php bin/magento dev:urn-catalog:generate .idea/misc.xml
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

## Disable event programmatically
```php
use Magento\Framework\Event\Config\Data;

class Foo
{
    public function __construct(Data $eventConfigData) 
    {
        $this->eventConfigData = $eventConfigData;
    }

    protected function disableEventObservers(string $event): void
    {
        $observers = $this->eventConfigData->get($event, []);
        if ($observers) {
            $observers = array_combine(array_keys($observers), array_fill(0, count($observers), ['disabled' => true]));
            $this->eventConfigData->merge([$event => $observers]);
        }
    }
}

// usage: $this->disableEventObservers('sales_order_shipment_save_after');
```

## Data Patch Development
```bash
mysql -e 'DELETE FROM patch_list WHERE patch_name = "Vendor\\Module\\Setup\\Patch\\Data\\InitializeStoresAndWebsites"' && php bin/magento setup:upgrade
```
## Recompile
```bash
m2="php -d memory_limit=-1 bin/magento" \
    && $php bin/magento maintenance:enable \
    && $php bin/magento cache:clean \
    && rm -Rf generated/code/* var/cache/* var/page_cache/* var/di/* var/view_preprocessed/* pub/static/* \
    && redis-cli FLUSHALL \
    && $php bin/magento setup:di:compile \
    && $php bin/magento setup:static-content:deploy -j 4 -t Vendor/default fr_FR en_US \
    && $php bin/magento setup:static-content:deploy -j 4 -t Magento/backend fr_FR en_US \
    && $php bin/magento maintenance:disable \
    && sudo systemctl restart varnish
```

## Well known validation (for Magento Cloud)

URL Example:
```
https://example.com/.well-known/abc => https://example.com/media/.well-known/example.com/abc
```

Fastly Solution:
```VCL
if (req.url ~ "/.well-known/") {
  set req.url = "/media/.well-known/" + req.http.host + regsub(req.url, "\/\.well-known\/", "/");
}
```

## Bookmarks

1. `I`:`\Magento\Framework\Interception\Interceptor::___callPlugins` - interceptor implementation
2. `E`:`\Elasticsearch\Connections\Connection::wrapHandler:331` - catch elasticsearch request/response
```php
if (preg_match('/^{"size":[^0].*/', (string) $request['body'])) {
   echo 'Request: '. $request['uri'] . PHP_EOL;
   echo '<style>textarea {width:100%; height:45%}</style>';
   echo '<textarea>' . json_encode(json_decode($request['body'], true), JSON_PRETTY_PRINT) . '</textarea>';
   echo 'Response:<textarea>' . json_encode($response['body'], JSON_PRETTY_PRINT) . '</textarea>';
   exit;
}
```
2.1.`\Smile\ElasticsuiteVirtualCategory\Model\Rule::getChildrenCategories`
3. `M`:`\Zend_Db_Adapter_Pdo_Abstract::query` - catch MySQL query
```php
static $handle;
if (null === $handle) {
   $handle = fopen(BP . '/var/log/sql.log', 'w+');
}
if ($handle) {
   $message = 'SQL: ' . $sql . PHP_EOL;
   if ($bind) {
       $message .= 'BING: ' . print_r($bind, true) . PHP_EOL;
   }
   fwrite($handle, $message . PHP_EOL);
}
```
3.1. `\Magento\Framework\DB\Adapter\Pdo\Mysql::prepareSqlCondition` - conditions map like 'lteq', 'gteq'
4. `P`:`\Magento\Catalog\Pricing\Price\FinalPrice` - catalog final price 
5. `R`:`\Magento\Framework\HTTP\PhpEnvironment\Response::setHttpResponseCode` - show does redirect, set break point here to find out.
6. pub/index.php - show XML layouts called for a current page
```php
$objectManager = \Magento\Framework\App\ObjectManager::getInstance();
$xmlLayout = $objectManager->get(\Magento\Framework\App\View::class);
echo '<pre>';print_r($xmlLayout->getLayout()->getUpdate()->getHandles());
```

## Useful Links

1. `Magento\CatalogInventory\Model\StockStateProvider::checkQty(StockItemInterface $stockItem, $qty)` ([view](https://github.com/magento/magento2/blob/2.3.3/app/code/Magento/CatalogInventory/Model/StockStateProvider.php#L240))
2. `Magento\PageCache\Observer\FlushCacheByTags::execute(Observer $observer)` ([view](https://github.com/magento/magento2/blob/2.3.3/app/code/Magento/PageCache/Observer/FlushCacheByTags.php#L57))
3. `Magento\Framework\App\Request\CsrfValidator` 
4. Quote
    - `\Magento\Quote\Model\Quote\Item\Processor::prepare`
    - `\Magento\Tax\Model\Sales\Total\Quote\CommonTaxCollector::updateItemTaxInfo`
5. [Test or style the Order Success Page or how to stop Success Page redirecting](https://magento.stackexchange.com/questions/211273/how-to-test-or-style-the-order-success-page-or-how-to-stop-success-page-redirect)
