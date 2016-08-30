import test from 'ava';
import Registry from '../src/registry';

test('Registry.once registers one handler to singles', t => {

    let registry = Registry([]);
    registry.once('enter', () => {});

    t.true(registry.singles.enter.length === 1);

});

test('Registry.once handlers are removed after invocation', t => {

    let registry = Registry([document.body]);
    registry.once('enter', () => {})
        .emit('enter', document.body);

    t.true(!registry.singles.enter.length);

});
