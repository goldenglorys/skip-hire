import { useEffect, useState } from "react";
import { X, Truck } from "lucide-react";
import { Button } from "./ui/button";
import { formatCurrency, calculateTotalPrice } from "../lib/utils";
import type { Skip } from "../types/skip";

interface SuccessModalProps {
  skip: Skip;
  isOpen: boolean;
  onClose: () => void;
}

export function SuccessModal({ skip, isOpen, onClose }: SuccessModalProps) {
  const [showCheckmark, setShowCheckmark] = useState(false);
  const totalPrice = calculateTotalPrice(skip.price_before_vat, skip.vat);

  useEffect(() => {
    if (isOpen) {
      // Delay checkmark animation slightly for better effect
      const timer = setTimeout(() => setShowCheckmark(true), 300);
      return () => clearTimeout(timer);
    } else {
      setShowCheckmark(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="bg-background rounded-2xl border shadow-2xl max-w-md w-full mx-auto transform transition-all duration-300 scale-100"
          role="dialog"
          aria-labelledby="success-title"
          aria-describedby="success-description"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <h2
              id="success-title"
              className="text-xl font-bold text-foreground"
            >
              Skip Selected!
            </h2>
            <button
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded-full hover:bg-muted/50"
              aria-label="Close modal"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 text-center">
            {/* Animated Checkmark */}
            <div className="relative mb-6">
              <div className="w-20 h-20 mx-auto relative">
                {/* Circle */}
                <svg
                  className="w-20 h-20 transform -rotate-90"
                  viewBox="0 0 80 80"
                >
                  <circle
                    cx="40"
                    cy="40"
                    r="36"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                    className="text-green-500"
                    strokeDasharray="226"
                    strokeDashoffset={showCheckmark ? "0" : "226"}
                    style={{
                      transition: "stroke-dashoffset 0.6s ease-in-out",
                    }}
                  />
                </svg>

                {/* Checkmark */}
                <svg className="absolute inset-0 w-20 h-20" viewBox="0 0 80 80">
                  <path
                    d="M25 42l10 10 20-20"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-green-500"
                    strokeDasharray="50"
                    strokeDashoffset={showCheckmark ? "0" : "50"}
                    style={{
                      transition: "stroke-dashoffset 0.6s ease-in-out 0.3s",
                    }}
                  />
                </svg>
              </div>
            </div>

            {/* Skip Details */}
            <div className="space-y-4">
              <div className="flex items-center justify-center mb-4">
                <Truck className="h-6 w-6 text-primary mr-2" />
                <span className="text-2xl font-bold text-foreground">
                  {skip.size} Yard Skip
                </span>
              </div>

              <div className="bg-muted/50 rounded-lg p-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-muted-foreground">Total Price</div>
                    <div className="font-bold text-lg text-primary">
                      {formatCurrency(totalPrice)}
                    </div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Hire Period</div>
                    <div className="font-semibold">
                      {skip.hire_period_days} days
                    </div>
                  </div>
                </div>
              </div>

              <div
                id="success-description"
                className="text-muted-foreground text-sm"
              >
                Your skip selection has been confirmed. You can now proceed with
                the booking process.
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t space-y-3">
            <Button
              onClick={onClose}
              className="w-full cursor-pointer"
              size="lg"
            >
              Continue Booking
            </Button>
            <Button
              onClick={onClose}
              variant="outline"
              className="w-full cursor-pointer"
              size="sm"
            >
              Choose Different Skip
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
