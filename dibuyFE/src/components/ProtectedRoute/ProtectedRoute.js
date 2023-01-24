import Cookies from 'js-cookie'
import { Redirect, Route } from 'react-router-dom'
const ProtectedRoute = (props) => {
    if (Cookies.get("jwtToken") === undefined) {
        return <Redirect to="/user/login" />
    }
    return <Route {...props} />
}

export default ProtectedRoute