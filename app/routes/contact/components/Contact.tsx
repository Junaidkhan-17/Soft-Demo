//import Icon1 from '@/assets/img/icons/contact-page-icon1.png'
//import Icon2 from '@/assets/img/icons/contact-page-icon2.png'
//import Icon3 from '@/assets/img/icons/contact-page-icon3.png'
//import Shape2 from '@/assets/img/shapes/apps-shape1.png'
//import Shape1 from '@/assets/img/shapes/apps-shape2.png'
import { Link } from '@remix-run/react'
import { Col, Container, Row } from 'react-bootstrap'

const Contact = () => {
  return (
    <>
      <div className="space60" />
      <div className="contact-page-area sp">
        <Container>
          <Row>
            <Col lg={8} className="m-auto text-center">
              <div className="common-main-headding">
                <h1>Customer Support</h1>
                <p>
                  At Webdock studio, we value your inquiries and are here to provide the support you need. Whether you're looking for more information about
                  our cutting-edge software.
                </p>
              </div>
            </Col>
          </Row>
          <div className="space60" />
          <div className="contact-form-all">
            <Row className="align-items-center">
              <Col lg={7}>
                <div className="form-inputs">
                  <h5>Send us a Message</h5>
                  <div className="space16" />
                  <p>As a fellow small business owner, we know the fulfillment that an a comes from running your own business contact to Financy.</p>

                  <div className="space30" />
                  <form action="#">
                    <Row>
                      <Col lg={6}>
                        <div className="input">
                          <input type="text" placeholder="First Name*" />
                        </div>
                      </Col>
                      <Col lg={6}>
                        <div className="input">
                          <input type="email" placeholder="Email*" />
                        </div>
                      </Col>
                      <Col lg={6}>
                        <div className="input">
                          <input type="number" placeholder="Phone*" />
                        </div>
                      </Col>
                      <Col lg={6}>
                        <div className="input">
                          <input type="text" placeholder="Website*" />
                        </div>
                      </Col>
                      <Col lg={12}>
                        <div className="input">
                          <textarea cols={30} rows={3} placeholder="Your Message*"></textarea>
                        </div>
                        <div className="button">
                          <button type="submit" className="theme-btn2">
                            Submit Now
                          </button>
                        </div>
                      </Col>
                    </Row>
                  </form>
                </div>
              </Col>
              <Col lg={5}>
                <div className="contact-page-boxs">
                  <div className="single-box">
                    <div className="icon">
                      {/*<img src={Icon1} alt="" /> */}
                    </div>
                    <div className="headding">
                      <h5>Call</h5>
                      <Link to="tel:+91 9325222397">+91 9325222397</Link>
                    </div>
                  </div>
                  <div className="single-box">
                    <div className="icon">
                      {/*<img src={Icon2} alt="" />*/}
                    </div>
                    <div className="headding">
                      <h5>Email</h5>
                      <Link to="mailto:webdockstudios@gmail.com">webdockstudios@gmail.com</Link>
                    </div>
                  </div>
                  <div className="single-box">
                    <div className="icon">
                      {/*<img src={Icon3} alt="" />*/}
                    </div>
                    <div className="headding">
                      <h5>Schedule Time</h5>
                      <Link to="">Mon - Fri: 10am to 5pm</Link>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </Container>
        {/*<img className="shape1" src={Shape1} alt="" />*/}
        {/*<img className="shape2" src={Shape2} alt="" />*/}
        {/*<img className="shape3" src={Shape2} alt="" />*/}
      </div>
    </>
  )
}

export default Contact
