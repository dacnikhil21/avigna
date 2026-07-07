import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="section-padding pt-32 pb-20 min-h-[70vh] flex flex-col items-center justify-center text-center">
      <p className="label-luxury mb-4">404</p>
      <h1 className="heading-lg mb-4">Page Not Found</h1>
      <p className="body-lg max-w-md mb-10">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Button variant="gold" asChild>
        <Link href="/">Return Home</Link>
      </Button>
    </div>
  );
}
