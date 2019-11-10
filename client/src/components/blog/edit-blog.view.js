import React, { Component } from 'react'
import axios from 'axios'

export default class CreateBlog extends Component {
    constructor(props) {
        super(props);

        this.onChangeAuthor = this.onChangeAuthor.bind(this);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeBody = this.onChangeBody.bind(this);
        this.onChangeImg = this.onChangeImg.bind(this);
        this.onSubmit = this.onSubmit.bind(this);


        this.state = {
            author: "",
            title: "",
            body: "",
            date: new Date()
            // postImage: null
        }
    }

    componentDidMount() {
        axios.get(this.props.match.params.id)
            .then(response => {
                this.setState({
                    author: response.data.author,
                    title: response.data.title,
                    body: response.data.body,
                    date: new Date(response.data.date)
                })   
            }) 
            .catch(function (error) {
                console.log(error);
            })
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
        const blog = {
            author: this.state.author,
            title: this.state.title,
            body: this.state.body,
            date: this.state.date
        }


        axios.post('update/' + this.props.match.params.id, blog)
            .then(res => console.log(res.data));
            // window.location = '/';
    }

    

    

    render() {
        return(
            <div>
                <h3>Edit Blog Post</h3>

                <form onSubmit={this.onSubmit} >
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
                    {/* <div className="form-group">
                        <label htmlFor="postImage">Post Image:</label>
                        <input type="file" 
                            id="postImage"
                            className="form-control"
                            // value={this.state.postImage}
                            onChange={this.onChangeImg}
                            required
                            />
                    </div> */}
                    

                    <div className="form-group">
                        <input type="submit" value="Update Post" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}