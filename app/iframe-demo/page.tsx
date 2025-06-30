import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function IframeDemoPage() {
  const iframeCode = `<iframe 
  src="${typeof window !== "undefined" ? window.location.origin : "https://your-domain.com"}/embed" 
  width="100%" 
  height="1200" 
  frameborder="0" 
  style="border: none; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
</iframe>`

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Iframe Embedding Code</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-gray-600">Copy and paste this code into your WordPress website to embed the form:</p>
              <div className="bg-gray-100 p-4 rounded-lg">
                <code className="text-sm break-all">{iframeCode}</code>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">Customization Options:</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>
                    • Adjust the <code>height</code> attribute if needed (recommended: 1200px)
                  </li>
                  <li>
                    • Change <code>width</code> to a fixed pixel value if desired
                  </li>
                  <li>
                    • Modify the email recipient in <code>app/actions.ts</code>
                  </li>
                  <li>• Customize styling in the component files</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Live Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border rounded-lg overflow-hidden">
              <iframe
                src="/embed"
                width="100%"
                height="1200"
                style={{ border: "none" }}
                title="Rights Request Form Preview"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
