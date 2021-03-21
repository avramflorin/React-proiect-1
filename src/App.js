// @flow
import React from "react";


import UserList from "./components/UserList";
import PostList from "./components/PostList";
import "./App.css";




/**
 * @author: Florin Avram
 */
class App extends React.Component {

  constructor() {
    super();
    
    this.state = {
      'afisare': 'users',
      'MyBackground': 'white',
      'MyFontColor': 'black',
      
      // users: [
      //   {
      //     id: 1,
      //     name: "Avram Florin_",
      //     email: "avram@florin.com",
      //     img: Aimages[0].default,
      //     salary: 12000,
      //     isGoldClient: false
      //   },
      //   {
      //     id: 2,
      //     name: "A. Florin_",
      //     email: "av@florin.com",
      //     img: Aimages[1].default,
      //     salary: 22000,
      //     isGoldClient:true
      //   }
      // ]
      
    };
    
    
  }

  getMaxId(users) {
    let id = 0;
    users.forEach(user => {
      if(user.id > id) id = user.id
    });
    return id;
  } 

  

  changeColor(e) {
    this.setState({MyBackground: e.target.value});
  }

  changeFontColor(e) {
    this.setState({MyFontColor: e.target.value});
  }

  setAfisare(a) {
    this.setState({afisare: a});
  }

  render() {
    return(
      <div style={{background: this.state.MyBackground, color: this.state.MyFontColor}}>
        {/*<AddUsersForm handleAddUser={(event)=>this.handleAddUser(event)} /> */}
        
        <button onClick={()=>this.setState({afisare: 'users'})}>Afiseaza useri</button>
        <button onClick={()=>this.setState({afisare: 'posts'})}>Afiseaza posturi</button>      

        {this.state.MyBackground !== '#000000' && this.state.afisare==='users' && <UserList />} 
        {this.state.afisare==='posts' && <PostList />}
        <hr />       
        <input type="color" onChange={(event) => this.changeColor(event)} />
        <input type="color" onChange={(event) => this.changeFontColor(event)} />
       
        
      </div>
    );
  }

  


}


export default App;
