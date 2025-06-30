"use server"

import { Resend } from "resend"
import { redirect } from "next/navigation"

// Configuration - easily changeable
const RECIPIENT_EMAIL = "charles.onuoha@afya.care"
const SENDER_EMAIL = "noreply@yourwebsite.com" // Change this to your domain
const COMPANY_NAME = "Bastion HMO" // Change to your company name

const resend = new Resend(process.env.RESEND_API_KEY)

export async function submitRightsRequest(formData: FormData) {
  try {
    // Extract form data
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

    const submissionDate = new Date().toLocaleString()
    const referenceNumber = `RR-${Date.now()}`

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

    // Send admin notification email
    await resend.emails.send({
      from: SENDER_EMAIL,
      to: RECIPIENT_EMAIL,
      subject: `New Rights Request Submission - ${data.name} (Ref: ${referenceNumber})`,
      text: adminEmailContent,
    })

    // Send user confirmation email (only if user provided an email)
    if (data.email && data.email.toString().trim() !== "") {
      await resend.emails.send({
        from: SENDER_EMAIL,
        to: data.email.toString(),
        subject: `Confirmation: Your Rights Request Has Been Received (Ref: ${referenceNumber})`,
        text: userEmailContent,
      })
    }

    // Redirect to success page with reference number
    redirect(`/success?ref=${referenceNumber}`)
  } catch (error) {
    console.error("Error submitting form:", error)
    redirect("/error")
  }
}
