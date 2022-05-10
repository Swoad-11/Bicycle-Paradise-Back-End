const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;

//user: dbUser11
//pass: GOe4XeYoMsVPhhSw



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.udxz7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const database = client.db("bicycleParadise").collection("items");

        // create a document to insert
        app.get('/items', async (req, res) => {
            const query = {};
            const cursor = database.find(query);
            const items = await cursor.toArray();
            res.send(items);
        });

        //get one item
        app.get('/items/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const inventory = await database.findOne(query);
            res.send(inventory);
        });

        //add new item
        app.post('/items', async (req, res) => {
            const newItem = req.body;
            const item = await database.insertOne(newItem);
            res.send(item);
        });


    } finally {
        //await client.close();
    }
}
run().catch(console.dir);



app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send("running Bicycle Paradise.....");
});

app.listen(port, () => {
    console.log('Listening to port', port);
});