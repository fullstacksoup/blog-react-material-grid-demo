import React, { Component } from 'react';
import './App.css';
import MatDataTable from './Components/MatDataTable';

class App extends Component {  

  render() {
    const spacing = 5;
    return (      
      <div className="App" >              
         <MatDataTable />
      </div>
    );
  }
}

export default App;
