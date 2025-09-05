##Grant Priviledges
```sql
GRANT ALL PRIVILEGES ON `db_name`.* TO 'user_name'@'%';
```
```sql
GRANT ALL PRIVILEGES ON *.* TO 'user_name'@'%';
```
    
##Store mysql user name and password
To use `mysql` and `mysqldump` commands without password just store credentials in `~/.my.cnf` file, e.g.:

    [client]
    user="devuser"
    password="devpassword"

##Dump database w/o DEFINER
1. 
```bash
dbName='dbname' && mysqldump --no-tablespaces --single-transaction --opt $dbName \
  | sed -e 's/DEFINER[ ]*=[ ]*[^*]*\*/\*/' \
  | gzip > $dbName`date +%Y%m%dT%H%M%S`.sql.gz
```
2. 
```bash
dbName='dbname' && mysqldump --no-tablespaces --single-transaction --opt $dbName \
  | sed -E 's/DEFINER=[^ *]+//' \
  | gzip > $dbName`date +%Y%m%dT%H%M%S`.sql.gz
```

Additional useful options:

- `--extended-insert=FALSE` - to analyze/edit dump
- `--insert-ignore` - when db has unique key duplicates (happens some time)
- `| sed 's/ AUTO_INCREMENT=[0-9]*//g'` - ignore AUTO_INCREMENT  
- `--ignore-table=cron_schedule` - ignore AUTO_INCREMENT  
- `--no-data` - dump schema w/o data  
- `--no-create-info` - dump data w/o schema  
- `--no-tablespaces`  

## DB import
1. Regular db import
```bash
zcat ../db/website-db.sql.gz | sed -E 's/DEFINER=[^ *]+//' | mysql website_db
```
2. Workaround in case of importing db from backup with duplicates e.g. "Duplicate entry 'foo' for key 'bar'":
```bash
zcat ../db/website-db.sql.gz | sed 's/INSERT INTO `/INSERT IGNORE INTO `/g' | sed -E 's/DEFINER=[^ *]+//' | mysql website_db
```

## Delete row duplicates

check for duplicates
```sql
SELECT url_rewrite_id, COUNT(*) AS cnt 
FROM catalog_url_rewrite_product_category 
GROUP BY url_rewrite_id 
HAVING cnt > 1; 
```

delete duplicates
```sql
DELETE FROM catalog_url_rewrite_product_category
WHERE url_rewrite_id IN (
    SELECT url_rewrite_id
    FROM (SELECT
            url_rewrite_id,
            ROW_NUMBER() OVER (PARTITION BY url_rewrite_id ORDER BY url_rewrite_id) AS row_num
         FROM catalog_url_rewrite_product_category
         ) AS t
    WHERE row_num > 1
);
```

## Apply additional DB patches from folder
```bash
cat dev/misc/db/after-import/* | mysql website_db
```

## Find foreign key references

=== "All columns"
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
=== "Specific column"
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
Source: [1](https://tableplus.com/blog/2018/08/mysql-how-to-see-foreign-key-relationship-of-a-table.html)

## Statistics

=== "Databases size"
    ```sql
    SELECT table_schema AS `database`, 
    ROUND(SUM(data_length + index_length) / 1024 / 1024, 2) AS size_mb 
    FROM information_schema.TABLES 
    GROUP BY table_schema;
    ```
=== "Tables size"
    ```sql
    SELECT table_name AS `table`, 
    ROUND((data_length + index_length) / 1024 / 1024, 2) AS size_mb 
    FROM information_schema.TABLES 
    WHERE TABLE_SCHEMA = DATABASE()
    ORDER BY size_mb DESC
    ```
## Locking
```sql
IF GET_LOCK(lock_name, 1) THEN
-- LOCKING ok, proceed
    SET @0 = release_lock(lock_name);
ELSE
-- LOCKING failed, handle this
END IF;
```
