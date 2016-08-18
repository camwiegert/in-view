# in-view.js :eyes:

Get notified when a DOM element enters or exits the viewport. A small (~2kb gzipped), dependency-free, javascript utility for IE9+.

[camwiegert.github.io/in-view](https://camwiegert.github.io/in-view)

![in-view.js](./docs/lib/images/in-view.png)

---

## Installation

Either download the [latest release](https://raw.githubusercontent.com/camwiegert/in-view/master/dist/in-view.min.js) and include it in your markup or install with [npm](http://npmjs.com/package/in-view):

```sh
npm install --save in-view
```

---

## Basic Usage

With in-view, you can register handlers that are called when an element **enters** or **exits** the viewport. Each handler receives one element, the one entering or exiting the viewport, as its only argument.

```js
inView('.someSelector')
    .on('enter', doSomething)
    .on('exit', function(el) {
        el.style.opacity = 0.5;
    });
```
