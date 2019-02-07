import React, { Component } from 'react'
import RobotStore from '../stores/RobotStore'
import Robot from './Robot'

// TODO: adăugați posibilitatea de a filtra roboții după name și type
// filtrarea se face pe baza a 2 text input-uri și se produce la fiecare tastă apăsată

// TODO: add the possiblity to filter robots according to name and type
// filtering is done via 2 text inputs and happens whenever a key is pressed

class RobotList extends Component {
	constructor(){
		super()
		this.state = {
			robots : [],
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
		let robots = this.state.robots.filter((rob) => rob.name.indexOf(this.state.nameFilter) !== -1).filter((rob) => rob.type.indexOf(this.state.typeFilter) !== -1)
		return (
			<div>
				 <div>
					<input type="text" value={this.state.filter} onChange={this.handleChange} name="nameFilter" id="nameFilter" />
					<input type="text" value={this.state.filter} onChange={this.handleChange} name="typeFilter" id="typeFilter" />
				 </div>
				{
					robots.map((e, i) => 
						<Robot item={e} key={i} />
					)
				}
			</div>
		)
	}
}

export default RobotList
