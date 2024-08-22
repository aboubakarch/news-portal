// Normalize NYT article format
export const normalizeNYTArticle = (article) => {
  const imageUrl = article.multimedia?.find(
    (media) => media.subtype === 'mobileMasterAt3x'
  )?.url;
  return {
    title: article.headline?.main || article.headline?.kicker || 'No Title',
    description: article.snippet || article.lead_paragraph || 'No Description',
    url: article.web_url || article.uri,
    urlToImage: imageUrl ? `https://www.nytimes.com/${imageUrl}` : '',
    author: article.byline?.original || 'Unknown',
    publishedAt: article.pub_date || new Date().toISOString(),
  };
};

// Normalize The Guardian article format
export const normalizeGuardianArticle = (result) => ({
  id: result.id,
  sectionId: result.sectionId,
  sectionName: result.sectionName,
  webPublicationDate: result.webPublicationDate,
  webTitle: result.webTitle,
  webUrl: result.webUrl,
  apiUrl: result.apiUrl,
  fields: {
    headline: result.fields.headline,
    standfirst: result.fields.standfirst,
    trailText: result.fields.trailText,
    byline: result.fields.byline,
    main: result.fields.main,
    body: result.fields.body,
  },
});

export const formatGuardianResults = (result) => {
  return result.map((article) => ({
    id: article.id || article.webUrl || article.webPublicationDate,
    sectionId: article.sectionId || '',
    sectionName: article.sectionName || '',
    webPublicationDate: article.webPublicationDate || '',
    webTitle:
      article.webTitle || (article.fields && article.fields.headline) || '',
    webUrl: article.webUrl || '',
    apiUrl: article.apiUrl || '',
    fields: {
      headline: (article.fields && article.fields.headline) || 'No headline',
      standfirst:
        (article.fields && article.fields.standfirst) || 'No standfirst',
      trailText:
        (article.fields && article.fields.trailText) || 'No trail text',
      byline: (article.fields && article.fields.byline) || 'Unknown',
      main: (article.fields && article.fields.main) || 'No main content',
      body: (article.fields && article.fields.body) || 'No body content',
      // Choose the first image if available
      thumbnail:
        (article.fields && article.fields.thumbnail) ||
        (article.fields && article.fields.image && article.fields.image[0]) || // Assuming image is an array
        '', // Ensure image URL is present
    },
    urlToImage: article.fields?.thumbnail || article.fields?.image?.[0] || '', // Choose the first image if available
    source: 'Guardian', // Add source information
  }));
};
