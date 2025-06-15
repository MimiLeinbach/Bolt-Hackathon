// Environment diagnostic utility
export async function checkEnvironment() {
  const results: string[] = []
  
  // Check 1: Node.js and npm versions
  results.push('=== ENVIRONMENT CHECK ===')
  results.push(`User Agent: ${navigator.userAgent}`)
  results.push(`Current URL: ${window.location.href}`)
  
  // Check 2: Required environment variables
  results.push('\n=== ENVIRONMENT VARIABLES ===')
  const requiredEnvVars = [
    'VITE_SUPABASE_URL',
    'VITE_SUPABASE_ANON_KEY'
  ]
  
  requiredEnvVars.forEach(envVar => {
    const value = import.meta.env[envVar]
    if (value) {
      results.push(`✅ ${envVar}: ${value.substring(0, 20)}...`)
    } else {
      results.push(`❌ ${envVar}: MISSING`)
    }
  })
  
  // Check 3: Import tests
  results.push('\n=== MODULE IMPORTS ===')
  try {
    const React = await import('react')
    results.push('✅ React imported successfully')
  } catch (error) {
    results.push(`❌ React import failed: ${error}`)
  }
  
  try {
    const { supabase } = await import('../lib/supabase')
    results.push('✅ Supabase client imported successfully')
    
    // Test Supabase connection
    const { data, error } = await supabase.from('profiles').select('count').limit(1)
    if (error) {
      results.push(`⚠️  Supabase connection issue: ${error.message}`)
    } else {
      results.push('✅ Supabase connection working')
    }
  } catch (error) {
    results.push(`❌ Supabase import/connection failed: ${error}`)
  }
  
  try {
    const { BrowserRouter } = await import('react-router-dom')
    results.push('✅ React Router imported successfully')
  } catch (error) {
    results.push(`❌ React Router import failed: ${error}`)
  }
  
  // Check 4: CSS and Tailwind
  results.push('\n=== STYLING ===')
  const testElement = document.createElement('div')
  testElement.className = 'bg-primary-600 text-white p-4'
  document.body.appendChild(testElement)
  const styles = window.getComputedStyle(testElement)
  
  if (styles.backgroundColor && styles.backgroundColor !== 'rgba(0, 0, 0, 0)') {
    results.push('✅ Tailwind CSS is working')
  } else {
    results.push('❌ Tailwind CSS not loading properly')
  }
  document.body.removeChild(testElement)
  
  return results
}