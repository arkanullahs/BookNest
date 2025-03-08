import React, { useState, useEffect } from 'react';
import './CheckoutForm.css'; // You'll need to create this CSS file

const CheckoutForm = ({ book, quantity, onClose }) => {
  // State variables
  const [paymentMethod, setPaymentMethod] = useState('creditCard');
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Calculate order amounts
  const subtotal = (book?.price || 0) * quantity;
  const shipping = book?.freeShipping ? 0 : 4.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!termsAgreed) {
      setError("Please agree to the Terms and Conditions");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Get the token directly from localStorage
      const token = localStorage.getItem('token');

      if (!token) {
        throw new Error('Authentication token not found');
      }

      const response = await fetch('http://localhost:8000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          items: [
            {
              book_id: book.id,
              quantity: quantity
            }
          ]
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to place order');
      }

      const data = await response.json();
      console.log('Order successful:', data);
      setSuccess(true);

      // Close modal after delay
      setTimeout(() => {
        onClose();
        // You might want to redirect to order confirmation page here
        // window.location.href = `/orders/${data.id}`;
      }, 2000);

    } catch (err) {
      console.error('Checkout error:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="checkout-modal">
      <div className="checkout-header">
        <h2>Checkout</h2>
        <button className="close-button" onClick={onClose}>×</button>
      </div>

      {error && (
        <div className="error-message">
          {error}
          {error.includes('Authentication') && (
            <button onClick={() => window.location.href = "/login"} className="login-button">
              Log In
            </button>
          )}
        </div>
      )}

      {success && (
        <div className="success-message">
          Order placed successfully!
        </div>
      )}

      <div className="checkout-content">
        <div className="payment-section">
          <h3>Payment Method</h3>

          <div className="payment-options">
            <label className={`payment-option ${paymentMethod === 'creditCard' ? 'selected' : ''}`}>
              <input
                type="radio"
                name="paymentMethod"
                value="creditCard"
                checked={paymentMethod === 'creditCard'}
                onChange={() => setPaymentMethod('creditCard')}
              />
              <span className="radio-custom"></span>
              <span className="option-icon credit-card-icon">💳</span>
              <span className="option-label">Credit Card</span>
            </label>

            <label className={`payment-option ${paymentMethod === 'bankTransfer' ? 'selected' : ''}`}>
              <input
                type="radio"
                name="paymentMethod"
                value="bankTransfer"
                checked={paymentMethod === 'bankTransfer'}
                onChange={() => setPaymentMethod('bankTransfer')}
              />
              <span className="radio-custom"></span>
              <span className="option-icon bank-icon">🏦</span>
              <span className="option-label">Bank Transfer</span>
            </label>

            <label className={`payment-option ${paymentMethod === 'COD' ? 'selected' : ''}`}>
              <input
                type="radio"
                name="paymentMethod"
                value="COD"
                checked={paymentMethod === 'COD'}
                onChange={() => setPaymentMethod('COD')}
              />
              <span className="radio-custom"></span>
              <span className="option-icon cash-icon">💰</span>
              <span className="option-label">Cash On Delivery</span>
            </label>
          </div>

          <div className="terms-container">
            <label className="terms-label">
              <input
                type="checkbox"
                checked={termsAgreed}
                onChange={(e) => setTermsAgreed(e.target.checked)}
              />
              <span className="checkbox-custom"></span>
              <span>
                I agree to the <a href="/terms">Terms and Conditions</a> and{' '}
                <a href="/privacy">Privacy Policy</a>
              </span>
            </label>
          </div>
        </div>

        <div className="order-summary">
          <h3>Order Summary</h3>

          {book && (
            <div className="book-info">
              <img
                src={book.cover_image}
                alt={book.title}
                className="book-cover"
              />
              <div className="book-details">
                <h4>{book.title}</h4>
                <p>by {book.author}</p>
                <p>Quantity: {quantity}</p>
              </div>
            </div>
          )}

          <div className="price-breakdown">
            <div className="price-row">
              <span>Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="price-row">
              <span>Shipping:</span>
              <span>{book?.freeShipping ? 'Free' : `$${shipping.toFixed(2)}`}</span>
            </div>
            <div className="price-row">
              <span>Tax:</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="price-row total">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="checkout-actions">
        <button
          className="cancel-button"
          onClick={onClose}
          disabled={isLoading}
        >
          Cancel
        </button>
        <button
          className="place-order-button"
          onClick={handleSubmit}
          disabled={isLoading || !termsAgreed || success}
        >
          {isLoading ? 'Processing...' : 'Place Order'}
        </button>
      </div>
    </div>
  );
};

export default CheckoutForm;