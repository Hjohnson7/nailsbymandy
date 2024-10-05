import React from 'react';
import { Container, Typography, Button, Grid } from '@mui/material';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <Container maxWidth="lg" style={{ marginTop: '50px', textAlign: 'center' }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
            <Typography variant="h1" gutterBottom>
              404
            </Typography>
            <Typography variant="h5" gutterBottom>
              Page Not Found
            </Typography>
            <Typography variant="body1" gutterBottom>
              The page you are looking for does not exist.
            </Typography>
            <Button variant="contained" color="primary" component={Link} to="/">
              Go to Home
            </Button>
          </div>
        </Grid>
        <Grid item xs={12} md={6}>
          <img
            src="https://via.placeholder.com/400"
            alt="404 Error"
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default NotFoundPage;