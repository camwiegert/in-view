import inView from '../../../src';

let count = 200;
let field = document.querySelector('.field');

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const createDot = () => {
  let dot = document.createElement('div');
  dot.className = 'dot';
  dot.style.transform = `translate(${getRandomInt(0, 100)}%, ${getRandomInt(0, 100)}%)`;
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
