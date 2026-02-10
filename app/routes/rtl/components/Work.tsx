import span from '@/assets/img/logo/span9.svg'
import shape1 from '@/assets/img/shapes/home2-element1.png'
import shape2 from '@/assets/img/shapes/home2-element2.png'
import workImg1 from '@/assets/img/work/work2-img1.png'
import workImg2 from '@/assets/img/work/work2-img2.png'
import workImg3 from '@/assets/img/work/work2-img3.png'
import { useState } from 'react'
import { Col, Container, Row, Tab } from 'react-bootstrap'

type TabItem = {
  title: string
  image: string
  duration?: string
}

const tabContents: TabItem[] = [
  { title: 'Create Engaging Campaigns', image: workImg1, duration: '800' },
  { title: 'Automate Workflows', image: workImg2, duration: '1000' },
  { title: 'Grow Your Reach', image: workImg3, duration: '1100' },
]

const Work = () => {
  const [activeTab, setActiveTab] = useState('tab1')

  return (
    <>
      <div className="space100" />
      <div className="work2 _relative" id="work">
        <Container>
          <Row>
            <Col lg={6} className="m-auto text-center">
              <div className="heading9">
                <span className="span" data-aos="zoom-in-left" data-aos-duration="700">
                  <img src={span} alt="" /> Keep track of your employee data
                </span>
                <h2 className="text-anime-style-3">HRMS Software Will Be Your Organization Data Warehouse</h2>
              </div>
            </Col>
          </Row>
          <Row>
            <Col lg={9} className="m-auto text-center">
              <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                {[1, 2, 3].map((num) => (
                  <li className="nav-item" role="presentation" key={num}>
                    <button
                      className={`nav-link${activeTab === `tab${num}` ? ' active' : ''}`}
                      id={`tab${num}-tab`}
                      type="button"
                      role="tab"
                      aria-controls={`tab${num}`}
                      aria-selected={activeTab === `tab${num}`}
                      onClick={() => setActiveTab(`tab${num}`)}>
                      {num}
                    </button>
                  </li>
                ))}
              </ul>
            </Col>
          </Row>
          <Row>
            <Col lg={12}>
              <Tab.Container activeKey={activeTab}>
                <Tab.Content>
                  {[1, 2, 3].map((tabIndex) => (
                    <Tab.Pane key={tabIndex} eventKey={`tab${tabIndex}`} id={`tab${tabIndex}`}>
                      <Row>
                        {tabContents.map((item, i) => (
                          <Col lg={4} key={i}>
                            <div className="tabs-box-item" data-aos="fade-up" data-aos-duration={item.duration || '800'}>
                              <h3>{item.title}</h3>
                              <img src={item.image} alt={item.title} />
                            </div>
                          </Col>
                        ))}
                      </Row>
                    </Tab.Pane>
                  ))}
                </Tab.Content>
              </Tab.Container>
            </Col>
          </Row>
        </Container>
        <img className="shape1" src={shape1} alt="shape1" />
        <img className="shape2" src={shape2} alt="shape2" />
      </div>
      <div className="space40" />
    </>
  )
}

export default Work
