import { Link } from '@remix-run/react';
import { Col, Row } from 'react-bootstrap';
import { FaAnglesLeft, FaAnglesRight } from 'react-icons/fa6';

const Pagination = () => {
  return (
    <>
      <Row>
        <Col xs={12} className="m-auto">
          <div className="theme-pagination text-center">
            <ul>
              <li>
                <Link to="">
                  <FaAnglesLeft />
                </Link>
              </li>
              <li>
                <Link className="active" to="">
                  01
                </Link>
              </li>
              <li>
                <Link to="">02</Link>
              </li>
              <li>...</li>
              <li>
                <Link to="">12</Link>
              </li>
              <li>
                <Link to="">
                  <FaAnglesRight />
                </Link>
              </li>
            </ul>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default Pagination;
