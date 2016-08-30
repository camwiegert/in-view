import { jsdom } from 'jsdom';

global.initBrowserEnv = () => {

    global.document = jsdom(`
        <body></body>
    `);

    global.window = document.defaultView;
    global.navigator = window.navigator;
    global.addEventListener = () => {};

};

initBrowserEnv();
