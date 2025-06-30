import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { submitRightsRequest } from "./actions"

export default function RightsRequestForm() {
  return (
    <div className="min-h-screen bg-gray-50 py-4 px-4">
      <div className="max-w-4xl mx-auto">
        <Card className="w-full">
          <CardHeader className="text-center border-b">
            <CardTitle className="text-xl font-bold uppercase tracking-wide">
              REQUEST FOR IMPLEMENTATION OF RIGHTS
            </CardTitle>
            <div className="text-sm text-gray-600 mt-4 space-y-2">
              <p>
                Each of the rights listed below may be exercised by submitting this request at any location of the
                hospital in person or by proxy, as well as electronically, by e-mail Adeola.Idowu@bastionhmo.com
              </p>
              <p>
                Please complete in block letters and tick "X" where necessary. Fields marked with * are required for the
                application to be processed.
              </p>
            </div>
          </CardHeader>

          <CardContent className="p-6">
            <form action={submitRightsRequest} className="space-y-6">
              {/* Method Selection */}
              <div className="space-y-3">
                <RadioGroup name="method" defaultValue="in-person" className="flex gap-8">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="in-person" id="in-person" />
                    <Label htmlFor="in-person">In person</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="proxy" id="proxy" />
                    <Label htmlFor="proxy">proxy</Label>
                  </div>
                </RadioGroup>
                <p className="text-xs text-gray-500">(a copy of the power of attorney shall be enclosed)</p>
              </div>

              {/* Subject's Data */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg border-b pb-2">Subject's Data:</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">*Name*:</Label>
                    <Input id="name" name="name" required className="uppercase" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dob">*Date of Birth*:</Label>
                    <div className="grid grid-cols-3 gap-2">
                      <Input placeholder="Day" name="dob-day" required />
                      <Input placeholder="Month" name="dob-month" required />
                      <Input placeholder="Year" name="dob-year" required />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">*Address for correspondence*:</Label>
                  <Input id="address" name="address" placeholder="(city, postal code, street)" required />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="telephone">Telephone:</Label>
                    <Input id="telephone" name="telephone" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">E-mail:</Label>
                    <Input id="email" name="email" type="email" />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>Identification:</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                    {[
                      { id: "nin", label: "NIN" },
                      { id: "bvn", label: "BVN" },
                      { id: "passport", label: "INT-PASSPORT" },
                      { id: "license", label: "DRIVER'S LICENSE" },
                      { id: "others", label: "OTHERS" },
                    ].map((item) => (
                      <div key={item.id} className="flex items-center space-x-2">
                        <Checkbox id={item.id} name="identification" value={item.id} />
                        <Label htmlFor={item.id} className="text-xs">
                          {item.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Rights Selection */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg border-b pb-2">With regard to:</h3>
                <div className="space-y-3">
                  {[
                    "Right of access",
                    "Right to rectification",
                    "Right to erasure ('right to be forgotten')",
                    "Right to restriction of processing",
                    "Right to object",
                    "Right to automated decision making",
                    "Right to withdraw consent",
                  ].map((right, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Checkbox id={`right-${index}`} name="rights" value={right} />
                      <Label htmlFor={`right-${index}`} className="text-sm">
                        {right}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">*Description of the request*:</Label>
                <p className="text-sm text-gray-600 mb-2">
                  Please describe your request. In order to help you even more, we would like to know the reasons for
                  it.
                </p>
                <Textarea
                  id="description"
                  name="description"
                  required
                  className="min-h-[120px]"
                  placeholder="Please describe your request..."
                />
              </div>

              {/* Preferred Feedback Method */}
              <div className="space-y-3">
                <Label>*Preferred way for feedback on the request*:</Label>
                <RadioGroup name="feedback-method" defaultValue="correspondence">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="correspondence" id="correspondence" />
                    <Label htmlFor="correspondence" className="text-sm">
                      In writing to the correspondence address
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="hospital" id="hospital" />
                    <Label htmlFor="hospital" className="text-sm">
                      In Writing at hospital Branch
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="other" id="other" />
                    <Label htmlFor="other" className="text-sm">
                      Other
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Date and Signature */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="date">Date:</Label>
                  <Input id="date" name="date" type="date" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signature">Type your full name to sign:</Label>
                  <Input id="signature" name="signature" required placeholder="Type your full name here" />
                  <p className="text-sm text-blue-600">
                    By typing your name below, you agree to our{" "}
                    <a href="/terms" className="underline hover:text-blue-800">
                      terms
                    </a>{" "}
                    and{" "}
                    <a href="/privacy-policy" className="underline hover:text-blue-800">
                      privacy policy
                    </a>
                    .
                  </p>
                </div>
              </div>

              {/* Footer Note */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-center font-medium">
                  *Please note that we will respond to your request within 30 days, as required by law.*
                </p>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center pt-4">
                <Button type="submit" className="px-8 py-2 bg-blue-600 hover:bg-blue-700">
                  Submit Request
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
