import test from 'ava';
import inView from '../src/in-view';

const view = new inView();

test('inView.offset returns the offset', t => {
    const stub = {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    };
    t.deepEqual(view.offset(0), stub);
    t.deepEqual(view.offset(), stub);
});

test('inView.offset accepts a number', t => {
    t.deepEqual(view.offset(10), {
        top: 10,
        right: 10,
        bottom: 10,
        left: 10
    });
});

test('inView.offset accepts an object', t => {
    t.deepEqual(view.offset({
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
