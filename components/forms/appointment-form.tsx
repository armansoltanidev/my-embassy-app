"use client";

import { CalendarCheck, Code2Icon } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";

import MultiStepForm from "@/components/ui/multi-step-form";
import { formFlowConfig, getFilteredSteps, shouldShowForm } from "./form-config";
import { FORM_COMPONENTS, FormType } from "./form-types";

export default function AppointmentForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [currentSelections, setCurrentSelections] = useState<
    Record<string | number, string>
  >({});
  const [dynamicFormSteps, setDynamicFormSteps] = useState(
    formFlowConfig.steps
  );

  const handleComplete = (selections: Record<string | number, string>) => {
    if (formRef.current) {
      const isValid = formRef.current.checkValidity();
      if (!isValid) {
        formRef.current.reportValidity();
        return false;
      }
    }

    const selectedItems = {
      ...dynamicFormSteps
        .map((step, index) => {
          const selectedItem = step.items.find(
            (item) => item.id === selections[index]
          );
          return {
            [step.id]: selectedItem?.id,
          };
        })
        .reduce((acc, curr) => ({ ...acc, ...curr }), {}),
      // Add form inputs if they exist
      ...(selections.name ? { name: selections.name } : {}),
      ...(selections.email ? { email: selections.email } : {}),
      ...(selections.motherName ? { motherName: selections.motherName } : {}),
      ...(selections.grandfatherName
        ? { grandfatherName: selections.grandfatherName }
        : {}),
    };

    toast("Form completed!", {
      description: (
        <pre className="mt-2 p-4 bg-black rounded-lg overflow-auto">
          <code className="text-sm">
            {JSON.stringify(selectedItems, null, 2)}
          </code>
        </pre>
      ),
    });

    return true;
  };

  const handleStepChange = (selections: Record<string | number, string>) => {
    setCurrentSelections(selections);

    // If the first step selection changes, update the form steps
    if (selections[0] && selections[0] !== currentSelections[0]) {
      const filteredSteps = getFilteredSteps(selections[0]);
      setDynamicFormSteps(filteredSteps);
    }
  };

  const renderFormComponent = () => {
    const totalSteps = dynamicFormSteps.length;
    
    // Check if we should show the form based on current selections
    if (!shouldShowForm(currentSelections, totalSteps)) {
      return null;
    }

    // Determine which form type to render
    const formType: FormType = formFlowConfig.getFormType(currentSelections);
    
    // Get the appropriate form component
    const FormComponent = FORM_COMPONENTS[formType];
    
    if (!FormComponent) {
      // Fallback to basic form if component not found
      const BasicFormComponent = FORM_COMPONENTS.basic;
      return <BasicFormComponent className="space-y-4" />;
    }

    return <FormComponent className="space-y-4" />;
  };

  return (
    <MultiStepForm
      title={
        <div className="flex items-center justify-between w-full flex-col space-y-4">
          <div className="flex items-center gap-2">
            <CalendarCheck className="h-6 w-6" />
            <span className="font-semibold">فرم درخواست نوبت خدمات</span>
          </div>
        </div>
      }
      formSteps={dynamicFormSteps}
      onComplete={handleComplete}
      onStepChange={handleStepChange}
      variant="default"
      imageClassName="grayscale hover:grayscale-0"
      cardClassName="pb-2"
      finalStep={
        <div className="flex items-center gap-2">
          <span className="font-semibold">Thank you for trying</span>
          <Code2Icon className="h-5 w-5" />
          <span className="font-semibold">Next-Stepper</span>
        </div>
      }
    >
      <form ref={formRef} className="space-y-4 p-4 border rounded-lg">
        {renderFormComponent()}
      </form>
    </MultiStepForm>
  );
}
