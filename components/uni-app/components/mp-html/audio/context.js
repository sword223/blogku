"use strict";
const ctx = {};
const context = {
  get: (id) => ctx[id],
  set: (id, vm) => {
    ctx[id] = vm;
  },
  remove: (id) => {
    ctx[id] = void 0;
  }
};
exports.context = context;
