import React, { Component } from 'react'
import axios from 'axios'



const BlogSm = (props) => {
    return (
        <div className="blog-preview-sm">
            <img src={props.img} className="preview-sm" alt="Blog Post" />
            <h3><a href={"/blog/" + props.post._id}>{props.headline}</a></h3>
        </div>
    )
}

export class TopicsBlog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            financeTopicPosts: [],
            educationTopicPosts: [],
            healthTopicPosts: [],
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/blog/topics/finance')
            .then(res => {
                this.setState({
                    financeTopicPosts: res.data
                })
            })
            .catch(err => {console.log(err)});
            
        axios.get('http://localhost:5000/blog/topics/education')
            .then(res => {
                this.setState({
                    educationTopicPosts: res.data
                })
            })
            .catch(err => {console.log(err)});
        axios.get('http://localhost:5000/blog/topics/health')
            .then(res => {
                this.setState({
                    healthTopicPosts: res.data
                })
            })
            .catch(err => {console.log(err)});
    }

    financePosts() {
        return this.state.financeTopicPosts.map(financePost => {
            return <BlogSm post={financePost} img={financePost.postImage} headline={financePost.title} key={financePost._id} />
        })
    }

    educationPosts() {
        return this.state.educationTopicPosts.map(educationPost => {
            return <BlogSm post={educationPost} img={educationPost.postImage} headline={educationPost.title} key={educationPost._id} />
        })
    }

    healthPosts() {
        return this.state.healthTopicPosts.map(currentPost => {
            return <BlogSm post={currentPost} img={currentPost.postImage} headline={currentPost.title} key={currentPost._id} />
        })
    }

    render() {
        return (
            <div className="topics-blog">
                <div className="topic-section">
                    <h2>Finance</h2>
                    { this.financePosts() }
                </div>
                <div className="topic-section">
                    <h2>Education</h2>
                    { this.educationPosts() }
                </div>
                <div className="topic-section">
                    <h2>Health</h2>
                    
                    { this.healthPosts() }
                </div>
            </div>
        )
    }
}

export default TopicsBlog
