import React, { useState } from 'react';

import { Dialog, DialogContent, TextField, Box, Button, Typography, styled, Stepper, Step, StepLabel, Select, MenuItem } from '@mui/material';

import { registerSellerAPI } from '../../service/api';

const Component = styled(DialogContent)`
    height: auto;
    width: 90vh;
    padding: 0;
    padding-top: 20px;
    max-height: 90vh;
    overflow-y: auto;
`;

const StepperContainer = styled(Box)`
    padding: 20px 35px;
`;

const RegistrationButton = styled(Button)`
    text-transform: none;
    background: #41431B;
    color: #fff;
    height: 48px;
    border-radius: 2px;
    margin-top: 20px;
`;

const CancelButton = styled(Button)`
    text-transform: none;
    background: #E3DBBB;
    color: #41431B;
    height: 48px;
    border-radius: 2px;
    margin-top: 20px;
    margin-right: 10px;
`;

const Text = styled(Typography)`
    color: #878787;
    font-size: 12px;
`;

const Error = styled(Typography)`
    font-size: 10px;
    color: #ff6161;
    line-height: 1;
    margin-top: 10px;
    font-weight: 600;
`;

const Success = styled(Typography)`
    font-size: 12px;
    color: #388e3c;
    line-height: 1;
    margin-top: 10px;
    font-weight: 600;
`;

const Wrapper = styled(Box)`
    padding: 25px 35px;
    display: flex;
    flex: 1;
    overflow: auto;
    flex-direction: column;
    & > div, & > button, & > p {
        margin-top: 20px;
    }
`;

const Image = styled(Box)`
    background: #41431B url(https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/login_img_c4a81e.png) center 85% no-repeat;
    width: 100%;
    height: 200px;
    padding: 45px 35px;
    & > p, & > h5 {
        color: #FFFFFF;
        font-weight: 600;
    }
`;

const FieldRow = styled(Box)`
    display: flex;
    gap: 20px;
    & > div {
        flex: 1;
    }
`;

const sellerInitialValues = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    shopName: '',
    shopDescription: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'India',
    gstNumber: '',
    panNumber: '',
    businessType: 'Sole Proprietor',
    bankAccountNumber: '',
    bankName: '',
    bankIFSC: '',
    accountHolderName: ''
};

const steps = ['Personal Info', 'Shop Details', 'Address', 'Business Info', 'Bank Details'];

