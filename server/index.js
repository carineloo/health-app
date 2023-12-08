const PORT = 8080
require('dotenv').config()
const uri = process.env.uri
const express = require('express')
const { MongoClient } = require('mongodb')
const { v1: uuidv1 } = require('uuid')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.json('Hello Harper!')
})

// sign up: onboarding
app.post('/signup', async (req, res) => {
  const client = new MongoClient(uri)
  const { email, password } = req.body
  // console.log(req.body)

  const generateId = uuidv1()
  const hashPw = await bcrypt.hash(password, 10) // hash the pw with salt round

  try {
    await client.connect()
    const database = client.db('app-data')
    const users = database.collection('users')

    const oldUser = await users.findOne({ email })
    if (oldUser) {
      // to frontend
      res.status(200).json({ userExists: true, message: 'This email exists, please log in :)' });
      // backend
      return res.status(409).send('User exists! Please login.')
    }

    const sanitizedEmail = email.toLowerCase() // sanitize to lower case for consistency

    // send to backend
    const data = {
      user_id: generateId,
      email: sanitizedEmail,
      hash_pw: hashPw
    }

    const insert = await users.insertOne(data)

    const token = jwt.sign(insert, sanitizedEmail, {
      expiresIn: 60 * 24
    })
    res.status(201).json({ token, userId: generateId, email: sanitizedEmail })
  } catch (error) {
    console.log(error)
  }
})

