/**
 * 正则表达式
 * 语法：/正则表达式主体/修饰符(可选)
 */

// 例子
var patt = /runoob/i
// /runoob/i  是一个正则表达式。
// runoob  是一个正则表达式主体 (用于检索)。
// i  是一个修饰符 (搜索不区分大小写)。

/**
 * 一、使用字符串方法
 * search() 和 replace() 和 match()
 */
//  match() 找到一个或多个正则表达式的匹配，返回匹配结果的数组
//  search() 方法用于检索字符串中指定的子字符串，或检索与正则表达式相匹配的子字符串，并返回子串的起始位置。
//  replace() 方法用于在字符串中用一些字符串替换另一些字符串，或替换一个与正则表达式匹配的子串。
var str = "Visit Runoob!"; 
var n = str.search(/Runoob/i);
// search 方法可使用字符串作为参数。字符串参数会转换为正则表达式：
var str = "Visit Runoob!"; 
str.search("Runoob");  // 6

// 使用正则表达式且不区分大小写将字符串中的 Microsoft 替换为 Runoob :
var txt = str.replace(/microsoft/i, "Runoob");
// 输出：Visit Runoob!
// replace() 方法使用字符串
var txt = str.replace("Microsoft", "Runoob");

/**
 * 修饰符
 * i: 执行对大小写不敏感的匹配。
 * g: 执行全局匹配（查找所有匹配而非在找到第一个匹配后停止）
 * m: 执行多行匹配。
 */

/**
 * 模式1:表达式
 * [abc]: 查找a,b,c之间的任何字符。
 * [0-9]: 查找任何从 0 至 9 的数字。
 * [x|y]: 查找任何以 | 分隔的选项。
 * [^abc]: 查找任何不在方括号之间的字符。
 * (red|blue|green): 查找三者中匹配的项
 */

/**
 * 模式2:元字符
 * \w: 匹配字母或数字或下划线或汉字 等价于 '[^A-Za-z0-9_]'
 * \d,\w,\s: 匹配数字、字符、空格
 * \D,\W,\S: 匹配非数字，非字符，非空格
 * \b: 匹配单词的开始或结束
 * ^ : 匹配字符串的开始
 * $ : 匹配字符串的结束
 */

/**
 * 模式3：量词
 * n+: 匹配任何包含至少一个 n 的字符串。
 * n*: 匹配任何包含零个或多个 n 的字符串。
 * n?: 匹配任何包含零个或一个 n 的字符串。
 * n{X}: 匹配包含 X 个 n 的序列的字符串。 例：/a{2}/ 不匹配 "candy," 中的 "a"，但是匹配 "caandy," 中的两个 "a"，且匹配 "caaandy." 中的前两个 "a"。
 * n{X,}: X 是一个正整数。前面的模式 n 连续出现至少 X 次时匹配。 例：/a{2,}/ 不匹配 "candy" 中的 "a"，但是匹配 "caandy" 和 "caaaaaaandy." 中所有的 "a"。
 * n{X,Y}: 前面的模式 n 连续出现至少 X 次，至多 Y 次时匹配。
 * ?=n: 匹配任何其后紧接指定字符串 n 的字符串。
 * ?!n: 匹配任何其后没有紧接指定字符串 n 的字符串。
 */

/**
 * 模式4：括号
 
 * 
 */
/**
 * 二、使用 RegExp 对象
 * test() 和 exec()
 */
// 2.1 使用 test()
// test() 方法是一个正则表达式方法。
// test() 方法用于检测一个字符串是否匹配某个模式，如果字符串中含有匹配的文本，则返回 true，否则返回 false。
var patt = /e/
patt.test('I have e')  // true,字符串阿包含有 e
// 合并，区别于 字符串方法，字符串方法是字符串在左，正则在右边的括号；而 RegExp 对象是 正则表达式在左，字符串在右边括号中
console.log(/e/.test("The best things in life are free!"));  // true

// 2.2 使用 exec()
// exec() 方法是一个正则表达式方法。
// exec() 方法用于检索字符串中的正则表达式的匹配。
// 该函数返回一个数组，其中存放匹配的结果。如果未找到匹配，则返回值为 null。
/e/.exec("The best things in life are free!");  //字符串中含有 "e"，所以该实例输出为: e


/** 
 * 正则表达式案例
 */
/**
 * 例1：验证是否为手机号码
 */
function isPhone (tel) {
  // 1 开头，第二位是 3-9，然后就是剩下任意9个数字结尾
  var regx = /^1[3,4,5,6,7,8,9]\d{9}$/
  return regx.test(tel)
}
isPhone('18511111111')  // true
isPhone('12511111111')  // false
isPhone('1251111*111')  // false
isPhone('125111111112') // false

/**
 * 例2：验证是否为邮箱
 */
function isEmail (email) {
  // test101@qq.com
  // 分成三部分：^第一部分 @ 第二部分 第三部分$
  // 第一部分和第二部分由 任意多个字符包括 '-','_',数字，字母等
  // 第三部分 匹配多个('.'紧跟任意字符)，如 .com.cn
  // var regx = /^([a-zA-Z0-9_\-])+@([a-zA-Z0-9_\-])+(\.[a-zA-Z0-9_\-])+$/
  var regx = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
  return regx.test(email)
}
isEmail('110494@qq.com.cn')  // true

/**
 * 例3：验证是否身份证
 */
function isCardNo (number) {
  // var regx = //
}