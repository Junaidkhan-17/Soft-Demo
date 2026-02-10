//import bgImage from '@/assets/img/bg/cta2-bg.png'
//import Cta from '@/assets/img/others/cta2-main-img.png'
//import shape1 from '@/assets/img/shapes/cta2-shape1.png'
//import shape2 from '@/assets/img/shapes/cta2-shape2.png'
import { Link } from '@remix-run/react'
import { Col, Container, Row } from 'react-bootstrap'

const CTA = () => {
  return (
    <>
      <div
        className="cta2-area"
        style={{
          //backgroundImage: `url(${bgImage})`,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}>
        <Container>
          <Row>
            <Col lg={6} className="m-auto text-center">
              <div className="headding2-w">
                <h2 className="text-anime-style-3">Join 500,000+ SEO's Who Trust WebDock Studio For Insights That Help Their Business Grow.</h2>
                <div className="space16" />
                <p data-aos="fade-up" data-aos-duration="800">
                  WebDock Studio has exceeded our expectations in every way. The ease with & which we can target specific audience segments has an transform.
                </p>
                <div className="space30" />
                <div className="" data-aos="fade-up" data-aos-duration="1000">
                  <Link to="/account" className="theme-btn3">
                    Get Started For Free
                  </Link>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="cta2-main-image">
        <Container>
          <Row>
            <Col lg={12}>
              <div className="cta2-images">
                <div className="img1">
                  {/*<img src={Cta} alt="" />*/}
                </div>
                <div className="shape1">
                  {/*<img src={shape2} alt="" />*/}
                </div>
                <div className="shape2">
                  {/*<img src={shape1} alt="" />*/}
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  )
}

export default CTA
