import Registry from './registry';
import throttle from 'lodash/throttle';

import {
    getElements,
    inViewport
} from './utils';

const inView = () => {

    let catalog = { history: [] };

    let checkAll = (fn) => {
        catalog.history.forEach(selector => {
            catalog[selector].check(fn);
        });
        return control;
    };

    let control = (selector) => {
        let elements = getElements(selector);
        if (catalog.history.indexOf(selector) > -1) {
            catalog[selector].elements = elements;
        } else {
            catalog[selector] = new Registry(elements);
            catalog.history.push(selector);
        }
        return catalog[selector];
    };

    control.is = inViewport;

    ['scroll', 'resize'].forEach(event =>
        window.addEventListener(event, throttle(e => checkAll(), 100, { trailing: true })));

    return control;

};

export default inView();
