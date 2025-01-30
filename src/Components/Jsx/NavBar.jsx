import {useRef} from "react";
import {NavLink, useNavigate} from "react-router-dom";
import {PageRoutes} from "../../Scripts/Const";
import "../Styles/NavBar.css";
import {useAuth} from "../../Context";
import {faBars, faGear, faHome, faPeopleGroup, faSearch, faXmark,} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

function NavBar() {
    const navigate = useNavigate();
    const {logout, user_info, isAuthenticated} = useAuth();
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
                    <div className="mascot-2"></div>
                    <p>
                        Hello,{" "}
                        <span style={{color: "var(--primary-color)"}}>
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
                                style={({isActive}) => {
                                    return isActive ? {color: "var(--primary-color)"} : {};
                                }}
                                to={PageRoutes.Dashboard + user_info?.name}
                                onClick={toggle}
                            >
                                Dashboard
                            </NavLink>
                            <NavLink
                                style={({isActive}) => {
                                    return isActive ? {color: "var(--primary-color)"} : {};
                                }}
                                to={PageRoutes.PublicProfiles}
                                onClick={toggle}
                            >
                                People
                            </NavLink>

                            <NavLink
                                style={({isActive}) => {
                                    return isActive ? {color: "var(--primary-color)"} : {};
                                }}
                                to={PageRoutes.AboutUs}
                                onClick={toggle}
                            >
                                Know More
                            </NavLink>
                            <NavLink
                                style={({isActive}) => {
                                    return isActive ? {color: "var(--primary-color)"} : {};
                                }}
                                to={PageRoutes.ContactUs}
                                onClick={toggle}
                            >
                                Contact Us
                            </NavLink>
                        </>
                    ) : (
                        <>
                            <NavLink
                                style={({isActive}) => {
                                    return isActive ? {color: "var(--primary-color)"} : {};
                                }}
                                to={PageRoutes.AboutUs}
                                onClick={toggle}
                            >
                                Know More
                            </NavLink>
                            <NavLink
                                style={({isActive}) => {
                                    return isActive ? {color: "var(--primary-color)"} : {};
                                }}
                                to={PageRoutes.ContactUs}
                                onClick={toggle}
                            >
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
                <NavLink
                    style={({isActive}) => {
                        return isActive ? {color: "var(--primary-color)"} : {};
                    }}
                    to={PageRoutes.Landing}
                >
                    Home
                </NavLink>
                {isAuthenticated() ? (
                    <>
                        <NavLink
                            style={({isActive}) => {
                                return isActive ? {color: "var(--primary-color)"} : {};
                            }}
                            to={PageRoutes.Explore}
                        >
                            Explore
                        </NavLink>
                        <NavLink
                            style={({isActive}) => {
                                return isActive ? {color: "var(--primary-color)"} : {};
                            }}
                            to={PageRoutes.Dashboard + user_info?.name}
                        >
                            Dashboard
                        </NavLink>

                        <NavLink
                            style={({isActive}) => {
                                return isActive ? {color: "var(--primary-color)"} : {};
                            }}
                            to={PageRoutes.PublicProfiles}
                        >
                            People
                        </NavLink>
                    </>
                ) : null}

                <NavLink
                    style={({isActive}) => {
                        return isActive ? {color: "var(--primary-color)"} : {};
                    }}
                    to={PageRoutes.AboutUs}
                >
                    Know More
                </NavLink>
                <NavLink
                    style={({isActive}) => {
                        return isActive ? {color: "var(--primary-color)"} : {};
                    }}
                    to={PageRoutes.ContactUs}
                >
                    Contact Us
                </NavLink>
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
                    <FontAwesomeIcon icon={faBars}/>
                </button>
            </div>
            <div className={"tab-bar"}>
                <NavLink to={PageRoutes.Landing}
                         style={({isActive}) => (isActive ? {color: "var(--primary-color)"} : {})}>
                    <FontAwesomeIcon
                        icon={faHome}
                        style={{color: "inherit"}}
                    />
                </NavLink>
                <NavLink to={PageRoutes.Explore}
                         style={({isActive}) => (isActive ? {color: "var(--primary-color)"} : {})}>
                    <FontAwesomeIcon
                        icon={faSearch}
                        style={{color: "inherit"}}
                    />
                </NavLink>

                <NavLink to={PageRoutes.PublicProfiles}
                         style={({isActive}) => (isActive ? {color: "var(--primary-color)"} : {})}>
                    <FontAwesomeIcon
                        icon={faPeopleGroup}
                        style={{color: "inherit"}}
                    />
                </NavLink>

                <NavLink to={PageRoutes.Dashboard + user_info?.name}
                         style={({isActive}) => (isActive ? {color: "var(--primary-color)"} : {})}>
                    <FontAwesomeIcon
                        icon={faGear} style={{color: "inherit"}}
                    />
                </NavLink>
            </div>
        </div>
    );
}

export default NavBar;
