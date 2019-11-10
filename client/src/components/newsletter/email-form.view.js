import React from 'react'

export default function EmailForm() {
    return (
        <div className="container" id="email-form">
            <form>
                <div className="form-group">
                    <label htmlFor="author">Email:</label>
                    <input type="email"
                        id="email"
                        className="form-control"
                        placeholder="NorfNorf@gmail.com"
                        required
                        />
                </div>
                <div className="form-group">
                    <label htmlFor="author">Name:</label>
                    <input type="text"
                        id="name"
                        className="form-control"
                        placeholder="Arya Stark"
                        required
                        />
                </div>
                

                <div className="form-group">
                    <input type="submit" value="Get Newsletter" id="btn-newsletter" className="button" />
                </div>
            </form>
        </div>
    )
}
