import systemIcon1 from '@/assets/img/icons/system-icon1.svg'
import systemIcon2 from '@/assets/img/icons/system-icon2.svg'
import systemIcon3 from '@/assets/img/icons/system-icon3.svg'
import systemIcon4 from '@/assets/img/icons/system-icon4.svg'
import span9 from '@/assets/img/logo/span9.svg'
import systemImg1 from '@/assets/img/others/system9-img1.png'
import systemImg2 from '@/assets/img/others/system9-img2.png'
import shape1 from '@/assets/img/shapes/system-shape1.png'
import shape2 from '@/assets/img/shapes/system-shape2.png'
import shape3 from '@/assets/img/shapes/system-shape3.png'
import shape4 from '@/assets/img/shapes/system-shape4.png'
import { Link } from '@remix-run/react'
import { Col, Container, Row } from 'react-bootstrap'

const Benefit = () => {
  return (
    <>
      <div className="buy-sell-bottom2" id="system">
        <Container>
          <Row>
            <Col lg={6} className="m-auto text-center">
              <div className="heading9">
                <span className="span" data-aos="zoom-in-left" data-aos-duration="700">
                  <img src={span9} alt="" /> eSoft Benefits
                </span>
                <h2 className="text-anime-style-3">eSoft HR Use Of Benefits</h2>
              </div>
            </Col>
          </Row>
        </Container>
        <Container>
          <div className="bg">
            <Row className="align-items-center">
              <Col lg={3}>
                <div className="box-area-all" data-aos="flip-right" data-aos-duration="900">
                  <div className="icon">
                    <img src={systemIcon1} alt="" />
                  </div>
                  <div className="single-box heading7">
                    <h5>
                      <Link to="">Trade Local Currency</Link>
                    </h5>
                    <div className="space10" />
                    <p>With our intuitive interface and robust features, you buy, sell.</p>
                  </div>
                </div>
                <div className="space50" />
                <div className="box-area-all box-area-all2" data-aos="flip-right" data-aos-duration="900">
                  <div className="icon">
                    <img src={systemIcon2} alt="" />
                  </div>
                  <div className="single-box heading7">
                    <h5>
                      <Link to="">Largest Coin Offer</Link>
                    </h5>
                    <div className="space10" />
                    <p>Plus, our commitment to the security means that PayCoin.</p>
                  </div>
                </div>
              </Col>
              <Col lg={6}>
                <div className="service1-main-images" data-aos="zoom-out" data-aos-duration="900">
                  <div className="main-img1">
                    <img src={systemImg1} alt="" />
                  </div>
                  <div className="main-img2 animate1">
                    <img src={systemImg2} alt="" />
                  </div>
                  <div className="shape1">
                    <img src={shape1} alt="" />
                  </div>
                  <div className="shape2">
                    <img src={shape2} alt="" />
                  </div>
                  <div className="shape3">
                    <img src={shape3} alt="" />
                  </div>
                  <div className="shape4">
                    <img src={shape4} alt="" />
                  </div>
                </div>
              </Col>
              <Col lg={3}>
                <div className="box-area-all box-area-all3" data-aos="flip-right" data-aos-duration="900">
                  <div className="icon">
                    <img src={systemIcon3} alt="" />
                  </div>
                  <div className="single-box heading7">
                    <h5>
                      <Link to="">Safe And Secure</Link>
                    </h5>
                    <div className="space10" />
                    <p>Trusted partner in the world of crypto trading Join us today.</p>
                  </div>
                </div>
                <div className="space50" />
                <div className="box-area-all box-area-all4" data-aos="flip-right" data-aos-duration="900">
                  <div className="icon">
                    <img src={systemIcon4} alt="" />
                  </div>
                  <div className="single-box heading7">
                    <h5>
                      <Link to="">Trade For Anywhere</Link>
                    </h5>
                    <div className="space10" />
                    <p>Resources designed to help navigate best the dynamic</p>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
      <div className="space100" />
    </>
  )
}

export default Benefit
