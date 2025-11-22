export function cloneArray(
  arr: any[],
  walker: (v: any, d?: number) => any,
  seen: WeakMap<any, any>,
  depth = 0,
  skipKeys: string[] = [],
) {
  const out: any[] = [];
  seen.set(arr, out);

  for (let i = 0; i < arr.length; i++) {
    out[i] = walker(arr[i], depth + 1);
  }
  return out;
}

export function cloneObjectWithDescriptor(
  obj: any,
  walker: (v: any, d?: number) => any,
  seen: WeakMap<any, any>,
  depth = 0,
  skipKeys: string[] = [],
) {
  const proto = Object.getPrototypeOf(obj);
  const out = Object.create(proto);

  seen.set(obj, out);

  for (const key of Reflect.ownKeys(obj)) {
    const desc = Object.getOwnPropertyDescriptor(obj, key as PropertyKey)!;

    if (skipKeys.includes(key.toString())) {
      continue;
    }

    // only clone value properties; getters/setters stay as-is
    if ('value' in desc) {
      desc.value = walker(desc.value, depth + 1);
    }

    Object.defineProperty(out, key, desc);
  }

  return out;
}
