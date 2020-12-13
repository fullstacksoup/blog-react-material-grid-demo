import React, { Component } from "react";
import axios from 'axios'; // npm instal axios
import { forwardRef } from 'react';
import MaterialTable from "material-table";
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Search from '@material-ui/icons/Search';
import DetailTable from './DetailTable';

const tableIcons = {
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
};

export default class MatDataTable extends Component {
  constructor(props) {
    super(props);
    this.state = {person: []};   
  }
    
  componentDidMount(prevProps) {    
    const maxResults = 20;    
    const url = `https://randomuser.me/api/?results=${maxResults}`;
    axios.get(url)
    .then(results => {
      console.log(results);
      console.log(results.data.results);
      this.setState({ person: results.data.results });

      var newArr = results.data.results.map(function(val) {          
        return {
          id: val.id.value,
          gender: val.gender,
          login: val.login.username,
          email: val.email,          
          cell: val.cell,          
          image: val.picture.thumbnail,          
          name: val.name.first + ' ' + val.name.last,
        };
      });
      console.log(results.data.results); 
      this.setState({
        tableArray: newArr  //set state of the weather5days
      },()=> {
         console.log(this.state.tableArray); 
         console.log('this.tableArray ',this.state.tableArray);
      });      
    });
  }

  render() {
    return (      
      <div style={{ maxWidth: "50%", marginLeft: "300px", marginTop: "100px" }}>
        <MaterialTable
          icons={tableIcons}
          options={{
            grouping: true
          }}
          detailPanel={rowData => {
            return (              
              <DetailTable />
            )
          }}
          columns={[
            {
              title: 'Image',
              field: 'image',
              render: rowData => (
                <img
                  style={{ height: 36, borderRadius: '50%' }}
                  src={rowData.image}
                />
              ),
            },
            { title: "Name", field: "name", type: "numeric", align: 'left' },            
            { title: "Gender", field: "gender"},            
            { title: "Email", field: "email" },
            { title: "Cell Phone", field: "cell", type: "numeric" }                                     
          ]}
          data={this.state.tableArray}      
        
          title="Demo Title"
        />
      </div>
    );
  }
}
 

