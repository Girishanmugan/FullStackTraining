var a = 5
var b = 6

console.log(a+b)
console.log(a-b)
console.log(a*b)
console.log(a/b)
console.log(a%b)
console.log( 5 == '5')
console.log(5 === '5')

age = 19
const res = age >= 18 ? "You Are Allowed" : "You Are Not Allowed"
console.log(res)

//spread operators (...)
const n1 = [1,2,3]
const n2 = [4,5,6]

const s1 = [...n1,...n2]
const s2 = [0,...n1,7,8,9]

console.log(s1)
console.log(s2)

const details = {
    name : "Giri",
    age : 20
}

const s3 = {...details , city:"UKL"}
console.log(s3)

