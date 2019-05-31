##Setup Dynamic Base URL

```sql
INSERT INTO core_config_data (`path`, `value`) VALUES
('web/url/use_store',  1), 
('web/unsecure/base_url',  '{{base_url}}'), 
('web/secure/base_url', '{{base_url}}'),
('web/unsecure/base_link_url', '{{unsecure_base_url}}'),
('web/unsecure/base_skin_url', '{{unsecure_base_url}}skin/'),
('web/unsecure/base_media_url', '{{unsecure_base_url}}media/'),
('web/unsecure/base_js_url', '{{unsecure_base_url}}js/'),
('web/secure/base_link_url', '{{secure_base_url}}'),
('web/secure/base_skin_url', '{{secure_base_url}}skin/'),
('web/secure/base_media_url', '{{secure_base_url}}media/'),
('web/secure/base_js_url', '{{secure_base_url}}js/')
ON DUPLICATE KEY UPDATE `value` = VALUES(`value`);
```

##CLI clear cache

    php -r 'require "app/Mage.php"; Mage::app()->getCacheInstance()->flush();'

##Unison profile

~/.unison/magento1.prf
    
    include default
    ignore = Path var/?*
    ignore = Path var/.?*
    ignore = Path media

##force secure urls

app/etc/local.xml
    
    <?xml version="1.0"?>
    <config>
      <frontend>
        <secure_url>
          <all>/</all>
        </secure_url>
      </frontend>
    </config>