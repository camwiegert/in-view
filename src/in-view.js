import Registry         from './registry';
import { inViewport }   from './viewport';
import { throttle }     from 'lodash';
import  WeakMap         from 'weakmap-shim';
/**
* Create and return the inView function.
*/
const inView = () => {

  // How often and on what events we should check each registry.
  const threshold = 100;
  const triggers  = ['scroll', 'resize', 'load'];
  const listeners = new WeakMap();

  // By default, use an offset of 0.
  let offset = 0;

  /**
  * Maintain a hashmap of all registries and a history
  * of selectors to enumerate.
  */
  let selectors = { history: [] };

  // Const event handlers list, used to add/remove events
  const handlers = triggers.map(event => {
    return {
      event,
      handler: throttle(() => {
        selectors.history.forEach(selector => {
          selectors[selector].check(control.offset);
        });
      }, threshold)
    }
  });

  /**
  * For each trigger event on window, add a listener
  * which checks each registry, throttled to threshold.
  */
  const addListeners = (container) => {
    handlers.forEach(({event, handler}) => container.addEventListener(event, handler));
    return handlers;
  }

  const removeListeners = (container) => {
    handlers.forEach(({event, handler}) => container.removeEventListener(event, handler));
    return handlers;
  }

  /**
  * The main interface. Take a selector and retrieve
  * the associated registry or create a new one.
  */
  let control = (selector, container = document.body) => {

    if (typeof selector !== 'string') return;

    // check for events on the container (should handle if the container changes - eg drag-drop ui, multi-scroll, page/region checks for different item types)
    if (listeners.has(container) !== true) {
      listeners.set(container, addListeners(container));
    }

    // Get an up-to-date list of elements.
    let elements = [].slice.call(document.querySelectorAll(selector));

    // If the registry exists, update the elements.
    if (selectors.history.indexOf(selector) > -1) {
      selectors[selector].elements = elements;
    }
    // If it doesn't exist, create a new registry.
    else {
      selectors[selector] = Registry(elements);
      selectors.history.push(selector);
    }

    return selectors[selector];
  };

  /**
  * Add a static offset() method to update
  * the offset.
  */
  control.offset = n => {
    return (typeof n === 'number') ?
      offset = n :
      offset;
  };

  /**
  * Add a static is() method to the main interface
  * and return it.
  */
  control.is = inViewport;

  /**
   * Add static destroy method
   */
  control.destroy = (container = document.body) => {
    if (listeners.has(container)) {
      listeners.delete(container);
      return removeListeners(container);
    }
  }


  return control;

};

// Export a singleton.
export default inView();
