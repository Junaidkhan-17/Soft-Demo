//import Img1 from '@/assets/img/icons/about-page-box1.png'
//import Img2 from '@/assets/img/icons/about-page-box2.png'
//import Img3 from '@/assets/img/icons/about-page-box3.png'
import { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'

const About = () => {
  const [CountUp, setCountUp] = useState<any>(null)

  useEffect(() => {
    import('react-countup').then((mod) => {
      setCountUp(() => mod.default)
    })
  }, [])

  if (!CountUp) return null

  return (
    <>
      <div className="about-boxs">
        <Container>
          <Row>
            <Col lg={4} md={6}>
              <div className="single-box">
                <div className="icon">
                  {/*<img src={Img1} alt="" />*/}
                </div>
                <div className="headding2">
                  <h2>
                    <CountUp end={5} suffix="K+" />
                  </h2>
                  <p>Total App Users</p>
                </div>
              </div>
            </Col>
            <Col lg={4} md={6}>
              <div className="single-box">
                <div className="icon">
                  {/*<img src={Img2} alt="" />*/}
                </div>
                <div className="headding2">
                  <h2>
                    <CountUp end={4.5} decimals={1} suffix="K+" />
                  </h2>
                  <p>Satisfied Client</p>
                </div>
              </div>
            </Col>
            <Col lg={4} md={6}>
              <div className="single-box">
                <div className="icon">
                  {/*<img src={Img3} alt="" />*/}
                </div>
                <div className="headding2">
                  <h2>
                    <CountUp end={4} suffix="K+" />
                  </h2>
                  <p>Our Verified Client</p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  )
}

export default About
