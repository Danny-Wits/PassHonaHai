import { useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { PageRoutes } from "../../Scripts/Const";
import "../Styles/NavBar.css";
import { useAuth } from "../../Context";
import {
  faBars,
  faRightLeft,
  faRightLong,
  faX,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function NavBar() {
  const navigate = useNavigate();
  const { logout, user_info, isAuthenticated } = useAuth();
  const mobileNav = useRef(null);
  const mobileToggle = useRef(null);
  const toggle = () => {
    const mobileNavDiv = mobileNav.current;
    const button = mobileToggle.current;
    if (mobileNavDiv.classList.contains("view")) {
      mobileNavDiv.classList.remove("view");
      button.classList.remove("none");
    } else {
      mobileNavDiv.classList.add("view");
      button.classList.add("none");
    }
  };
  const mobileNavBar = () => {
    return (
      <div ref={mobileNav} className="mobile-nav">
        <FontAwesomeIcon
          icon={faXmark}
          className="cross-button"
          onClick={() => toggle()}
        />
        <div className="mascot-message flex">
          <div className="mascot-2"> </div>
          <p>
            Hello,{" "}
            <span style={{ color: "var(--primary-color)" }}>
              {" "}
              {user_info?.name ?? "Student"}
            </span>
          </p>
        </div>

        <div className="mobile-links flex">
          <a
            onClick={(e) => {
              e.preventDefault();
              toggle();
            }}
          >
            Home
          </a>
          {isAuthenticated() ? (
            <>
              <NavLink
                to={PageRoutes.Dashboard + user_info?.name}
                onClick={toggle}
              >
                Dashboard
              </NavLink>
              <NavLink
                to={PageRoutes.PublicProfile + user_info?.name}
                onClick={toggle}
              >
                People
              </NavLink>

              <NavLink to={PageRoutes.AboutUs} onClick={toggle}>
                Know More
              </NavLink>
              <NavLink to={PageRoutes.ContactUs} onClick={toggle}>
                Contact Us
              </NavLink>
            </>
          ) : (
            <>
              <NavLink to={PageRoutes.AboutUs} onClick={toggle}>
                Know More
              </NavLink>
              <NavLink to={PageRoutes.ContactUs} onClick={toggle}>
                Contact Us
              </NavLink>
            </>
          )}
        </div>

        <div className="mobile-buttons flex">
          <button
            onClick={() => {
              if (isAuthenticated()) logout();
              navigate(PageRoutes.Login);
            }}
          >
            {isAuthenticated() ? "Logout" : "Login"}
          </button>

          {isAuthenticated() ? null : (
            <button
              className="secondary-button"
              onClick={() => navigate(PageRoutes.Register)}
            >
              Register
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="nav-bar">
      <div className="flex brand">
        <div className="logo"></div>
        <p className="title">PassHonaHai</p>
      </div>
      <nav className="flex nav-links">
        <NavLink to={PageRoutes.Landing}>Home</NavLink>
        {isAuthenticated() ? (
          <>
            <NavLink to={PageRoutes.Dashboard + user_info?.name}>
              Dashboard
            </NavLink>
            <NavLink to={PageRoutes.PublicProfile + user_info?.name}>
              People
            </NavLink>
          </>
        ) : null}

        <NavLink to={PageRoutes.AboutUs}>Know More</NavLink>
        <NavLink to={PageRoutes.ContactUs}>Contact Us</NavLink>
      </nav>

      <div className="buttons flex">
        <button
          onClick={() => {
            if (isAuthenticated()) logout();
            navigate(PageRoutes.Login);
          }}
        >
          {isAuthenticated() ? "Logout" : "Login"}
        </button>

        {isAuthenticated() ? null : (
          <button
            className="secondary-button"
            onClick={() => navigate(PageRoutes.Register)}
          >
            Register
          </button>
        )}
      </div>

      {mobileNavBar()}

      <div ref={mobileToggle} className="toggle-button">
        <button className="clear-button" onClick={() => toggle()}>
          <FontAwesomeIcon icon={faBars} />
        </button>
      </div>
    </div>
  );
}

export default NavBar;
