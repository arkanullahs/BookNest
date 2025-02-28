import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  Typography,
  Divider,
  Box,
  FormControlLabel,
  Checkbox,
  RadioGroup,
  Radio,
  FormControl,
  FormLabel,
  Stepper,
  Step,
  StepLabel,
  Paper,
  IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import PaymentIcon from '@mui/icons-material/Payment';
import { Link } from 'react-router-dom';

const CheckoutForm = ({ open, onClose, book, quantity }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    paymentMethod: 'creditCard',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    termsAgreed: false
  });

  const steps = ['Customer Information', 'Shipping Details', 'Payment'];

  const handleInputChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'termsAgreed' ? checked : value
    });
  };

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Process order - would send data to backend
    console.log('Order submitted:', { formData, book, quantity });
    // Close dialog and maybe show confirmation
    onClose();
  };

  // Check if required fields for current step are filled
  const isStepComplete = () => {
    if (activeStep === 0) {
      return formData.firstName && formData.lastName && formData.email && formData.phone;
    } else if (activeStep === 1) {
      return formData.address && formData.city && formData.state && formData.zipCode;
    } else if (activeStep === 2) {
      if (formData.paymentMethod === 'creditCard') {
        return formData.cardNumber && formData.cardName && formData.expiryDate && formData.cvv && formData.termsAgreed;
      }
      return formData.termsAgreed;
    }
    return false;
  };

  const totalPrice = book ? (book.price * quantity).toFixed(2) : 0;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      aria-labelledby="checkout-dialog-title"
    >
      <DialogTitle id="checkout-dialog-title" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h5">Checkout</Typography>
        <IconButton edge="end" color="inherit" onClick={onClose} aria-label="close">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      
      <Divider />
      
      <DialogContent>
        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <form onSubmit={handleSubmit}>
              {activeStep === 0 && (
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom>Customer Information</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      label="First Name"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      label="Last Name"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      label="Email Address"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      label="Phone Number"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </Grid>
                </Grid>
              )}

              {activeStep === 1 && (
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom>Shipping Details</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      label="Address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      label="City"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      label="State/Province"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      label="ZIP / Postal code"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                    />
                  </Grid>
                </Grid>
              )}

              {activeStep === 2 && (
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom>Payment Method</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl component="fieldset">
                      <RadioGroup
                        name="paymentMethod"
                        value={formData.paymentMethod}
                        onChange={handleInputChange}
                      >
                        <Paper variant="outlined" sx={{ mb: 2, p: 2 }}>
                          <FormControlLabel 
                            value="creditCard" 
                            control={<Radio />} 
                            label={
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <CreditCardIcon sx={{ mr: 1 }} />
                                <Typography>Credit Card</Typography>
                              </Box>
                            } 
                          />
                        </Paper>
                        
                        <Paper variant="outlined" sx={{ mb: 2, p: 2 }}>
                          <FormControlLabel 
                            value="bankTransfer" 
                            control={<Radio />} 
                            label={
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <AccountBalanceIcon sx={{ mr: 1 }} />
                                <Typography>Bank Transfer</Typography>
                              </Box>
                            } 
                          />
                        </Paper>
                        
                        <Paper variant="outlined" sx={{ mb: 2, p: 2 }}>
                          <FormControlLabel 
                            value="COD" 
                            control={<Radio />} 
                            label={
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <PaymentIcon sx={{ mr: 1 }} />
                                <Typography>Cash On Delevary</Typography>
                              </Box>
                            } 
                          />
                        </Paper>
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                  
                  {formData.paymentMethod === 'creditCard' && (
                    <>
                      <Grid item xs={12}>
                        <TextField
                          required
                          fullWidth
                          label="Card Number"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          placeholder="XXXX XXXX XXXX XXXX"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          required
                          fullWidth
                          label="Name on Card"
                          name="cardName"
                          value={formData.cardName}
                          onChange={handleInputChange}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          required
                          fullWidth
                          label="Expiry Date"
                          name="expiryDate"
                          value={formData.expiryDate}
                          onChange={handleInputChange}
                          placeholder="MM/YY"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          required
                          fullWidth
                          label="CVV"
                          name="cvv"
                          value={formData.cvv}
                          onChange={handleInputChange}
                          placeholder="XXX"
                        />
                      </Grid>
                    </>
                  )}
                  
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="termsAgreed"
                          checked={formData.termsAgreed}
                          onChange={handleInputChange}
                          color="primary"
                          required
                        />
                      }
                      label={
                        <Typography variant="body2">
                          I agree to the{' '}
                          <Link href="#" color="primary">
                            Terms and Conditions
                          </Link>{' '}
                          and{' '}
                          <Link href="#" color="primary">
                            Privacy Policy
                          </Link>
                        </Typography>
                      }
                    />
                  </Grid>
                </Grid>
              )}
            </form>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Paper variant="outlined" sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>Order Summary</Typography>
              
              {book && (
                <Box sx={{ display: 'flex', mb: 2 }}>
                  <Box
                    component="img"
                    src={book.img}
                    alt={book.title}
                    sx={{ width: 70, height: 100, objectFit: 'cover', borderRadius: 1, mr: 2 }}
                  />
                  <Box>
                    <Typography variant="subtitle1" gutterBottom>
                      {book.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      by {book.author}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      Quantity: {quantity}
                    </Typography>
                  </Box>
                </Box>
              )}
              
              <Divider sx={{ my: 2 }} />
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body1">Subtotal:</Typography>
                <Typography variant="body1">${totalPrice}</Typography>
              </Box>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body1">Shipping:</Typography>
                <Typography variant="body1">
                  {book && book.freeShipping ? 'Free' : '$4.99'}
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body1">Tax:</Typography>
                <Typography variant="body1">${(totalPrice * 0.08).toFixed(2)}</Typography>
              </Box>
              
              <Divider sx={{ my: 2 }} />
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="h6">Total:</Typography>
                <Typography variant="h6" color="primary">
                  ${book && book.freeShipping 
                    ? (parseFloat(totalPrice) + parseFloat(totalPrice) * 0.08).toFixed(2)
                    : (parseFloat(totalPrice) + 4.99 + parseFloat(totalPrice) * 0.08).toFixed(2)
                  }
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </DialogContent>
      
      <Divider />
      
      <DialogActions sx={{ p: 2, justifyContent: 'space-between' }}>
        <Button 
          onClick={onClose}
          variant="outlined"
        >
          Cancel
        </Button>
        
        <Box>
          {activeStep > 0 && (
            <Button onClick={handleBack} sx={{ mr: 1 }}>
              Back
            </Button>
          )}
          
          {activeStep < steps.length - 1 ? (
            <Button 
              onClick={handleNext}
              variant="contained"
              disabled={!isStepComplete()}
            >
              Next
            </Button>
          ) : (
            <Button 
              type="submit"
              variant="contained"
              color="primary"
              disabled={!isStepComplete()}
              onClick={handleSubmit}
            >
              Place Order
            </Button>
          )}
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default CheckoutForm;