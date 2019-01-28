import React, { Component } from 'react';
import AppointmentItem from './AppointmentItem'
import List from '@material-ui/core/List';
import AppointmentEditDialog from './AppointmentEditDialog';

class AppointmentDashboard extends Component {
    constructor() {
    	super();
    	this.state = {
			appointmentData: [
				{
					time: "9:00am-10:00am",
					name: "Stephen Jarrett",
					phone: 4235058213,
					available: false
				},
				{
					time: "10:00am-11:00am",
					name: '',
					phone: '',
					available: true
				},
				{
					time: "11:00am-12:00pm",
					name: '',
					phone: '',
					available: true
				},
				{
					time: "12:00pm-1:00pm",
					name: '',
					phone: '',
					available: true
				},
				{
					time: "1:00pm-2:00pm",
					name: '',
					phone: '',
					available: true
				},
				{
					time: "2:00pm-3:00pm",
					name: '',
					phone: '',
					available: true
				},
				{
					time: "3:00pm-4:00pm",
					name: '',
					phone: '',
					available: true
				},
				{
					time: "4:00pm-5:00pm",
					name: '',
					phone: '',
					available: true
				},
			],
			open: false,
			selectedAppointment: ''
    	}
    }

	_openEditModal = (appointmentItem) => {
		this.setState({
			open: true,
			selectedAppointment: appointmentItem
		});
	}

	_closeEditModal = () => {
		this.setState({
			open: false,
		});
	}

	_handleNameChange = (e) => {
		let newSelectedAppointment = {
			...this.state.selectedAppointment,
			name: e.target.value
		}
		this.setState({
			selectedAppointment: newSelectedAppointment
		});
	}

	_handlePhoneChange = (e) => {
		let newSelectedAppointment = {
			...this.state.selectedAppointment,
			phone: e.target.value
		}
		this.setState({
			selectedAppointment: newSelectedAppointment
		});
	}

	_handleSave = () => {
		let updatedAppointment;
		// edit state of availability to conditionally render red background
		if (this.state.selectedAppointment.name !== '' || this.state.selectedAppointment.phone !== '') {
			updatedAppointment = {
				...this.state.selectedAppointment,
				available: false
			};
		} else {
			updatedAppointment = {
				...this.state.selectedAppointment,
				available: true
			};
		}

		// find selectedApt and replace it in main data src
		let newAppointmentDataArray = this.state.appointmentData.map(appointment => {
			if (appointment.time === this.state.selectedAppointment.time) {
				return updatedAppointment;
			} else {
				return appointment;
			}
		});

		this.setState({
			appointmentData: newAppointmentDataArray,
			open: false
		});
	}

	render() {
		let appointmentsArray = this.state.appointmentData.map(appointmentItem => {
			return (
				<div onClick={() => this._openEditModal(appointmentItem)} key={appointmentItem.time}>
					<AppointmentItem 
					time={appointmentItem.time} 
					name={appointmentItem.name} 
					phone={appointmentItem.phone}
					available={appointmentItem.available} 
					/>
				</div>
			)
		});

		return (
			<div className="appointment-dashboard">
				<List component="nav">
					{appointmentsArray}
				</List>

				<AppointmentEditDialog
					open={this.state.open}
					handleClose={this._closeEditModal}
					selectedAppointment={this.state.selectedAppointment}
					handleNameChange={this._handleNameChange}
					handlePhoneChange={this._handlePhoneChange}
					handleSave={this._handleSave}
				>
				</AppointmentEditDialog>
			</div>
		);
	}
}

export default AppointmentDashboard;
