import test from 'ava';
import Registry from '../src/registry';

test('Registry.on registers one handler to handlers', t => {

    let registry = Registry([]);

    registry.on('enter', () => {});
    t.true(registry.handlers.enter.length === 1);

    registry.on('exit', () => {});
    t.true(registry.handlers.exit.length === 1);

    registry.on('enter', () => {});
    t.true(registry.handlers.enter.length === 2);

});

test('Registry.on returns the registry', t => {
    let registry = Registry([]);
    t.deepEqual(registry.on('enter', () => {}), registry);
});
