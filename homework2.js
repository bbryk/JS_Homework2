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
        this.name = name;
        this.value = value;
    }
}

class Kitchen{
    constructor(){
        this.fridge = [];
        this.orders = [];
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
            if (this.fridge[i].name === ingridient.name){
                this.fridge[i].value += ingridient.value;
                return;
            }
            

        }
        this.fridge.push(ingridient);
        return;
    }
    order(dish){
        this.takeIngridiends(dish.ingridients);
        this.orders.push(dish);
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
            if (this.fridge[i].name === ingridient.name ){
                this.fridge[i].value -= ingridient.value;
                if (this.fridge[i].value < 0){
                    throw new Error("Not enough ingredients in fridge");
                }
                return;
            }

        }
        throw new Error("Not enough ingredients in fridge");

    }

    cookFastestOrder(){
        let fastestOrder = this.orders[0];
        let curInd = 0;
        var arrayLength = this.orders.length;

        for (var i = 1; i < arrayLength; i++) {
            if (fastestOrder.cookingTime > this.orders[i].cookingTime){
                fastestOrder = this.orders[i];
                curInd = i;
            }
        }
        this.orders.splice(curInd, 1);
        return fastestOrder.cook();

    }
 
    async cookAllOrders() {
        var arrayLength = this.orders.length;

        for (var i = 1; i < arrayLength; i++) {
            await this.orders[i].cook();
        }
        
        let finishedOrders = this.orders;
        this.orderqueue = [];
        return finishedOrders;
    }
}


class Bolognese extends Dish{
    constructor(){
        super(10);
        this.ingridients = [new Ingridient("meat",1), new Ingridient("spaghetti",1)];
        this.name = "Bolognese";
    }
}

class MashedPotatoes extends Dish{
    constructor(){
        super(8);
        this.ingridients = [new Ingridient("potato",1)];
        this.name = "MashedPotatoes";

    }
}

class Steak extends Dish{
    constructor(){
        super(7);
        this.ingridients = [new Ingridient("meat",1)];
        this.name = "Steak";

    }
}

class SteakAndFries extends Dish{
    constructor(){
        super(12);
        this.ingridients = [new Ingridient("meat",1), new Ingridient("potato", 2)];
        this.name = "SteakAndFries";

    }
}



async function test() {
    const kitchen = new Kitchen();
    kitchen.addToFridge([
        new Ingridient('potato', 1),
        new Ingridient('spaghetti', 1),
        new Ingridient('meat', 3),
        new Ingridient('tomato', 2)
    ]);
    let curDish = new Bolognese();
    kitchen.order(curDish); // Bolognese extends Dish (cookingTime = 10)
    console.log(curDish.name+" ordered ");

    curDish = new MashedPotatoes();
    kitchen.order(curDish); // MashedPotatoes extends Dish (cookingTime = 8)
    console.log(curDish.name+" ordered ");

    curDish = new Steak();
    kitchen.order(curDish); // Steak extends Dish (cookingTime = 7)
    console.log(curDish.name+" ordered ");


    // // Feel free to experiment with various dishes and ingridients

    let fastest = await kitchen.cookFastestOrder(); // Returns fastest dish to make
    console.log("Cooked the fastest order: " + fastest.name + " in " + fastest.cookingTime + " minutes");
    let allCooked = await kitchen.cookAllOrders(); // Returns two dishes in array
    for (var i = 0; i < allCooked.length; i++) {
        console.log("Cooked the order: " + allCooked[i].name + " in " + allCooked[i].cookingTime + " minutes");
    }

    kitchen.order(new SteakAndFries()); // Throws Error: Not enough ingridients in fridge
}

test();

