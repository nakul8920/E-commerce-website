import React, { useState, useContext } from 'react';

import { Box, Typography, Badge, Button, styled } from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';

import { Link } from 'react-router-dom';
import { AppContext } from '../../context/ContextProvider';
import { useSelector } from 'react-redux';

import Profile from './Profile';
import LoginDialog from '../Login/LoginDialog';
import SellerDialog from '../Login/SellerDialog';

const Container = styled(Link)(({ theme }) => ({
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
        display: 'block'
    }
}));

const Wrapper = styled(Box)(({ theme }) => ({
    margin: '0 3% 0 auto',
    display: 'flex',
    '& > *': {
        marginRight: '40px !important',
        textDecoration: 'none',
        color: '#F8F3E1',
        fontSize: 12,
        alignItems: 'center',
        [theme.breakpoints.down('sm')]: {
            color: '#41431B',
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
            marginTop: 10
        }
    },
    [theme.breakpoints.down('sm')]: {
        display: 'block'
    }
}));

const LoginButton = styled(Button)(({ theme }) => ({
    color: '#F8F3E1',
    background: '#41431B',
    textTransform: 'none',
    fontWeight: 600,
    borderRadius: 2,
    padding: '5px 40px',
    height: 32,
    boxShadow: 'none',
    [theme.breakpoints.down('sm')]: {
        background: '#AEB784',
        color: '#41431B'
    }
}));

const SellerButton = styled(Typography)(({ theme }) => ({
    marginTop: 3,
    width: 135,
    cursor: 'pointer',
    '&:hover': {
        color: '#AEB784',
        transition: 'all 0.3s ease'
    },
    [theme.breakpoints.down('sm')]: {
        marginTop: 10
    }
}));


const CustomButtons = () => {
    
    const [open, setOpen] = useState(false);
    const [sellerOpen, setSellerOpen] = useState(false);
    const { account, setAccount } = useContext(AppContext);

    const cartDetails = useSelector(state => state.cart);
    const { cartItems } = cartDetails;

    const openDialog = () => {
        setOpen(true);
    }

    const openSellerDialog = () => {
        setSellerOpen(true);
    }

    return (
        <Wrapper>
            {
                account ? <Profile account={account} setAccount={setAccount} /> :
                    <LoginButton variant="contained" onClick={() => openDialog()}>Login</LoginButton>
                
            }
            <SellerButton onClick={openSellerDialog}>Become a Seller</SellerButton>
            <Typography style={{ marginTop: 3 }}>More</Typography>
            
            <Container to='/cart'>
                <Badge badgeContent={cartItems?.length} color="secondary">
                    <ShoppingCart />
                </Badge>
                <Typography style={{ marginLeft: 10 }}>Cart</Typography>
            </Container>
            <LoginDialog open={open} setOpen={setOpen} setAccount={setAccount} />
            <SellerDialog open={sellerOpen} setOpen={setSellerOpen} />
        </Wrapper>
    )
}

export default CustomButtons;