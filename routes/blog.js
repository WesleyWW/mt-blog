const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, '../public/uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() +  file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage, 
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});
let Blog = require('../models/Blog');

//find ALL blogs
router.get('/', (req, res) => {
    Blog.find().sort({ date: 'desc' })
        .then(blogs => res.json(blogs))
        .catch(err => res.status(400).json('Error ' + err))
});

//find blogs by topic
//Finance
router.get('/topics/finance', (req, res) => {
    Blog.find({ topic: 'Finance'}, 'topic title postImage', function (err, doc) {}).skip(1)
        .then(blogs => res.json(blogs))
        .catch(err => res.status(400).json('Error' + err));
})
//Education
router.get('/topics/education', (req, res) => {
    Blog.find({ topic: 'Education'}, 'topic title postImage', function (err, doc) {}).skip(1)
        .then(blogs => res.json(blogs))
        .catch(err => res.status(400).json('Error' + err));
})
//health
router.get('/topics/health', (req, res) => {
    Blog.find({ topic: 'Health'}, 'topic title postImage', function (err, doc) {}).skip(1)
        .then(blogs => res.json(blogs))
        .catch(err => res.status(400).json('Error' + err));
})

//find latest blog
router.get('/latest', (req, res) => {
    Blog.findOne().sort({ date: 'desc' })
        .then(blog => res.json(blog))
        .catch(err => res.status(400).json('Error' + err));
});

//find 3 blogs for suggestions
router.get('/suggested', (req, res) => {
    Blog.find()
        .sort({ date: 'desc'}).skip(1).limit(3)
        .then(blogs => res.json(blogs))
        .catch(err => res.status(400).json('Error ' + err));
});

//find blog by id
router.get('/:id', (req, res) => {
    Blog.findById(req.params.id)
        .then(blog => res.json(blog))
        .catch(err => res.status(400).json('Error ' + err));
});

//update single blog
router.post('/update/:id', (req, res) => {
    Blog.findById(req.params.id)
        .then(blog => {
            blog.topic = req.body.topic;
            blog.author = req.body.author;
            blog.title = req.body.title;
            blog.body = req.body.body;
            blog.date = req.body.date;
            
            blog.save()
                .then(() => res.json('Blog updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.json(400).json('Error: ' + err));
});


//delete one blog
router.delete('/:id', (req, res) => {   
    console.log(req.params.id);
    Blog.findByIdAndDelete(req.params.id)
        .then(() => res.json('Blog deleted successfully'))
        .catch(err => res.status(400).json('Error ' + err))

}) 

router.post('/add', upload.single('postImage'), (req, res) => {
    const topic = req.body.topic;
    const author = req.body.author;
    const title = req.body.title;
    const body = req.body.body;
    const date = req.body.date;
    const postImage = '/uploads/' + req.file.filename;

    const newBlog = new Blog({ topic, author, title, body, date, postImage });

    newBlog.save()
        .then(() => res.json('New Blog Saved'))
        .catch(err => res.status(400).json('Error' + err))
});


module.exports = router;