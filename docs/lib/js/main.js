import inView from '../../../src';

let count = 150;
let aside = document.querySelector('.aside');

const createDot = () => {
    let dot = document.createElement('div');
    dot.className = 'dot';
    dot.style.top = `${(Math.random() * 100)}%`;
    dot.style.left = `${(Math.random() * 100)}%`;
    return dot;
}

while (count--) {
    aside.appendChild(createDot());
}

inView.offset(100);

inView('.dot')
    .on('enter', el =>
        el.classList.add('in-view'))
    .on('exit', el =>
        el.classList.remove('in-view'));
