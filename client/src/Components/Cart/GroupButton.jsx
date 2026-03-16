import React from "react";

import { ButtonGroup, Button, styled } from "@mui/material";
import { Remove as RemoveIcon, Add as AddIcon } from "@mui/icons-material";

const Component = styled(ButtonGroup)`
    margin-top: 10px;
`;

const StyledButton = styled(Button)`
    border-radius: 50%;
    width: 36px;
    height: 36px;
    min-width: 36px;
`;

const QuantityButton = styled(Button)`
    width: 50px;
    cursor: default;
    &:hover {
        background-color: inherit;
    }
`;

const GroupedButton = ({ quantity = 1, onQuantityChange }) => {

    const handleIncrement = () => {
        onQuantityChange(quantity + 1);
    };

    const handleDecrement = () => {
        if (quantity > 1) {
            onQuantityChange(quantity - 1);
        }
    };

    return (
        <Component>
            <StyledButton onClick={() => handleDecrement()} disabled={quantity <= 1}>
                <RemoveIcon style={{ fontSize: 18 }} />
            </StyledButton>
            <QuantityButton disabled>{quantity}</QuantityButton>
            <StyledButton onClick={() => handleIncrement()}>
                <AddIcon style={{ fontSize: 18 }} />
            </StyledButton>
        </Component>
    );
}

export default GroupedButton;