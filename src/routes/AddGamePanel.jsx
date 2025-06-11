import React from 'react';
import { Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material'; // Assuming Material UI for styling

const AddGamePanel = ({ open, onClose }) => {
  const [gameName, setGameName] = useState(''); // State for game name

  const handleAddGame = () => {
    // Implement logic to add the game to the database or perform other actions
    console.log('Adding game:', gameName); // Example logging
    onClose(); // Close the panel after adding the game
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Pre-Made Game</DialogTitle>
      <DialogContent>
        <TextField
          label="Game Name"
          value={gameName}
          onChange={(event) => setGameName(event.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" color="primary" onClick={handleAddGame}>
          Add Game
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddGamePanel;