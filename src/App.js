import './App.css';
import React, { useState, useEffect } from 'react';
import {
  Switch,
  FormControlLabel
} from '@mui/material';
import { styled } from '@mui/material/styles';
import DialogBox from './DialogBox';
import GoalContainer from './GoalContainer';
import Form from './Form';

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 90,
  height: 50,
  padding: 10,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(8px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(35px)',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="28" width="28" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          '#fff',
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: '#aab4be',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: '#001e3c',
    width: 46,
    height: 46,
    '&::before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="28" width="28" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        '#fff',
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: '#aab4be',
    borderRadius: 30 / 2,
  },
}));

function App() {

  function getOrCreateVisitorId() {
    const existing_id = document.cookie
      .split("; ")
      .find(c => c.startsWith("visitor_id="));

    if (existing_id) {
      return existing_id.split("=")[1];
    }

    const id = crypto.randomUUID();
    document.cookie = `visitor_id=${id}; path=/; max-age=1576800000`; 
    return id;
  }

  const visitor_id = getOrCreateVisitorId();
  console.log("Visitor ID:", visitor_id);
  
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    console.log('Dark mode:', darkMode);
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.body.style.backgroundColor = '#121212';
      setForm(prev => ({
    ...prev,
    bgColor: darkMode ? '#1e1e1e' : '#ffffff'
  }));
    } else {
      document.body.style.backgroundColor = '#f5f5f5';
      setForm(prev => ({
    ...prev,
    bgColor: darkMode ? '#1e1e1e' : '#ffffff'
  }));
    }
  }, [darkMode]);

  const [form, setForm] = useState({
    description: '',
    initialValue: '',
    currentValue: '',
    endValue: '',
    category: '',
    units: '',
    visitorId: visitor_id,
    bgColor: darkMode ? '#1e1e1e' : '#ffffff'
  });

  const [editForm, setEditForm] = useState({
    description: '',
    initialValue: '',
    currentValue: '',
    endValue: '',
    category: '',
    units: '',
    visitorId: visitor_id,
    bgColor: darkMode ? '#1e1e1e' : '#ffffff',
    rowIndex: null,
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [sheetData, setSheetData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);

  const GOOGLE_SCRIPT_URL =
    'https://script.google.com/macros/s/AKfycbyRdDKDhPKbfCwygbLnx5eeapv81vmpbUSvuC8cB7NWhPykn8DBjbqEYD6jVJf1Uh_v4A/exec';

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      setSuccess(true);
      setForm({
        description: '',
        initialValue: '',
        currentValue: '',
        endValue: '',
        category: '',
        units: '',
        visitorId: visitor_id,
        bgColor: '#ffffff',
      });

      setTimeout(() => {
        window.location.reload();
      }, 100);

    } catch (err) {
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
      visitorId: visitor_id,
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
          visitorId: visitor_id,
          bgColor: editForm.bgColor,
          rowIndex: editForm.rowIndex
        }),
      });

      setOpenDialog(false);

      setTimeout(() => {
        window.location.reload();
      }, 100);

    } catch (err) {
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
      const response = await fetch(GOOGLE_SCRIPT_URL);
      const data = await response.json();

      const validData = data.filter(item =>
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
      <FormControlLabel
        control={
          <MaterialUISwitch
            checked={darkMode}
            onChange={toggleDarkMode}
          />
        }
        label=""
        sx={{
          position: 'fixed',
          top: 20,
          right: 20,
          padding: '8px 12px',
          borderRadius: '8px',
          zIndex: 1000,
          margin: 0,
        }}
      />

      <header>
        <Form
          form={form}
          setForm={setForm}
          onSubmit={handleSubmit}
          loading={loading}
          darkMode={darkMode}
          getContrastColor={getContrastColor}
        />
      </header>

      <GoalContainer
        visitor_id={visitor_id}
        groupedData={groupedData}
        darkMode={darkMode}
        calculateProgress={calculateProgress}
        lightenHex={lightenHex}
        darkenHex={darkenHex}
        getContrastColor={getContrastColor}
        handleEdit={handleEdit}
      />

      <DialogBox
        open={openDialog}
        onClose={handleCloseDialog}
        editForm={editForm}
        setEditForm={setEditForm}
        onSubmit={handleEditSubmit}
        onDelete={handleDelete}
        loading={loading}
        getContrastColor={getContrastColor}
        darkenHex={darkenHex}
        darkMode={darkMode}
      />
    </div>
  );
}

export default App;