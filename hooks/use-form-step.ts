"use client";
// src/hooks/use-form-step.ts
import { useForm, FieldValues, DefaultValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useFormStore } from "@/lib/store";

interface UseFormStepProps<T extends FieldValues> {
  schema?: z.ZodSchema<T>;
  currentStep: number;
}

export function useFormStep<T extends FieldValues>({
  schema,
  currentStep,
}: UseFormStepProps<T>) {
  const { setCurrentStep, setFormData, getLatestState } = useFormStore();

  const form = useForm<T>({
    resolver: schema ? zodResolver(schema) : undefined,
    mode: "onChange",
    defaultValues: getLatestState().formData as DefaultValues<T>,
  });

  const handleNext = (data: T) => {
    // Get the current form data from the store to ensure we don't lose any fields
    const currentFormData = getLatestState().formData;
    
    // Merge the current form data with the new data
    // This ensures we preserve all fields, including relative data fields
    setFormData({ ...currentFormData, ...data });
    setCurrentStep(currentStep + 1);
  };

  const handleNextOveride = (data: T, overideStep?: number) => {
    // Get the current form data from the store to ensure we don't lose any fields
    const currentFormData = getLatestState().formData;
    
    // Merge the current form data with the new data
    // This ensures we preserve all fields, including relative data fields
    setFormData({ ...currentFormData, ...data });
    setCurrentStep(overideStep || currentStep + 1);
  };

  const handleBack = () => {
    // Get the current form values
    const currentValues = form.getValues();
    
    // Get the current form data from the store to ensure we don't lose any fields
    const currentFormData = getLatestState().formData;
    
    // Merge the current form data with the new data
    // This ensures we preserve all fields, including relative data fields
    setFormData({ ...currentFormData, ...currentValues });
    setCurrentStep(currentStep - 1);
  };

  return {
    form,
    setFormData,
    handleNext,
    handleBack,
    handleNextOveride,
  };
}
