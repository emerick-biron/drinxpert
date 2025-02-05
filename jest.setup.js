import { TextEncoder, TextDecoder } from "util";
import "@testing-library/jest-dom";

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
Element.prototype.scrollTo = jest.fn();
global.BroadcastChannel = class {
    constructor() { }
    postMessage() { }
    close() { }
    addEventListener() { }
    removeEventListener() { }
};
