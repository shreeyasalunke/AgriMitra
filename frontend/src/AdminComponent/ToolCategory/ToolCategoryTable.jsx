



import React, { useEffect } from 'react';
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
  Modal,
  Typography,
  useMediaQuery
} from '@mui/material';
import CreateToolCategoryForm from './CreateToolCategoryForm';
import { useDispatch, useSelector } from 'react-redux';
import { getToolOwnersCategory } from '../../component/State/Authentication/ToolOwner/Action';
import { fetchToolOwnersOrder } from '../../component/State/Tool Owner/Action';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  maxWidth: 500,
  bgcolor: 'background.paper',
  borderRadius: 3,
  boxShadow: 24,
  p: 3,
};

const ToolCategoryTable = () => {
  const { toolowner } = useSelector((store) => store);
  const dispatch = useDispatch();
  const jwt = localStorage.getItem('jwt');
  const isMobile = useMediaQuery('(max-width:600px)');
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    dispatch(
      getToolOwnersCategory({
        jwt,
        toolownerId: toolowner.usersToolOwner?.id,
      })
    );
    dispatch(
      fetchToolOwnersOrder({
        jwt,
        toolownerId: toolowner.usersToolOwner?.id,
      })
    );
  }, []);

  return (
    <Box sx={{ p: isMobile ? 1 : 3 }}>
      <Card
        sx={{
          borderRadius: 3,
          overflow: 'hidden',
          boxShadow: 4,
        }}
      >
        <CardHeader
          title="Tool Category"
          action={
            <IconButton
              onClick={handleOpen}
              sx={{
                bgcolor: 'primary.main',
                color: '#fff',
                '&:hover': { bgcolor: 'primary.dark' },
              }}
            >
              <Create />
            </IconButton>
          }
          sx={{
            backgroundColor: 'primary.light',
            color: 'primary.contrastText',
            py: 2,
          }}
        />

        <TableContainer
          component={Paper}
          sx={{
            maxHeight: isMobile ? 400 : 'auto',
            overflowX: 'auto',
          }}
        >
          <Table stickyHeader aria-label="tool items table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>Id</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {toolowner.categories.map((item) => (
                <TableRow
                  key={item.id}
                  sx={{
                    '&:hover': {
                      backgroundColor: 'action.hover',
                      transition: '0.2s',
                    },
                  }}
                >
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.name}</TableCell>
                </TableRow>
              ))}
              {toolowner.categories.length === 0 && (
                <TableRow>
                  <TableCell colSpan={2} align="center">
                    No categories found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      {/* Modal */}
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
            Create Tool Category
          </Typography>
          <CreateToolCategoryForm />
        </Box>
      </Modal>
    </Box>
  );
};

export default ToolCategoryTable;

