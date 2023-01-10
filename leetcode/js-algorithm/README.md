<!-- TOC -->

- [基础数据结构](#基础数据结构)
  - [排序算法](#排序算法)
  - [数组双指针](#数组双指针)
    - [二分搜索](#二分搜索)
      - [有序数组/链表去重](#有序数组链表去重)
      - [34. 在排序数组中查找元素的第一个和最后一个位置](#34-在排序数组中查找元素的第一个和最后一个位置)
  - [链表双指针](#链表双指针)
      - [19. 删除链表的倒数第 N 个节点](#19-删除链表的倒数第-n-个节点)
      - [21. 合并两个有序链表](#21-合并两个有序链表)
- [进阶数据结构](#进阶数据结构)
  - [二叉树（一）](#二叉树一)
    - [二叉树定义](#二叉树定义)
    - [写递归算法的秘诀](#写递归算法的秘诀)
    - [226. 翻转二叉树](#226-翻转二叉树)
    - [116. 填充每个节点的下一个右侧节点指针](#116-填充每个节点的下一个右侧节点指针)
    - [114. 二叉树展开为链表](#114-二叉树展开为链表)
    - [小结](#小结)
  - [二叉树（二）](#二叉树二)
    - [654. 最大二叉树](#654-最大二叉树)

<!-- /TOC -->

# 基础数据结构

## 排序算法

TODO

## 数组双指针

### 二分搜索

- 最基本的二分查找算法
  
  > 初始化`right = nums.length - 1`
  > 因此决定了我们的[搜索区间]是[left,right]
  > 因此决定了判断为`while(left <= right)`
  > 同时也决定了`left = mid + 1`和`right = mid - 1`
  
  > 因为我们只需要找到一个 target 的索引
  > 所以当`nums[mid] == target`时即可返回

- 寻找左边界的二分查找
  
  > 初始化为`right = nums.length`
  > 因此决定了我们的[搜索区间]是[left,right) (左闭右开)
  > 因此决定了`while(left < right)`
  > 同时也决定了`left = mid + 1`和`right = mid`(不包括中间数/右区间，因为是右开区间)
  
  > 因为我们要找 target 的最左侧索引(当满足条件的值有多个，要找到最左边的那个)
  > 所以当`nums[mid] == target`时不要立即返回
  > 而是要收紧右侧边界以锁定左侧边界，在区间[left,mid)中继续搜索，不断向左收缩

- 寻找右侧边界的二分查找
  
  > 初始化`right = nums.length`
  > 所以决定了我们的[搜索区间]是[left,right) (左闭右开)
  > 所以决定了`while(left < right)`
  > 同时也决定了`left = mid + 1`和`right = mid`
  
  > 因为我们需要找到 target 的最右侧索引
  > 所以当`nums[mid] == target`时不要立即返回
  > 而是要收紧左侧边界以锁定右侧边界
  
  > 又因为收紧左侧边界时必须 `left = mid + 1`
  > 所以最后无论返回 left 还是 right, 必须减一

- 对于寻找左右边界的⼆分搜索，常⻅的⼿法是使⽤左闭右开的「搜索区间」，可以根据逻辑将「搜索区
  间」全都统⼀成了两端都闭，便于记忆，只要修改两处即可变化出三种写法：

```c++
int binary_search(int[] nums, int target) {
  int left = 0, right = nums.length - 1;
  while(left <= right) {
    int mid = left + (right - left) / 2;  // 使用这种方法而不是 (left+right)/2 是为了防止越界溢出
    if(nums[mid] < target) {
      left = mid + 1
    } else if(nums[mid] > target) {
      right = mid - 1
    } else if(nums[mid] == target) {
      // 直接返回
      return mid;
    }
  }
  // 没有找到直接返回
  return -1;
}
int left_bount(int[] nums, int target) {
  int left = 0, right = nums.length - 1;
  while(left <= right) {
    int mid = left + (right - left) / 2;
    if(nums[mid] < target) {
      left = mid + 1;
    } else if(nums[mid] > target) {
      right = mid -1;
    } else if(nums[mid] == target) {
      // 先不返回，而是继续判断，锁定左侧边界，变化右边界
      right = mid - 1;
      // 比如找小于4的，[2,3,3,3,8],
      // [left/3,3,mid/3,3,right/8] -> [left/3,right/3,mid/3,3,8] -> [left/mid/2,right/3,3,3,8] -> [mid/2,left/right/3,3,3,8]
      // -> [2,left/right/mid/3,3,3,8] -> [right/2,left/mid/3,3,3,8]
    }
  }
  // 要判断left越界情况
  if(left >= nums.length || nums[left] != target) {
    // 没有找到
    return -1;
  }
  // 返回锁定的那个边界
  return left;
}
int right_bount(int[] nums, int target) {
  int left = 0, right = nums.lengt - 1;
  while(left <= right) {
    int mid = left + (right - left) / 2;
    if(nums[mid] < target) {
      left = mid + 1;
    } else if(nums[mid] > target) {
      right = mid - 1;
    } else if(nums[mid] == target) {
      // 不返回，锁定右侧边界变化左边界
      left = mid + 1
      // 比如找大于4的，[2,5,5,5,8]
      // [left/2,5,mid/5,5,right/8] -> [2,5,mid/5,left/5,right/8] -> [2,5,left/5,mid/right/5,8] -> [2,5,5,left/mid/right/5,8]
      // -> [2,5,5,mid/right/5,left/8]
    }
  }
  if(right < 0 || nums[right] != target) {
    return -1;
  }
  // 返回锁定的那个边界
  return right;
}
```

```c++
int binary_search(int[] nums, int target) {
  int left = 0, right = nums.length - 1;
  while(left <= right) {
    int mid = left + (right - left) / 2;  // 使用这种方法而不是 (left+right)/2 是为了防止越界溢出
    if(nums[mid] < target) {
      left = mid + 1
    } else if(nums[mid] > target) {
      right = mid - 1
    } else if(nums[mid] == target) {
      // 直接返回
      return mid;
    }
  }
  // 没有找到直接返回
  return -1;
}
int left_bount(int[] nums, int target) {
  int left = 0, right = nums.length - 1;
  while(left <= right) {
    int mid = left + (right - left) / 2;
    if(nums[mid] < target) {
      left = mid + 1;
    } else if(nums[mid] > target) {
      right = mid -1;
    } else if(nums[mid] == target) {
      // 先不返回，而是继续判断，锁定左侧边界，变化右边界
      right = mid - 1;
      // 比如找小于4的，[2,3,3,3,8],
      // [left/3,3,mid/3,3,right/8] -> [left/3,right/3,mid/3,3,8] -> [left/mid/2,right/3,3,3,8] -> [mid/2,left/right/3,3,3,8]
      // -> [2,left/right/mid/3,3,3,8] -> [right/2,left/mid/3,3,3,8]
    }
  }
  // 要判断left越界情况
  if(left >= nums.length || nums[left] != target) {
    // 没有找到
    return -1;
  }
  // 返回锁定的那个边界
  return left;
}
int right_bount(int[] nums, int target) {
  int left = 0, right = nums.lengt - 1;
  while(left <= right) {
    int mid = left + (right - left) / 2;
    if(nums[mid] < target) {
      left = mid + 1;
    } else if(nums[mid] > target) {
      right = mid - 1;
    } else if(nums[mid] == target) {
      // 不返回，锁定右侧边界变化左边界
      left = mid + 1
      // 比如找大于4的，[2,5,5,5,8]
      // [left/2,5,mid/5,5,right/8] -> [2,5,mid/5,left/5,right/8] -> [2,5,left/5,mid/right/5,8] -> [2,5,5,left/mid/right/5,8]
      // -> [2,5,5,mid/right/5,left/8]
    }
  }
  if(right < 0 || nums[right] != target) {
    return -1;
  }
  // 返回锁定的那个边界
  return right;
}
```

> 小结：一般情况，利用到数组升序排列的条件，就可以使用二分查找

#### 有序数组/链表去重

> 显然，由于数组已经排序，所以重复的元素⼀定连在⼀起，找出它们并不难，但如果毎找到⼀个重复元素就
> ⽴即删除它，就是在数组中间进⾏删除操作，整个时间复杂度是会达到 O(N^2)。
> 这种需求在数组相关的算法题中时⾮常常⻅的，通⽤解法就是我们前⽂ 双指针技巧 中的快慢指针技巧。
> 我们让慢指针 slow ⾛在后⾯，快指针 fast ⾛在前⾯探路，找到⼀个不重复的元素就告诉 slow 并让 slow 前进⼀步。
> 这样当 fast 指针遍历完整个数组 nums 后，nums[0..slow] 就是不重复元素。

#### 34. 在排序数组中查找元素的第一个和最后一个位置

> 这是一道二分搜索的题，一般利用数组双指针技巧，二分搜索的难点在于如何搜索左侧边界和右侧边界。
> 在排序的数组中找目标值的开始和结束位置，所以肯定要利用排序的特点，做二分查找，将时间复杂度 O(n)降到 O(logn)。
> 考虑 `target` 开始和结束位置，其实我们要找的就是数组中「第一个等于 `target` 的位置」（记为 `leftIdx` 和「第一个大于 `target` 的位置减一」（记为 `rightIdx`）。
> 二分查找中，寻找 `leftIdx` 即为在数组中寻找第一个大于等于 `target` 的下标，寻找 `rightIdx` 即为在数组中寻找第一个大于 `target` 的下标，然后将下标减一。
> 两者的判断条件不同，为了代码的复用，我们定义 `binarySearch(nums, target, lower)` 表示在 `nums` 数组中二分查找 `target` 的位置，如果 `lower` 为 true，则查找第一个大于等于`target` 的下标，否则查找第一个大于 `target` 的下标。

## 链表双指针

#### 19. 删除链表的倒数第 N 个节点

> 假设链表总长为 n，要删除倒数第 k 个节点，需要获取倒数第 k+1 个节点的引用，这时候可以考虑使用双指针(快慢指针)的技巧，因为是要取倒数的节点，所以不能同时从起点出发，可以如下执行
> 
> 1. 先让指针 p1 指向链表头节点 head，然后走 k 步
> 2. 这时候，让另一指针 p2 指向头节点 head，也就是类似于 p2 从尾结点开始
> 3. p1,p2 同时向前走，当 p1 走到末尾的时候，这时候 p2 还剩下 k 可以到达末尾，也就是倒数 k 个节点

#### 21. 合并两个有序链表

> 类似于【拉拉链】，list1 和 list2 类似于拉两侧的锯齿，指针 p 就是拉链的拉索，讲两个链表合并。
> 
> 还需要定义一个很常见的【虚拟头节点】，也就是 dummy 节点，相当于占位符，不需要跟着变化，用于后期返回整个链表。

# 进阶数据结构

进阶数据结构包括树和图，从定义上来说树是特殊的图，但实际场景中树和图的区别还是蛮⼤的，所以要分 开说。 因为树算法⼤多涉及递归操作，⽽图有很多⼤家⽿熟能详的经典算法，所以我把它们归为进阶数据结构。

## 二叉树（一）

BFS 算法、DFS 算法、回溯算法、动态规划、分治算法、 图论算法都是⼆叉树算法的衍⽣，其中都有⼆叉树题⽬的思维模式和代码框架。

所有回溯、动归、分治算法，其实都是树 的问题，⽽树的问题就永远逃不开树的递归遍历框架这⼏⾏破代码：

```
// 二叉树遍历框架
void traverse(TreeNode root) {
    // 前序遍历
    traverse(root.left)
    // 中序遍历
    traverse(root.right)
    // 后序遍历
}
```

⼆叉树的算法思想的运⽤⼴泛，甚⾄可以说，只要涉及递归，都可以抽象成⼆叉树 的问题

### 二叉树定义

```
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
```

### 写递归算法的秘诀

写递归算法的关键是要明确函数的「定义」是什么，然后相信这个定 义，利⽤这个定义推导最终结果，绝不要跳⼊递归的细节。

怎么理解呢，我们⽤⼀个具体的例⼦来说，⽐如说让你计算⼀棵⼆叉树共有⼏个节点：

```
int count(TreeNode root) {
    if( root == null) return 0;
    return 1 + count(root.left) + count(root.right)
}
```

**写树相关的算法，简单说就是，先搞清楚当前 root 节点「该做什么」以及「什么时候做」，然后根据函数 定义递归调⽤⼦节点**，递归调⽤会让孩⼦节点做相同的事情。

所谓「该做什么」就是让你想清楚写什么代码能够实现题⽬想要的效果，所谓「什么时候做」，就是让你思 考这段代码到底应该写在前序、中序还是后序遍历的代码位置上。

### 226. 翻转二叉树

方法：很经典的递归题

[226.翻转二叉树](leetcode/226.翻转二叉树.js)

### 116.填充每个节点的下一个右侧节点指针

[116.填充每个节点的下一个右侧节点指针](leetcode/116.填充每个节点的下一个右侧节点指针.js)

### 114.二叉树展开为链表 
[114.二叉树展开为链表](leetcode/114.二叉树展开为链表.js)

### 小结
- 递归算法的关键要明确函数的定义，相信这个定义，⽽不要跳进递归细节。 写⼆叉树的算法题，都是基于递归框架的，我们先要搞清楚 root 节点它⾃⼰要做什么，然后根据题⽬要求 选择使⽤前序，中序，后续的递归框架。
- 类似于动态规划，将每个根节点操作使用递归到子节点，可以在最后"根+左右子树"上进行操作。

## 二叉树（二）
- 关键思路：把题⽬的要求细化，搞清楚根节点应该做什么，然后剩下的事情抛给前/中/后序的遍历框架就⾏了

### 654.最大二叉树
- 对于构造⼆叉树的问题，根节点要做的就是把想办法把⾃⼰构造出来。