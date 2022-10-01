/* eslint no-console: "off" */
const isDebug = () => process.env.NODE_ENV !== 'production';
const info = (...args: unknown[]) => {
    if (isDebug()) {
        console.info(args);
    }
};
const warn = (...args: unknown[]) => {
    console.info(args);
};

const error = (...args: unknown[]) => {
    console.error(args);
};
const terminal = (...args: unknown[]) => {
    const css = "background-color: black; color: green; font-size: medium;font-family: Consolas,Monaco,Lucida Console,Liberation Mono,DejaVu Sans Mono,Bitstream Vera Sans Mono,Courier New, monospace;width: 100%;display: inline-block;"
    console.info( `%c ${args}`, css);
};
export default {
    info,
    warn,
    error,
    terminal
};
