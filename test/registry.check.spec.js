import test from 'ava';
import Registry from '../src/registry';
import { inViewport } from '../src/viewport';

window.innerWidth = 1280;
window.innerHeight = 700;

const opts = {
    offset: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    },
    threshold: 0,
    test: inViewport
};

test('Registry.check updates current', t => {

    const stub1 = new Element();
    const stub2 = new Element();

    stub1.getBoundingClientRect = () => {
        return {
            bottom: 1,
            left: 1,
            right: 1,
            top: 1,
            width: 100,
            height: 100
        };
    }

    stub2.getBoundingClientRect = () => {
        return {
            bottom: -1,
            left: -1,
            right: -1,
            top: -1,
            width: 100,
            height: 100
        };
    }

    let registry = Registry([stub1, stub2], opts);

    t.true(!registry.current.length);

    registry.check();
    t.true(registry.current.length === 1);

});

test('Registry.check emits enter events', t => {

    const stub = new Element();

    stub.getBoundingClientRect = () => {
        return {
            bottom: 1,
            left: 1,
            right: 1,
            top: 1,
            width: 100,
            height: 100
        };
    }

    let registry = Registry([stub], opts);

    registry.on('enter', el => t.deepEqual(el, stub));
    registry.check();

});

test('Registry.check emits exit events', t => {

    const stub = new Element();

    stub.getBoundingClientRect = () => {
        return {
            bottom: -1,
            left: -1,
            right: -1,
            top: -1,
            width: 100,
            height: 100
        };
    };

    let registry = Registry([stub], opts);

    registry.on('exit', el => t.deepEqual(el, stub));
    registry.check();

});

test('Registry.check returns the registry', t => {
    let registry = Registry([], opts);
    t.deepEqual(registry.check(), registry);
});
