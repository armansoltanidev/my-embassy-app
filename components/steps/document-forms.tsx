"use client";

import { z } from "zod";
import { useFormContext } from "react-hook-form";
import { motion } from "framer-motion";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AlertCircle } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import Link from "next/link";
import DatePickerInput from "../date-picker-input";
import { exitEntryDocumentSchema } from "./exit-entry-document-schema";

// Define schemas for different document types
export const residentBookSchema = z.object({
  firstName: z.string().min(2, { message: "نام باید حداقل ۲ حرف باشد" }),
  lastName: z
    .string()
    .min(2, { message: "نام خانوادگی باید حداقل ۲ حرف باشد" }),
  fatherName: z.string().min(2, { message: "نام پدر باید حداقل ۲ حرف باشد" }),
  bookNumber: z
    .string()
    .min(5, { message: "شماره دفترچه باید حداقل ۵ کاراکتر باشد" }),
  phoneNumber: z
    .string()
    .min(10, { message: "شماره تلفن باید حداقل ۱۰ رقم باشد" }),
});

export const passportSchema = z.object({
  firstName: z.string().min(2, { message: "نام باید حداقل ۲ حرف باشد" }),
  lastName: z
    .string()
    .min(2, { message: "نام خانوادگی باید حداقل ۲ حرف باشد" }),
  fatherName: z.string().min(2, { message: "نام پدر باید حداقل ۲ حرف باشد" }),
  passportNumber: z
    .string()
    .min(8, { message: "شماره پاسپورت باید حداقل ۸ کاراکتر باشد" }),
  phoneNumber: z
    .string()
    .min(10, { message: "شماره تلفن باید حداقل ۱۰ رقم باشد" }),
});

export const amayeshCardSchema = z.object({
  firstName: z.string().min(2, { message: "نام باید حداقل ۲ حرف باشد" }),
  lastName: z
    .string()
    .min(2, { message: "نام خانوادگی باید حداقل ۲ حرف باشد" }),
  fatherName: z.string().min(2, { message: "نام پدر باید حداقل ۲ حرف باشد" }),
  cardNumber: z
    .string()
    .min(6, { message: "شماره کارت باید حداقل ۶ کاراکتر باشد" }),
  phoneNumber: z
    .string()
    .min(10, { message: "شماره تلفن باید حداقل ۱۰ رقم باشد" }),
});

// Define schema for AssertionOfIdentityAmayesh form
export const assertionOfIdentityAmayeshSchema = z.object({
  firstName: z.string().min(2, { message: "نام باید حداقل ۲ حرف باشد" }),
  lastName: z
    .string()
    .min(2, { message: "نام خانوادگی باید حداقل ۲ حرف باشد" }),
  fatherName: z.string().min(2, { message: "نام پدر باید حداقل ۲ حرف باشد" }),
  relativeIdCardNumber: z
    .string()
    .min(6, { message: "شماره کارت آمایش باید حداقل ۶ کاراکتر باشد" }),
  birthDate: z.date({ required_error: "تاریخ تولد الزامی است" }),
  phoneNumber: z
    .string()
    .min(10, { message: "شماره تلفن باید حداقل ۱۰ رقم باشد" }),
  mainProvince: z.string().min(2, { message: "نام ولایت باید حداقل ۲ حرف باشد" }),
  district: z.string().min(2, { message: "نام ولسوالی باید حداقل ۲ حرف باشد" }),
  village: z.string().min(2, { message: "نام قریه باید حداقل ۲ حرف باشد" }),
  relativeType: z.enum(["UNCLE", "AUNT", "FATHER"], {
    required_error: "نوع قرابت الزامی است",
  }),
  relativeIdType: z.enum(["ELECTRONIC", "PAPER", "BOOKLET"], {
    required_error: "نوع تذکره اقارب الزامی است",
  }),
  relativeIdNumber: z
    .string()
    .min(5, { message: "شماره تذکره اقارب باید حداقل ۵ کاراکتر باشد" }),
  relativePhoneNumber: z
    .string()
    .min(10, { message: "شماره تلفن اقارب باید حداقل ۱۰ رقم باشد" }),
});

export const familyPassportSchema = z.object({
  firstName: z.string().min(2, { message: "نام باید حداقل ۲ حرف باشد" }),
  lastName: z
    .string()
    .min(2, { message: "نام خانوادگی باید حداقل ۲ حرف باشد" }),
  fatherName: z.string().min(2, { message: "نام پدر باید حداقل ۲ حرف باشد" }),
  passportNumber: z
    .string()
    .min(8, { message: "شماره پاسپورت باید حداقل ۸ کاراکتر باشد" }),
  familyMembers: z
    .string()
    .min(1, { message: "تعداد اعضای خانواده را وارد کنید" }),
  phoneNumber: z
    .string()
    .min(10, { message: "شماره تلفن باید حداقل ۱۰ رقم باشد" }),
});

