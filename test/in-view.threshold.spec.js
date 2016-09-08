import test from 'ava';
import inView from '../src/in-view';

test('inView.threshold returns the threshold', t => {
    t.true(inView.threshold(50) === 50);
});

test('inView.threshold returns current threshold if it doesn\'t receive a number', t => {
    t.true(inView.threshold(10) === 10);
    t.true(inView.threshold('foo') === 10);
});