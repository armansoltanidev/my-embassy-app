import { z } from "zod";

z.setErrorMap((issue, _ctx) => {
  if (issue.code === "invalid_type" && issue.expected === "string" && issue.received === "undefined") {
    return { message: "این فیلد الزامی است" };
  }
  return { message: _ctx.defaultError };
});


// Define schema for EXIT_ENTRY_DOCUMENT form
export const exitEntryDocumentSchema = z.object({
  // Personal information - Persian
  firstName: z.string().min(2, { message: "نام باید حداقل ۲ حرف باشد" }),
  lastName: z
    .string()
    .min(2, { message: "نام خانوادگی باید حداقل ۲ حرف باشد" }),
  fatherName: z.string().min(2, { message: "نام پدر باید حداقل ۲ حرف باشد" }),
  grandFatherName: z.string().min(2, { message: "نام پدر کلان باید حداقل ۲ حرف باشد" }),
  
  // Personal information - Latin
  firstNameLatin: z.string().min(2, { message: "نام لاتین باید حداقل ۲ حرف باشد" }),
  lastNameLatin: z
    .string()
    .min(2, { message: "نام خانوادگی لاتین باید حداقل ۲ حرف باشد" }),
  fatherNameLatin: z.string().min(2, { message: "نام پدر لاتین باید حداقل ۲ حرف باشد" }),
  grandFatherNameLatin: z.string().min(2, { message: "نام پدر کلان لاتین باید حداقل ۲ حرف باشد" }),
  

  documentIdType:z.enum(["AMAYESH_CARD", "PASSPORT", "FAMILY_PASSPORT", "RESIDENT_BOOK"], {
    required_error: "وارد کردن نوع مدرک است",
  }),


  // Document information
  documentNumber: z
    .string()
    .min(6, { message: "شماره سند باید حداقل ۶ کاراکتر باشد" }),
  birthDate: z.date({ required_error: "تاریخ تولد الزامی است" }).optional(),
  phoneNumber: z
    .string()
    .min(10, { message: "شماره تلفن باید حداقل ۱۰ رقم باشد" }),
  gender: z.enum(["MALE", "FEMALE"], {
    required_error: "جنسیت الزامی است",
  }),
  
  // Status information
  maritalStatus: z.enum(["SINGLE", "MARRIED", "DIVORCED", "WIDOWED"], {
    required_error: "وضعیت تاهل الزامی است",
  }),
  
  // Address information
  mainProvince: z.string().min(2, { message: "نام ولایت باید حداقل ۲ حرف باشد" }),
  mainDistrict: z.string().min(2, { message: "نام ولسوالی باید حداقل ۲ حرف باشد" }),
  mainVillage: z.string().min(2, { message: "نام قریه باید حداقل ۲ حرف باشد" }),
  
  // Relative information
  relativeType: z.enum(["UNCLE", "AUNT", "FATHER"], {
    required_error: "نوع قرابت الزامی است",
  }),
  relativeIdCardType: z.enum(["ELECTRONIC", "PAPER", "BOOKLET"], {
    required_error: "نوع تذکره اقارب الزامی است",
  }),
  relativeIdCardNumber: z
    .string()
    .min(5, { message: "شماره تذکره اقارب باید حداقل ۵ کاراکتر باشد" }),
  relativePhoneNumber: z
    .string()
    .min(10, { message: "شماره تلفن اقارب باید حداقل ۱۰ رقم باشد" }),
  
  // Educational information
  universityType: z.enum(["AZAD_ISLAMIC", "GOVERNMENT_UNIVERSITY", "PAYAM_NOOR"], {
    required_error: "نوع دانشگاه الزامی است",
  }),
  majorName: z.enum(["SOFTWARE_ENGINEERING", "MECHANIC_ENGINEERING", "MEDICINE", "OTHER"], {
    required_error: "رشته تحصیلی الزامی است",
  }),
  degree: z.enum(["ASSOCIATE", "BACHELOR", "MASTERDEGREE", "PHD"], {
    required_error: "مقطع تحصیلی الزامی است",
  }),
  universityName: z.string().min(2, { message: "نام دانشگاه باید حداقل ۲ حرف باشد" }),
  universityEntryYear: z.string().min(4, { message: "سال ورود به دانشگاه باید حداقل ۴ کاراکتر باشد" }),
  studentId: z.string().min(5, { message: "شماره دانشجویی باید حداقل ۵ کاراکتر باشد" }),
  semester: z.string().min(1, { message: "ترم تحصیلی الزامی است" }),
});

// Combined schema using discriminated union for EXIT_ENTRY_DOCUMENT
export const exitEntryDocumentFormSchema = z.object({
  residentType: z.enum(["RESIDENT_BOOK", "PASSPORT", "AMAYESH_CARD", "FAMILIY_PASSPORT"]),
  appointmentType: z.literal("EXIT_ENTRY_DOCUMENT"),
  ...exitEntryDocumentSchema.shape,
});