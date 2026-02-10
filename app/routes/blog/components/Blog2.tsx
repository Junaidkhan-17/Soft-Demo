//import blogImg1 from '@/assets/img/blog/blog2-img1.png'
//import blogImg2 from '@/assets/img/blog/blog2-img2.png'
//import blogImg3 from '@/assets/img/blog/blog2-img3.png'
//import blogImg4 from '@/assets/img/blog/blog2-img4.png'
//import blogImg5 from '@/assets/img/blog/blog2-img5.png'
//import blogImg6 from '@/assets/img/blog/blog2-img6.png'
//import icon1 from '@/assets/img/icons/blog2-icon1.png'
//import icon2 from '@/assets/img/icons/blog2-icon2.png'
import Pagination from '@/components/Pagination'
import { Link } from '@remix-run/react'
import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { FaArrowRight } from 'react-icons/fa6'
import TabBlogPane2 from './TabBlogPane2'
import TabBlogPane3 from './TabBlogPane3'
import TabBlogPane4 from './TabBlogPane4'

type blogType = {
  //image: string
  date: string
  author: string
  title: string
  link: string
}

const blogData: blogType[] = [
  { /*image: blogImg1,*/ date: '10 October 2023', author: 'Rabby Mahmud', title: 'The Ultimate Email Campaign Playbook', link: '/blog-details' },
  { /*image: blogImg2,*/ date: '10 October 2023', author: 'Rabby Mahmud', title: 'Email Design: A Deep Dive in Visual Impact', link: '/blog-details' },
  { /*image: blogImg3,*/ date: '10 October 2023', author: 'Rabby Mahmud', title: 'Our Proven Project Management Approach', link: '/blog-details' },
  { /*image: blogImg4,*/ date: '10 October 2023', author: 'Mr. Blanca White', title: 'Empowering Projects Expert Management', link: '/blog-details' },
  { /*image: blogImg5,*/ date: '10 October 2023', author: 'Lois Stiedemann', title: 'The Ultimate Email Campaign Playbook', link: '/blog-details' },
  { /*image: blogImg6,*/ date: '10 October 2023', author: 'Owen Lindgren', title: 'Best Project Management Software eSoft', link: '/blog-details' },
]

const Blog2 = () => {
  const [activeTab, setActiveTab] = useState('all')
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    setAnimate(false)
    const timer = setTimeout(() => {
      setAnimate(true)
    }, 50)

    return () => clearTimeout(timer)
  }, [activeTab])

  const getTabStyle = (tabName: string): React.CSSProperties => ({
    opacity: activeTab === tabName && animate ? 1 : 0,
    transform: activeTab === tabName && animate ? 'translateY(0)' : 'translateY(20px)',
    transition: 'opacity 0.5s ease, transform 0.5s ease',
    pointerEvents: activeTab === tabName ? 'auto' : 'none',
    position: activeTab === tabName ? 'relative' : 'absolute',
    width: '100%',
  })

  return (
    <div className="blog-area-all sp">
      <Container>
        <Row className="align-items-center">
          <Col lg={6}>
            <div className="headding2">
              <h2>Our Latest Blog & News</h2>
              <div className="space16" />
              <p>Our dynamic Landing Pages redefine user experiences, WebDock Studio ensuring every click counts, dive into the world of insightful.</p>
            </div>
          </Col>
          <Col lg={6}>
            <div className="tabs-buttons">
              <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist" style={{ cursor: 'pointer' }}>
                <li className="nav-item" role="presentation">
                  <button
                    className={`nav-link ${activeTab === 'all' ? 'active' : ''}`}
                    onClick={() => setActiveTab('all')}
                    type="button"
                    role="tab"
                    aria-selected={activeTab === 'all'}>
                    All
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className={`nav-link ${activeTab === 'resources' ? 'active' : ''}`}
                    onClick={() => setActiveTab('resources')}
                    type="button"
                    role="tab"
                    aria-selected={activeTab === 'resources'}>
                    Resources
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className={`nav-link ${activeTab === 'guides' ? 'active' : ''}`}
                    onClick={() => setActiveTab('guides')}
                    type="button"
                    role="tab"
                    aria-selected={activeTab === 'guides'}>
                    Guides
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className={`nav-link ${activeTab === 'updates' ? 'active' : ''}`}
                    onClick={() => setActiveTab('updates')}
                    type="button"
                    role="tab"
                    aria-selected={activeTab === 'updates'}>
                    Updates
                  </button>
                </li>
              </ul>
            </div>
          </Col>
        </Row>
        <div className="space30" />
        <Row>
          <Col lg={12}>
            <div className="all-contact" style={{ position: 'relative', minHeight: '600px' }}>
              <div style={getTabStyle('all')}>
                <div className="all-boxs">
                  <Row>
                    {blogData.map((item, index) => (
                      <Col lg={6} key={index}>
                        <div className="blog-box">
                          <div className="image">
                            {/*<img src={item.image} alt={`Blog ${index + 1}`} />*/}
                          </div>
                          <div className="headding">
                            <div className="tags">
                              <Link to="#">
                                {/*<img src={icon1} alt="date" /> {item.date}*/}
                              </Link>
                              <Link to="#">
                                {/*<img src={icon2} alt="author" /> {item.author}*/}
                              </Link>
                            </div>
                            <h4>
                              <Link to={item.link}>{item.title}</Link>
                            </h4>
                            <p>Effortlessly design stunning emails, automate your market workflow, & precisely target your audience for maximum.</p>
                            <Link to={item.link} className="learn">
                              Read more
                              <span>
                                <FaArrowRight />
                              </span>
                            </Link>
                          </div>
                        </div>
                      </Col>
                    ))}
                  </Row>
                </div>
              </div>
              <TabBlogPane2 style={getTabStyle('resources')} />
              <TabBlogPane3 style={getTabStyle('guides')} />
              <TabBlogPane4 style={getTabStyle('updates')} />
            </div>
          </Col>
        </Row>
        <div className="space60" />
        <Pagination />
      </Container>
    </div>
  )
}

export default Blog2
