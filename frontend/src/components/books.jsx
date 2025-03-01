import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Tab,
  Tabs,
  Box,
  Rating,
  Button,
  ToggleButtonGroup,
  ToggleButton
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ViewListIcon from '@mui/icons-material/ViewList';
import SortIcon from '@mui/icons-material/Sort';
import Navbar from './navbar';
import Footer from './footer';
import axios from 'axios'; // Import axios for API calls

const API_BASE_URL = 'http://localhost:8000/api'; // **IMPORTANT**: Replace with your actual backend API URL

const Books = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState(0);
  const [view, setView] = useState('grid');
  const [favorites, setFavorites] = useState({});
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null);     // Add error state

  // Fetch books from API
  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true); // Start loading
      setError(null);     // Clear any previous errors
      try {
        const response = await axios.get(`${API_BASE_URL}/books`); // Make API call
        setBooks(response.data.data); // **Corrected:** setBooks(response.data.data) -> setBooks(response.data.data)
      } catch (err) {
        setError(err); // Set error state if API call fails
        console.error('Error fetching books:', err);
      } finally {
        setLoading(false); // End loading, whether success or failure
      }
    };

    fetchBooks();
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleViewChange = (event, newView) => {
    if (newView !== null) {
      setView(newView);
    }
  };

  const handleFavoriteToggle = (id) => {
    setFavorites(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleBookClick = (id) => {
    navigate(`/books/${id}`);
  };

  // Filter books based on selected tab
  const getFilteredBooks = () => {
    if (value === 0) return books; // Today
    if (value === 1) return books.filter(book => book.id % 2 === 0); // This week
    return books.filter(book => book.id % 3 === 0); // This month
  };

  const filteredBooks = getFilteredBooks();

  if (loading) {
    return <p>Loading books...</p>; // Display loading message while fetching
  }

  if (error) {
    return <p>Error loading books: {error.message}</p>; // Display error message if fetch fails
  }


  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
        <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
          Books
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Tabs value={value} onChange={handleChange} aria-label="time period tabs">
            <Tab label="Today" />
            <Tab label="This Week" />
            <Tab label="This Month" />
          </Tabs>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <ToggleButtonGroup
              value={view}
              exclusive
              onChange={handleViewChange}
              aria-label="view mode"
              size="small"
            >
              <ToggleButton value="grid" aria-label="grid view">
                <ViewModuleIcon />
              </ToggleButton>
              <ToggleButton value="list" aria-label="list view">
                <ViewListIcon />
              </ToggleButton>
            </ToggleButtonGroup>

            <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
              <Typography variant="body2" sx={{ mr: 1 }}>
                Newest
              </Typography>
              <SortIcon fontSize="small" />
            </Box>
          </Box>
        </Box>

        <Grid container spacing={3}>
          {/* Conditionally render the book list only when filteredBooks is an array and NOT loading */}
          {!loading && Array.isArray(filteredBooks) && filteredBooks.map((book) => (
            <Grid item xs={12} sm={6} md={3} key={book.id}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  cursor: 'pointer',
                  '&:hover': {
                    boxShadow: 6
                  }
                }}
                onClick={() => handleBookClick(book.id)}
              >
                <CardMedia
                  component="img"
                  image={book.cover_image} // Use book.cover_image here
                  alt={book.title}
                  sx={{
                    height: 250,
                    objectFit: 'cover',
                    borderRadius: '8px 8px 0 0'
                  }}
                />
                <IconButton
                  aria-label="add to favorites"
                  sx={{
                    position: 'absolute',
                    top: 10,
                    right: 10,
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    }
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleFavoriteToggle(book.id);
                  }}
                >
                  {favorites[book.id] ?
                    <FavoriteIcon color="primary" /> :
                    <FavoriteBorderIcon />
                  }
                </IconButton>
                <CardContent>
                  <Typography variant="h6" component="div" fontWeight="medium" align="center">
                    {book.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" align="center" gutterBottom>
                    {book.author} {/* Display author, not category for now as per backend response */}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'center', mb: 1 }}>
                    <Rating name={`rating-${book.id}`} value={book.average_rating} readOnly precision={0.5} size="small" /> {/* Use average_rating from backend response */}
                  </Box>
                  {
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <Typography variant="h6" color="primary" fontWeight="bold">
                        $ {parseFloat(book.price).toFixed(2)} {/* **Corrected**: parseFloat(book.price).toFixed(2) */}
                        <Typography variant="body2" component="span" sx={{ textDecoration: 'line-through', ml: 1 }}>
                          ${(parseFloat(book.price) * 1.2).toFixed(2)} {/* **Corrected**: parseFloat(book.price).toFixed(2) */}
                        </Typography>
                      </Typography>
                      <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: 1 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          // Add to cart logic here
                          alert('Add to cart functionality to be implemented');
                        }}
                      >
                        Add to cart
                      </Button>
                    </Box>
                  }
                </CardContent>
              </Card>
            </Grid>
          ))}
          {/* Display message if no books are found after loading */}
          {!loading && (!Array.isArray(filteredBooks) || filteredBooks.length === 0) && (
            <Grid item xs={12}>
              <Typography variant="body1">No books found.</Typography>
            </Grid>
          )}
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default Books;