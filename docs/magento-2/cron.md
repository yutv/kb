
--8<-- "m2.md"

**Run cron as standalone process:**
```bash
m2 cron:run --group=default --bootstrap=standaloneProcessStarted=1
```

**Files:**

1. `Magento\Cron\Observer\ProcessCronQueueObserver::execute(Observer $observer)`([view](https://github.com/magento/magento2/blob/2.3.3/app/code/Magento/Cron/Observer/ProcessCronQueueObserver.php#L204))
2. `Magento\Cron\Observer\ProcessCronQueueObserver::processPendingJobs($groupId, $jobsRoot, $currentTime)` ([view](https://github.com/magento/magento2/blob/2.3.3/app/code/Magento/Cron/Observer/ProcessCronQueueObserver.php#L749))
