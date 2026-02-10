//import aboutImg from '@/assets/img/about/about-page-img2.png'
//import Icon1 from '@/assets/img/icons/about-page-sec-icon1.png'
//import Icon2 from '@/assets/img/icons/about-page-sec-icon2.png'
//import Icon3 from '@/assets/img/icons/about-page-sec-icon3.png'
//import shape from '@/assets/img/shapes/common-hero-shape2.png'
import { Link } from '@remix-run/react'
import { Col, Container, Row } from 'react-bootstrap'

type AboutType = {
  image: string
  title: string
  des: string
}

const AboutData: AboutType[] = [
  {
    image: '1',/*Icon1,*/
    title: 'Comprehensive Analytics:',
    des: 'Gain valuable insights into your email performance. eSoft offers robust analytics and reporting tools',
  },
  {
    image: '2',/*Icon2,*/
    title: 'Effortless Automation:',
    des: 'Gain valuable insights into your email performance. eSoft offers robust analytics and reporting tools',
  },
  {
    image: '3',/*Icon3,*/
    title: 'Personalised Targeting:',
    des: 'Gain valuable insights into your email performance. eSoft offers robust analytics and reporting tools',
  },
]

const About3 = () => {
  return (
    <>
      <div className="about-page-area2 _relative">
        <Container>
          <Row>
            <Col lg={6} className="m-auto text-center">
              <div className="headding2">
                <h2>Email Excellence Starts Here</h2>
                <div className="space16" />
                <p>
                  Revolutionise your approach to email marketing with WebDock Studio. As pioneers the industry, we bring you a WebDock Studio comprehensive solution
                  that only.
                </p>
              </div>
            </Col>
          </Row>
          <div className="space30" />
          <Row className="align-items-center">
            <Col lg={7}>
              <div className="space30" />
              <div className="left-image">
                {/*<img src={aboutImg} alt="" />*/}
              </div>
            </Col>
            <Col lg={5}>
              <div className="about-page-boxs">
                {AboutData.map((item, idx) => (
                  <div key={idx} className="single-box">
                    <div className="icon">
                      {/*<img src={item.image} alt="" />*/}
                    </div>
                    <div className="space20" />
                    <div className="headding2">
                      <h4>
                        <Link to="/features">{item.title}</Link>
                      </h4>
                      <div className="space10" />
                      <p>{item.des}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Col>
          </Row>
        </Container>
        {/*<img className="about-shape2" src={shape} alt="" />*/}
      </div>
    </>
  )
}

export default About3
