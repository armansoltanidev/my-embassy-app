"use client";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import AgeGroup from "@/components/steps/age-group";
import BudgetAllocation from "@/components/steps/budget-allocation";
import EnvironmentalFactorsStep from "@/components/steps/environmental-factors";
import EthicalPreferences from "@/components/steps/ethical-preferences";
import ExfoliationTolerance from "@/components/steps/exofiliate-tolerance";
import FinalStep from "@/components/steps/final-step";
import IngredientPreferences from "@/components/steps/ingredient-preferences";
import LifestyleFactors from "@/components/steps/lifestyle-factors";
import SelectSkinType from "@/components/steps/select-skin-type"
import MakeupQuestion from "@/components/steps/makeup-question";
import RoutineComplexity from "@/components/steps/routine-complexity";
import SelectSkinGoals from "@/components/steps/select-skin-goals";
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
        return <AgeGroup step={4}/>
      case 5:
        return <EnvironmentalFactorsStep step={5}/>
      case 6:
        return <LifestyleFactors step={6}/>
      case 7: 
        return <ExfoliationTolerance step={7}/>
      case 8:
        return <IngredientPreferences step={8}/>
      case 9:
        return <RoutineComplexity step={9}/>
      case 10:
        return <BudgetAllocation step={10}/>
      case 11:
        return <EthicalPreferences step={11}/>
      case 12:
        return <MakeupQuestion step={12}/>
      case 13:
        return <FinalStep step={13}/>
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
