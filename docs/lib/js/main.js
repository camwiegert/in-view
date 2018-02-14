import inView from '../../../src';

let count = 200;
let field = document.querySelector('.field');

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const createDot = () => {
  let dot = document.createElement('div');
  dot.className = 'dot';

  const translateX = getRandomInt(0, field.offsetWidth);
  const translateY = getRandomInt(0, field.offsetHeight);

  dot.style.transform = `translate(${translateX}px, ${translateY}px)`;

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
