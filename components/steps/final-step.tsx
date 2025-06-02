import { useFormStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useFormStep } from "@/hooks/use-form-step"
import { z } from "zod"

import SkincareSummary from "../skincare-summary"
import { SkincareSummarySheet } from "../skincare-sheet"


function FinalStep({step}: {step: number}) {
  const { formData, resetForm, setCurrentStep } = useFormStore()

  const {handleBack} = useFormStep({
    currentStep: step,
    schema: z.object({}),

  })



  const handleReset = () => {
    resetForm()
    setCurrentStep(1)
  }


  return (
    <div className="space-y-6 p-4">
      <Card className="border-none shadow-none">
        <CardHeader>
          <CardTitle>لطفا اطلاعات وارد شده خود را بررسی و در صورت تایید گزینه اتمام ثبت نام را فشار دهید</CardTitle>
          <CardDescription>
            با کلیک بر روی بازگشت میتوانید اطلاعات وارد شده خود را ویرایش کنید پس از کلیک بر روی اتمام ثبت نام امکان تغییر اطلاعات وجود ندارد.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="flex justify-end mb-4">
            <SkincareSummarySheet data={formData} />
          </div>
          <SkincareSummary data={formData}></SkincareSummary>

        </CardContent>
        <CardFooter className="flex justify-between">
          <Button back variant="outline" onClick={handleBack}>
            بازگشت
          </Button>
          <Button onClick={handleReset}>شروع دوباره</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default FinalStep