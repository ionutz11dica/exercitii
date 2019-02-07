import React, { Component } from 'react'
import RobotStore from '../stores/RobotStore'
import Robot from './Robot'

class RobotList extends Component {
	constructor(){
		super()
		this.state = {
			robots : [],
			nameFilter : '',
			typeFilter : ''
		}
		this.handleChange = (evt) => {
			this.setState({
				[evt.target.name] : evt.target.value
			})
		}
	}
	componentDidMount(){
		this.store = new RobotStore()
		this.setState({
			robots : this.store.getRobots()
		})
		this.store.emitter.addListener('UPDATE', () => {
			this.setState({
				robots : this.store.getRobots()
			})			
		})
	}
	render() {
		// a robot component should show a robot and allow deletion of a robot
		 let filtrare = this.state.robots.filter((rob) => rob.name.indexOf(this.state.nameFilter) !== -1).filter((rob) => rob.type.indexOf(this.state.typeFilter) !== -1)
		
		return (
			<div>
				 <div>
					<input type="text" value={this.state.filter} onChange={this.handleChange} name="nameFilter" id="nameFilter" />
					<input type="text" value={this.state.filter} onChange={this.handleChange} name="typeFilter" id="typeFilter" />
				 </div>
				{
					filtrare.map((e, i) => 
						<Robot item={e} key={i} />
					)
				}
			</div>
		)
	}
}

export default RobotList
