import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useTheme } from '../contexts/ThemeContext'
import { useToast } from '../contexts/ToastContext'
import ThemeToggle from './ThemeToggle'
import { Button } from '@material-tailwind/react'

export default function Navbar() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const { showToast } = useToast()

  const handleSignOut = async () => {
    try {
      await signOut()
      showToast({
        type: 'success',
        title: 'Signed Out',
        message: 'You have been successfully signed out.'
      })
      navigate('/')
    } catch (error) {
      showToast({
        type: 'error',
        title: 'Error',
        message: error.message
      })
    }
  }

  return (
    <nav className="bg-white dark:bg-primaryLight shadow-sm transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-poppins font-bold text-primaryNavy dark:text-white">
              tsebo<span className="text-accentTeal">IQ</span>
            </span>
          </Link>

          <div className="flex items-center space-x-6">
            <Link
              to="/about"
              className="text-neutralDark dark:text-neutralMedium hover:text-accentTeal transition-smooth"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="text-neutralDark dark:text-neutralMedium hover:text-accentTeal transition-smooth"
            >
              Contact
            </Link>
            
            <ThemeToggle />

            {user ? (
              <>
                <Link
                  to="/dashboard/candidate"
                  className="text-neutralDark dark:text-neutralMedium hover:text-accentTeal transition-smooth"
                >
                  Dashboard
                </Link>
                <Button
                  size="sm"
                  onClick={handleSignOut}
                  className="bg-error hover:bg-red-600 transition-smooth"
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <Link to="/auth">
                <Button size="sm" className="gradient-cta">
                  Get Started
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
