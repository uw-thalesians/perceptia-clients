import React, { Component } from 'react'
import NavBar from './NavBar'

class Header extends React.Component {
    render() {
       return (
          <div>
             <h1>Header</h1>
             <NavBar />
          </div>



         

         // <nav class="navbar navbar-expand-lg navbar-light bg-light sticky-top">
         // <a class="navbar-brand" href="#">

         //    <img class="logo" src="img/branding/t-logo.png" alt="Thalesian Branding">
 
         // </a>
         // <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
         //     aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
         //     <span class="navbar-toggler-icon"></span>
         // </button>
 
         // <div class="collapse navbar-collapse" id="navbarSupportedContent">
         //     <ul class="navbar-nav ml-auto">
         //         <li class="nav-item active">
         //             <a class="nav-link" href="#team">Team<span class="sr-only">(current)</span></a>
         //         </li>
         //         <li class="nav-item active">
         //             <a class="nav-link" href="#perceptia">Perceptia</a>
         //         </li>
         //         <li class="nav-item active">
         //             <a class="nav-link" href="#code">Code</a>
         //         </li>
         //     </ul>
         // </div>
 
         // </nav>
 
       );
    }
 }

 export default Header