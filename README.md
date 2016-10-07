# in-view.js :eyes:

Get notified when a DOM element enters or exits the viewport. A small (~1.9kb gzipped), dependency-free, javascript utility for IE9+.

[camwiegert.github.io/in-view](https://camwiegert.github.io/in-view)

[![Build Status](https://travis-ci.org/camwiegert/in-view.svg?branch=master)](https://travis-ci.org/camwiegert/in-view)
[![npm/in-view](https://img.shields.io/npm/v/in-view.svg?maxAge=2592000)](https://npmjs.com/package/in-view)

![in-view.js](https://camwiegert.github.io/in-view/lib/images/in-view.png)

---

## Installation

Either download the [latest release](https://unpkg.com/in-view/dist/in-view.min.js) and include it in your markup or install with [npm](http://npmjs.com/package/in-view):

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

## API

in-view maintains a separate handler registry for each set of elements captured with `inView(<selector>)`. Each registry exposes the same four methods. in-view also exposes four top-level methods. (`is`, `offset`, `threshold`, `test`).

### inView(\<selector>).on(\<event>, \<handler>)
> Register a handler to the elements selected by `selector` for `event`. The only events in-view emits are `'enter'` and `'exit'`.

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
> inView.is(document.querySelector('.someSelector'));
> // => true
> ```

### inView.offset(\<offset>)
> By default, in-view considers something in viewport if it breaks any edge of the viewport. This can be used to set an offset from that edge. For example, an offset of `100` will consider elements in viewport if they break any edge of the viewport by at least `100` pixels. `offset` can be a positive or negative integer.

> ```js
> inView.offset(100);
> inView.offset(-50);
> ```

> Offset can also be set per-direction by passing an object.

> ```js
> inView.offset({
>     top: 100,
>     right: 75,
>     bottom: 50,
>     left: 25
> });
> ```

### inView.threshold(\<threshold>)
> Set the ratio of an element's height **and** width that needs to be visible for it to be considered in viewport. This defaults to `0`, meaning any amount. A threshold of `0.5` or `1` will require that half or all, respectively, of an element's height and width need to be visible. `threshold` must be a number between `0` and `1`.
> ```js
> inView.threshold(0);
> inView.threshold(0.5);
> inView.threshold(1);
> ```

### inView.test(\<test>)
> Override in-view's default visibility criteria with a custom function. This function will receive the element and the options object as its only two arguments. Return `true` when an element should be considered visible and `false` otherwise.
> ```js
> inView.test((el, options) => {
>     // ...
> });
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

## Browser Support

**in-view supports all modern browsers and IE9+.**

As a small caveat, in-view utilizes [MutationObserver](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver) to check the visibility of registered elements after a DOM mutation. If that's functionality you need in IE9-10, consider using a [polyfill](https://github.com/webcomponents/webcomponentsjs/blob/master/src/MutationObserver/MutationObserver.js).

---

## Performance

Any library that watches scroll events runs the risk of degrading page performance. To mitigate this, currently, in-view only registers a single, throttled (maximum once every 100ms) event listener on each of `window`'s `load`, `resize`, and `scroll` events and uses those to run a check on each registry.

### Utilizing IntersectionObserver

There's an emerging browser API, [`IntersectionObserver`](https://wicg.github.io/IntersectionObserver/), that aims to provide developers with a performant way to check the visibility of DOM elements. Going forward, in-view will aim to delegate to `IntersectionObserver` when it's supported, falling back to polling only when necessary.

---

**License** [MIT](https://opensource.org/licenses/MIT)
