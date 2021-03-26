import React from "react";

import Layout from "../components/Layout";
import UserList from "../components/UserList";
import PostList from "../components/PostList";



class Home extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      afisare: 'users',
      MyBackground: "white",
      MyFontColor: "black"
    };
    
    
  }

  changeColor(e) {
    this.setState({MyBackground: e.target.value});
  }

  changeFontColor(e) {
    this.setState({MyFontColor: e.target.value});
  }

  render() {
    
    return (
      <Layout location={this.props.location} backgroundColor={this.state.MyBackground} fontColor={this.state.MyFontColor} >
        {/*<AddUsersForm handleAddUser={(event)=>this.handleAddUser(event)} /> */}
        
        <button onClick={()=>this.setState({afisare: 'users'})}>Afiseaza useri</button>
        <button onClick={()=>this.setState({afisare: 'posts'})}>Afiseaza posturi</button>      

        {this.state.MyBackground !== '#000000' && this.state.afisare==='users' && <UserList />} 
        {this.state.afisare==='posts' && <PostList />}
        <hr />       
        <div><label htmlFor="bkg-color">Culoare background</label><input id="bkg-color" type="color" onChange={(event) => this.changeColor(event)} value={this.state.MyBackground} /></div> 
        <div><label htmlFor="app-color">Culoare App</label><input id="app-color" type="color" onChange={(event) => this.changeFontColor(event)} value={this.state.MyFontColor} /></div>
        
      </Layout>      
    )
  }
}

export default Home;