/**
 * 'aBCee' -> 'a-b-cee
 */

let s1 = 'aBBcdE'
let t = s1.replace(/[A-Z]/g, match => '-' + match.toLowerCase())
console.log('t: ', t)

// test