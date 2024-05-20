// first step == import express
// second step== import fs module
//  connect database
//  import middleware
//  data get and post

let express = require("express");
let app = express();
app.use(express.urlencoded({ extended: true }));
let fs = require("fs");

let mongodb = require("mongodb").MongoClient;

let connectDB = async () => {
    let client =await mongodb.connect("mongodb://localhost:27017")
    let database = client.db("RegistrationForm");
    let collection = database.createCollection("Details");
    return collection;
}
app.get("/",(req,res)=> {
    res.send("Home page")
})
app.get("/form", (req, res) => {
    fs.createReadStream("./index.html", "utf-8").pipe(res);

})
app.post("/form", async (req, res) => {
    let payload = req.body;
    res.send(req.body);
    let collection = await connectDB();
    await collection.insertOne(payload);
});

app.listen(9000, (err) => {
    if (err) throw err;
    console.log(`Server running at http://localhost:9000`)
})