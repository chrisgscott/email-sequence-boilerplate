import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import axios from 'axios';

function Dashboard() {
  const [sequences, setSequences] = useState([]);

  useEffect(() => {
    fetchSequences();
  }, []);

  const fetchSequences = async () => {
    try {
      const response = await axios.get('/api/sequences', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setSequences(response.data);
    } catch (error) {
      console.error('Error fetching sequences:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/sequences/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      fetchSequences(); // Refresh the list after deletion
    } catch (error) {
      console.error('Error deleting sequence:', error);
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" gutterBottom>
        Dashboard
      </Typography>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        component={RouterLink}
        to="/create-sequence"
        sx={{ mb: 3 }}
      >
        Create New Sequence
      </Button>
      <List>
        {sequences.map((sequence) => (
          <ListItem key={sequence._id}>
            <ListItemText
              primary={sequence.name}
              secondary={`Emails: ${sequence.emails.length}`}
            />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="edit" component={RouterLink} to={`/edit-sequence/${sequence._id}`}>
                <EditIcon />
              </IconButton>
              <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(sequence._id)}>
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

export default Dashboard;