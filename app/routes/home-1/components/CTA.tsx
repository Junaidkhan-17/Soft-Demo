//import Img from '@/assets/img/others/cta6-img.png'
//import Shap from '@/assets/img/shapes/cta6-shape.png'
import { Link } from '@remix-run/react'
import { Col, Container, Row } from 'react-bootstrap'
import { FaArrowRight } from 'react-icons/fa6'

const CTA = () => {
  return (
    <div className="cta6">
      <Container>
        <Row className="align-items-center">
          <Col lg={5}>
            <div className="heading6-w">
              <span className="span">Integration brands</span>
              <h2>
                Access A Library Of <br /> Pre-Built Templates
              </h2>
              <div className="space16" />
              <p>
                Seamlessly integrate your Website with WebDock Studio with the 3K App <br /> to elevate your workflow and enhance of productivity.
              </p>
              <div className="space30" />
              <Link to="/account" className="theme-btn8">
                <span className="tb8">
                  Get Started, It’s Free
                  <span className="arrow">
                    <FaArrowRight />
                  </span>
                </span>
              </Link>
            </div>
          </Col>
          <Col lg={1}></Col>
          <Col lg={6}>
            <div className="cta6-images">
              <div className="image1">
                {/*<img src={Img} alt="" />*/}
              </div>
              <div className="image2">
                {/*<img src={Shap} alt="" />*/}
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default CTA
