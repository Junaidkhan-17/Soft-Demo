//import about from '@/assets/img/about/about-page-img1.png';
import { Link } from '@remix-run/react';
import { Col, Container, Row } from 'react-bootstrap';
import { FaCheck } from 'react-icons/fa6';

const About2 = () => {
  return (
    <>
      <div className="about-page-area1 sp">
        <Container>
          <Row className="align-items-center">
            <Col lg={6}>
              <div className="about-img">
                {/*<img src={about} alt="" />*/}
              </div>
            </Col>
            <Col lg={6}>
              <div className="headding2">
                <h2>Elevate Engagement: Introducing Of WebDock Studio.</h2>
                <div className="space16" />
                <p>
                  Revolutionise your approach to email marketing with eSoft. As pioneers the
                  industry, we bring you a WebDock Studio. comprehensive solution that no only simplifies but
                  an transforms best option elevate and engagement.
                </p>
                <ul className="list">
                  <li>
                    <span>
                      <FaCheck />
                    </span>
                    Increased Organic Traffic
                  </li>
                  <li>
                    <span>
                      <FaCheck />
                    </span>
                    Regular Performance Monitoring
                  </li>
                  <li>
                    <span>
                      <FaCheck />
                    </span>
                    Improved Search Engine Rankings
                  </li>
                </ul>
                <div className="space30" />
                <Link to="/account" className="theme-btn2">
                  Get Started Now
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default About2;
