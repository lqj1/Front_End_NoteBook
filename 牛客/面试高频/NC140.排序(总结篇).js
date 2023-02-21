/**
 * 冒泡排序
 * 核心：将 最大/最小 的数目放入数组的最后
 */
function bubbleSort( arr ) {
  // write code here
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - 1 - i; j++) {  // 注意 j 的范围，每次都是从 0 开始，小于已经排好序的
      if (arr[j] > arr[j+1]) {
        [arr[j], arr[j+1]] = [arr[j+1], arr[j]]
      }
    }
  }
  console.log('arr: ', arr)
}
bubbleSort([3, 5, 4, 2, 1])

/**
 * 选择排序
 * 核心：选择排序是默认前面都是已经排序好的，然后从后面选择最小的放在前面排序好的的后面
 */
function bubbleSort( arr ) {
  // write code here
  for (let i = 0; i < arr.length; i++) {
    let index = i;  // 记录最小数的下标
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[index] > arr[j]) {
        index = j      
      }
    }
    // 遍历一遍，此时 i 到 arr.length-1 范围的最小的数被找出，放在 i 的位置上
    [arr[i], arr[index]] = [arr[index], arr[i]]
  }
  console.log('arr: ', arr)
}
bubbleSort([3, 5, 4, 2, 1])


/**
 * 堆排序
 * 堆排序的过程分为建堆和排序两大步骤。
 * 建堆过程的时间复杂度为O(n)，排序过程的时间复杂度为O(nlogn)，
 * 所以，堆排序整体的时间复杂度为O(nlogn）。
 */