# Bulk Actions

--8<-- "m2.md"

## Trigger processing bulk actions
```bash
m2 queue:consumers:start product_action_attribute.update --single-thread --max-messages=10000
```
