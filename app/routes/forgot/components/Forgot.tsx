//import forgotBg from '@/assets/img/bg/fotgot-bg.png'
//import logo from '@/assets/img/logo/header-logo2.png'
//import shape1 from '@/assets/img/shapes/apps-shape1.png'
import { Link } from '@remix-run/react'
import { useEffect } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'

const Forgot = () => {
  useEffect(() => {
    document.body.classList.add('body2', 'body')
    return () => {
      document.body.classList.remove('body2', 'body')
    }
  }, [])

  return (
    <>
      <div className="log-in-area forgot-area _relative">
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
                  <h2>Forgot Password?</h2>
                  <p>If you forgot your password, please enter your email below and we will send you a recovery link.</p>
                </div>
                <Form action="" className="inputs">
                  <div className="single-inputs">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type="text" placeholder="Enter your email" />
                  </div>
                  <div className="button">
                    <Button className="theme-btn2">Send Recovery Link</Button>
                  </div>
                </Form>
                <div className="forgot-text">
                  <p>
                    Remember your password
                    <Link className="singup" to="/login">
                      Log In
                    </Link>
                  </p>
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

export default Forgot
