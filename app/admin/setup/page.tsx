"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, AlertCircle, User, Key, Database, Settings, Loader2, ArrowRight, RefreshCw } from "lucide-react"
import { useRouter } from "next/navigation"

interface SetupStep {
  id: string
  title: string
  description: string
  icon: React.ComponentType<any>
  status: 'pending' | 'in_progress' | 'completed' | 'error'
  error?: string
}

interface SetupState {
  currentStep: number
  steps: SetupStep[]
  isLoading: boolean
  databaseConnected: boolean
  databaseError?: string
  setupCompleted: boolean
}

interface AdminFormData {
  email: string
  password: string
  confirmPassword: string
}

export default function SetupPage() {
  const router = useRouter()
  const [setupState, setSetupState] = useState<SetupState>({
    currentStep: 0,
    steps: [
      {
        id: 'database_check',
        title: 'Database Connection',
        description: 'Verify database connection and configuration',
        icon: Database,
        status: 'pending'
      },
      {
        id: 'database_setup',
        title: 'Database Setup',
        description: 'Create tables and seed initial data',
        icon: Settings,
        status: 'pending'
      },
      {
        id: 'admin_user',
        title: 'Create Admin User',
        description: 'Set up your administrator account',
        icon: User,
        status: 'pending'
      },
      {
        id: 'complete',
        title: 'Complete Setup',
        description: 'Finalize installation and configuration',
        icon: CheckCircle,
        status: 'pending'
      }
    ],
    isLoading: false,
    databaseConnected: false,
    setupCompleted: false
  })

  const [adminForm, setAdminForm] = useState<AdminFormData>({
    email: '',
    password: '',
    confirmPassword: ''
  })

  const [adminFormErrors, setAdminFormErrors] = useState<Partial<AdminFormData>>({})

  // Check setup status on load
  useEffect(() => {
    checkSetupStatus()
  }, [])

  const checkSetupStatus = async () => {
    try {
      const response = await fetch('/api/admin/setup')
      const data = await response.json()

      if (data.setupCompleted) {
        setSetupState(prev => ({
          ...prev,
          setupCompleted: true
        }))
        // Redirect to admin login if setup is completed
        setTimeout(() => router.push('/admin/login'), 3000)
        return
      }

      setSetupState(prev => ({
        ...prev,
        databaseConnected: data.databaseConnected,
        databaseError: data.databaseError
      }))

      // Update first step status
      updateStepStatus(0, data.databaseConnected ? 'completed' : 'error', data.databaseError)
    } catch (error) {
      console.error('Setup check failed:', error)
    }
  }

  const updateStepStatus = (stepIndex: number, status: SetupStep['status'], error?: string) => {
    setSetupState(prev => ({
      ...prev,
      steps: prev.steps.map((step, index) =>
        index === stepIndex ? { ...step, status, error } : step
      )
    }))
  }

  const testDatabaseConnection = async () => {
    setSetupState(prev => ({ ...prev, isLoading: true }))
    updateStepStatus(0, 'in_progress')

    try {
      const response = await fetch('/api/admin/setup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'test_database' })
      })

      const data = await response.json()

      updateStepStatus(0, data.success ? 'completed' : 'error', data.error)
      setSetupState(prev => ({
        ...prev,
        isLoading: false,
        databaseConnected: data.success,
        databaseError: data.error
      }))
    } catch (error) {
      updateStepStatus(0, 'error', 'Failed to test database connection')
      setSetupState(prev => ({ ...prev, isLoading: false }))
    }
  }

  const runDatabaseSetup = async () => {
    setSetupState(prev => ({ ...prev, isLoading: true, currentStep: 1 }))
    updateStepStatus(1, 'in_progress')

    try {
      const response = await fetch('/api/admin/setup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'setup_database' })
      })

      const data = await response.json()

      if (data.success) {
        updateStepStatus(1, 'completed')
        setSetupState(prev => ({ ...prev, currentStep: 2 }))
      } else {
        updateStepStatus(1, 'error', data.error)
      }

      setSetupState(prev => ({ ...prev, isLoading: false }))
    } catch (error) {
      updateStepStatus(1, 'error', 'Failed to run database setup')
      setSetupState(prev => ({ ...prev, isLoading: false }))
    }
  }

  const createAdminUser = async () => {
    // Validate form
    const errors: Partial<AdminFormData> = {}

    if (!adminForm.email) errors.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(adminForm.email)) errors.email = 'Invalid email format'

    if (!adminForm.password) errors.password = 'Password is required'
    else if (adminForm.password.length < 8) errors.password = 'Password must be at least 8 characters'

    if (adminForm.password !== adminForm.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match'
    }

    setAdminFormErrors(errors)
    if (Object.keys(errors).length > 0) return

    setSetupState(prev => ({ ...prev, isLoading: true }))
    updateStepStatus(2, 'in_progress')

    try {
      const response = await fetch('/api/admin/setup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'create_admin',
          adminData: {
            email: adminForm.email,
            password: adminForm.password
          }
        })
      })

      const data = await response.json()

      if (data.success) {
        updateStepStatus(2, 'completed')
        setSetupState(prev => ({ ...prev, currentStep: 3 }))
      } else {
        updateStepStatus(2, 'error', data.error)
      }

      setSetupState(prev => ({ ...prev, isLoading: false }))
    } catch (error) {
      updateStepStatus(2, 'error', 'Failed to create admin user')
      setSetupState(prev => ({ ...prev, isLoading: false }))
    }
  }

  const completeSetup = async () => {
    setSetupState(prev => ({ ...prev, isLoading: true }))
    updateStepStatus(3, 'in_progress')

    try {
      const response = await fetch('/api/admin/setup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'complete_setup' })
      })

      const data = await response.json()

      if (data.success) {
        updateStepStatus(3, 'completed')
        setSetupState(prev => ({ ...prev, setupCompleted: true }))

        // Redirect to admin login after a delay
        setTimeout(() => router.push('/admin/login'), 3000)
      } else {
        updateStepStatus(3, 'error', data.error)
      }

      setSetupState(prev => ({ ...prev, isLoading: false }))
    } catch (error) {
      updateStepStatus(3, 'error', 'Failed to complete setup')
      setSetupState(prev => ({ ...prev, isLoading: false }))
    }
  }

  const getStepIcon = (step: SetupStep) => {
    const Icon = step.icon
    const iconClass = step.status === 'completed' ? 'text-green-600' :
                     step.status === 'error' ? 'text-red-600' :
                     step.status === 'in_progress' ? 'text-blue-600 animate-pulse' :
                     'text-gray-400'

    return <Icon className={`w-8 h-8 ${iconClass}`} />
  }

  const getStepStatusColor = (status: SetupStep['status']) => {
    switch (status) {
      case 'completed': return 'border-green-200 bg-green-50'
      case 'error': return 'border-red-200 bg-red-50'
      case 'in_progress': return 'border-blue-200 bg-blue-50'
      default: return 'border-gray-200 bg-gray-50'
    }
  }

  if (setupState.setupCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <CardTitle className="text-2xl text-green-800">Setup Complete!</CardTitle>
            <CardDescription>
              Your ESHRM system has been successfully installed and configured.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-sm text-gray-600 mb-4">
              Redirecting to admin login in a few seconds...
            </p>
            <Button onClick={() => router.push('/admin/login')} className="w-full">
              Go to Admin Login
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const currentStep = setupState.steps[setupState.currentStep]
  const progress = ((setupState.currentStep + 1) / setupState.steps.length) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">ESHRM Setup Wizard</h1>
          <p className="text-gray-600">Complete the installation and configuration of your HR management system</p>
          <div className="mt-4">
            <Progress value={progress} className="w-full max-w-md mx-auto" />
            <p className="text-sm text-gray-500 mt-2">
              Step {setupState.currentStep + 1} of {setupState.steps.length}: {currentStep?.title}
            </p>
          </div>
        </div>

        {/* Steps Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {setupState.steps.map((step, index) => (
            <Card key={step.id} className={`transition-all ${getStepStatusColor(step.status)}`}>
              <CardContent className="p-4 text-center">
                <div className="flex justify-center mb-2">
                  {getStepIcon(step)}
                </div>
                <h3 className="font-semibold text-sm mb-1">{step.title}</h3>
                <p className="text-xs text-gray-600">{step.description}</p>
                {step.error && (
                  <Alert className="mt-2">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription className="text-xs">{step.error}</AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Current Step Content */}
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              {getStepIcon(currentStep)}
              {currentStep.title}
            </CardTitle>
            <CardDescription>{currentStep.description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Database Check Step */}
            {setupState.currentStep === 0 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">Database Connection Status</p>
                    <p className="text-sm text-gray-600">
                      {setupState.databaseConnected ? 'Connected successfully' : 'Connection failed'}
                    </p>
                  </div>
                  <div className={`w-3 h-3 rounded-full ${
                    setupState.databaseConnected ? 'bg-green-500' : 'bg-red-500'
                  }`} />
                </div>

                {setupState.databaseError && (
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Database Error:</strong> {setupState.databaseError}
                    </AlertDescription>
                  </Alert>
                )}

                <div className="flex gap-3">
                  <Button
                    onClick={testDatabaseConnection}
                    disabled={setupState.isLoading}
                    variant="outline"
                  >
                    {setupState.isLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    ) : (
                      <RefreshCw className="w-4 h-4 mr-2" />
                    )}
                    Test Connection
                  </Button>

                  {setupState.databaseConnected && (
                    <Button onClick={() => setSetupState(prev => ({ ...prev, currentStep: 1 }))}>
                      Continue
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  )}
                </div>
              </div>
            )}

            {/* Database Setup Step */}
            {setupState.currentStep === 1 && (
              <div className="space-y-4">
                <Alert>
                  <Settings className="h-4 w-4" />
                  <AlertDescription>
                    This will create all necessary database tables and seed initial data.
                    This process may take a few moments.
                  </AlertDescription>
                </Alert>

                <div className="flex gap-3">
                  <Button
                    onClick={runDatabaseSetup}
                    disabled={setupState.isLoading}
                  >
                    {setupState.isLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    ) : (
                      <Settings className="w-4 h-4 mr-2" />
                    )}
                    Run Database Setup
                  </Button>
                </div>
              </div>
            )}

            {/* Admin User Creation Step */}
            {setupState.currentStep === 2 && (
              <div className="space-y-4">
                <Alert>
                  <User className="h-4 w-4" />
                  <AlertDescription>
                    Create your administrator account. This account will have full access to the system.
                  </AlertDescription>
                </Alert>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="admin@example.com"
                      value={adminForm.email}
                      onChange={(e) => setAdminForm(prev => ({ ...prev, email: e.target.value }))}
                      className={adminFormErrors.email ? 'border-red-500' : ''}
                    />
                    {adminFormErrors.email && (
                      <p className="text-sm text-red-600 mt-1">{adminFormErrors.email}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter a secure password"
                      value={adminForm.password}
                      onChange={(e) => setAdminForm(prev => ({ ...prev, password: e.target.value }))}
                      className={adminFormErrors.password ? 'border-red-500' : ''}
                    />
                    {adminFormErrors.password && (
                      <p className="text-sm text-red-600 mt-1">{adminFormErrors.password}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Confirm your password"
                      value={adminForm.confirmPassword}
                      onChange={(e) => setAdminForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                      className={adminFormErrors.confirmPassword ? 'border-red-500' : ''}
                    />
                    {adminFormErrors.confirmPassword && (
                      <p className="text-sm text-red-600 mt-1">{adminFormErrors.confirmPassword}</p>
                    )}
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    onClick={createAdminUser}
                    disabled={setupState.isLoading}
                  >
                    {setupState.isLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    ) : (
                      <User className="w-4 h-4 mr-2" />
                    )}
                    Create Admin Account
                  </Button>
                </div>
              </div>
            )}

            {/* Complete Setup Step */}
            {setupState.currentStep === 3 && (
              <div className="space-y-4">
                <Alert>
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>
                    All setup steps have been completed successfully. Click the button below to finalize the installation.
                  </AlertDescription>
                </Alert>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">Setup Summary</h4>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>✓ Database connection established</li>
                    <li>✓ Database tables created</li>
                    <li>✓ Initial data seeded</li>
                    <li>✓ Admin user created</li>
                  </ul>
                </div>

                <div className="flex gap-3">
                  <Button
                    onClick={completeSetup}
                    disabled={setupState.isLoading}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    {setupState.isLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    ) : (
                      <CheckCircle className="w-4 h-4 mr-2" />
                    )}
                    Complete Setup
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
