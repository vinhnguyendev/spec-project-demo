import { Link } from "react-router-dom";
import img from './Nutrition.png'

function Navbar() {
  return (
    <div className="navbar-container">
      <div className="navbar-content">
        <button className="nav-link"><img className="logo-container" src={img} /></button>
        <button className="nav-link">
          <Link className="link-btn" to={"/home"}>
            Home
          </Link>
        </button>
        <button className="nav-link">
          <Link className="link-btn" to={"/tracker"}>
            Profile
          </Link>
        </button>
      </div>
      <button className="nav-link" id="logOut-btn">
        <Link className="link-btn" to={"/"}>
          Log out
        </Link>
      </button>
    </div>
  );
}
export default Navbar;
