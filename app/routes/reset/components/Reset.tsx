//import forgotBg from '@/assets/img/bg/fotgot-bg.png'
//import logo from '@/assets/img/logo/header-logo2.png'
//import shape1 from '@/assets/img/shapes/apps-shape1.png'
import { Link } from '@remix-run/react'
import { useEffect } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'

const Reset = () => {
  useEffect(() => {
    document.body.classList.add('body2', 'body')
    return () => {
      document.body.classList.remove('body2', 'body')
    }
  }, [])

  return (
    <>
      <div className="log-in-area reset-area _relative">
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
                  <h2>Reset Password</h2>
                  <p>If you want to reset your password, please enter your new password below.</p>
                </div>
                <Form action="#" className="inputs">
                  <div className="single-inputs">
                    <Form.Label>New Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter your password" />
                  </div>
                  <div className="single-inputs">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" placeholder="Confirm your password" />
                  </div>
                  <div className="button">
                    <Button className="theme-btn2">Send Recovery Link</Button>
                  </div>
                </Form>
                <div className="forgot-text">
                  <p>
                    If you didn’t request a password <br /> recovery link, please ignore this.
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

export default Reset
