import './App.css';
import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  InputLabel,
  MenuItem,
  Select,
  FormControl,
  Button,
  ListSubheader,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import { HashRouter as Router } from "react-router-dom";

function App() {
  function getOrCreateVisitorId() {
  const existing_id = document.cookie
    .split("; ")
    .find(c => c.startsWith("visitor_id="));

  if (existing_id) {
    return existing_id.split("=")[1];
  }

  const id = crypto.randomUUID();
  document.cookie = `visitor_id=${id}; path=/; max-age=2147483647`; // 68 years
  return id;
}

const visitor_id = getOrCreateVisitorId();
console.log("Visitor ID:", visitor_id);


  const [form, setForm] = useState({
    description: '',
    initialValue: '',
    currentValue: '',
    endValue: '',
    category: '',
    units: '',
    bgColor: '#ffffff',
  });

  const [editForm, setEditForm] = useState({
    description: '',
    initialValue: '',
    currentValue: '',
    endValue: '',
    category: '',
    units: '',
    bgColor: '#ffffff',
    rowIndex: null,
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [sheetData, setSheetData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);

  const GOOGLE_SCRIPT_URL = //endpoint that we will send requests to
    'https://script.google.com/macros/s/AKfycbzPYQgw9e08S65JNx7jxowZKbyATwmkxjh_voKfYU3iymHq90OVQZQlK_l7YVcR6hsr_Q/exec';

  const handleSubmit = async (e) => { //pause and wait to run until form is submitted
    e.preventDefault(); //stops the browser from refreshing the page and wiping our state

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

    setLoading(true);

    try {
      await fetch(GOOGLE_SCRIPT_URL, { //sends a POST request to your Apps Script
        method: 'POST', //sending data rather than retrieving data
        mode: 'no-cors', //browser shouldn't expect a readable response, avoids CORS errors
        headers: { 'Content-Type': 'application/json' }, //specifies that we're sending JSON data
        body: JSON.stringify(form), //converts the form data into a JSON string
      });

      setSuccess(true);
      setForm({
        description: '',
        initialValue: '',
        currentValue: '',
        endValue: '',
        category: '',
        units: '',
        bgColor: '#ffffff',
      });

      setTimeout(() => {
        window.location.reload();
      }, 100);

    } catch (err) {
      // console.error('Error sending to Google Sheet:', err);
      alert('Something went wrong while saving.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    setEditForm({
      description: item.description,
      initialValue: item.initialValue,
      currentValue: item.currentValue,
      endValue: item.endValue,
      category: item.category,
      units: item.units,
      bgColor: item.bgColor,
      rowIndex: item.rowIndex,
    });
    setOpenDialog(true);
  };

  const handleEditSubmit = async () => {
    if (
      !editForm.category ||
      !editForm.description ||
      editForm.initialValue === '' ||
      editForm.endValue === '' ||
      !editForm.units ||
      !editForm.bgColor ||
      !editForm.rowIndex
    ) {
      alert('Please fill out all required fields.');
      return;
    }

    setLoading(true);

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          description: editForm.description,
          initialValue: editForm.initialValue,
          currentValue: editForm.currentValue,
          endValue: editForm.endValue,
          category: editForm.category,
          units: editForm.units,
          bgColor: editForm.bgColor,
          rowIndex: editForm.rowIndex
        }),
      });

      setOpenDialog(false);

      setTimeout(() => {
        window.location.reload();
      }, 100);

    } catch (err) {
      // console.error('Error updating Google Sheet:', err);
      alert('Something went wrong while updating.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!editForm.rowIndex) {
      alert('Cannot delete this entry.');
      return;
    }
    setLoading(true);

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'delete',
          rowIndex: editForm.rowIndex
        }),
      });

      setOpenDialog(false);

      setTimeout(() => {
        window.location.reload();
      }, 100);
    } catch (err) {
      // console.error('Error deleting from Google Sheet:', err);
      alert('Something went wrong while deleting.');
    } finally {
      setLoading(false);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const fetchData = async () => {
    try {
      const response = await fetch(GOOGLE_SCRIPT_URL); //sends a GET request to your Apps Script
      const data = await response.json(); //converts the response into an array

      const validData = data.filter(item =>  //filters out any empty or incomplete rows
        item.description &&
        item.category &&
        item.endValue !== null &&
        item.endValue !== undefined
      );
      setSheetData(validData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
    getOrCreateVisitorId();
  }, []);

  useEffect(() => {
    if (success)
      fetchData();
  }, [success]);

  function groupByCategory(data) {
    const grouped = {};
    data.forEach((item) => {
      const category = item.category;
      if (!grouped[category])
        grouped[category] = [];
      grouped[category].push(item);
    });
    return grouped;
  }

  const groupedData = groupByCategory(sheetData);

  function getContrastColor(hexColor) {
    const r = parseInt(hexColor.substr(1, 2), 16);
    const g = parseInt(hexColor.substr(3, 2), 16);
    const b = parseInt(hexColor.substr(5, 2), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.6 ? '#000000' : '#ffffff';
  }

  function lightenHex(hexColor, amount = 30) {
    const r = Math.min(255, parseInt(hexColor.substr(1, 2), 16) + amount);
    const g = Math.min(255, parseInt(hexColor.substr(3, 2), 16) + amount);
    const b = Math.min(255, parseInt(hexColor.substr(5, 2), 16) + amount);
    return (
      '#' +
      r.toString(16).padStart(2, '0') +
      g.toString(16).padStart(2, '0') +
      b.toString(16).padStart(2, '0')
    );
  }

  function darkenHex(hexColor, amount = 40) {
    const r = Math.max(0, parseInt(hexColor.substr(1, 2), 16) - amount);
    const g = Math.max(0, parseInt(hexColor.substr(3, 2), 16) - amount);
    const b = Math.max(0, parseInt(hexColor.substr(5, 2), 16) - amount);
    return (
      '#' +
      r.toString(16).padStart(2, '0') +
      g.toString(16).padStart(2, '0') +
      b.toString(16).padStart(2, '0')
    );
  }

  function calculateProgress(item) {
    const progress =
      ((item.currentValue - item.initialValue) * 100) / (item.endValue - item.initialValue);
    return Math.max(0, Math.min(100, Math.round(progress || 0)));
  }

  return (
    <div className="App">
      <header>
        <Box
          component="form"
          sx={{
            p: 4,
            borderRadius: 4,
            boxShadow: 3,
            backgroundColor: 'white',
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
            maxWidth: 800,
            margin: '0 auto',
            fontFamily: 'Roboto, sans-serif'
          }}
          onSubmit={handleSubmit}
        >
          <h1>Add A New Goal</h1>

          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              label="Description"
              variant="outlined"
              fullWidth
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              sx={{ width: '500px' }}
            />
            <TextField
              label="Initial Value"
              variant="outlined"
              type="number"
              value={form.initialValue}
              onChange={(e) => setForm({ ...form, initialValue: e.target.value })}
            />
            <TextField
              label="Current Value"
              variant="outlined"
              type="number"
              value={form.currentValue}
              onChange={(e) => setForm({ ...form, currentValue: e.target.value })}
            />
            <TextField
              label="End Value"
              variant="outlined"
              type="number"
              value={form.endValue}
              onChange={(e) => setForm({ ...form, endValue: e.target.value })}
            />
          </Box>

          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              label="Category"
              variant="outlined"
              sx={{ width: '350px' }}
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
                  color: 'rgba(0, 0, 0, 0.6)',
                  backgroundColor: '#fff',
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
              <InputLabel id="units-label">Units</InputLabel>
              <Select
                labelId="units-label"
                onChange={(e) => setForm({ ...form, units: e.target.value })}
                label="Units"
                value={form.units}
              >
                <MenuItem value={'%'}>%</MenuItem>
                <ListSubheader>Time</ListSubheader>
                <MenuItem value={'Days'}>Days</MenuItem>
                <ListSubheader>Distance</ListSubheader>
                <MenuItem value={'mi'}>mi</MenuItem>
              </Select>
            </FormControl>

            <Button
              variant="outlined"
              sx={{
                border: '1px solid rgba(0, 0, 0, 0.23)',
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
      </header>

      <div className="goal-container">
        {Object.keys(groupedData).map((category) => (
          <div className="goal-column" key={category}>
            <h2>{category}</h2>
            {groupedData[category].map((item) => {
              const progress = calculateProgress(item);
              const lighterColor = lightenHex(item.bgColor, 40);

              return (
                <div
                  key={item.rowIndex}
                  className="goal-div"
                  style={{
                    background: `linear-gradient(to right, ${item.bgColor} ${progress}%, ${lighterColor} ${progress}%)`,
                    color: getContrastColor(item.bgColor),
                    fontFamily: 'Roboto, sans-serif',
                    lineHeight: 1.5,
                    marginBottom: '16px',
                    paddingLeft: 15,
                    fontWeight: 400
                  }}
                >
                  <p>
                    {item.description} <br />
                    {item.currentValue}/{item.endValue} {item.units} <br />
                    {progress}%
                  </p>
                  <p style={{ color: darkenHex(item.bgColor), position: 'absolute', right: 25, top: 62 }}>{item.bgColor}</p>
                  <IconButton
                    onClick={() => handleEdit(item)}
                    sx={{ position: 'absolute', right: 20, top: 7, color: getContrastColor(item.bgColor) }}
                  >
                    <EditIcon sx={{ color: darkenHex(item.bgColor) }} />
                  </IconButton>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle sx={{ position: 'relative', pr: 6 }}>
          Edit Goal
          <IconButton
            onClick={handleCloseDialog}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8
            }}>
            <CloseIcon sx={{ width: '30px', height: '30px', color: 'black' }} />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, pt: 2 }}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                label="Description"
                variant="outlined"
                fullWidth
                value={editForm.description}
                onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                sx={{ width: '500px' }}
              />
              <TextField
                label="Initial Value"
                variant="outlined"
                type="number"
                value={editForm.initialValue}
                onChange={(e) => setEditForm({ ...editForm, initialValue: e.target.value })}
              />
              <TextField
                label="Current Value"
                variant="outlined"
                type="number"
                value={editForm.currentValue}
                onChange={(e) => setEditForm({ ...editForm, currentValue: e.target.value })}
              />
              <TextField
                label="End Value"
                variant="outlined"
                type="number"
                value={editForm.endValue}
                onChange={(e) => setEditForm({ ...editForm, endValue: e.target.value })}
              />
            </Box>

            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', alignItems: 'flex-start' }}>
              <TextField
                label="Category"
                variant="outlined"
                sx={{ width: '350px' }}
                value={editForm.category}
                onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
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
                    color: 'rgba(0, 0, 0, 0.6)',
                    backgroundColor: '#fff',
                    padding: '0 4px',
                    zIndex: 1,
                    textAlign: 'center',
                  }}
                >
                  Background Color
                </InputLabel>

                <TextField
                  type="color"
                  value={editForm.bgColor}
                  onChange={(e) => setEditForm({ ...editForm, bgColor: e.target.value })}
                  variant="outlined"
                  fullWidth
                  sx={{
                    backgroundColor: editForm.bgColor,
                    borderRadius: 1,
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
                <InputLabel id="edit-units-label">Units</InputLabel>
                <Select
                  labelId="edit-units-label"
                  onChange={(e) => setEditForm({ ...editForm, units: e.target.value })}
                  label="Units"
                  value={editForm.units}
                >
                  <MenuItem value={'%'}>%</MenuItem>
                  <ListSubheader>Time</ListSubheader>
                  <MenuItem value={'Days'}>Days</MenuItem>
                  <ListSubheader>Distance</ListSubheader>
                  <MenuItem value={'mi'}>mi</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'space-between', px: 3, pb: 2 }}>
          <IconButton
            onClick={handleDelete}
            disabled={loading}
          >
            <DeleteIcon sx={{ width: '30px', height: '30px', color: 'black' }} />
          </IconButton>
          <Button
            onClick={handleEditSubmit}
            variant="contained"
            disabled={loading}
            sx={{
              backgroundColor: editForm.bgColor,
              color: getContrastColor(editForm.bgColor),
              '&:hover': {
                backgroundColor: darkenHex(editForm.bgColor, 20),
              }
            }}
          >
            {loading ? 'Updating...' : 'Update'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default App;
