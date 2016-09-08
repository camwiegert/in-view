import test from 'ava';
import Registry from '../src/registry';

window.innerWidth = 1280;
window.innerHeight = 700;

const offset = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
};

test('Registry.check updates current', t => {

    let registry = Registry([{
        getBoundingClientRect() {
            return {
                bottom: 1,
                left: 1,
                right: 1,
                top: 1
            };
        }
    }, {
        getBoundingClientRect() {
            return {
                bottom: -1,
                left: -1,
                right: -1,
                top: -1
            };
        }
    }], offset);

    t.true(!registry.current.length);

    registry.check();
    t.true(registry.current.length === 1);

});

test('Registry.check emits enter events', t => {

    let stub = {
        getBoundingClientRect() {
            return {
                bottom: 1,
                left: 1,
                right: 1,
                top: 1
            };
        }
    };

    let registry = Registry([stub], offset);

    registry.on('enter', el => t.deepEqual(el, stub));
    registry.check();

});

test('Registry.check emits exit events', t => {

    let stub = {
        getBoundingClientRect() {
            return {
                bottom: -1,
                left: -1,
                right: -1,
                top: -1
            };
        }
    };

    let registry = Registry([stub], offset);

    registry.on('exit', el => t.deepEqual(el, stub));
    registry.check();

});

test('Registry.check returns the registry', t => {
    let registry = Registry([], offset);
    t.deepEqual(registry.check(), registry);
});
