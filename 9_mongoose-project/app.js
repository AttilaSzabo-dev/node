const mongoose = require("mongoose");

// Connection URL
mongoose.connect("mongodb://localhost:27017/fruitsDB", {useNewUrlParser: true, useUnifiedTopology: true});

const fruitSchema = new mongoose.Schema ({
    name: {
        type: String,
        required: [true, "no name"]
    },
    //rating: Number,
    rating: {
        type: Number,
        min: 1,
        max: 10
    },
    review: String
});

const Fruit = mongoose.model("Fruit", fruitSchema);

const fruit = new Fruit ({
    //name: "Apple",
    rating: 10,
    review: "Pretty solid as a fruit"
});

//fruit.save();

const peopleSchema = new mongoose.Schema ({
    name: String,
    age: Number,
    favouriteFruit: fruitSchema
});

const People = mongoose.model("People", peopleSchema);

const mango = new Fruit ({
    name: "Mango",
    score: 9,
    review: "Great fruit."
});

mango.save();

const people = new People ({
    name: "John",
    age: 37,
    favouriteFruit: mango
}); 

/* const pineapple = new Fruit ({
    name: "Pineapple",
    score: 9,
    review: "Great fruit."
});

pineapple.save(); */

/* const people = new People ({
    name: "Amy",
    age: 12,
    favouriteFruit: pineapple
}) */

people.save();




/* const kiwi = new Fruit ({
    name: "Kiwi",
    score: 10,
    review: "The best fruit"
});

const orange = new Fruit ({
    name: "Orange",
    score: 4,
    review: "Too sour for me"
});

const banana = new Fruit ({
    name: "Banana",
    score: 3,
    review: "Weird texture"
});

Fruit.insertMany([kiwi, orange, banana], function (err) {
    if (err) {
        console.log(err);
    }else {
        console.log("Succesfully saved all the fruits to fruitsDB");
    }
}) */

Fruit.find(function (err, fruits) {
    if (err) {
        console.log(err);
    }else {
        //console.log(fruits);

        mongoose.connection.close();

        fruits.forEach(function (i) {
            console.log(i.name);
        })
    }
});

/* Fruit.updateOne({_id: "5ec8121a2bfcde26a46f21c8"}, {name: "Peach"}, function (err) {
   if (err) {
       console.log(err);
   } else {
       console.log("Succesfully updated the document");
   }
}); */

/* Fruit.deleteOne({name: "Peach"}, function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log("Succesfully deleted from the document");
    }
}); */

People.deleteMany({name: "John"}, function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log("Succesfully deleted from the document");
    }
});