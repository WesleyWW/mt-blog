var mongoose = require('mongoose');
var Schema =  mongoose.Schema;

var blogSchema = new Schema({
    topic: {
        type: String,
        trim: true,
        minlength: 4
    },
    author:  {
      type: String,
      require: true,
      trim: true,
      minlength: 2
    },
    title: {
        type: String,
        require: true,
        trim: true,
        minlength: 4
    },
    body: {
        type: String,
        require: true,
        trim: true,
        minlength: 10
    },
    postImage: {
        type: String
    },
    date: { type: Date, default: Date.now } 
  });

   var Blog = mongoose.model('Blog', blogSchema);

   module.exports = Blog;