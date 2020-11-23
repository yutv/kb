window.ui = (name) => {
    return require('uiRegistry').get(name);
};

window.uiq = (q) => {
    q = q || '';

    var result = [], registry = require('uiRegistry');
    registry.get((component, name) => {
        if (name && !!~name.indexOf(q)) {
            result.push(name);
        }
    });

    if (result.length === 1) {
        return registry.get(result[0]);
    }

    result.sort().forEach(function (name) {
        var component = registry.get(name);
        console.groupCollapsed(name);
        console.log('template', component.template);
        console.log(component);
        console.groupEnd();
    });
};

window.uii = (selector) => {
    var node = selector ? document.querySelector(selector) : $0;
    if (!node) {
        console.error('Inspect DOM element or provide a correct selector');
        return;
    }
    var component = require('ko').dataFor(node);
    if (component) {
        console.log('summary', {
            component: component.component,
            name: component.name,
            template: component.template
        });

        return component;
    }
}

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
