import "@testing-library/jest-dom";

import { TextDecoder, TextEncoder } from "node:util";
import { mockFetch } from "./test-utils/mockFetch";

global.TextEncoder = TextEncoder as unknown as typeof global.TextEncoder;

global.TextDecoder = TextDecoder as unknown as typeof global.TextDecoder;

global.fetch = mockFetch as jest.Mock;
