export interface Contact {
  id?: number;
  name: string;
  number: string;
  img_src?: string;
  email?: string;
  notes?: string;
  organization?: string;
  secondaryPhoneNumbers?: Array<string>;
  labels?: Array<string>;
}
