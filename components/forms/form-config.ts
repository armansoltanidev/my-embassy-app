import { FormStep } from "@/components/ui/multi-step-form";
import {
  Cake,
  CarFront,
  FileUser,
  IdCard,
  PlaneTakeoff,
  ShieldUser,
  SquareAsterisk,
} from "lucide-react";
import { FormType } from "./form-types";

// Define the form flow configuration
export interface FormFlowConfig {
  steps: FormStep[];
  getFormType: (selections: Record<string | number, string>) => FormType;
  getStepCount: (appointmentType: string) => number;
}

// Base form steps configuration
const baseFormSteps: FormStep[] = [
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
        validNextSteps: ["amayesh_renewal", "driver_license"],
      },
      {
        id: "STUDENT_ENTRY_EXIT_PERMIT",
        title: "سند رفت و برگشت دانشجویان",
        description: "سند رفت و برگشت دانشجویان جهت اخذ مدارک",
        icon: FileUser,
        validNextSteps: ["student_passport_options"],
      },
      {
        id: "BIRTH_CERTIFICATE",
        title: "گواهی تولد",
        description: "گواهی تولد برای متولدین خارج از کشور",
        icon: Cake,
        validNextSteps: ["birth_registration"],
      },
      {
        id: "CERTIFICATE_OF_NO_CRIMINAL_RECORDS",
        title: "گواهی عدم سوء پیشینه",
        description: "سند عدم سوء پیشینه برای متقاضیان",
        icon: ShieldUser,
        validNextSteps: ["criminal_record_check"],
      },
    ],
  },
  {
    level: 2,
    id: "appointment-reasons",
    title: "لطفا یکی از موارد زیر را انتخاب کنید",
    description: "لطفا یکی از موارد زیر را انتخاب کنید",

    items: [
      {
        id: "amayesh_renewal",
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
        id: "familiy_passport",
        title: "سند رفت و برگشت مخصوص دانشجویان",
        description:
          "دارای پاسپورت خانواری میباشم و قصد سفر به افغانستان را دارم",
        icon: SquareAsterisk,
        validNextSteps: ["amayesh"],
      },
      {
        id: "student_passport_options",
        title: "انتخاب نوع مدرک برای دانشجویان",
        description: "لطفا نوع مدرک خود را در مرحله بعد انتخاب کنید",
        icon: PlaneTakeoff,
        validNextSteps: ["amayesh", "passport", "familiy_passport"],
      },
      {
        id: "birth_registration",
        title: "ثبت تولد",
        description: "ثبت گواهی تولد برای متولدین خارج از کشور",
        icon: Cake,
        validNextSteps: [],
      },
      {
        id: "criminal_record_check",
        title: "بررسی سوابق",
        description: "درخواست گواهی عدم سوء پیشینه",
        icon: ShieldUser,
        validNextSteps: [],
      },
    ],
  },
  {
    level: 3,
    id: "document-type",
    title: "لطفا یکی از گزینه های زیر را انتخاب کنید",
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
        id: "amayesh",
        title: "کارت آمایش",
        description: "دارای کارت آمایش میباشم",
        icon: IdCard,
      },
      {
        id: "passport",
        title: "پاسپورت",
        description: "دارای پاسپورت میباشم",
        icon: PlaneTakeoff,
      },
      {
        id: "familiy_passport",
        title: "پاسپورت خانواری",
        description: "دارای پاسپورت خانواری میباشم",
        icon: PlaneTakeoff,
      },
    ],
  },
];

// Configuration for different appointment flows
export const formFlowConfig: FormFlowConfig = {
  steps: baseFormSteps,

  getStepCount: (appointmentType: string): number => {
    switch (appointmentType) {
      case "ISSUANCE_OF_IDENTITY":
        return 3;
      case "STUDENT_ENTRY_EXIT_PERMIT":
        return 3;
      case "BIRTH_CERTIFICATE":
      case "CERTIFICATE_OF_NO_CRIMINAL_RECORDS":
        return 2; // appointment-type -> appointment-reasons
      default:
        return 2;
    }
  },

  getFormType: (selections: Record<string | number, string>): FormType => {
    const appointmentReason = selections[1];
    const documentType = selections[2];

    // If we have a third step selection (document type), use it
    if (documentType) {
      return documentType as FormType;
    }

    // Otherwise, determine form type based on appointment reason
    switch (appointmentReason) {
      case "amayesh":
        return "amayesh";
      case "passport":
        return "passport";
      case "familiy_passport":
        return "familiy_passport";
      case "student_passport_options":
        // For student passport options, we need to show the third step
        // The form will be selected in the third step
        return "basic";
      case "birth_registration":
      case "criminal_record_check":
        return "basic";
      default:
        return "basic";
    }
  },
};

// Helper function to get filtered steps based on appointment type
export function getFilteredSteps(appointmentType: string): FormStep[] {
  const stepCount = formFlowConfig.getStepCount(appointmentType);
  return baseFormSteps.slice(0, stepCount);
}

// Helper function to check if a form should be shown
export function shouldShowForm(
  selections: Record<string | number, string>,
  totalSteps: number
): boolean {
  const lastStepIndex = totalSteps - 1;
  return selections[lastStepIndex] !== undefined;
}
