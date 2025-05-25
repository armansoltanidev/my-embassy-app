"use client";

import {
  BoxIcon,
  Cake,
  CalendarCheck,
  CarFront,
  CloudIcon,
  Code2Icon,
  FileUser,
  IdCard,
  PlaneTakeoff,
  ShieldUser,
  SquareAsterisk,
} from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import MultiStepForm, { type FormStep } from "@/components/ui/multi-step-form";

const formSteps: FormStep[] = [
  {
    level: 1,
    id: "appointment-type",
    title: "لطفا نوع نوبت درخواستیتان را انتخاب کنید",
    description: "لطفا دقت فرمایید، تغییر نوع نوبت امکان پذیر نمیباشد.",
    items: [
      {
        id: "ISSUANCE_OF_IDENTITY",
        title: "تثبیت هویت",
        description: "سندی که هویت شما را تثبیت میکند",
        icon: IdCard,
        validNextSteps: ["amayesh_reniewal", "driver_license"],
      },
      {
        id: "STUDENT_ENTRY_EXIT_PERMIT",
        title: "سند رفت و برگشت دانشجویان",
        description: "سند رفت و برگشت دانشجویان جهت اخذ مدارک",
        icon: FileUser,
        validNextSteps: ["amayesh", "familly_passport", "passport"],
      },
      {
        id: "BIRTH_CERTIFICATE",
        title: "گواهی تولد",
        description: "گواهی تولد برای متولدین خارج از کشور",
        icon: Cake,
        validNextSteps: ["shopify", "next-commerce"],
      },
      {
        id: "CERTIFICATE_OF_NO_CRIMINAL_RECORDS",
        title: "گواهی عدم سوء پیشینه",
        description: "سند عدم سوء پیشینه برای متقاضیان",
        icon: ShieldUser,
        validNextSteps: ["astro"],
      },
    ],
  },
  {
    level: 2,
    id: "appointment-reasons",
    title: "انتخاب دلیل درخواست نوبت",
    description: "لطفا دلیل درخواست نوبت خود را انتخاب کنید",
    items: [
      {
        id: "amayesh_reniewal",
        title: "تمدید کارت آمایش",
        description: "دریافت گواهی جهت تمدید کارت آمایش برای اتباع خارجی",
        icon: IdCard,
        validNextSteps: ["e_tazkre", "old_tazkre", "relation_tazkre"],
      },
      {
        id: "driver_license",
        title: "گواهینامه رانندگی",
        description: "جهت ارائه به مراجع قانونی و رانندگی در ایران",
        icon: CarFront,
        validNextSteps: ["e_tazkre", "old_tazkre", "relation_tazkre"],
      },
      {
        id: "amayesh",
        title: "کارت آمایش",
        description: "دارای مدرک آمایش میباشم و قصد سفر به افغانستان دارم",
        icon: PlaneTakeoff,
        validNextSteps: ["fly", "railway"],
      },
      {
        id: "passport",
        title: "پاسپورت",
        description: "دارای پاسپورت میباشم و قصد سفر به افغانستان  را دارم",
        icon: PlaneTakeoff,
        validNextSteps: ["shopify-hosting"],
      },
      {
        id: "familly_passport",
        title: "پاسپورت خانوار",
        description:
          "دارای پاسپورت خانواری میباشمو قصد سفر به افغانستان را دارم",
        icon: SquareAsterisk,
        validNextSteps: ["vercel"],
      },
    ],
  },
  {
    level: 3,
    id: "deployment",
    title: "لطفا یکی از گزینه های زیر را انتخاب کنید ",
    description: "لطفا با دقت گزینه مورد نظر خود را انتخاب کنید",
    items: [
      {
        id: "e_tazkre",
        title: "تذکره الکترونیکی",
        description: "دارای تذکره الکترونیکی میباشم",
        icon: IdCard,
      },
      {
        id: "old_tazkre",
        title: "تذکره کاغذی",
        description: "دارای تذکره کاغذی و یا دفترچه ای میباشم",
        icon: FileUser,
      },
      {
        id: "relation_tazkre",
        title: "تذکره اقارب اصولی",
        description: "یکی از اقارب اصولی ام دارای تذکره میباشد",
        icon: FileUser,
      },
      {
        id: "fly",
        title: "Fly.io",
        description: "Global application platform with edge capabilities",
        icon: CloudIcon,
        image:
          "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2372&auto=format&fit=crop",
      },
      {
        id: "railway",
        title: "Railway",
        description: "Developer platform for deploying any type of application",
        icon: BoxIcon,
        image:
          "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=2370&auto=format&fit=crop",
      },
      {
        id: "shopify-hosting",
        title: "Shopify Hosting",
        description: "Built-in hosting solution for Shopify stores",
        icon: CloudIcon,
        image:
          "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2372&auto=format&fit=crop",
      },
    ],
  },
];

