const express = require('express');
// require mongoose
const mongoose = require('mongoose');
const {Pizza} = require('./models')

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(require('./routes'));

// mongoose.connect() tells Mongoose which database we want to connect to
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/pizza-hunt', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Use this to log mongo queries being executed!
mongoose.set('debug', true);


app.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`));


// this if you want to call your routes without the router or from the server.js file
// app.get('/api/as', (req,res) => {
//   Pizza.find()
//   .then((dbData) =>{
//     res.json(dbData)
//   })
//   .catch((err) => {
//     res.json(err)
//   })
// })