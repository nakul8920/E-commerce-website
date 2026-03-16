import { useState } from 'react';

import { Button, Box, styled } from '@mui/material';
import { ShoppingCart as Cart, FlashOn as Flash } from '@mui/icons-material';

import { useNavigate } from 'react-router-dom';
import { payUsingPaytm } from '../../service/api';
import { post } from '../../utils/paytm';

import { addToCart } from '../../redux/actions/cartActions';
import { useDispatch } from 'react-redux';

const LeftContainer = styled(Box)(({ theme }) => ({
    minWidth: '40%',
    padding: '40px 0 0 80px',
    [theme.breakpoints.down('md')]: {
        padding: '20px 40px'
    }
}))

const Image = styled('img')({
    padding: '15px 20px',
    border: '1px solid #E3DBBB',
    width: '95%'
});

const StyledButton = styled(Button)`
    width: 46%;
    border-radius: 2px;
    height: 50px;
    color: #FFF;
`;

const ActionItem = ({ product }) => {
    const navigate = useNavigate();
    const { id } = product;
        
    const [quantity, setQuantity] = useState(1);
    const dispatch = useDispatch();

    const buyNow = async () => {
        let response = await payUsingPaytm({ amount: 500, email: 'codeforinterview01@gmail.com'});
        var information = {
            action: 'https://securegw-stage.paytm.in/order/process',
            params: response    
        }
        post(information);
    }

    const addItemToCart = () => {
        dispatch(addToCart(id, quantity));
        navigate('/cart');
    }

    const placeholderProductImage = 'https://via.placeholder.com/150?text=No+Image+Available';
    const productImage = product?.url || product?.detailUrl || placeholderProductImage;

    return (
        <LeftContainer>
            <Image
                src={productImage}
                alt={product.title?.shortTitle || 'product image'}
                loading="lazy"
                onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/150?text=No+Image+Available'; }}
            /><br />
            <StyledButton onClick={() => addItemToCart()} style={{marginRight: 10, background: '#AEB784'}} variant="contained"><Cart />Add to Cart</StyledButton>
            <StyledButton onClick={() => buyNow()} style={{background: '#41431B'}} variant="contained"><Flash /> Buy Now</StyledButton>
        </LeftContainer>
    )
}

export default ActionItem;