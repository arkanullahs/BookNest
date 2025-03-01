import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Typography,
  Rating,
  Box,
  Button,
  IconButton,
  Divider,
  LinearProgress,
  Card,
  CardMedia,
  CardContent,
  Breadcrumbs,
  Link,
  Badge,
  Chip
} from '@mui/material';
import { useParams, Link as RouterLink } from 'react-router-dom';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import Navbar from './navbar';
import Footer from './footer';
import CheckoutForm from './CheckoutForm';
import axios from 'axios'; // Import axios

const API_BASE_URL = 'http://localhost:8000/api'; // **IMPORTANT**: Replace with your actual backend API URL

const BookDetail = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [favorite, setFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState('details');
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null);     // Add error state

  // Fetch book details from API
  useEffect(() => {
    const fetchBookDetail = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`${API_BASE_URL}/books/${id}`); // Use dynamic book ID from useParams
        setBook(response.data.book); // Assuming your API response wraps book data in 'book' property
      } catch (error) {
        setError(error);
        console.error('Error fetching book details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetail();
  }, [id]); // Re-fetch book detail when id in params changes

  if (loading) {
    return <LinearProgress />; // Show loading indicator while fetching
  }

  if (error) {
    return <Typography color="error">Error loading book details: {error.message}</Typography>; // Show error message
  }

  if (!book) {
    return <div>Book not found</div>; // Handle case where book is not found (e.g., invalid id)
  }

  const handleQuantityChange = (amount) => {
    const newQuantity = quantity + amount;
    if (newQuantity > 0) {
      setQuantity(newQuantity);
    }
  };

  const handleFavoriteToggle = () => {
    setFavorite(!favorite);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleCheckoutOpen = () => {
    setCheckoutOpen(true);
  };

  const handleCheckoutClose = () => {
    setCheckoutOpen(false);
  };

  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
        {/* Breadcrumbs */}
        <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 3 }}>
          <Link component={RouterLink} to="/" color="inherit">
            Home
          </Link>
          <Link component={RouterLink} to="/books" color="inherit">
            Books
          </Link>
          <Typography color="text.primary">{book.title}</Typography>
        </Breadcrumbs>

        {/* Book details section */}
        <Grid container spacing={4}>
          {/* Book cover */}
          <Grid item xs={12} md={4}>
            <Box
              component="img"
              src={book.cover_image} // Use book.cover_image from API response
              alt={book.title}
              sx={{
                width: '100%',
                borderRadius: 2,
                boxShadow: 3,
                mb: 2
              }}
            />
          </Grid>

          {/* Book information */}
          <Grid item xs={12} md={8}>
            <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
              {book.title}
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              {/*  Rating component - adjust value if rating is provided in API response */}
              {/*  If your backend API provides average_rating, use book.average_rating */}
              {/* <Rating value={book.average_rating || 0} readOnly precision={0.1} />
                            <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                                {book.average_rating ? book.average_rating.toFixed(1) : 'No ratings'}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mx: 1 }}>
                                {book.comments_count || 0} Reviews {/* Assuming comment counts are available */}
              {/* </Typography> */}
              {/* Likes are not assumed to be in API response for single book, remove if not needed */}
              {/* <Box sx={{ display: 'flex', alignItems: 'center', ml: 1 }}>
                                <ThumbUpIcon fontSize="small" color="primary" sx={{ mr: 0.5 }} />
                                <Typography variant="body2" color="text.secondary">
                                    {book.likes || 0} Like {/* Assuming likes are provided */}
              {/* </Typography>
                            {/* </Box> */}
            </Box>

            <Typography variant="body1" paragraph>
              {book.description}
            </Typography>

            {/* Long description is not assumed to be in API response, remove if not available */}
            {/* <Typography variant="body1" paragraph>
                            {book.longDescription}
                        </Typography> */}

            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid item xs={12} sm={4}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
                    Written by:
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {/* Assuming author image is not directly provided, placeholder used */}
                    <Box
                      component="img"
                      src="https://via.placeholder.com/30"
                      alt={book.author}
                      sx={{ width: 30, height: 30, borderRadius: '50%', mr: 1 }}
                    />
                    <Typography variant="body2" fontWeight="medium">
                      {book.author}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
                    Publisher:
                  </Typography>
                  <Typography variant="body2" fontWeight="medium">
                    {book.publisher?.name} {/* Assuming publisher is nested in API response */}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
                    Published Year:
                  </Typography>
                  <Typography variant="body2" fontWeight="medium">
                    {book.published_year}
                  </Typography>
                </Box>
              </Grid>
            </Grid>

            <Divider sx={{ my: 3 }} />

            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
              <Box>
                <Typography variant="h5" component="span" fontWeight="bold" color="primary">
                  $ {parseFloat(book.price).toFixed(2)}
                </Typography>
                {/* Original price and discount are not assumed to be in API response, remove if not needed */}
                {/* <Typography variant="body1" component="span" sx={{ textDecoration: 'line-through', ml: 2 }}>
                                    ${book.originalPrice.toFixed(2)}
                                </Typography>
                                <Chip label={book.discount} size="small" color="error" sx={{ ml: 1 }} /> */}
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {/* Free shipping and in stock are not assumed in API response, remove if not needed */}
                {/* {book.freeShipping && (
                                    <Chip
                                        icon={<LocalShippingIcon />}
                                        label="FREE SHIPPING"
                                        color="primary"
                                        variant="outlined"
                                        size="small"
                                        sx={{ mr: 1 }}
                                    />
                                )}
                                {book.inStock && (
                                    <Chip
                                        icon={<CheckCircleIcon />}
                                        label="IN STOCK"
                                        color="success"
                                        variant="outlined"
                                        size="small"
                                    />
                                )} */}
              </Box>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', border: 1, borderColor: 'divider', borderRadius: 1, mr: 2 }}>
                <IconButton onClick={() => handleQuantityChange(-1)} size="small">
                  <RemoveIcon />
                </IconButton>
                <Typography sx={{ mx: 2 }}>{quantity}</Typography>
                <IconButton onClick={() => handleQuantityChange(1)} size="small">
                  <AddIcon />
                </IconButton>
              </Box>

              <Button variant="contained" color="primary" sx={{ mr: 2, px: 4 }}>
                Add to cart
              </Button>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#0A1929",  // Dark blue
                  mr: 2,
                  px: 4,
                  '&:hover': { backgroundColor: '#061120' } // Slightly darker shade on hover
                }}
                onClick={handleCheckoutOpen}
              >
                Buy Now
              </Button>

              <IconButton onClick={handleFavoriteToggle}>
                {favorite ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
              </IconButton>
            </Box>

            <Box sx={{ display: 'flex', mb: 3 }}>
              <Typography variant="body2" sx={{ mr: 2 }}>Share:</Typography>
              <IconButton size="small" color="primary" sx={{ mr: 1 }}>
                <FacebookIcon />
              </IconButton>
              <IconButton size="small" color="info" sx={{ mr: 1 }}>
                <TwitterIcon />
              </IconButton>
              <IconButton size="small" color="success" sx={{ mr: 1 }}>
                <WhatsAppIcon />
              </IconButton>
              <IconButton size="small" color="action">
                <EmailIcon />
              </IconButton>
            </Box>
          </Grid>
        </Grid>

        {/* Tabs section - Details and Reviews, Reviews tab content is removed for now */}
        <Box sx={{ mt: 6, mb: 4 }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Box sx={{ display: 'flex' }}>
              <Typography
                variant="h6"
                component="button"
                onClick={() => handleTabChange('details')}
                sx={{
                  py: 2,
                  px: 4,
                  border: 'none',
                  background: 'none',
                  cursor: 'pointer',
                  fontWeight: activeTab === 'details' ? 'bold' : 'regular',
                  borderBottom: activeTab === 'details' ? 2 : 0,
                  borderColor: activeTab === 'details' ? 'primary.main' : 'transparent'
                }}
              >
                Details Product
              </Typography>
              {/* Reviews tab is kept, but content is removed for now */}
              {/* <Typography
                                variant="h6"
                                component="button"
                                onClick={() => handleTabChange('reviews')}
                                sx={{
                                    py: 2,
                                    px: 4,
                                    border: 'none',
                                    background: 'none',
                                    cursor: 'pointer',
                                    fontWeight: activeTab === 'reviews' ? 'bold' : 'regular',
                                    borderBottom: activeTab === 'reviews' ? 2 : 0,
                                    borderColor: activeTab === 'reviews' ? 'primary.main' : 'transparent'
                                }}
                            >
                                Customer Reviews
                            </Typography> */}
            </Box>
          </Box>

          {activeTab === 'details' && (
            <Box sx={{ py: 3 }}>
              <Typography variant="h6" gutterBottom>Book Information</Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                {book.description} {/* Display book description again in details tab */}
              </Typography>
            </Box>
          )}

          {/* Reviews tab content removed for now */}
          {/* {activeTab === 'reviews' && (
                        <Box sx={{ py: 3 }}>
                            Customer reviews content would go here (if implemented)
                        </Box>
                    )} */}
        </Box>

        {/* Related books section - Removed for now */}
        {/* <Box sx={{ mt: 6 }}>
                    <Typography variant="h5" gutterBottom>
                        Related Books
                    </Typography>
                    <Grid container spacing={3}>
                        {relatedBooks.map((book) => (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={book.id}>
                                </Grid>
                        ))}
                    </Grid>
                </Box> */}
      </Container>
      <Footer />
      <CheckoutForm
        open={checkoutOpen}
        onClose={handleCheckoutClose}
        book={book}
        quantity={quantity}
      />
    </>
  );
};

export default BookDetail;