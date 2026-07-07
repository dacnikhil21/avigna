import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  searchParams: Promise<{ order?: string }>;
}

export default async function CheckoutSuccessPage({ searchParams }: Props) {
  const { order } = await searchParams;

  return (
    <div className="section-padding pt-32 pb-20 min-h-[70vh] flex flex-col items-center justify-center text-center">
      <div className="w-20 h-20 rounded-full gold-gradient flex items-center justify-center mb-8">
        <CheckCircle className="w-10 h-10 text-white" />
      </div>
      <h1 className="heading-md mb-4">Thank You for Your Order</h1>
      <p className="body-lg max-w-md mb-2">
        Your payment has been received and your order is being prepared with the
        utmost care.
      </p>
      {order && (
        <p className="text-sm text-luxury-gold font-medium mb-8">
          Order Number: {order}
        </p>
      )}
      <p className="text-sm text-luxury-muted mb-10">
        A confirmation email will be sent shortly with tracking details.
      </p>
      <div className="flex gap-4">
        <Button variant="gold" asChild>
          <Link href="/shop">Continue Shopping</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/">Back to Home</Link>
        </Button>
      </div>
    </div>
  );
}
