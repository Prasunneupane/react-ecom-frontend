import React from 'react';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import Header from './Header';
export default function Home() {
  return (
    <>
    <Header/>
    <div  style={{ width: '50%', height: '40%',marginTop:'25px',marginLeft:'60px',border:'1px solid black' }}>
     
    <FullCalendar
     
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      // plugins={[dayGridPlugin]}
      // initialView='dayGridMonth'
      weekends={true}
      // events={events}
      // eventContent={renderEventContent}
      events={[
        { title: 'Event 1', date: '2023-07-01' },
        { title: 'Event 2', date: '2023-07-02' },
        { title: 'Event 3', date: '2023-07-03' },
        // Add more events as needed
      ]}
    />
    </div>
    </>
    
  )
//   function renderEventContent(eventInfo) {
//     return (
//       <>
//         <b>{eventInfo.timeText}</b>
//         <i>{eventInfo.event.title}</i>
//       </>
//     )
// }
}


