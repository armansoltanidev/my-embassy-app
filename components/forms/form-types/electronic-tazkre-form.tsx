"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ElectronicTazkreFormProps {
  className?: string;
}

export function ElectronicTazkreForm({ className }: ElectronicTazkreFormProps) {
  return (
    <div className={className}>
      {/* Personal Information */}
      <div className="flex items-center justify-between gap-4 flex-col md:flex-row">
        <div className="space-y-2 flex-1">
          <Label htmlFor="name">نام</Label>
          <Input
            id="name"
            name="name"
            required
            placeholder="نام خود را وارد کنید"
          />
        </div>
        <div className="space-y-2 flex-1">
          <Label htmlFor="lastName">نام خانوادگی</Label>
          <Input
            id="lastName"
            name="lastName"
            required
            placeholder="نام خانوادگی خود را وارد کنید"
          />
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 flex-col md:flex-row">
        <div className="space-y-2 flex-1">
          <Label htmlFor="fatherName">نام پدر</Label>
          <Input
            id="fatherName"
            name="fatherName"
            required
            placeholder="نام پدر خود را وارد کنید"
          />
        </div>
        <div className="space-y-2 flex-1">
          <Label htmlFor="eTazkrehNumber">شماره تذکره الکترونیکی</Label>
          <Input
            id="eTazkrehNumber"
            name="eTazkrehNumber"
            required
            placeholder="شماره تذکره الکترونیکی خود را وارد کنید"
          />
        </div>
      </div>

      {/* Original Location Information */}
      <div className="flex items-center justify-between gap-4 flex-col md:flex-row">
        <div className="space-y-2 flex-1">
          <Label htmlFor="originalProvince">ولایت اصلی</Label>
          <Input
            id="originalProvince"
            name="originalProvince"
            required
            placeholder="نام ولایت خود را وارد کنید"
          />
        </div>
        <div className="space-y-2 flex-1">
          <Label htmlFor="originalDistrict">ولسوالی اصلی</Label>
          <Input
            id="originalDistrict"
            name="originalDistrict"
            required
            placeholder="نام ولسوالی خود را وارد کنید"
          />
        </div>
        <div className="space-y-2 flex-1">
          <Label htmlFor="originalVillage">قریه اصلی</Label>
          <Input
            id="originalVillage"
            name="originalVillage"
            required
            placeholder="نام قریه خود را وارد کنید"
          />
        </div>
      </div>

      {/* Current Residence Information */}
      <div className="border-t pt-4 border-dotted">
        <h3 className="text-lg font-medium mb-4">اطلاعات محل سکونت فعلی</h3>
      </div>
      <div className="flex items-center justify-between gap-4 flex-col md:flex-row">
        <div className="space-y-2 flex-1">
          <Label htmlFor="currentProvince">استان سکونت فعلی</Label>
          <Input
            id="currentProvince"
            name="currentProvince"
            required
            placeholder="نام استان خود را وارد کنید"
          />
        </div>
        <div className="space-y-2 flex-1">
          <Label htmlFor="currentCity">شهر محل سکونت فعلی</Label>
          <Input
            id="currentCity"
            name="currentCity"
            required
            placeholder="نام شهر خود را وارد کنید"
          />
        </div>
      </div>

      {/* Contact Information */}
      <div className="border-t pt-4 border-dotted">
        <h3 className="text-lg font-medium mb-4">اطلاعات تماس متقاضی</h3>
      </div>
      <div className="flex items-center justify-between gap-4 flex-col md:flex-row">
        <div className="space-y-2 flex-1">
          <Label htmlFor="phoneNumber">شماره تماس</Label>
          <Input
            id="phoneNumber"
            name="phoneNumber"
            required
            placeholder="شماره تماس خود را وارد کنید"
          />
        </div>
        <div className="space-y-2 flex-1">
          <Label htmlFor="emergencyContact">شماره تماس اضطراری</Label>
          <Input
            id="emergencyContact"
            name="emergencyContact"
            required
            placeholder="شماره تماس اضطراری خود را وارد کنید"
          />
        </div>
      </div>
    </div>
  );
}
