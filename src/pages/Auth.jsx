import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardBody, Input, Button, Tabs, TabsHeader, Tab, TabsBody, TabPanel } from '@material-tailwind/react'
import { useAuth } from '../contexts/AuthContext'
import { useToast } from '../contexts/ToastContext'
import { signInWithGoogle } from '../services/authService'

export default function Auth() {
  const [activeTab, setActiveTab] = useState('login')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { signIn, signUp } = useAuth()
  const { showToast } = useToast()

  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  })

  const [registerData, setRegisterData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      await signIn(loginData.email, loginData.password)
      showToast({
        type: 'success',
        title: 'Welcome Back!',
        message: 'You have successfully signed in.'
      })
      navigate('/dashboard/candidate')
    } catch (error) {
      showToast({
        type: 'error',
        title: 'Login Failed',
        message: error.message
      })
    } finally {
      setLoading(false)
    }
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    
    if (registerData.password !== registerData.confirmPassword) {
      showToast({
        type: 'error',
        title: 'Password Mismatch',
        message: 'Passwords do not match.'
      })
      return
    }

    if (registerData.password.length < 6) {
      showToast({
        type: 'error',
        title: 'Weak Password',
        message: 'Password must be at least 6 characters.'
      })
      return
    }

    setLoading(true)

    try {
      await signUp(registerData.email, registerData.password, registerData.fullName)
      showToast({
        type: 'success',
        title: 'Account Created!',
        message: 'Welcome to tseboIQ. Let\'s set up your profile.'
      })
      navigate('/onboarding')
    } catch (error) {
      showToast({
        type: 'error',
        title: 'Registration Failed',
        message: error.message
      })
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle()
      // User will be redirected to Google, then back to /auth/callback
    } catch (error) {
      showToast({
        type: 'error',
        title: 'Google Sign-In Failed',
        message: error.message
      })
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-poppins font-bold text-primaryNavy dark:text-white mb-2">
            Welcome to tseboIQ
          </h1>
          <p className="text-neutralDark dark:text-neutralMedium">
            Your journey to the perfect opportunity starts here
          </p>
        </div>

        <Card className="dark:bg-primaryLight">
          <CardBody>
            <Tabs value={activeTab}>
              <TabsHeader
                className="bg-neutralMedium dark:bg-primaryNavy"
                indicatorProps={{
                  className: "bg-accentTeal shadow-none"
                }}
              >
                <Tab
                  value="login"
                  onClick={() => setActiveTab('login')}
                  className={activeTab === 'login' ? 'text-white' : 'text-neutralDark dark:text-neutralMedium'}
                >
                  Login
                </Tab>
                <Tab
                  value="register"
                  onClick={() => setActiveTab('register')}
                  className={activeTab === 'register' ? 'text-white' : 'text-neutralDark dark:text-neutralMedium'}
                >
                  Register
                </Tab>
              </TabsHeader>

              <TabsBody>
                <TabPanel value="login">
                  <div className="space-y-6 mt-6">
                    {/* Google Sign-In Button */}
                    <Button
                      onClick={handleGoogleSignIn}
                      className="w-full flex items-center justify-center gap-3 bg-white text-gray-700 border border-gray-300 shadow-sm hover:bg-gray-50 normal-case"
                    >
                      <img src="/google-icon.svg" alt="Google" className="w-5 h-5" />
                      Continue with Google
                    </Button>

                    {/* Divider */}
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-neutralMedium dark:border-primaryNavy"></div>
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white dark:bg-primaryLight text-neutralDark dark:text-neutralMedium">
                          Or continue with email
                        </span>
                      </div>
                    </div>

                    {/* Email/Password Form */}
                    <form onSubmit={handleLogin} className="space-y-6">
                      <Input
                        type="email"
                        label="Email"
                        value={loginData.email}
                        onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                        required
                        className="dark:text-white"
                      />
                      
                      <Input
                        type="password"
                        label="Password"
                        value={loginData.password}
                        onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                        required
                        className="dark:text-white"
                      />
                      
                      <Button
                        type="submit"
                        className="gradient-cta w-full"
                        disabled={loading}
                      >
                        {loading ? 'Signing In...' : 'Sign In'}
                      </Button>
                    </form>
                  </div>
                </TabPanel>

                <TabPanel value="register">
                  <div className="space-y-6 mt-6">
                    {/* Google Sign-In Button */}
                    <Button
                      onClick={handleGoogleSignIn}
                      className="w-full flex items-center justify-center gap-3 bg-white text-gray-700 border border-gray-300 shadow-sm hover:bg-gray-50 normal-case"
                    >
                      <img src="/google-icon.svg" alt="Google" className="w-5 h-5" />
                      Continue with Google
                    </Button>

                    {/* Divider */}
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-neutralMedium dark:border-primaryNavy"></div>
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white dark:bg-primaryLight text-neutralDark dark:text-neutralMedium">
                          Or register with email
                        </span>
                      </div>
                    </div>

                    {/* Email/Password Form */}
                    <form onSubmit={handleRegister} className="space-y-6">
                      <Input
                        label="Full Name"
                        value={registerData.fullName}
                        onChange={(e) => setRegisterData({ ...registerData, fullName: e.target.value })}
                        required
                        className="dark:text-white"
                      />
                      
                      <Input
                        type="email"
                        label="Email"
                        value={registerData.email}
                        onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                        required
                        className="dark:text-white"
                      />
                      
                      <Input
                        type="password"
                        label="Password"
                        value={registerData.password}
                        onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                        required
                        className="dark:text-white"
                      />
                      
                      <Input
                        type="password"
                        label="Confirm Password"
                        value={registerData.confirmPassword}
                        onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                        required
                        className="dark:text-white"
                      />
                      
                      <Button
                        type="submit"
                        className="gradient-cta w-full"
                        disabled={loading}
                      >
                        {loading ? 'Creating Account...' : 'Create Account'}
                      </Button>
                    </form>
                  </div>
                </TabPanel>
              </TabsBody>
            </Tabs>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}
