const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');
const cors = require('cors');
const schema = require('./schema/schema');
require('dotenv').config()

const app = express();

// allow cross-origin requests
app.use(cors());

mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.once('open', () => {
  console.log('connected database');
});

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`now listening for requests on port ${PORT}`);
});
