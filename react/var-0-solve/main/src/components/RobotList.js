import React, { Component } from 'react'
import RobotStore from '../stores/RobotStore'
import Robot from './Robot'

class RobotList extends Component {
	constructor(){
		super()
		this.state = {
			robots : []
		}
		this.deleteRobot = (id) => {
			this.store.deleteRobot(id)
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
    return (
      <div>
      	 
      	{
      		this.state.robots.map((e, i) => 
      			<Robot item={e} key={i} onDelete={this.deleteRobot} />
      		)
      	}
      </div>
    )
  }
}

export default RobotList
