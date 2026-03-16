
import { Card, Box, Typography, Button, styled } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';

import { addEllipsis } from '../../utils/util';
import GroupButton from './GroupButton';
import { useDispatch } from 'react-redux';
import { updateCartQuantity } from '../../redux/actions/cartActions';

const Component = styled(Card)`
    border-top: 1px solid #E3DBBB;
    border-radius: 0px;
    display: flex;
    margin-bottom: 20px;
`;

const LeftComponent = styled(Box)`
    margin: 20px; 
    display: flex;
    flex-direction: column;
`;

const RightComponent = styled(Box)`
    margin: 20px;
    flex: 1;
`;

const SmallText = styled(Typography)`
    color: #AEB784;
    font-size: 14px;
    margin-top: 10px;
`;

const Cost = styled(Typography)`
    font-size: 18px;
    font-weight: 600;
`;

const MRP = styled(Typography)`
    color: #AEB784;
`;

const Discount = styled(Typography)`
    color: #AEB784;
`;

const RemoveButton = styled(Button)`
    margin-top: 20px;
    font-size: 14px;
    color: #41431B;
    text-transform: none;
    padding: 0;
    &:hover {
        background-color: transparent;
    }
`;

const CartItem = ({ item, removeItemFromCart }) => {
    const fassured = 'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/fa_62673a.png';
    const dispatch = useDispatch();

    const handleQuantityChange = (newQuantity) => {
        dispatch(updateCartQuantity(item.id, newQuantity));
    };

    const totalItemPrice = item.price.cost * (item.quantity || 1);
    const savingsPerItem = item.price.mrp - item.price.cost;
    const totalSavings = savingsPerItem * (item.quantity || 1);

    return (
        <Component>
            <LeftComponent>
                <img
                    src={item.url || item.detailUrl || 'https://via.placeholder.com/150?text=No+Image+Available'}
                    alt={item.title?.shortTitle || 'cart item'}
                    style={{ height: 110, width: 110 }}
                    onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/150?text=No+Image+Available'; }}
                />
                <GroupButton 
                    quantity={item.quantity || 1}
                    onQuantityChange={handleQuantityChange}
                />
            </LeftComponent>
            <RightComponent>
                <Typography style={{ marginBottom: 10 }}>{addEllipsis(item.title.longTitle)}</Typography>
                <SmallText>Seller: RetailNet
                    <span><img src={fassured} style={{ width: 50, marginLeft: 10 }} alt="assured" /></span>
                </SmallText>
                <Typography style={{margin: '20px 0'}}>
                    <Cost component="span">₹{totalItemPrice}</Cost>&nbsp;&nbsp;&nbsp;
                    <MRP component="span"><strike>₹{item.price.mrp * (item.quantity || 1)}</strike></MRP>&nbsp;&nbsp;&nbsp;
                    <Discount component="span">{item.price.discount} off</Discount>
                </Typography>
                <SmallText style={{ color: '#AEB784', marginBottom: 10 }}>You save ₹{totalSavings}</SmallText>
                <RemoveButton 
                    startIcon={<DeleteIcon style={{ fontSize: 16 }} />}
                    onClick={() => removeItemFromCart(item.id)}
                >
                    Remove
                </RemoveButton>
            </RightComponent>
        </Component>
    )
}

export default CartItem;