import Home from '../img/Home.png';
import GamePad from '../img/GamePad.png';
import Plus from '../img/plus.png';
import { useState } from 'react';
import { NavLink } from "react-router-dom";
import logo from '../img/logo.png';
import Free2Game from '../img/Free2Game.png';

const NavBar = () => {
    const [navBarBig, setnavBarBig] = useState(false);

    let showMenu = () => {
        setnavBarBig(bool => bool = !bool);

    }

    return (
        <div className="navWrapper">
            <div className="navigation">
                <div className="navBar" style={{ width: navBarBig ? "260px" : "74px" }}>
                    <div className="hamburger" onClick={showMenu}>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                    <div className="icons">
                        <NavLink className={({ isActive }) => isActive ? "activeButton" : ""} to="/home">
                            <img src={Home} alt="House" /><span>{navBarBig && "Home"}</span>
                        </NavLink>
                        <NavLink className={({ isActive }) => isActive ? "activeButton" : ""} to="/all">
                            <img src={GamePad} alt="GamePad" /><span>{navBarBig && "All Games"}</span>
                        </NavLink>
                        <NavLink className={({ isActive }) => isActive ? "activeButton" : ""} to="/recently">
                            <img src={Plus} alt="Plus" /><span>{navBarBig && "Recently Added"}</span>
                        </NavLink>
                    </div>
                </div>
            </div>
            <div className="logo" style={{ marginLeft: navBarBig ? "285px" : "100px" }}>
                <img src={logo} alt="Logo" />
                <img src={Free2Game} alt="Free2Game" />
            </div>
        </div>
    );
}

export default NavBar;