import test from 'ava';
import inView from '../src/in-view';

test('inView.offset returns the offset', t => {
    t.true(inView.offset(50) === 50);
});

test('inView.offset returns current offset if it doesn\'t receive a number', t => {
    t.true(inView.offset(10) === 10);
    t.true(inView.offset('foo') === 10);
});
