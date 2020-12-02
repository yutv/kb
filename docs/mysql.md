## Grant Priviledges

    GRANT ALL PRIVILEGES ON `website_com`.* TO 'website_user'@'%';
    
##Store mysql user name and password
To use `mysql` and `mysqldump` commands without password just store credentials in `~/.my.cnf` file, e.g.:

    [client]
    user="devuser"
    password="devpassword"

##Dump database w/o DEFINER
1. 
```bash
dbName='dbname' && mysqldump --opt $dbName | sed -e 's/DEFINER[ ]*=[ ]*[^*]*\*/\*/' | bzip2 > $dbName.sql.bz2
```
2. 
```bash
dbName='dbname' && mysqldump --opt $dbName | sed -E 's/DEFINER=[^ *]+//' | bzip2 > $dbName.sql.bz2
```

Additional useful options:

- `--extended-insert=FALSE` - to analyze/edit dump
- `--insert-ignore` - when db has unique key duplicates (happens some time)
- `| sed 's/ AUTO_INCREMENT=[0-9]*//g'` - ignore AUTO_INCREMENT  
- `--ignore-table=cron_schedule` - ignore AUTO_INCREMENT  

## Find foreign key references

All columns
```sql
SELECT
    TABLE_NAME,
    COLUMN_NAME,
    CONSTRAINT_NAME,
    REFERENCED_TABLE_NAME,
    REFERENCED_COLUMN_NAME
FROM
    INFORMATION_SCHEMA.KEY_COLUMN_USAGE
WHERE
	REFERENCED_TABLE_SCHEMA = 'db_name'
    AND REFERENCED_TABLE_NAME = 'table_name';
```
Specific column:
```sql
SELECT
    TABLE_NAME,
    COLUMN_NAME,
    CONSTRAINT_NAME,
    REFERENCED_TABLE_NAME,
    REFERENCED_COLUMN_NAME
FROM
    INFORMATION_SCHEMA.KEY_COLUMN_USAGE
WHERE
	REFERENCED_TABLE_SCHEMA = 'db_name'
    AND REFERENCED_TABLE_NAME = 'table_name'
    AND REFERENCED_COLUMN_NAME = 'column_name';
```
Source: https://tableplus.com/blog/2018/08/mysql-how-to-see-foreign-key-relationship-of-a-table.html

## Calculate database size

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
