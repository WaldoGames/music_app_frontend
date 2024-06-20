import React, { useState, useContext } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { ShowContext } from './Context/ShowContext';
import { Controller, useForm, useFieldArray  } from 'react-hook-form';
import AsyncSelect from 'react-select/async';
import { useNavigate } from 'react-router-dom';

const Api = process.env.REACT_APP_API_PATH;

const PlayListItemsForm = ({ name, description, onNameChange, onDescriptionChange }) => {
  const { selectedShow } = useContext(ShowContext);
  const [items, setItems] = useState([ ]);
  const [itemsError, SetItemsError] = useState('');
  const { user } = useAuth0();
  const [newDescription, setNewDescription] = useState('');
  const [error, setError]= useState(false);

  const { control, handleSubmit, register, setValue, getValues, formState: { errors } } = useForm({
    defaultValues: {
      name: '',
      description: '',
      items: [],
      newDescription: ''
    }
  });

  const { fields, append, move } = useFieldArray({
    control,
    name: 'items'
  });

  const navigate = useNavigate();

  const moveItem = (fromIndex, toIndex) => {
    move(fromIndex, toIndex);
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
    const newDescription = getValues('newDescription');
    if (newDescription) {
      append({ description: newDescription, song: null });
      setValue('newDescription', '');
    }
  };

  const onSubmit = async (data) => {
    if(data.items.length<=0){
      SetItemsError("atleast one item is needed")
      return
    }else{
      SetItemsError("")
    }
    const itemsWithOrderIndex = data.items.map((item, index) => ({
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
          recordingPlayListName: data.name,
          playListDescription: data.description,
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
    <form onSubmit={handleSubmit(onSubmit)} style={styles.container}>
      <h2>Reorderable Form</h2>
      <div style={{ marginBottom: '10px' }}>
        <input
          data-cy="pl-name"
          type="text"
          {...register('name', { required: "Required" })}
          placeholder="Name"
          style={styles.input}          
        />
        {errors.name && <span data-cy={"playlist-required-name"} className='text-danger'>{errors.name.message}</span>}
        <textarea
          data-cy="pl-description"
          {...register('description', { required: "Required" })}
          placeholder="Description"
          style={styles.textarea}
        />
        {errors.description && <span data-cy={"playlist-required-description"} className='text-danger'>{errors.description.message}</span>}
      </div>
      {fields.map((item, index) => (
        <div data-cy={'playItem-' + index} key={item.id} style={styles.itemContainer}>
          <input
            data-cy={'playItem-text-' + index}
            type="text"
            {...register(`items.${index}.description`)}
            style={styles.itemInput}
          />
          <Controller
            data-cy={'pl-item-select-' + index}
            name={`items.${index}.song`}
            control={control}
            render={({ field }) => (
              <AsyncSelect
                cacheOptions
                defaultOptions
                loadOptions={loadOptions}
                {...field}
                placeholder="Select song"
                styles={{ container: (base) => ({ ...base, flex: 1 }) }}
              />
            )}
          />
          <button
            data-cy={'playItem-up-' + index}
            onClick={() => handleMoveUp(index)}
            disabled={index === 0}
            type="button"
            style={styles.button}
          >
            ↑
          </button>
          <button
            data-cy={'playItem-down-' + index}
            onClick={() => handleMoveDown(index)}
            disabled={index === fields.length - 1}
            type="button"
            style={styles.button}
          >
            ↓
          </button>
        </div>
      ))}
      <div style={styles.addItemContainer}>
        <input
          data-cy="pl-new-item-description"
          type="text"
          {...register('newDescription')}
          placeholder="New Description"
          style={styles.itemInput}
        />
        <button data-cy="pl-new-item-button" onClick={handleAddItem} type="button" style={styles.button}>
          Add Item
        </button>
        
      </div>  
      {(itemsError!='') && <><span data-cy={"playlist-required-items"} className='text-danger'>{itemsError}</span><br></br> </>}
      <button data-cy="pl-create" type="submit" style={styles.button}>
        Create new playlist
      </button>
    </form>
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