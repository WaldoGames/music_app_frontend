import React, { useState } from 'react';

const ReorderableForm = ({ name, description, onNameChange, onDescriptionChange }) => {
  const [items, setItems] = useState([
    { id: 1, description: 'Description 1', song: null },
    { id: 2, description: 'Description 2', song: null },
    { id: 3, description: 'Description 3', song: null },
    { id: 4, description: 'Description 4', song: null }
  ]);
  const [newDescription, setNewDescription] = useState('');
  const [selectedSong, setSelectedSong] = useState('');

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
      setItems([...items, { id: items.length + 1, description: newDescription.trim(), song: selectedSong }]);
      setNewDescription('');
      setSelectedSong('');
    }
  };

  const handlePrintData = () => {
    console.log({
      name,
      description,
      items
    });
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto' }}>
      <h2>Reorderable Form</h2>
      <div style={{ marginBottom: '10px' }}>
        <input
          type="text"
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          placeholder="Name"
          style={{ width: '100%', marginBottom: '10px' }}
        />
        <textarea
          value={description}
          onChange={(e) => onDescriptionChange(e.target.value)}
          placeholder="Description"
          style={{ width: '100%', height: '100px' }}
        />
      </div>
      {items.map((item, index) => (
        <div key={item.id} style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
          <input
            type="text"
            value={item.description}
            onChange={(e) => {
              const newDescription = e.target.value;
              const newItems = [...items];
              newItems[index].description = newDescription;
              setItems(newItems);
            }}
            style={{ flex: 1, marginRight: '10px' }}
          />
          <select
            value={item.song || ''}
            onChange={(e) => {
              const selectedSong = e.target.value === 'null' ? null : e.target.value;
              const newItems = [...items];
              newItems[index].song = selectedSong;
              setItems(newItems);
            }}
            style={{ marginRight: '10px' }}
          >
            <option value="null">Select Song</option>
            <option value="song1">Song 1</option>
            <option value="song2">Song 2</option>
            <option value="song3">Song 3</option>
            {/* Add more songs here */}
          </select>
          <button onClick={() => handleMoveUp(index)} disabled={index === 0}>↑</button>
          <button onClick={() => handleMoveDown(index)} disabled={index === items.length - 1}>↓</button>
        </div>
      ))}
      <div style={{ display: 'flex', marginBottom: '10px' }}>
        <input
          type="text"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
          placeholder="New Description"
          style={{ flex: 1, marginRight: '10px' }}
        />
        <select
          value={selectedSong}
          onChange={(e) => setSelectedSong(e.target.value)}
          style={{ marginRight: '10px' }}
        >
          <option value="null">Select Song</option>
          <option value="song1">Song 1</option>
          <option value="song2">Song 2</option>
          <option value="song3">Song 3</option>
          {/* Add more songs here */}
        </select>
        <button onClick={handleAddItem}>Add Item</button>
      </div>
      <button onClick={handlePrintData}>Print Data</button>
    </div>
  );
};

const PlaylistForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px' }}>
      <ReorderableForm
        name={name}
        description={description}
        onNameChange={setName}
        onDescriptionChange={setDescription}
      />
    </div>
  );
};

export default PlaylistForm;
