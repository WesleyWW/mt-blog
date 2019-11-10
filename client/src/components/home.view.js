import React, { Component } from 'react';

//welcome section images
import Bg from '../assets/climb.jpeg';
import Finance from '../assets/dollar-seeds.jpeg';
import Education from '../assets/chess.jpeg';
import Health from '../assets/broken-bear.jpeg';

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
                    <div className="flex-row">
                        <div className="signup">
                            <h3>Here at Millennial Tactics, we're focused on how we go about
                                Adulting and Leveling Up.   It's hard sometimes, but we got you
                                with the inside scoop.
                            </h3>
                        </div>
                    </div>
                    <div className="flex-row topics">
                        <div className="topic">
                            <img className="topic-img" src={Finance} alt="topic-img" />
                            <div className="topic-text">
                                <h3>Finance</h3>
                                <p>From how you make ends meet to how you retire comfortable, 
                                    we'll get into all of it.
                                </p>
                            </div>
                        </div>
                        <div className="topic">
                            <img className="topic-img" src={Education} alt="topic-img" />
                            <div className="topic-text">
                                <h3>Education</h3>
                                <p>From how you make ends meet to how you retire comfortable, 
                                    we'll get into all of it.
                                </p>
                            </div>
                        </div>
                        <div className="topic">
                            <img className="topic-img" src={Health} alt="topic-img" />
                            <div className="topic-text">
                                <h3>Health</h3>
                                <p>From how you make ends meet to how you retire comfortable, 
                                    we'll get into all of it.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="featured-blog-section">
                    <Featured />
                    <EmailForm />
                    <Topics />
                </section>
            </div>
        )
    }
}