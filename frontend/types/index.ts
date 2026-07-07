export type { Language, Theme } from '@/stores/ui-store';
export type { ContactFormValues } from '@/schemas/contact.schema';

export interface ContactRequestPayload {
  name: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
}

export interface NewsletterSubscriptionPayload {
  email: string;
}

export interface ServiceInquiryPayload {
  serviceId: string;
  name: string;
  phone: string;
  message: string;
}
