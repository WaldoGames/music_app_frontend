import React, { Component, useState, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form';
import { Form, Button } from 'react-bootstrap';
import Select from 'react-select';

import AsyncSelect from 'react-select/async';

export default class NewSong extends Component {
  render() {
    return (
      <NewSongForm className="m-2" />
    )
  }
}

function NewSongForm() {
    const { register, handleSubmit, reset, control, setValue } = useForm();
    const [artists, setArtists] = useState([]);
    const [selectedArtists, setSelectedArtists] = useState([]);

    const handleArtistChange = (selectedOptions) => {
        setSelectedArtists(selectedOptions);
        setValue('artists', selectedOptions.map(option => option.value));
      };
      const loadOptions = async (inputValue, callback) => {
        try {

            if (!inputValue.trim()) {
                callback([]);
                return;
              }
          const response = await fetch(`https://localhost:7237/Artist/search?search=${inputValue}`);
          
          const data = await response.json();
          console.log(data);
          if(data==null){
            return;
          }
          const options = data.map(artist => ({
            value: artist.id,
            label: artist.name
          }));
          callback(options);
        } catch (error) {
          console.error('Error loading options:', error);
          callback([]);
        }
      };

    const onSubmit = async (data) => {
      //try {

        /*//alert(data.firstName)
        // Your asynchronous logic here, for example:
        const response = await fetch('https://localhost:7237/Song', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ artistName: data.artistName}),
        });
        const responseData = await response.json();
        console.log('Response from server:', responseData);
        // Reset the form after successful submission
        reset();
      } catch (error) {
        console.error('Error posting data:', error);
      }*/
    };
  
    return (
      <Form className='m-3' onSubmit={handleSubmit(onSubmit)}>
        <Form.Group controlId="songName">
          <Form.Label>Song name</Form.Label>
          <Form.Control type="text" name="songName" {...register("songName", {required: "Required", })} placeholder="Enter the song name" />
        </Form.Group>
  
        <Form.Group controlId="discription">
          <Form.Label>discription</Form.Label>
          <Form.Control type="text" name="discription" {...register("discription", {required: "Required", })} placeholder="discription of the song. this will only be visible by you" />
        </Form.Group>
  
        <Form.Group controlId="releaseDate">
          <Form.Label>Date</Form.Label>
          <Form.Control type="date" name="releaseDate" {...register("releaseDate", {required: "Required", })} />
        </Form.Group>
  
        <Form.Group controlId="artists">
        <Form.Label>Artists</Form.Label>
        <Controller
          name="artists"
          control={control}
          render={({ onChange, onBlur, value }) => (
            <AsyncSelect
              cacheOptions
              defaultOptions
              isMulti
              onChange={handleArtistChange}
              loadOptions={loadOptions}
              value={selectedArtists}
              placeholder="Select artists"
            />
          )}
        />
      </Form.Group>


        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    );
  };