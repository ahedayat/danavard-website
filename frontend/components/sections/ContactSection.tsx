'use client';

import { useState } from 'react';
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import useUIStore from '@/stores/ui-store';
import { content } from '@/data/site-content';
import SectionReveal from '@/components/ui/SectionReveal';
import {
  contactFormSchema,
  type ContactFormValues,
} from '@/schemas/contact.schema';

const initialForm: ContactFormValues = {
  name: '',
  phone: '',
  email: '',
  subject: '',
  message: '',
};

export default function ContactSection() {
  const lang = useUIStore((s) => s.lang);
  const dir = useUIStore((s) => (s.lang === 'fa' ? 'rtl' : 'ltr'));
  const t = content[lang];
  const [form, setForm] = useState<ContactFormValues>(initialForm);
  const [errors, setErrors] = useState<
    Partial<Record<keyof ContactFormValues, string>>
  >({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (field: keyof ContactFormValues, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
    setSubmitted(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = contactFormSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ContactFormValues, string>> = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof ContactFormValues;
        if (!fieldErrors[field]) {
          fieldErrors[field] = issue.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setSubmitted(true);
  };

  return (
    <section
      id="contact"
      className="py-24 relative z-10 bg-slate-50/50 dark:bg-navy-900/20"
    >
      <div className="container mx-auto px-6">
        <SectionReveal>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              {t.contact.title}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-electric-500 to-cyan-400 mx-auto rounded-full" />
          </div>
        </SectionReveal>

        {/* <div className="grid lg:grid-cols-5 gap-12 max-w-6xl mx-auto"> */}
        <div className="grid lg:grid-cols-5 gap-12 max-w-6xl mx-auto">
          <div className="lg:col-span-2 space-y-6">
            <SectionReveal delay={0.1}>
              <div className="glass p-8 rounded-3xl border border-slate-200 dark:border-white/10 flex flex-col gap-8 h-full">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-electric-50 dark:bg-white/5 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-electric-600 dark:text-cyan-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">
                      {dir === 'rtl' ? 'شماره تماس' : 'Phone'}
                    </h4>
                    <p
                      className="text-lg font-bold text-slate-900 dark:text-white"
                      dir="ltr"
                    >
                      {t.contact.phone}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-electric-50 dark:bg-white/5 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-electric-600 dark:text-cyan-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">
                      {dir === 'rtl' ? 'ایمیل' : 'Email'}
                    </h4>
                    <p className="text-lg font-bold text-slate-900 dark:text-white">
                      {t.contact.email}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-electric-50 dark:bg-white/5 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-electric-600 dark:text-cyan-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">
                      {dir === 'rtl' ? 'آدرس' : 'Address'}
                    </h4>
                    <p className="text-base font-medium text-slate-900 dark:text-white leading-relaxed mb-2">
                      {t.contact.address}
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {dir === 'rtl' ? 'کد پستی:' : 'Postal Code:'}{' '}
                      {t.contact.postal}
                    </p>
                  </div>
                </div>
              </div>
            </SectionReveal>
          </div>
{/* 
          <div className="lg:col-span-3">
            <SectionReveal delay={0.2}>
              <form
                className="glass p-8 md:p-10 rounded-3xl border border-slate-200 dark:border-white/10 flex flex-col gap-6"
                onSubmit={handleSubmit}
                noValidate
              >
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      {t.contact.form.name}
                    </label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 focus:border-electric-500 focus:ring-2 focus:ring-electric-500/20 outline-none transition-all text-slate-900 dark:text-white"
                    />
                    {errors.name && (
                      <p className="text-sm text-red-500">{errors.name}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      {t.contact.form.phone}
                    </label>
                    <input
                      type="tel"
                      dir="ltr"
                      value={form.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 focus:border-electric-500 focus:ring-2 focus:ring-electric-500/20 outline-none transition-all text-slate-900 dark:text-white text-left"
                    />
                    {errors.phone && (
                      <p className="text-sm text-red-500">{errors.phone}</p>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      {t.contact.form.email}
                    </label>
                    <input
                      type="email"
                      dir="ltr"
                      value={form.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 focus:border-electric-500 focus:ring-2 focus:ring-electric-500/20 outline-none transition-all text-slate-900 dark:text-white text-left"
                    />
                    {errors.email && (
                      <p className="text-sm text-red-500">{errors.email}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      {t.contact.form.subject}
                    </label>
                    <input
                      type="text"
                      value={form.subject}
                      onChange={(e) => handleChange('subject', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 focus:border-electric-500 focus:ring-2 focus:ring-electric-500/20 outline-none transition-all text-slate-900 dark:text-white"
                    />
                    {errors.subject && (
                      <p className="text-sm text-red-500">{errors.subject}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    {t.contact.form.message}
                  </label>
                  <textarea
                    rows={4}
                    value={form.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 focus:border-electric-500 focus:ring-2 focus:ring-electric-500/20 outline-none transition-all text-slate-900 dark:text-white resize-none"
                  />
                  {errors.message && (
                    <p className="text-sm text-red-500">{errors.message}</p>
                  )}
                </div>

                {submitted && (
                  <p className="text-sm text-electric-600 dark:text-cyan-400">
                    {dir === 'rtl'
                      ? 'فرم با موفقیت اعتبارسنجی شد. ارسال به سرور هنوز فعال نشده است.'
                      : 'Form validated successfully. Backend submission is not connected yet.'}
                  </p>
                )}

                <button
                  type="submit"
                  className="mt-2 inline-flex items-center justify-center w-full md:w-auto md:self-end px-8 py-4 text-base font-bold text-white bg-electric-500 hover:bg-electric-600 rounded-xl shadow-glow transition-all hover:-translate-y-1 group"
                >
                  {t.contact.form.submit}
                  {dir === 'rtl' ? (
                    <Send className="mr-2 w-5 h-5 rotate-180 group-hover:-translate-x-1 transition-transform" />
                  ) : (
                    <Send className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  )}
                </button>
              </form>
            </SectionReveal>
          </div> */}
        </div>
      </div>
    </section>
  );
}
