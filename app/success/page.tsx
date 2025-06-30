"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Mail, FileText } from "lucide-react"
import Link from "next/link"

export default function SuccessPage({
  searchParams,
}: {
  searchParams: { ref?: string }
}) {
  const referenceNumber = searchParams.ref

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="max-w-lg w-full">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <CardTitle className="text-2xl text-green-700">Request Submitted Successfully!</CardTitle>
          {referenceNumber && (
            <div className="bg-green-50 p-3 rounded-lg mt-4">
              <p className="text-sm font-medium text-green-800">Reference Number:</p>
              <p className="text-lg font-bold text-green-900">{referenceNumber}</p>
            </div>
          )}
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="text-center space-y-4">
            <p className="text-gray-600">
              Your request for implementation of rights has been submitted successfully. We will respond to your request
              within 30 days as required by law.
            </p>

            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center justify-center mb-2">
                <Mail className="h-5 w-5 text-blue-600 mr-2" />
                <span className="font-medium text-blue-800">Email Confirmation Sent</span>
              </div>
              <p className="text-sm text-blue-700">
                A confirmation email with your submission details has been sent to the email address you provided.
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center justify-center mb-2">
                <FileText className="h-5 w-5 text-gray-600 mr-2" />
                <span className="font-medium text-gray-800">What Happens Next?</span>
              </div>
              <ul className="text-sm text-gray-600 text-left space-y-1">
                <li>• We will review your request within 30 days</li>
                <li>• You'll receive our response via your preferred method</li>
                <li>• Keep your reference number for future correspondence</li>
                <li>• We may contact you if additional information is needed</li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/"
              className="inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors text-center"
            >
              Submit Another Request
            </Link>
            <button
              onClick={() => window.print()}
              className="inline-block bg-gray-600 text-white px-6 py-2 rounded hover:bg-gray-700 transition-colors"
            >
              Print This Page
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
