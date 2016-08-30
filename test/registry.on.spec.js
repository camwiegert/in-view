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
