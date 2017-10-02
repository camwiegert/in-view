import test from 'ava';
import { Registry } from '../src/registry';

const opts = {
    offset: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    },
    threshold: 0,
    test: function(){}
};

test('Registry returns a registry', t => {
    var selector = ".foo";
    let registry = Registry([document.body], opts, selector);
    t.deepEqual(registry, {
        options: opts,
        selector: selector,
        current: [],
        elements: [document.body],
        handlers: { enter: [], exit: [] },
        singles: { enter: [], exit: [] }
    });
});
