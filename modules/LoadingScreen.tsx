import React from 'react';

interface LoadingScreenProps {
  progress: number;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ progress }) => {
  return (
    <div className="fixed inset-0 bg-[var(--background)] flex flex-col items-center justify-center z-50">
      <div className="flex flex-col items-center gap-6">
        {/* Dragon logo or game title */}
        <h1 className="text-4xl font-bold text-[var(--main-text-color)] font-['MedievalSharp']">
          Dragon Cards
        </h1>

        {/* Loading bar */}
        <div className="w-64 h-2 bg-[var(--bet-input-bg-color)] rounded-full overflow-hidden">
          <div
            className="h-full bg-[var(--button-place-bet)] transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Progress percentage */}
        <p className="text-[var(--secondary-text-color)] text-sm">
          Loading... {progress}%
        </p>

        {/* Optional: spinning dragon or card animation */}
        <div className="animate-spin">
          <svg
            className="w-8 h-8 text-[var(--button-place-bet)]"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};