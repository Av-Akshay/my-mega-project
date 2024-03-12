import React from 'react';
import logo from "../assets/logo.png"

const Logo = ({width}) => {
    const styling = {
        "70px": "w-[70px] rounded-full "
    }
  return (
   <figcaption>
    <img className={`${styling[width]}`} src={logo} alt="logo" />
   </figcaption>
  )
}

export default Logo