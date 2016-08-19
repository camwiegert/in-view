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
    .on('exit', el => {
        el.style.opacity = 0.5;
    });
```

---

## Methods

in-view maintains a separate handler registry for each set of elements captured with `inView(<selector>)`. Each registry exposes the same four methods. in-view also exposes two top-level methods. (`is`, `offset`).

### inView(\<selector>).on(\<event>, \<handler>)
> Register a handler to the elements selected by `selector` for `event`. The only events the inView emits are `'enter'` and `'exit'`.

> ```js
> inView('.someSelector').on('enter', doSomething);
> ```

### inView(\<selector>).once(\<event>, \<handler>)
> Register a handler to the elements selected by `selector` for `event`. Handlers registered with `once` will only be called once.

> ```js
> inView('.someSelector').once('enter', doSomething);
> ```

### inView.is(\<element>)
> Check if `element` is in the viewport.

> ```js
> inView.is(document.querySelectorAll('.someSelector')[0]);
> // => true
> ```

### inView.offset(\<integer>)
> By default, in-view considers something in viewport if it breaks any edge of the viewport. This can be used to set an offset from that edge. For example, an offset of `100` will consider elements in viewport if they break any edge of the viewport by at least `100` pixels. `integer` can be positive or negative.

> ```js
> inView.offset(100);
> inView.offset(-50);
> ```

### inView(\<selector>).check()
> Manually check the status of the elements selected by `selector`. By default, all registries are checked on `window`'s `scroll`, `resize`, and `load` events.

> ```js
> inView('.someSelector').check();
> ```

### inView(\<selector>).emit(\<event>, \<element>)
> Manually emit `event` for any single element.

> ```js
> inView('.someSelector').emit('exit', document.querySelectorAll('.someSelector')[0]);
> ```

---

**License** MIT
