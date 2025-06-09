import { AlertTriangle, RefreshCw, WifiOff } from "lucide-react";
import { Button } from "./ui/button";

interface ErrorStateProps {
  error: Error;
  onRetry: () => void;
}

export function ErrorState({ error, onRetry }: ErrorStateProps) {
  const isNetworkError =
    error.message.includes("fetch") ||
    error.message.includes("Failed to fetch");

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background flex items-center justify-center p-4">
      <div className="text-center max-w-md mx-auto">
        {/* Error Icon */}
        <div className="mb-6">
          {isNetworkError ? (
            <WifiOff className="h-16 w-16 sm:h-20 sm:w-20 text-red-500 mx-auto" />
          ) : (
            <AlertTriangle className="h-16 w-16 sm:h-20 sm:w-20 text-red-500 mx-auto" />
          )}
        </div>

        {/* Error Title */}
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
          {isNetworkError ? "Connection Problem" : "Unable to Load Skips"}
        </h1>

        {/* Error Message */}
        <p className="text-muted-foreground mb-2 text-sm sm:text-base">
          {isNetworkError
            ? "We couldn't connect to our servers. Please check your internet connection and try again."
            : "We're having trouble loading the skip options right now."}
        </p>

        {/* Technical Details */}
        <details className="mb-6 text-left">
          <summary className="cursor-pointer text-sm text-muted-foreground hover:text-foreground mb-2">
            Technical Details
          </summary>
          <div className="bg-muted/50 rounded-lg p-3 text-xs text-muted-foreground font-mono">
            {error.message}
          </div>
        </details>

        {/* Retry Button */}
        <Button
          onClick={onRetry}
          size="lg"
          className="cursor-pointer w-full sm:w-auto"
          aria-label="Retry loading skip options"
        >
          <RefreshCw className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
          Try Again
        </Button>

        {/* Help Text */}
        <p className="text-xs text-muted-foreground mt-4">
          If the problem persists, please contact our support team.
        </p>
      </div>
    </div>
  );
}
