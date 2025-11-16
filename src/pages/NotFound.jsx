import { Link } from 'react-router-dom'
import { Button } from '@material-tailwind/react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-9xl font-poppins font-bold text-accentTeal mb-4">404</h1>
        <h2 className="text-4xl font-poppins font-semibold text-primaryNavy dark:text-white mb-4">
          Page Not Found
        </h2>
        <p className="text-lg text-neutralDark dark:text-neutralMedium mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/">
          <Button className="gradient-cta">
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  )
}
