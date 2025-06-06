// jest.setup.ts

import "@testing-library/jest-dom";

import { TextEncoder, TextDecoder } from "util";

global.TextEncoder = TextEncoder as typeof global.TextEncoder;
global.TextDecoder = TextDecoder as typeof global.TextDecoder;

global.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
};
