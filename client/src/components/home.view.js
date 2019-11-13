import React, { Component } from 'react';

//welcome section images
import Bg from '../assets/climb.jpeg';


//import blog views
import Featured from './blog/featured-blog.view';
import Topics from './blog/topics-blog.view';

import EmailForm from './newsletter/email-form.view';

var welcomeStyles = {
    backgroundImage: `url(${Bg})`
}



export default class Home extends Component {
    render() {
        return(
            <div className="home">
                <section className="home-welcome" style={ welcomeStyles }>
                    <div className="welcome-text">
                        <h1>Welcome to Millennial Tactics</h1>
                        <p>
                            Here at Millennial Tactics, I look into the methods millenials
                            are using in their efforts to level up.  There are many ways we
                            are trying to improve ourselves daily and I want this to be a hub
                            where new strategies can be discovered.  Whether it's prepping for
                            a career change, a new diet, or an investment trend, I want to 
                            cover it if it is making millennial lives better.
                        </p>
                    </div>
                </section>
                <section className="featured-blog-section">
                    <h1 className="section-title">Featured Blog</h1>

                    <Featured />
                </section>
                <EmailForm />
                <h1 className="section-title">Browse New Blogs By Topic</h1>
                <Topics />

            </div>
        )
    }
}