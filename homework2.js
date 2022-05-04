/* DONT CHANGE THIS CODE - START */
function wait(ms = 1000) { return new Promise(resolve => setTimeout(resolve, ms)) }

class Dish {
    constructor(cookingTime) {
        this.cookingTime = cookingTime;
    }

    async cook() {
        const actualCookingTime = this.cookingTime * (1 + Math.random()) * 100;
        await wait(actualCookingTime);
        return this;
    }
}
/* DONT CHANGE THIS CODE - END */

/*
    YOUR CODE HERE
*/

class Ingridient{
    constructor(name, value){
        this.name = name
        this.value = value
    }
}

class Kitchen{
    constructor(){
        this.fridge = []
        this.orders = []
    }
    addToFridge(arr){
        var arrayLength = arr.length;
        for (var i = 0; i < arrayLength; i++) {
            this.addIngridient(arr[i]);

        }
    }

    addIngridient(ingridient){
        var arrayLength = this.fridge.length;

        for (var i = 0; i < arrayLength; i++) {
            // console.log(this.fridge[i]);
            if (this.fridge[i].name === ingridient.name){
                this.fridge[i].value += ingridient.value
                return
            }
            

        }
        this.fridge.push(ingridient)
        return;
    }
    order(dish){
        this.takeIngridiends(dish.ingridients)
        this.orders.push(dish)
    }

    takeIngridiends(ingridients){
        var arrayLength = ingridients.length;
        for (var i = 0; i < arrayLength; i++) {
            this.takeOne(ingridients[i]);

        }
    }

    takeOne(ingridient){
        var arrayLength = this.fridge.length;

        for (var i = 0; i < arrayLength; i++) {
            // console.log(this.fridge[i]);
            if (this.fridge[i].name === ingridient.name ){
                this.fridge[i].value -= ingridient.value
                if (this.fridge[i].value < 0){
                    throw new Error("Not enough ingredients in fridge");
                }
                return;
            }

        }
        throw new Error("Not enough ingredients in fridge");

    }
}


class Bolognese extends Dish{
    constructor(){
        super(10);
        this.ingridients = [new Ingridient("meat",1), new Ingridient("spaghetti",1)]
    }
}

class MashedPotatoes extends Dish{
    constructor(){
        super(8);
        this.ingridients = [new Ingridient("potato",1)]
    }
}

class Steak extends Dish{
    constructor(){
        super(8);
        this.ingridients = [new Ingridient("meat",1)]
    }
}

class SteakAndFries extends Dish{
    constructor(){
        super(8);
        this.ingridients = [new Ingridient("meat",1), new Ingridient("potato", 2)]
    }
}



async function test() {
    const kitchen = new Kitchen();
    kitchen.addToFridge([
        new Ingridient('potato', 1),
        new Ingridient('spaghetti', 1),
        new Ingridient('meat', 3),
        new Ingridient('tomato', 2)
    ])
    // console.log(kitchen.fridge);
    for (let ingredient of kitchen.fridge) {
        console.log(ingredient)
    }
    kitchen.order(new Bolognese()); // Bolognese extends Dish (cookingTime = 10)
    kitchen.order(new Bolognese()); // Bolognese extends Dish (cookingTime = 10)
    console.log("start")
    for (let ingredient of kitchen.fridge) {
        console.log(ingredient)
    }
    console.log("end")

    // kitchen.order(new MashedPotatoes()); // MashedPotatoes extends Dish (cookingTime = 8)
    // kitchen.order(new Steak()); // Steak extends Dish (cookingTime = 7)

    // // Feel free to experiment with various dishes and ingridients

    // // await kitchen.cookFastestOrder(); // Returns fastest dish to make
    // // await kitchen.cookAllOrders(); // Returns two dishes in array

    // kitchen.order(new SteakAndFries()); // Throws Error: Not enough ingridients in fridge
}
console.log(10);
test();
// throw 'Not enough ingridients in fridge'

console.log(20);
