let fruits = ["Apple","Banana","Mango"]
let cars = {
    brand:"Toyota",
    model:"Fortuner",
    year:2025
}

console.log(fruits)
console.log(fruits[0])
console.log(fruits[1])

console.log(cars)
console.log(cars.brand)
console.log(cars.model)

console.log("Accessing The Element Of Dict")
for (let i in cars){     // to acccess the dict u can use this method
    console.log(i +":"+cars[i])
}

console.log("Accessing The Element Of Array")
for (let i of fruits){
    console.log(i)
}

//array destructuring
const num = [1,2,3]
const [x,y,z] = num
console.log(x,y,z)
const [first,,third] = num
console.log(first,third)


const [m,n,...rest] = num
console.log(m,n)
console.log(rest)


//object destructuring

const person = {
    name : "GIRI",
    age : 20,
    city : "UKL"
}
const {name , age} = person
console.log(name,age)

// push and pop in array
console.log("push pop shift unshift in arrays")
const arr = [1,2,3]
arr.push(4)
console.log(arr)
arr.push(5,6)
arr.unshift(1)
arr.shift(6)
console.log(arr)