//login: onboarding
app.post('/login', async (req, res) => {
  const client = new MongoClient(uri)
  const { email, password } = req.body

  try {
    await client.connect()
    const database = client.db('app-data')
    const users = database.collection('users')

    // find if user exists in db
    const user = await users.findOne({ email })

    // check if user exists and the password is correct
    if (user) {
      const correctPW = await bcrypt.compare(password, user.hash_pw);
      if (correctPW) {
        const token = jwt.sign(user, email, {
          expiresIn: 60 * 24
        }); // success
        res.status(201).json({ token, userId: user.user_id, email });
      } else {
        // password is incorrect
        res.status(200).json({ loginInvalid: true, message: 'Invalid login!' });
        res.status(401).json({ error: 'Invalid password' });
      }
    } else {
      // user does not exist
      res.status(200).json({ loginInvalid: true, message: 'Invalid login!' });
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.log(error)
  }
})

// get individual users: baseline
app.get('/user', async (req, res) => {
  const client = new MongoClient(uri)
  const userId = req.query.userId

  try {
    await client.connect()
    const database = client.db('app-data')
    const users = database.collection('users')

    const query = { user_id: userId }
    // find user based on their ID - extract from db
    const foundUsers = await users.findOne(query)
    // send 
    res.send(foundUsers)
  } finally {
    await client.close()
  }
})

// finish create account: account form
app.put('/user', async (req, res) => {
  const client = new MongoClient(uri)
  const formData = req.body.formData

  try {
    await client.connect()
    const database = client.db('app-data')
    const users = database.collection('users')

    // query user by user id
    const query = { user_id: formData.user_id }

    const updateDocument = {
      $set: {
        first_name: formData.first_name,
        last_name: formData.last_name,
        d_day_dob: formData.d_day_dob,
        d_month_dob: formData.d_month_dob,
        d_year_dob: formData.d_year_dob,
        phone: formData.phone,
        address_no: formData.address_no,
        address_post: formData.address_post,
        address_street: formData.address_street,
        address_city: formData.address_city,
        address_country: formData.address_country,
        avatar: formData.avatar
      },
    }
    // finding existing user with query, and update to document
    const insertedUser = await users.updateOne(query, updateDocument)
    res.json(insertedUser)

  } finally {
    await client.close()
  }
})

// display users
app.get('/users', async (req, res) => {
  const client = new MongoClient(uri)

  try {
    await client.connect()
    const database = client.db('app-data')
    const users = database.collection('users')

    const showUsers = await users.find().toArray()
    res.send(showUsers)
  } finally {
    await client.close()
  }
})

// add symptoms to database: chat display symptoms
app.post('/symptom', async (req, res) => {
  const client = new MongoClient(uri)
  const userId = req.body.userId
  const symptom = req.body.symptom

  try {
    await client.connect()
    const database = client.db('app-data')
    const symptoms = database.collection('symptoms')

    const struct = { user_id: userId, symptoms: symptom }
    const insertSymptom = await symptoms.insertOne(struct)
    res.send(insertSymptom)
  } finally {
    await client.close()
  }
})

// get individual users' symptoms: user symptoms
app.get('/symptoms', async (req, res) => {
  const client = new MongoClient(uri)
  const userId = req.query.userId

  try {
    await client.connect()
    const database = client.db('app-data')
    const symptoms = database.collection('symptoms')

    const query = { user_id: userId }
    const foundSymptoms = await symptoms.find(query).toArray()

    // send 
    res.send(foundSymptoms)
  } finally {
    await client.close()
  }
})

// add eq5d to db
app.post('/eq5d', async (req, res) => {
  const client = new MongoClient(uri)
  const userId = req.body.userId
  const formData = req.body.formData
  const dateCompleted = new Date().toISOString()

  try {
    await client.connect()
    const database = client.db('app-data')
    const eq5d = database.collection('eq5d')

    const struct = { user_id: userId, eq5d: formData, date: dateCompleted }
    const insertForm = await eq5d.insertOne(struct)
    res.send(insertForm)
  } finally {
    await client.close()
  }
})

// get eq5d
app.get('/eq5d_db', async (req, res) => {
  const client = new MongoClient(uri)
  const userId = req.query.userId

  try {
    await client.connect()
    const database = client.db('app-data')
    const eq5d = database.collection('eq5d')

    const query = { user_id: userId }
    const foundForm = await eq5d.find(query).toArray()
    // send 
    res.send(foundForm)
  } finally {
    await client.close()
  }
})

// update eq5d
app.put('/eq5d_db', async (req, res) => {
  const client = new MongoClient(uri)
  const formData = req.body.formData
  const userId = req.body.userId
  const date = req.body.date

  try {
    await client.connect()
    const database = client.db('app-data')
    const eq5d = database.collection('eq5d')

    // query user by user id
    const query = { user_id: userId, date: date }

    const updateDocument = {
      $set: {
        eq5d: {
          mobility: formData.mobility.filter(item => item.selected).map(item => item.statement),
          selfCare: formData.selfCare.filter(item => item.selected).map(item => item.statement),
          activities: formData.activities.filter(item => item.selected).map(item => item.statement),
          discomfort: formData.discomfort.filter(item => item.selected).map(item => item.statement),
          anxiety: formData.anxiety.filter(item => item.selected).map(item => item.statement),
        },
      },
    }
    // finding existing user with query, and update to document
    // Find the existing user document with the provided user ID and update it
    const updateResult = await eq5d.updateOne(query, updateDocument);
    res.send(updateResult)
  } finally {
    await client.close();
  }
})

// add phq4 to db
app.post('/phq4', async (req, res) => {
  const client = new MongoClient(uri)
  const userId = req.body.userId
  const itemsRated = req.body.itemsRated
  const totalScore = req.body.totalScore

  try {
    await client.connect()
    const database = client.db('app-data')
    const phq4 = database.collection('phq4')

    const struct = { user_id: userId, phq4: itemsRated, totalScore: totalScore }
    const insertForm = await phq4.insertOne(struct)
    res.send(insertForm)
  } finally {
    await client.close()
  }
})

// add rose questions to db
app.post('/rose', async (req, res) => {
  const client = new MongoClient(uri)
  const userId = req.body.userId
  const partA = req.body.partA
  const partB = req.body.partB

  try {
    // check if any question in partA is unanswered
    if (Object.values(partA).some(answer => !answer)) {
      return res.status(400).send('All questions in Part A must be answered.');
    }

    // // check if any question in partB is unanswered
    // if (
    //   Object.keys(partB)
    //     .filter(key => key !== 'question1a')  // Exclude question1a
    //     .every(key => partB[key] !== undefined && partB[key] !== null)
    // ) {
    //   return res.status(400).send('All questions in Part B must be answered.');
    // }

    await client.connect()
    const database = client.db('app-data')
    const rose = database.collection('rose')

    const struct = { user_id: userId, partA: partA, partB: partB }
    const insertForm = await rose.insertOne(struct)
    res.send(insertForm)
  } finally {
    await client.close()
  }
})

// 
app.get('/rose', async (req, res) => {
  const client = new MongoClient(uri)
  const userId = req.query.userId

  try {
    await client.connect()
    const database = client.db('app-data')
    const rose = database.collection('rose')

    const query = { user_id: userId }
    const found = await rose.find(query).toArray()

    // send 
    res.send(found)
  } finally {
    await client.close()
  }
})

app.listen(PORT, () => console.log('Server running on PORT http://localhost:' + PORT))



// w5vc6NUamICidQOA