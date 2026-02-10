import { useState } from 'react'
import { Accordion, Col, Container, Row } from 'react-bootstrap'

type FaqType = {
  question: string
  answer: string
}

const faqData: FaqType[] = [
  {
    question: 'What is blockchain technology',
    answer:
      "It's very simple! Register here. In your personal account, create wallet where you can store your FOX tokens. Then just send any amount to the displayed address in your office.",
  },
  {
    question: 'What is the value of FOX tokens?',
    answer:
      "It's very simple! Register here. In your personal account, create wallet where you can store your FOX tokens. Then just send any amount to the displayed address in your office.",
  },
  {
    question: 'I use cryptocurrency participate in the ICO?',
    answer:
      "It's very simple! Register here. In your personal account, create wallet where you can store your FOX tokens. Then just send any amount to the displayed address in your office.",
  },
  {
    question: 'What Is Cryptocurrency?',
    answer:
      "It's very simple! Register here. In your personal account, create wallet where you can store your FOX tokens. Then just send any amount to the displayed address in your office.",
  },
  {
    question: 'How does cryptocurrency work?',
    answer:
      "It's very simple! Register here. In your personal account, create wallet where you can store your FOX tokens. Then just send any amount to the displayed address in your office.",
  },
]

const Faq = () => {
  const [activeKey, setActiveKey] = useState<string>('0')

  const handleToggle = (key: string) => {
    setActiveKey((prev) => (prev === key ? '' : key))
  }

  return (
    <div className="faq6 sp" id="faq">
      <Container>
        <Row>
          <Col lg={10} className="m-auto text-center">
            <div className="heading6">
              <span className="span">FAQ Question</span>
              <h2 className="text-anime-style-3">Frequently Asked Questions</h2>
            </div>
            <div className="space40" />
            <div className="accordion accordion1" id="accordionExample">
              <Accordion activeKey={activeKey}>
                {faqData.map((item, index) => {
                  const key = index.toString()
                  const isActive = activeKey === key
                  return (
                    <div key={key} className={`accordion-item ${isActive ? 'active' : ''}`} onClick={() => handleToggle(key)}>
                      <h2 className="accordion-header" id={`heading${key}`}>
                        <Accordion.Button as="button" className={`accordion-button ${!isActive ? 'collapsed' : ''}`}>
                          {item.question}
                        </Accordion.Button>
                      </h2>
                      <Accordion.Collapse eventKey={key}>
                        <div
                          id={`collapse${key}`}
                          className={`accordion-collapse collapse ${isActive ? 'show' : ''}`}
                          aria-labelledby={`heading${key}`}>
                          <div className="accordion-body">{item.answer}</div>
                        </div>
                      </Accordion.Collapse>
                    </div>
                  )
                })}
              </Accordion>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Faq
