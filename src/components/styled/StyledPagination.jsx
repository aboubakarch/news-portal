import { styled } from '@mui/system';
import Pagination from 'react-paginate';

// Styled Pagination Component
const StyledPagination = styled(Pagination)({
  display: 'flex',
  justifyContent: 'center',
  marginTop: '20px',
  '& .page-item': {
    margin: '0 5px',
  },
  '& .page-link': {
    padding: '10px 20px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    cursor: 'pointer',
    textDecoration: 'none',
    color: '#007bff',
    backgroundColor: 'white',
  },
  '& .page-link:hover': {
    backgroundColor: '#e9ecef',
    color: '#0056b3',
  },
  '& .active .page-link': {
    backgroundColor: '#007bff',
    color: 'white',
    border: '1px solid #007bff',
  },
  '& .previous, & .next': {
    padding: '10px 20px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  '& .previous:hover, & .next:hover': {
    backgroundColor: '#e9ecef',
    color: '#0056b3',
  },
  '& .disabled .page-link': {
    cursor: 'not-allowed',
    color: '#ccc',
  },
});

export default StyledPagination;
