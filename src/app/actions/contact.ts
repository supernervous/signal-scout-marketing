"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export interface ContactFormState {
  success: boolean;
  error: string | null;
}

export async function submitContactForm(
  _prev: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const name = formData.get("name") as string;
  const org = formData.get("org") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const message = formData.get("message") as string;

  // Basic validation
  if (!name || !email || !message) {
    return { success: false, error: "Name, email, and message are required." };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { success: false, error: "Please enter a valid email address." };
  }

  try {
    await resend.emails.send({
      from: "Signal Scout <onboarding@resend.dev>",
      to: process.env.CONTACT_EMAIL ?? "contact@nervousenergy.com",
      replyTo: email,
      subject: `Signal Scout Inquiry — ${name}${org ? ` (${org})` : ""}`,
      html: `
        <div style="font-family: monospace; max-width: 600px; margin: 0 auto; background: #0a0e1a; color: #c8d3de; padding: 32px; border: 1px solid #1e2536;">
          <div style="border-bottom: 1px solid #1e2536; padding-bottom: 16px; margin-bottom: 24px;">
            <span style="color: #18b3c6; font-size: 11px; text-transform: uppercase; letter-spacing: 2px;">New Inquiry</span>
          </div>
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr>
              <td style="padding: 8px 16px 8px 0; color: #6b7a90; white-space: nowrap; vertical-align: top;">Name</td>
              <td style="padding: 8px 0;">${name}</td>
            </tr>
            ${org ? `<tr><td style="padding: 8px 16px 8px 0; color: #6b7a90; white-space: nowrap; vertical-align: top;">Organization</td><td style="padding: 8px 0;">${org}</td></tr>` : ""}
            <tr>
              <td style="padding: 8px 16px 8px 0; color: #6b7a90; white-space: nowrap; vertical-align: top;">Email</td>
              <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #18b3c6;">${email}</a></td>
            </tr>
            ${phone ? `<tr><td style="padding: 8px 16px 8px 0; color: #6b7a90; white-space: nowrap; vertical-align: top;">Phone</td><td style="padding: 8px 0;">${phone}</td></tr>` : ""}
          </table>
          <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #1e2536;">
            <div style="color: #6b7a90; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 12px;">Message</div>
            <div style="white-space: pre-wrap; line-height: 1.6;">${message}</div>
          </div>
        </div>
      `,
    });

    return { success: true, error: null };
  } catch {
    return {
      success: false,
      error: "Unable to send message. Please try again or email us directly.",
    };
  }
}
