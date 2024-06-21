import React from 'react';
import Logo from "../assets/Logo.svg"
import user from "../assets/user.svg"
import { CiMenuFries } from "react-icons/ci";


const Header = () => {
  return (
    <div className='header'>
    <div className='sub_header'>
        <div className='mobile_icon'> <CiMenuFries/></div>
        <img className='logo' src={Logo}  />
        <img src={user}  />
    </div>
    </div>
  );
}

export default Header;
