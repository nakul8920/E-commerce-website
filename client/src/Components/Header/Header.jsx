import { useState } from 'react';

import { AppBar, Toolbar, Box, Typography, IconButton, Drawer, List, styled } from '@mui/material';
import { Menu } from '@mui/icons-material';

import { Link } from 'react-router-dom';

//components
import CustomButtons from './CustomButtons';
import Search from './Search';

const StyledHeader = styled(AppBar)`
    background: #41431B;
    height: 55px;
`;

const Component = styled(Link)`
    margin-left: 12%;
    line-height: 0;
    color: #F8F3E1;
    text-decoration: none;
    display: flex;
    align-items: center;
`;

const LogoText = styled(Typography)`
    font-size: 24px;
    font-weight: 700;
    color: #F8F3E1;
    font-family: 'Georgia', 'Serif';
    letter-spacing: 2px;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
    margin-right: 8px;
`;

const LogoSubtext = styled(Typography)`
    font-size: 12px;
    color: #AEB784;
    font-family: 'Georgia', 'Serif';
    font-style: italic;
    letter-spacing: 1px;
`;

const MenuButton = styled(IconButton)(({ theme }) => ({
    display: 'none',
    [theme.breakpoints.down('sm')]: {
        display: 'block'
    }
}));

const CustomButtonWrapper = styled('span')(({ theme }) => ({ 
    margin: '0 5% 0 auto', 
    [theme.breakpoints.down('sm')]: {
        display: 'none'
    }
}));

const Header = () => {
    // TODO: Replace with your CandyShop logo image URL when ready
    // const logoURL = 'your-candyshop-logo-image-url-here';
    // const subURL = 'your-plus-icon-url-here';

    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    }

    const handleOpen = () => {
        setOpen(true);
    }

    const list = () => (
        <Box style={{ width: 250 }} onClick={handleClose}>
            <List>
                <listItem button>
                    <CustomButtons />
                </listItem>
            </List>
        </Box>
    );


    return (
        <StyledHeader position="fixed">
            <Toolbar style={{ minHeight: 55 }}>
                <MenuButton
                    color="inherit"
                    onClick={handleOpen}
                >
                    <Menu />
                </MenuButton>

                <Drawer open={open} onClose={handleClose}>
                    {list()}
                </Drawer>

                <Component to='/'>
                    <Box component="span" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                        <LogoText>CandyShop</LogoText>
                        <LogoSubtext>Explore Plus</LogoSubtext>
                    </Box>
                    {/* Replace with image logo:
                        <img src={logoURL} style={{ width: 75 }} alt="CandyShop Logo" />
                    */}
                </Component>
                <Search />
                <CustomButtonWrapper>
                    <CustomButtons />
                </CustomButtonWrapper>
            </Toolbar>
        </StyledHeader>
    )
}

export default Header;