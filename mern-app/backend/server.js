const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();                  /* creates Express server */
const port = process.env.PORT || 5000;  /* port */

const corsOptions = {
    origin: "YOUR_FRONTEND_URL", // frontend URI (ReactJS)
}

app.use(cors(corsOptions));             /* cors middleware */
app.use(express.json());                /* help to parse JSON */

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

const gamesRouter = require('./routes/games');
const usersRouter = require('./routes/users');

app.use('/games', gamesRouter);
app.use('/users', usersRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});