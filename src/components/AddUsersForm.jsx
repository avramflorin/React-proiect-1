import React from 'react';
import "./AddUsersForm.css";

import {importAllFiles} from '../helpers/Misc_helper.js';
const Aimages = importAllFiles(require.context('../media/img', false, /\.(png|jpe?g|svg)$/));

/**
 * componenta cu erorile formularului
 */
const FormErrors = (props)=> {
	if(props.errors.length > 0) {
		return (
			<ul>
			{props.errors.map((value, key)=>{
				return <li key={key}>{value}</li>
			})}
			</ul>
			
		)
	} else {
		return null;
	}
	
}


class AddUsersForm extends React.Component {
	
	constructor() {
		super();
		
		this.state = {formData: {}, formErrors: []};
		//	console.log("ne-au venit datele de edit: ", props.rowUser);
	}

	/**
	 * @todo: dupa ce se salveaza, nu se mai poate edita imediat tot acela; trebuie altul
	 * 
	 */
	componentDidUpdate(prevProps) {
		// "Ascultam" daca ne vin date pentru editare; daca da, precompletam formularul;
		//	console.log("formular: componentDidUpdate", prevProps, this.props, prevState, this.state);
		// daca avem rowUser si (daca difera id-urile SAU daca avem alte date in formular) atunci se incarca in formular
		// 
		//	if(this.props.rowUser?.id !== prevProps.rowUser?.id ) {
		if(prevProps.editUserAction) {
			//	|| this.state.formData !== this.props.rowUser 
			//	&& !this.state.formSuccess 
			this.setState({formData: this.props.rowUser});
		}
	}


	/**
	 * se ocupa de modificarea fiecarui input din form
	 * @param {*} e 
	 * @param {*} name 
	 */
	handleChangeInput(e, name) {
		let formData = this.state.formData;
		formData[name] = e.target.value;
		this.setState({formData: formData});
	}

	sendForm(e) {
		// nu se submite formularul
		e.preventDefault();
		//	console.log('formular trimis', this.state.formData);

		// intai facem validarile
		// stergem toate erorile
		let formErrors = [];
		if(!this.state.formData.name) formErrors.push('Nu este completat numele');
		if(!this.state.formData.email) formErrors.push('Nu este completat emailul');
		if (this.state.formData.email && !(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(this.state.formData.email))) formErrors.push("Campul email nu este valid");
		if(this.state.formData.salary && (isNaN(this.state.formData.salary) || this.state.formData.salary < 0)) formErrors.push("Salariul trebuie sa fie numeric si pozitiv");
		if(!this.state.formData.isGoldClient) formErrors.push("Nu este completat campul Gold Client");

		//	salvam state-ul cu erorile formularului
		this.setState({formErrors: formErrors});

		if(formErrors.length === 0) {
			this.props.handleAddUser(e, {
				id: this.state.formData.id || 0,
				name: this.state.formData.name, 
				email: this.state.formData.email,
				salary: this.state.formData.salary,
				isGoldClient: this.state.formData.isGoldClient,
				img: this.state.formData.img && Aimages[Aimages.findIndex(e=>e.default === this.state.formData.img)].default,
				
			});
			// golim formularul
			this.setState({formData: {}});

			//	console.log("s-a submis", this.state.formData, Aimages, Aimages["1"]);    
		}
		
	}


	render() {
		return(
		<form className="add-users-form">
			<FormErrors errors={this.state.formErrors} />
			<input type="hidden" value={this.state.formData.id || ""} />
			<label htmlFor="name">Nume: *</label>
			<input type="text" name="name" onChange={(e)=>this.handleChangeInput(e, 'name')} value={this.state.formData.name || ""} />
			<label htmlFor="email">Email: *</label>
			<input type="text" name="email" onChange={e=>this.handleChangeInput(e, 'email')} value={this.state.formData.email || ""} />
			<label htmlFor="salary">Salariu: *</label>
			<input type="text" name="salary" onChange={e=>this.handleChangeInput(e, 'salary')} value={this.state.formData.salary || ""} />
			<label htmlFor="isGoldClient">Membru gold: * </label>
				<select name="isGoldClient" onChange={e=>this.handleChangeInput(e, 'isGoldClient')} value={this.state.formData.isGoldClient || ""}>
					<option></option>
					<option value={false}>Nu</option>
					<option value={true}>Da</option>
				</select>
				<label htmlFor="name">Imagine:</label> 
			<select name="img" onChange={e=>this.handleChangeInput(e, 'img')} value={this.state.formData.img || ""}>
				<option></option>
			{
				Aimages.map((value,key) => {
					return <option value={value.default} key={key}>{value.default}</option>
				})
			}
			</select>
			<button onClick={(event)=>this.sendForm(event)}>Trimite</button><br />
		</form>
		);
	}
}

export default AddUsersForm;