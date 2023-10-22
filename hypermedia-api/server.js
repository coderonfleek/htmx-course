const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

// Configure Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({storage : storage});


app.get("/", (req, res) => {
    
    /* setTimeout(() => {
        res.send("<h2>Welcome to the Node Hypermedia API</h2>");
    }, 7000); */

    res.send("<h2>Welcome to the Node Hypermedia API</h2>");
    
})

app.post("/message", async (req, res) =>{

    /* res.set({
        "Last-Modified": "Wednesday, 27 Sept 2023"
    }) */
    
    res.send(`<div><h3>Hello World</h3></div>`);
});

app.post("/script", async (req, res) =>{

    
    
    res.send(`<div>
        <h3>I am loading a script</h3>
        <script>
            console.log("Hey");
        </script>
    </div>`);
});

app.post("/htmx", async (req, res) =>{

    
    
    res.send(`<div>
        <h3>I am loading HTMX Stuff</h3>
        <button type="button" 
            hx-get="http://localhost:1330" 
            hx-target="#destination">Load Root</button>
    </div>`);
});

app.post("/echopayload", async (req, res) =>{

    const email = req.body.email;
    const pass = req.body.pass;

    res.send(`<div><b>Email:</b> ${email}, <b>Password:</b> ${pass}</div>`);
});

app.post("/upload", upload.single("file"), async (req, res) => {
    const filePath = req.file.path;
    console.log(filePath);
    res.send(`<b>Upload Successful</b>: ${filePath}`);
})

app.post("/oob", async (req, res) =>{
    
    res.send(`<div>
        <h3 id="target2">Hello World</h3>
        This goes into the main target
    </div>`);
});

app.get("/bigbox", (req, res) => {

    res.send(`
    <div id="growing-box" class="grow" style="height: 300px; width: 300px; background-color: blue;">
        Big Box
    </div>
    `)
});

app.get("/users", (req, res) => {

    res.json([
        {
            id: 1,
            name: "Steph Curry"
        },
        {
            id: 2,
            name: "Lebron James"
        },
        {
            id: 3,
            name: "Kevin Durant"
        },
        {
            id: 4,
            name: "Giannis Antetokounmpo"
        }
    ])
});


const PORT = process.env.PORT || 1330;

app.listen (PORT, () => {
    console.log(`App is now running on port: ${PORT}`);
})