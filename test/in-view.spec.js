import test from 'ava';
import inView from '../src/in-view';
import { Registry } from '../src/registry';

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

    const addDiv = () => {
        document.body.appendChild(
            document.createElement('div')
        );
    };

    t.true(inView('div').elements.length === 0);

    addDiv();
    t.true(inView('div').elements.length === 1);

});

test('inView overrides options', t => {
    document.body.appendChild(
        document.createElement('div')
    );

    t.deepEqual(inView('div', { offset: 123 }).options.offset, {
        top: 123,
        left: 123,
        right: 123,
        bottom: 123
    });
});

test('inView duplicates selector if options are different', t => {
    document.body.appendChild(
        document.createElement('img')
    );

    t.true(inView('img').selector === 'img');

    t.true(inView('img', { threshold: 0.5 }).selector === 'img-1');
});

test('inView accepts Node', t => {
    let dom;
    document.body.appendChild(
        dom = document.createElement('div')
    );
    t.true(inView(dom).elements.length ===1);
});

test('inView accepts NodeList', t => {
    document.body.appendChild(
        document.createElement('div')
    );
    let list = document.querySelectorAll('div');

    t.true(inView(list).elements.length > 0);
});

test('inView accepts Array', t => {
    document.body.appendChild(
        document.createElement('div')
    );
    let list = document.querySelectorAll('div');
    let arr = Array.from(list); //jquery like element list

    t.true(inView(arr).elements.length > 0);
});

test('inView returns for unsupported types', t => {
    t.deepEqual(inView(true), undefined);
    t.deepEqual(inView({}), undefined);
});

test('inView registry has stored the requested name', t => {
    document.body.appendChild(
        document.createElement('div')
    );
    let list = document.querySelectorAll('div');
    let arr = Array.from(list);

    t.regex(inView(arr).selector,/^Node\-/);
});

test('inView gets a selector by name', t => {
    document.body.appendChild(
        document.createElement('span')
    );

    inView('span', {
        threshold: 0.6
    });

    t.true(inView.get('span').options.threshold === 0.6);
});

test.after(initBrowserEnv);
