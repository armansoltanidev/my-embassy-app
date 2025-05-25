import { ElectronicTazkreForm } from './electronic-tazkre-form';
import { PaperTazkreForm } from './paper-tazkre-form';
import { RelationTazkreForm } from './relation-tazkre-form';
import { AmayeshForm, BasicForm, FamilyPassportForm, PassportForm } from './simple-forms';

// Export all form components for easy importing
export { ElectronicTazkreForm } from './electronic-tazkre-form';
export { PaperTazkreForm } from './paper-tazkre-form';
export { RelationTazkreForm } from './relation-tazkre-form';
export { BasicForm, AmayeshForm, PassportForm, FamilyPassportForm } from './simple-forms';

// Form type definitions
export type FormType = 
  | 'e_tazkre'
  | 'old_tazkre'
  | 'relation_tazkre'
  | 'amayesh'
  | 'passport'
  | 'familiy_passport'
  | 'basic';

// Form component mapping
export const FORM_COMPONENTS = {
  e_tazkre: ElectronicTazkreForm,
  old_tazkre: PaperTazkreForm,
  relation_tazkre: RelationTazkreForm,
  amayesh: AmayeshForm,
  passport: PassportForm,
  familiy_passport: FamilyPassportForm,
  basic: BasicForm,
} as const;