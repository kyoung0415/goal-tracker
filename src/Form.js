import React from 'react';
import {
  Box,
  TextField,
  InputLabel,
  MenuItem,
  Select,
  FormControl,
  Button,
  ListSubheader,
} from '@mui/material';

function Form({ 
  form, 
  setForm, 
  onSubmit, 
  loading, 
  darkMode, 
  getContrastColor 
}) {
  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !form.category ||
      !form.description ||
      !form.initialValue ||
      !form.endValue ||
      !form.units ||
      !form.bgColor
    ) {
      alert('Please fill out all required fields.');
      return;
    }

    onSubmit();
  };

  return (
    <Box
      component="form"
      sx={{
        p: 4,
        borderRadius: 4,
        boxShadow: 3,
        backgroundColor: darkMode ? '#1e1e1e' : 'white',
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
        maxWidth: 800,
        margin: '0 auto',
        fontFamily: 'Roboto, sans-serif'
      }}
      onSubmit={handleSubmit}
    >
      <h1 style={{ color: darkMode ? '#fff' : '#000' }}>Add A New Goal</h1>

      <Box sx={{ display: 'flex', gap: 2 }}>
        <TextField
          label="Description"
          variant="outlined"
          fullWidth
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          sx={{
            width: '500px',
            '& .MuiOutlinedInput-root': {
              color: darkMode ? '#fff' : '#000',
              '& fieldset': {
                borderColor: darkMode ? '#555' : 'rgba(0, 0, 0, 0.23)',
              },
              '&:hover fieldset': {
                borderColor: darkMode ? '#777' : 'rgba(0, 0, 0, 0.87)',
              },
            },
            '& .MuiInputLabel-root': {
              color: darkMode ? '#aaa' : 'rgba(0, 0, 0, 0.6)',
            },
          }}
        />
        <TextField
          label="Initial Value"
          variant="outlined"
          type="number"
          value={form.initialValue}
          onChange={(e) => setForm({ ...form, initialValue: e.target.value })}
          sx={{
            '& .MuiOutlinedInput-root': {
              color: darkMode ? '#fff' : '#000',
              '& fieldset': {
                borderColor: darkMode ? '#555' : 'rgba(0, 0, 0, 0.23)',
              },
              '&:hover fieldset': {
                borderColor: darkMode ? '#777' : 'rgba(0, 0, 0, 0.87)',
              },
            },
            '& .MuiInputLabel-root': {
              color: darkMode ? '#aaa' : 'rgba(0, 0, 0, 0.6)',
            },
          }}
        />
        <TextField
          label="Current Value"
          variant="outlined"
          type="number"
          value={form.currentValue}
          onChange={(e) => setForm({ ...form, currentValue: e.target.value })}
          sx={{
            '& .MuiOutlinedInput-root': {
              color: darkMode ? '#fff' : '#000',
              '& fieldset': {
                borderColor: darkMode ? '#555' : 'rgba(0, 0, 0, 0.23)',
              },
              '&:hover fieldset': {
                borderColor: darkMode ? '#777' : 'rgba(0, 0, 0, 0.87)',
              },
            },
            '& .MuiInputLabel-root': {
              color: darkMode ? '#aaa' : 'rgba(0, 0, 0, 0.6)',
            },
          }}
        />
        <TextField
          label="End Value"
          variant="outlined"
          type="number"
          value={form.endValue}
          onChange={(e) => setForm({ ...form, endValue: e.target.value })}
          sx={{
            '& .MuiOutlinedInput-root': {
              color: darkMode ? '#fff' : '#000',
              '& fieldset': {
                borderColor: darkMode ? '#555' : 'rgba(0, 0, 0, 0.23)',
              },
              '&:hover fieldset': {
                borderColor: darkMode ? '#777' : 'rgba(0, 0, 0, 0.87)',
              },
            },
            '& .MuiInputLabel-root': {
              color: darkMode ? '#aaa' : 'rgba(0, 0, 0, 0.6)',
            },
          }}
        />
      </Box>

      <Box sx={{ display: 'flex', gap: 2 }}>
        <TextField
          label="Category"
          variant="outlined"
          sx={{
            width: '350px',
            '& .MuiOutlinedInput-root': {
              color: darkMode ? '#fff' : '#000',
              '& fieldset': {
                borderColor: darkMode ? '#555' : 'rgba(0, 0, 0, 0.23)',
              },
              '&:hover fieldset': {
                borderColor: darkMode ? '#777' : 'rgba(0, 0, 0, 0.87)',
              },
            },
            '& .MuiInputLabel-root': {
              color: darkMode ? '#aaa' : 'rgba(0, 0, 0, 0.6)',
            },
          }}
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        />

        <FormControl sx={{ width: '220px', position: 'relative' }}>
          <InputLabel
            shrink
            sx={{
              position: 'absolute',
              top: '-11px',
              left: 0,
              width: '100%',
              fontSize: '18px',
              color: darkMode ? '#aaa' : 'rgba(0, 0, 0, 0.6)',
              backgroundColor: darkMode ? '#1e1e1e' : '#fff',
              padding: '0 4px',
              zIndex: 1,
              textAlign: 'center',
            }}
          >
            Background Color
          </InputLabel>

          <TextField
            type="color"
            value={form.bgColor}
            onChange={(e) => setForm({ ...form, bgColor: e.target.value })}
            variant="outlined"
            fullWidth
            sx={{
              backgroundColor: form.bgColor,
              borderRadius: 1,
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: darkMode ? '#555' : 'rgba(0, 0, 0, 0.23)',
                },
              },
              '& input[type="color"]::-webkit-color-swatch-wrapper': {
                padding: 0,
              },
              '& input[type="color"]::-webkit-color-swatch': {
                border: 'none',
              },
              '& input[type="color"]': {
                appearance: 'none',
                WebkitAppearance: 'none'
              },
            }}
            inputProps={{
              style: {
                width: '220px',
                height: '56px',
                padding: '0 14px',
                cursor: 'pointer',
              },
            }}
          />
        </FormControl>

        <FormControl sx={{ width: '220px' }}>
          <InputLabel 
            id="units-label"
            sx={{
              color: darkMode ? '#aaa' : 'rgba(0, 0, 0, 0.6)',
            }}
          >
            Units
          </InputLabel>
          <Select
            labelId="units-label"
            onChange={(e) => setForm({ ...form, units: e.target.value })}
            label="Units"
            value={form.units}
            sx={{
              color: darkMode ? '#fff' : '#000',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: darkMode ? '#555' : 'rgba(0, 0, 0, 0.23)',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: darkMode ? '#777' : 'rgba(0, 0, 0, 0.87)',
              },
              '& .MuiSvgIcon-root': {
                color: darkMode ? '#aaa' : 'rgba(0, 0, 0, 0.54)',
              },
            }}
            MenuProps={{
              PaperProps: {
                sx: {
                  backgroundColor: darkMode ? '#2a2a2a' : '#fff',
                  color: darkMode ? '#fff' : '#000',
                },
              },
            }}
          >
            <MenuItem value={'%'}>%</MenuItem>
            <ListSubheader sx={{ backgroundColor: darkMode ? '#2a2a2a' : '#fff', color: darkMode ? '#aaa' : 'rgba(0, 0, 0, 0.6)' }}>Time</ListSubheader>
            <MenuItem value={'Days'}>Days</MenuItem>
            <ListSubheader sx={{ backgroundColor: darkMode ? '#2a2a2a' : '#fff', color: darkMode ? '#aaa' : 'rgba(0, 0, 0, 0.6)' }}>Distance</ListSubheader>
            <MenuItem value={'mi'}>mi</MenuItem>
          </Select>
        </FormControl>

        <Button
          variant="outlined"
          sx={{
            borderColor: darkMode ? '#555555' : '#c4c4c4',
            backgroundColor: form.bgColor,
            width: '180px',
            color: form.bgColor ? getContrastColor(form.bgColor) : '#838383',
            textTransform: 'none',
            fontSize: '16px',
            fontWeight: 400,
          }}
          type="submit"
          disabled={loading}
        >
          {loading ? 'Saving...' : 'Add +'}
        </Button>
      </Box>
    </Box>
  );
}

export default Form;
