//import heroMainImg from '@/assets/img/about/about-main-img.png'
//import blogAuthorImg from '@/assets/img/blog/blog-page-smoll-img.png'
//import blogIconDate from '@/assets/img/icons/blog2-icon1.png'
//import shape1 from '@/assets/img/shapes/common-hero-shape1.png'
//import shape3 from '@/assets/img/shapes/common-hero-shape3.png'
import { Link } from '@remix-run/react'
import { Col, Container, Row } from 'react-bootstrap'

const Hero = () => {
  return (
    <>
      <div className="pages-hero pages-hero-unic">
        <Container>
          <Row className="align-items-center">
            <Col lg={7}>
              <div className="main-headding">
                <h1>The Ultimate Email Campaign Playbook</h1>
                <p>
                  Where email marketing meets innovation. Say goodbye to generic campaigns and hello to personalised, high-converting emails that
                  resonate with your audience.
                </p>
                <div className="space30" />
                <div className="all-text-hero">
                  <div className="autor-area">
                    <div className="image">
                      {/*<img src={blogAuthorImg} alt="Author" />*/}
                    </div>
                    <div className="headding">
                      <h5>
                        <Link to="#">Jonson Brans</Link>
                      </h5>
                      <p>UI/UX Designer</p>
                    </div>
                  </div>
                  <div className="tag">
                    <Link to="#">#Email Marketing</Link>
                  </div>
                  <div className="date">
                    <Link to="#">
                      {/*<img src={blogIconDate} alt="Date" /> */}10 October 2023
                    </Link>
                  </div>
                </div>
              </div>
            </Col>
            <Col lg={5}>
              <div className="hero-image shape-animaiton3">
                {/*<img src={heroMainImg} alt="Hero" />*/}
              </div>
            </Col>
          </Row>
        </Container>
        {/*<img className="hero-shape1" src={shape1} alt="Shape1" />*/}
        {/*<img className="hero-shape3" src={shape3} alt="Shape3" />*/}
      </div>
      <div className="space60" />
    </>
  )
}

export default Hero
