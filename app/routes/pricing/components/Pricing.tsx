import { Link } from '@remix-run/react'
import { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { FaCheck } from 'react-icons/fa6'

type PricingPlan = {
  label: string
  name: string
  duration: string
  features: string[]
  button: string
}

const pricingData: {
  monthly: PricingPlan[]
  yearly: PricingPlan[]
} = {
  monthly: [
    {
      label: 'Free Forever',
      name: 'Free',
      duration: 'Unlimited Month',
      button: 'Free Forever',
      features: [
        'Unlimited Storage',
        'Unlimited Integrations',
        'Guests with Permissions',
        'Unlimited Custom Fields',
        'Resource Management',
        'Advanced Public Sharing',
        'Advanced Time Tracking',
        'Workload Management',
        'Conditional Logic in Forms',
        'Access to Managed Services',
        'Team Sharing for Spaces',
      ],
    },
    {
      label: 'Mid Teams',
      name: 'Business',
      duration: 'Unlimited Month',
      button: 'Free Forever',
      features: [
        'Unlimited Storage',
        'Unlimited Integrations',
        'Guests with Permissions',
        'Unlimited Custom Fields',
        'Resource Management',
        'Advanced Public Sharing',
        'Advanced Time Tracking',
        'Workload Management',
        'Conditional Logic in Forms',
        'Access to Managed Services',
        'Team Sharing for Spaces',
      ],
    },
    {
      label: 'Large Teams',
      name: 'Enterprise',
      duration: 'Unlimited Usages',
      button: 'Free Forever',
      features: [
        'Unlimited Storage',
        'Unlimited Integrations',
        'Guests with Permissions',
        'Unlimited Custom Fields',
        'Resource Management',
        'Advanced Public Sharing',
        'Advanced Time Tracking',
        'Workload Management',
        'Conditional Logic in Forms',
        'Access to Managed Services',
        'Team Sharing for Spaces',
      ],
    },
  ],
  yearly: [
    {
      label: 'Free Forever',
      name: 'Free',
      duration: 'Unlimited Yearly',
      button: 'Free Forever',
      features: [
        'Unlimited Storage',
        'Unlimited Integrations',
        'Guests with Permissions',
        'Unlimited Custom Fields',
        'Resource Management',
        'Advanced Public Sharing',
        'Advanced Time Tracking',
        'Workload Management',
        'Conditional Logic in Forms',
        'Access to Managed Services',
        'Team Sharing for Spaces',
      ],
    },
    {
      label: 'Mid Teams',
      name: 'Business',
      duration: 'Unlimited Yearly',
      button: 'Free Forever',
      features: [
        'Unlimited Storage',
        'Unlimited Integrations',
        'Guests with Permissions',
        'Unlimited Custom Fields',
        'Resource Management',
        'Advanced Public Sharing',
        'Advanced Time Tracking',
        'Workload Management',
        'Conditional Logic in Forms',
        'Access to Managed Services',
        'Team Sharing for Spaces',
      ],
    },
    {
      label: 'Large Teams',
      name: 'Enterprise',
      duration: 'Unlimited Usages',
      button: 'Free Forever',
      features: [
        'Unlimited Storage',
        'Unlimited Integrations',
        'Guests with Permissions',
        'Unlimited Custom Fields',
        'Resource Management',
        'Advanced Public Sharing',
        'Advanced Time Tracking',
        'Workload Management',
        'Conditional Logic in Forms',
        'Access to Managed Services',
        'Team Sharing for Spaces',
      ],
    },
  ],
}

const Pricing = () => {
  const [isYearly, setIsYearly] = useState(true)

  const plans = isYearly ? pricingData.monthly : pricingData.yearly

  return (
    <div className="pricing-plan-page sp">
      <Container>
        <div className="princing-plans">
          <Container>
            <Row>
              <Col xs={12} className="text-center">
                <div className="plan-toggle-wrap">
                  <p className="pera">Save up to 32% with yearly billing.</p>
                  <div className={`toggle-inner toggle-inner2 ${isYearly ? 'active' : ''}`} onClick={() => setIsYearly(!isYearly)}>
                    <input id="ce-toggle" type="checkbox" checked={isYearly} readOnly />
                    <span className="custom-toggle"></span>
                    <span className={`t-month ${isYearly ? 'toggle-inactive' : 'toggle-active'}`}>Monthly</span>
                    <span className={`t-year ${isYearly ? 'toggle-active' : 'toggle-inactive'}`}>Yearly (Save 20%)</span>
                  </div>
                </div>
              </Col>
            </Row>
            <div className="space60" />
            <Row>
              {plans.map((plan, index) => (
                <Col md={6} lg={4} key={index}>
                  <div className="pricing-box h-100">
                    <div className="pricing-box-single d-flex flex-column h-100">
                      <div className="text-center mb-3">
                        <span className="span">{plan.label}</span>
                        <h3>{plan.name}</h3>
                        <p className="pera">{plan.duration}</p>
                      </div>
                      <div className="text-center mb-3">
                        <Link to="" className="theme-btn2">
                          {plan.button}
                        </Link>
                      </div>
                      <ul className="list flex-grow-1">
                        {plan.features.map((feature, i) => (
                          <li key={i}>
                            <span>
                              <FaCheck />
                            </span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </Container>
        </div>
      </Container>
    </div>
  )
}

export default Pricing
