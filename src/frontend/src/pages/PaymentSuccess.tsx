import { Button } from "@/components/ui/button";
import { useRecordPurchase } from "@/hooks/useMusic";
import { Link, useSearch } from "@tanstack/react-router";
import { CheckCircle2, Download, ShoppingBag } from "lucide-react";
import { useEffect, useRef } from "react";
import { toast } from "sonner";

export function PaymentSuccessPage() {
  const { trackId = "", session_id = "" } = useSearch({
    from: "/payment-success",
  });
  const recordPurchase = useRecordPurchase();
  const recorded = useRef(false);

  useEffect(() => {
    if (!recorded.current && trackId && session_id) {
      recorded.current = true;
      recordPurchase
        .mutateAsync({ trackId, sessionId: session_id })
        .catch(() => {
          toast.error(
            "Could not record your purchase. Please contact support.",
          );
        });
    }
  }, [trackId, session_id, recordPurchase]);

  return (
    <div className="container mx-auto px-4 py-24 max-w-md text-center">
      <div
        className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
        style={{ background: "oklch(var(--success) / 0.15)" }}
        data-ocid="payment-success-icon"
      >
        <CheckCircle2
          className="w-10 h-10"
          style={{ color: "oklch(var(--success))" }}
        />
      </div>
      <h1 className="font-display text-3xl font-semibold text-foreground mb-3">
        Purchase Complete!
      </h1>
      <p className="text-muted-foreground mb-2 leading-relaxed">
        Thank you for supporting Malagasy music. Your track is ready.
      </p>
      {trackId && (
        <p className="text-xs text-muted-foreground mb-8">
          Track ID: <span className="font-mono text-foreground">{trackId}</span>
        </p>
      )}
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        {trackId && (
          <Link to="/store/$id" params={{ id: trackId }}>
            <Button
              className="gap-2 w-full sm:w-auto"
              data-ocid="payment-success-download"
            >
              <Download className="w-4 h-4" />
              Access Track
            </Button>
          </Link>
        )}
        <Link to="/store" search={{ q: "", artist: "", sort: "newest" }}>
          <Button
            variant="outline"
            className="gap-2 w-full sm:w-auto"
            data-ocid="payment-success-browse"
          >
            <ShoppingBag className="w-4 h-4" />
            Browse More Music
          </Button>
        </Link>
      </div>
    </div>
  );
}
