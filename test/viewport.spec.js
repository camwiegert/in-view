import test                     from 'ava';
import { example1, example2,
    example3, example4 }        from './helpers/stub-nodes';
import { inViewport,
    getVisiblePixels }          from '../src/viewport';

window.innerWidth  = 1280;
window.innerHeight = 700;

let title = '';

title = 'inViewport.example1 (full-size elem)';
test(`${title} takes up whole page`, t => {
    let pix = getVisiblePixels(example1);
    t.true(pix.x === 888);
    t.true(pix.y === 108);
});
test(`${title} w/ offset`, t => {
    let pix = getVisiblePixels(example1, 800);
    t.true(inViewport(example1,  50));
    t.false(inViewport(example1, 900));

    t.true(pix.x  >=  88);
    t.true(pix.y === 108);
});

title = 'inViewport.example2 (50/50 off top)';
test(`${title} takes up 50%`, t => {
    let pix = getVisiblePixels(example2);
    console.warn('PIX: 2 w/o', pix);
    t.true(pix.x === 100);
    t.true(pix.y ===  50);
});
test(`${title} w/ offset min 60`, t => {
    let pix = getVisiblePixels(example2);
    console.warn('PIX: 2 w/o', pix);
    t.true(pix.x === 100);
    t.false(pix.y  >=  60);
});

// // See ascii art of example2
// test('inViewport: #example2 handles parent container w/o offset', t => {
//     t.true(inViewport(example2, example2.parentNode));
// });

// test('inViewport: #example2 handles parent container w/ offset', t => {
//     t.true(inViewport(example2, example2.parentNode, 40));
// });

// test('getVisiblePixels: #example2 handles parent container w/ offset', t => {
//     t.true(getVisiblePixels(example2, example2.parentNode, 40));
// });

// test('inViewport: #example2 handles parent container w/ too much offset', t => {
//     t.false(inViewport(example2, example2.parentNode, 60));
// });


// // TEST example3
// // See ascii art of example3
// test('inViewport: #example3 handles parent container w/o offset', t => {
//     t.true(inViewport(example3, example3.parentNode));
// });

// test('inViewport: #example3 handles parent container w/ offset', t => {
//     t.true(inViewport(example3, example3.parentNode, 40));
// });

// test('inViewport: #example3 handles parent container w/ too much offset', t => {
//     t.true(inViewport(example3, example3.parentNode, 60));
// });

// // TEST example4
// // See ascii art of example4
// test('inViewport: #example4 handles parent container w/o offset', t => {
//     t.false(inViewport(example4, example4.parentNode));
// });

// test('inViewport: #example4 handles parent container w/ offset', t => {
//     t.false(inViewport(example4, example4.parentNode, 40));
// });

// test('inViewport: #example4 handles parent container w/ too much offset', t => {
//     t.false(inViewport(example4, example3.parentNode, 60));
// });


// title = 'getVisiblePixels: #example2 50/50';
// test(`${title} off the top w/ container`, t => {
//     const pix = getVisiblePixels(example2, example2.parentNode);
//     t.true(pix.y      ===  50);
//     t.true(pix.x      === 100);
//     t.true(pix.left   === 100);
//     t.true(pix.right  === 100);
//     t.true(pix.bottom === 100);
// });

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

