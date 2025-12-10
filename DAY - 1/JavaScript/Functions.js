function greet(name){
    console.log("Hello "+name)
}
greet("Giri")

function Age(n){
    if (n >= 18){
        console.log("YOU ARE MAJOR")
    }
    else{
        console.log("YOU ARE MINOR")
    }
}

Age(19)
Age(12)

//Anonymous Function in this you can't use the this instance  (this.name = name)

const samp = (name) =>{
    console.log("Hello " + name)
}

samp("GIRI")

// rest parameter variable length paramater
function sum (...numbers){
    return numbers.reduce((total,num) => total+num , 0)
}
console.log(sum(1,2,3))