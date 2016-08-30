import test from 'ava';
import inView from '../src/in-view';
import { inViewport } from '../src/viewport';

test('inView.is is a proxy for inViewport', t => {
    t.deepEqual(inView.is, inViewport);
});
