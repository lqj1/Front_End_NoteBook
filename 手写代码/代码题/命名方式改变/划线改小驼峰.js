/**
 * 'A-b-cee' -> 'aBCee'
 * 'f-g' -> 'fG'
 * 'mn' -> 'mn'
 */

function transName (arr) {
  let res = arr.map(e => {
    let items = e.split('-').map((item, index) => {
      if (index) {
        // 当不为首个字符串, index为非0
        let firstLetter = item.substring(0, 1)
        let resLetter = item.substring(1)
        return firstLetter.toUpperCase() + resLetter
      } else {
        // 首个字符串，index==0
        return item.toLowerCase()
      }
    })
    // 将处理完的每个字符串连接起来
    return items.join('')
  })
  return res
}

console.log(transName(['A-b-cee', 'ca-de-ea', 'e-fe-eaa','f-g','mn']))
