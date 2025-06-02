"use client";
import { useState, useRef, useEffect } from "react";
import { z } from "zod";
import { useFormStep } from "@/hooks/use-form-step";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { residentTypeOptions } from "@/lib/lifestyle-options";
import DocumentForms from "./document-forms";
import { exitEntryDocumentSchema } from "./exit-entry-document-schema";

const skinGoalsSchema = z.discriminatedUnion("residentType", [
  z.object({
    residentType: z.enum(["RESIDENT_BOOK", "PASSPORT", "AMAYESH_CARD", "FAMILIY_PASSPORT"]),
    appointmentType: z.literal("EXIT_ENTRY_DOCUMENT"),
    ...exitEntryDocumentSchema.shape,
  }),
  
]);

function SelectResidentType({ step }: { step: number }) {
  const { form, handleBack, handleNext } = useFormStep({
    schema: skinGoalsSchema,
    currentStep: step,
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [completedSections, setCompletedSections] = useState({
    residentType: false,
    acneType: false,
    documentForm: false,
  });

  const primaryGoalRef = useRef<HTMLDivElement>(null);
  const documentFormRef = useRef<HTMLDivElement>(null);


  // Add custom CSS for scroll behavior and animations
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      html {
        scroll-behavior: smooth;
        scroll-padding-top: 100px;
      }
      
      @keyframes bounce-scroll {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
      }
      
      .scroll-indicator {
        animation: bounce-scroll 1s infinite;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const handleSectionComplete = (
    section: keyof typeof completedSections,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    value: any
  ) => {
    setCompletedSections((prev) => ({
      ...prev,
      [section]: true,
    }));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    form.setValue(section as any, value);
  };

  const renderPrimaryGoalOptions = () => (
    <RadioGroup
      defaultValue={form.getValues("residentType")}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
    >
      {residentTypeOptions.map((option, index) => (
        <motion.div
          key={option.value}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div
            className={cn(
              "relative rounded-xl border p-6 transition-all duration-300 ease-in-out cursor-pointer",
              form.getValues("residentType") === option.value
                ? "bg-primary/5 border-primary shadow-md ring-2 ring-primary"
                : "hover:bg-accent/50"
            )}
            onClick={() => handleSectionComplete("residentType", option.value)}
          >
            <div className="absolute top-4 right-4">
              <RadioGroupItem
                value={option.value}
                id={option.value}
                className={cn(
                  form.getValues("residentType") === option.value
                    ? "bg-primary text-primary-foreground"
                    : "bg-transparent"
                )}
              />
            </div>
            <div className="flex flex-col items-center text-center">
              {option.illustration}
              <Label
                htmlFor={option.value}
                className="flex flex-col cursor-pointer space-y-2"
              >
                <span className="font-semibold text-lg">
                  {option.label}
                  {option.value === "ACNE" && (
                    <span className="block text-xs text-primary-foreground bg-primary mt-1 px-2 py-1 rounded-full">
                      Additional options
                    </span>
                  )}
                </span>
                <span className="text-sm text-muted-foreground">
                  {option.description}
                </span>
              </Label>
            </div>
          </div>
        </motion.div>
      ))}
    </RadioGroup>
  );

  return (
    <Card className="border-none shadow-none">
      <CardHeader className="text-center md:text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <CardTitle>
            لطفا نوع مدرک خود را انتخاب و سپس فرم نمایش داده شده را تکمیل کنید
          </CardTitle>
          <CardDescription className="mt-2">
            در صورتی که دارای دو مدرک میباشد لطفا اطلاعات مربوط به مدرک اقامتی
            خود را وارد کنید
          </CardDescription>
        </motion.div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleNext)} className="space-y-6">
            {/* Primary Goal Section */}
            <motion.div
              ref={primaryGoalRef}
              id="primary-goal-section"
              className="scroll-mt-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <FormField
                control={form.control}
                name="residentType"
                render={() => (
                  <FormItem>
                    <FormControl>{renderPrimaryGoalOptions()}</FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>

            {/* Document Form Section */}
            <AnimatePresence>
              <motion.div
                ref={documentFormRef}
                id="document-form-section"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-4 scroll-mt-20 overflow-hidden"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-primary bg-primary/5 p-4 rounded-lg"
                >
                  <AlertCircle className="h-5 w-5" />
                  <p className="text-sm font-medium">
                    لطفا اطلاعات مدرک خود را با دقت وارد کنید.
                  </p>
                </motion.div>
                <DocumentForms />
              </motion.div>
            </AnimatePresence>

            <motion.div
              className="flex justify-between pt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Button type="button" variant="outline" back onClick={handleBack}>
                بازگشت
              </Button>
              <Button type="submit" front>
                ادامه
              </Button>
            </motion.div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export default SelectResidentType;
