import axios from 'axios';

// Get credentials from environment variables
const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;

const SPOTIFY_TOKEN_API = 'https://accounts.spotify.com/api/token';
const SPOTIFY_API_BASE = 'https://api.spotify.com/v1';

let accessToken = '';
let tokenExpirationTime = 0;

// Function to get access token
const getAccessToken = async () => {
  // If we already have a valid token, return it
  if (accessToken && Date.now() < tokenExpirationTime) {
    return accessToken;
  }

  try {
    // Get a new token
    const response = await axios.post(
      SPOTIFY_TOKEN_API,
      new URLSearchParams({
        grant_type: 'client_credentials',
      }).toString(),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic ' + btoa(`${CLIENT_ID}:${CLIENT_SECRET}`),
        },
      }
    );

    accessToken = response.data.access_token;
    // Set expiration time (subtract 60 seconds to be safe)
    tokenExpirationTime = Date.now() + (response.data.expires_in - 60) * 1000;

    return accessToken;
  } catch (error) {
    console.error('Error getting Spotify access token:', error);
    throw error;
  }
};

// Search for tracks
export const searchTracks = async (query) => {
  try {
    const token = await getAccessToken();
    const response = await axios.get(`${SPOTIFY_API_BASE}/search`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      params: {
        q: query,
        type: 'track',
        limit: 20,
      },
    });

    return response.data.tracks.items.map(formatTrack);
  } catch (error) {
    console.error('Error searching tracks:', error);
    throw error;
  }
};

// Get trending tracks (new releases)
export const getTrendingTracks = async () => {
  try {
    const token = await getAccessToken();
    const response = await axios.get(`${SPOTIFY_API_BASE}/browse/new-releases`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      params: {
        limit: 20,
        country: 'US',
      },
    });

    // Need to fetch tracks for these albums to get preview URLs
    const albumIds = response.data.albums.items.map(album => album.id);
    const tracksPromises = albumIds.map(id => getAlbumTracks(id, token));
    const tracksResults = await Promise.all(tracksPromises);

    // Flatten and take first track from each album
    return tracksResults.map(tracks => tracks[0]).filter(track => track);
  } catch (error) {
    console.error('Error getting trending tracks:', error);
    throw error;
  }
};

// Get tracks for an album
const getAlbumTracks = async (albumId, token) => {
  try {
    const response = await axios.get(`${SPOTIFY_API_BASE}/albums/${albumId}/tracks`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      params: {
        limit: 1,  // Just get the first track
      },
    });

    return response.data.items.map(track => formatTrack({
      ...track,
      album: { id: albumId, images: [] }
    }));
  } catch (error) {
    console.error(`Error getting tracks for album ${albumId}:`, error);
    return [];
  }
};

// Get recommendations for explore section
export const getRecommendations = async () => {
  try {
    const token = await getAccessToken();

    // Get some seed genres
    const genresResponse = await axios.get(`${SPOTIFY_API_BASE}/recommendations/available-genre-seeds`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    });

    // Pick 5 random genres
    const allGenres = genresResponse.data.genres;
    const seedGenres = [];
    for (let i = 0; i < 5 && allGenres.length > 0; i++) {
      const randomIndex = Math.floor(Math.random() * allGenres.length);
      seedGenres.push(allGenres[randomIndex]);
      allGenres.splice(randomIndex, 1);
    }

    // Get recommendations based on those genres
    const response = await axios.get(`${SPOTIFY_API_BASE}/recommendations`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      params: {
        seed_genres: seedGenres.join(','),
        limit: 20,
      },
    });

    return response.data.tracks.map(formatTrack);
  } catch (error) {
    console.error('Error getting recommendations:', error);
    throw error;
  }
};

// Format track data
const formatTrack = (track) => {
  return {
    id: track.id,
    title: track.name,
    artist: track.artists.map(artist => artist.name).join(', '),
    album: track.album?.name || '',
    cover: track.album?.images?.[0]?.url || 'https://placehold.co/300x300?text=No+Image',
    preview: track.preview_url,
    duration: formatDuration(track.duration_ms),
    spotifyUrl: track.external_urls?.spotify || '',
  };
};

// Format duration from milliseconds to MM:SS
const formatDuration = (ms) => {
  const minutes = Math.floor(ms / 60000);
  const seconds = ((ms % 60000) / 1000).toFixed(0);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

export default {
  searchTracks,
  getTrendingTracks,
  getRecommendations,
};