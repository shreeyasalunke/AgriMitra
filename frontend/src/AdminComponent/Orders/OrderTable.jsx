


import {  
  Card, CardHeader, Table, Box, Paper, TableBody, 
  TableCell, TableContainer, TableHead, TableRow, 
  Avatar, AvatarGroup, Button, Menu, MenuItem, Snackbar, Alert, Typography
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchToolOwnersOrder, updateOrderStatus } from '../../component/State/Tool Owner/Action';

const orderStatus = [
  { label: "Pending", value: "PENDING" },
  { label: "Out For Delivery", value: "OUT_FOR_DELIVERY" },
  { label: "Delivered", value: "DELIVERED" }
]

const OrderTable = () => {
  const [anchorElArray, setAnchorElArray] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { toolowner, toolownerOrder } = useSelector((store) => store);

  useEffect(() => {
    if (toolowner.usersToolOwner?.id) {
      dispatch(fetchToolOwnersOrder({
        jwt,
        toolownerId: toolowner.usersToolOwner.id,
      }));
    }
  }, [dispatch, jwt, toolowner.usersToolOwner?.id]);

  const handleUpdateStatusToolItemClick = (event, index) => {
    const newAnchorElArray = [...anchorElArray];
    newAnchorElArray[index] = event.currentTarget;
    setAnchorElArray(newAnchorElArray);
  };

  const handleUpdateStatusToolItemClose = (index) => {
    const newAnchorElArray = [...anchorElArray];
    newAnchorElArray[index] = null;
    setAnchorElArray(newAnchorElArray);
  };

  const handleUpdateOrder = (orderId, status, index) => {
    handleUpdateStatusToolItemClose(index);
    dispatch(updateOrderStatus({ orderId, orderStatus: status, jwt }))
      .then(() => {
        dispatch(fetchToolOwnersOrder({
          jwt,
          toolownerId: toolowner.usersToolOwner.id,
        }));
        setSnackbarOpen(true);
      });
  };

  return (
    <Box sx={{ p: 2 }}>
      <Card sx={{ boxShadow: 3, borderRadius: 3 }}>
        <CardHeader 
          title="All Orders" 
          sx={{ 
            textAlign: "center", 
            fontWeight: "bold", 
            bgcolor: "primary.main", 
            color: "white",
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12
          }} 
        />

        <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
          <Table sx={{ minWidth: 700 }} aria-label="orders table">
            <TableHead>
              <TableRow sx={{ bgcolor: "grey.100" }}>
                <TableCell><b>Order ID</b></TableCell>
                <TableCell align="center"><b>Image</b></TableCell>
                <TableCell align="center"><b>Customer</b></TableCell>
                <TableCell align="center"><b>Price</b></TableCell>
                <TableCell align="center"><b>Tools</b></TableCell>
                <TableCell align="center"><b>Status</b></TableCell>
                <TableCell align="center"><b>Update</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {toolownerOrder.orders.map((item, index) => (
                <TableRow key={item.id} hover sx={{ "&:last-child td": { border: 0 } }}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell align="center">
                    <AvatarGroup max={3}>
                      {item.items.map((orderItem) => (
                        <Avatar 
                          key={orderItem.tool?.id} 
                          src={orderItem.tool?.images[0]} 
                          alt={orderItem.tool?.name} 
                          sx={{ width: 40, height: 40 }}
                        />
                      ))}
                    </AvatarGroup>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="body2" fontWeight="500">
                      {item.customer?.fullName}
                    </Typography>
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold", color: "success.main" }}>
                    ₹{item.totalAmount}
                  </TableCell>
                  <TableCell align="center">
                    {item.items.map((orderItem, i) => (
                      <Typography key={i} variant="body2">{orderItem.tool?.name}</Typography>
                    ))}
                  </TableCell>
                  <TableCell align="center">
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        px: 1.5, py: 0.5, borderRadius: 2, 
                        bgcolor: item.orderStatus === "DELIVERED" ? "success.light" 
                                : item.orderStatus === "OUT_FOR_DELIVERY" ? "warning.light" 
                                : "grey.200",
                        fontWeight: "bold"
                      }}
                    >
                      {item.orderStatus}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={(e) => handleUpdateStatusToolItemClick(e, index)}
                    >
                      Update
                    </Button>
                    <Menu
                      anchorEl={anchorElArray[index]}
                      open={Boolean(anchorElArray[index])}
                      onClose={() => handleUpdateStatusToolItemClose(index)}
                    >
                      {orderStatus.map((status) => (
                        <MenuItem
                          key={status.value}
                          onClick={() => handleUpdateOrder(item.id, status.value, index)}
                        >
                          {status.label}
                        </MenuItem>
                      ))}
                    </Menu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      {/* ✅ Snackbar Success Message */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="success" variant="filled" onClose={() => setSnackbarOpen(false)}>
          Status updated successfully!
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default OrderTable
