'use strict';
const assert = require('assert');

class LRUCache {
  constructor(limit=0) {
    this.limit = limit;
    this.queue = [];

    this.put = this.put.bind(this);
    this.get = this.get.bind(this);

    this.getQueue = this.getQueue.bind(this);
  }

  put(k, v) {
    this.queue.push({ key: k, value: v });
    if (this.queue.length > this.limit) {
      this.queue.shift();
    }
    return this;
  }

  get(k) {
    let out = this.queue.filter(q => q.key === k);
    if (!out.length) {
      return -1;
    }
    return out.map(q => [q.key, q.value])[0];
  }

  getQueue() {
    return this.queue.map(q => [q.key, q.value]).reverse();
  }
}
assert.ok((new LRUCache()) instanceof LRUCache);
let cache = new LRUCache(2);
assert.equal(cache.limit, 2);
assert.deepStrictEqual(cache.queue, []);
assert.deepStrictEqual(cache.put(1, 1), cache);
assert.deepStrictEqual(cache.put(2, 2), cache);
assert.deepStrictEqual(cache.getQueue(), [[2, 2], [1, 1]]);
assert.deepStrictEqual(cache.get(1), [1, 1]);
assert.deepStrictEqual(cache.put(3, 3), cache);
assert.deepStrictEqual(cache.getQueue(), [[3, 3], [2, 2]]);
assert.equal(cache.get(1), -1);
