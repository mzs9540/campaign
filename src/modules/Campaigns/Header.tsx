import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

export function Header() {
  return (
    <Link to="/campaigns">
      <div className="d-flex align-items-center mb-3">
        <span className="mr-3">
          <FontAwesomeIcon icon={['fas', 'arrow-left']} />
        </span>

        <div>
          <span>Campaigns</span>
          <h6>Go back to all campaigns</h6>
        </div>
      </div>
    </Link>
  );
}
