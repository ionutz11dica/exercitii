import React, { Component } from 'react'
import RobotStore from '../stores/RobotStore'
import Robot from './Robot'
import RobotDetails from './RobotDetails'

class RobotList extends Component {
	constructor(){
		super()
		this.state = {
			robots : [],
			selected : null
		}
		this.selectRobot = (id) => {
			this.store.selectRobot(id)
		}
		this.cancelSelection = () => {
			this.setState({
				selected : null
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
				robots : this.store.getRobots(),
				selected : this.store.getSelected()
			})			
		})
	}
  render() {
  	// a robot component should show a robot and allow deletion of a robot
  	if (this.state.selected){
  		return (
  			<RobotDetails item={this.state.selected} onCancel={this.cancelSelection} />
  		)
  	}
  	else{
	    return (
	      <div>
	      	 
	      	{
	      		this.state.robots.map((e, i) => 
	      			<Robot item={e} key={i} onSelect={this.selectRobot} />
	      		)
	      	}
	      </div>
	    )  		
  	}
  }
}

export default RobotList
