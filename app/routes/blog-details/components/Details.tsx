//import blogImg1 from '@/assets/img/blog/blog-details-img1.png'
//import blogImg2 from '@/assets/img/blog/blog-detials-img2.png'
//import icon1 from '@/assets/img/icons/blog2-icon1.png'
//import icon2 from '@/assets/img/icons/comment.png'
//import commentIcon from '@/assets/img/icons/details-comment.png'
//import messengerIcon from '@/assets/img/icons/massanger.png'
import { Link } from '@remix-run/react'
import { Col, Container, Row } from 'react-bootstrap'
import { FaCheck, FaFacebookF, FaGooglePlusG, FaLinkedinIn, FaYoutube } from 'react-icons/fa6'

const Details = () => {
  return (
    <>
      <div className="blog-details-sidebar">
        <Container>
          <Row>
            <Col lg={8} className="m-auto">
              <div className="blog-details-all pr60">
                <article>
                  <div className="details-box">
                    <div className="image">
                      {/*<img src={blogImg1} height={796} width={558} className="img-fluid" alt="" />*/}
                    </div>
                    <div className="space20" />
                    <div className="all-tags">
                      <Link to="" className="tag">
                        #Email Marketing
                      </Link>
                      <Link to="">
                        {/*<img src={icon1} alt="" /> */}10 October 2023
                      </Link>
                      <Link to="">
                        {/*<img src={icon2} alt="" /> */}10 October 2023
                      </Link>
                    </div>
                    <div className="space10" />
                    <div className="headding2">
                      <h2>Best Masterful Email Marketing Starts Here: Introducing eSoft</h2>
                      <div className="space16" />
                      <p>
                        Email marketing, where brilliance meets innovation. At Your SaaS Name, we're on an mission to transform the way you connect
                        with your audience. Unleash the power of personalised, high-converting campaigns with our intuitive drag-and-drop editor.
                      </p>
                      <div className="space16" />
                      <p>
                        Unleash the power of personalised, high-converting campaigns with our intuitive an drag-and-drop editor, smart segmentation,
                        and powerful automation tools. Crafting emails that resonate has never been easier. Join a best community of marketers.
                      </p>
                    </div>
                    <div className="space40" />
                    <div className="blog-border" />
                    <div className="space40" />
                  </div>
                </article>
                <article>
                  <div className="details-box">
                    <Row>
                      <Col lg={6}>
                        <div className="image">
                          {/*<img src={blogImg2} alt="" />*/}
                        </div>
                      </Col>
                      <Col lg={6}>
                        <div className="image">
                          {/*<img src={blogImg2} alt="" />*/}
                        </div>
                      </Col>
                    </Row>
                    <div className="space30" />
                    <div className="headding2">
                      <h5>Crafting Success: Your Email Marketing Email Brilliance Unleashed: Elevate Solution -eSoft</h5>
                      <div className="space16" />
                      <p>
                        Small business, or enterprise, eSoft has a plan tailored to your needs. Don't miss out on the email marketing revolution –
                        sign up for a free trial today and experience the magic of Your SaaS Name. Engage, convert, succeed – your journey starts
                        here.
                      </p>
                      <div className="space10" />
                      <Row>
                        <Col lg={6}>
                          <ul className="text-list">
                            <li>
                              <span>
                                <FaCheck />
                              </span>
                              Increased Organic Traffic
                            </li>
                            <li>
                              <span>
                                <FaCheck />
                              </span>
                              In-Depth Analytics Dashboard
                            </li>
                            <li>
                              <span>
                                <FaCheck />
                              </span>
                              Content Optimization Tools
                            </li>
                          </ul>
                        </Col>
                        <Col lg={6}>
                          <ul className="text-list">
                            <li>
                              <span>
                                <FaCheck />
                              </span>
                              Regular Performance Monitoring
                            </li>
                            <li>
                              <span>
                                <FaCheck />
                              </span>
                              Responsive Design for Any Device
                            </li>
                            <li>
                              <span>
                                <FaCheck />
                              </span>
                              Improved Search Engine Rankings
                            </li>
                          </ul>
                        </Col>
                      </Row>
                    </div>
                    <div className="space40" />
                    <div className="blog-border" />
                    <div className="space40" />
                  </div>
                </article>
                <article>
                  <div className="details-box">
                    <div className="headding2">
                      <h5>Beyond the Inbox: Marketing Redefines Email Efficiency & Meets Innovation Strategies</h5>
                      <div className="space16" />
                      <p>
                        Our platform goes beyond the inbox, offering a seamless and efficient experience. See your campaigns come to life with our
                        analytics dashboard, providing data-driven insights for informed decisions. Whether you're a startup, small business.
                      </p>
                    </div>
                    <div className="comment-area">
                      <p>
                        “Transforming the ordinary into the extraordinary, eSoft is more than just an email marketing platform; it's your gateway to
                        and impactful communication. Craft, target, automate, and analyse with ease, ensuring every email resonates.”
                      </p>
                      {/*<img src={commentIcon} alt="" className="icon" />*/}
                    </div>
                    <div className="headding2">
                      <h5>Crafting Success: Your Email Marketing Email Brilliance Unleashed Elevate Solution -eSoft</h5>
                      <div className="space16" />
                      <p>
                        Small business, or enterprise, eSoft has a plan tailored to your needs. Don't miss out on the email marketing revolution –
                        sign up for a free trial today and experience the magic of Your SaaS Name. Engage, convert, succeed – your journey starts
                        here.
                      </p>
                    </div>
                    <div className="space40" />
                    <div className="blog-border" />
                    <div className="space20" />
                  </div>
                </article>
                <div className="social-area-all">
                  <div className="tags">
                    <Link to="" className="tag">
                      #Email Marketing
                    </Link>
                    <Link to="" className="date">
                      {/*<img src={icon2} alt="" /> */}10 October 2023
                    </Link>
                  </div>
                  <div className="social-icons">
                    <ul>
                      <li className="text">Share:</li>
                      <li>
                        <Link to="">
                          <FaFacebookF />
                        </Link>
                      </li>
                      <li>
                        <Link to="">
                          <FaGooglePlusG />
                        </Link>
                      </li>
                      <li>
                        <Link to="">
                          <FaLinkedinIn />
                        </Link>
                      </li>
                      <li>
                        <Link to="">
                          <FaYoutube />
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="space20" />
                <div className="qustion-box">
                  <div className="image">
                    {/*<img src={messengerIcon} alt="" />*/}
                  </div>
                  <div className="pera">
                    <p>
                      Questions? Comments? Visit Our <Link to="">Help Center</Link> For Support
                    </p>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  )
}

export default Details
