import { Link } from '@remix-run/react'
import { Col, Row } from 'react-bootstrap'
import { FaAngleDown, FaArrowRight } from 'react-icons/fa6'
import menu from './data'

const Menu = () => {

  return (
     <ul>
      {menu.map((item, idx) => (
        <li key={idx} className={item.subMenu || item.demos ? 'dropdown-menu-parrent' : ''}>
          {item.demos ? (
            <>
              <Link to="">
                {item.title} <FaAngleDown />
              </Link>
              <div className="tp-submenu">
                <Row>
                  <Col lg={12}>
                    <div className="all-images-menu">
                      {item.demos.slice(0, 5).map((demo, i) => (
                        <div className="homemenu-thumb" key={i} style={i === 4 ? { margin: '0 0 20px 0' } : {}}>
                          <div className="img1">
                            <img src={demo.image} alt="" />
                          </div>
                          <div className="homemenu-btn">
                            <Link className="header-btn1" to={demo.multiPage}>
                              Multi Page <FaArrowRight />
                            </Link>
                            <div className="space16" />
                            <Link className="header-btn1" to={demo.onePage} target="_blank">
                              One page <FaArrowRight />
                            </Link>
                          </div>
                          <Link to={demo.multiPage} className="bottom-heading">
                            {demo.title}
                          </Link>
                        </div>
                      ))}
                    </div>
                    <div className="all-images-menu">
                      {item.demos.slice(5).map((demo, i) => (
                        <div className="homemenu-thumb" key={i} style={i === item.demos!.slice(5).length - 1 ? { margin: '0 0 20px 0' } : {}}>
                          <div className="img1">
                            <img src={demo.image} alt="" />
                          </div>
                          {demo.title === '10. RTL Version' && (
                            <div className="text">
                              <h2>RTL</h2>
                            </div>
                          )}
                          <div className="homemenu-btn">
                            <Link className="header-btn1" to={demo.multiPage}>
                              Multi Page <FaArrowRight />
                            </Link>
                            <div className="space16" />
                            <Link className="header-btn1" to={demo.onePage} target="_blank">
                              One page <FaArrowRight />
                            </Link>
                          </div>
                          <Link to={demo.multiPage} className="bottom-heading">
                            {demo.title}
                          </Link>
                        </div>
                      ))}
                    </div>
                  </Col>
                </Row>
              </div>
            </>
          ) : item.subMenu ? (
            <>
              <Link to="">
                {item.title} <FaAngleDown />
              </Link>
              <ul>
                {item.subMenu.map((sub, subIdx) => (
                  <li key={subIdx}>
                    <Link to={sub.link}>{sub.title}</Link>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <Link to={item.link}>{item.title}</Link>
          )}
        </li>
      ))}
    </ul>
  ) 
} 

export default Menu 
