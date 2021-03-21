// @flow
import React from 'react';
import UserItem from './UserItem';
import "./UserItem.css";
import AddUsersForm from "./AddUsersForm";

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css


import {importAllFiles, getMaxId} from '../helpers/Misc_helper.js';
const Aimages = importAllFiles(require.context('../media/img', false, /\.(png|jpe?g|svg)$/));


class UserList extends React.Component {

	
	constructor() {
		super();
		this.state = {
			
		};
		
		this.handleEditUser = this.handleEditUser.bind(this);
		this.handleDeleteUser = this.handleDeleteUser.bind(this);
		this.handleAddUser = this.handleAddUser.bind(this);
	}

	handleDeleteUser(e, id) {
		confirmAlert({
      title: 'Confirmare',
      message: 'Stergi acest user?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
						let users = this.state.users;
						delete users[id];
						this.setState({users: users});
					}
        },
        {
          label: 'No',
          onClick: () => alert('Click No')
        }
      ]
		});
		
	}

	componentDidUpdate() {
		if(this.state.editUserAction === true) {
			this.setState({editUserAction: false});
		}
	}

	/**
	 * aduce id din UserItem care se doreste sa fie editat
	 * @param {*} e 
	 * @param {*} id 
	 */
	handleEditUser(e, id) {
		//	console.log("editez un user cu un id", id, this.state.users[id], this.state.users);
		if(this.state.users[id]) {
			let row = [];
			//	row = this.state.users[id];	// asa face un mare BUG pt ca nu asa se face asignarea!! row si state.users sunt identice
			row = {...this.state.users[id]};
			
			
			//	console.log("se incarca: ", this.state.users[id], row);
			this.setState({rowUser: row, editUserAction: true});	//	asociez datele cu randul de editat
		} else {
			console.log("WTF, nu exista acest id de editat");
		}
		//	this.setState({row: id});
	}

	/**
	 * prelucreaza datele venite din formularul de adaugare user
	 * @param {*} e 
	 * @param {*} userInfo 
	 */
	handleAddUser(e, userInfo) {
    // se salveaza in state noile informatii de userInfo; acestea trec ca props la UserList iar componentDidUpdate va face update la componentDidMount care a facut fetch initial
		//	this.setState({userInfo: userInfo});
		// ba nu se mai face macicana asta! modificare de state => se va rula inutil de doua ori render si implicit de cate doua ori UserItem
		//	console.log("se adauga: ", userInfo);
		
		if(userInfo && Object.keys(userInfo).length > 0) {
			if(userInfo.id) {
				// aici e ramura pentru edit
				let users = this.state.users;
				users[userInfo.id] = {
					id: userInfo.id,
					name: userInfo.name,
					email: userInfo.email,
					salary: userInfo.salary,
					isGoldClient: userInfo.isGoldClient,
					img: userInfo.img,
					imgId: userInfo.imgId
				}
				this.setState({users: users});
			} else {
				// aici e ramura pentru insert
				let users = this.state.users;
				let id = getMaxId(this.state.users);
				users[id] = {
					id: id,
					name: userInfo.name,
					email: userInfo.email,
					salary: userInfo.salary,
					isGoldClient: userInfo.isGoldClient,
					img: userInfo.img,
					imgId: userInfo.imgId
				}
				
				this.setState({users: users});
				
				
			}

			/*
				// nu mai merge asa deoarece stateul de useri nu mai este un obiect ci este un array; key = id!
				this.setState(prevState=>{
					return {
						users: [
							...prevState.users,
							{
								id: getMaxId(this.state.users),
								name: userInfo.name,
								email: userInfo.email,
								salary: userInfo.salary,
								isGoldClient: userInfo.isGoldClient,
								img: userInfo.img
							}
						]
					}
				});
				*/
			
			//	console.log("CRUD de useri", this.state);
		}
  }
	

	render() {
		//	console.log("UserList.render", this.props.users, this.state)
		return (
		<div>
			<AddUsersForm handleAddUser={this.handleAddUser} editUserAction={this.state.editUserAction} rowUser={this.state.rowUser} /> 
			<h3>Lista useri</h3>
		   {
				//   sunt similare dar totusi mai bine se foloseste props; in fine; acum se face cu apelare serverside din componentDidMount
				//  this.props.users.map((value) => {
				//  this.props.users.map((value) =>  <UserItem name={value.name} email={value.email} img={value.img} salary={value.salary} id={value.id} isGoldClient={value.isGoldClient} key={value.id}  />)
				this.state.users && this.state.users.length > 0 
					? this.state.users
						//	.sort((a,b)=>a.name > b.name ? 1 : (b.name > a.name ? -1 : 0)) ; nu merge sort pentru ca am mers pe varianta key = value.id in users ... altadata
						.map(value=><UserItem name={value.name} email={value.email} img={value.img} salary={value.salary} id={value.id} isGoldClient={value.isGoldClient} handleEditUser={this.handleEditUser} handleDeleteUser={this.handleDeleteUser} key={value.id}  />)	 
							
						// 
						
						
					: (<h4>Se incarca </h4>)
		   } 
		   {this.state.errorFetch && <h4>Eroare incarcare lista useri: {this.state.errorFetch} </h4> }
		</div>
		);
	}


	// nu isi mai are rostul!
	// componentDidUpdate() {
	// 	console.log("UserLis => componentDidUpdate");
	// 	// daca este setat unserInfo, atunci se ruleaza
		
	// }

	componentDidMount() {
		/*
		let users = [...this.state.users];
		users[1].name = 'modificat din mount';
		this.setState({users: users});
		*/
	   
		//	console.log("UserList=>didMount");
		// daca se submite, nu se mai face fetch inutil; oricum, noroc ca DidMount se ruleaza inainte de DidUpdate
		fetch("https://jsonplaceholder.typicode.com/users")
		.then(response=>response.json())
		.then(users=>{

			const filteredUsers = users.filter((user)=> user.id<5   );
			let users2 = []; // piticii imi cer ca key sa fie identic cu value.id
			
			// niste hardcodari de amorul artei
			filteredUsers[0].salary = 12000;
			filteredUsers[0].img = Aimages[0].default;
			filteredUsers[0].isGoldClient = true;

			filteredUsers[1].salary = 22000;
			filteredUsers[1].img = Aimages[1].default;

			filteredUsers.forEach((value, key)=> {
				users2[value.id] = value;
			});

			this.setState({users: users2});
			//	console.log(users2);
		})
		.catch(error=>{
			this.setState({errorFetch: error.message});
		});

		
		
		
	}

	componentWillUnmount() {
		 console.log("UserList: componentWillUnmount; curatare eventuri, timere sau orice altceva vrei sa distrugi");
	}
}

export default UserList;