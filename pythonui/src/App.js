import React, { Component } from 'react';
import './App.css';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import NewEmployee from './NewEmployee/NewEmployee';
import {Button} from 'primereact/button';

const divStyle = {
  margin: '40px',
  border: '5px solid pink',
  width: '600px'
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        hits: [],
    };
    this.newSave = this.newSave.bind(this);
    this.deleteHandle = this.deleteHandle.bind(this);
  }

  newSave() {
    this.componentDidMount();
  }

  deleteHandle() {
    var id = this.state.selected ? this.state.selected.id: 0
    if(id ==0){
      alert("please choose 1 employee to delete")
    } else {
      fetch('http://localhost:8000/employee/delete/' + id, {
        method: 'DELETE', 
        headers: {
      'Accept': 'application/json',
      }
      }) 
      .then(this.componentDidMount())
      .catch(error =>console.log(error));
  
    }

  }


  componentDidMount() {
		fetch('http://localhost:8000/employee')
			.then(response =>  response.json())
			.then(data => this.setState({hits:data}));
  }
  	
  render() {
    var eCount = this.state.hits ? this.state.hits.length: 0
    var header = <div className="p-clearfix" style={{'lineHeight':'1.87em'}}>List of Employees </div>;
    var footer = <div style={{height:'40px'}}> 
                <div style={{float:'left',marginLeft:'10px',paddingTop:'5px'}} >
                <Button label="Delete" onClick={this.deleteHandle}/></div> 
                <div  style={{float:'right',marginRight:'50px',paddingTop:'10px'}}> There are {eCount} Employees </div>
                </div>; 
    return (        
      <div style={divStyle} className="content-section implementation">
          <DataTable selection={this.state.selected} onSelectionChange={e => this.setState({selected: e.value})}
            value={this.state.hits}  header={header} footer={footer}  >
              <Column selectionMode="single" style={{width: '60px'}}/>
              <Column field="id" header="Id"  style={{width: '60px'}} />
              <Column field="name" header="Name"  />
              <Column field="city" header="City" />
          </DataTable>
  
          <NewEmployee change={this.newSave}/>
      </div>
    );
  }
}

export default App;
