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

const Books = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState(0);
  const [view, setView] = useState('grid');
  const [favorites, setFavorites] = useState({});
  const [books, setBooks] = useState([]);

  // Mock data in case API fails
  const mockBooks = [
    {
      id: 1,
      img: "https://res.cloudinary.com/dgqe5xli6/image/upload/v1737738857/image_3_jgpfi8.png",
      title: "Like A Summer",
      author: "John Stroud",
      price: 19.99,
      originalPrice: 24.99,
      rating: 4,
      category: ["ADVENTURE", "SCIENCE", "COMEDY"]
    },
    {
      id: 2,
      img: "https://res.cloudinary.com/dgqe5xli6/image/upload/v1737738729/image_rooxq2.png",
      title:"Think Like A Monk" ,
      author: "Kevin Smiley",
      price: 15.63,
      originalPrice: 16.99,
      rating: 4,
      category: ["BIOGRAPHY"]
    },
    {
      id: 3,
      img: "https://res.cloudinary.com/dgqe5xli6/image/upload/v1737738859/image_1_aln1qm.png",
      title: "Shatter Me",
      author: "Tahereh Mafi",
      price: 54.78,
      originalPrice: 70.00,
      rating: 4.7,
      category: ["THRILLER", "DRAMA", "HORROR"]
    },
    {
      id: 4,
      img: "https://res.cloudinary.com/dgqe5xli6/image/upload/v1737738858/image_2_yilukz.png",
      title: "12 Rules Of Love",
      author: "Jay Shetty",
      price: 24.50,
      originalPrice: 29.99,
      rating: 3,
      category: ["ADVENTURE"]
    },
    {
      id: 5,
      img: "https://res.cloudinary.com/dgqe5xli6/image/upload/v1737738857/image_3_jgpfi8.png",
      title: "A Heavy Lift",
      author: "David Miller",
      price: 22.75,
      originalPrice: 27.99,
      rating: 4,
      category: ["HORROR", "DRAMA"]
    },
    {
      id: 6,
      img: "https://res.cloudinary.com/dgqe5xli6/image/upload/v1737738729/image_rooxq2.png",
      title: "Battle Drive",
      author: "Mike Johnson",
      price: 45.40,
      originalPrice: 59.99,
      rating: 3,
      category: ["RACING", "DRAMA"]
    },
    {
      id: 7,
      img: "https://res.cloudinary.com/dgqe5xli6/image/upload/v1737738859/image_1_aln1qm.png",
      title: "Take Out Tango",
      author: "Sarah Wilson",
      price: 18.25,
      originalPrice: 21.99,
      rating: 3,
      category: ["SPORTS", "DRAMA"]
    },
    {
      id: 8,
      img: "https://res.cloudinary.com/dgqe5xli6/image/upload/v1737738858/image_2_yilukz.png",
      title: "Pushing Clouds",
      author: "Lisa Jackson",
      price: 14.99,
      originalPrice: 19.99,
      rating: 2,
      category: ["DRAMA", "COMEDY"]
    }
  ];

  // Fetch books from API
  useEffect(() => {
    // API call would go here
    // fetch('/api/books')
    //   .then(response => response.json())
    //   .then(data => setBooks(data))
    //   .catch(error => {
    //     console.error('Error fetching books:', error);
    //     setBooks(mockBooks);
    //   });

    // Using mock data for now
    setBooks(mockBooks);
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
          {filteredBooks.map((book) => (
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
                  image={book.img}
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
                    {book.category.join(', ')}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'center', mb: 1 }}>
                    <Rating name={`rating-${book.id}`} value={book.rating} readOnly precision={0.5} size="small" />
                  </Box>
                  { 
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <Typography variant="h6" color="primary" fontWeight="bold">
                        $ {book.price.toFixed(2)}
                        <Typography variant="body2" component="span" sx={{ textDecoration: 'line-through', ml: 1 }}>
                          ${book.originalPrice.toFixed(2)}
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
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default Books;