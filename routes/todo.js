const mongoose = require("mongoose");
const Todo = require("../models/Todo");
const router = require("express").Router();

//add todo route
router.post("/addtodo", (req, res) => {
  const { title, description, complete } = req.body;
  errors = [];
  //validations
  if (!title || !description) errors.push({ msg: "Fields are not filled" });
  else if (title.length < 10)
    errors.push({ msg: "Title must me 10 characters long" });
  if (errors.length > 0) res.status(500).json({ errors: errors });
  else {
    Todo.findOne({ title: title })
      .then(todo => {
        // if todo exist with that title
        if (todo) {
          errors.push({ msg: "Todo wth same title already exists" });
          res.status(500).json({ errors: errors });
        } else {
          //save new todo
          newtodo = new Todo({
            title,
            description,
            complete
          });
          newtodo
            .save()
            //if successfully saved

            .then(todo => {
              console.log("hello");
              res.status(200).json({ msg: "todo saved" });
            })
            //if error occurs
            .catch(err => res.status(500).json({ error: err }));
        }
      })
      // error in finding new object
      .catch(err => res.status(500).json({ errors: err }));
  }
});

//get add todos
router.get("/gettodos", (req, res) => {
  //getting all todos
  Todo.find()
    .then(todo => {
      res.status(200).json({ todos: todo });
    })
    .catch(err => res.status(500).json({ err: err }));
});

//get todo from title
router.get("/gettodo/:title", (req, res) => {
  const { title } = req.params;
  Todo.findOne({ title: title })
    .then(todo => res.status(200).json({ todo: todo }))
    .catch(err => res.status(500).json({ err: err }));
});

//update todo from title
router.put("/updatebtytitle/:oldtitle", (req, res) => {
  const { oldtitle } = req.params;
  const { title, description, complete } = req.body;
  errors = [];
  //validations
  if (!title || !description) errors.push({ msg: "Fields are not filled" });
  else if (title.length < 10)
    errors.push({ msg: "Title must me 10 characters long" });
  if (errors.length > 0) res.status(500).json({ errors: errors });
  else {
    Todo.findOneAndUpdate(
      { title: oldtitle },
      { title, description, complete },
      (err, doc) => {
        if (err) res.status(500).json({ err: err });
        if(doc) res.status(200).json({ success: true, doc: doc });
        else res.status(500).json({msg:"no such record found"})
      }
    ).catch(err => res.status(500).json({ err: err }));
  }
});

//delete todo from title
router.delete("/deletetodo/:title", (req, res) => {
    const {title}=req.params;
    Todo.findOneAndDelete({title:title})
    .then(doc=>{
        if(doc) res.status(200).json({msg:'deleted successfully'});
        else res.status(500).json({msg:"no such doc found"})
    })
    .catch(err=>res.status(500).json({err:err}));
});

module.exports = router;
