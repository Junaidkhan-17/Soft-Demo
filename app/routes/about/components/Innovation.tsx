//import bg from '@/assets/img/bg/others2-bg.png'
//import Img1 from '@/assets/img/others/others2-image.png'
//import Img2 from '@/assets/img/shapes/others2-shape1.png'
//import Img3 from '@/assets/img/shapes/others2-shape2.png'
import { Link } from '@remix-run/react'
import { Col, Container, Row } from 'react-bootstrap'

const Innovation = () => {
  return (
    <>
      <div
        className="email-innovation"
        style={{
          //backgroundImage: `url(${bg})`,
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}>
        <Container>
          <Row>
            <Col lg={5}>
              <div className="headding2-w">
                <h2>Email innovation: Craft marketing an success</h2>
                <div className="space16" />
                <p>
                  Email marketing journey transforms into a streamlined, an powerful experience. Our cutting-edge platform eeSofts you with the tools
                  to craft compelling, personalized
                </p>

                <div className="space30" />

                <Link to="/account" className="theme-btn3">
                  Sign Up For Free
                </Link>
              </div>
            </Col>
            <Col lg={7}>
              <div className="images">
                <div className="image1">
                  {/*<img src={Img1} alt="" />*/}
                </div>
                <div className="image2">
                  {/*<img src={Img2} alt="" />*/}
                </div>
                <div className="image3">
                  {/*<img src={Img3} alt="" />*/}
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  )
}

export default Innovation
