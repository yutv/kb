## Grant Priviledges

    GRANT ALL PRIVILEGES ON `website_com`.* TO 'website_user'@'%';
    
##Store mysql user name and password
To use `mysql` and `mysqldump` commands without password just store credentials in `~/.my.cnf` file, e.g.:

    [client]
    user="devuser"
    password="devpassword"

##Dump database w/o DEFINER

    dbName='dbname' && mysqldump --opt $dbName | sed -e 's/DEFINER[ ]*=[ ]*[^*]*\*/\*/' | bzip2 > $dbName.sql.bz2

The same but with `--extended-insert=FALSE` option when you need to analyze/edit dump:
    
    dbName='dbname' && mysqldump --opt --extended-insert=FALSE $dbName | sed -e 's/DEFINER[ ]*=[ ]*[^*]*\*/\*/' | bzip2 > $dbName.sql.bz2
    
##Calculate database size

    SELECT table_schema AS "Database", 
    ROUND(SUM(data_length + index_length) / 1024 / 1024, 2) AS "Size (MB)" 
    FROM information_schema.TABLES 
    GROUP BY table_schema;

## Locking

    if get_lock(lock_name, 1) then
    -- LOCKING ok, proceed
        set @0 = release_lock(lock_name);
    else
    -- LOCKING failed, handle this
    end if;