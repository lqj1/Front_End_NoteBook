// 发布订阅 + 数据劫持

// 首先做订阅器模型
// 类似于购买某家店商品，关注该商家，等到商家到货就通知买家购买
//
// 1. 订阅器模型: 一般做三件事情，容器收集数据、订阅消息、发布消息
let Dep = {
  // a. 订阅容器用于存放用户的各种消息
  clientList: {},
  // b. 添加订阅
  listen: function (key, fn) {
    // key 表示唯一的id
    // fn 表示各个商品
    (this.clientList[key] || (this.clientList[key] = [])).push(fn); // 使用短路表达式简化
  },
  // c. 发布
  trigger: function () {
    let key = Array.prototype.shift.call(arguments),
      fns = this.clientList[key];
    // 商户没有商品，直接返回
    if (!fns || fns.length === 0) {
      return false;
    }
    // 有商品，遍历各个商品，并通知买家
    for (let i = 0, fn; (fn = fns[i++]); ) {
      // 改变this指向，指向当前的调用
      fn.apply(this, arguments);
    }
  },
};
// 2. 数据劫持
let dataHi = function ({ data, target, datakey, selector }) {
  let value = '',
    el = document.querySelector(selector);
  // 双向数据绑定
  Object.defineProperty(data, datakey, {
    // 取值
    get: function () {
      // console.log('取值');
      return value;
    },
    set: function (val) {
      // console.log('设置值');
      value = val;
      // 发布
      // 数据发生改变，通知目标对象，并传新值，改变视图
      // 为什么可以发布，因为之前已经订阅了数据，也即 先订阅->再发布
      Dep.trigger(target, val);
    },
  });
  // 订阅
  Dep.listen(target, function (text) {
    el.innerHTML = text;
  });
};
