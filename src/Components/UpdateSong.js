import React, { useState, useEffect, useContext } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Form, Button } from 'react-bootstrap';
import AsyncSelect from 'react-select/async';
import NewArtist from './NewArtist';
import { ShowContext } from './Context/ShowContext';
import { useNavigate, useParams } from 'react-router-dom';

function UpdateSong() {
  const { register, handleSubmit, control, setValue } = useForm();
  const [artists, setArtists] = useState([]);
  const [selectedArtists, setSelectedArtists] = useState([]);
  const { selectedShow } = useContext(ShowContext);
  const navigate = useNavigate();
  const { id } = useParams();

  const handleArtistChange = (selectedOptions) => {
    setSelectedArtists(selectedOptions);
    setValue('artists', selectedOptions.map((option) => option.value));
  };

  const loadOptions = async (inputValue, callback) => {
    try {
      if (!inputValue.trim()) {
        callback([]);
        return;
      }
      const response = await fetch(
        `https://localhost:32768/Artist/search?search=${inputValue}`
      );
      const data = await response.json();
      const options = data.map((artist) => ({
        key: artist.key,
        value: artist.key,
        label: artist.name,
      }));
      callback(options);
    } catch (error) {
      console.error('Error loading options:', error);
      callback([]);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://localhost:32768/song/${id}/show/${selectedShow.id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch song');
        }
        const data = await response.json();
        // Pre-fill the form with existing song data
        setValue('songName', data.name);
        setValue('discription', data.user_description);
        setValue('releaseDate', data.release_date.substr(0, 10));
        // Set selected artists
        const selectedArtistsMaped = data.artists.map((artist) => ({
          key: artist.id,
          value: artist.id,
          label: artist.name,
        }));
        console.log(data);
        setSelectedArtists(selectedArtistsMaped);
        setValue('artists', selectedArtistsMaped.map((artist) => artist.value));
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchData();
  }, [id, setValue]);

  const onSubmit = async (data) => {
    try {
      // Perform PUT request
      const response = await fetch(`https://localhost:32768/Song`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: id,
          name: data.songName,
          user_description: data.discription,
          creatorIds: selectedArtists.map(artist => artist.key),
          release_date: data.releaseDate,
          showId: selectedShow.id,
        }),
      });
      if (!response.ok) {
        console.error(JSON.stringify({
          id: id,
          name: data.songName,
          user_description: data.discription,
          creatorIds: selectedArtists.map(artist => artist.key),
          release_date: data.releaseDate,
          showId: selectedShow.id,
        }));
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      navigate('/songs');
    }
  };

  return (
    <div className="m-3">
      <Form className="mt-3" onSubmit={handleSubmit(onSubmit)}>
        <Form.Group controlId="songName">
          <Form.Label>Song name</Form.Label>
          <Form.Control
            type="text"
            name="songName"
            {...register('songName', { required: 'Required' })}
            placeholder="Enter the song name"
          />
        </Form.Group>

        <Form.Group controlId="discription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            name="discription"
            {...register('discription', { required: 'Required' })}
            placeholder="Description of the song. This will only be visible by you"
          />
        </Form.Group>

        <Form.Group controlId="releaseDate">
          <Form.Label>Date</Form.Label>
          <Form.Control
            type="date"
            name="releaseDate"
            {...register('releaseDate', { required: 'Required' })}
          />
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

        <Button variant="primary" type="submit" className="mt-2">
          Submit
        </Button>
      </Form>
      <div className="mt-5">
        <p className="text-muted">
          Can't find the artist you're looking for? Add a new one here:
        </p>
        <NewArtist className="m-2" />
      </div>
    </div>
  );
}

export default UpdateSong;