import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { checkEnvironment, getEnvironmentSummary } from '../utils/environmentCheck'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { ArrowLeft, RefreshCw, ExternalLink, CheckCircle, XCircle, AlertCircle } from 'lucide-react'

export function DiagnosticsPage() {
  const [results, setResults] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [summary, setSummary] = useState(getEnvironmentSummary())

  const runDiagnostics = async () => {
    setLoading(true)
    try {
      const diagnosticResults = await checkEnvironment()
      setResults(diagnosticResults)
      setSummary(getEnvironmentSummary())
    } catch (error) {
      setResults([`❌ Diagnostics failed: ${error}`])
    }
    setLoading(false)
  }

  useEffect(() => {
    runDiagnostics()
  }, [])

  const getStatusIcon = (status: boolean) => {
    return status ? (
      <CheckCircle className="w-5 h-5 text-green-600" />
    ) : (
      <XCircle className="w-5 h-5 text-red-600" />
    )
  }

  return (
    <div className="min-h-screen bg-neutral-50 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 mb-4">
            <ArrowLeft className="w-4 h-4" />
            Back to App
          </Link>
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">System Diagnostics</h1>
          <p className="text-neutral-600">
            Checking if all required dependencies and configurations are working properly.
          </p>
        </div>

        {/* Quick Status Overview */}
        <Card className="mb-6">
          <h3 className="text-lg font-semibold text-neutral-900 mb-4">System Status</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-center gap-3 p-3 bg-neutral-50 rounded-lg">
              {getStatusIcon(summary.hasSupabaseConfig)}
              <div>
                <div className="font-medium text-sm">Database</div>
                <div className="text-xs text-neutral-600">
                  {summary.hasSupabaseConfig ? 'Connected' : 'Not configured'}
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-neutral-50 rounded-lg">
              {getStatusIcon(summary.isDev)}
              <div>
                <div className="font-medium text-sm">Environment</div>
                <div className="text-xs text-neutral-600">
                  {summary.isDev ? 'Development' : 'Production'}
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-neutral-50 rounded-lg">
              {getStatusIcon(window.location.protocol === 'http:')}
              <div>
                <div className="font-medium text-sm">Protocol</div>
                <div className="text-xs text-neutral-600">
                  {window.location.protocol}
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-neutral-50 rounded-lg">
              {getStatusIcon(window.location.port === '5173')}
              <div>
                <div className="font-medium text-sm">Port</div>
                <div className="text-xs text-neutral-600">
                  {window.location.port || '80'}
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <Card padding="sm">
            <div className="text-center">
              <Button 
                onClick={runDiagnostics} 
                loading={loading}
                className="w-full mb-2"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                {loading ? 'Running...' : 'Run Diagnostics'}
              </Button>
              <p className="text-xs text-neutral-600">
                Test all systems
              </p>
            </div>
          </Card>

          <Card padding="sm">
            <div className="text-center">
              <Button 
                variant="secondary"
                onClick={() => window.location.reload()}
                className="w-full mb-2"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Reload Page
              </Button>
              <p className="text-xs text-neutral-600">
                Fresh start
              </p>
            </div>
          </Card>

          <Card padding="sm">
            <div className="text-center">
              <Button 
                variant="accent"
                onClick={() => window.open(`${window.location.protocol}//${window.location.hostname}:5173`, '_blank')}
                className="w-full mb-2"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Open Direct Link
              </Button>
              <p className="text-xs text-neutral-600">
                Try direct access
              </p>
            </div>
          </Card>
        </div>

        {/* Connection Test */}
        <Card className="mb-6">
          <h3 className="text-lg font-semibold text-neutral-900 mb-4">Connection Information</h3>
          <div className="bg-neutral-900 text-neutral-100 p-4 rounded-lg font-mono text-sm">
            <div className="space-y-1">
              <div>Current URL: <span className="text-blue-400">{window.location.href}</span></div>
              <div>Protocol: <span className="text-green-400">{window.location.protocol}</span></div>
              <div>Host: <span className="text-yellow-400">{window.location.host}</span></div>
              <div>Port: <span className="text-purple-400">{window.location.port || 'default'}</span></div>
              <div>User Agent: <span className="text-neutral-400">{navigator.userAgent.substring(0, 80)}...</span></div>
            </div>
          </div>
        </Card>

        {/* Diagnostic Results */}
        {results.length > 0 && (
          <Card className="mb-6">
            <h3 className="text-lg font-semibold text-neutral-900 mb-4">Detailed Diagnostic Results</h3>
            <div className="bg-neutral-900 text-neutral-100 p-4 rounded-lg font-mono text-sm space-y-1 max-h-96 overflow-y-auto">
              {results.map((result, index) => (
                <div 
                  key={index} 
                  className={
                    result.includes('✅') ? 'text-green-400' :
                    result.includes('❌') ? 'text-red-400' :
                    result.includes('⚠️') ? 'text-yellow-400' :
                    result.includes('===') ? 'text-blue-400 font-bold' :
                    'text-neutral-300'
                  }
                >
                  {result}
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Troubleshooting Guide */}
        <Card>
          <h3 className="text-lg font-semibold text-neutral-900 mb-4">Troubleshooting Guide</h3>
          <div className="space-y-4 text-sm">
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-900 mb-2">If the app isn't loading:</h4>
                  <ul className="text-blue-800 space-y-1 ml-4">
                    <li>• Check that you're accessing the correct URL</li>
                    <li>• Try the "Open Direct Link" button above</li>
                    <li>• Clear your browser cache and reload</li>
                    <li>• Try a different browser or incognito mode</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-green-900 mb-2">If Supabase isn't working:</h4>
                  <ul className="text-green-800 space-y-1 ml-4">
                    <li>• Verify .env file has correct VITE_SUPABASE_URL</li>
                    <li>• Verify .env file has correct VITE_SUPABASE_ANON_KEY</li>
                    <li>• Restart the development server after changing .env</li>
                    <li>• Check Supabase project status in dashboard</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-yellow-900 mb-2">If styles aren't loading:</h4>
                  <ul className="text-yellow-800 space-y-1 ml-4">
                    <li>• Verify Tailwind CSS is properly configured</li>
                    <li>• Check that index.css is being imported in main.tsx</li>
                    <li>• Try hard refresh (Ctrl+F5 or Cmd+Shift+R)</li>
                    <li>• Check browser developer tools for CSS errors</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}