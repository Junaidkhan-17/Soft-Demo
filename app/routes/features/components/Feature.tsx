//import FeatureImg from '@/assets/img/features/features-page-stapes1.png'
import { Link } from '@remix-run/react'
import { Col, Container, Row } from 'react-bootstrap'

const Feature = () => {
  return (
    <>
      <div className="feratures-page-area sp">
        <Container>
          <Row className="align-items-center">
            <Col lg={6}>
              <div className="image">
                {/*<img src={FeatureImg} alt="" />*/}
              </div>
            </Col>
            <Col lg={6}>
              <div className="headding2 features-left">
                <span className="span">Email Deliverability</span>
                <h5>Enhance cold email and inbox delivery</h5>
                <div className="space16" />
                <p>
                  Experience peace of mind with our deliverability-focused product, real-time notifications, and spam
                  prevention, ensuring your emails consistently land in the right inboxes and sparing you the frustration of spam placement.
                </p>
                <div className="space30" />
                <div className="">
                  <Link to="/account" className="theme-btn2">
                    Sign Up For Free
                  </Link>
                </div>
              </div>
            </Col>
          </Row>
          <div className="space100" />
          <Row className="align-items-center">
            <Col lg={6}>
              <div className="headding2 features-right">
                <span className="span">Email Deliverability</span>
                <h5>Target Your Audience</h5>
                <div className="space16" />
                <p>
                  Experience peace of mind with our deliverability-focused product, eeSoftped & fail-safes, real-time notifications, and spam
                  prevention, ensuring your emails consistently land in the right inboxes and sparing you the frustration of spam placement.
                </p>
                <div className="space30" />
                <div className="">
                  <Link to="/account" className="theme-btn2">
                    Sign Up For Free
                  </Link>
                </div>
              </div>
            </Col>
            <Col lg={6}>
              <div className="image">
                {/*<img src={FeatureImg} alt="" />*/}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  )
}

export default Feature
