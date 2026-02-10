//import about from '@/assets/img/about/about-main-img.png'
//import shape1 from '@/assets/img/shapes/common-hero-shape1.png'
//import shape2 from '@/assets/img/shapes/common-hero-shape2.png'
//import shape3 from '@/assets/img/shapes/common-hero-shape3.png'
import { Link } from '@remix-run/react'
import { Col, Container, Row } from 'react-bootstrap'

const Hero = () => {
  return (
    <>
      <div className="pages-hero">
        <Container>
          <Row className="align-items-center">
            <Col lg={6}>
              <div className="main-headding">
                <h1>Pricing Plan</h1>
                <p>
                  Revolutionise & email marketing strategy with cutting-edge <br /> software designed to elevate your campaigns, our intuitive.
                </p>
                <div className="space30" />
                <div className="hero-btns">
                  <Link to="/account" className="theme-btn2">
                    Get Started Now
                  </Link>
                  <Link to="/account" className="theme-btn3">
                    Try For Free Now
                  </Link>
                </div>
              </div>
            </Col>
            <Col lg={6}>
              <div className="hero-image shape-animaiton3">
                {/*<img src={about} alt="" />*/}
              </div>
            </Col>
          </Row>
        </Container>
        {/*<img className="hero-shape1" src={shape1} alt="" />*/}
        {/*<img className="hero-shape2" src={shape2} alt="" />*/}
        {/*<img className="hero-shape3" src={shape3} alt="" />*/}
      </div>
    </>
  )
}

export default Hero
