"use client";

import { ReactNode, useState } from "react";

type ErrorBoundaryProps = {
  children: ReactNode;
};

export function ErrorBoundary({ children }: ErrorBoundaryProps) {
  const [hasError, setHasError] = useState(false);

  const handleErrors = () => {
    setHasError(true);
  };

  const handleTryAgain = () => {
    setHasError(false);
  };

  if (hasError) {
    return (
      <div>
        <h2>Oops, there is an error!</h2>
        <button type="button" onClick={handleTryAgain}>
          Try again?
        </button>
      </div>
    );
  }

  return children;
}
