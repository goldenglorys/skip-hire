import { ArrowRight, Truck, Check, Clock, Shield } from "lucide-react";
import { Button } from "./ui/button";
import { formatCurrency, calculateTotalPrice } from "../lib/utils";
import type { Skip } from "../types/skip";

interface SelectedSkipPanelProps {
  selectedSkip: Skip;
  onContinue: () => void;
  buttonId?: string;
}

export function SelectedSkipPanel({
  selectedSkip,
  onContinue,
  buttonId,
}: SelectedSkipPanelProps) {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-gradient-to-r from-background via-muted/30 to-background rounded-2xl p-4 sm:p-6 lg:p-8 border shadow-lg">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-center">
          {/* Skip Visualization */}
          <div className="relative order-2 lg:order-1">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-24 h-16 sm:w-32 sm:h-24 bg-gradient-to-b from-primary/20 to-primary/10 rounded-lg border-2 border-primary/30 mb-4">
                <Truck className="h-8 w-8 sm:h-12 sm:w-12 text-primary" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold mb-2">
                {selectedSkip.size} Yard Skip
              </h3>
              <p className="text-muted-foreground text-sm sm:text-base">
                Perfect for your project needs
              </p>
            </div>
          </div>

          {/* Details */}
          <div className="space-y-4 sm:space-y-6 order-1 lg:order-2">
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="text-center p-3 sm:p-4 bg-muted/50 rounded-lg">
                <div className="text-lg sm:text-2xl font-bold text-primary">
                  {formatCurrency(
                    calculateTotalPrice(
                      selectedSkip.price_before_vat,
                      selectedSkip.vat
                    )
                  )}
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground">
                  Total Price
                </div>
              </div>
              <div className="text-center p-3 sm:p-4 bg-muted/50 rounded-lg">
                <div className="text-lg sm:text-2xl font-bold text-primary flex items-center justify-center">
                  <Clock className="h-4 w-4 sm:h-5 sm:w-5 mr-1" />
                  {selectedSkip.hire_period_days}
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground">
                  Days Hire
                </div>
              </div>
            </div>

            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center justify-between p-2 sm:p-3 bg-muted/30 rounded-lg">
                <span className="text-sm">Road Placement</span>
                <div className="flex items-center">
                  {selectedSkip.allowed_on_road ? (
                    <>
                      <Check className="h-3 w-3 sm:h-4 sm:w-4 text-green-500 mr-1" />
                      <span className="text-xs sm:text-sm text-green-600">
                        Allowed
                      </span>
                    </>
                  ) : (
                    <>
                      <Shield className="h-3 w-3 sm:h-4 sm:w-4 text-amber-500 mr-1" />
                      <span className="text-xs sm:text-sm text-amber-600">
                        Private Only
                      </span>
                    </>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between p-2 sm:p-3 bg-muted/30 rounded-lg">
                <span className="text-sm">Heavy Waste</span>
                <div className="flex items-center">
                  {selectedSkip.allows_heavy_waste ? (
                    <>
                      <Check className="h-3 w-3 sm:h-4 sm:w-4 text-green-500 mr-1" />
                      <span className="text-xs sm:text-sm text-green-600">
                        Accepted
                      </span>
                    </>
                  ) : (
                    <>
                      <Shield className="h-3 w-3 sm:h-4 sm:w-4 text-amber-500 mr-1" />
                      <span className="text-xs sm:text-sm text-amber-600">
                        Not Allowed
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div id={buttonId}>
              <Button
                onClick={onContinue}
                size="lg"
                className="w-full cursor-pointer text-sm sm:text-base"
                aria-label={`Continue with ${selectedSkip.size} yard skip selection`}
              >
                <span className="hidden sm:inline">
                  Continue with {selectedSkip.size} Yard Skip
                </span>
                <span className="sm:hidden">Continue</span>
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
