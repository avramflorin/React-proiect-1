import React from "react";
import {Link} from "react-router-dom";
import  "./Header.css";


class Header extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      menu: [
        {url: '/', path: '/', title: 'Home'},
        {url: '/about/', path: '/about/', title: 'About me'},
        {url: '/about/others', path: '/about/:who', title: 'About ...'}
      ]
    };
  }

  render() {
    return (
      <div>

      <nav className="header_menu">
        
        <ul className="nav-links">
        {this.state.menu.map((value, id)=>{
          return (
            <li className="nav-item" key={id}>
              {
                (this.props.match?.path ?? this.props.location.pathname) === value.path 
                  ? <Link className="selected" to={value.url}>{value.title}</Link>
                  : <Link to={value.url}>{value.title}</Link>
              }
            </li>
          )
        })}
        </ul>
      </nav>

      
      </div>
    )
  }

}

// function Header(props) {
//   console.log(props);
//   return (
//     <>
//     <ul>
//       <li><Link to='/'>Home</Link></li>
//       <li><Link to="/about">About me</Link></li>
//       <li><Link to='/about/others'>About ...</Link></li>
//     </ul>
//     </>
//   )
// }

export default Header;