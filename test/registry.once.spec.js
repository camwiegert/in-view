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

test('Registry.once throws an error for invalid event name or its type', t => {
	let registry = Registry([]);

	const error1 = t.throws( () => { registry.once('invalid', () => {}) }, Error);
	t.is(error1.message, `Event name "invalid" is not valid. Use either "enter" or "exit".`)

	const error2 = t.throws( () => { registry.once(123, () => {}) }, Error);
	t.is(error2.message, `No event name provided or event type is not a string.`)
});
