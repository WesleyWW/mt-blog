const express = require('express');
const mongoose = require('mongoose');
//cross-origin request sharing
const cors = require('cors');
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use(express.static('client/build'));

const uri = require('./config/keys').mongoURI;

mongoose.connect(process.env.ATLAS_URI || uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connection established'))
    .catch(err => console.log(err));


//define routers
const blogRouter = require('./routes/blog');

app.use('/blog', blogRouter);

if(process.env.NODE_ENV === 'production') {
    //set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client/build/index.html'));
    });
}



app.listen(port, () => {
    console.log(`App listening on port ${port}!`);
});