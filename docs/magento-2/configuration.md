# Configuration
--8<-- "m2.md"
 
## Sign Static Files
Disable timestamp in static files like `pub/static/version12345993943/file.js`

=== "bash"
    ```bash
    m2 config:set dev/static/sign 0
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
m2 config:set "web/cookie/cookie_lifetime" 256000        # Default Cookie Settings > Cookie Lifetime
m2 config:set "web/seo/use_rewrites" 1                   # Search Engine Optimization > Use Web Server Rewrites = Yes
```
**Stores > Configuration > Mageplaza Extensions > General Configuration**
```bash
m2 config:set "smtp/general/enabled" 0                   # Enable Mageplaza SMTP = No
```
 
**Set Base URL**
```bash
url="prj.com" && m2 setup:store-config:set --base-url="https://$url/" --base-url-secure="https://$url/" --use-secure=1 --use-secure-admin=1 && m2 cache:clean
```

## Admin

**Stores > Configuration > Advanced > Admin**
```bash
m2 config:set "admin/captcha/enable" 0                   # CAPTCHA > Enable CAPTCHA in Admin = No
```
**Stores > Configuration > Advanced > Admin > Security**
```bash
m2 config:set "admin/security/session_lifetime" 31536000 # Admin Session Lifetime (seconds)
m2 config:set "admin/security/password_lifetime" ""      # Password Lifetime (days)
m2 config:set "admin/security/admin_account_sharing" 1   # Admin Account Sharing = Yes
m2 config:set "admin/security/lockout_failures" ""       # Maximum Login Failures to Lockout Account = ""
m2 config:set "admin/security/password_is_forced" 0      # Password Change = "Recommended"
m2 config:set "admin/security/use_form_key" 0            # Add Secret Key to URLs = No
```

## CSS/JS

**Stores > Configuration > Advanced > CSS Settings**
```bash
m2 config:set "dev/css/merge_css_files" 0                # Merge CSS Files = No
m2 config:set "dev/css/minify_files" 0                   # Minify CSS Files = No
```

**Stores > Configuration > Advanced > JavaScript Settings**
```bash
m2 config:set "dev/js/merge_files" 0                     # Merge JavaScript Files = No
m2 config:set "dev/js/enable_js_bundling" 0              # Enable JavaScript Bundling = No
m2 config:set "dev/js/minify_files" 0                    # Minify JavaScript Files = No
```

## Debug

**Template Hints**

```bash
m2 config:set "dev/debug/template_hints_storefront" 1 && m2 config:set "dev/debug/template_hints_blocks" 1 # enable
```
```bash
m2 config:set "dev/debug/template_hints_storefront" 0 && m2 config:set "dev/debug/template_hints_blocks" 0 # disable
```

!!! info "Magento Admin"
    Stores > Configuration > Advanced > Developer > Debug > Enabled Template Path Hints for Storefront      
    Stores > Configuration > Advanced > Developer > Debug > Add Block Class Type to Hints

**Debug Logging**
```bash
m2 setup:config:set --enable-debug-logging=true && m2 cache:flush   # enable
```
```bash
m2 setup:config:set --enable-debug-logging=false && m2 cache:flush  # disable
```

**Syslog Logging**
```bash
m2 setup:config:set --enable-syslog-logging=true && m2 cache:flush  # enable
```
```bash
m2 setup:config:set --enable-syslog-logging=false && m2 cache:flush # disable
```

**Database logging**
```bash
m2 dev:query-log:enable && m2 cache:flush
```
```bash
cat var/debug/db.log | less
```
```bash
m2 dev:query-log:disable && m2 cache:flush
```
