### Show knockout model associates with DOM node
```javascript
require('ko').dataFor(jQuery('.totals.shipping.excl').get(0));
```

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

### Misc
```javascript
require(['Magento_Checkout/js/model/quote'], function(quote){
    var getAddress = function (address) {
        if (!address) {
            return address;
        }
        return (!address.street) ? address.street : address.street[0];
    }
    quote.billingAddress.subscribe(function(address){
        console.groupCollapsed('billingAddress: ' + getAddress(address));
        console.trace();
        console.groupEnd();
    });
    quote.shippingAddress.subscribe(function(address){
        console.groupCollapsed('shippingAddress: ' + getAddress(address));
        console.trace()
        console.groupEnd();
    });
});

require(['Magento_Checkout/js/model/quote'], function(quote){
    quote.shippingMethod.subscribe(function(shippingMethod){
        console.groupCollapsed('shippingMethod: ' + shippingMethod.carrier_code + '_' + shippingMethod.method_code);
        console.trace();
        console.groupEnd();
    });
});
``` 

### Observe DOM Node Attribute Mutation
```javascript
    const targetNode = document.querySelector('#telephone');
    const config = { attributes: true, childList: true, subtree: true };
    const callback = function(mutationsList, observer) {
        for (let mutation of mutationsList) {
            console.groupCollapsed('mutation[' + mutation.type + ']: ' + mutation.attributeName);
            console.log(mutation);
            console.trace()
            console.groupEnd();
        }
    };
    const observer = new MutationObserver(callback);
    observer.observe(targetNode, config);
```

### jQuery Change Event Observer Position
```javascript
var element = document.getElementById('#element'),
element.on('click', this.onClick.bind(this));       # add on click observer
observer = $._data(element, 'events').click.pop();  # remove the last observer
$._data(element, 'events').click.unshift(observer); # insert it to the beginning 
``` 

### Show message on early stage
```js
define([
    'uiElement'
], function (Element) {
    'use strict';

    return Element.extend({
        defaults: {
            msgError: 'Some error message',
            modules: {
                messages: 'messages'
            }
        },

        initialize: function () {
            this._super();
            this.showError(this.msgError);
        },

        showError: function (text) {
            this.messages(function (component) {
                var data = component.messages();
                data.messages = data.messages || [];
                data.messages.push({ text: text, type: 'error' });
                component.messages(data);
            });
        }
    });
});
```

### Files

1. [mage/common.js](https://github.com/magento/magento2/blob/2.4-develop/lib/web/mage/common.js) on form submit automatically adds form_key input if missed.
2. [block-loader.js](https://github.com/magento/magento2/blob/2.4-develop/app/code/Magento/Ui/view/base/web/js/block-loader.js) when use it with jquery.validate keep in mind it disables inputs 