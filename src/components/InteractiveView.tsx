import { Check } from "lucide-react";
import { formatCurrency, calculateTotalPrice, cn } from "../lib/utils";
import type { Skip } from "../types/skip";

interface InteractiveViewProps {
  skips: Skip[];
  selectedSkip: Skip | null;
  onSelectSkip: (skip: Skip) => void;
}

export function InteractiveView({
  skips,
  selectedSkip,
  onSelectSkip,
}: InteractiveViewProps) {
  const sortedSkips = [...skips].sort((a, b) => a.size - b.size);

  return (
    <div className="max-w-6xl mx-auto mb-8 sm:mb-16">
      <h2 className="text-xl sm:text-2xl font-bold text-center mb-6 mt-2 sm:mb-8">
        Select Your Skip Size
      </h2>

      {/* Mobile: Vertical Stack */}
      <div className="block sm:hidden space-y-4">
        {sortedSkips.map((skip) => {
          const isSelected = selectedSkip?.id === skip.id;
          const totalPrice = calculateTotalPrice(
            skip.price_before_vat,
            skip.vat
          );

          return (
            <button
              key={skip.id}
              onClick={() => onSelectSkip(skip)}
              className={cn(
                "w-full p-4 rounded-xl border-2 transition-all duration-300 text-left",
                "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                isSelected
                  ? "bg-primary/5 border-primary shadow-lg"
                  : "bg-background border-border hover:border-primary/50"
              )}
              aria-label={`Select ${skip.size} yard skip for ${formatCurrency(
                totalPrice
              )}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div
                    className={cn(
                      "w-12 h-12 rounded-full border-2 flex items-center justify-center font-bold text-lg mr-4",
                      isSelected
                        ? "bg-primary text-primary-foreground border-primary"
                        : "border-border"
                    )}
                  >
                    {skip.size}
                  </div>
                  <div>
                    <div className="font-semibold text-base">
                      {skip.size} Yard Skip
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {skip.hire_period_days} day hire
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-lg text-primary">
                    {formatCurrency(totalPrice)}
                  </div>
                  <div className="text-xs text-muted-foreground">Inc. VAT</div>
                </div>
                {isSelected && (
                  <div className="ml-2">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <Check className="h-3 w-3 text-white" />
                    </div>
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Tablet: Grid Layout */}
      <div className="hidden sm:block md:hidden">
        <div className="grid grid-cols-2 gap-4">
          {sortedSkips.map((skip) => {
            const isSelected = selectedSkip?.id === skip.id;
            const totalPrice = calculateTotalPrice(
              skip.price_before_vat,
              skip.vat
            );

            return (
              <button
                key={skip.id}
                onClick={() => onSelectSkip(skip)}
                className={cn(
                  "p-4 rounded-xl border-2 transition-all duration-300 text-center",
                  "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                  isSelected
                    ? "bg-primary/5 border-primary shadow-lg scale-105"
                    : "bg-background border-border hover:border-primary/50 hover:scale-102"
                )}
                aria-label={`Select ${skip.size} yard skip for ${formatCurrency(
                  totalPrice
                )}`}
              >
                <div className="relative">
                  <div
                    className={cn(
                      "w-16 h-16 rounded-full border-2 flex items-center justify-center font-bold text-xl mx-auto mb-3",
                      isSelected
                        ? "bg-primary text-primary-foreground border-primary"
                        : "border-border"
                    )}
                  >
                    {skip.size}
                  </div>
                  {isSelected && (
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <Check className="h-3 w-3 text-white" />
                    </div>
                  )}
                </div>
                <div className="font-semibold text-base mb-1">
                  {skip.size} Yard Skip
                </div>
                <div className="font-bold text-lg text-primary mb-1">
                  {formatCurrency(totalPrice)}
                </div>
                <div className="text-sm text-muted-foreground">
                  {skip.hire_period_days} days
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Desktop: Interactive Scale */}
      <div className="hidden md:block">
        <div className="relative">
          {/* Visual Scale Background */}
          <div className="absolute top-1/2 left-0 right-0 h-2 bg-gradient-to-r from-muted via-primary/20 to-primary rounded-full transform -translate-y-1/2"></div>

          {/* Skip Size Buttons */}
          <div className="relative flex justify-between items-center">
            {sortedSkips.map((skip) => {
              const isSelected = selectedSkip?.id === skip.id;
              const totalPrice = calculateTotalPrice(
                skip.price_before_vat,
                skip.vat
              );
              const sizeRatio =
                (skip.size / Math.max(...sortedSkips.map((s) => s.size))) * 100;

              return (
                <div key={skip.id} className="flex flex-col items-center">
                  <button
                    onClick={() => onSelectSkip(skip)}
                    className={cn(
                      "relative mb-4 transition-all duration-300 hover:scale-110 cursor-pointer group",
                      "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-full",
                      isSelected && "scale-110"
                    )}
                    style={{
                      width: `${40 + sizeRatio * 0.6}px`,
                      height: `${40 + sizeRatio * 0.6}px`,
                    }}
                    aria-label={`Select ${
                      skip.size
                    } yard skip for ${formatCurrency(totalPrice)}`}
                  >
                    <div
                      className={cn(
                        "w-full h-full rounded-full border-4 transition-all duration-300",
                        "flex items-center justify-center font-bold text-sm",
                        isSelected
                          ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/25"
                          : "bg-background border-border hover:border-primary/50 hover:shadow-md"
                      )}
                    >
                      {skip.size}
                    </div>

                    {isSelected && (
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <Check className="h-3 w-3 text-white" />
                      </div>
                    )}
                  </button>

                  <div className="text-center">
                    <div className="text-sm font-medium">{skip.size} Yard</div>
                    <div className="text-xs text-muted-foreground">
                      {formatCurrency(totalPrice)}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
