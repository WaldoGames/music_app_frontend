import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

class NewArtist extends Component {

     constructor(props) {
    super(props);
    this.state = {
      artistName: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  async handleSubmit(event) {
    event.preventDefault();
    // Do whatever you want with the names here
    try {
        // Perform POST request
        const response = await fetch('https://localhost:32770/Artist', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ artistName: this.state.artistName}),
        });
        
        if (!response.ok) {
          console.error('Failed to upload new artist');
          
        }
        
      } catch (error) {
        console.error('Error:', error);
      } finally{
        this.setState({ artistName: ''});
      }
    };
    // Reset the input fields
    
  

  render() {
    return (
    <div className='form-group'>
      <Form onSubmit={this.handleSubmit}>
        <Form.Group controlId="artistName">
          <Form.Label>Artist Name</Form.Label>
          <Form.Control
            type="text"
            name="artistName"
            value={this.state.artistName}
            onChange={this.handleChange}
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
}

export default NewArtist;