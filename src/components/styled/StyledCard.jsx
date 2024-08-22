import { Card } from '@mui/material';
import { styled } from '@mui/system';

// Styled Article Card
const StyledCard = styled(Card)({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  borderRadius: '8px',
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.2s, box-shadow 0.2s',
  '&:hover': {
    transform: 'scale(1.02)',
    boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
  },
});

export default StyledCard;
