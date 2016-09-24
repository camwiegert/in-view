import test                     from 'ava';
import { example1, example2,
    example3, example4 }        from './helpers/stub-nodes';
import { inViewport }           from '../src/viewport';

window.innerWidth  = 1280;
window.innerHeight = 700;


test('inViewport: #example1 returns a boolean', t => {
    t.true(typeof inViewport(example1) === 'boolean');
});

test('inViewport: #example1 accepts an offset', t => {
    t.false(inViewport(example1, 250));
});

// TEST example2
// See ascii art of example2
test('inViewport: #example2 handles parent container w/o offset', t => {
    t.true(inViewport(example2, example2.parentNode));
});

test('inViewport: #example2 handles parent container w/ offset', t => {
    t.true(inViewport(example2, example2.parentNode, 40));
});

test('inViewport: #example2 handles parent container w/ too much offset', t => {
    t.false(inViewport(example2, example2.parentNode, 60));
});


// TEST example3
// See ascii art of example3
test('inViewport: #example3 handles parent container w/o offset', t => {
    t.true(inViewport(example3, example3.parentNode));
});

test('inViewport: #example3 handles parent container w/ offset', t => {
    t.true(inViewport(example3, example3.parentNode, 40));
});

test('inViewport: #example3 handles parent container w/ too much offset', t => {
    t.true(inViewport(example3, example3.parentNode, 60));
});

// TEST example4
// See ascii art of example4
test('inViewport: #example4 handles parent container w/o offset', t => {
    t.false(inViewport(example4, example4.parentNode));
});

test('inViewport: #example4 handles parent container w/ offset', t => {
    t.false(inViewport(example4, example4.parentNode, 40));
});

test('inViewport: #example4 handles parent container w/ too much offset', t => {
    t.false(inViewport(example4, example3.parentNode, 60));
});


// Stub data: example2
//  A Not-to-scale Example of stub-nodes .example2
//    |==========|
//    |          |
//    |          |
//    |          |
// ===|==========|===========================================
// || |          |                                         ||
// || |          |                                         ||
// || |==========|                                         ||
// ||                                                      ||
// ||                                                      ||
// ||                                                      ||
// ||                                                      ||
// ||                                                      ||
// ||                                                      ||
// ||                                                      ||
// ||                                                      ||

