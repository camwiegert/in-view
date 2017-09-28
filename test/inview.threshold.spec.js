import test from 'ava';
import inView from '../src/in-view';

test('inView.threshold returns the threshold', t => {
    t.true(inView.threshold() === 0);
    t.true(inView.threshold(0.5) === 0.5);
});

test('inView.threshold accepts a number', t => {
    t.true(inView.threshold(1) === 1);
});

test('inView.threshold validates the number', t => {
    t.true(inView.threshold(0) === 0);
    t.true(inView.threshold(5) === 0);
    t.true(inView.threshold(-1) === 0);
});
