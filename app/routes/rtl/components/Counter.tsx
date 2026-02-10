import { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'

const Counter = () => {

   const [CountUp, setCountUp] = useState<any>(null)
  
    useEffect(() => {
      import('react-countup').then((mod) => {
        setCountUp(() => mod.default)
      })
    }, [])
  
  if (!CountUp) return null
  
  return (
    <div className="counters6" id="counters">
      <Container>
        <Row>
          <Col lg={3} xs={6}>
            <div className="counter-box box1" data-aos="zoom-out" data-aos-duration="800">
              <h2>
                <span className="counter">
                  <CountUp end={16} suffix=" M+" />
                </span>
              </h2>
              <p>Built With Elementor</p>
            </div>
          </Col>
          <Col lg={3} xs={6}>
            <div className="counter-box box2" data-aos="zoom-out" data-aos-duration="1000">
              <h2>
                <span className="counter">
                  <CountUp end={6.5} decimals={1} suffix=" K+" />
                </span>
              </h2>
              <p>5 Star Reviews</p>
            </div>
          </Col>
          <Col lg={3} xs={6}>
            <div className="counter-box box3" data-aos="zoom-out" data-aos-duration="1100">
              <h2>
                <span className="counter">
                  <CountUp end={100} suffix="+" />
                </span>
              </h2>
              <p>5 Star Reviews</p>
            </div>
          </Col>
          <Col lg={3} xs={6}>
            <div className="counter-box box4" data-aos="zoom-out" data-aos-duration="600">
              <h2>
                <span className="counter">
                  <CountUp end={16} suffix="Sec." />
                </span>
              </h2>
              <p>15 Second An Elementor</p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Counter
