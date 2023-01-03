import { Component } from 'react'
import { Link } from 'react-router-dom'
class NotFound extends Component {
    render() {
        return (
            <div className="">
                <h1>Page Not Found</h1>
                <img
                    src="https://assets.ccbp.in/frontend/react-js/tech-era/not-found-img.png"
                    alt="not found"
                />
                <p>We are sorry, the page you requested could not be found</p>
                <button type="button" className="btn btn-warning">
                    <Link to="/">Home</Link>
                </button>
            </div>
        )
    }
}

export default NotFound
