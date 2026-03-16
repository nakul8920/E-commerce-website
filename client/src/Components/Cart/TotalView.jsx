import { useState, useEffect } from 'react';

import { Box, Typography, styled, Button } from '@mui/material';

const Header = styled(Box)`
    padding: 15px 24px;
    background: #F8F3E1;
    borderBottom: 1px solid #E3DBBB;
`;

const Heading = styled(Typography)`
    color: #41431B;
`;

const Container = styled(Box)`
    padding: 15px 24px;
    background: #F8F3E1;
    & > p {
        margin-bottom: 20px;
        font-size: 14px;
    }
`;

const Price = styled(Typography)`
    float: right;
`;

const TotalAmount = styled(Typography)`
    font-size: 18px;
    font-weight: 600;
    border-top: 1px dashed #e0e0e0;
    padding: 20px 0;
    border-bottom: 1px dashed #e0e0e0;
`;

const Discount = styled(Typography)`
    font-size: 16px; 
    color: #AEB784;
`

const SuggestionsBox = styled(Box)`
    padding: 15px 24px;
    background: #F8F3E1;
    margin-top: 20px;
    border: 1px solid #E3DBBB;
`;

const SuggestionItem = styled(Button)`
    display: block;
    width: 100%;
    text-align: left;
    padding: 10px;
    margin: 5px 0;
    background: #E3DBBB !important;
    color: #41431B !important;
    text-transform: none;
    font-size: 13px;
    &:hover {
        background: #AEB784 !important;
    }
`;

const TotalView = ({ cartItems }) => {
    const [price, setPrice] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [totalQuantity, setTotalQuantity] = useState(0);

    useEffect(() => {
        const calculateTotal = () => {
            let price = 0, discount = 0, quantity = 0;
            cartItems.forEach(item => {
                const itemQuantity = item.quantity || 1;
                const itemCost = item.price.cost * itemQuantity;
                const itemMRP = item.price.mrp * itemQuantity;
                
                price += itemMRP;
                discount += (itemMRP - itemCost);
                quantity += itemQuantity;
            })
            setPrice(price);
            setDiscount(discount);
            setTotalQuantity(quantity);
        };
        calculateTotal();
    }, [cartItems]);

    const deliveryCharge = price > 500 ? 0 : 40;
    const finalTotal = price - discount + deliveryCharge;

    // Sample extra purchase suggestions
    const suggestions = [
        { id: 1, title: 'Mobile Screen Protector', price: 199 },
        { id: 2, title: 'Phone Back Cover', price: 299 },
        { id: 3, title: 'Air Buds Pro', price: 1999 },
        { id: 4, title: 'Laptop Stand', price: 799 },
    ];

    return (
        <Box>
            <Header>
                <Heading>PRICE DETAILS</Heading>
            </Header>
            <Container>
                <Typography>Price ({totalQuantity} item{totalQuantity !== 1 ? 's' : ''})
                    <Price component="span">₹{price.toFixed(2)}</Price>
                </Typography>
                <Typography>Discount
                    <Price component="span">-₹{discount.toFixed(2)}</Price>
                </Typography>
                <Typography>Delivery Charges
                    <Price component="span">{deliveryCharge === 0 ? 'FREE' : `₹${deliveryCharge}`}</Price>
                </Typography>
                <TotalAmount>Total Amount
                    <Price>₹{finalTotal.toFixed(2)}</Price>
                </TotalAmount>
                <Discount>You will save ₹{(discount - (deliveryCharge === 0 ? 0 : 40)).toFixed(2)} on this order</Discount>
                {deliveryCharge === 0 && 
                    <Discount style={{ color: '#AEB784', marginTop: 10 }}>Free Delivery! Orders above ₹500 ship free.</Discount>
                }
            </Container>

            {totalQuantity < 5 && (
                <SuggestionsBox>
                    <Heading style={{ marginBottom: 15 }}>SUGGESTED ADD-ONS</Heading>
                    {suggestions.map(suggestion => (
                        <SuggestionItem 
                            key={suggestion.id}
                            variant="text"
                        >
                            <Typography style={{ fontSize: 13 }}>
                                {suggestion.title}
                                <span style={{ float: 'right', color: '#AEB784', fontWeight: 600 }}>
                                    ₹{suggestion.price}
                                </span>
                            </Typography>
                        </SuggestionItem>
                    ))}
                </SuggestionsBox>
            )}
        </Box>
    )
}

export default TotalView;