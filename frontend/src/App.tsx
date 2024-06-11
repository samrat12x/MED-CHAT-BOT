// src/App.tsx

import Calendar from './component/Calendar';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import PermanentDrawerLeft from './component/PermanentDrawerLeft';
import DoctorCard from './component/DoctorCard'; 
import BookingSuccess from './component/BookingSuccess';

const App: React.FC = () => {
  
    return (
    <>
<meta name="viewport" content="initial-scale=1, width=device-width" />
<Router>
        <Routes>
          <Route path="/" element={<Navigate to="/drawer" replace />} />
          <Route path="/drawer" element={<PermanentDrawerLeft />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/bookingsuccess" element={<BookingSuccess />} />
        </Routes>
      </Router></>

    );
};

export default App;
