import {
  normalizeNYTArticle,
  normalizeGuardianArticle,
} from '../utils/normalize';
import buildQueryString from '../utils/queryBuilder';
import client from './client';
import handleApiResponse from './responseHandler';

// Define API keys
const API_KEYS = {
  NEWSAPI: 'b3282a10afe54c7fb0aff90dfcb3efca',
  GUARDIAN: '38c3bf9f-51d4-4632-ac54-9d15ba0afd5e',
  NYT: 'DPoY7OV9l38YLyPjLGianY6UnjcJA0Fg',
};

// Fetch articles from NewsAPI
export const fetchNewsAPI = async (query = '', filters = {}) => {
  const today = new Date().toISOString().split('T')[0];
  const minDate = '2024-07-22'; // One day after the maxDate to handle boundary issues

  const fromDate = filters.fromDate
    ? filters.fromDate < minDate
      ? minDate
      : filters.fromDate
    : minDate;
  const toDate = filters.toDate
    ? filters.toDate <= today
      ? filters.toDate
      : today
    : today;

  const params = {
    q: query || 'trump', // Default query to a common term if not provided
    from: fromDate,
    to: toDate,
    sources: filters.sources || '',
    language: filters.language || 'en',
    sortBy: filters.sortBy || 'relevancy',
    apiKey: API_KEYS.NEWSAPI,
  };

  if (!params.q && !params.sources) {
    console.error(
      'Error: Required parameters are missing. Please provide a query or sources.'
    );
    return [];
  }

  const url = `https://newsapi.org/v2/everything?${buildQueryString(params)}`;

  try {
    const response = await client.get(url);
    return handleApiResponse(response, (data) => data.articles || []);
  } catch (error) {
    console.error(
      'Error fetching data from NewsAPI:',
      error.response?.data || error.message
    );
    return [];
  }
};

// Fetch articles from The Guardian
export const fetchGuardianAPI = async (query = 'world', filters = {}) => {
  const params = {
    q: query,
    section: filters.categories || undefined,
    'from-date': filters.fromDate || '2023-01-01',
    'to-date': filters.toDate || new Date().toISOString().split('T')[0],
    'show-fields': 'all',
    'api-key': API_KEYS.GUARDIAN,
  };

  const url = `https://content.guardianapis.com/search?${buildQueryString(
    params
  )}`;

  try {
    const response = await client.get(url);
    return handleApiResponse(response, (data) =>
      data.response.results.map(normalizeGuardianArticle)
    );
  } catch (error) {
    console.error(
      'Error fetching data from The Guardian:',
      error.response?.data || error.message
    );
    return [];
  }
};

// Fetch articles from New York Times
export const fetchNYTAPI = async (query = 'technology', filters = {}) => {
  const params = {
    q: query,
    fq: filters.categories,
    begin_date: filters.fromDate
      ? filters.fromDate.replace(/-/g, '')
      : '20230101',
    end_date: filters.toDate
      ? filters.toDate.replace(/-/g, '')
      : new Date().toISOString().split('T')[0].replace(/-/g, ''),
    'api-key': API_KEYS.NYT,
  };

  const url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?${buildQueryString(
    params
  )}`;

  try {
    const response = await client.get(url);
    return handleApiResponse(response, (data) =>
      data.response.docs.map(normalizeNYTArticle)
    );
  } catch (error) {
    console.error(
      'Error fetching data from New York Times:',
      error.response?.data || error.message
    );
    return [];
  }
};
