import React from 'react';
import {
  CardContent,
  Typography,
  CardMedia,
  Button,
  Grid,
} from '@mui/material';
import StyledCard from './styled/StyledCard';

const Articles = ({ currentArticles }) => {
  return (
    <Grid container spacing={3} mt={3}>
      {currentArticles.map((article) => (
        <Grid item xs={12} sm={6} md={4} key={article.id}>
          <StyledCard>
            {article.urlToImage && (
              <CardMedia
                component="img"
                height="140"
                image={article.urlToImage}
                alt={article?.fields?.headline || article.title || 'No Image'}
              />
            )}
            <CardContent sx={{ flex: '1 0 auto' }}>
              <Typography gutterBottom variant="h6" component="div">
                {article?.fields?.headline || article?.title || 'No Headline'}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {article?.fields?.trailText ||
                  article?.description ||
                  'No Description'}
              </Typography>
              <Typography variant="body2" color="text.secondary" mt={2}>
                <strong>Author:</strong> {article?.fields?.byline || 'Unknown'}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Published At:</strong>{' '}
                {new Date(
                  article?.webPublicationDate || article?.publishedAt
                ).toLocaleDateString() || 'Unknown Date'}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Source:</strong> {article.source || 'Unknown Source'}
              </Typography>
            </CardContent>
            <Button
              size="small"
              href={article.webUrl || article.url}
              target="_blank"
              rel="noopener noreferrer"
              variant="contained"
              color="primary"
              sx={{ m: 2 }}
            >
              Read More
            </Button>
          </StyledCard>
        </Grid>
      ))}
    </Grid>
  );
};

export default Articles;
