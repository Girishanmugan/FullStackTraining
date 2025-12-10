const num = [1,2,3,4,5]
const num1 = num.map(num=>num*num)
console.log(num1)

const even = num.filter(num => num%2===0)
console.log(even)

const sum = num.reduce((accumulator , currenTValue ) => accumulator + currenTValue ,0)
console.log(sum)
