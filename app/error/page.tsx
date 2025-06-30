import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { XCircle, AlertTriangle, Mail } from "lucide-react"
import Link from "next/link"

export default function ErrorPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="max-w-lg w-full text-center">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <XCircle className="h-16 w-16 text-red-500" />
          </div>
          <CardTitle className="text-2xl text-red-700">Submission Error</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-gray-600">
            There was an error submitting your request. This could be due to several reasons:
          </p>

          <div className="bg-yellow-50 p-4 rounded-lg text-left">
            <div className="flex items-center mb-2">
              <AlertTriangle className="h-5 w-5 text-yellow-600 mr-2" />
              <span className="font-medium text-yellow-800">Common Issues:</span>
            </div>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• Missing required fields (marked with *)</li>
              <li>• Invalid email format</li>
              <li>• Network connectivity issues</li>
              <li>• Server configuration problems</li>
            </ul>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg text-left">
            <div className="flex items-center mb-2">
              <Mail className="h-5 w-5 text-blue-600 mr-2" />
              <span className="font-medium text-blue-800">Alternative Contact:</span>
            </div>
            <p className="text-sm text-blue-700">
              If the problem persists, you can email your request directly to:{" "}
              <a href="mailto:charles.onuoha@afya.care" className="underline">
                charles.onuoha@afya.care
              </a>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/"
              className="inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors"
            >
              Try Again
            </Link>
            <Link
              href="/debug"
              className="inline-block bg-gray-600 text-white px-6 py-2 rounded hover:bg-gray-700 transition-colors"
            >
              Debug Info
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
