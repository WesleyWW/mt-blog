import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Blog = props => (
    <div className="blog-container">
        <div className="blog-info">
            <img className="blog-img" src={props.blog.postImage} alt="Current Blog" />
            <div id="blog-title-auth-container">
                <h2><Link className="blog-title" to={"/blog/"+props.blog._id}>{props.blog.title}</Link></h2>
                <h4 className="blog-author">{props.blog.author}</h4>
            </div>
        </div>
        <div className="blog-content">
            <p className="blog-body">{props.blog.body}</p>
            <br />
            <small className="blog-date">{props.blog.date.substring(0,10)}</small>
            <Link to={"/blog/edit/"+props.blog._id} className="button">Edit</Link>
            <Link to="#" onClick={() => { props.deleteBlog(props.blog._id) }} className="button">Delete</Link>
        </div>
    </div>
)

export default class CreateBlog extends Component {
    constructor(props) {
        super(props);

        this.deleteBlog = this.deleteBlog.bind(this);
        this.onChangeTopic = this.onChangeTopic.bind(this);
        this.onChangeAuthor = this.onChangeAuthor.bind(this);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeBody = this.onChangeBody.bind(this);
        this.onChangeImg = this.onChangeImg.bind(this);
        this.onSubmit = this.onSubmit.bind(this);


        this.state = {
            blogs: [],
            topic: "",
            author: "",
            title: "",
            body: "",
            date: new Date(),
            postImage: null
        }
    }

    onChangeTopic(e) {
        e.preventDefault();

        this.setState({ topic: e.target.value });
    }

    onChangeAuthor(e) {
        e.preventDefault();

        this.setState({ author: e.target.value });
    }
    onChangeTitle(e) {
        e.preventDefault();

        this.setState({ title: e.target.value });
    }
    onChangeBody(e) {
        e.preventDefault();

        this.setState({ body: e.target.value });
    }
    onChangeImg(e) {
        this.setState({ postImage: e.target.files[0] });
    }

    onSubmit(e) {
        e.preventDefault();
        const data = new FormData();
        data.append('postImage', this.state.postImage);
        data.append('topic', this.state.topic);
        data.append('author', this.state.author);
        data.append('title', this.state.title);
        data.append('body', this.state.body);
        data.append('date', this.state.date);


        axios.post('blog/add', data)
        .then(response => console.log(response.data));
        window.location = '/blog';
    }

    componentDidMount() {
        axios.get('blog')
            .then(response => {
                this.setState({ blogs: response.data })
            })
            .catch((error) => {
                console.log(error)
            })
    }

    blogPosts() {
        return this.state.blogs.map(currentBlog => {
            return <Blog blog={currentBlog} deleteBlog={this.deleteBlog} key={currentBlog._id} />
        })
    }

    deleteBlog(id) {
        console.log(id);
        axios.delete('blog/'+id)
            .then(res => console.log(res))

        this.setState({
            blogs: this.state.blogs.filter(el => el._id !== id)
        })
    }

    render() {
        return(
            <div>
                <h3>Create New Blog Post</h3>

                <form onSubmit={this.onSubmit} >
                    <div className="form-group">
                        <label htmlFor="topic">Topic:</label>
                        <input type="text"
                            id="topic"
                            className="form-control"
                            placeholder="Blog Topic"
                            value={this.state.topic}
                            onChange={this.onChangeTopic}
                            />
                    </div>
                    <div className="form-group">
                        <label htmlFor="author">Author:</label>
                        <input type="text"
                            id="author"
                            className="form-control"
                            placeholder="Author"
                            value={this.state.author}
                            onChange={this.onChangeAuthor}
                            required
                            />
                    </div>
                    <div className="form-group">
                        <label htmlFor="title">Title:</label>
                        <input type="text"
                            id="title"
                            className="form-control"
                            placeholder="Blog Title"
                            value={this.state.title}
                            onChange={this.onChangeTitle}
                            required
                            />
                    </div>
                    <div className="form-group">
                        <label htmlFor="body">Body:</label>
                        <textarea 
                            id="body"
                            className="form-control"
                            placeholder="Body of your blog post goes here.."
                            value={this.state.body}
                            onChange={this.onChangeBody}
                            required
                            />
                    </div>
                    <div className="form-group">
                        <label htmlFor="postImage">Post Image:</label>
                        <input type="file" 
                            id="postImage"
                            className="form-control"
                            // value={this.state.postImage}
                            onChange={this.onChangeImg}
                            required
                            />
                    </div>
                    

                    <div className="form-group">
                        <input type="submit" value="Create Post" className="btn btn-primary" />
                    </div>
                </form>
                { this.blogPosts() }
            </div>
        )
    }
}