import React, { useCallback, useRef, useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import moment from 'moment/moment'

import Editcustomer from './Editcustomer';


import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });



function Traininglist() {
    const [trainings, setTrainings] = useState([]);
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState('');
    const gridRef = useRef();

    useEffect(() => {
      fetchTrainings();
    }, []);

const fetchTrainings = () => {
    fetch('https://customerrest.herokuapp.com/gettrainings')
    .then(response => response.json())
    .then(data => setTrainings(data))
    .then(err => console.error(err))
}


const deleteTraining = (link) => {
  if (window.confirm('Are you sure you want to delete this training?')) {
      fetch('https://customerrest.herokuapp.com/api/trainings/' + link.data.id, {method: 'DELETE'})
      .then(response => {
          if (!response.ok) {
              alert('Something went wrong while deleting a training')
          } else {
              setMsg('Training was deleted successfully!');
              setOpen(true);
              fetchTrainings();
              
              
              
          }
      })
      .catch(err => console.error(err))
  }
}


const [columns] = useState([
    {headerName: 'Activity', field: 'activity', sortable: true, filter: true},
    {headerName: 'Duration', field: 'duration', sortable: true, filter: true, width: 130},
    {headerName: 'Date', field: 'date', sortable: true, filter: true,
    cellRenderer: (data) => {
      return moment(data.value).format('dd.MM.yyyy HH:mm')
    }},
    {
    headerName: 'Customer',
      width: 150,
      field: 'data.customer',
      cellRenderer: params => {
        return params.data.customer.firstname + ' ' + params.data.customer.lastname
      }
    },


    {
      headerName: '', 
      field: 'id', 
      width: 100,
     cellRenderer: params => 
     <IconButton color = 'error' onClick={() =>deleteTraining(params)}>
       <DeleteIcon/>
      </IconButton>
    }

])

const onBtnExport = useCallback(() => {
  gridRef.current.api.exportDataAsCsv();
}, []);

return (
    <>
    <button style={{ padding: 7, float: 'right'}}
    onClick={onBtnExport}>Download CSV export file</button>
    <div className="ag-theme-material" style={{height: 900, width: 'auto'}}>
    <AgGridReact
        columnDefs= {columns}
        rowData= {trainings}
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


export default Traininglist;