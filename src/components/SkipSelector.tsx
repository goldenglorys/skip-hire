import { useQuery } from "@tanstack/react-query";
import { ArrowRight, Truck, Zap, Info } from "lucide-react";
import { useState } from "react";

import { fetchSkips } from "../api/skipApi";
import { ErrorState } from "./ErrorState";
import { SuccessModal } from "./SuccessModal";
import { FloatingContinue } from "./FloatingContinue";
import { InteractiveView } from "./InteractiveView";
import { ComparisonView } from "./ComparisonView";
import { SelectedSkipPanel } from "./SelectedSkipPanel";
import { Button } from "./ui/button";
import { useSkipStore } from "../store/skipStore";
import { cn } from "../lib/utils";
import type { Skip } from "../types/skip";

export function SkipSelector() {
  const { selectedSkip, setSelectedSkip, clearSelection } = useSkipStore();
  const [viewMode, setViewMode] = useState<"interactive" | "comparison">(
    "interactive"
  );
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const {
    data: skips,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["skips", "NR32", "Lowestoft"],
    queryFn: () => fetchSkips("NR32", "Lowestoft"),
    staleTime: 5 * 60 * 1000,
    retry: 3,
  });

  const handleContinue = () => {
    if (selectedSkip) {
      setShowSuccessModal(true);
    }
  };

  const handleModalClose = () => {
    setShowSuccessModal(false);
    clearSelection();
  };

  const selectSkip = (skip: Skip) => {
    if (selectedSkip?.id === skip.id) {
      clearSelection();
    } else {
      setSelectedSkip(skip);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-12 w-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold mb-2">Finding Skips</h2>
          <p className="text-muted-foreground">
            ...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return <ErrorState error={error as Error} onRetry={() => refetch()} />;
  }

  if (!skips || skips.length === 0) {
    return (
      <ErrorState
        error={new Error("No skip options available for this location")}
        onRetry={() => refetch()}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5"></div>
        <div className="container mx-auto px-4 py-8 sm:py-12 lg:py-16 relative">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center justify-center p-2 sm:p-3 bg-primary/10 rounded-full mb-4 sm:mb-6">
              <Truck className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-foreground via-foreground/80 to-foreground bg-clip-text text-transparent leading-tight">
              Choose Your Perfect Skip
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
              Compare sizes, prices, and features in real-time.
            </p>

            {/* View Mode Toggle */}
            <div className="inline-flex bg-muted rounded-lg p-1 mb-8 sm:mb-12 w-full max-w-xs sm:w-auto">
              <button
                onClick={() => setViewMode("interactive")}
                className={cn(
                  "flex-1 sm:flex-none px-3 sm:px-6 py-2 rounded-md text-xs sm:text-sm font-medium transition-all flex items-center justify-center cursor-pointer",
                  viewMode === "interactive"
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
                aria-label="Switch to interactive view"
              >
                <Zap className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                Interactive
              </button>
              <button
                onClick={() => setViewMode("comparison")}
                className={cn(
                  "flex-1 sm:flex-none px-3 sm:px-6 py-2 rounded-md text-xs sm:text-sm font-medium transition-all flex items-center justify-center cursor-pointer",
                  viewMode === "comparison"
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
                aria-label="Switch to comparison view"
              >
                <Info className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                Compare
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Skip Selector */}
      {viewMode === "interactive" && (
        <div className="container mx-auto px-4 pb-8 sm:pb-16">
          <InteractiveView
            skips={skips}
            selectedSkip={selectedSkip}
            onSelectSkip={selectSkip}
          />

          {/* Selected Skip Details Panel */}
          {selectedSkip && (
            <SelectedSkipPanel
              selectedSkip={selectedSkip}
              onContinue={handleContinue}
              buttonId="continue-button-interactive"
            />
          )}
        </div>
      )}

      {/* Comparison Table View */}
      {viewMode === "comparison" && (
        <div className="container mx-auto px-4 pb-8 sm:pb-16">
          <ComparisonView
            skips={skips}
            selectedSkip={selectedSkip}
            onSelectSkip={selectSkip}
          />

          {selectedSkip && (
            <div
              className="mt-6 sm:mt-8 text-center"
              id="continue-button-comparison"
            >
              <Button
                onClick={handleContinue}
                size="lg"
                className="cursor-pointer w-full sm:w-auto"
                aria-label={`Continue with ${selectedSkip.size} yard skip selection`}
              >
                <span className="hidden sm:inline">
                  Continue with {selectedSkip.size} Yard Skip
                </span>
                <span className="sm:hidden">Continue</span>
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </div>
          )}
        </div>
      )}

      {/* No Selection State */}
      {!selectedSkip && (
        <div className="container mx-auto px-4 pb-8 sm:pb-16">
          <div className="text-center max-w-2xl mx-auto">
            <div className="text-muted-foreground">
              <Truck className="h-12 w-12 sm:h-16 sm:w-16 mx-auto mb-4 opacity-50" />
              <p className="text-sm sm:text-base">
                Select a skip size to continue with your booking
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Floating Continue Button */}
      <FloatingContinue
        selectedSkip={selectedSkip}
        onContinue={handleContinue}
        originalElementId={
          viewMode === "interactive"
            ? "continue-button-interactive"
            : "continue-button-comparison"
        }
      />

      {/* Success Modal */}
      {selectedSkip && (
        <SuccessModal
          skip={selectedSkip}
          isOpen={showSuccessModal}
          onClose={handleModalClose}
        />
      )}
    </div>
  );
}
