import Spinner from 'react-bootstrap/Spinner';
import 'bootstrap/dist/css/bootstrap.min.css';

function SpinnerLoader({ isLoading }) {
  return (
    <Spinner animation={isLoading ? 'border' : ''} role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  );
}

export default SpinnerLoader;