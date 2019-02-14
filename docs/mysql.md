##Store mysql user name and password
To use `mysql` and `mysqldump` commands without password just store credentials in `~/.my.cnf` file, e.g.:

    [client]
    user="devuser"
    password="devpassword"

##Dump database w/o DEFINER

    dbName='dbname' && mysqldump --opt $dbName | sed -e 's/DEFINER[ ]*=[ ]*[^*]*\*/\*/' > $dbName.sql

