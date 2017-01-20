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

test('Registry.on throws an error for invalid event name or its type', t => {
	let registry = Registry([]);

	const error1 = t.throws( () => { registry.on('invalid', () => {}) }, Error);
	t.is(error1.message, `Event name "invalid" is not valid. Use either "enter" or "exit".`)

	const error2 = t.throws( () => { registry.on(123, () => {}) }, Error);
	t.is(error2.message, `No event name provided or event type is not a string.`)
});