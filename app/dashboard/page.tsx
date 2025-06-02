"use client";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import FinalStep from "@/components/steps/final-step";
import SelectSkinType from "@/components/steps/select-appointment-type"
import SelectSkinGoals from "@/components/steps/select-resident-type";
import SplashScreen from "@/components/steps/splash-screen";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useFormStore } from "@/lib/store";
import { FormLayout } from "@/components/layout/form-layout";

export default function Page() {
  const currentStep = useFormStore((state) => state.currentStep)

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <SplashScreen />
      case 2:
        return <SelectSkinType step={2}/>
      case 3:
        return <SelectSkinGoals step={3}/>
      case 4:
        return <FinalStep step={4}/>
      default:
        return <div>Step {currentStep} coming soon...</div>
    }
  }
  return (
    <SidebarProvider>
      <AppSidebar variant="sidebar" side="right" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <FormLayout>
                {renderStep()}
              </FormLayout>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
