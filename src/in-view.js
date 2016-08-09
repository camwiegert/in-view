import Registry from './registry';
import throttle from 'lodash/throttle';

import {
    getElements,
    inViewport
} from './utils';

const inView = () => {

    let catalog = { history: [] };

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

    let checkAll = (fn) => {
        catalog.history.forEach(selector => {
            catalog[selector].check(fn);
        });
        return control;
    };

    control.is = inViewport;
    control.check = checkAll;

    return control;

};

export default inView();
