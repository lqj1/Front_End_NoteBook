/**
 * 类数组转数组有以下的方法
 */
// 方法1：通过 call 调用数组的 slice 方法来实现转换
Array.prototype.slice.call(arraylike)
// 方法2：通过 call 调用数组的 splice 方法来实现转换
Array.prototype.splice.call(arrayLike, 0);
// 方法3：通过 apply 调用数组的 concat 方法来实现转换
Array.prototype.concat.apply([], arrayLike);
// 方法4：通过 Array.from 方法来实现转换
Array.from(arrayLike);