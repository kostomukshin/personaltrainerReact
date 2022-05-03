import React, { useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DateFnsUtils from '@date-io/date-fns'; 




function Addtraining({ params, addTraining }) {

    const [open, setOpen] = useState(false);
    const [date, setDate] = useState(new Date());
    const [training, setTraining] = useState({

        activity: '',
        duration: '',
        date: '',
        fn: '',
        ln: '',
       
    });

    const handleClickOpen = () => {
      setTraining({
        fn: params.data.firstname,
        ln: params.data.lastname,
      })
      setOpen(true)
    };
  
    const handleClose = () => {
      setOpen(false)
    };

    const inputChanged = (event) => {
        setTraining({...training, [event.target.name]: event.target.value})
    }

    const handleSave = () => {
    addTraining(training);
    setOpen(false);
    }

    const changeDate = (date) => {
        setDate(date);
        setTraining({...training, date: date.toISOString()});
    }
  
  
    return(
        <div>
        <Button variant="outlined" onClick={handleClickOpen}>
          Add Training
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>New Training</DialogTitle>
          <DialogContent>
           
          <TextField
            margin="dense"
            name="activity"
            value={training.activity}
            onChange={inputChanged}
            label="Activity"
            fullWidth variant='standard'
          />

          <TextField
            label="Next appointment"
            value={training.date}
            onChange={inputChanged}
            type="datetime-local"
            sx={{ width: 250 }}
            InputLabelProps={{
            shrink: true,
        }}
          />
      
          <TextField
            margin="dense"
            name="duration"
            value={training.duration}
            onChange={inputChanged}
            label="Duration"
            fullWidth variant='standard'
          />

          <TextField
            margin="dense"
            name="fn"
            value={training.fn}
            onChange={inputChanged}
            label="First name"
            fullWidth variant='standard'
          />

          <TextField
            margin="dense"
            name="ln"
            value={training.ln}
            onChange={inputChanged}
            label="Last name"
            fullWidth variant='standard'
          />

          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSave}>Save</Button>
          </DialogActions>
        </Dialog>
      </div>

    )
}

export default Addtraining;