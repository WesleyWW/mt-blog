import React, { Component } from 'react'
import axios from 'axios'

//temp img
import AuthorImg from '../../assets/noprofile.jpg'

const BlogMd = props => {
    return (
        <div className="blog-preview-md">
            <img className="suggested-blog-img" src={props.img} alt="Blog About Nothin" />
            <h3>{props.title}</h3>
            <div className="suggested-blog-author">
                <img src={props.authorImg} alt="Blog About Nothin" />
                <a href="/" className="blog-link">{props.author}</a>
            </div>
            <p>
                {props.body}
            </p>   
        </div>
    )
}

export class IndexBlog extends Component {
    constructor(props) {
        super(props);

        this.state = { 
            indexBlog: { 
                img: "",
                author: "",
                title: "",
                body: "",
                date: ""
            },
            suggestedBlogs: [] 
        };
    }

    componentDidMount() {
        axios.get('http://localhost:5000/blog/'+this.props.match.params.id)
            .then(response => {
                this.setState({
                    indexBlog: {
                        img: response.data.postImage,
                        author: response.data.author,
                        title: response.data.title,
                        body: response.data.body,
                        date: response.data.date
                    }
                })
                
            }) 
            .catch(function (error) {
                console.log(error); 
            });

        axios.get('http://localhost:5000/blog/suggested')
            .then(response => {
                this.setState({
                    suggestedBlogs: response.data
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    suggestedBlogs() {
        return this.state.suggestedBlogs.map(suggestedBlog => {
            return <BlogMd img={suggestedBlog.postImage} 
                        key={suggestedBlog._id}
                        title={suggestedBlog.title}
                        body={suggestedBlog.body}
                        authorImg={AuthorImg}
                        author={suggestedBlog.author} />
        });
    }
    
    render() {
        return (
            <div className="index-blog">
                <img className="index-blog-img" src={this.state.indexBlog.img} alt="Blog About Nothin" />
                <h1>{this.state.indexBlog.title}</h1>
                <div className="index-blog-author">
                    <img src={AuthorImg} alt="Blog About Nothin" />
                    <a href="/" className="blog-link">{this.state.indexBlog.author}</a>
                </div>
                <p>
                    {this.state.indexBlog.body}
                </p>

                <div className="suggested-blogs">
                    { this.suggestedBlogs()}
                </div>
            </div>
        )
    }
}

export default IndexBlog
