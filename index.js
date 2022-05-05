const express = require('express');
const cors = require('cors');
const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000;

//user: dbUser11
//pass: GOe4XeYoMsVPhhSw



const uri = "mongodb+srv://dbUser11:GOe4XeYoMsVPhhSw@cluster0.udxz7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const database = client.db("bicycleWarhouse").collection("user");
        // create a document to insert
        const user = {
            Name: "Toufiq Islam",
            email: "toufiq11swoad@gmail.com",
        }
        const result = await database.insertOne(user);
        console.log(`A document was inserted with the _id: ${result.insertedId}`);
    } finally {
        //await client.close();
    }
}
run().catch(console.dir);



app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send("running.....");
});

app.listen(port, () => {
    console.log('db connected');
});