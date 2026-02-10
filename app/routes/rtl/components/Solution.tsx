import span from '@/assets/img/logo/span9.svg'
import HrImg from '@/assets/img/others/hr-solution-img.png'
import { Link } from '@remix-run/react'
import { Col, Container, Row } from 'react-bootstrap'
import { FaArrowRight } from 'react-icons/fa6'

const Solution = () => {
  return (
    <>
      <div className="hr-solutions" id="hr-solution">
        <Container>
          <Row>
            <Col lg={7}>
              <div className="image">
                <img src={HrImg} alt="" />
              </div>
            </Col>
            <Col lg={5}>
              <div className="heading9">
                <span className="span" data-aos="zoom-in-left" data-aos-duration="700">
                  <img src={span} alt="" /> HR Solution
                </span>
                <h2 className="text-anime-style-3">Powerful Features For Effective HR Solutions</h2>
                <div className="space16" />
                <p data-aos="fade-left" data-aos-duration="700">
                  Experience a new level of efficiency with our all-in-one HR software solution. Our intuitive platform is built to simplify your
                  workflow, automating tedious tasks and providing powerful tools for seamless HR management.
                </p>
                <div className="space30" />
                <div className="" data-aos="fade-left" data-aos-duration="1000">
                  <Link to="" className="theme-btn15">
                    Get quip free now
                    <span>
                      <FaArrowRight />
                    </span>
                  </Link>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  )
}

export default Solution
