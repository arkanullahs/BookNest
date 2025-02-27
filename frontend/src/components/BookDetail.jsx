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

const BookDetail = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [favorite, setFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState('details');

  // Mock data for related books
  const relatedBooks = [
    {
      id: 3,
      img: "https://res.cloudinary.com/dgqe5xli6/image/upload/v1737738859/image_1_aln1qm.png",
      title: "Terrible Madness",
      author: "Unknown Author",
      price: 45.40,
      originalPrice: 59.90,
      rating: 4.7,
      reviewCount: 264,
      category: ["THRILLER", "DRAMA", "HORROR"]
    },
    {
      id: 6,
      img: "https://res.cloudinary.com/dgqe5xli6/image/upload/v1737738729/image_rooxq2.png",
      title: "Battle Drive",
      author: "Mike Johnson",
      price: 45.40,
      originalPrice: 59.90,
      rating: 4.7,
      reviewCount: 264,
      category: ["THRILLER", "DRAMA", "HORROR"]
    },
  ];

  // Mock review data
  const reviewStats = {
    average: 4.7,
    total: 5,
    distribution: [
      { stars: 5, percentage: 80, count: '80%' },
      { stars: 4, percentage: 61, count: '61%' },
      { stars: 3, percentage: 12, count: '12%' },
      { stars: 2, percentage: 9, count: '9%' },
      { stars: 1, percentage: 8, count: '8%' },
    ]
  };

  // Mock data for a specific book
  const mockBookData = {
    id: 2,
    img: "https://res.cloudinary.com/dgqe5xli6/image/upload/v1737738729/image_rooxq2.png",
    title: "ALL GOOD NEWS",
    author: "Kevin Smiley",
    price: 15.63,
    originalPrice: 16.99,
    rating: 4.0,
    reviewCount: 235,
    likes: 456,
    publisher: "Printarea Studios",
    year: 2019,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    longDescription: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem.",
    discount: "2%",
    inStock: true,
    freeShipping: true,
    category: ["BIOGRAPHY"]
  };

  // Fetch book details from API
  useEffect(() => {
    // API call would go here
    // fetch(`/api/books/${id}`)
    //   .then(response => response.json())
    //   .then(data => setBook(data))
    //   .catch(error => {
    //     console.error('Error fetching book details:', error);
    //     setBook(mockBookData);
    //   });

    // Using mock data for now
    setBook(mockBookData);
  }, [id]);

  if (!book) {
    return <div>Loading...</div>;
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
              src={book.img}
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
              <Rating value={book.rating} readOnly precision={0.1} />
              <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                {book.rating.toFixed(1)}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mx: 1 }}>
                {book.reviewCount} Reviews
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', ml: 1 }}>
                <ThumbUpIcon fontSize="small" color="primary" sx={{ mr: 0.5 }} />
                <Typography variant="body2" color="text.secondary">
                  {book.likes} Like
                </Typography>
              </Box>
            </Box>

            <Typography variant="body1" paragraph>
              {book.description}
            </Typography>

            <Typography variant="body1" paragraph>
              {book.longDescription}
            </Typography>

            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid item xs={12} sm={4}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
                    Written by:
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
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
                    {book.publisher}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
                    Year:
                  </Typography>
                  <Typography variant="body2" fontWeight="medium">
                    {book.year}
                  </Typography>
                </Box>
              </Grid>
            </Grid>

            <Divider sx={{ my: 3 }} />

            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
              <Box>
                <Typography variant="h5" component="span" fontWeight="bold" color="primary">
                  ${book.price.toFixed(2)}
                </Typography>
                <Typography variant="body1" component="span" sx={{ textDecoration: 'line-through', ml: 2 }}>
                  ${book.originalPrice.toFixed(2)}
                </Typography>
                <Chip label={book.discount} size="small" color="error" sx={{ ml: 1 }} />
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {book.freeShipping && (
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
                )}
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

        {/* Tabs section */}
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
              <Typography
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
              </Typography>
            </Box>
          </Box>

          {activeTab === 'details' && (
            <Box sx={{ py: 3 }}>
              <Typography variant="h6" gutterBottom>Rating Information</Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam."
              </Typography>
            </Box>
          )}

          {activeTab === 'reviews' && (
            <Box sx={{ py: 3 }}>
              <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom>Rating Distribution</Typography>
                  
                  {reviewStats.distribution.map((item) => (
                    <Box key={item.stars} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Typography variant="body2" sx={{ width: 20 }}>
                        {item.stars}
                      </Typography>
                      <LinearProgress 
                        variant="determinate" 
                        value={item.percentage} 
                        sx={{ mx: 1, flexGrow: 1, height: 8, borderRadius: 1 }} 
                      />
                      <Typography variant="body2" sx={{ width: 40 }}>
                        {item.count}
                      </Typography>
                    </Box>
                  ))}
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 3 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <Typography variant="h4" fontWeight="bold">
                        {reviewStats.average}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        out of {reviewStats.total}
                      </Typography>
                    </Box>
                    <Rating value={reviewStats.average} readOnly precision={0.1} size="large" />
                  </Box>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6">Showing 4 of 20 reviews</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography variant="body2" sx={{ mr: 1 }}>
                        Newest
                      </Typography>
                      <SortIcon fontSize="small" />
                    </Box>
                  </Box>
                  
                  <Box sx={{ mb: 3, display: 'flex', alignItems: 'flex-start' }}>
                    <Box
                      component="img"
                      src="https://via.placeholder.com/50"
                      alt="David Here"
                      sx={{ width: 50, height: 50, borderRadius: '50%', mr: 2 }}
                    />
                    <Box>
                      <Typography variant="subtitle1" fontWeight="medium">
                        David Here
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Jan 4th, 2020
                      </Typography>
                      <Rating value={4} readOnly size="small" sx={{ mb: 1 }} />
                      <Typography variant="body1">
                        Great book, highly recommend!
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          )}
        </Box>

        {/* Related books section */}
        <Box sx={{ mt: 6 }}>
          <Typography variant="h5" gutterBottom>
            Related Books
          </Typography>
          <Grid container spacing={3}>
            {relatedBooks.map((book) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={book.id}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardMedia
                    component="img"
                    image={book.img}
                    alt={book.title}
                    sx={{ height: 200 }}
                  />
                  <CardContent>
                    <Typography variant="h6" component="div">
                      {book.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {book.category.join(', ')}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Rating value={book.rating} readOnly size="small" />
                      <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                        {book.reviewCount} reviews
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="h6" color="primary">
                        ${book.price.toFixed(2)}
                        <Typography variant="caption" component="span" sx={{ textDecoration: 'line-through', ml: 1 }}>
                          ${book.originalPrice.toFixed(2)}
                        </Typography>
                      </Typography>
                      <Button 
                        variant="outlined" 
                        size="small"
                      >
                        Add to cart
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default BookDetail;

// Missing imports that would need to be added at the top
// import ThumbUpIcon from '@mui/icons-material/ThumbUp';
// import LocalShippingIcon from '@mui/icons-material/LocalShipping';
// import CheckCircleIcon from '@mui/icons-material/CheckCircle';
 //import SortIcon from '@mui/icons-material