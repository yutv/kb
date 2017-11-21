#Disable Browser Cache for specific folder
Place the following line into .htaccess:

    Header set Pragma "no-cache" "expr=%{REQUEST_URI}=~/VendorName/i"

As result url with "VendorName" in path will get `Pragma "no-cache"` http header, so browser won't cache it.
This trick is very useful for magento developers who are working with js components or html templates and want to disable cache for a certain folder only.  