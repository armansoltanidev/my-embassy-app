export type SkincareFormData = {
  appointmentType?: "ASSERTION_OF_IDENTITY" | "MARRIAGE_CERTIFICATE" | "HAJ_ZAIARAT" | "EXIT_ENTRY_DOCUMENT"
  residentType?:  "RESIDENT_BOOK" | "PASSPORT" | "AMAYESH_CARD" | "FAMILIY_PASSPORT"
  
  // Document form fields - Common
  firstName?: string
  lastName?: string
  fatherName?: string
  phoneNumber?: string
  
  // EXIT_ENTRY_DOCUMENT specific fields
  // Personal information - Persian
  grandFatherName?: string
  
  // Personal information - Latin
  // These field names match what's used in the form component
  firstNameLatin?: string  // Used in form as firstNameLatin
  lastNameLatin?: string   // Used in form as lastNameLatin
  fatherNameLatin?: string // Used in form as fatherNameLatin
  grandFatherNameLatin?: string // Used in form as grandFatherNameLatin
  
  // Document information
  documentNumber?: string  // Used in form as documentNumber
  birthDate?: Date
  gender?: "MALE" | "FEMALE"
  
  // Status information
  maritalStatus?: "SINGLE" | "MARRIED" | "DIVORCED" | "WIDOWED"
  
  // Address information
  mainProvince?: string
  mainDistrict?: string
  mainVillage?: string
  
  // Relative information
  relativeType?: "UNCLE" | "AUNT" | "FATHER"
  relativeIdType?: "ELECTRONIC" | "PAPER" | "BOOKLET"
  relativeIdNumber?: string
  relativePhoneNumber?: string
  relativeIdCardType?: "ELECTRONIC" | "PAPER" | "BOOKLET"
  relativeIdCardNumber?: string
  
  // Educational information
  universityType?: "AZAD_ISLAMIC" | "GOVERNMENT_UNIVERSITY" | "PAYAM_NOOR"
  majorName?: "SOFTWARE_ENGINEERING" | "MECHANIC_ENGINEERING" | "MEDICINE" | "OTHER"
  degree?: "ASSOCIATE" | "BACHELOR" | "MASTERDEGREE" | "PHD"
  universityName?: string
  universityEntryYear?: string
  studentId?: string
  semester?: string
}