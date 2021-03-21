import React from "react";
import PostItem from "./PostItem";

import "./PostItem.css";

class PostList extends React.Component {

    
    constructor(props) {
        super(props);
          this.state = {};  // in caz ca se face fetch ori de cate ori se face mount componenta PostList
    }
    

    render() {
        console.log("post: render");
        
        
        return (
            <div>
            <h3>Lista posturi</h3>
            {
                this.state.posts && this.state.posts.length > 0 
                    ? this.state.posts.map((value, key)=><PostItem row={value} key={key} />) 
                    : <h4>Se incarca</h4>
            }
            {this.state.errorFetch && <h4>Eroare fetch posturi: {this.state.errorFetch}</h4>}
        
            </div>
        );
    }

    componentDidMount() {
        // console.log('posts: didmount');
        
        // in caz ca se reincarca lista de fiecare data cand se apasa butonul de posturi
        fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response=>response.json())
        .then(response => {
            let posts = response.map((value) => {
                return {id: value.id, title: value.title, body: value.body};
            });
            this.setState({posts: posts});
        })
        .catch((error)=>{
            this.setState({errorFetch: error.message});
        });
    
        
        
    }

    componentWillUnmount() {
        //console.log("PostList: face unmount;");
    }
}

export default PostList;