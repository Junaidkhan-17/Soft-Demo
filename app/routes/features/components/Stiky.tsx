//import secImg from '@/assets/img/features/features-stiky1.png'
//import shapeImg from '@/assets/img/shapes/stiky-sec-shape2.png'
import { Link } from '@remix-run/react'
import { Col, Container, Row } from 'react-bootstrap'
import { FaCheck } from 'react-icons/fa6'

type stikyType = {
  title: string
  description: string
  features: string[]
}

const stikyData: stikyType[] = [
  {
    title: 'Website Competitor Analysis:',
    description:
      'Dive into the world of keywords with our powerful research an tools. Identify high-performing keywords relevant to your SEO niche, allowing you to tailor your content strategy and.',
    features: ['Content Optimization Tools', 'Regular Performance Monitoring', 'Improved Search Engine Rankings'],
  },
  {
    title: 'Customised SEO Strategies:',
    description:
      "Tailor your SEO approach with personalised recommend and strategies based on your website's unique needs. Stay best informed about changes in your website's performance",
    features: ['Content Optimization Tools', 'Regular Performance Monitoring', 'Improved Search Engine Rankings'],
  },
  {
    title: 'Local SEO Enhancement',
    description:
      'Optimise your online presence for local searches, attracting nearby customers and clients. Stay ahead of industry market changes with regular software updates that incorporate.',
    features: ['Content Optimization Tools', 'Regular Performance Monitoring', 'Improved Search Engine Rankings'],
  },
]

const Stiky = () => {
  return (
    <div className="stiky-sec sp">
      <Container>
        <Row>
          <Col lg={12}>
            <div className="stiky-sec-boxs _relative">
              {stikyData.map((item, index) => (
                <div className="stiky-single" key={index}>
                  <Row className="align-items-center">
                    <Col lg={6}>
                      <div className="headding">
                        <h3>{item.title}</h3>
                        <div className="space16" />
                        <p>{item.description}</p>
                        <div className="space20" />
                        <ul className="list">
                          {item.features.map((feature, i) => (
                            <li key={i}>
                              <span className="arrow">
                                <FaCheck />
                              </span>
                              {feature}
                            </li>
                          ))}
                        </ul>
                        <div className="space30" />
                        <Link to="/features" className="theme-btn2">
                          <span>Unlock SEO Power</span>
                        </Link>
                      </div>
                    </Col>
                    <Col lg={6}>
                      <div className="stiky-sec-img">
                        {/*<img src={secImg} alt="SEO" />*/}
                        {/*<img src={shapeImg} alt="shape" className="shape" />*/}
                      </div>
                    </Col>
                  </Row>
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Stiky
