const express = require("express")
const app = express()
const PORT = 3000
const fruits = require("./models/fruits")
const reactViews = require('express-react-views')


app.set("view engine", "jsx")
app.engine("jsx", reactViews.createEngine())

app.use((req, res, next) => {
  console.log("Im running for all routes")
  console.log("1. middleware")
  next()
})

app.use(express.urlencoded({extended: false}))



app.get("/fruits", (req, res) => {
  console.log("2. controller")
  res.render("Index", {fruits: fruits})
})

app.get("/fruits/new", (req, res) => {
  console.log("2. controller")
  res.render("New")
})

app.post("/fruits", (req, res) => {
  console.log("2. controller")
  if (req.body.readyToEat === "on"){
    req.body.readyToEat = true
  } else {
    req.body.readyToEat = false
  }
  fruits.push(req.body)
  console.log(fruits)
  // redirects after creating fruit, to the Index page
  res.redirect("/fruits")
})




app.get("/fruits/:indexOfFruit", (req, res) => {
  // res.send(fruits[req.params.indexOfFruit])
  res.render("Show", {fruit: fruits[req.params.indexOfFruit]})
})



app.listen(PORT, () => { 
  console.log(`Listening on port: ${PORT}`)
});