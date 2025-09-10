
import React, { useEffect, useState } from 'react';
import { Delete, Create } from '@mui/icons-material';
import {
  Card,
  CardHeader,
  Table,
  Box,
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Avatar,
  Snackbar,
  Alert,
  Typography,
  useMediaQuery,
  Switch
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  deleteToolAction,
  getToolItemsByToolOwnerId,
  updateToolItemsAvailability
} from '../../component/State/ToolItem/Action';

const ToolItemTable = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState("");
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { toolowner, toolitem, auth } = useSelector((store) => store);
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width:768px)'); // check screen size

  useEffect(() => {
    dispatch(getToolItemsByToolOwnerId({
      jwt,
      toolownerId: toolowner.usersToolOwner.id,
      toolCategory: "",
    }));
  }, [dispatch, jwt, toolowner?.usersToolOwner?.id]);

  const handleDeleteTool = async (toolId) => {
    try {
      await dispatch(deleteToolAction({ toolId, jwt: auth.jwt || jwt }));
      setSnackbarMsg("Tool deleted successfully!");
      setSnackbarOpen(true);
      await dispatch(getToolItemsByToolOwnerId({
        jwt,
        toolownerId: toolowner.usersToolOwner.id,
        toolCategory: "",
      }));
    } catch (error) {
      console.error("Error deleting tool:", error);
      alert("Failed to delete tool: " + (error.message || "Unknown error"));
    }
  };

  const handleToggleAvailability = async (toolId, currentStatus) => {
    try {
      await dispatch(updateToolItemsAvailability({
        toolId,
        available: !currentStatus,
        jwt: auth.jwt || jwt,
      }));
      setSnackbarMsg(`Tool marked as ${!currentStatus ? "Available" : "Unavailable"}`);
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error toggling availability:", error);
      alert("Failed to toggle availability: " + (error.message || "Unknown error"));
    }
  };

  return (
    <Box p={isMobile ? 1 : 3}>
      <Card sx={{ p: 1 }}>
        <CardHeader
          action={
            <IconButton
              color="primary"
              onClick={() => navigate("/admin/toolowners/add-toolitem")}
              sx={{
                background: '#f0f0f0',
                '&:hover': { background: '#e0e0e0' },
              }}
            >
              <Create />
            </IconButton>
          }
          title={
            <Typography variant={isMobile ? "h6" : "h5"} fontWeight="bold">
              Tool Items
            </Typography>
          }
          sx={{ pb: 1 }}
        />

        <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
          <Table size={isMobile ? "small" : "medium"}>
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Availability</TableCell>
                <TableCell>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {toolitem.toolItems.map((row) => (
                <TableRow key={row.id} hover>
                  <TableCell>
                    <Avatar
                      src={row.images[0]}
                      alt={row.name}
                      sx={{ width: 50, height: 50 }}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1" fontWeight="500">
                      {row.name}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="text.secondary">₹{row.price}</Typography>
                  </TableCell>
                  <TableCell>
                    <Switch
                      checked={row.available}
                      onChange={() => handleToggleAvailability(row.id, row.available)}
                      color="success"
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton
                      color="error"
                      onClick={() => handleDeleteTool(row.id)}
                      sx={{
                        background: '#fff5f5',
                        '&:hover': { background: '#ffe5e5' },
                      }}
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      {/* Snackbar for confirmation */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="success" variant="filled">
          {snackbarMsg}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ToolItemTable;
