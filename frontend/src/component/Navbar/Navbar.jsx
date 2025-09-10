
import React, { useState } from 'react';
import { Avatar, Box, IconButton, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import './Navbar.css';
import { Person } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { searchToolItem } from '../../component/State/ToolItem/Action';

const Navbar = () => {
  const { auth, cart } = useSelector(store => store);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchKeyword, setSearchKeyword] = useState("");

  const handleAvatarClick = () => {
    if (auth.user.role === "ROLE_CUSTOMER") {
      navigate("/my-profile");
    } else {
      navigate("/admin/toolowners");
    }
  };

  const handleSearch = () => {
    if (searchKeyword.trim() !== "") {
      dispatch(searchToolItem({ keyword: searchKeyword, jwt: auth.jwt }));
      navigate(`/search?query=${searchKeyword}`);
    }
  };

  return (
    <Box className='px-5 z-50 py-[.8rem] lg:px-20 flex justify-between'>
      {/* Logo */}
      <div className='lg:mr-10 cursor-pointer flex item-center space-x-4'>
        <li onClick={() => navigate("/")} className='logo  font bold text-green-800 text-2xl'>
        <u><strong> AgriMitra</strong> </u>
        </li>
      </div>

      {/* Search + Icons */}
      <div className='flex item-center space-x-2 lg:space-x-10'>

        {/* Search box */}
        <div className='flex items-center border rounded px-2'>
          <TextField
            variant="standard"
            placeholder="Search tools..."
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            InputProps={{ disableUnderline: true }}
            size="small"
          />
          <IconButton onClick={handleSearch}>
            <SearchIcon sx={{ fontSize: "1.5rem" }} />
          </IconButton>
        </div>

        {/* Avatar / Login */}
        <div>
          {auth.user ? (
            <Avatar
              onClick={handleAvatarClick}
              sx={{ bgcolor: "black", color: "white", cursor: "pointer" }}
            >
              {auth.user?.fullName[0].toUpperCase()}
            </Avatar>
          ) : (
            <IconButton onClick={() => navigate("/account/login")}>
              <Person />
            </IconButton>
          )}
        </div>

        {/* Cart */}
        <div>
          <IconButton onClick={() => navigate("/cart")}>
            <Badge color="secondary" badgeContent={cart.cart?.items?.length || 0}>
              <ShoppingCartIcon sx={{ fontSize: "1.5rem" }} />
            </Badge>
          </IconButton>
        </div>

      </div>
    </Box>
  );
};

export default Navbar;
