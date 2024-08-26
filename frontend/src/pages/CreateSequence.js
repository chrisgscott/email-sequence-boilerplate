import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box } from '@mui/material';
import axios from 'axios';

function CreateSequence() {
  const [topic, setTopic] = useState('');
  const [inputs, setInputs] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const response = await axios.post('/api/email-sequences/create', {
        topic,
        inputs: JSON.parse(inputs)
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      setSuccess(true);
      console.log('Email sequence created:', response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>Create Email Sequence</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Inputs (JSON format)"
          value={inputs}
          onChange={(e) => setInputs(e.target.value)}
          margin="normal"
          multiline
          rows={4}
          required
        />
        <Box mt={2}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
          >
            {loading ? 'Creating...' : 'Create Sequence'}
          </Button>
        </Box>
      </form>
      {error && (
        <Typography color="error" mt={2}>
          {error}
        </Typography>
      )}
      {success && (
        <Typography color="success" mt={2}>
          Email sequence created successfully!
        </Typography>
      )}
    </Container>
  );
}

export default CreateSequence;