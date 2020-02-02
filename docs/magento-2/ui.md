### Show all UI components on the page
```javascript
require('uiRegistry').get((component, name) => {
    console.groupCollapsed(name); 
    console.log(component); 
    console.groupEnd();
});
```
Filter by name:

1. define the `#!js uiQuery(q)` function:
```javascript
var uiQuery = (q) => require('uiRegistry').get((component, name) => {
   if (!name || !~name.indexOf(q)) return;
   console.groupCollapsed(name); 
   console.log(component);
   console.groupEnd();
});
```
2. search for "checkout" components:
```javascript
uiQuery('checkout');
```
