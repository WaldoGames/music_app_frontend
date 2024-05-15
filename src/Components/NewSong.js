import React, { Component, useState, useEffect, useContext} from 'react'
import { useForm, Controller } from 'react-hook-form';
import { Form, Button } from 'react-bootstrap';
import Select from 'react-select';
import { ShowContext } from './Context/ShowContext';
import { useNavigate } from 'react-router-dom';
import AsyncSelect from 'react-select/async';
import NewArtist from './NewArtist';



function NewSong() {
    const { register, handleSubmit, reset, control, setValue } = useForm();
    const [artists, setArtists] = useState([]);
    const [selectedArtists, setSelectedArtists] = useState([]);
    const { selectedShow } = useContext(ShowContext);

    const navigate = useNavigate();

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
          const response = await fetch(`https://localhost:32770/Artist/search?search=${inputValue}`);
          //TODO: check for empty or error
          const data = await response.json();
          if(data==null){
            return;
          }
          const options = data.map(artist => ({
            key: artist.key,
            value: artist.key,
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

      try {
        // Perform POST request
        const response = await fetch('https://localhost:32770/Song', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name: data.songName, user_description: data.discription, creatorIds: data.artists, release_date: data.releaseDate, showId: selectedShow.id}),
        });
        
        if (!response.ok) {
          console.error('Failed to upload new song');
          
        }
        
      } catch (error) {
        console.error('Error:', error);
      } finally{

        navigate('/songs')
      }
    };


  
    return (
      <div className='m-3'>
        <Form className='mt-3' onSubmit={handleSubmit(onSubmit)}>
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


          <Button variant="primary" type="submit" className='mt-2'>
            Submit
          </Button>
        </Form>
      <div  className=" mt-5">
      <p class="text-muted">   
         can't find the artist your looking for? add a new one here:
      </p>
      <NewArtist class="m-2" />
      </div>
    </div>
    );
  };

  export default NewSong;