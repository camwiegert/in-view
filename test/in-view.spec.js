import test from 'ava';
import inView from '../src/in-view';
import Registry from '../src/registry';

const view = new inView();

test('inView is a function', t => {
    t.true(typeof view === 'function');
});

test('inView returns a registry', t => {
    t.true(view('body').__proto__ === Registry([]).__proto__);
});

test('inView returns existing registries', t => {
    let registry = view('body');
    t.true(registry === view('body'));
});

test('inView updates existing registry elements', t => {

    const addDiv = () => {
        document.body.appendChild(
            document.createElement('div')
        );
    };

    t.true(view('div').elements.length === 0);

    addDiv();
    t.true(view('div').elements.length === 1);

});

test.after(initBrowserEnv);
