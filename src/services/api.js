import axios from 'axios';

const API_KEY = 'e3ba4770c11e46c180bd5b33d72786bd';
const BASE_URL = 'https://api.rawg.io/api';

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    key: API_KEY,
  },
});

// Get games with various filters
export const getGames = async (params = {}) => {
  try {
    const response = await api.get('/games', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching games:', error);
    throw error;
  }
};

// Get specific game details
export const getGameDetails = async (id) => {
  try {
    const response = await api.get(`/games/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching game details:', error);
    throw error;
  }
};

// Get game screenshots
export const getGameScreenshots = async (id) => {
  try {
    const response = await api.get(`/games/${id}/screenshots`);
    return response.data;
  } catch (error) {
    console.error('Error fetching game screenshots:', error);
    throw error;
  }
};

// Get platforms
export const getPlatforms = async () => {
  try {
    const response = await api.get('/platforms');
    return response.data;
  } catch (error) {
    console.error('Error fetching platforms:', error);
    throw error;
  }
};

// Get genres
export const getGenres = async () => {
  try {
    const response = await api.get('/genres');
    return response.data;
  } catch (error) {
    console.error('Error fetching genres:', error);
    throw error;
  }
};

// Get game reviews - using ratings as RAWG doesn't provide text reviews
export const getGameReviews = async (id) => {
  try {
    const [ratingsResponse, redditResponse] = await Promise.all([
      api.get(`/games/${id}/ratings`),
      api.get(`/games/${id}/reddit`),
    ]);

    // Combine ratings and reddit posts into review-like objects
    const ratings = ratingsResponse.data.results || [];
    const redditPosts = redditResponse.data.results || [];

    // Transform reddit posts into review format
    const redditReviews = redditPosts.map(post => ({
      id: post.id,
      rating: 5, // Default rating for reddit posts
      text: post.text || post.name,
      created: post.created,
      likes: post.score,
      user: {
        username: post.username || 'Reddit User',
        avatar: null
      }
    }));

    // Create some review objects from ratings
    const ratingReviews = ratings.map((rating, index) => ({
      id: `rating-${index}`,
      rating: rating.percent / 20, // Convert percentage to 5-star scale
      text: rating.title,
      created: new Date().toISOString(), // Current date as these don't have dates
      likes: rating.count,
      user: {
        username: `${rating.title} Rating`,
        avatar: null
      }
    }));

    return {
      results: [...redditReviews, ...ratingReviews]
    };
  } catch (error) {
    console.error('Error fetching game reviews:', error);
    // Return empty results instead of throwing
    return { results: [] };
  }
};

// Search games
export const searchGames = async (query) => {
  try {
    const response = await api.get('/games', { 
      params: { 
        search: query,
        page_size: 20
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error searching games:', error);
    throw error;
  }
};

// Get upcoming games
export const getUpcomingGames = async () => {
  const dates = getDatesForUpcoming();
  try {
    const response = await api.get('/games', {
      params: {
        dates: `${dates.start},${dates.end}`,
        ordering: 'released',
        page_size: 20
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching upcoming games:', error);
    throw error;
  }
};

// Get platform-specific games
export const getPlatformGames = async (platformId) => {
  try {
    const response = await api.get('/games', {
      params: {
        platforms: platformId,
        ordering: '-rating',
        page_size: 20
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching platform games:', error);
    throw error;
  }
};

// Helper function to get date ranges for upcoming games
const getDatesForUpcoming = () => {
  const today = new Date();
  const end = new Date();
  end.setMonth(end.getMonth() + 12); // Get games for the next 12 months

  return {
    start: today.toISOString().split('T')[0],
    end: end.toISOString().split('T')[0]
  };
}; 