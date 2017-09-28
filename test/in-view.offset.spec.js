import test from 'ava';
import inView from '../src/in-view';

test('inView.offset returns the offset', t => {
    const stub = {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    };
    t.deepEqual(inView.offset(0), stub);
    t.deepEqual(inView.offset(), stub);
});

test('inView.offset accepts a number', t => {
    t.deepEqual(inView.offset(10), {
        top: 10,
        right: 10,
        bottom: 10,
        left: 10
    });
});

test('inView.offset accepts an object', t => {
    t.deepEqual(inView.offset({
        top: 25,
        right: 50,
        bottom: 75,
        left: 100
    }), {
        top: 25,
        right: 50,
        bottom: 75,
        left: 100
    });
});
