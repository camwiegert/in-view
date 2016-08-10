import Registry from './registry';
import throttle from 'lodash/throttle';

import {
    getElements,
    inViewport
} from './utils';

const inView = () => {

    const threshold = 100;
    const triggers  = ['scroll', 'resize'];

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

    control.is = inViewport;

    triggers.forEach(event =>
        window.addEventListener(event, throttle(e => {
            catalog.history.forEach(selector => {
                catalog[selector].check();
            });
        }, threshold, { trailing: true })));

    return control;

};

export default inView();
