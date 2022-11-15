## M2JS

Magento 2 UI custom debug functions: **uii** (ui info) and **uiq** (ui query).

1. Install a Browser Plugin to include additional JS like [User JavaScript and CSS](https://chrome.google.com/webstore/detail/user-javascript-and-css/nbhcbdghjpllgmfilhnhkllmkecfmpld) 
2. Include external JS Library: [https://yutv.github.io/kb/js/m2.js](https://yutv.github.io/kb/js/m2.js)
3. Open Developer Tools (F12), the following functions should be available:
```javascript
uiq(); // list of UI components on the page
uii();  // information about UI Component
```

**Usage Examples:**

1. `uiq()` - show all ui components on the page.
2. `uiq('shipping-step')` - show ui components which have `shipping-step` in the name.
3. Inspect a DOM Element using the Developer Tools (F12) and run the `uii()`. It will output information about knockout view model attached to the selected DOM element.
4. `uii('#my-element-id')` - show ko view model attached to the DOM element with given selector.

## Misc
## Get product IDs from a category page
```javascript
jQuery('.product-item-info').map(function (i, e) { return e.id.replace('product-item-info_', ''); }).toArray().join(',');
```
### Show knockout model associates with DOM node
```javascript
require('ko').dataFor(document.querySelector('.totals.shipping.excl'));
```

### Debug when shipping/billing address and shipping method changed 
```javascript
if (window.checkoutConfig) {
    require(['Magento_Checkout/js/model/quote'], function(quote){
        var getAddress = function (address) {
            if (!address) {
                return address;
            }
            
            var result = (!address.street) ? address.street : address.street[0];
            result += ', ' + address.countryId;
            
            return result;
        }
        quote.billingAddress.subscribe(function(address){
            console.groupCollapsed('billingAddress: ' + getAddress(address));
            console.info(address);
            console.trace();
            console.groupEnd();
        });
        quote.shippingAddress.subscribe(function(address){
            console.groupCollapsed('shippingAddress: ' + getAddress(address));
            console.info(address);
            console.trace()
            console.groupEnd();
        });
        quote.shippingMethod.subscribe(function(shippingMethod){
            console.groupCollapsed('shippingMethod: ' + shippingMethod?.carrier_code + '_' + shippingMethod?.method_code);
            console.info(shippingMethod);
            console.trace();
            console.groupEnd();
        });
    });
}
```

### Observe DOM Node Attribute Mutation
```javascript
window.addEventListener('DOMContentLoaded', () => {
    const targetNode = document.querySelector('#payment_fr_express_checkout_other_express_checkout_required_enable_express_checkout');
    if (!targetNode) {
        return;
    }
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
});
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
## jQuery Validate

### custom message
```html
<input type="text" name="firstname" data-validate='{"required":true}' data-msg-required="Please introduce yourself"/>
```
Source: [1](https://magento.stackexchange.com/questions/163585/magento-2-how-to-set-custom-validation-message)

## Files

1. [mage/common.js](https://github.com/magento/magento2/blob/2.4-develop/lib/web/mage/common.js) on form submit automatically adds form_key input if missed.
2. [block-loader.js](https://github.com/magento/magento2/blob/2.4-develop/app/code/Magento/Ui/view/base/web/js/block-loader.js) when use it with `jquery.validate.js` keep in mind it disables form fields. 

## Loader

### Ajax Loader
lib/web/mage/loader.js:207 - shows full screen loader
data-bind="blockLoader: isLoading" - shows block loader
