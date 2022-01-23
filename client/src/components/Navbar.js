import React, { Component } from 'react';

export default class Navbar extends Component {
  render() {
    return (
        <div className='container'>
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
      <a class="navbar-brand" href="/" >Home</a>
  
      <a class="navbar-brand" href="/add" style={{color:'grey'}}>Create New Post</a>
     
    </div>
    
  </div>
</nav>
        </div>
    );
  }
}
