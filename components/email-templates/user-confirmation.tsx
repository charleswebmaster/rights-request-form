interface UserConfirmationEmailProps {
  name: string
  referenceNumber: string
  submissionDate: string
  rights: string[]
  description: string
  feedbackMethod: string
  companyName: string
}

export function UserConfirmationEmail({
  name,
  referenceNumber,
  submissionDate,
  rights,
  description,
  feedbackMethod,
  companyName,
}: UserConfirmationEmailProps) {
  return (
    <div style={{ fontFamily: "Arial, sans-serif", maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <div style={{ backgroundColor: "#f8f9fa", padding: "20px", borderRadius: "8px", marginBottom: "20px" }}>
        <h1 style={{ color: "#28a745", textAlign: "center", marginBottom: "10px" }}>✅ Request Confirmation</h1>
        <p style={{ textAlign: "center", fontSize: "18px", fontWeight: "bold", color: "#333" }}>
          Reference: {referenceNumber}
        </p>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <p>Dear {name},</p>
        <p>
          Thank you for submitting your Request for Implementation of Rights. We have successfully received your request
          and wanted to confirm the details with you.
        </p>
      </div>

      <div style={{ backgroundColor: "#e9ecef", padding: "15px", borderRadius: "5px", marginBottom: "20px" }}>
        <h3 style={{ color: "#495057", marginTop: "0" }}>Submission Details</h3>
        <p>
          <strong>Reference Number:</strong> {referenceNumber}
        </p>
        <p>
          <strong>Date Submitted:</strong> {submissionDate}
        </p>
        <p>
          <strong>Status:</strong> Received and Under Review
        </p>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <h3 style={{ color: "#495057" }}>Rights Requested:</h3>
        <ul>
          {rights.map((right, index) => (
            <li key={index}>{right}</li>
          ))}
        </ul>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <h3 style={{ color: "#495057" }}>Request Description:</h3>
        <p style={{ backgroundColor: "#f8f9fa", padding: "10px", borderRadius: "5px" }}>{description}</p>
      </div>

      <div style={{ backgroundColor: "#d4edda", padding: "15px", borderRadius: "5px", marginBottom: "20px" }}>
        <h3 style={{ color: "#155724", marginTop: "0" }}>What Happens Next?</h3>
        <ul style={{ color: "#155724" }}>
          <li>We will review your request within 30 days as required by law</li>
          <li>You will receive our response via: {feedbackMethod}</li>
          <li>Please keep this email for your records</li>
          <li>We may contact you if additional information is needed</li>
        </ul>
      </div>

      <div style={{ borderTop: "1px solid #dee2e6", paddingTop: "20px", textAlign: "center" }}>
        <p style={{ fontSize: "14px", color: "#6c757d" }}>
          Best regards,
          <br />
          {companyName} Data Protection Team
        </p>
        <p style={{ fontSize: "12px", color: "#6c757d", marginTop: "20px" }}>
          This is an automated confirmation email. Please do not reply to this email.
          <br />
          If you need assistance, please contact us through our official channels.
        </p>
      </div>
    </div>
  )
}
