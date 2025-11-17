import { describe, it, expect } from 'vitest';
import { strictClone } from '../src/clone';

describe('cloneforge - functions by reference', () => {
  it('keeps function references', () => {
    function hello() {
      return 'hi';
    }
    const o = { fn: hello };
    const c = strictClone(o);
    expect(c.fn).toBe(hello); // reference preserved
  });

  it('clones objects independently', () => {
    const obj = { a: 1, b: { c: 2 } };
    const copy = strictClone(obj);
    expect(copy).not.toBe(obj);
    expect(copy.b).not.toBe(obj.b);
    expect(copy).toEqual(obj);
  });

  it('handles circular refs', () => {
    const a: any = { x: 1 };
    a.self = a;
    const c = strictClone(a);
    expect(c.self).toBe(c);
  });

  it('clones Date, RegExp, Map, Set', () => {
    const o = {
      d: new Date(),
      r: /abc/i,
      m: new Map([[1, { x: 1 }]]),
      s: new Set([{ y: 2 }]),
    };

    const c = strictClone(o);

    expect(c.d).not.toBe(o.d);
    expect(c.d.getTime()).toBe(o.d.getTime());

    expect(c.r.source).toBe(o.r.source);
    expect(c.r.flags).toBe(o.r.flags);

    expect(c.m.get(1)).not.toBe(o.m.get(1));
    expect([...c.s][0]).not.toBe([...o.s][0]);
  });
});
