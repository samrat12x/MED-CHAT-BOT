import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Popup from './PopUp';
import './schedule-component.css';
import {
  ScheduleComponent, ViewsDirective, ViewDirective, Week, Agenda, Inject
} from '@syncfusion/ej2-react-schedule';

export default function Calendar() {
  const [data, setData] = useState<any[]>([]);
  const [showPopup, setShowPopup] = useState<boolean>(false);

  useEffect(() => {
    // Simulated fetch or data initialization
    const fetchedData = [
      {
        Id: 1,
        Subject: 'SLOT FULL',
        Location: 'Office',
        StartTime: new Date(2022, 0, 1, 9, 30),
        EndTime: new Date(2022, 0, 1, 10, 30), // Corrected the end year to match start year
        RecurrenceRule: 'FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR;INTERVAL=1',
        IsBlock: true
      },
      {
        Id: 2,
        Subject: 'SLOT FULL',
        StartTime: new Date(2022, 0, 1, 11, 0),
        EndTime: new Date(2022, 0, 1, 12, 0),
        RecurrenceRule: 'FREQ=WEEKLY;BYDAY=MO,TH,FR;INTERVAL=1',
        IsBlock: true
      },
      {
        Id: 2,
        Subject: 'SLOT FULL',
        StartTime: new Date(2022, 0, 1, 13, 0),
        EndTime: new Date(2022, 0, 1, 14, 0),
        RecurrenceRule: 'FREQ=WEEKLY;BYDAY=TU,TH,FR,SU;INTERVAL=1',
        IsBlock: true
      },
      {
        Id: 2,
        Subject: 'SLOT FULL',
        StartTime: new Date(2022, 0, 1, 15, 0),
        EndTime: new Date(2022, 0, 1, 16, 0),
        RecurrenceRule: 'FREQ=WEEKLY;BYDAY=MO,TH,FR;INTERVAL=1',
        IsBlock: true
      }
    ];

    setData(fetchedData);
  }, []); // Empty dependency array means this effect runs only once, when component mounts

  const handleOpenPopup = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const navigate = useNavigate();

  const handleConfirm = () => {
   
 navigate('/bookingsuccess');
    setShowPopup(false);
  };

  const onCellClick = () => {
    handleOpenPopup();
  };

  const cellTemplate = (props: any) => {
    return <div>AVAILABLE</div>;
  };

  return (
    <div className='calendar'>
      <ScheduleComponent
        cssClass='block-events'
        height='600px'
        cellClick={onCellClick}
        cellTemplate={cellTemplate}
        startHour={"09:00"}
        endHour={"18:00"}
        eventSettings={{ dataSource: data, isBlock: true }}
        timeScale={{ enable: true, interval: 60, slotCount: 2 }}>
        <ViewsDirective>
          <ViewDirective option='Day' />
          <ViewDirective option='Week' />
          <ViewDirective option='WorkWeek' />
          <ViewDirective option='Month' />
          <ViewDirective option='Agenda' />
        </ViewsDirective>
        <Inject services={[Week, Agenda]} />
      </ScheduleComponent>
      <Popup show={showPopup} onClose={handleClosePopup} onConfirm={handleConfirm} />
      <h1>DOCTOR'S  SCHEDULE</h1>
    </div>
  );
}
