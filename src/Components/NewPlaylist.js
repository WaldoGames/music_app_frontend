import React, { useState, useContext } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { ShowContext } from './Context/ShowContext';
import { Controller, useForm } from 'react-hook-form';
import AsyncSelect from 'react-select/async';
import { useNavigate } from 'react-router-dom';

const Api = process.env.REACT_APP_API_PATH;

const PlayListItemsForm = ({ name, description, onNameChange, onDescriptionChange }) => {
  const { selectedShow } = useContext(ShowContext);
  const [items, setItems] = useState([ ]);
  const { user } = useAuth0();
  const [newDescription, setNewDescription] = useState('');
  const { control, setValue } = useForm();
  const [error, setError]= useState(false);

  const navigate = useNavigate();

  const moveItem = (fromIndex, toIndex) => {
    const newItems = [...items];
    const [removedItem] = newItems.splice(fromIndex, 1);
    newItems.splice(toIndex, 0, removedItem);
    setItems(newItems);
  };

  const handleMoveUp = (index) => {
    if (index === 0) return;
    moveItem(index, index - 1);
  };

  const handleMoveDown = (index) => {
    if (index === items.length - 1) return;
    moveItem(index, index + 1);
  };

  const handleAddItem = () => {
    if (newDescription.trim() !== '') {
      setItems([...items, { id: items.length + 1, description: newDescription.trim(), song: null }]);
      setNewDescription('');
    }
  };

  const Submit = async () => {
    const itemsWithOrderIndex = items.map((item, index) => ({
      ...item,
      orderIndex: index + 1,
      playlistItemSongId: item.song ? item.song.value : null // Print song ID instead of name
    }));

    try {
      // Perform POST request
      const response = await fetch(Api+'/Playlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({       
          recordingPlayListName: name,
          playListDescription: description,
          showId: selectedShow.id,
          playlistItems: itemsWithOrderIndex,}),
      });
      
      if (!response.ok) {
        console.error(response);
        
      }
      
    } catch (error) {
      console.error('Error:', error);
    } finally{
      navigate('/playlists')
    }
    console.log({
      recordingPlayListName: name,
      playListDescription: description,
      showId: selectedShow.id,
      playlistItems: itemsWithOrderIndex,
    });
  };

  const loadOptions = async (inputValue) => {
    // Replace this with actual API call
    if(inputValue=="") return;
    const response = await fetch(`${Api}/Song/search/${inputValue}/show/${selectedShow.id}`);
    const songs = await response.json();
    return songs.map(song => ({ value: song.id, label: song.name }));
  };

  const handleSongChange = (selectedSong, index) => {
    const newItems = [...items];
    newItems[index].song = selectedSong;
    setItems(newItems);
  };

  const styles = {
    container: { maxWidth: '500px', margin: 'auto' },
    input: { width: '100%', marginBottom: '10px', boxSizing: 'border-box' },
    textarea: { width: '100%', height: '100px', marginBottom: '10px', boxSizing: 'border-box' },
    itemContainer: { marginBottom: '10px', display: 'flex', alignItems: 'center' },
    itemInput: { flex: 1, marginRight: '10px' },
    itemSelect: { flex: 1, marginRight: '10px' },
    addItemContainer: { display: 'flex', marginBottom: '10px' },
    button: { marginRight: '10px' }
  };

  return (
    <div style={styles.container}>
      <h2>Reorderable Form</h2>
      <div style={{ marginBottom: '10px' }}>
        <input
          type="text"
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          placeholder="Name"
          style={styles.input}
        />
        <textarea
          value={description}
          onChange={(e) => onDescriptionChange(e.target.value)}
          placeholder="Description"
          style={styles.textarea}
        />
      </div>
      {items.map((item, index) => (
        <div key={item.id} style={styles.itemContainer}>
          <input
            type="text"
            value={item.description}
            onChange={(e) => {
              const newDescription = e.target.value;
              const newItems = [...items];
              newItems[index].description = newDescription;
              setItems(newItems);
            }}
            style={styles.itemInput}
          />
          <Controller
            name={`song-${index}`}
            control={control}
            render={({ value }) => (
              <AsyncSelect
                cacheOptions
                defaultOptions
                loadOptions={loadOptions}
                value={item.song}
                onChange={(selectedSong) => handleSongChange(selectedSong, index)}
                placeholder="Select song"
                styles={{ container: (base) => ({ ...base, flex: 1 }) }}
              />
            )}
          />
          <button onClick={() => handleMoveUp(index)} disabled={index === 0} style={styles.button}>↑</button>
          <button onClick={() => handleMoveDown(index)} disabled={index === items.length - 1} style={styles.button}>↓</button>
        </div>
      ))}
      <div style={styles.addItemContainer}>
        <input
          type="text"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
          placeholder="New Description"
          style={styles.itemInput}
        />
        <button onClick={handleAddItem} style={styles.button}>Add Item</button>
      </div>
      <button onClick={Submit}>Print Data</button>
    </div>
  );
};

const PlaylistForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px' }}>
      <PlayListItemsForm
        name={name}
        description={description}
        onNameChange={setName}
        onDescriptionChange={setDescription}
      />
    </div>
  );
};

export default PlaylistForm;