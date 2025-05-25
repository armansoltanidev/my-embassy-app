"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PaperTazkreFormProps {
  className?: string;
}

export function PaperTazkreForm({ className }: PaperTazkreFormProps) {
  return (
    <div className={className}>
      {/* Personal Information */}
      <div className="flex items-center justify-between gap-4">
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
      
      <div className="flex items-center justify-between gap-4">
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
          <Label htmlFor="documentNumber">شماره صکوک تذکره</Label>
          <Input
            id="documentNumber"
            name="documentNumber"
            required
            placeholder="شماره صکوک تذکره خود را وارد کنید"
          />
        </div>
      </div>
      
      {/* Document Details */}
      <div className="flex items-center justify-between gap-4">
        <div className="space-y-2 flex-1">
          <Label htmlFor="volumeNumber">شماره جلد</Label>
          <Input
            id="volumeNumber"
            name="volumeNumber"
            required
            placeholder="شماره جلد تذکره خود را وارد کنید"
          />
        </div>
        <div className="space-y-2 flex-1">
          <Label htmlFor="pageNumber">شماره صفحه</Label>
          <Input
            id="pageNumber"
            name="pageNumber"
            required
            placeholder="شماره صفحه تذکره خود را وارد کنید"
          />
        </div>
        <div className="space-y-2 flex-1">
          <Label htmlFor="registrationNumber">شماره ثبت</Label>
          <Input
            id="registrationNumber"
            name="registrationNumber"
            required
            placeholder="شماره ثبت تذکره خود را وارد کنید"
          />
        </div>
      </div>
      
      {/* Original Location Information */}
      <div className="flex items-center justify-between gap-4">
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
      <div className="flex items-center justify-between gap-4">
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
      <div className="flex items-center justify-between gap-4">
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