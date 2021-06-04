import { Card } from 'react-bootstrap';

type Props = {
  message?: string,
};

export function SnackBar(props: Props) {
  return (
    <div className={'position-fixed fixed-bottom d-flex align-items-center'
    + ' justify-content-center'}
    >
      <Card className="w-250p rounded-lg mb-3 p-0 bg-dark border border-light">
        <Card.Body className="p-2 text-white text-center">
          {props.message}
        </Card.Body>
      </Card>
    </div>
  );
}

SnackBar.defaultProps = { message: null };
