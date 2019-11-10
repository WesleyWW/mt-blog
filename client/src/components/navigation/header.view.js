import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Logo from '../../assets/logo.png'

export class Header extends Component {
    render() {
        return (
            <div className="header">
                <div className="header-brand">
                    <h2>Millennial Tactics</h2>
                    <img className="header-brand-img" src={Logo} alt="brand art" />
                </div>
                <div className="header-links">
                    <Link to="/" className="header-ink">Home</Link>
                    <Link to="/blog" className="header-ink">Blog</Link>
                    <Link to="/" className="header-ink">Contact</Link>
                </div>
                <div className="header-social-icons">
                    <i className="fab fa-instagram fa-lg"></i>
                    <i className="fab fa-twitter-square fa-lg"></i>
                    <i className="fab fa-facebook fa-lg"></i>
                </div>
            </div>
        )
    }
}

export default Header
