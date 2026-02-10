//import mainImage from '@/assets/img/others/download-page-main.png'
//import shape1 from '@/assets/img/shapes/common-hero-shape1.png'
//import shape2 from '@/assets/img/shapes/common-hero-shape2.png'
//import shape3 from '@/assets/img/shapes/common-hero-shape3.png'
import { Link } from '@remix-run/react'
import { useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'

const Hero = () => {
  useEffect(() => {
    document.body.classList.add('body2', 'body')
    return () => {
      document.body.classList.remove('body2', 'body')
    }
  }, [])

  return (
    <>
      <div className="pages-hero">
        <Container>
          <Row className="align-items-center">
            <Col lg={7}>
              <div className="main-headding">
                <h1>Visit WebDock On Any & Every Device</h1>
                <p>
                  Where email marketing meets innovation. Say goodbye to generic <br />
                  campaigns &amp; hello to personalised, high-converting emails resonate with your audience.
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
            <Col lg={5}>
              <div className="hero-image">
                {/*<img src={mainImage} alt="Hero" />*/}
              </div>
            </Col>
          </Row>
        </Container>
        {/*<img className="hero-shape1" src={shape1} alt="Shape1" />*/}
        {/*<img className="hero-shape2" src={shape2} alt="Shape2" />*/}
        {/*<img className="hero-shape3" src={shape3} alt="Shape3" />*/}
      </div>
    </>
  )
}

export default Hero
