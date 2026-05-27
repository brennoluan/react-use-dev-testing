export const mockFetch = jest.fn((url: string) => {
  if (url.includes("/categories")) {
    return Promise.resolve({
      json: () => Promise.resolve({}),
    });
  }
  if (url.includes("/products")) {
    return Promise.resolve({
      json: () => Promise.resolve({}),
    });
  }
  return Promise.resolve({
    json: () => Promise.resolve({}),
  });
});
