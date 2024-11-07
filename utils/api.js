import axios from 'axios';

const API_URL = 'http://localhost:8000/api'; // Django server URL

export const getNews = async () => {
  const response = await axios.get(`${API_URL}/news/`);
  return response.data;
};

export const getTeams = async () => {
  const response = await axios.get(`${API_URL}/teams/`);
  return response.data;
};

export const getMatches = async () => {
  const response = await axios.get(`${API_URL}/matches/`);
  return response.data;
};
