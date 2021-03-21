import * as React from 'react';
import {CommaFormatted} from "../helpers/Misc_helper";



const SaveComponent = (props) => {
    console.log("props la save", props);
    return(
        <>
        <input type="text" onChange={props.handleChange} value={props.editName} />
        <button onClick={props.handleSave}>Salveaza</button> 
        </>
    );
}

const EditComponent = (props) => {
    return(
        <button onClick={props.handleEdit}>Editeaza nume</button>
    );
}

class UserItem extends React.Component  {
    
    constructor(props) {
        super(props);
        this.state = {};

        this.state.editMode = 'view';
        
        //  this.state.email = props.email; nu se face asta: props este vizibil oriunde si daca se face update la props, state nu se modifica!

        this.handleEdit = this.handleEdit.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleChange = this.handleChange.bind(this);
        //  console.log(props);
    }

    handleChange(e) {
        this.setState({name: e.target.value});
    }

    handleEdit() {
        //  console.log('edit: ' +  this.state.info);
        this.setState({editMode: 'edit'});
    }

    handleSave() {
        this.setState({editedName: this.state.name, editMode: 'view'});
        //  console.log('save: ' + this.state.name);
    }

    
    render() {
        //console.log("userItem=>render;", this.props);
        const state = {
            'view': <EditComponent handleEdit={this.handleEdit}  />,
            'edit': <SaveComponent handleSave={this.handleSave} editName={this.state.name} handleChange={this.handleChange} />
        };
        
        return (
        <div className="user-item" style={{'color': this.props.color}}>
            <div>
                <h2>{this.state.editedName}</h2>{state[this.state.editMode]}
            </div>
            <div>Email: <span id={"email_" + this.props.id}>{this.props.email}</span></div>
            <div>Salariu: {CommaFormatted(this.props.salary, 0)}</div>
            <div>Id: #{this.props.id}</div>
            <div>
                {
                    this.props.img
                        ? <img src={this.props.img} alt="{this.props.img}" style={{width: "200px"}} />
                        : "[NO IMG]"
                }
            </div>
            <div>
                Membru gold: {this.props.isGoldClient === true ? 'Da': 'Nu'}
            </div>
            <div>
                <button onClick={(e)=>{this.props.handleEditUser(e, this.props.id)}}>Edit</button>
                <button onClick={e=>{this.props.handleDeleteUser(e, this.props.id)}}>Delete</button>
            </div>
        </div>
        );
    }

    componentDidMount() {
        
        this.setState({
            name: this.props.name,  //  numele care se transfera
            editedName: this.props.name
        });
        //  console.log("UserItem=>didmount: " + this.props.email);
    }
    

    componentDidUpdate(prevProps) {
        // nebunia asta o mai fac din cauza ca numele pot sa il modific odata inplace si odata cu formularul
        
        if(prevProps !== this.props) {
            this.setState({
                name: this.props.name,  //  numele care se transfera
                editedName: this.props.name
            });
        }
    }

    /**
     * ca sa nu ruleze pentru toate apelarile, se <b>face</b> o comparatie prevProps cu Props
     * @param {*} prevProps 
     */
    // componentDidUpdate(prevProps) {
    //     //  console.log("UserItem=>didupdate: " + (prevProps.name !== this.props.name ? 'merita apelata' : 'NU merita apelata') + prevProps.name + " versus " + this.props.name);
    // }
}

export default UserItem;