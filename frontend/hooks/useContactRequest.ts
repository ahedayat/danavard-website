'use client';

import { useMutation } from '@tanstack/react-query';
import APIClient from '@/services/api-client';
import type { ContactRequestPayload } from '@/types';

const contactClient = new APIClient<ContactRequestPayload>('/contact-requests');

export function useContactRequest() {
  return useMutation({
    mutationFn: (payload: ContactRequestPayload) => contactClient.post(payload),
    onError: (error) => {
      console.error('Contact request failed:', error);
    },
  });
}
