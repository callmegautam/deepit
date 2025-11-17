// not using it anymore because it's not safe, but keeping it here for reference

export function cloneFunction(fn: Function): Function {
  if (fn.name === 'bound ') {
    return fn;
  }

  try {
    const str = fn.toString();
    const recreated = new Function('return ' + str)();

    Object.defineProperties(recreated, Object.getOwnPropertyDescriptors(fn));
    Object.setPrototypeOf(recreated, Object.getPrototypeOf(fn));

    return recreated;
  } catch (e) {
    return fn;
  }
}
