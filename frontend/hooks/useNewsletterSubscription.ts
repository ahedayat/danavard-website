'use client';

import { useMutation } from '@tanstack/react-query';
import APIClient from '@/services/api-client';
import type { NewsletterSubscriptionPayload } from '@/types';

const newsletterClient = new APIClient<NewsletterSubscriptionPayload>(
  '/newsletter-subscriptions',
);

export function useNewsletterSubscription() {
  return useMutation({
    mutationFn: (payload: NewsletterSubscriptionPayload) =>
      newsletterClient.post(payload),
    onError: (error) => {
      console.error('Newsletter subscription failed:', error);
    },
  });
}
