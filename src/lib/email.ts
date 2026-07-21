import { Resend } from "resend";
import { formatPrice } from "@/lib/utils";

const resend = new Resend(process.env.RESEND_API_KEY || "re_mock");
const SENDER_EMAIL = "Sri Avighna <orders@sriavighna.com>";

export async function sendPasswordResetEmail(email: string, token: string) {
  const baseUrl = process.env.NEXTAUTH_URL || process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const resetLink = `${baseUrl}/reset-password?token=${token}`;

  const html = `
    <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #121212;">
      <div style="text-align: center; padding: 30px 0; border-bottom: 1px solid #EFECE7;">
        <h1 style="margin: 0; font-size: 24px; font-weight: 300; letter-spacing: 2px; color: #C9A962;">SRI AVIGHNA</h1>
        <p style="margin: 5px 0 0; font-size: 12px; letter-spacing: 1px; color: #666;">1 GRAM GOLD JEWELLERY</p>
      </div>
      
      <div style="padding: 40px 20px;">
        <h2 style="font-weight: 400; margin-bottom: 20px;">Password Reset Request</h2>
        <p style="line-height: 1.6; color: #444;">We received a request to reset the password for your Sri Avighna account.</p>
        
        <div style="text-align: center; margin: 40px 0;">
          <a href="${resetLink}" style="background-color: #121212; color: #fff; text-decoration: none; padding: 14px 32px; border-radius: 4px; font-size: 14px; font-weight: 500; letter-spacing: 1px; display: inline-block;">
            RESET PASSWORD
          </a>
        </div>
        
        <p style="line-height: 1.6; color: #444; font-size: 14px;">If you did not request a password reset, please ignore this email or contact our support team if you have concerns.</p>
        <p style="line-height: 1.6; color: #444; font-size: 14px; margin-top: 30px;">
          Warm regards,<br>
          The Sri Avighna Team
        </p>
      </div>
      
      <div style="text-align: center; padding: 30px 20px; background-color: #F8F7F5; font-size: 12px; color: #666;">
        <p style="margin: 0;">© ${new Date().getFullYear()} Sri Avighna Collections. All rights reserved.</p>
      </div>
    </div>
  `;

  try {
    if (!process.env.RESEND_API_KEY) {
      console.log("[MOCK EMAIL] Password Reset link:", resetLink);
      return { success: true, mock: true };
    }

    const { data, error } = await resend.emails.send({
      from: SENDER_EMAIL,
      to: [email],
      subject: "Reset your Sri Avighna Password",
      html,
    });

    if (error) {
      console.error("Resend API Error:", error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (err) {
    console.error("Email dispatch failed:", err);
    return { success: false, error: err };
  }
}

type OrderData = {
  items: Array<{ name: string; quantity: number; price: number }>;
  customerName: string;
  orderNumber: string;
  createdAt: Date;
  subtotal: number;
  shipping: number;
  total: number;
  shippingAddress: string;
  city: string;
  state: string;
  pincode: string;
  customerPhone: string;
  customerEmail: string;
};

export async function sendOrderConfirmationEmail(order: OrderData) {
  const itemsHtml = order.items
    .map(
      (item) => `
    <tr>
      <td style="padding: 15px 0; border-bottom: 1px solid #EFECE7;">
        <p style="margin: 0; font-weight: 500;">${item.name}</p>
        <p style="margin: 5px 0 0; font-size: 13px; color: #666;">Qty: ${item.quantity}</p>
      </td>
      <td style="padding: 15px 0; border-bottom: 1px solid #EFECE7; text-align: right; font-weight: 500;">
        ${formatPrice(item.price * item.quantity)}
      </td>
    </tr>
  `
    )
    .join("");

  const html = `
    <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #121212;">
      <div style="text-align: center; padding: 30px 0; border-bottom: 1px solid #EFECE7;">
        <h1 style="margin: 0; font-size: 24px; font-weight: 300; letter-spacing: 2px; color: #C9A962;">SRI AVIGHNA</h1>
        <p style="margin: 5px 0 0; font-size: 12px; letter-spacing: 1px; color: #666;">1 GRAM GOLD JEWELLERY</p>
      </div>
      
      <div style="padding: 40px 20px;">
        <h2 style="font-weight: 400; margin-bottom: 20px;">Order Confirmation</h2>
        <p style="line-height: 1.6; color: #444;">Dear ${order.customerName},</p>
        <p style="line-height: 1.6; color: #444;">Thank you for your purchase. We are preparing your exquisite jewellery pieces for shipment. Below are your order details:</p>
        
        <div style="margin: 30px 0; padding: 20px; background-color: #F8F7F5; border-radius: 4px;">
          <p style="margin: 0 0 10px; font-size: 14px;"><strong>Order Number:</strong> ${order.orderNumber}</p>
          <p style="margin: 0; font-size: 14px;"><strong>Date:</strong> ${new Date(order.createdAt).toLocaleDateString()}</p>
        </div>

        <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
          <tbody>
            ${itemsHtml}
          </tbody>
          <tfoot>
            <tr>
              <td style="padding: 15px 0; font-weight: 500; color: #666;">Subtotal</td>
              <td style="padding: 15px 0; text-align: right; font-weight: 500; color: #666;">${formatPrice(order.subtotal)}</td>
            </tr>
            <tr>
              <td style="padding: 15px 0; font-weight: 500; color: #666;">Shipping</td>
              <td style="padding: 15px 0; text-align: right; font-weight: 500; color: #666;">${order.shipping === 0 ? "Complimentary" : formatPrice(order.shipping)}</td>
            </tr>
            <tr>
              <td style="padding: 15px 0; font-weight: 600; font-size: 18px;">Total</td>
              <td style="padding: 15px 0; text-align: right; font-weight: 600; font-size: 18px; color: #C9A962;">${formatPrice(order.total)}</td>
            </tr>
          </tfoot>
        </table>
        
        <h3 style="font-weight: 500; font-size: 16px; margin-top: 40px;">Shipping Address</h3>
        <p style="line-height: 1.6; color: #666; font-size: 14px;">
          ${order.customerName}<br>
          ${order.shippingAddress}<br>
          ${order.city}, ${order.state} ${order.pincode}<br>
          Phone: ${order.customerPhone}
        </p>

        <p style="line-height: 1.6; color: #444; font-size: 14px; margin-top: 40px;">You will receive another email once your order has been dispatched.</p>
        <p style="line-height: 1.6; color: #444; font-size: 14px; margin-top: 30px;">
          Warm regards,<br>
          The Sri Avighna Team
        </p>
      </div>
      
      <div style="text-align: center; padding: 30px 20px; background-color: #F8F7F5; font-size: 12px; color: #666;">
        <p style="margin: 0 0 10px;">Need help? Contact us at support@sriavighna.com</p>
        <p style="margin: 0;">© ${new Date().getFullYear()} Sri Avighna Collections. All rights reserved.</p>
      </div>
    </div>
  `;

  try {
    if (!process.env.RESEND_API_KEY) {
      console.log("[MOCK EMAIL] Order Confirmation for", order.orderNumber);
      return { success: true, mock: true };
    }

    const { data, error } = await resend.emails.send({
      from: SENDER_EMAIL,
      to: [order.customerEmail],
      subject: `Your Sri Avighna Order Confirmation (#${order.orderNumber})`,
      html,
    });

    if (error) {
      console.error("Resend API Error:", error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (err) {
    console.error("Email dispatch failed:", err);
    return { success: false, error: err };
  }
}
