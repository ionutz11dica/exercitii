import React from 'react';
import {AddCar} from './AddCar'
 export class CarList extends React.Component {
    constructor(){
        super();
        this.state = {
            cars: []
        };
     this.addCar=(car)=>{
       this.state.cars.push(car) 
         }
    }

    render(){
        return (
            <div>
                <AddCar onAdd={this.addCar}/>
            </div>
        )
    }
}
