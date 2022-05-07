
import React, { useCallback, useRef, useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

import Addcustomer from './Addcustomer';
import Editcustomer from './Editcustomer';
import Addtraining from './Addtraining';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

function Customerlist() {
    const [customers, setCustomers] = useState([]);
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState('');
    const gridRef = useRef();

    useEffect(() => {
        fetchCustomers();
    }, []);

const fetchCustomers = () => {
    fetch('https://customerrest.herokuapp.com/api/customers')
    .then(response => response.json())
    .then(data => setCustomers(data.content))
    .catch(err => console.error(err))
}

const deleteCustomer = (link) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
        fetch(link.data.links[0].href, {method: 'DELETE'})
        .then(response => {
            if (!response.ok) {
                alert('Something went wrong while deleting a customer')
            } else {
                setMsg('Customer was deleted successfully!');
                setOpen(true);
                fetchCustomers();
            }
        })
        .catch(err => console.error(err))
    }
}

const addCustomer = (newCustomer) => {
    fetch('https://customerrest.herokuapp.com/api/customers', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(newCustomer)
    })
    .then(response => {
      if (!response.ok) {
        alert('Something went wrong while adding a customer')
      } else {
        setMsg('Customer was added successfully!');
        setOpen(true);
        fetchCustomers();
      }
    })
    .catch(err => console.error(err))
}

const updateCustomer = (updatedCustomer, link) => {
  fetch(link, {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(updatedCustomer)
  })
  .then(response => {
    if (!response.ok) {
      alert('Something went wrong while editing a customer')
    } else {
      setMsg('Customer details was edited successfully!');
      setOpen(true);
      fetchCustomers();
    }
  })
  .catch(err => console.error(err))
}

const addTraining = (training) => {
  fetch('https://customerrest.herokuapp.com/api/trainings', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(training)
  })
  .then(response => {
    if (!response.ok) {
      alert('Something went wrong while adding a training')
    } else {
      setMsg('Training was added successfully!');
      setOpen(true);
      fetchCustomers();
    }
  })
  .catch(err => console.error(err))
}



const [columns] = useState([
  {colId: 1, headerName: 'First Name', field: 'firstname', sortable: true, filter: true, width: 130}, 
  {colId: 2, headerName: 'Last Name', field: 'lastname', sortable: true, filter: true, width: 130},
  {colId: 3, headerName: 'Address', field: 'streetaddress', sortable: true, filter: true, width: 160},
  {colId: 4, headerName: 'Postcode', field: 'postcode', sortable: true, filter: true, width: 120},
  {colId: 5, headerName: 'City', field: 'city', sortable: true, filter: true, width: 140},
  {colId: 6, headerName: 'Email', field: 'email', sortable: true, filter: true, width: 160},
  {colId: 7, headerName: 'Phone', field: 'phone', sortable: true, filter: true, width: 130},

    {
      headerName: '',
      width: 50,
      field: 'links.0.href',
      cellRenderer: params => <Editcustomer params={params} updateCustomer={updateCustomer}/>
    },

    {
      headerName: '',
      width: 50,
      field: 'links.0.href',
      cellRenderer: params =>
      <IconButton color = 'error' onClick={() => deleteCustomer(params)}>
        <DeleteIcon />
      </IconButton>
    },

    {
    headerName: '',
    width: 180,
    field: 'data.content',
    cellRenderer: params => <Addtraining addTraining={addTraining} params={params}/>
   }

    

])

const onBtnExport = useCallback(() => {
  gridRef.current.api.exportDataAsCsv({columnKeys: [1,2, 3, 4, 5, 6, 7]});
}, []);

    return (
    <>
    <Addcustomer addCustomer={addCustomer}/>
    <div className="ag-theme-material" style={{height: 900, width: 'auto'}}>
      <br />
    <button style={{ padding: 7, float: 'right'}}
    onClick={onBtnExport}>Download CSV export file</button>

    <AgGridReact
        columnDefs= {columns}
        rowData= {customers}
        pagination={true}
        paginationPageSize={10}
        suppressCellFocus={true}
        ref={gridRef}
        suppressExcelExport={true}
    />
    
    </div>
    <Snackbar
    open={open}
    autoHideDuration={4000}
    onClose={() => setOpen(false)}>
    <Alert severity="success" sx={{ width: '100%' }}>{msg}</Alert>
    </Snackbar>
    </>
    
    );
    }
    
export default Customerlist;