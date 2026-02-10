//import appleBtn from '@/assets/img/icons/apple-btn.png'
//import googleBtn from '@/assets/img/icons/google-btn.png'
//import logo from '@/assets/img/logo/header-logo2.png'
//import loginImg from '@/assets/img/others/login-page-img.png'
//import shape1 from '@/assets/img/shapes/apps-shape1.png'
import { Link } from '@remix-run/react'
import { useEffect } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'

const Account = () => {
  useEffect(() => {
    document.body.classList.add('body2', 'body')
    return () => {
      document.body.classList.remove('body2', 'body')
    }
  }, [])
  return (
    <>
      <div className="log-in-area sp _relative">
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
            <Col lg={6}>
              <div className="login-form">
                <div className="headding">
                  <h2>Create Account</h2>
                  <p>
                    Already have an account with us? <Link to="login">Log in</Link>
                  </p>
                </div>
                <Form className="inputs">
                  <Row>
                    <Col lg={6}>
                      <div className="single-inputs">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Full name" />
                      </div>
                    </Col>
                    <Col lg={6}>
                      <div className="single-inputs">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control type="email" placeholder="Enter your email" />
                      </div>
                    </Col>
                    <Col lg={12}>
                      <div className="single-inputs">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Enter your password" />
                      </div>
                    </Col>
                    <Col lg={12}>
                      <div className="button">
                        <Button className="theme-btn2">Log In</Button>
                      </div>
                    </Col>
                  </Row>
                </Form>
                <div className="forgot-text">
                  <p>
                    <input type="radio" id="redio" />
                    <label htmlFor="redio"> Don’t have an account? </label>
                    <Link className="singup" to="#">
                      Terms & Conditions
                    </Link>
                  </p>
                </div>
                <div className="brand-buttons">
                  <Link to="#">
                    {/*<img src={googleBtn} alt="Google" /> Sign in with Google*/}
                  </Link>
                  <Link to="#">
                    {/*<img src={appleBtn} alt="Apple" />*/} Sign in with Apple
                  </Link>
                </div>
              </div>
            </Col>
            <Col lg={6}>
              <div className="login-img">
                {/*<img src={loginImg} alt="Login" />*/}
              </div>
            </Col>
          </Row>
        </Container>
        {/*<img className="shape1" src={shape1} alt="shape" />*/}
        {/*<img className="shape2" src={shape1} alt="shape" />*/}
      </div>
    </>
  )
}

export default Account
