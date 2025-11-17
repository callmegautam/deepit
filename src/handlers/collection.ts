export function cloneMap(map: Map<any, any>, walker: any, seen: WeakMap<any, any>) {
  const out = new Map();
  seen.set(map, out);
  for (const [k, v] of map) {
    out.set(walker(k), walker(v));
  }
  return out;
}

export function cloneSet(set: Set<any>, walker: any, seen: WeakMap<any, any>) {
  const out = new Set();
  seen.set(set, out);
  for (const v of set) {
    out.add(walker(v));
  }
  return out;
}

export function cloneDate(d: Date) {
  return new Date(d.getTime());
}

export function cloneRegExp(r: RegExp) {
  return new RegExp(r.source, r.flags);
}

export function cloneArrayBuffer(buf: ArrayBuffer) {
  return buf.slice(0);
}

export function cloneTypedArray(arr: any) {
  const ctor = Object.getPrototypeOf(arr).constructor;
  return new ctor(arr);
}
