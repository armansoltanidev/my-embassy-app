"use client";
import React, { ReactNode, useEffect } from "react";
import { useFormStore } from "@/lib/store";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";

interface FormLayoutProps {
  children: ReactNode;
  currentStep?: number;
}

export const FormLayout: React.FC<FormLayoutProps> = ({
  children,
  currentStep,
}) => {
  const storeCurrentStep = useFormStore((state) => state.currentStep);
  const { scrollContainerRef, handleStepChange } = useSmoothScroll();

  // Use store step if not provided
  const activeStep = currentStep ?? storeCurrentStep;
  const totalSteps = 4;

  // Trigger scroll when step changes
  useEffect(() => {
    handleStepChange(activeStep);
  }, [activeStep, handleStepChange]);

  return (
    <div className="min-h-screen bg-sidebar relative flex flex-col">
      {/* Main Content */}
      <div className="relative z-10 mx-auto max-w-7xl w-full flex-grow flex flex-col px-2 py-2 md:px-4 md:py-8">
        <div className="mb-2 flex justify-between opacity-50 text-xs">
          <div className="font-light text-foreground-muted">
            مرحله {activeStep} / {totalSteps}
          </div>
          <div className="font-light text-foreground-muted">
            {Math.round((activeStep / totalSteps) * 100)}%
          </div>
        </div>
        <div className="mb-4 overflow-hidden rounded-full bg-gray-200">
          <div
            className="h-1 rounded-full bg-primary/50 transition-all duration-500"
            style={{ width: `${(activeStep / totalSteps) * 100}%` }}
          />
        </div>
        <div className="flex-grow rounded-lg bg-sidebar p-2 md:p-10 shadow-xl flex flex-col">
          <div
            ref={scrollContainerRef}
            className="w-full h-full overflow-y-auto scroll-smooth"
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
