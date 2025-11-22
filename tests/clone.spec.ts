import { describe, it, expect } from 'vitest';
import { clone } from '../src/clone';

describe('deepit - cloning behavior', () => {
  it('skips top-level keys when cloning', () => {
    const obj = {
      username: 'gautam',
      password: 'secret',
      token: 'abc123',
    };

    const cloned = clone(obj, { skipKeys: ['password', 'token'] });

    expect(cloned).toEqual({ username: 'gautam' });
    expect(cloned.password).toBeUndefined();
    expect(cloned.token).toBeUndefined();
  });

  it('only skips specified keys and keeps nested structure intact', () => {
    const obj = {
      id: 1,
      profile: { name: 'Alice', email: 'alice@example.com' },
      metadata: { created: true },
    };

    const cloned = clone(obj, { skipKeys: ['metadata'] });

    expect(cloned.id).toBe(1);
    expect(cloned.profile).not.toBe(obj.profile); // deep clone still
    expect(cloned.profile).toEqual(obj.profile);

    // skipped
    expect(cloned.metadata).toBeUndefined();
  });

  it('still preserves circular refs even when skipping keys', () => {
    const a: any = { x: 1, removeMe: true };
    a.self = a;

    const cloned = clone(a, { skipKeys: ['removeMe'] });

    expect(cloned.removeMe).toBeUndefined();
    expect(cloned.self).toBe(cloned); // circular ref preserved
  });

  it('keeps function references', () => {
    function hello() {
      return 'hi';
    }
    const o = { fn: hello };
    const c = clone(o);
    expect(c.fn).toBe(hello); // reference preserved
  });

  it('clones objects independently', () => {
    const obj = { a: 1, b: { c: 2 } };
    const copy = clone(obj);
    expect(copy).not.toBe(obj);
    expect(copy.b).not.toBe(obj.b);
    expect(copy).toEqual(obj);
  });

  it('handles circular refs', () => {
    const a: any = { x: 1 };
    a.self = a;
    const c = clone(a);
    expect(c.self).toBe(c);
  });

  it('clones Date, RegExp, Map, Set', () => {
    const o = {
      d: new Date(),
      r: /abc/i,
      m: new Map([[1, { x: 1 }]]),
      s: new Set([{ y: 2 }]),
    };

    const c = clone(o);

    expect(c.d).not.toBe(o.d);
    expect(c.d.getTime()).toBe(o.d.getTime());

    expect(c.r.source).toBe(o.r.source);
    expect(c.r.flags).toBe(o.r.flags);

    expect(c.m.get(1)).not.toBe(o.m.get(1));
    expect([...c.s][0]).not.toBe([...o.s][0]);
  });
});
