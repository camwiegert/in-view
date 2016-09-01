import test from 'ava';
import inView from '../src/in-view';
import Registry from '../src/registry';

const addDiv = (ctx = document.body) => {
    ctx.appendChild(document.createElement('div'));
};

test('inView is a function', t => {
    t.true(typeof inView === 'function');
});

test('inView returns a registry', t => {
    t.true(inView('body').__proto__ === Registry([]).__proto__);
});

test('inView returns existing registries', t => {
    let registry = inView('body');
    t.true(registry === inView('body'));
});

test('inView updates existing registry elements', t => {
    document.body.innerHTML = '';
    t.true(inView('div').elements.length === 0);
    addDiv();
    t.true(inView('div').elements.length === 1);

});

test('inView supports custom scroll container', t => {
    document.body.innerHTML = '';
    const scroller = document.createElement('section');
    document.body.appendChild(scroller);
    addDiv(scroller);
    addDiv(scroller);
    addDiv(scroller);
    t.true(inView('div', scroller).elements.length === 3);
});

test.after(initBrowserEnv);
