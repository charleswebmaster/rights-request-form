"use server"

import { redirect } from "next/navigation"

// Configuration - easily changeable
const RECIPIENT_EMAIL = "charles.onuoha@afya.care"
const SENDER_EMAIL = "wecare@bastionhmo.com" // Change this to your domain
const COMPANY_NAME = "Bastion HMO" // Change to your company name

export async function submitRightsRequest(formData: FormData) {
  console.log("=== FORM SUBMISSION STARTED ===")

  try {
    // Extract and validate form data more safely
    const extractFormValue = (key: string): string => {
      const value = formData.get(key)
      return value ? value.toString().trim() : ""
    }

    const extractFormArray = (key: string): string[] => {
      const values = formData.getAll(key)
      return values.map((v) => v.toString().trim()).filter((v) => v.length > 0)
    }

    const data = {
      method: extractFormValue("method") || "in-person",
      name: extractFormValue("name"),
      dobDay: extractFormValue("dob-day"),
      dobMonth: extractFormValue("dob-month"),
      dobYear: extractFormValue("dob-year"),
      address: extractFormValue("address"),
      telephone: extractFormValue("telephone"),
      email: extractFormValue("email"),
      identification: extractFormArray("identification"),
      rights: extractFormArray("rights"),
      description: extractFormValue("description"),
      feedbackMethod: extractFormValue("feedback-method") || "correspondence",
      date: extractFormValue("date"),
      signature: extractFormValue("signature"),
    }

    console.log("Form data extracted successfully:", {
      name: data.name ? "✓" : "✗",
      email: data.email ? "✓" : "✗",
      description: data.description ? "✓" : "✗",
      signature: data.signature ? "✓" : "✗",
      rightsCount: data.rights.length,
    })

    // Validate required fields
    const requiredFields = [
      { field: "name", value: data.name, label: "Name" },
      { field: "dobDay", value: data.dobDay, label: "Birth Day" },
      { field: "dobMonth", value: data.dobMonth, label: "Birth Month" },
      { field: "dobYear", value: data.dobYear, label: "Birth Year" },
      { field: "address", value: data.address, label: "Address" },
      { field: "description", value: data.description, label: "Description" },
      { field: "signature", value: data.signature, label: "Signature" },
      { field: "date", value: data.date, label: "Date" },
    ]

    const missingFields = requiredFields.filter(({ value }) => !value || value.length === 0)

    if (missingFields.length > 0) {
      const missingLabels = missingFields.map(({ label }) => label).join(", ")
      console.error("Missing required fields:", missingLabels)
      throw new Error(`Missing required fields: ${missingLabels}`)
    }

    console.log("All required fields validated successfully")

    const submissionDate = new Date().toLocaleString("en-US", {
      timeZone: "UTC",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
    const referenceNumber = `RR-${Date.now()}-${Math.random().toString(36).substr(2, 5).toUpperCase()}`

    console.log("Generated reference number:", referenceNumber)

    // Format the admin notification email
    const adminEmailContent = `REQUEST FOR IMPLEMENTATION OF RIGHTS - NEW SUBMISSION

REFERENCE NUMBER: ${referenceNumber}
==========================================

SUBMISSION DETAILS:
==================
Submission Method: ${data.method}
Date Submitted: ${submissionDate}

SUBJECT'S DATA:
===============
Name: ${data.name}
Date of Birth: ${data.dobDay}/${data.dobMonth}/${data.dobYear}
Address for Correspondence: ${data.address}
Telephone: ${data.telephone || "Not provided"}
Email: ${data.email || "Not provided"}
Identification Types: ${data.identification.length > 0 ? data.identification.join(", ") : "None selected"}

RIGHTS REQUESTED:
=================
${data.rights.length > 0 ? data.rights.map((right) => `• ${right}`).join("\n") : "No rights selected"}

REQUEST DESCRIPTION:
====================
${data.description}

PREFERRED FEEDBACK METHOD:
==========================
${data.feedbackMethod}

SIGNATURE & DATE:
=================
Digital Signature: ${data.signature}
Date: ${data.date}

---
This form was submitted electronically and constitutes a valid request for implementation of rights.
The submitter has agreed to the terms and privacy policy by providing their digital signature.`

    // Format the user confirmation email
    const userEmailContent = `Dear ${data.name},

Thank you for submitting your Request for Implementation of Rights. We have successfully received your request and wanted to confirm the details with you.

SUBMISSION CONFIRMATION
=======================
Reference Number: ${referenceNumber}
Date Submitted: ${submissionDate}
Status: Received and Under Review

YOUR SUBMISSION DETAILS:
========================
Name: ${data.name}
Date of Birth: ${data.dobDay}/${data.dobMonth}/${data.dobYear}
Submission Method: ${data.method}

Rights Requested:
${data.rights.length > 0 ? data.rights.map((right) => `• ${right}`).join("\n") : "No rights selected"}

Request Description:
${data.description}

Preferred Feedback Method: ${data.feedbackMethod}

WHAT HAPPENS NEXT?
==================
• We will review your request within 30 days as required by law
• You will receive our response via your preferred feedback method
• If you have any questions, please reference your submission number: ${referenceNumber}

IMPORTANT INFORMATION:
======================
• Please keep this email for your records
• Your request is being processed according to applicable data protection laws
• We may contact you if we need additional information to process your request

If you have any questions about your submission, please contact us and reference your submission number: ${referenceNumber}

Thank you for your request.

Best regards,
${COMPANY_NAME} Data Protection Team

---
This is an automated confirmation email. Please do not reply to this email.
If you need assistance, please contact us through our official channels.`

    console.log("Email content prepared successfully")

    // Email sending logic with better error handling
    let emailsSent = false

    if (process.env.RESEND_API_KEY) {
      console.log("RESEND_API_KEY found, attempting to send emails...")

      try {
        // Dynamic import to avoid build-time issues
        const { Resend } = await import("resend")
        const resend = new Resend(process.env.RESEND_API_KEY)

        console.log("Resend client initialized successfully")

        // Send admin notification email
        console.log("Sending admin notification email...")
        const adminResult = await resend.emails.send({
          from: SENDER_EMAIL,
          to: RECIPIENT_EMAIL,
          subject: `New Rights Request - ${data.name} (${referenceNumber})`,
          text: adminEmailContent,
        })

        console.log("Admin email result:", adminResult)

        // Send user confirmation email (only if user provided an email)
        if (data.email && data.email.includes("@")) {
          console.log("Sending user confirmation email to:", data.email)
          const userResult = await resend.emails.send({
            from: SENDER_EMAIL,
            to: data.email,
            subject: `Rights Request Confirmation (${referenceNumber})`,
            text: userEmailContent,
          })
          console.log("User email result:", userResult)
        } else {
          console.log("No valid user email provided, skipping user confirmation")
        }

        emailsSent = true
        console.log("All emails sent successfully")
      } catch (emailError) {
        console.error("Email sending failed:", emailError)
        console.error("Email error details:", {
          message: emailError instanceof Error ? emailError.message : String(emailError),
          name: emailError instanceof Error ? emailError.name : "Unknown",
        })
        // Continue without throwing - form submission should succeed even if emails fail
      }
    } else {
      console.log("RESEND_API_KEY not configured - emails will not be sent")
      console.log("Would send admin email to:", RECIPIENT_EMAIL)
      if (data.email) {
        console.log("Would send user confirmation to:", data.email)
      }
    }

    console.log("Form processing completed successfully")
    console.log("Redirecting to success page with reference:", referenceNumber)

    // Use revalidatePath to ensure clean redirect
    const { revalidatePath } = await import("next/cache")
    revalidatePath("/success")

    // Redirect to success page with reference number
    redirect(`/success?ref=${referenceNumber}&emails=${emailsSent ? "sent" : "skipped"}`)
  } catch (error) {
    console.error("=== FORM SUBMISSION ERROR ===")
    console.error("Error occurred in submitRightsRequest")
    console.error("Error type:", error?.constructor?.name || typeof error)
    console.error("Error message:", error instanceof Error ? error.message : String(error))

    if (error instanceof Error && error.stack) {
      console.error("Error stack:", error.stack)
    }

    console.error("=== END ERROR LOG ===")

    // Use revalidatePath before redirect
    try {
      const { revalidatePath } = await import("next/cache")
      revalidatePath("/error")
    } catch (revalidateError) {
      console.error("Revalidate error:", revalidateError)
    }

    // Redirect to error page
    redirect("/error")
  }
}
