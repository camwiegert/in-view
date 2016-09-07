import inView from '../../../src';

let count = 200;
let field = document.querySelector('.field');

const createDot = () => {
    let dot = document.createElement('div');
    dot.className = 'dot';
    dot.style.top = `${(Math.random() * 100)}%`;
    dot.style.left = `${(Math.random() * 100)}%`;
    return dot;
}

while (count--) {
    field.appendChild(createDot());
}

inView.offset(50);

inView('.dot')
    .on('enter', el =>
        el.classList.add('in-view'))
    .on('exit', el =>
        el.classList.remove('in-view'));
