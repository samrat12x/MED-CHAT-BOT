import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface DoctorData {
  name: string;
  title: string;
  phone: number;
  profile_pic: string;
  experience: number;
  stars: number;
  patients_handled: number;
  location: string;
  gender: string;
}

const DoctorCard: React.FC<DoctorData> = ({
  name,
  title,
  phone,
  profile_pic,
  experience,
  stars,
  patients_handled,
  location,
  gender,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/calendar');
  };

  return (
    <Card onClick={handleClick} style={{ cursor: 'pointer' }}>
      <CardContent>
        <img src={profile_pic} alt="Profile" style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
        <Typography variant="h5" component="h2">
          {name}
        </Typography>
        <Typography color="textSecondary" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2" component="p">
          Phone: {phone}
        </Typography>
        <Typography variant="body2" component="p">
          Experience: {experience} years
        </Typography>
        <Typography variant="body2" component="p">
          Stars: {stars}
        </Typography>
        <Typography variant="body2" component="p">
          Patients Handled: {patients_handled}
        </Typography>
        <Typography variant="body2" component="p">
          Location: {location}
        </Typography>
        <Typography variant="body2" component="p">
          Gender: {gender}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default DoctorCard;
