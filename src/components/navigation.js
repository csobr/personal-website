import React from "react";
class Navbar extends React.Component {
  render() {
    return (
      <nav>
        <div className="logo">
          <a href="/">
            <img src="./logo.svg" alt="logo"></img>
          </a>
        </div>

        <div className="toggle" onClick={this.toggle}>
          <i className="hamburger">
            <span></span> <span></span>
            <span></span>
          </i>
        </div>

        <ul className="links">
          <li>
            <a href="/seyn" onClick={this.toggle}>
              Seyn
            </a>
          </li>
          <li>
            <a href="/wore" onClick={this.toggle}>
              Wore
            </a>
          </li>
          <li>
            <a href="/unit" onClick={this.toggle}>
              Unit
            </a>
          </li>
          <li>
            <a href="/ui" onClick={this.toggle}>
              Ui exploration
            </a>
          </li>
          <li>
            <a href="/photos" onClick={this.toggle}>
              Photos
            </a>
          </li>
          <li>
            <a href="/furniture" onClick={this.toggle}>
              Furniture
            </a>
          </li>
        </ul>
      </nav>
    );
  }
  toggle() {
    // Function only does stuff when the screen width is to the point where the toggle icon is visible. This function is added to links as well as the toggle icon so that the dropdown closes after a link is clicked
    if (window.innerWidth < 415) {
      document.querySelector(".links").classList.toggle("open");
    }
  }
}
export default Navbar;
