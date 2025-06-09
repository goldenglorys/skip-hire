import { Check, Shield } from "lucide-react";
import { Button } from "./ui/button";
import { formatCurrency, calculateTotalPrice, cn } from "../lib/utils";
import type { Skip } from "../types/skip";

interface ComparisonViewProps {
  skips: Skip[];
  selectedSkip: Skip | null;
  onSelectSkip: (skip: Skip) => void;
}

export function ComparisonView({
  skips,
  selectedSkip,
  onSelectSkip,
}: ComparisonViewProps) {
  const sortedSkips = [...skips].sort((a, b) => a.size - b.size);

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-xl sm:text-2xl font-bold text-center mb-6 sm:mb-8">
        Skip Comparison
      </h2>

      {/* Mobile: Card Layout */}
      <div className="block lg:hidden space-y-4">
        {sortedSkips.map((skip) => {
          const isSelected = selectedSkip?.id === skip.id;
          const totalPrice = calculateTotalPrice(
            skip.price_before_vat,
            skip.vat
          );

          return (
            <div
              key={skip.id}
              className={cn(
                "bg-background rounded-xl border-2 p-4 transition-all",
                isSelected
                  ? "border-primary shadow-lg bg-primary/5"
                  : "border-border"
              )}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div
                    className={cn(
                      "w-10 h-10 rounded-full border-2 flex items-center justify-center text-sm font-bold mr-3",
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
                      {skip.hire_period_days} days hire
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-lg text-primary">
                    {formatCurrency(totalPrice)}
                  </div>
                  <div className="text-xs text-muted-foreground">Inc. VAT</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="text-center p-2 bg-muted/30 rounded-lg">
                  <div className="text-xs text-muted-foreground mb-1">
                    Road Placement
                  </div>
                  {skip.allowed_on_road ? (
                    <div className="flex items-center justify-center text-green-600">
                      <Check className="h-3 w-3 mr-1" />
                      <span className="text-xs">Yes</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center text-amber-600">
                      <Shield className="h-3 w-3 mr-1" />
                      <span className="text-xs">Private Only</span>
                    </div>
                  )}
                </div>
                <div className="text-center p-2 bg-muted/30 rounded-lg">
                  <div className="text-xs text-muted-foreground mb-1">
                    Heavy Waste
                  </div>
                  {skip.allows_heavy_waste ? (
                    <div className="flex items-center justify-center text-green-600">
                      <Check className="h-3 w-3 mr-1" />
                      <span className="text-xs">Yes</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center text-amber-600">
                      <Shield className="h-3 w-3 mr-1" />
                      <span className="text-xs">No</span>
                    </div>
                  )}
                </div>
              </div>

              <Button
                variant={isSelected ? "default" : "outline"}
                size="sm"
                onClick={() => onSelectSkip(skip)}
                className="w-full cursor-pointer"
              >
                {isSelected ? "Selected" : "Select"}
              </Button>
            </div>
          );
        })}
      </div>

      {/* Desktop: Table Layout */}
      <div className="hidden lg:block bg-background rounded-2xl border shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left p-4 font-semibold">Size</th>
                <th className="text-left p-4 font-semibold">Price</th>
                <th className="text-left p-4 font-semibold">Hire Period</th>
                <th className="text-left p-4 font-semibold">Road Placement</th>
                <th className="text-left p-4 font-semibold">Heavy Waste</th>
                <th className="text-left p-4 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {sortedSkips.map((skip) => {
                const isSelected = selectedSkip?.id === skip.id;
                const totalPrice = calculateTotalPrice(
                  skip.price_before_vat,
                  skip.vat
                );

                return (
                  <tr
                    key={skip.id}
                    className={cn(
                      "border-t transition-colors hover:bg-muted/30 cursor-pointer",
                      isSelected && "bg-primary/5 border-primary/20"
                    )}
                    onClick={() => onSelectSkip(skip)}
                  >
                    <td className="p-4">
                      <div className="flex items-center">
                        <div
                          className={cn(
                            "w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-bold mr-3",
                            isSelected
                              ? "bg-primary text-primary-foreground border-primary"
                              : "border-border"
                          )}
                        >
                          {skip.size}
                        </div>
                        <span className="font-medium">
                          {skip.size} Yard Skip
                        </span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="font-semibold text-primary">
                        {formatCurrency(totalPrice)}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Inc. VAT
                      </div>
                    </td>
                    <td className="p-4">{skip.hire_period_days} days</td>
                    <td className="p-4">
                      {skip.allowed_on_road ? (
                        <div className="flex items-center text-green-600">
                          <Check className="h-4 w-4 mr-1" />
                          Yes
                        </div>
                      ) : (
                        <div className="flex items-center text-amber-600">
                          <Shield className="h-4 w-4 mr-1" />
                          Private Only
                        </div>
                      )}
                    </td>
                    <td className="p-4">
                      {skip.allows_heavy_waste ? (
                        <div className="flex items-center text-green-600">
                          <Check className="h-4 w-4 mr-1" />
                          Yes
                        </div>
                      ) : (
                        <div className="flex items-center text-amber-600">
                          <Shield className="h-4 w-4 mr-1" />
                          No
                        </div>
                      )}
                    </td>
                    <td className="p-4">
                      <Button
                        variant={isSelected ? "default" : "outline"}
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectSkip(skip);
                        }}
                        className="cursor-pointer"
                      >
                        {isSelected ? "Selected" : "Select"}
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
