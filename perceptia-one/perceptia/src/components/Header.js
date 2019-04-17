import React, { Component } from 'react'
import NavBar from './NavBar'

class Header extends React.Component {
    render() {
       return (
          <div>
             <h1>Header</h1>
             <NavBar />
          </div>
       );
    }
 }

 export default Header