
const each = (arr, fn) => {
    for (let i=0, l=arr.length; i<l; i++) {
        fn(arr[i], i);
    }
};

const inView = () => {

    let groups = [];
    window.addEventListener('scroll', check);

    function inViewport(element) {
        let bounds = element.getBoundingClientRect();
        return bounds.bottom > 0
            && bounds.right > 0
            && window.innerWidth - bounds.left > 0
            && window.innerHeight - bounds.top > 0;
    }

    function check() {
        each(groups, group => {
            each(group.nodes, node => {
                let inview = inViewport(node);
                let index  = group.current.indexOf(node);
                if (inview && index < 0) {
                    group.current.push(node);
                    group.emit('enter', node);
                    return;
                }
                if (!inview && index > -1) {
                    group.current.splice(index, 1);
                    group.emit('exit', node);
                }
            });
        });
    }

    function control(selector) {
        let these = {
            nodes: [].slice.call(document.querySelectorAll(selector)),
            handlers: { enter: [], exit: [] },
            current: [],
            emit(event, element) {
                let length = this.handlers[event].length;
                while (length-- > 0) {
                    this.handlers[event][length](element);
                }
            },
            on(event, handler) {
                this.handlers[event].push(handler);
                check();
                return this;
            }
        };
        groups.push(these);
        return these;
    }

    control.is = inViewport;

    return control;

};

export default inView();


//
// class inView {
//
//     constructor(selector) {
//         this.current  = [];
//         this.elements = [].slice.call(document.querySelectorAll(selector));
//         this.handlers = { enter: [], exit: [] };
//         window.addEventListener('scroll',
//             throttle(this.check.bind(this), 100)
//         );
//     }
//
//     check() {
//         each(this.elements, el => {
//             let inview = inViewport(el),
//                 index  = this.current.indexOf(el);
//             if (inview && index < 0) {
//                 this.current.push(el);
//                 this.emit('enter', el);
//                 return;
//             }
//             if (!inview && index > -1) {
//                 this.current.splice(index, 1);
//                 this.emit('exit', el);
//             }
//         });
//         return this;
//     }
//
//     on(event, handler) {
//         this.handlers[event].push(handler);
//         this.check();
//         return this;
//     }
//
//     emit(event, element) {
//         let length = this.handlers[event].length;
//         while (length-- > 0) {
//             this.handlers[event][length](element);
//         }
//         return this;
//     }
//
// }
//
// function inViewport(element) {
//     let bounds = element.getBoundingClientRect();
//     return bounds.bottom > 0
//         && bounds.right > 0
//         && window.innerWidth - bounds.left > 0
//         && window.innerHeight - bounds.top > 0;
// }
//
// function each(arr, fn) {
//     for (let i=0, l=arr.length; i<l; i++) {
//         fn(arr[i], i);
//     }
// }
//
// function throttle(fn, threshold, context) {
//     let prev = 0, tail;
//     return () => {
//         let now  = new Date().getTime();
//         let tail = setTimeout(() => fn.call(context), threshold);
//         if (now - prev > threshold) {
//             clearTimeout(tail);
//             fn.call(context);
//             prev = now;
//         }
//     };
// }
//
// const factory = (selector, options) => new inView(selector, options);
// factory.is = (element) => inViewport(element);
//
// export default factory;
