import React, { Component, useState, useEffect, useContext} from 'react'
import { useForm, Controller } from 'react-hook-form';
import { Form, Button } from 'react-bootstrap';
import Select from 'react-select';
import { ShowContext } from './Context/ShowContext';
import { useNavigate } from 'react-router-dom';
import AsyncSelect from 'react-select/async';
import NewArtist from './NewArtist';



function NewSong() {
    const { register, handleSubmit, reset, control, setValue, formState: { errors }} = useForm();
    const [artists, setArtists] = useState([]);
    const [selectedArtists, setSelectedArtists] = useState([]);
    const { selectedShow } = useContext(ShowContext);
    const Api = process.env.REACT_APP_API_PATH
    const [error, setError]= useState(false);

    
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
          const response = await fetch(Api+`/Artist/search?search=${inputValue}`);
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
      try {
        const response = await fetch(Api+'/Song', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name: data.songName, user_description: data.description, creatorIds: data.artists, release_date: data.releaseDate, showId: selectedShow.id}),
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
          <Form.Control 
            type="text" 
            name="songName" 
            {...register("songName", { required: "Required" })} 
            placeholder="Enter the song name" 
          />
          {errors.songName && <span data-cy={"song-required-name"} className='text-danger mx-2'>{errors.songName.message}</span>}
        </Form.Group>
    
        <Form.Group controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control 
            type="text" 
            name="description" 
            {...register("description", { required: "Required" })} 
            placeholder="Description of the song. This will only be visible by you" 
          />
          {errors.description && <span data-cy={"song-required-description"} className='text-danger mx-2'>{errors.description.message}</span>}
        </Form.Group>
    
        <Form.Group controlId="releaseDate">
          <Form.Label>Date</Form.Label>
          <Form.Control 
            type="date" 
            name="releaseDate" 
            {...register("releaseDate", { required: "Required" })} 
          />
          {errors.releaseDate && <span span data-cy={"song-required-date"} className='text-danger mx-2'>{errors.releaseDate.message}</span>}
        </Form.Group>
    
        <Form.Group controlId="artists">
          <Form.Label>Artists</Form.Label>
          <Controller
            name="artists"
            control={control}
            rules={{ validate: value => value && value.length > 0 || 'At least one artist must be selected' }}
            render={({ field, onChange, onBlur, value  }) => (
              <AsyncSelect
                {...field}
                cacheOptions
                defaultOptions
                isMulti
                loadOptions={loadOptions}
                placeholder="Select artists"
                value={selectedArtists}
                onChange={(selected) => {
                  field.onChange(selected);
                  handleArtistChange(selected);
                }}
              />
            )}
          />
          {errors.artists && <span span data-cy={"song-required-artists"} className='text-danger mx-2'>{errors.artists.message}</span>}
        </Form.Group>
    
        <Button data-cy="postNewSong" variant="primary" type="submit" className='mt-2'>
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