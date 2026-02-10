//import about from '@/assets/img/about/about-main-img.png'
//import Shape1 from '@/assets/img/shapes/common-hero-shape1.png'
//import Shape2 from '@/assets/img/shapes/common-hero-shape2.png'
//import Shape3 from '@/assets/img/shapes/common-hero-shape3.png'
import { Link } from '@remix-run/react'
import { useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'

const Hero = () => {
  useEffect(() => {
    document.body.classList.add('body2', 'body', 'unic-body')
    return () => {
      document.body.classList.remove('body2', 'body', 'unic-body')
    }
  }, [])

  return (
    <>
      <div className="pages-hero">
        <Container>
          <Row className="align-items-center">
            <Col lg={6}>
              <div className="main-headding">
                <h1>Features WebDock Studio</h1>
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
        {/*<img className="hero-shape1" src={Shape1} alt="" />*/}
        {/*<img className="hero-shape2" src={Shape2} alt="" />*/}
        {/*<img className="hero-shape3" src={Shape3} alt="" />*/}
      </div>
    </>
  )
}

export default Hero
