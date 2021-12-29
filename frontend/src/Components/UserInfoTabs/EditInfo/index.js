import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function EditInfo() {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        '& > :not(style)': { m: 1 },
      }}
    >
      <TextField
        helperText="Please enter your first name"
        id="demo-helper-text-misaligned"
        label="First Name"
      />
        <TextField
        helperText="Please enter your last name"
        id="demo-helper-text-misaligned"
        label="Last Name"
      />
        <TextField
        helperText="Please enter your email"
        id="demo-helper-text-misaligned"
        label="Email"
      />

    </Box>
  );
}