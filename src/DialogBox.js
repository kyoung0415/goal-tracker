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
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';

function DialogBox({ 
  open, 
  onClose, 
  editForm, 
  setEditForm, 
  onSubmit, 
  onDelete, 
  loading,
  getContrastColor,
  darkenHex,
  darkMode
}) {
  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="md" 
      fullWidth
      PaperProps={{
        sx: {
          backgroundColor: darkMode ? '#1e1e1e' : '#fff',
        }
      }}
    >
      <DialogTitle sx={{ position: 'relative', pr: 6, color: darkMode ? '#fff' : '#000' }}>
        Edit Goal
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8
          }}>
          <CloseIcon sx={{ width: '30px', height: '30px', color: darkMode ? '#fff' : 'black' }} />
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
              value={editForm.initialValue}
              onChange={(e) => setEditForm({ ...editForm, initialValue: e.target.value })}
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
              value={editForm.currentValue}
              onChange={(e) => setEditForm({ ...editForm, currentValue: e.target.value })}
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
              value={editForm.endValue}
              onChange={(e) => setEditForm({ ...editForm, endValue: e.target.value })}
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

          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', alignItems: 'flex-start' }}>
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
                value={editForm.bgColor}
                onChange={(e) => setEditForm({ ...editForm, bgColor: e.target.value })}
                variant="outlined"
                fullWidth
                sx={{
                  backgroundColor: editForm.bgColor,
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
                id="edit-units-label"
                sx={{
                  color: darkMode ? '#aaa' : 'rgba(0, 0, 0, 0.6)',
                }}
              >
                Units
              </InputLabel>
              <Select
                labelId="edit-units-label"
                onChange={(e) => setEditForm({ ...editForm, units: e.target.value })}
                label="Units"
                value={editForm.units}
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
          </Box>
        </Box>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'space-between', px: 3, pb: 2 }}>
        <IconButton
          onClick={onDelete}
          disabled={loading}
        >
          <DeleteIcon sx={{ width: '30px', height: '30px', color: darkMode ? '#fff' : 'black' }} />
        </IconButton>
        <Button
          onClick={onSubmit}
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
  );
}

export default DialogBox;