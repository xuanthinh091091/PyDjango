import React, {Component} from 'react';
import {Button} from 'primereact/button';
import {InputText} from 'primereact/inputtext';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

class NewEmployee extends React.Component {
	constructor() {
        super();
        this.state = {
            value: null
        };
        this.saveHandle = this.saveHandle.bind(this);
        
    }
	
    saveHandle() {
		var name = this.state.value1
		var city = this.state.value2
		fetch('http://localhost:8000/employee/save', {
		method: 'POST',
		headers: {
		'Accept': 'application/json',
		},
		body: JSON.stringify({name,city})
		}).then(res => res.json())
			.then(data => console.log(data)).then(this.props.change()).then(console.log("appp updated"));
    }
	
    render() {
        return (
            <div>
                <div className="content-section introduction">
                    <div className="feature-intro">
                        <h4> ------------- New Employee ----------------</h4>
                    </div>
					
                </div>
                <div >
                    <div style={{float:'left',marginLeft:'10px'}} >
                        <p>Name: </p>	
                    </div>
                    <div style={{marginLeft:'70px',paddingTop:'5px'}} >
                        <InputText value={this.state.value1} onChange={(e) => this.setState({value1: e.target.value})} />
                    </div>
                    <br/>
                    <div style={{float:'left',marginLeft:'10px',marginBottom:'10px'}} >
                        <p>city: </p>	
                    </div>
                    <div style={{marginLeft:'70px',marginBottom:'10px',paddingTop:'5px'}}>     
                        <InputText value={this.state.value2} onChange={(e) => this.setState({value2: e.target.value})} />    
                    </div>
                </div>
                <div  style={{marginLeft:'70px',marginBottom:'10px'}} >
                    <Button label="Save" onClick={this.saveHandle}/>
                </div>
                	
            </div>
        )
    }
}

export default NewEmployee;

