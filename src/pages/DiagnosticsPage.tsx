import React, { useState, useEffect } from 'react'
import { checkEnvironment } from '../utils/environmentCheck'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'

export function DiagnosticsPage() {
  const [results, setResults] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  const runDiagnostics = async () => {
    setLoading(true)
    try {
      const diagnosticResults = await checkEnvironment()
      setResults(diagnosticResults)
    } catch (error) {
      setResults([`❌ Diagnostics failed: ${error}`])
    }
    setLoading(false)
  }

  useEffect(() => {
    runDiagnostics()
  }, [])

  return (
    <div className="min-h-screen bg-neutral-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">Environment Diagnostics</h1>
          <p className="text-neutral-600">
            Checking if all required dependencies and configurations are working properly.
          </p>
        </div>

        <Card className="mb-6">
          <div className="text-center">
            <Button 
              onClick={runDiagnostics} 
              loading={loading}
              size="lg"
              className="mb-4"
            >
              {loading ? 'Running Diagnostics...' : 'Run Environment Check'}
            </Button>
            <p className="text-sm text-neutral-600">
              This will test React, Supabase, routing, and styling
            </p>
          </div>
        </Card>

        {results.length > 0 && (
          <Card>
            <h3 className="text-lg font-semibold text-neutral-900 mb-4">Diagnostic Results</h3>
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

        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <Card>
            <h3 className="text-lg font-semibold text-neutral-900 mb-3">Quick Tests</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-primary-600 rounded-full"></div>
                <span>Tailwind Primary Color</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-secondary-500 rounded-full"></div>
                <span>Tailwind Secondary Color</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-accent-500 rounded-full"></div>
                <span>Tailwind Accent Color</span>
              </div>
            </div>
          </Card>

          <Card>
            <h3 className="text-lg font-semibold text-neutral-900 mb-3">Environment Info</h3>
            <div className="space-y-1 text-sm text-neutral-600">
              <div>Mode: {import.meta.env.MODE}</div>
              <div>Dev: {import.meta.env.DEV ? 'Yes' : 'No'}</div>
              <div>Prod: {import.meta.env.PROD ? 'Yes' : 'No'}</div>
              <div>Base URL: {import.meta.env.BASE_URL}</div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}