export default function AppointmentForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [currentSelections, setCurrentSelections] = useState<
    Record<string | number, string>
  >({});

  const handleComplete = (selections: Record<string | number, string>) => {
    if (formRef.current) {
      const isValid = formRef.current.checkValidity();
      if (!isValid) {
        formRef.current.reportValidity();
        return false;
      }
    }

    const selectedItems = {
      ...formSteps
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
  };

  const getFormFields = () => {
    const deploymentSelection = currentSelections[2]; // Level 3 selection

    switch (deploymentSelection) {
      case "e_tazkre":
        return (
          <>
            <div className="flex items-center justify-between gap-4">
              <div className="space-y-2 flex-1">
                <Label htmlFor="name">نام</Label>
                <Input
                  id="name"
                  name="name"
                  required={true}
                  placeholder="نام خود را وارد کنید"
                />
              </div>
              <div className="space-y-2 flex-1">
                <Label htmlFor="firstName">نام خانوادگی</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  required={true}
                  placeholder="نام خانوادگی خود را وارد کنید"
                />
              </div>
            </div>
            <div className="flex items-center justify-between gap-4">
              <div className="space-y-2 flex-1">
                <Label htmlFor="fatherName">نام پدر</Label>
                <Input
                  id="fatherName"
                  name="fatherName"
                  required={true}
                  placeholder="نام پدر خود را وارد کنید"
                />
              </div>
              <div className="space-y-2 flex-1">
                <Label htmlFor="eTazkrehNumber">شماره تذکره الکترونیکی</Label>
                <Input
                  id="eTazkrehNumber"
                  name="eTazkrehNumber"
                  required={true}
                  placeholder="شماره تذکره الکترونیکی خود را وارد کنید"
                />
              </div>
            </div>
            <div className="flex items-center justify-between gap-4">
              <div className="space-y-2 flex-1">
                <Label htmlFor="fatherName">ولایت اصلی</Label>
                <Input
                  id="fatherName"
                  name="fatherName"
                  required={true}
                  placeholder="نام ولایت خود را وارد کنید"
                />
              </div>
              <div className="space-y-2 flex-1">
                <Label htmlFor="eTazkrehNumber">ولسوالی اصلی</Label>
                <Input
                  id="eTazkrehNumber"
                  name="eTazkrehNumber"
                  required={true}
                  placeholder="نام ولسوالی خود را وارد کنید"
                />
              </div>
              <div className="space-y-2 flex-1">
                <Label htmlFor="eTazkrehNumber">قریه اصلی</Label>
                <Input
                  id="eTazkrehNumber"
                  name="eTazkrehNumber"
                  required={true}
                  placeholder="نام قریه خود را وارد کنید"
                />
              </div>
            </div>
            <div className="border-t pt-4 border-dotted">
              <h2>اطلاعات محل سکونت فعلی</h2>
            </div>
            <div className="flex items-center justify-between gap-4">
              <div className="space-y-2 flex-1">
                <Label htmlFor="fatherName">استان سکونت فعلی</Label>
                <Input
                  id="fatherName"
                  name="fatherName"
                  required={true}
                  placeholder="نام استان خود را وارد کنید"
                />
              </div>
              <div className="space-y-2 flex-1">
                <Label htmlFor="eTazkrehNumber">شهر محل سکونت فعلی</Label>
                <Input
                  id="eTazkrehNumber"
                  name="eTazkrehNumber"
                  required={true}
                  placeholder="نام شهر خود را وارد کنید"
                />
              </div>
            </div>
            <div className="border-t pt-4 border-dotted">
              <h2>اطلاعات تماس متقاضی</h2>
            </div>
            <div className="flex items-center justify-between gap-4">
              <div className="space-y-2 flex-1">
                <Label htmlFor="fatherName">شماره تماس</Label>
                <Input
                  id="fatherName"
                  name="fatherName"
                  required={true}
                  placeholder="شماره تماس خود را وارد کنید"
                />
              </div>
              <div className="space-y-2 flex-1">
                <Label htmlFor="eTazkrehNumber">شماره تماس اضطراری</Label>
                <Input
                  id="eTazkrehNumber"
                  name="eTazkrehNumber"
                  required={true}
                  placeholder="شماره تماس اضطراری خود را وارد کنید"
                />
              </div>
            </div>
          </>
        );

      case "old_tazkre":
        return (
          <>
            <div className="flex items-center justify-between gap-4">
              <div className="space-y-2 flex-1">
                <Label htmlFor="name">نام</Label>
                <Input
                  id="name"
                  name="name"
                  required={true}
                  placeholder="نام خود را وارد کنید"
                />
              </div>
              <div className="space-y-2 flex-1">
                <Label htmlFor="firstName">نام خانوادگی</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  required={true}
                  placeholder="نام خانوادگی خود را وارد کنید"
                />
              </div>
            </div>
            <div className="flex items-center justify-between gap-4">
              <div className="space-y-2 flex-1">
                <Label htmlFor="fatherName">نام پدر</Label>
                <Input
                  id="fatherName"
                  name="fatherName"
                  required={true}
                  placeholder="نام پدر خود را وارد کنید"
                />
              </div>
              <div className="space-y-2 flex-1">
                <Label htmlFor="eTazkrehNumber">شماره صکوک تذکره</Label>
                <Input
                  id="eTazkrehNumber"
                  name="eTazkrehNumber"
                  required={true}
                  placeholder="شماره تذکره الکترونیکی خود را وارد کنید"
                />
              </div>
            </div>
            <div className="flex items-center justify-between gap-4">
              <div className="space-y-2 flex-1">
                <Label htmlFor="fatherName">شماره جلد</Label>
                <Input
                  id="fatherName"
                  name="fatherName"
                  required={true}
                  placeholder="شماره جلد تذکره خود را وارد کنید"
                />
              </div>
              <div className="space-y-2 flex-1">
                <Label htmlFor="eTazkrehNumber">شماره صفحه</Label>
                <Input
                  id="eTazkrehNumber"
                  name="eTazkrehNumber"
                  required={true}
                  placeholder="شماره صفحه تذکره خود را وارد کنید"
                />
              </div>
              <div className="space-y-2 flex-1">
                <Label htmlFor="eTazkrehNumber">شماره ثبت</Label>
                <Input
                  id="eTazkrehNumber"
                  name="eTazkrehNumber"
                  required={true}
                  placeholder="شماره ثبت تذکره خود را وارد کنید"
                />
              </div>
            </div>
            <div className="flex items-center justify-between gap-4">
              <div className="space-y-2 flex-1">
                <Label htmlFor="fatherName">ولایت اصلی</Label>
                <Input
                  id="fatherName"
                  name="fatherName"
                  required={true}
                  placeholder="نام ولایت خود را وارد کنید"
                />
              </div>
              <div className="space-y-2 flex-1">
                <Label htmlFor="eTazkrehNumber">ولسوالی اصلی</Label>
                <Input
                  id="eTazkrehNumber"
                  name="eTazkrehNumber"
                  required={true}
                  placeholder="نام ولسوالی خود را وارد کنید"
                />
              </div>
              <div className="space-y-2 flex-1">
                <Label htmlFor="eTazkrehNumber">قریه اصلی</Label>
                <Input
                  id="eTazkrehNumber"
                  name="eTazkrehNumber"
                  required={true}
                  placeholder="نام قریه خود را وارد کنید"
                />
              </div>
            </div>
            <div className="border-t pt-4 border-dotted">
              <h2>اطلاعات محل سکونت فعلی</h2>
            </div>
            <div className="flex items-center justify-between gap-4">
              <div className="space-y-2 flex-1">
                <Label htmlFor="fatherName">استان سکونت فعلی</Label>
                <Input
                  id="fatherName"
                  name="fatherName"
                  required={true}
                  placeholder="نام استان خود را وارد کنید"
                />
              </div>
              <div className="space-y-2 flex-1">
                <Label htmlFor="eTazkrehNumber">شهر محل سکونت فعلی</Label>
                <Input
                  id="eTazkrehNumber"
                  name="eTazkrehNumber"
                  required={true}
                  placeholder="نام شهر خود را وارد کنید"
                />
              </div>
            </div>
            <div className="border-t pt-4 border-dotted">
              <h2>اطلاعات تماس متقاضی</h2>
            </div>
            <div className="flex items-center justify-between gap-4">
              <div className="space-y-2 flex-1">
                <Label htmlFor="fatherName">شماره تماس</Label>
                <Input
                  id="fatherName"
                  name="fatherName"
                  required={true}
                  placeholder="شماره تماس خود را وارد کنید"
                />
              </div>
              <div className="space-y-2 flex-1">
                <Label htmlFor="eTazkrehNumber">شماره تماس اضطراری</Label>
                <Input
                  id="eTazkrehNumber"
                  name="eTazkrehNumber"
                  required={true}
                  placeholder="شماره تماس اضطراری خود را وارد کنید"
                />
              </div>
            </div>
          </>
        );

      case "relation_tazkre":
        return (
          <>
            <div className="flex items-center justify-between gap-4">
              <div className="space-y-2 flex-1">
                <Label htmlFor="name">نام</Label>
                <Input
                  id="name"
                  name="name"
                  required={true}
                  placeholder="نام خود را وارد کنید"
                />
              </div>
              <div className="space-y-2 flex-1">
                <Label htmlFor="firstName">نام خانوادگی</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  required={true}
                  placeholder="نام خانوادگی خود را وارد کنید"
                />
              </div>
            </div>
            <div className="flex items-center justify-between gap-4">
              <div className="space-y-2 flex-1">
                <Label htmlFor="fatherName">نام پدر</Label>
                <Input
                  id="fatherName"
                  name="fatherName"
                  required={true}
                  placeholder="نام پدر خود را وارد کنید"
                />
              </div>
              <div className="space-y-2 flex-1">
                <Label htmlFor="eTazkrehNumber">نسبت اقارب اصولی با شما</Label>
                <Input
                  id="eTazkrehNumber"
                  name="eTazkrehNumber"
                  required={true}
                  placeholder="نسبت اقارب اصولی خود را وارد کنید"
                />
              </div>
            </div>
            <div className="flex items-center justify-between gap-4">
              <div className="space-y-2 flex-1">
                <Label htmlFor="fatherName">نام اقارب اصولی</Label>
                <Input
                  id="fatherName"
                  name="fatherName"
                  required={true}
                  placeholder="نام اقارب اصولی خود را وارد کنید"
                />
              </div>
              <div className="space-y-2 flex-1">
                <Label htmlFor="fatherName">نام خانوادگی اقارب اصولی</Label>
                <Input
                  id="fatherName"
                  name="fatherName"
                  required={true}
                  placeholder="نام اقارب اصولی خود را وارد کنید"
                />
              </div>
              <div className="space-y-2 flex-1">
                <Label htmlFor="eTazkrehNumber">شماره تذکره اقارب اصولی</Label>
                <Input
                  id="eTazkrehNumber"
                  name="eTazkrehNumber"
                  required={true}
                  placeholder="نسبت اقارب اصولی خود را وارد کنید"
                />
              </div>
            </div>
            <div className="flex items-center justify-between gap-4">
              <div className="space-y-2 flex-1">
                <Label htmlFor="fatherName">ولایت اصلی</Label>
                <Input
                  id="fatherName"
                  name="fatherName"
                  required={true}
                  placeholder="نام ولایت خود را وارد کنید"
                />
              </div>
              <div className="space-y-2 flex-1">
                <Label htmlFor="eTazkrehNumber">ولسوالی اصلی</Label>
                <Input
                  id="eTazkrehNumber"
                  name="eTazkrehNumber"
                  required={true}
                  placeholder="نام ولسوالی خود را وارد کنید"
                />
              </div>
              <div className="space-y-2 flex-1">
                <Label htmlFor="eTazkrehNumber">قریه اصلی</Label>
                <Input
                  id="eTazkrehNumber"
                  name="eTazkrehNumber"
                  required={true}
                  placeholder="نام قریه خود را وارد کنید"
                />
              </div>
            </div>
            <div className="border-t pt-4 border-dotted">
              <h2>اطلاعات محل سکونت فعلی</h2>
            </div>
            <div className="flex items-center justify-between gap-4">
              <div className="space-y-2 flex-1">
                <Label htmlFor="fatherName">استان سکونت فعلی</Label>
                <Input
                  id="fatherName"
                  name="fatherName"
                  required={true}
                  placeholder="نام استان خود را وارد کنید"
                />
              </div>
              <div className="space-y-2 flex-1">
                <Label htmlFor="eTazkrehNumber">شهر محل سکونت فعلی</Label>
                <Input
                  id="eTazkrehNumber"
                  name="eTazkrehNumber"
                  required={true}
                  placeholder="نام شهر خود را وارد کنید"
                />
              </div>
            </div>
            <div className="border-t pt-4 border-dotted">
              <h2>اطلاعات تماس متقاضی</h2>
            </div>
            <div className="flex items-center justify-between gap-4">
              <div className="space-y-2 flex-1">
                <Label htmlFor="fatherName">شماره تماس</Label>
                <Input
                  id="fatherName"
                  name="fatherName"
                  required={true}
                  placeholder="شماره تماس خود را وارد کنید"
                />
              </div>
              <div className="space-y-2 flex-1">
                <Label htmlFor="eTazkrehNumber">شماره تماس اضطراری</Label>
                <Input
                  id="eTazkrehNumber"
                  name="eTazkrehNumber"
                  required={true}
                  placeholder="شماره تماس اضطراری خود را وارد کنید"
                />
              </div>
            </div>
          </>
        );

      default:
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                required={true}
                placeholder="Enter your name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                required={true}
                placeholder="Enter your email"
              />
            </div>
          </>
        );
    }
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
      formSteps={formSteps}
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
        {getFormFields()}
      </form>
    </MultiStepForm>
  );
}
