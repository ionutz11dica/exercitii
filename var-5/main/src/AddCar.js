import React from 'react';

// # Having the following application created with `create-react-app` complete the following tasks:
// - `AddCar` component should be rendered inside `CarList` component;
// - `AddCar` component should contain 3 inputs with `id` and `name`: `make`, `model`, `price`;
// - `AddCar` component should contain an input of type `button` with the value `add car`, used to trigger `addCar` method;
// - `AddCar` component inside `CarList` should contain a `props` called `onAdd`;
// - When pressing `add car` a new item should be displayed in `CarList` component;

export class AddCar extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            make: '',
            model: '',
            price: 0
        }
        
    }
    
     handleChange = (evt) =>{
             this.setState({
            [evt.target.name] : evt.target.value
        })
     }
    
   

    addCar = () => {
        let car = {
            make: this.state.make,
            model: this.state.model,
            price: this.state.price
        };
        this.props.onAdd(car);
    }

    render(){
        return (
             <React.Fragment>
            <div>
                <input type="text" id="make" name="make" onChange={this.handleChange}/>
                <input type="text" id="model" name="model" onChange={this.handleChange}/>
                <input type="text" id="price" name="price" onChange={this.handleChange}/>
                <input type="button" value="add car" onClick={this.addCar}/>
            </div>
             </React.Fragment>
        )
    }
}