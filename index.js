require("dotenv").config();
const express = require("express");
const app = express();
const markdownIt = require("markdown-it");
const fs = require("fs");
const path = require("path");

const book_routes = require("./routes/index");
const connectDB = require("./db/connect");
const Schema = require('./model/Schema')
const TEST_DATA = require('./Data')

app.use(express.json());
let cors = require("cors");

app.use(cors());

const md = new markdownIt();


app.get("/api/documentation", (req, res) => {
  // Read documentation from a Markdown file
  const documentationPath = path.join(__dirname, "documentation.md");
  const documentationContent = fs.readFileSync(documentationPath, "utf-8");

  // Convert Markdown to HTML using the markdown-it library
  const htmlDocumentation = md.render(documentationContent);

  // Send the HTML documentation as the response
  res.send(htmlDocumentation);
});


app.get("/", (req, res) => {
  res.send("Hey this is a REST API created by 20JE0855");
});
app.use("/", book_routes);

const start = async () => {
    try {
      await connectDB(process.env.MONGODB_URL);
      app.listen(4000, () => {
        console.log("server is set on port ", 4000);
      });
    } catch (e) {
      console.log(e);S
    }
  };


  const loadDataIntoDatabase = async (dataArray) => {
    try {
      await Schema.deleteMany({});
  
      await Schema.insertMany(dataArray);
  
      console.log("Data loaded successfully!");
    } catch (error) {
      console.error("Error loading data into the database:", error);
      throw error; 
    }
  };
  
  start();
  loadDataIntoDatabase(TEST_DATA)
