import React,  { useState, useEffect} from 'react';
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from 'moment';
import "react-big-calendar/lib/css/react-big-calendar.css";



function Tcalendar() {
    const [data, setData] = useState([]);
    const localizer = momentLocalizer(moment)


    const getTrainings = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(response => response.json())
        .then(trainings => {
            return setData(
            trainings.map((training, index) => ({
            id: index,
            title: training.activity + ": " + training.customer.lastname + ", " + training.customer.firstname,
            start: moment(training.date)._d,
            end: moment(training.date).add(training.duration, 'minutes')._d  

            }))
            )
          
              })
              .catch(function (error) {
                console.log(error);
              });
          }

    useEffect(() => {
        getTrainings();
    }, [])

    return (
        <div  style = {{width: '75%', margin: 'auto'}}>
        <Calendar
        events={data}
        startAccessor="start"
        endAccessor="end"
        localizer={localizer}
        defaultDate={new Date()}
        defaultView="month"
        style={{height: "800px"}}/>
        </div>
    )
}

export default Tcalendar;
