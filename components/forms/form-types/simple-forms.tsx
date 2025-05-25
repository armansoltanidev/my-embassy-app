"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface SimpleFormProps {
  className?: string;
}

// Basic form with name and email
export function BasicForm({ className }: SimpleFormProps) {
  return (
    <div className={className}>
      <div className="space-y-2">
        <Label htmlFor="name">نام</Label>
        <Input
          id="name"
          name="name"
          required
          placeholder="نام خود را وارد کنید"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">ایمیل</Label>
        <Input
          id="email"
          name="email"
          type="email"
          required
          placeholder="ایمیل خود را وارد کنید"
        />
      </div>
    </div>
  );
}

// Form for Amayesh with name and mother name
export function AmayeshForm() {
  return (
    <>
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
          <Label htmlFor="eTazkrehNumber">شماره یکتا کارت آمایش</Label>
          <Input
            id="eTazkrehNumber"
            name="eTazkrehNumber"
            required
            placeholder="شماره یکتا کارت آمایش خود را وارد کنید"
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
        <h3 className="text-lg font-medium mb-4">اطلاعات تحصیلی متقاضی</h3>
      </div>
      <div className="flex items-center justify-between gap-4">
        <div className="space-y-2 flex-1">
          <Label htmlFor="emergencyContact">نام دانشگاه محل تحصیل</Label>
          <Input
            id="emergencyContact"
            name="emergencyContact"
            required
            placeholder="نام دانشگاه محل تحصیل را وارد کنید"
          />
        </div>
        <div className="space-y-2 flex-1">
          <Label htmlFor="phoneNumber">استان محل تحصیل</Label>
          <Input
            id="phoneNumber"
            name="phoneNumber"
            required
            placeholder="استان محل تحصیل خود را وارد کنید"
          />
        </div>
      </div>
      <div className="flex items-center justify-between gap-4">
        <div className="space-y-2 flex-1">
          <Label htmlFor="phoneNumber">رشته تحصیلی </Label>
          <Input
            id="phoneNumber"
            name="phoneNumber"
            required
            placeholder="رشته تحصیلی خود را وارد کنید"
          />
        </div>
        <div className="space-y-2 flex-1">
          <Label htmlFor="emergencyContact">شماره دانشجویی</Label>
          <Input
            id="emergencyContact"
            name="emergencyContact"
            required
            placeholder="شماره دانشجویی خود را وارد وارد کنید"
          />
        </div>
      </div>
      <div className="border-t pt-4 border-dotted">
        <h3 className="text-lg font-medium mb-4">اطلاعات اقارب متقاضی</h3>
      </div>
      <div className="flex items-center justify-between gap-4">
        <div className="space-y-2 flex-1">
          <Label htmlFor="emergencyContact">نام و نام خانوادگی</Label>
          <Input
            id="emergencyContact"
            name="emergencyContact"
            required
            placeholder="نام و نام خانوادگی اقارب خود  را وارد کنید"
          />
        </div>
        <div className="space-y-2 flex-1">
          <Label htmlFor="phoneNumber">نسبت شما با قریب را انتخاب کنید</Label>
          <Input
            id="phoneNumber"
            name="phoneNumber"
            required
            placeholder="نسبت خود را وارد کنید"
          />
        </div>
      </div>
      <div className="flex items-center justify-between gap-4">
        <div className="space-y-2 flex-1">
          <Label htmlFor="phoneNumber">شماره تذکره اقارب شما</Label>
          <Input
            id="phoneNumber"
            name="phoneNumber"
            required
            placeholder="شماره تذکره اقارب را وارد کنید"
          />
        </div>
        <div className="space-y-2 flex-1">
          <Label htmlFor="emergencyContact">شماره تماس قریب شما</Label>
          <Input
            id="emergencyContact"
            name="emergencyContact"
            required
            placeholder="شماره تماس قریب خود را وارد کنید"
          />
        </div>
      </div>
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
    </>
  );
}

// Form for Passport with name and grandfather name
export function PassportForm({ className }: SimpleFormProps) {
  return (
    <div className={className}>
      <div className="space-y-2">
        <Label htmlFor="name">نام</Label>
        <Input
          id="name"
          name="name"
          required
          placeholder="نام خود را وارد کنید"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="grandfatherName">نام پدر بزرگ</Label>
        <Input
          id="grandfatherName"
          name="grandfatherName"
          required
          placeholder="نام پدر بزرگ خود را وارد کنید"
        />
      </div>
    </div>
  );
}

// Form for Family Passport
export function FamilyPassportForm({ className }: SimpleFormProps) {
  return (
    <div className={className}>
      <div className="space-y-2">
        <Label htmlFor="name">نام</Label>
        <Input
          id="name"
          name="name"
          required
          placeholder="نام خود را وارد کنید"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="familyPassportNumber">شماره پاسپورت خانواری</Label>
        <Input
          id="familyPassportNumber"
          name="familyPassportNumber"
          required
          placeholder="شماره پاسپورت خانواری خود را وارد کنید"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="familyMemberCount">تعداد اعضای خانواده</Label>
        <Input
          id="familyMemberCount"
          name="familyMemberCount"
          type="number"
          required
          placeholder="تعداد اعضای خانواده را وارد کنید"
        />
      </div>
    </div>
  );
}
