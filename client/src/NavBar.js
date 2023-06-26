import { Link } from "react-router-dom";

// if we are using link instead of anchor tag <a> then all routing happens in the browser level and not in the server level if we are using anchor tag then it will go to the server ftech those html page and rende it,
// but if we are using link tag then all route happens in the browser not in the server it will only to server in the first time and get page the page and react bundle js from there react can inject components based on thbe requirement
const Navbar = () => {
    return (
        <nav className="navbar">
            <h1>Quote Writer </h1>
            <div className="links">
                <Link to="/">Home</Link>
                <Link to="/register" style={{
                    color:"white",
                    backgroundColor:"red",
                    borderRadius:"8px"
                }}>New User</Link>
                <Link to="/login" >Login</Link>
            </div>
        </nav>
    );
}
 
export default Navbar;