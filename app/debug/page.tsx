import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Info, Server, Mail, Key } from "lucide-react"

export default function DebugPage() {
  const hasResendKey = !!process.env.RESEND_API_KEY
  const nodeEnv = process.env.NODE_ENV

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Info className="h-5 w-5 mr-2" />
              System Debug Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <Server className="h-4 w-4 text-gray-600 mr-2" />
                  <span className="font-medium">Environment</span>
                </div>
                <p className="text-sm text-gray-600">Node Environment: {nodeEnv || "Not set"}</p>
                <p className="text-sm text-gray-600">Build Time: {new Date().toISOString()}</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <Key className="h-4 w-4 text-gray-600 mr-2" />
                  <span className="font-medium">API Configuration</span>
                </div>
                <p className="text-sm text-gray-600">Resend API Key: {hasResendKey ? "✅ Configured" : "❌ Missing"}</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <Mail className="h-4 w-4 text-gray-600 mr-2" />
                  <span className="font-medium">Email Settings</span>
                </div>
                <p className="text-sm text-gray-600">Recipient: charles.onuoha@afya.care</p>
                <p className="text-sm text-gray-600">Sender: noreply@yourwebsite.com</p>
              </div>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg">
              <h3 className="font-medium text-yellow-800 mb-2">Troubleshooting Steps:</h3>
              <ol className="text-sm text-yellow-700 space-y-1 list-decimal list-inside">
                <li>Check that all required fields are filled</li>
                <li>Ensure email format is valid (if provided)</li>
                <li>Verify RESEND_API_KEY is set in environment variables</li>
                <li>Check browser console for JavaScript errors</li>
                <li>Try submitting with minimal data first</li>
              </ol>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-medium text-blue-800 mb-2">For Developers:</h3>
              <p className="text-sm text-blue-700">
                Check the server logs in Vercel dashboard → Functions tab → View Function Logs for detailed error
                information.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
