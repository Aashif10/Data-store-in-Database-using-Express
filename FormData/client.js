// 1st Step== To Import Express Package
// 2nd step== Import fs module
// 3rd step == Import middleware
//4th step== To create the connection with database.
// 5th Step== To get a html file
// 6th step ==Data post to database

let express = require("express");
let app = express();
app.use(express.urlencoded({ extended: true }));

let fs = require("fs");

let mongodb = require("mongodb").MongoClient;

let connectDB = async () => {
  let client = await mongodb.connect("mongodb://localhost:27017");
  let Database = client.db("GoogleForm");
  let collection = Database.createCollection("Information");
  return collection;
};

app.get("/", (req, res) => {
  res.send("This is home page");
});

app.get("/data", (req, res) => {
  fs.createReadStream("./data.html", "utf-8").pipe(res);
});

app.post("/data", async (req, res) => {
  let payload = req.body;
  console.log(payload);
  let collection = await connectDB();
  await collection.insertOne(payload);
  res.send(req.body);
});

app.listen(9000, err => {
  if (err) throw err;
  console.log(`server running at http://localhost:9000`);
});
