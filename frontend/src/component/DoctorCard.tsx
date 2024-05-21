// DoctorCard.tsx

import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

interface Doctor {
  name: string;
  title: string;
  experience: number;
  // Add other properties if needed
}

interface DoctorCardProps {
  doctor: Doctor;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div">
          {doctor.name}
        </Typography>
        <Typography color="text.secondary">
          Title: {doctor.title}
        </Typography>
        <Typography color="text.secondary">
          Experience: {doctor.experience}
        </Typography>
        {/* Add other properties you want to display */}
      </CardContent>
    </Card>
  );
};

export default DoctorCard;
