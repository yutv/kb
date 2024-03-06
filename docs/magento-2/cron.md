
--8<-- "m2.md"

## Run cron as standalone process:
```bash
php bin/magento cron:run --group=default --bootstrap=standaloneProcessStarted=1
```

## Debug Cron Job
```sql
TRUNCATE `cron_schedule`;
INSERT INTO `cron_schedule` (`job_code`, `status`, `messages`, `created_at`, `scheduled_at`, `executed_at`, `finished_at`) VALUES
('lengow_connector_launch_export', 'pending', NULL, NOW(), NOW(), NULL, NULL);
```
```bash
php bin/magento cache:clean
php bin/magento cron:run --group=default --bootstrap=standaloneProcessStarted=1
```

## Reindex invalid indexers (full reindex of invalid indexers)
```sql
TRUNCATE `cron_schedule`;
INSERT INTO `cron_schedule` (`job_code`, `status`, `messages`, `created_at`, `scheduled_at`, `executed_at`, `finished_at`) VALUES
('indexer_reindex_all_invalid', 'pending', NULL, NOW(), NOW(), NULL, NULL);
```
```bash
php bin/magento cron:run --group=index --bootstrap=standaloneProcessStarted=1
```
## Reindex of subscribed records of idle indexers
```sql
TRUNCATE `cron_schedule`;
INSERT INTO `cron_schedule` (`job_code`, `status`, `messages`, `created_at`, `scheduled_at`, `executed_at`, `finished_at`) VALUES
('indexer_update_all_views', 'pending', NULL, NOW(), NOW(), NULL, NULL);
```
```bash
php bin/magento cron:run --group=index --bootstrap=standaloneProcessStarted=1
```

## Statistics
```sql
SELECT date(scheduled_at), 
    count(schedule_id) AS cnt, 
    SUM(IF(executed_at IS NULL, 0, 1)) as executed, 
    SUM(IF(finished_at IS NULL, 0, 1)) as finished
FROM `cron_schedule`  
GROUP BY date(scheduled_at)
ORDER BY `scheduled_at`  DESC;
```

## Files

1. `Magento\Cron\Observer\ProcessCronQueueObserver::execute(Observer $observer)`([view](https://github.com/magento/magento2/blob/2.3.3/app/code/Magento/Cron/Observer/ProcessCronQueueObserver.php#L204))
2. `Magento\Cron\Observer\ProcessCronQueueObserver::processPendingJobs($groupId, $jobsRoot, $currentTime)` ([view](https://github.com/magento/magento2/blob/2.3.3/app/code/Magento/Cron/Observer/ProcessCronQueueObserver.php#L749))
