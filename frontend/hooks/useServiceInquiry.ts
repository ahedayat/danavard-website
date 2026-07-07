'use client';

import { useMutation } from '@tanstack/react-query';
import APIClient from '@/services/api-client';
import type { ServiceInquiryPayload } from '@/types';

const inquiryClient = new APIClient<ServiceInquiryPayload>('/service-inquiries');

export function useServiceInquiry() {
  return useMutation({
    mutationFn: (payload: ServiceInquiryPayload) => inquiryClient.post(payload),
    onError: (error) => {
      console.error('Service inquiry failed:', error);
    },
  });
}
