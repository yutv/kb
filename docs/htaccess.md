##Disable Browser Cache for specific folder
Place the following line into .htaccess:

    Header set Cache-Control "no-store" "expr=%{REQUEST_URI}=~/(VendorName1|VendorName2|requirejs-config\.js)/i"

As result url with "VendorName" in path will get `Pragma "no-cache"` http header, so browser won't cache it.
This trick is very useful for magento developers who are working with js components or html templates and want to disable cache for a certain folder only.  

##Basic Auth with URL exception
Access **/dir/subdir/file.txt** file without authorization
    
    SetEnvIf Request_URI "dir\/subdir\/file\.txt$" no_auth
    AuthType Basic
    AuthUserFile /home/user/public_html/.htpasswd
    AuthName "Restricted Area"
    Require valid-user
    Order allow,deny
    Allow from env=no_auth
    Satisfy any

##Define base path as environment variable for further usage

    RewriteCond %{REQUEST_URI}::$1 ^(/.+)/(.*)::\2$
    RewriteRule ^(.*) - [E=BASE:%1]
    RewriteRule ^(.*)$ %{ENV:BASE}/index.php [L]