// Combined schema using discriminated union
export const documentFormsSchema = z.discriminatedUnion("residentType", [

  // Add assertion of identity amayesh schema
  z.object({
    residentType: z.literal("ASSERTION_OF_IDENTITY_AMAYESH"),
    appointmentType: z.literal("ASSERTION_OF_IDENTITY"),
    ...assertionOfIdentityAmayeshSchema.shape,
  }),
  // Add exit entry document schema
  z.object({
    residentType: z.enum(["RESIDENT_BOOK", "PASSPORT", "AMAYESH_CARD", "FAMILIY_PASSPORT"]),
    appointmentType: z.literal("EXIT_ENTRY_DOCUMENT"),
    ...exitEntryDocumentSchema.shape,
  }),
]);

// Form component for Resident Book
const EXIT_ENTRY_DOCUMENT_FORM = () => {
  const form = useFormContext();
  const femaleGender = form.getValues("gender");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-4"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>نام</FormLabel>
              <FormControl>
                <Input placeholder="نام خود را وارد کنید" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>نام خانوادگی</FormLabel>
              <FormControl>
                <Input placeholder="نام خانوادگی خود را وارد کنید" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="firstNameLatin"
          render={({ field }) => (
            <FormItem>
              <FormLabel>نام لاتین</FormLabel>
              <FormControl>
                <Input placeholder="نام لاتین خود را وارد کنید" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastNameLatin"
          render={({ field }) => (
            <FormItem>
              <FormLabel>نام خانوادگی لاتین</FormLabel>
              <FormControl>
                <Input
                  placeholder="نام خانوادگی لاتین خود را وارد کنید"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="fatherName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>نام پدر</FormLabel>
              <FormControl>
                <Input placeholder="نام پدر خود را وارد کنید" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="fatherNameLatin"
          render={({ field }) => (
            <FormItem>
              <FormLabel>نام لاتین پدر</FormLabel>
              <FormControl>
                <Input
                  placeholder="نام  لاتین پدر خود را وارد کنید"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="grandFatherName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>نام پدر بزرگ</FormLabel>
              <FormControl>
                <Input placeholder="نام پدر بزرگ خود را وارد کنید" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="grandFatherNameLatin"
          render={({ field }) => (
            <FormItem>
              <FormLabel>نام لاتین پدر بزرگ</FormLabel>
              <FormControl>
                <Input
                  placeholder="نام لاتین پدر بزرگ خود را وارد کنید"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FormField
          control={form.control}
          name="documentNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>شماره مدرک</FormLabel>
              <FormControl>
                <Input
                  placeholder="شماره مدرک (کد یکتا - شماره پاسپورت - شماره دفترچه اقامت)"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="birthDate"
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          render={({ field }) => (
            <FormItem>
              <FormLabel>تاریخ تولد</FormLabel>
              <FormControl>
                <DatePickerInput  />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>شماره تلفن</FormLabel>
              <FormControl>
                <Input placeholder="شماره تلفن خود را وارد کنید" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel>جنسیت</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                dir="rtl"
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="لطفا یکی از گزینه های زیر را انتخاب کنید" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="MALE">مرد</SelectItem>
                  <SelectItem value="FEMALE">زن</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="maritalStatus"
          render={({ field }) => (
            <FormItem>
              <FormLabel>وضیعیت تاهل</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                dir="rtl"
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="لطفا یکی از گزینه های زیر را انتخاب کنید" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="MARRIED">متاهل</SelectItem>
                  <SelectItem value="SINGLE">مجرد</SelectItem>
                  <SelectItem value="DIVORCED">مطلقه</SelectItem>
                  <SelectItem value="WIDOWED">بیوه</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FormField
          control={form.control}
          name="mainProvince"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ولایت</FormLabel>
              <FormControl>
                <Input
                  placeholder="لطفا نام ولایت خود را وارد نمایید"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="mainDistrict"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ولسوالی</FormLabel>
              <FormControl>
                <Input
                  placeholder="لطفا نام ولسوالی خود را وارد نمایید"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="mainVillage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>قریه</FormLabel>
              <FormControl>
                <Input
                  placeholder="لطفا نام قریه خود را وارد نمایید"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

{femaleGender === "FEMALE" && <>
  <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-2 text-primary bg-primary/5 p-4 rounded-lg"
      >
        <AlertCircle className="h-5 w-5" />
        <p className="text-sm font-medium">
          لطفا اطلاعات یکی از محارم خود را که قصد سفر همراه شما دارند را وارد کنید.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="maharemRelativeType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>نوع قرابت</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                dir="rtl"
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="لطفا یکی از گزینه های زیر را انتخاب کنید" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                <SelectItem value="FATHER">پدر</SelectItem>
                  <SelectItem value="UNCLE">کاکا</SelectItem>
                  <SelectItem value="GRANDFATHER">پدر بزرگ</SelectItem>
                  <SelectItem value="BROTHER">برادر</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                طبق دستور مراجع همراه داشتن محارم برای دانشجویان با جنسیت زن الزامی میباشد.
                <Link className="underline" href="/examples/forms">
                  بیشتر بدانید{" "}
                </Link>
                .
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="documentIdType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>نوع مدرک محرم شما</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                dir="rtl"
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="لطفا یکی از گزینه های زیر را انتخاب کنید" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="AMAYESH_CARD">کارت آمایش</SelectItem>
                  <SelectItem value="PASSPORT">پاسپورت</SelectItem>
                  <SelectItem value="RESIDENT_BOOK">دفترچه اقامت</SelectItem>
                  <SelectItem value="FAMILY_PASSPORT">پاسپورت خانوار</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                محرم شما باید دارای اقامت معتبر در جمهوری اسلامی ایران باشد.
                <Link className="underline" href="/examples/forms">
                  بیشتر بدانید{" "}
                </Link>
                .
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>نام</FormLabel>
              <FormControl>
                <Input placeholder="نام خود را وارد کنید" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>نام خانوادگی</FormLabel>
              <FormControl>
                <Input placeholder="نام خانوادگی خود را وارد کنید" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="firstNameLatin"
          render={({ field }) => (
            <FormItem>
              <FormLabel>نام لاتین</FormLabel>
              <FormControl>
                <Input placeholder="نام لاتین خود را وارد کنید" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastNameLatin"
          render={({ field }) => (
            <FormItem>
              <FormLabel>نام خانوادگی لاتین</FormLabel>
              <FormControl>
                <Input
                  placeholder="نام خانوادگی لاتین خود را وارد کنید"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="fatherName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>نام پدر</FormLabel>
              <FormControl>
                <Input placeholder="نام پدر خود را وارد کنید" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="fatherNameLatin"
          render={({ field }) => (
            <FormItem>
              <FormLabel>نام لاتین پدر</FormLabel>
              <FormControl>
                <Input
                  placeholder="نام  لاتین پدر خود را وارد کنید"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="grandFatherName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>نام پدر بزرگ</FormLabel>
              <FormControl>
                <Input placeholder="نام پدر بزرگ خود را وارد کنید" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="grandFatherNameLatin"
          render={({ field }) => (
            <FormItem>
              <FormLabel>نام لاتین پدر بزرگ</FormLabel>
              <FormControl>
                <Input
                  placeholder="نام لاتین پدر بزرگ خود را وارد کنید"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FormField
          control={form.control}
          name="documentNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>شماره مدرک</FormLabel>
              <FormControl>
                <Input
                  placeholder="شماره مدرک (کد یکتا - شماره پاسپورت - شماره دفترچه اقامت)"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="birthDate"
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          render={({ field }) => (
            <FormItem>
              <FormLabel>تاریخ تولد</FormLabel>
              <FormControl>
                <DatePickerInput/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>شماره تلفن</FormLabel>
              <FormControl>
                <Input placeholder="شماره تلفن خود را وارد کنید" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      </>} 

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-2 text-primary bg-primary/5 p-4 rounded-lg"
      >
        <AlertCircle className="h-5 w-5" />
        <p className="text-sm font-medium">
          لطفا اطلاعات یکی از اقوام (اقارب) خویش را وارد کنید.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="relativeType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>نوع قرابت</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                dir="rtl"
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="لطفا یکی از گزینه های زیر را انتخاب کنید" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="UNCLE">کاکا</SelectItem>
                  <SelectItem value="AUNT">عمه</SelectItem>
                  <SelectItem value="FATHER">پدر</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
               طبق دستور وارد همراه داشتن محارم برای دانشجویان با جنسیت زن الزامی{" "}
                <Link className="underline" href="/examples/forms">
                  بیشتر بدانید{" "}
                </Link>
                .
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="relativeIdCardType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>نوع تذکره اقارب</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                dir="rtl"
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="لطفا یکی از گزینه های زیر را انتخاب کنید" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="ELECTRONIC">الکترونیکی</SelectItem>
                  <SelectItem value="PAPER">کاغذی</SelectItem>
                  <SelectItem value="BOOKLET">دفترچه ای</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                لطفا در صورت داشتن دفترچه کاغذی یا الکترونیکی شماره صکوک آن را
                وارد نمایید.
                <Link className="underline" href="/examples/forms">
                  بیشتر بدانید{" "}
                </Link>
                .
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="relativeIdCardNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>شماره تذکره</FormLabel>
              <FormControl>
                <Input
                  placeholder="لطفا شماره تذکره اقارب خود را وارد نمایید"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="relativePhoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>شماره تلفن</FormLabel>
              <FormControl>
                <Input
                  placeholder="لطفا شماره تلفن اقارب خود را وارد نمایید."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-2 text-primary bg-primary/5 p-4 rounded-lg"
      >
        <AlertCircle className="h-5 w-5" />
        <p className="text-sm font-medium">
          لطفا اطلاعات تحصیلی خویش را وارد کنید.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FormField
          control={form.control}
          name="universityType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>نوع دانشگاه محل تحصیل</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                dir="rtl"
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="لطفا یکی از گزینه های زیر را انتخاب کنید" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="AZAD_ISLAMIC">دانشگاه آزاد</SelectItem>
                  <SelectItem value="GOVERNMENT_UNIVERSITY">دانشگاه دولتی</SelectItem>
                  <SelectItem value="PAYAM_NOOR">دانشگاه پیام نور</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                در صورت نداشتن رشته تحصیلی، لطفا گزینه &quot;سایر&quot; را
                انتخاب کنید.
                <Link className="underline" href="/examples/forms">
                  بیشتر بدانید{" "}
                </Link>
                .
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="majorName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>رشته تحصیلی</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                dir="rtl"
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="لطفا یکی از گزینه های زیر را انتخاب کنید" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="SOFTWARE_ENGINEERING">مهندسی نرم افزار</SelectItem>
                  <SelectItem value="MECHANIC_ENGINEERING">مهندسی مکانیک</SelectItem>
                  <SelectItem value="MEDICINE">پزشکی</SelectItem>
                  <SelectItem value="OTHER">سایر</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                در صورت نداشتن رشته تحصیلی، لطفا گزینه &quot;سایر&quot; را
                انتخاب کنید.
                <Link className="underline" href="/examples/forms">
                  بیشتر بدانید{" "}
                </Link>
                .
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="degree"
          render={({ field }) => (
            <FormItem>
              <FormLabel>مقطع تحصیلی</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                dir="rtl"
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="لطفا یکی از گزینه های زیر را انتخاب کنید" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="ASSOCIATE">کاردانی</SelectItem>
                  <SelectItem value="BACHELOR">کارشناسی</SelectItem>
                  <SelectItem value="MASTERDEGREE">کارشناسی ارشد</SelectItem>
                  <SelectItem value="PHD">دکتری</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                مقطع تحصیلی فعلی خود را انتخاب کنید {" "}
                <Link className="underline" href="/examples/forms">
                  بیشتر بدانید{" "}
                </Link>
                .
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="universityName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>نام دانشگاه محل تحصیل</FormLabel>
              <FormControl>
                <Input
                  placeholder="لطفا نام دانشگاه محل تحصیل خود را وارد نمایید"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="universityEntryYear"
          render={({ field }) => (
            <FormItem>
              <FormLabel>سال ورود به دانشگاه</FormLabel>
              <FormControl>
                <Input
                  placeholder="لطفا سال ورود به دانشگاه خود را وارد نمایید."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="studentId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>شماره دانشجویی</FormLabel>
              <FormControl>
                <Input
                  placeholder="لطفا شماره دانشجویی خود را وارد نمایید"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="semester"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ترم</FormLabel>
              <FormControl>
                <Input
                  placeholder="لطفا شماره ترم خود را وارد نمایید."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </motion.div>
  );
};

// Form component for Passport
const PassportForm = () => {
  const form = useFormContext();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-4"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>نام</FormLabel>
              <FormControl>
                <Input placeholder="نام خود را وارد کنید" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>نام خانوادگی</FormLabel>
              <FormControl>
                <Input placeholder="نام خانوادگی خود را وارد کنید" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="fatherName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>نام پدر</FormLabel>
              <FormControl>
                <Input placeholder="نام پدر خود را وارد کنید" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="passportNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>شماره پاسپورت</FormLabel>
              <FormControl>
                <Input
                  placeholder="شماره پاسپورت خود را وارد کنید"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="phoneNumber"
        render={({ field }) => (
          <FormItem>
            <FormLabel>شماره تلفن</FormLabel>
            <FormControl>
              <Input placeholder="شماره تلفن خود را وارد کنید" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </motion.div>
  );
};

// Form component for Amayesh Card
const AmayeshCardForm = () => {
  const form = useFormContext();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-4"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>نام</FormLabel>
              <FormControl>
                <Input placeholder="نام dخود را وارد کنید" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>نام خانوادگی</FormLabel>
              <FormControl>
                <Input placeholder="نام خانوادگی خود را وارد کنید" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="fatherName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>نام پدر</FormLabel>
              <FormControl>
                <Input placeholder="نام پدر خود را وارد کنید" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="cardNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>شماره کارت</FormLabel>
              <FormControl>
                <Input
                  placeholder="شماره کارت آمایش خود را وارد کنید"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="phoneNumber"
        render={({ field }) => (
          <FormItem>
            <FormLabel>شماره تلفن</FormLabel>
            <FormControl>
              <Input placeholder="شماره تلفن خود را وارد کنید" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </motion.div>
  );
};

// Form component for Family Passport
const FamilyPassportForm = () => {
  const form = useFormContext();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-4"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>نام</FormLabel>
              <FormControl>
                <Input placeholder="نام خود را وارد کنید" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>نام خانوادگی</FormLabel>
              <FormControl>
                <Input placeholder="نام خانوادگی خود را وارد کنید" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="fatherName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>نام پدر</FormLabel>
              <FormControl>
                <Input placeholder="نام پدر خود را وارد کنید" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="passportNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>شماره پاسپورت</FormLabel>
              <FormControl>
                <Input
                  placeholder="شماره پاسپورت خود را وارد کنید"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="familyMembers"
          render={({ field }) => (
            <FormItem>
              <FormLabel>تعداد اعضای خانواده</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="تعداد اعضای خانواده را وارد کنید"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>شماره تلفن</FormLabel>
              <FormControl>
                <Input placeholder="شماره تلفن خود را وارد کنید" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </motion.div>
  );
};

// Form components for ASSERTION_OF_IDENTITY appointment type
const AssertionOfIdentityResidentBookForm = () => {
  const form = useFormContext();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-4"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>نام</FormLabel>
              <FormControl>
                <Input placeholder="نام خود را وارد کنید" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>نام خانوادگی</FormLabel>
              <FormControl>
                <Input placeholder="نام خانوادگی خود را وارد کنید" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="fatherName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>نام پدر</FormLabel>
              <FormControl>
                <Input placeholder="نام پدر خود را وارد کنید" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="cardNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>شماره دفترچه اقامت</FormLabel>
              <FormControl>
                <Input
                  placeholder="شماره دفترچه اقامت خود را وارد کنید"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="birthDate"
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          render={({ field }) => (
            <FormItem>
              <FormLabel>تاریخ تولد</FormLabel>
              <FormControl>{/* <DatePickerInput  {...field} /> */}</FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>شماره تلفن</FormLabel>
              <FormControl>
                <Input placeholder="شماره تلفن خود را وارد کنید" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FormField
          control={form.control}
          name="province"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ولایت</FormLabel>
              <FormControl>
                <Input
                  placeholder="لطفا نام ولایت خود را وارد نمایید"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="district"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ولسوالی</FormLabel>
              <FormControl>
                <Input
                  placeholder="لطفا نام ولسوالی خود را وارد نمایید"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="village"
          render={({ field }) => (
            <FormItem>
              <FormLabel>قریه</FormLabel>
              <FormControl>
                <Input
                  placeholder="لطفا نام قریه خود را وارد نمایید"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-2 text-primary bg-primary/5 p-4 rounded-lg"
      >
        <AlertCircle className="h-5 w-5" />
        <p className="text-sm font-medium">
          لطفا اطلاعات یکی از اقوام (اقارب) خویش را وارد کنید.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="relativeType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>نوع قرابت</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                dir="rtl"
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="لطفا یکی از گزینه های زیر را انتخاب کنید" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="UNCLE">کاکا</SelectItem>
                  <SelectItem value="AUNT">عمه</SelectItem>
                  <SelectItem value="FATHER">پدر</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                متاسفانه امکان صدور ثتبیت هویت بدون ثبت اقارب اصولی وجود ندارد{" "}
                <Link className="underline" href="/examples/forms">
                  بیشتر بدانید{" "}
                </Link>
                .
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="relativeIdType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>نوع تذکره اقارب</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                dir="rtl"
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="لطفا یکی از گزینه های زیر را انتخاب کنید" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="ELECTRONIC">الکترونیکی</SelectItem>
                  <SelectItem value="PAPER">کاغذی</SelectItem>
                  <SelectItem value="BOOKLET">دفترچه ای</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                لطفا در صورت داشتن دفترچه کاغذی یا الکترونیکی شماره صکوک آن را
                وارد نمایید.
                <Link className="underline" href="/examples/forms">
                  بیشتر بدانید{" "}
                </Link>
                .
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="relativeIdNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>شماره تذکره</FormLabel>
              <FormControl>
                <Input
                  placeholder="لطفا شماره تذکره اقارب خود را وارد نمایید"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="relativePhoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>شماره تلفن</FormLabel>
              <FormControl>
                <Input
                  placeholder="لطفا شماره تلفن اقارب خود را وارد نمایید."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </motion.div>
  );
};

const AssertionOfIdentityPassportForm = () => {
  const form = useFormContext();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-4"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>نام</FormLabel>
              <FormControl>
                <Input placeholder="نام خود را وارد کنید" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>نام خانوادگی</FormLabel>
              <FormControl>
                <Input placeholder="نام خانوادگی خود را وارد کنید" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="fatherName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>نام پدر</FormLabel>
              <FormControl>
                <Input placeholder="نام پدر خود را وارد کنید" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="cardNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>شماره پاسپورت</FormLabel>
              <FormControl>
                <Input
                  placeholder="شماره پاسپورت خود را وارد کنید"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="birthDate"
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          render={({ field }) => (
            <FormItem>
              <FormLabel>تاریخ تولد</FormLabel>
              <FormControl>{/* <DatePickerInput  {...field} /> */}</FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>شماره تلفن</FormLabel>
              <FormControl>
                <Input placeholder="شماره تلفن خود را وارد کنید" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FormField
          control={form.control}
          name="province"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ولایت</FormLabel>
              <FormControl>
                <Input
                  placeholder="لطفا نام ولایت خود را وارد نمایید"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="district"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ولسوالی</FormLabel>
              <FormControl>
                <Input
                  placeholder="لطفا نام ولسوالی خود را وارد نمایید"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="village"
          render={({ field }) => (
            <FormItem>
              <FormLabel>قریه</FormLabel>
              <FormControl>
                <Input
                  placeholder="لطفا نام قریه خود را وارد نمایید"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-2 text-primary bg-primary/5 p-4 rounded-lg"
      >
        <AlertCircle className="h-5 w-5" />
        <p className="text-sm font-medium">
          لطفا اطلاعات یکی از اقوام (اقارب) خویش را وارد کنید.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="relativeType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>نوع قرابت</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                dir="rtl"
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="لطفا یکی از گزینه های زیر را انتخاب کنید" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="UNCLE">کاکا</SelectItem>
                  <SelectItem value="AUNT">عمه</SelectItem>
                  <SelectItem value="FATHER">پدر</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                متاسفانه امکان صدور ثتبیت هویت بدون ثبت اقارب اصولی وجود ندارد{" "}
                <Link className="underline" href="/examples/forms">
                  بیشتر بدانید{" "}
                </Link>
                .
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="relativeIdType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>نوع تذکره اقارب</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                dir="rtl"
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="لطفا یکی از گزینه های زیر را انتخاب کنید" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="ELECTRONIC">الکترونیکی</SelectItem>
                  <SelectItem value="PAPER">کاغذی</SelectItem>
                  <SelectItem value="BOOKLET">دفترچه ای</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                لطفا در صورت داشتن دفترچه کاغذی یا الکترونیکی شماره صکوک آن را
                وارد نمایید.
                <Link className="underline" href="/examples/forms">
                  بیشتر بدانید{" "}
                </Link>
                .
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="relativeIdNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>شماره تذکره</FormLabel>
              <FormControl>
                <Input
                  placeholder="لطفا شماره تذکره اقارب خود را وارد نمایید"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="relativePhoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>شماره تلفن</FormLabel>
              <FormControl>
                <Input
                  placeholder="لطفا شماره تلفن اقارب خود را وارد نمایید."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </motion.div>
  );
};

const AssertionOfIdentityAmayeshForm = () => {
  const form = useFormContext();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-4"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>نام</FormLabel>
              <FormControl>
                <Input placeholder="نام خود را وارد کنید" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>نام خانوادگی</FormLabel>
              <FormControl>
                <Input placeholder="نام خانوادگی خود را وارد کنید" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="fatherName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>نام پدر</FormLabel>
              <FormControl>
                <Input placeholder="نام پدر خود را وارد کنید" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="cardNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>شماره یکتا کارت آمایش</FormLabel>
              <FormControl>
                <Input
                  placeholder="شماره یکتا کارت آمایش خود را وارد کنید"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="birthDate"
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          render={({ field }) => (
            <FormItem>
              <FormLabel>تاریخ تولد</FormLabel>
              <FormControl>{/* <DatePickerInput  {...field} /> */}</FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>شماره تلفن</FormLabel>
              <FormControl>
                <Input placeholder="شماره تلفن خود را وارد کنید" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FormField
          control={form.control}
          name="province"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ولایت</FormLabel>
              <FormControl>
                <Input
                  placeholder="لطفا نام ولایت خود را وارد نمایید"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="district"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ولسوالی</FormLabel>
              <FormControl>
                <Input
                  placeholder="لطفا نام ولسوالی خود را وارد نمایید"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="village"
          render={({ field }) => (
            <FormItem>
              <FormLabel>قریه</FormLabel>
              <FormControl>
                <Input
                  placeholder="لطفا نام قریه خود را وارد نمایید"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-2 text-primary bg-primary/5 p-4 rounded-lg"
      >
        <AlertCircle className="h-5 w-5" />
        <p className="text-sm font-medium">
          لطفا اطلاعات یکی از اقوام (اقارب) خویش را وارد کنید.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="relativeType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>نوع قرابت</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                dir="rtl"
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="لطفا یکی از گزینه های زیر را انتخاب کنید" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="UNCLE">کاکا</SelectItem>
                  <SelectItem value="AUNT">عمه</SelectItem>
                  <SelectItem value="FATHER">پدر</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                متاسفانه امکان صدور ثتبیت هویت بدون ثبت اقارب اصولی وجود ندارد{" "}
                <Link className="underline" href="/examples/forms">
                  بیشتر بدانید{" "}
                </Link>
                .
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="relativeIdType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>نوع تذکره اقارب</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                dir="rtl"
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="لطفا یکی از گزینه های زیر را انتخاب کنید" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="ELECTRONIC">الکترونیکی</SelectItem>
                  <SelectItem value="PAPER">کاغذی</SelectItem>
                  <SelectItem value="BOOKLET">دفترچه ای</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                لطفا در صورت داشتن دفترچه کاغذی یا الکترونیکی شماره صکوک آن را
                وارد نمایید.
                <Link className="underline" href="/examples/forms">
                  بیشتر بدانید{" "}
                </Link>
                .
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="relativeIdNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>شماره تذکره</FormLabel>
              <FormControl>
                <Input
                  placeholder="لطفا شماره تذکره اقارب خود را وارد نمایید"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="relativePhoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>شماره تلفن</FormLabel>
              <FormControl>
                <Input
                  placeholder="لطفا شماره تلفن اقارب خود را وارد نمایید."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </motion.div>
  );
};

const AssertionOfIdentityFamilyPassportForm = () => {
  const form = useFormContext();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-4"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>نام</FormLabel>
              <FormControl>
                <Input placeholder="نام خود را وارد کنید" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>نام خانوادگی</FormLabel>
              <FormControl>
                <Input placeholder="نام خانوادگی خود را وارد کنید" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="fatherName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>نام پدر</FormLabel>
              <FormControl>
                <Input placeholder="نام پدر خود را وارد کنید" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="cardNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>شماره پاسپورت</FormLabel>
              <FormControl>
                <Input
                  placeholder="شماره پاسپورت خود را وارد کنید"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="birthDate"
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          render={({ field }) => (
            <FormItem>
              <FormLabel>تاریخ تولد</FormLabel>
              <FormControl>{/* <DatePickerInput  {...field} /> */}</FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>شماره تلفن</FormLabel>
              <FormControl>
                <Input placeholder="شماره تلفن خود را وارد کنید" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FormField
          control={form.control}
          name="province"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ولایت</FormLabel>
              <FormControl>
                <Input
                  placeholder="لطفا نام ولایت خود را وارد نمایید"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="district"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ولسوالی</FormLabel>
              <FormControl>
                <Input
                  placeholder="لطفا نام ولسوالی خود را وارد نمایید"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="village"
          render={({ field }) => (
            <FormItem>
              <FormLabel>قریه</FormLabel>
              <FormControl>
                <Input
                  placeholder="لطفا نام قریه خود را وارد نمایید"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-2 text-primary bg-primary/5 p-4 rounded-lg"
      >
        <AlertCircle className="h-5 w-5" />
        <p className="text-sm font-medium">
          لطفا اطلاعات یکی از اقوام (اقارب) خویش را وارد کنید.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="relativeType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>نوع قرابت</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                dir="rtl"
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="لطفا یکی از گزینه های زیر را انتخاب کنید" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="UNCLE">کاکا</SelectItem>
                  <SelectItem value="AUNT">عمه</SelectItem>
                  <SelectItem value="FATHER">پدر</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                متاسفانه امکان صدور ثتبیت هویت بدون ثبت اقارب اصولی وجود ندارد{" "}
                <Link className="underline" href="/examples/forms">
                  بیشتر بدانید{" "}
                </Link>
                .
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="relativeIdType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>نوع تذکره اقارب</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                dir="rtl"
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="لطفا یکی از گزینه های زیر را انتخاب کنید" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="ELECTRONIC">الکترونیکی</SelectItem>
                  <SelectItem value="PAPER">کاغذی</SelectItem>
                  <SelectItem value="BOOKLET">دفترچه ای</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                لطفا در صورت داشتن دفترچه کاغذی یا الکترونیکی شماره صکوک آن را
                وارد نمایید.
                <Link className="underline" href="/examples/forms">
                  بیشتر بدانید{" "}
                </Link>
                .
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="relativeIdNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>شماره تذکره</FormLabel>
              <FormControl>
                <Input
                  placeholder="لطفا شماره تذکره اقارب خود را وارد نمایید"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="relativePhoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>شماره تلفن</FormLabel>
              <FormControl>
                <Input
                  placeholder="لطفا شماره تلفن اقارب خود را وارد نمایید."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </motion.div>
  );
};

// Form components for MARRIAGE_CERTIFICATE appointment type
const MarriageCertificateResidentBookForm = () => {
  const form = useFormContext();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-4"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>نام</FormLabel>
              <FormControl>
                <Input placeholder="نام خود را وارد کنید" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>نام خانوادگی</FormLabel>
              <FormControl>
                <Input placeholder="نام خانوادگی خود را وارد کنید" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="fatherName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>نام پدر</FormLabel>
              <FormControl>
                <Input placeholder="نام پدر خود را وارد کنید" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bookNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>شماره دفترچه</FormLabel>
              <FormControl>
                <Input placeholder="شماره دفترچه خود را وارد کنید" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="phoneNumber"
        render={({ field }) => (
          <FormItem>
            <FormLabel>شماره تلفن</FormLabel>
            <FormControl>
              <Input placeholder="شماره تلفن خود را وارد کنید" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </motion.div>
  );
};

const MarriageCertificatePassportForm = () => {
  const form = useFormContext();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-4"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>نام</FormLabel>
              <FormControl>
                <Input placeholder="نام خود را وارد کنید" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>نام خانوادگی</FormLabel>
              <FormControl>
                <Input placeholder="نام خانوادگی خود را وارد کنید" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="fatherName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>نام پدر</FormLabel>
              <FormControl>
                <Input placeholder="نام پدر خود را وارد کنید" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="passportNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>شماره پاسپورت</FormLabel>
              <FormControl>
                <Input
                  placeholder="شماره پاسپورت خود را وارد کنید"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="phoneNumber"
        render={({ field }) => (
          <FormItem>
            <FormLabel>شماره تلفن</FormLabel>
            <FormControl>
              <Input placeholder="شماره تلفن خود را وارد کنید" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </motion.div>
  );
};

const MarriageCertificateAmayeshForm = () => {
  const form = useFormContext();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-4"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>نام</FormLabel>
              <FormControl>
                <Input placeholder="نام خود را وارد کنید" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>نام خانوادگی</FormLabel>
              <FormControl>
                <Input placeholder="نام خانوادگی خود را وارد کنید" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="fatherName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>نام پدر</FormLabel>
              <FormControl>
                <Input placeholder="نام پدر خود را وارد کنید" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="cardNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>شماره کارت آمایش</FormLabel>
              <FormControl>
                <Input
                  placeholder="شماره کارت آمایش خود را وارد کنید"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="phoneNumber"
        render={({ field }) => (
          <FormItem>
            <FormLabel>شماره تلفن</FormLabel>
            <FormControl>
              <Input placeholder="شماره تلفن خود را وارد کنید" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </motion.div>
  );
};

const MarriageCertificateFamilyPassportForm = () => {
  const form = useFormContext();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-4"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>نام</FormLabel>
              <FormControl>
                <Input placeholder="نام خود را وارد کنید" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>نام خانوادگی</FormLabel>
              <FormControl>
                <Input placeholder="نام خانوادگی خود را وارد کنید" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="fatherName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>نام پدر</FormLabel>
              <FormControl>
                <Input placeholder="نام پدر خود را وارد کنید" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="passportNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>شماره پاسپورت</FormLabel>
              <FormControl>
                <Input
                  placeholder="شماره پاسپورت خود را وارد کنید"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="familyMembers"
          render={({ field }) => (
            <FormItem>
              <FormLabel>تعداد اعضای خانواده</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="تعداد اعضای خانواده را وارد کنید"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>شماره تلفن</FormLabel>
              <FormControl>
                <Input placeholder="شماره تلفن خود را وارد کنید" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </motion.div>
  );
};

// Main component that conditionally renders the appropriate form
const DocumentForms = () => {
  const form = useFormContext();
  const documentType = form.watch("residentType");
  const appointmentType = form.watch("appointmentType");
  console.log(appointmentType);
  console.log(documentType);

  return (
    <div className="mt-6">
      {/* ASSERTION_OF_IDENTITY forms */}
      {appointmentType === "ASSERTION_OF_IDENTITY" &&
        documentType === "RESIDENT_BOOK" && (
          <AssertionOfIdentityResidentBookForm />
        )}
      {appointmentType === "ASSERTION_OF_IDENTITY" &&
        documentType === "PASSPORT" && <AssertionOfIdentityPassportForm />}
      {appointmentType === "ASSERTION_OF_IDENTITY" &&
        documentType === "AMAYESH_CARD" && <AssertionOfIdentityAmayeshForm />}
      {appointmentType === "ASSERTION_OF_IDENTITY" &&
        documentType === "FAMILIY_PASSPORT" && (
          <AssertionOfIdentityFamilyPassportForm />
        )}

      {/* MARRIAGE_CERTIFICATE forms */}
      {appointmentType === "MARRIAGE_CERTIFICATE" &&
        documentType === "RESIDENT_BOOK" && (
          <MarriageCertificateResidentBookForm />
        )}
      {appointmentType === "MARRIAGE_CERTIFICATE" &&
        documentType === "PASSPORT" && <MarriageCertificatePassportForm />}
      {appointmentType === "MARRIAGE_CERTIFICATE" &&
        documentType === "AMAYESH_CARD" && <MarriageCertificateAmayeshForm />}
      {appointmentType === "MARRIAGE_CERTIFICATE" &&
        documentType === "FAMILY_PASSPORT" && (
          <MarriageCertificateFamilyPassportForm />
        )}

      {/* HAJ_ZAIARAT forms - using default forms for now */}
      {appointmentType === "HAJ_ZAIARAT" &&
        documentType === "RESIDENT_BOOK" && <EXIT_ENTRY_DOCUMENT_FORM />}
      {appointmentType === "HAJ_ZAIARAT" && documentType === "PASSPORT" && (
        <PassportForm />
      )}
      {appointmentType === "HAJ_ZAIARAT" && documentType === "AMAYESH_CARD" && (
        <AmayeshCardForm />
      )}
      {appointmentType === "HAJ_ZAIARAT" &&
        documentType === "FAMILY_PASSPORT" && <FamilyPassportForm />}

      {/* EXIT_ENTRY_DOCUMENT forms - using default forms for now */}
      {appointmentType === "EXIT_ENTRY_DOCUMENT" &&
        documentType === "RESIDENT_BOOK" && <EXIT_ENTRY_DOCUMENT_FORM />}
      {appointmentType === "EXIT_ENTRY_DOCUMENT" &&
        documentType === "PASSPORT" && <EXIT_ENTRY_DOCUMENT_FORM />}
      {appointmentType === "EXIT_ENTRY_DOCUMENT" &&
        documentType === "AMAYESH_CARD" && <EXIT_ENTRY_DOCUMENT_FORM />}
      {appointmentType === "EXIT_ENTRY_DOCUMENT" &&
        documentType === "FAMILIY_PASSPORT" && <EXIT_ENTRY_DOCUMENT_FORM />}
    </div>
  );
};

export default DocumentForms;
