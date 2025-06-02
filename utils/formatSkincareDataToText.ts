import { SkincareFormData } from '@/types/global';

export const formatSkincareDataToText = (data: SkincareFormData): string => {
  const sections: string[] = [];

  // Helper function to format section
  const formatSection = (title: string, content: string): string => {
    return `${title}\n${'-'.repeat(title.length)}\n${content}\n`;
  };

  // Basic Skin Profile
  const basicProfile = [
    `Appointment Type: ${data.appointmentType}`,
    `Resident Type: ${data.residentType}`,
  ].filter(Boolean).join('\n');
  
  sections.push(formatSection('BASIC SKIN PROFILE', basicProfile));

  // Document Information (if applicable)
  if (["RESIDENT_BOOK", "PASSPORT", "AMAYESH_CARD", "FAMILIY_PASSPORT"].includes(data.residentType as string)) {
    const personalInfo = [
      data.firstName ? `First Name: ${data.firstName}` : '',
      data.lastName ? `Last Name: ${data.lastName}` : '',
      data.fatherName ? `Father's Name: ${data.fatherName}` : '',
      data.phoneNumber ? `Phone Number: ${data.phoneNumber}` : '',
      data.relativeIdNumber ? `Phone Number: ${data.relativeIdNumber}` : '',
      data.residentType === "RESIDENT_BOOK" && data.bookNumber ? `Book Number: ${data.bookNumber}` : '',
      data.residentType === "PASSPORT" && data.passportNumber ? `Passport Number: ${data.passportNumber}` : '',
      data.residentType === "AMAYESH_CARD" && data.cardNumber ? `Card Number: ${data.cardNumber}` : '',
      data.residentType === "FAMILIY_PASSPORT" && data.passportNumber ? `Passport Number: ${data.passportNumber}` : '',
      data.residentType === "FAMILIY_PASSPORT" && data.familyMembers ? `Family Members: ${data.familyMembers}` : '',
    ].filter(Boolean).join('\n');
    
    if (personalInfo) {
      sections.push(formatSection('PERSONAL INFORMATION', personalInfo));
    }
  }

  // Add timestamp
  const timestamp = `Generated on: ${new Date().toLocaleString()}`;
  sections.push(`\n${timestamp}`);

  return sections.join('\n');
};

// Example usage:
/*
const textSummary = formatSkincareDataToText(skincareData);
console.log(textSummary);

Output example:

BASIC SKIN PROFILE
-----------------
Skin Type: COMBINATION
Age Group: 30s
Skin Goals: ANTI_AGING
Makeup Usage: Daily
Makeup Types: Foundation, Concealer

ENVIRONMENTAL FACTORS
--------------------
Daily Sun Exposure: Moderate
Climate Type: Humid

...etc
*/