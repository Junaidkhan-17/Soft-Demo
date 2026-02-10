//import errorImg from '@/assets/img/others/error.png'
//import shape1 from '@/assets/img/shapes/apps-shape1.png'
import { MetaFunction } from '@remix-run/node'
import { Link } from '@remix-run/react'
import { Col, Container, Row } from 'react-bootstrap'

export const meta: MetaFunction = () => {
  return [{ title: 'Web Page Builder' }]
}

const error = () => {
  return (
    <>
      <div className="body2 body">
        <div className="error-all sp _relative">
          <Container>
            <div className="space80" />
            <Row className="align-items-center">
              <Col lg={8} className="m-auto">
                <div className="erro-page">
                  <div className="image text-center">
                    {/*<img src={errorImg} alt="Error" />*/}
                  </div>
                  <div className="headding2 text-center">
                    <h2>Sorry, Something Went Wrong</h2>
                    <div className="space16" />
                    <p>
                      But don't worry, we've got your back. Here are a few options to get you back on track: Contact Support: If you believe there's a
                      problem with our site.
                    </p>
                    <div className="space30" />
                    <Link to="/home-1">
                      <span className="theme-btn2">Go Back To Home Page</span>
                    </Link>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
          {/*<img className="shape1" src={shape1} alt="Shape 1" />*/}
          {/*<img className="shape2" src={shape1} alt="Shape 2" />*/}
        </div>
      </div>
    </>
  )
}

export default error
