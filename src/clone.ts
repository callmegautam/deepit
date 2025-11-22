import { cloneArray, cloneObjectWithDescriptor } from './handlers/object';
import {
  cloneMap,
  cloneSet,
  cloneRegExp,
  cloneDate,
  cloneArrayBuffer,
  cloneTypedArray,
} from './handlers/collection';
import { skip } from 'node:test';

export type CloneOptions = {
  maxDepth?: number | null;
  skipKeys?: string[];
};

const DEFAULTS: Required<CloneOptions> = {
  maxDepth: null,
  skipKeys: [],
};

function getTag(value: unknown): string {
  return Object.prototype.toString.call(value).slice(8, -1);
}

export function strictClone<T>(value: T, opts?: CloneOptions): T {
  const options = { ...DEFAULTS, ...(opts || {}) };
  const seen = new WeakMap<any, any>();

  function _clone(v: any, depth = 0): any {
    if (options.maxDepth !== null && depth > options.maxDepth) {
      throw new Error('strictClone: maxDepth exceeded');
    }

    // FUNCTIONS
    if (v === null || typeof v !== 'object') {
      return v;
    }

    if (typeof v === 'function') {
      return v;
    }

    if (seen.has(v)) return seen.get(v);

    const tag = getTag(v);

    switch (tag) {
      case 'Array':
        return cloneArray(v, _clone, seen, depth);
      case 'Object':
        return cloneObjectWithDescriptor(v, _clone, seen, depth, options.skipKeys);
      case 'Date':
        return cloneDate(v);
      case 'RegExp':
        return cloneRegExp(v);
      case 'Map':
        return cloneMap(v, _clone, seen);
      case 'Set':
        return cloneSet(v, _clone, seen);
      case 'ArrayBuffer':
        return cloneArrayBuffer(v);
      case 'Uint8Array':
      case 'Uint16Array':
      case 'Uint32Array':
      case 'Int8Array':
      case 'Int16Array':
      case 'Int32Array':
      case 'Float32Array':
      case 'Float64Array':
        return cloneTypedArray(v);
      case 'Error':
        const err = Object.create(Object.getPrototypeOf(v));
        err.name = v.name;
        err.message = v.message;
        err.stack = v.stack;
        return err;
      default:
        return cloneObjectWithDescriptor(v, _clone, seen, depth, options.skipKeys);
    }
  }

  return _clone(value, 0);
}

export const clone = strictClone;