const SellerDialog = ({ open, setOpen }) => {
    const [activeStep, setActiveStep] = useState(0);
    const [sellerData, setSellerData] = useState(sellerInitialValues);
    const [error, showError] = useState('');
    const [success, showSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSellerData({
            ...sellerData,
            [name]: value
        });
        showError('');
    };

    const validateStep = () => {
        switch (activeStep) {
            case 0:
                if (!sellerData.firstName || !sellerData.lastName || !sellerData.email || !sellerData.phone || !sellerData.password) {
                    showError('Please fill all personal information fields');
                    return false;
                }
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(sellerData.email)) {
                    showError('Please enter a valid email');
                    return false;
                }
                break;
            case 1:
                if (!sellerData.shopName) {
                    showError('Please enter shop name');
                    return false;
                }
                break;
            case 2:
                if (!sellerData.addressLine1 || !sellerData.city || !sellerData.state || !sellerData.postalCode) {
                    showError('Please fill all address fields');
                    return false;
                }
                break;
            case 3:
                if (!sellerData.gstNumber || !sellerData.panNumber || !sellerData.businessType) {
                    showError('Please fill all business information');
                    return false;
                }
                break;
            case 4:
                if (!sellerData.bankAccountNumber || !sellerData.bankName || !sellerData.bankIFSC || !sellerData.accountHolderName) {
                    showError('Please fill all bank details');
                    return false;
                }
                break;
            default:
                break;
        }
        return true;
    };

    const handleNext = () => {
        if (validateStep()) {
            setActiveStep((prevStep) => prevStep + 1);
        }
    };

    const handleBack = () => {
        setActiveStep((prevStep) => prevStep - 1);
    };

    const handleRegister = async () => {
        if (!validateStep()) return;

        setLoading(true);
        try {
            const response = await registerSellerAPI(sellerData);
            if (response) {
                showSuccess('Registration successful! Your account is under verification. You will receive a confirmation email shortly.');
                setTimeout(() => {
                    handleClose();
                }, 2000);
            }
        } catch (err) {
            showError(err.message || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        setOpen(false);
        setActiveStep(0);
        setSellerData(sellerInitialValues);
        showError('');
        showSuccess('');
    };

    return (
        <Dialog open={open} onClose={handleClose} PaperProps={{ sx: { maxWidth: 'unset' } }}>
            <Component>
                <Image>
                    <Typography variant="h5">Become a CandyShop Seller</Typography>
                    <Typography style={{ marginTop: 20 }}>Grow your business with our seller platform</Typography>
                </Image>

                <StepperContainer>
                    <Stepper activeStep={activeStep}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                </StepperContainer>

                <Wrapper>
                    {/* Step 0: Personal Information */}
                    {activeStep === 0 && (
                        <>
                            <TextField
                                fullWidth
                                variant="outlined"
                                name='firstName'
                                label='First Name'
                                value={sellerData.firstName}
                                onChange={handleInputChange}
                                placeholder='Enter your first name'
                            />
                            <TextField
                                fullWidth
                                variant="outlined"
                                name='lastName'
                                label='Last Name'
                                value={sellerData.lastName}
                                onChange={handleInputChange}
                                placeholder='Enter your last name'
                            />
                            <TextField
                                fullWidth
                                variant="outlined"
                                name='email'
                                label='Email Address'
                                type='email'
                                value={sellerData.email}
                                onChange={handleInputChange}
                                placeholder='Enter your email'
                            />
                            <TextField
                                fullWidth
                                variant="outlined"
                                name='phone'
                                label='Phone Number'
                                value={sellerData.phone}
                                onChange={handleInputChange}
                                placeholder='Enter your 10-digit phone number'
                            />
                            <TextField
                                fullWidth
                                variant="outlined"
                                name='password'
                                label='Password'
                                type='password'
                                value={sellerData.password}
                                onChange={handleInputChange}
                                placeholder='Create a strong password'
                            />
                        </>
                    )}

                    {/* Step 1: Shop Details */}
                    {activeStep === 1 && (
                        <>
                            <TextField
                                fullWidth
                                variant="outlined"
                                name='shopName'
                                label='Shop Name'
                                value={sellerData.shopName}
                                onChange={handleInputChange}
                                placeholder='Enter your shop name'
                            />
                            <TextField
                                fullWidth
                                variant="outlined"
                                multiline
                                rows={4}
                                name='shopDescription'
                                label='Shop Description'
                                value={sellerData.shopDescription}
                                onChange={handleInputChange}
                                placeholder='Describe your shop and products'
                            />
                        </>
                    )}

                    {/* Step 2: Address */}
                    {activeStep === 2 && (
                        <>
                            <TextField
                                fullWidth
                                variant="outlined"
                                name='addressLine1'
                                label='Address Line 1'
                                value={sellerData.addressLine1}
                                onChange={handleInputChange}
                                placeholder='Street address'
                            />
                            <TextField
                                fullWidth
                                variant="outlined"
                                name='addressLine2'
                                label='Address Line 2 (Optional)'
                                value={sellerData.addressLine2}
                                onChange={handleInputChange}
                                placeholder='Apartment, suite, etc.'
                            />
                            <FieldRow>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    name='city'
                                    label='City'
                                    value={sellerData.city}
                                    onChange={handleInputChange}
                                />
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    name='state'
                                    label='State'
                                    value={sellerData.state}
                                    onChange={handleInputChange}
                                />
                            </FieldRow>
                            <FieldRow>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    name='postalCode'
                                    label='Postal Code'
                                    value={sellerData.postalCode}
                                    onChange={handleInputChange}
                                />
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    name='country'
                                    label='Country'
                                    value={sellerData.country}
                                    disabled
                                />
                            </FieldRow>
                        </>
                    )}

                    {/* Step 3: Business Information */}
                    {activeStep === 3 && (
                        <>
                            <TextField
                                fullWidth
                                variant="outlined"
                                name='gstNumber'
                                label='GST Number'
                                value={sellerData.gstNumber}
                                onChange={handleInputChange}
                                placeholder='Enter your 15-digit GST number'
                            />
                            <TextField
                                fullWidth
                                variant="outlined"
                                name='panNumber'
                                label='PAN Number'
                                value={sellerData.panNumber}
                                onChange={handleInputChange}
                                placeholder='Enter your 10-character PAN'
                            />
                            <Select
                                fullWidth
                                name='businessType'
                                value={sellerData.businessType}
                                onChange={handleInputChange}
                                variant="outlined"
                            >
                                <MenuItem value='Sole Proprietor'>Sole Proprietor</MenuItem>
                                <MenuItem value='Partnership'>Partnership</MenuItem>
                                <MenuItem value='Company'>Company</MenuItem>
                                <MenuItem value='Individual'>Individual</MenuItem>
                            </Select>
                        </>
                    )}

                    {/* Step 4: Bank Details */}
                    {activeStep === 4 && (
                        <>
                            <TextField
                                fullWidth
                                variant="outlined"
                                name='accountHolderName'
                                label='Account Holder Name'
                                value={sellerData.accountHolderName}
                                onChange={handleInputChange}
                            />
                            <TextField
                                fullWidth
                                variant="outlined"
                                name='bankAccountNumber'
                                label='Bank Account Number'
                                value={sellerData.bankAccountNumber}
                                onChange={handleInputChange}
                                placeholder='Enter your account number'
                            />
                            <TextField
                                fullWidth
                                variant="outlined"
                                name='bankName'
                                label='Bank Name'
                                value={sellerData.bankName}
                                onChange={handleInputChange}
                                placeholder='e.g., ICICI Bank, SBI'
                            />
                            <TextField
                                fullWidth
                                variant="outlined"
                                name='bankIFSC'
                                label='Bank IFSC Code'
                                value={sellerData.bankIFSC}
                                onChange={handleInputChange}
                                placeholder='e.g., ICIC0000001'
                            />
                        </>
                    )}

                    {error && <Error>{error}</Error>}
                    {success && <Success>{success}</Success>}

                    <Text>By registering, you agree to CandyShop's Seller Terms & Conditions and Privacy Policy.</Text>

                    {/* Navigation Buttons */}
                    <Box style={{ display: 'flex', justifyContent: 'space-between', marginTop: 20 }}>
                        <Box>
                            <CancelButton onClick={handleBack} disabled={activeStep === 0}>
                                Back
                            </CancelButton>
                        </Box>
                        <Box>
                            {activeStep === steps.length - 1 ? (
                                <RegistrationButton
                                    onClick={handleRegister}
                                    disabled={loading}
                                >
                                    {loading ? 'Registering...' : 'Register as Seller'}
                                </RegistrationButton>
                            ) : (
                                <RegistrationButton onClick={handleNext}>
                                    Next
                                </RegistrationButton>
                            )}
                            <CancelButton onClick={handleClose} style={{ marginLeft: 10 }}>
                                Cancel
                            </CancelButton>
                        </Box>
                    </Box>
                </Wrapper>
            </Component>
        </Dialog>
    );
};

export default SellerDialog;
