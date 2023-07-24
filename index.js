const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const port = process.env.PORT || 5000

// SchoolListDetails123

// middleware
const corsOptions = {
  origin: '*',
  credentials: true,
  optionSuccessStatus: 200,
}
app.use(cors(corsOptions))
app.use(express.json())

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb')
const uri = "mongodb+srv://SchoolListDetails:SchoolListDetails123@cluster0.3besjfn.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
})

async function run() {
  try {
    const collegeCollection = client.db('CollegeListdataDb').collection('college')
    const candidateCollection = client.db('CollegeListdataDb').collection('candidate')
    

// get all colleges data 
    app.get('/colleges',async(req,res)=>{
      const result = await collegeCollection.find().toArray();
      res.send(result)
    })
// get all colleges data 
    app.get('/admission/:id',async(req,res)=>{
      const id = req.params.id;
      const query = {_id: new ObjectId (id)}
      const result = await collegeCollection.findOne(query);
      res.send(result)
    })
// post candidate colleges data 
app.post("/candidate", async (req, res) => {
  const addNew = req.body;
  console.log(addNew);
  const result = await candidateCollection.insertOne(addNew);
  res.send(result);
});
// post candidate colleges data 
app.get("/candidate/:email", async (req, res) => {
  const email = req.params.email; // Use req.params.email to get the email parameter
  console.log(email);
  const query = { email: email };
  const result = await candidateCollection.findOne(query);
  res.send(result);
});


// get by id 
app.get("/search/:text", async (req, res) => {
  // console.log(req.params.text);
  const searchText = req.params.text;
  console.log(searchText);
  try {
    const result = await collegeCollection
      .find({
        collegeName: {
          $regex: searchText,
          $options: "i",
        },
      })
      .toArray();
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while searching for colleges.");
  }
});



    // Send a ping to confirm a successful connection
    await client.db('admin').command({ ping: 1 })
    console.log(
      'Pinged your deployment. You successfully connected to MongoDB!'
    )
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir)

app.get('/', (req, res) => {
  res.send('College Admission Details Server is running..')
})

app.listen(port, () => {
  console.log(`College Admission Details is running on port ${port}`)
})
