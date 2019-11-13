import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

//temp img
import AuthorImg from '../../assets/noprofile.jpg'

export class Featured extends Component {
    constructor(props){
        super(props);

        this.state = { featuredBlog: [] };
    }
 
    componentDidMount() {
        axios.get('/blog/latest')
            .then(response => {
                this.setState({ 
                    featuredBlog: response.data
                     })
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        return (
            <div className="featured-blog">
                
                
                <div className="featured-blog-content">
                    <img className="featured-blog-img" src={ this.state.featuredBlog.postImage } alt="featured blog" />
                    <div className="container">
                        <h2 className="featured-blog-header"><Link to={'/blog/'+ this.state.featuredBlog._id }>{ this.state.featuredBlog.title }</Link></h2>
                        <div className="featured-blog-author">
                            <img src={AuthorImg} alt="W.Wyane.W" />
                            <a href="/" className="blog-link">{ this.state.featuredBlog.author }</a>
                        </div>
                        <p className="featured-blog-preview">
                            { this.state.featuredBlog.body }    
                        </p>
                        <Link className="button" to={'/blog/'+ this.state.featuredBlog._id }>Read More >></Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default Featured
