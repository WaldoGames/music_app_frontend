import React, { Component, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const NewArtist = ()=>{
  const [error, setError]= useState(false);
  const [artistName, setArtistName] = useState('');
 
  const handleChange = (event) => {
    setArtistName(event.target.value);
  };

  const handleSubmit=async (event) => {
    
    const Api = process.env.REACT_APP_API_PATH;
    event.preventDefault();
    // Do whatever you want with the names here
    try {
        // Perform POST request
        const response = await fetch(Api+'/Artist', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ artistName: artistName}),
        });
        
        if (!response.ok) {
          console.error('Failed to upload new artist');
          
        }
        
      } catch (error) {
        console.error('Error:', error);
      } finally{
        setArtistName('');
      }
    };
    // Reset the input fields
    
  


    return (
    <div className='form-group'>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="artistName">
          <Form.Label>Artist Name</Form.Label>
          <Form.Control
            type="text"
            name="artistName"
            value={artistName}
            onChange={handleChange}
            placeholder="Enter the artists name"
          />
        </Form.Group>
        <Button variant="primary" className='mt-3' type="submit">
          Submit
        </Button>
      </Form>
    </div>
    );
}

export default NewArtist;