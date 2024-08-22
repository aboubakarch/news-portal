import React, { useState, useEffect } from 'react';
import {
  fetchNewsAPI,
  fetchGuardianAPI,
  fetchNYTAPI,
} from '../services/newsServices';
import Search from './search';
import Filter from './filter';
import { Container } from '@mui/material';
import StyledPagination from './styled/StyledPagination';
import Articles from './Articles';
import { formatGuardianResults } from '../utils/normalize';

const NewsFeed = () => {
  const [articles, setArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [articlesPerPage] = useState(10);
  const [filters, setFilters] = useState({
    query: '',
    date: '',
    categories: '',
    sources: '',
  });

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const query = filters.query || '';
        const [newsAPIResults, guardianAPIResults, nytAPIResults] =
          await Promise.all([
            fetchNewsAPI(query, filters),
            fetchGuardianAPI(query, filters),
            fetchNYTAPI(query, filters),
          ]);

        // Map Guardian articles to match the format of other APIs
        const formattedGuardianResults =
          formatGuardianResults(guardianAPIResults);

        const allResults = [
          ...nytAPIResults.map((article) => ({
            ...article,
            source: 'NYT', // Add source information
          })),
          ...newsAPIResults.map((article) => ({
            ...article,
            source: 'NewsAPI', // Add source information
          })),
          ...formattedGuardianResults,
        ];

        // Filter articles to ensure necessary fields are present
        const filteredArticles = allResults.filter(
          (article) =>
            (article.fields?.headline || article.title) &&
            (article.fields?.trailText || article.description) &&
            (article.webUrl || article.url)
        );

        console.log('Filtered Articles:', filteredArticles);

        setArticles(filteredArticles);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };

    fetchArticles();
  }, [filters]);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  const startIndex = currentPage * articlesPerPage;
  const endIndex = startIndex + articlesPerPage;
  const currentArticles = articles.slice(startIndex, endIndex);

  return (
    <Container>
      <Search onSearch={(query) => setFilters({ ...filters, query })} />
      <Filter filters={filters} setFilters={setFilters} />
      <Articles currentArticles={currentArticles} />
      <StyledPagination
        pageCount={Math.ceil(articles.length / articlesPerPage)}
        onPageChange={handlePageClick}
        containerClassName="pagination"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item previous"
        previousLinkClassName="page-link"
        nextClassName="page-item next"
        nextLinkClassName="page-link"
        breakClassName="page-item"
        breakLinkClassName="page-link"
        activeClassName="active"
      />
    </Container>
  );
};

export default NewsFeed;
