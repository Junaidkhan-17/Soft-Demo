//import forgotBg from '@/assets/img/bg/fotgot-bg.png'
//import logo from '@/assets/img/logo/header-logo2.png'
//import shape1 from '@/assets/img/shapes/apps-shape1.png'
import { Link } from '@remix-run/react'
import { useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'

const Verify = () => {
  useEffect(() => {
    document.body.classList.add('body2', 'body')
    return () => {
      document.body.classList.remove('body2', 'body')
    }
  }, [])

  return (
    <>
      <div className="log-in-area email-verify _relative">
        <Container>
          <Row>
            <Col lg={6} className="m-auto text-center">
              <div className="main-logo">
                <Link to="/home-1">
                  {/*<img src={logo} alt="Logo" />*/}
                </Link>
              </div>
            </Col>
          </Row>
          <div className="space80" />
          <Row className="align-items-center">
            <Col lg={6} className="m-auto">
              <div className="login-form">
                <div className="headding">
                  <h2>Verify Your Email!</h2>
                  <p>
                    We sent you a verification link via email. Please click it to verify your email address. If you don’t see it, please wait up to 5
                    mins or check your SPAM folder.
                  </p>
                  <div className="space20" />
                  <div className="button">
                    <Link to="#" className="theme-btn2">
                      Open Email
                    </Link>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
        {/*<img className="shape1" src={shape1} alt="Shape" />*/}
        {/*<img className="shape2" src={shape1} alt="Shape" />*/}
      </div>
      <div
        className="bg-area-all"
        style={{
          //backgroundImage: `url(${forgotBg})`,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          minHeight: '390px',
        }}></div>
    </>
  )
}

export default Verify
