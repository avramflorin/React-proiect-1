import React from 'react';

class PostItem extends React.Component {

    

    render() {
        return (
            <div className="post-item">
                 
                <h4>{this.props.row.title}</h4>
                <p>{this.props.row.body}</p>
            </div>
        );
    }
}

export default PostItem;