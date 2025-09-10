
import React, { useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Modal,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Avatar,
} from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import {
  createEventAction,
  getToolOwnersEvents,
  deleteEventAction,
} from "../../component/State/Authentication/ToolOwner/Action";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const initialValues = {
  image: "",
  location: "",
  name: "",
  startedAt: null,
  endsAt: null,
};

export default function Events() {
  const [open, setOpen] = React.useState(false);
  const [formValues, setFormValues] = React.useState(initialValues);

  const dispatch = useDispatch();
  const { toolownersEvents, usersToolOwner } = useSelector(
    (store) => store.toolowner
  );
  const jwt = localStorage.getItem("jwt");

  useEffect(() => {
    if (usersToolOwner?.id) {
      dispatch(getToolOwnersEvents({ toolownerId: usersToolOwner.id, jwt }));
    }
  }, [dispatch, usersToolOwner, jwt]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleFormChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date, dateType) => {
    setFormValues({ ...formValues, [dateType]: date });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSend = {
      ...formValues,
      startedAt: formValues.startedAt?.format("MMMM DD, YYYY hh:mm A"),
      endsAt: formValues.endsAt?.format("MMMM DD, YYYY hh:mm A"),
    };

    await dispatch(
      createEventAction({
        data: dataToSend,
        toolownerId: usersToolOwner.id,
        jwt,
      })
    );

    dispatch(getToolOwnersEvents({ toolownerId: usersToolOwner.id, jwt }));

    setFormValues(initialValues);
    setOpen(false);
  };

  const handleDelete = async (eventId) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;

    await dispatch(deleteEventAction({ eventId, jwt }));
    dispatch(getToolOwnersEvents({ toolownerId: usersToolOwner.id, jwt }));
  };

  return (
    <Box p={5}>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Create New Event
      </Button>

      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography variant="h6" mb={2}>
            Create Event
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="image"
                  label="Image URL"
                  variant="outlined"
                  fullWidth
                  value={formValues.image}
                  onChange={handleFormChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="location"
                  label="Location"
                  variant="outlined"
                  fullWidth
                  value={formValues.location}
                  onChange={handleFormChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="name"
                  label="Event Name"
                  variant="outlined"
                  fullWidth
                  value={formValues.name}
                  onChange={handleFormChange}
                />
              </Grid>
              <Grid item xs={12}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                    label="Start Date and Time"
                    value={formValues.startedAt}
                    onChange={(newValue) =>
                      handleDateChange(newValue, "startedAt")
                    }
                    slotProps={{ textField: { fullWidth: true } }}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                    label="End Date and Time"
                    value={formValues.endsAt}
                    onChange={(newValue) => handleDateChange(newValue, "endsAt")}
                    slotProps={{ textField: { fullWidth: true } }}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" fullWidth>
                  Save Event
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Modal>

      <Box mt={5}>
        <Typography variant="h5" gutterBottom>
          My Events
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell>Event Name</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Start</TableCell>
                <TableCell>End</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {toolownersEvents?.map((event) => (
                <TableRow key={event.id}>
                  <TableCell>
                    {event.image ? (
                      <Avatar
                        variant="rounded"
                        src={event.image}
                        alt={event.name}
                        sx={{ width: 100, height: 60 }}
                      />
                    ) : (
                      <Typography variant="caption">No Image</Typography>
                    )}
                  </TableCell>
                  <TableCell>{event.name}</TableCell>
                  <TableCell>{event.location}</TableCell>
                  <TableCell>{event.startedAt}</TableCell>
                  <TableCell>{event.endsAt}</TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleDelete(event.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {toolownersEvents?.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    No events found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}
