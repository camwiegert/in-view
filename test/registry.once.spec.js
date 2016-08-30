import test from 'ava';
import Registry from '../src/registry';

test('Registry.once registers one handler to singles', t => {

    let registry = Registry([]);

    registry.once('enter', () => {});
    t.true(registry.singles.enter.length === 1);

    registry.once('exit', () => {});
    t.true(registry.singles.exit.length === 1);

    registry.once('enter', () => {});
    t.true(registry.singles.enter.length === 2);

});

test('Registry.once returns the registry', t => {
    let registry = Registry([]);
    t.deepEqual(registry.once('enter', () => {}), registry);
});
