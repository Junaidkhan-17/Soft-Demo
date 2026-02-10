//import appBtn1 from '@/assets/img/icons/apps-btn1.png'
//import appBtn2 from '@/assets/img/icons/apps-btn2.png'
//import desktopImg from '@/assets/img/others/download-page-img1.png'
//import mobileImg from '@/assets/img/others/download-page-img2.png'
//import shape1 from '@/assets/img/shapes/apps-shape1.png'
//import shape2 from '@/assets/img/shapes/apps-shape2.png'
import { Link } from '@remix-run/react'
import { Col, Container, Row } from 'react-bootstrap'

const Download = () => {
  return (
    <>
      <div className="download-blog-area sp _relative">
        <Container>
          <Row>
            <Col lg={6} className="m-auto text-center">
              <div className="headding2">
                <span className="span">Apps WebDock Studio</span>
                <h2>Apps for all your devices</h2>
              </div>
            </Col>
          </Row>
          <div className="space30" />
          <Row>
            <Col lg={6}>
              <div className="download-box">
                <div className="image">
                  {/*<img src={mobileImg} alt="Mobile App" />*/}
                </div>
                <div className="headding2">
                  <span className="span">Mobile</span>
                  <h5>Mobile App Version</h5>
                  <div className="space10" />
                  <div className="buttons">
                    <Link to="">
                      {/*<img src={appBtn1} alt="App Store" />*/}
                    </Link>
                    <Link to="">
                      {/*<img src={appBtn2} alt="Play Store" />*/}
                    </Link>
                  </div>
                </div>
              </div>
            </Col>
            <Col lg={6}>
              <div className="download-box">
                <div className="image">
                  {/*<img src={desktopImg} alt="Tablet App" />*/}
                </div>
                <div className="headding2">
                  <span className="span">Tablet</span>
                  <h5>Tablet Version</h5>
                  <div className="space10" />
                  <div className="buttons">
                    <Link to="">
                      {/*<img src={appBtn1} alt="App Store" />*/}
                    </Link>
                    <Link to="">
                      {/*<img src={appBtn2} alt="Play Store" />*/}
                    </Link>
                  </div>
                </div>
              </div>
            </Col>
            <Col lg={12}>
              <div className="download-box">
                <Row className="align-items-center bg">
                  <Col lg={6}>
                    <div className="image">
                      {/*<img src={desktopImg} alt="Desktop App" />*/}
                    </div>
                  </Col>
                  <Col lg={6}>
                    <div className="headding2">
                      <span className="span">Desktop WebDock Studio</span>
                      <h5>WebDock Studio Desktop Version</h5>
                      <div className="space10" />
                      <div className="buttons">
                        <Link to="">
                          {/*<img src={appBtn1} alt="App Store" />*/}
                        </Link>
                        <Link to="">
                          {/*<img src={appBtn2} alt="Play Store" />*/}
                        </Link>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
        {/*<img className="shape1" src={shape1} alt="Shape 1" />*/}
        {/*<img className="shape2" src={shape2} alt="Shape 2" />*/}
      </div>
    </>
  )
}

export default Download
