window.uiQuery = (q) => {
    q = q || '';
    function execute(q) {
        require(['uiRegistry'], registry => {
            window.m2ui.map((name) => {
                if (!name || !~name.indexOf(q)) return;
                console.groupCollapsed(name);
                console.log(registry.get(name));
                console.groupEnd();
            });
        });
    }
    if (window.m2ui) {
        execute(q);

        return;
    }
    require(['uiRegistry'], registry => {
        registry.get((component, name) => {
            window.m2ui = window.m2ui || [];
            window.m2ui.push(name);
        });
        window.m2ui.sort();
        execute(q);

        return;
    });
};

window.uiInfo = (selector) => {
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
