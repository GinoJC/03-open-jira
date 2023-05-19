import React, { ChangeEvent, useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { AddCircleOutline, SaveOutlined } from '@mui/icons-material';
import { useEntriesContext } from 'context/entries';
import { useUIContext } from 'context/ui';

const NewEntry = () => {
  const { addEntry } = useEntriesContext();
  const { isAddingEntry, setIsAddingEntry } = useUIContext();
  const [inputValue, setInputValue] = useState('');
  const [touched, setTouched] = useState(false);

  const onTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const onCloseInput = () => {
    setInputValue('');
    setTouched(false);
    setIsAddingEntry(false);
  };

  const onSave = () => {
    addEntry(inputValue);
    onCloseInput();
  };
  return (
    <Box sx={{ mb: 2, px: 1 }}>
      {isAddingEntry ? (
        <>
          <TextField
            fullWidth
            sx={{ mt: 2, mb: 1 }}
            placeholder="Nueva entrada"
            autoFocus
            multiline
            label="Nueva entrada"
            helperText={inputValue.length === 0 && touched && 'Ingrese un valor'}
            error={inputValue.length === 0 && touched}
            value={inputValue}
            onChange={onTextChange}
            onBlur={() => setTouched(true)}
          />
          <Box display="flex" justifyContent="space-between">
            <Button onClick={onCloseInput}>Cancelar</Button>
            <Button variant="outlined" color="secondary" endIcon={<SaveOutlined />} onClick={onSave}>
              Guardar
            </Button>
          </Box>
        </>
      ) : (
        <Button startIcon={<AddCircleOutline />} fullWidth variant="outlined" onClick={() => setIsAddingEntry(true)}>
          Agregar Tarea
        </Button>
      )}
    </Box>
  );
};

export default NewEntry;
