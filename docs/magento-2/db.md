**File:** 
```
vendor/magento/zendframework1/library/Zend/Db/Adapter/Pdo/Abstract.php:223
```

**Breakpoint:** 
```
false !== strpos('' . $sql, 'cataloginventory_stock_item') && false !== strpos('' . $sql, 'UPDATE')
```

**Watch Query**
```php
\Magento\Framework\App\ObjectManager::getInstance()->get(\Magento\Framework\App\ResourceConnection::class)->getConnection()->queryAll('SELECT * FROM `catalog_product`')
```