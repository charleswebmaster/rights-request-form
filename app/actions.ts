"use server"

import { redirect } from "next/navigation"

// Configuration - easily changeable
const RECIPIENT_EMAIL = "charles.onuoha@afya.care"
const SENDER_EMAIL = "noreply@yourwebsite.com" // Change this to your domain
const COMPANY_NAME = "Bastion HMO" // Change to your company name

export async function submitRightsRequest(formData: FormData) {
  console.log("=== FORM SUBMISSION STARTED ===")

  try {
    // Extract form data with validation
    const data = {
      method: formData.get("method"),
      name: formData.get("name"),
      dobDay: formData.get("dob-day"),
      dobMonth: formData.get("dob-month"),
      dobYear: formData.get("dob-year"),
      address: formData.get("address"),
      telephone: formData.get("telephone"),
      email: formData.get("email"),
      identification: formData.getAll("identification"),
      rights: formData.getAll("rights"),
      description: formData.get("description"),
      feedbackMethod: formData.get("feedback-method"),
      date: formData.get("date"),
      signature: formData.get("signature"),
    }

    console.log("Form data extracted:", {
      name: data.name,
      email: data.email,
      hasDescription: !!data.description,
      hasSignature: !!data.signature,
      rightsCount: data.rights.length,
    })

    // Validate required fields
    const requiredFields = {
      name: data.name,
      dobDay: data.dobDay,
      dobMonth: data.dobMonth,
      dobYear: data.dobYear,
      address: data.address,
      description: data.description,
      signature: data.signature,
      date: data.date,
    }

    const missingFields = Object.entries(requiredFields)
      .filter(([key, value]) => !value || value.toString().trim() === "")
      .map(([key]) => key)

    if (missingFields.length > 0) {
      console.error("Missing required fields:", missingFields)
      throw new Error(`Missing required fields: ${missingFields.join(", ")}`)
    }

    const submissionDate = new Date().toLocaleString()
    const referenceNumber = `RR-${Date.now()}`

    console.log("Generated reference number:", referenceNumber)

    // Format the admin notification email
    const adminEmailContent = `
REQUEST FOR IMPLEMENTATION OF RIGHTS - NEW SUBMISSION

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
The submitter has agreed to the terms and privacy policy by providing their digital signature.
    `.trim()

    // Format the user confirmation email
    const userEmailContent = `
Dear ${data.name},

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
If you need assistance, please contact us through our official channels.
    `.trim()

    // Email sending logic
    console.log("Checking for RESEND_API_KEY...")
    if (process.env.RESEND_API_KEY) {
      console.log("RESEND_API_KEY found, attempting to send emails...")

      try {
        // Import Resend only when needed
        const { Resend } = await import("resend")
        const resend = new Resend(process.env.RESEND_API_KEY)

        console.log("Sending admin notification email...")
        // Send admin notification email
        const adminResult = await resend.emails.send({
          from: SENDER_EMAIL,
          to: RECIPIENT_EMAIL,
          subject: `New Rights Request Submission - ${data.name} (Ref: ${referenceNumber})`,
          text: adminEmailContent,
        })
        console.log("Admin email sent successfully:", adminResult.data?.id)

        // Send user confirmation email (only if user provided an email)
        if (data.email && data.email.toString().trim() !== "") {
          console.log("Sending user confirmation email to:", data.email)
          const userResult = await resend.emails.send({
            from: SENDER_EMAIL,
            to: data.email.toString(),
            subject: `Confirmation: Your Rights Request Has Been Received (Ref: ${referenceNumber})`,
            text: userEmailContent,
          })
          console.log("User email sent successfully:", userResult.data?.id)
        } else {
          console.log("No user email provided, skipping user confirmation")
        }
      } catch (emailError) {
        console.error("Error sending emails:", emailError)
        // Log the specific error details
        if (emailError instanceof Error) {
          console.error("Email error message:", emailError.message)
          console.error("Email error stack:", emailError.stack)
        }
        // Don't throw here - continue with the process even if email fails
        console.log("Continuing with form submission despite email error...")
      }
    } else {
      console.log("RESEND_API_KEY not found. Emails would be sent to:", RECIPIENT_EMAIL)
      console.log("Admin email content preview:", adminEmailContent.substring(0, 200) + "...")
      if (data.email) {
        console.log("User confirmation would be sent to:", data.email)
      }
    }

    console.log("Form submission completed successfully, redirecting to success page...")
    // Redirect to success page with reference number
    redirect(`/success?ref=${referenceNumber}`)
  } catch (error) {
    console.error("=== FORM SUBMISSION ERROR ===")
    console.error("Error type:", typeof error)
    console.error("Error message:", error instanceof Error ? error.message : String(error))
    console.error("Error stack:", error instanceof Error ? error.stack : "No stack trace")
    console.error("=== END ERROR LOG ===")

    // Redirect to error page
    redirect("/error")
  }
}
