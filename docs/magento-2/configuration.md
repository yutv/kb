# Configuration
--8<-- "m2.md"
 
## Sign Static Files
Disable timestamp in static files like `pub/static/version12345993943/file.js`

=== "bash"
    ```bash
    php bin/magento config:set dev/static/sign 0
    ```

=== "Magento Admin"
    ```
    Stores > Configuration > Advanced > Developer > Static Files Settings > Sign Static Files > No
    ```    
=== "sql"
    ```SQL
    INSERT INTO core_config_data (`path`, `value`) VALUES ('dev/static/sign', 0) 
    ON DUPLICATE KEY UPDATE `value` = VALUES(value);
    ```

## General
 
**Stores > Configuration > General > Web**
```bash
php bin/magento config:set "web/cookie/cookie_lifetime" 256000        # Default Cookie Settings > Cookie Lifetime
php bin/magento config:set "web/seo/use_rewrites" 1                   # Search Engine Optimization > Use Web Server Rewrites = Yes
```
**Stores > Configuration > Mageplaza Extensions > General Configuration**
```bash
php bin/magento config:set "smtp/general/enabled" 0                   # Enable Mageplaza SMTP = No
```
 
**Set Base URL**
```bash
php bin/magento setup:store-config:set --base-url='http://example.com/' \
  --base-url-secure='https://example.com/' \
  --use-secure=1 \
  --use-secure-admin=1
```
```bash
php bin/magento cache:clean
php bin/magento cache:flush
```

## Admin

**Stores > Configuration > Advanced > Admin**
```bash
php bin/magento config:set "admin/captcha/enable" 0                   # CAPTCHA > Enable CAPTCHA in Admin = No
```
**Stores > Configuration > Advanced > Admin > Security**
```bash
php bin/magento config:set "admin/security/session_lifetime" 31536000 # Admin Session Lifetime (seconds)
php bin/magento config:set "admin/security/password_lifetime" ""      # Password Lifetime (days)
php bin/magento config:set "admin/security/admin_account_sharing" 1   # Admin Account Sharing = Yes
php bin/magento config:set "admin/security/lockout_failures" ""       # Maximum Login Failures to Lockout Account = ""
php bin/magento config:set "admin/security/password_is_forced" 0      # Password Change = "Recommended"
php bin/magento config:set "admin/security/use_form_key" 0            # Add Secret Key to URLs = No
```

## CSS/JS

**Stores > Configuration > Advanced > CSS Settings**
```bash
php bin/magento config:set "dev/css/merge_css_files" 0                # Merge CSS Files = No
php bin/magento config:set "dev/css/minify_files" 0                   # Minify CSS Files = No
```

**Stores > Configuration > Advanced > JavaScript Settings**
```bash
php bin/magento config:set "dev/js/merge_files" 0                     # Merge JavaScript Files = No
php bin/magento config:set "dev/js/enable_js_bundling" 0              # Enable JavaScript Bundling = No
php bin/magento config:set "dev/js/minify_files" 0                    # Minify JavaScript Files = No
```

## Debug

**Template Hints**

```bash
php bin/magento config:set "dev/debug/template_hints_storefront" 1 && php bin/magento config:set "dev/debug/template_hints_blocks" 1 # enable
```
```bash
php bin/magento config:set "dev/debug/template_hints_storefront" 0 && php bin/magento config:set "dev/debug/template_hints_blocks" 0 # disable
```

!!! info "Magento Admin"
    Stores > Configuration > Advanced > Developer > Debug > Enabled Template Path Hints for Storefront      
    Stores > Configuration > Advanced > Developer > Debug > Add Block Class Type to Hints

**Debug Logging**
```bash
php bin/magento setup:config:set --enable-debug-logging=true && php bin/magento cache:flush   # enable
```
```bash
php bin/magento setup:config:set --enable-debug-logging=false && php bin/magento cache:flush  # disable
```

**Syslog Logging**
```bash
php bin/magento setup:config:set --enable-syslog-logging=true && php bin/magento cache:flush  # enable
```
```bash
php bin/magento setup:config:set --enable-syslog-logging=false && php bin/magento cache:flush # disable
```

**Database logging**
```bash
php bin/magento dev:query-log:enable && php bin/magento cache:flush
```
```bash
cat var/debug/db.log | less
```
```bash
php bin/magento dev:query-log:disable && php bin/magento cache:flush
```
