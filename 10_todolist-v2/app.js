//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/todoListDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const itemsSchema = {
  name: String
};

const Item = mongoose.model("Item", itemsSchema);

const item1 = new Item({
  name: "Welcome to your todoList!"
});

const item2 = new Item({
  name: "Hit the + button to add a new item."
});

const item3 = new Item({
  name: "<-- Hit this to delete an item."
});

const defaultItems = [item1, item2, item3];

const listSchema = {
  name: String,
  items: [itemsSchema]
}

const List = mongoose.model("List", listSchema);


app.get("/", function (req, res) {

  Item.find({}, function (err, foundItems) { // .find() gives back an array

    if (foundItems.length === 0) { // so we can check for its length
      Item.insertMany(defaultItems, function (err) { // and see if we have to add items to the database
        if (err) {
          console.log(err);
        } else {
          console.log("Succesfully saved default items to DB.");
        }
      });
      res.redirect("/");
    } else {
      res.render("list", { // ejs render()
        listTitle: "Today",
        newListItems: foundItems
      });
    }
  });
});

app.get("/:customListName", function (req, res) {

  const customListName = req.params.customListName;

  List.findOne({name: customListName}, function (err, foundList) { // .findOne() gives back an object

    if (!err) {

      if (!foundList) { // so we can check if its exists
        // Create a new list

        const list = new List({

          name: customListName,
          items: defaultItems

        });

        list.save();

        res.redirect("/" + customListName)

      } else {
        // Show an existing list

        res.render("list", { // ejs render()
          listTitle: foundList.name,
          newListItems: foundList.items
        });

      }

    }

  });

});

app.post("/", function (req, res) {

  const itemName = req.body.newItem;

  const listName = req.body.list;
  

  const item = new Item({
    name: itemName
  });
  console.log(listName);
   if (listName === "Today") { // check the static text what is created for the main route
    console.log("bent");
    
    
    item.save();
    res.redirect("/");
  }else {
    console.log("kint");
    
  }
  /* else {
    List.findOne({name: listName}, function(err, foundList) {
      
      foundList.items.push(item);
      foundList.save();
      res.redirect("/" + listName);
    });
  }  */
  
});

app.post("/delete", function (req, res) {

  const checkedItemId = req.body.checkbox;

  Item.findByIdAndRemove(checkedItemId, function (err) {

    if (!err) {
      console.log("Successfully deleted checked item.");
      res.redirect("/");
    }

  });

});

app.get("/about", function (req, res) {
  res.render("about");
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});