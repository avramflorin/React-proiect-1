import React from "react";
//  import { useParams } from "react-router-dom";
import Layout from "../components/Layout";

class About extends React.Component {

  constructor(props) {
    super(props);
    
    this.state = {about: props.match.params.who ||  'me'};
  }

  componentDidUpdate(prevProps) {
    // se parseaza un parametru din url si se afiseaza in componenta
    if(prevProps !== this.props) {
      this.setState({about: this.props.match.params.who || 'me'});
    }
  }



  render() {
    // console.log(
    //   this.props.location, // de interes: pathname: calea completa
    //   this.props.match, //  de interes: path: ruta pe care a intrat; isExact
    //   this.props.history
    // );
    return (
      <Layout location={this.props.location} match={this.props.match}>
        <h3>About {this.state.about}</h3>

        
        
      </Layout>
    )
  }
}

export default About;