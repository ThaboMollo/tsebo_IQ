import { useState } from 'react'
import { Card, CardBody, Input, Textarea, Button } from '@material-tailwind/react'
import { useToast } from '../contexts/ToastContext'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const { showToast } = useToast()

  const handleSubmit = (e) => {
    e.preventDefault()
    showToast({
      type: 'success',
      title: 'Message Sent',
      message: 'Thank you for contacting us. We\'ll get back to you soon!'
    })
    setFormData({ name: '', email: '', subject: '', message: '' })
  }

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-poppins font-bold text-primaryNavy dark:text-white mb-8 text-center">
          Contact Us
        </h1>
        
        <Card className="dark:bg-primaryLight">
          <CardBody>
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="dark:text-white"
              />
              
              <Input
                type="email"
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="dark:text-white"
              />
              
              <Input
                label="Subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="dark:text-white"
              />
              
              <Textarea
                label="Message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="dark:text-white"
              />
              
              <Button type="submit" className="gradient-cta w-full">
                Send Message
              </Button>
            </form>
          </CardBody>
        </Card>

        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <Card className="dark:bg-primaryLight text-center">
            <CardBody>
              <div className="w-12 h-12 bg-accentTeal rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-poppins font-semibold text-primaryNavy dark:text-white mb-2">Email</h3>
              <p className="text-neutralDark dark:text-neutralMedium">hello@tseboiq.co.za</p>
            </CardBody>
          </Card>

          <Card className="dark:bg-primaryLight text-center">
            <CardBody>
              <div className="w-12 h-12 bg-accentTeal rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="font-poppins font-semibold text-primaryNavy dark:text-white mb-2">Phone</h3>
              <p className="text-neutralDark dark:text-neutralMedium">+27 11 123 4567</p>
            </CardBody>
          </Card>

          <Card className="dark:bg-primaryLight text-center">
            <CardBody>
              <div className="w-12 h-12 bg-accentTeal rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="font-poppins font-semibold text-primaryNavy dark:text-white mb-2">Location</h3>
              <p className="text-neutralDark dark:text-neutralMedium">Johannesburg, South Africa</p>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  )
}
