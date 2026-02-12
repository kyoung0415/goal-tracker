import React, { useState } from 'react';
import { IconButton, Snackbar } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

function GoalContainer({ 
  visitor_id,
  groupedData, 
  darkMode, 
  calculateProgress, 
  lightenHex, 
  darkenHex, 
  getContrastColor, 
  handleEdit 
}) {
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleCopyColor = (color) => {
    navigator.clipboard.writeText(color);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <div className="goal-container">
        {Object.keys(groupedData).map((category) => (
          <div className="goal-column" key={category}>
            <h2 style={{ color: darkMode ? '#fff' : '#000' }}>{category}</h2>
            {groupedData[category]
              .filter(item => item.visitorId === visitor_id)
              .map((item) => {
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
                  <p 
                    onClick={() => handleCopyColor(item.bgColor)}
                    style={{ 
                      color: darkenHex(item.bgColor), 
                      position: 'absolute', 
                      right: 25, 
                      top: 62,
                      cursor: 'pointer',
                      userSelect: 'none'
                    }}
                    title="Click to copy"
                  >
                    {item.bgColor}
                  </p>
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
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={handleSnackbarClose}
        message="Color copied to clipboard!"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </>
  );
}

export default GoalContainer;