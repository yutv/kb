# Bulk Actions

--8<-- "m2.md"

## Trigger processing bulk actions
```bash
m2 queue:consumers:start product_action_attribute.update --single-thread --max-messages=10000
```

## Misc

Tables:
- magento_bulk

BO Save product attributes: https://dev.local/admin/catalog/product_action_attribute/save/store/0/active_tab/inventory/
