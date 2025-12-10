function isFruit(name){
    switch(name){
        case "Apple":
            return true
        case "Banana":
            return true
        case "Mango":
            return true
        default:
            return false
    }
}

console.log(isFruit("Banana"))
console.log(isFruit("Potato"))