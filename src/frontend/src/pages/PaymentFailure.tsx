import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, ShoppingBag, XCircle } from "lucide-react";

export function PaymentFailurePage() {
  return (
    <div className="container mx-auto px-4 py-24 max-w-md text-center">
      <div
        className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
        style={{ background: "oklch(var(--destructive) / 0.12)" }}
        data-ocid="payment-failure-icon"
      >
        <XCircle
          className="w-10 h-10"
          style={{ color: "oklch(var(--destructive))" }}
        />
      </div>
      <h1 className="font-display text-3xl font-semibold text-foreground mb-3">
        Payment Cancelled
      </h1>
      <p className="text-muted-foreground mb-8 leading-relaxed">
        Your payment was not completed. No charges were made. You can try again
        anytime.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Button
          onClick={() => window.history.back()}
          className="gap-2 w-full sm:w-auto"
          data-ocid="payment-failure-retry"
        >
          <ArrowLeft className="w-4 h-4" />
          Go Back
        </Button>
        <Link to="/store" search={{ q: "", artist: "", sort: "newest" }}>
          <Button
            variant="outline"
            className="gap-2 w-full sm:w-auto"
            data-ocid="payment-failure-browse"
          >
            <ShoppingBag className="w-4 h-4" />
            Browse Store
          </Button>
        </Link>
      </div>
    </div>
  );
}
