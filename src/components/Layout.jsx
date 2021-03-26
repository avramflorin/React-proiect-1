import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const Layout = props => {
  return (
    <div style={{backgroundColor: props.backgroundColor, color: props.fontColor}}>
      <Header location={props.location} match={props.match} />
        {props.children}
      <Footer />

    </div>
  )
}



export default Layout;