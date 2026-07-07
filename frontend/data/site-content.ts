export const content = {
  fa: {
    nav: {
      home: 'خانه',
      services: 'حوزه فعالیت',
      projects: 'پروژه‌ها',
      about: 'درباره ما',
      contact: 'تماس با ما',
      cta: 'شروع همکاری',
    },
    hero: {
      title: 'داناورد؛ آورنده دانایی برای ساخت راهکارهای هوشمند',
      subtitle:
        'ما در داناورد با ترکیب هوش مصنوعی، مهندسی نرم‌افزار، اتوماسیون و طراحی محصول، راهکارهایی می‌سازیم که مسائل واقعی کسب‌وکارها را هوشمندانه و اصولی حل می‌کنند.',
      supporting:
        'داناورد از ترکیب "دانا + آورد" ساخته شده است؛ یعنی آورنده دانایی. ما به دنبال آن هستیم که با ارائه روش‌های هوشمند، دانایی گسترده‌ای را به محصولات، سازمان‌ها و فرآیندهای مختلف بیاوریم.',
      ctaPrimary: 'مشاوره و شروع همکاری',
      ctaSecondary: 'مشاهده پروژه‌ها',
      floatingCards: [
        'راهکارهای هوش مصنوعی',
        'پلتفرم‌های وب',
        'اتوماسیون',
        'هوش مصنوعی در پزشکی',
        'پردازش صوت و گفتار',
        'مهندسی نرم‌افزار',
      ],
    },
    services: {
      title: 'حوزه‌های فعالیت داناورد',
      items: [
        {
          id: 'software',
          title: 'تولید و طراحی نرم‌افزار',
          desc: 'ما برای مسائل مختلف، نرم‌افزارهای اختصاصی، مقیاس‌پذیر و باکیفیت طراحی و تولید می‌کنیم.',
          icon: 'Code2',
        },
        {
          id: 'web',
          title: 'توسعه وب‌سایت و پلتفرم‌های وب',
          desc: 'ما با استفاده از تکنولوژی‌های مدرن، وب‌سایت‌ها و پلتفرم‌های اختصاصی، سریع، امن و حرفه‌ای توسعه می‌دهیم.',
          icon: 'Globe',
        },
        {
          id: 'ai',
          title: 'ارائه راهکارهای هوش مصنوعی',
          desc: 'ما در حوزه‌های متن، تصویر، صوت و داده، راهکارهای مبتنی بر هوش مصنوعی ارائه می‌دهیم.',
          icon: 'BrainCircuit',
        },
        {
          id: 'automation',
          title: 'اتوماسیون فرآیندها',
          desc: 'ما فرآیندهای تکراری و زمان‌بر را با استفاده از نرم‌افزار و هوش مصنوعی هوشمند، سریع و قابل کنترل می‌کنیم.',
          icon: 'Workflow',
        },
        {
          id: 'medical',
          title: 'هوش مصنوعی در پزشکی',
          desc: 'ما راهکارهایی برای استفاده از هوش مصنوعی در حوزه سلامت، کلینیک، پرونده درمانی و تصمیم‌یارهای پزشکی ارائه می‌کنیم.',
          icon: 'Stethoscope',
        },
      ],
    },
    projects: {
      title: 'پروژه‌های انجام‌شده',
      viewCaseStudy: 'مشاهده جزئیات',
      items: [
        {
          id: 'tts',
          title: 'سیستم تبدیل متن فارسی به صوت — TTS',
          desc: 'در این پروژه، یک سیستم تبدیل متن فارسی به صوت توسعه داده شده است که می‌تواند متن فارسی را به گفتار طبیعی تبدیل کند. این سیستم می‌تواند در اتوماسیون، تولید محتوا، دستیارهای هوشمند و سیستم‌های صوتی فارسی‌زبان به کار رود.',
          tags: ['AI', 'Speech', 'Persian TTS', 'Automation'],
          imageType: 'waveform',
        },
        {
          id: 'voice-cloning',
          title: 'سیستم تبدیل صدا و Voice Cloning',
          desc: 'این سیستم قادر است یک صدای مرجع را دریافت کرده و گفتار را به صدای مقصد تبدیل کند. این پروژه در حوزه Voice Conversion و Voice Cloning قرار می‌گیرد و می‌تواند در محصولات صوتی، تولید محتوا و دستیارهای هوشمند استفاده شود.',
          tags: ['AI', 'Voice Cloning', 'Voice Conversion', 'Audio AI'],
          imageType: 'voice-profiles',
        },
        {
          id: 'clinic',
          title: 'سیستم مدیریت کلینیک',
          desc: 'یک سامانه جامع مدیریت کلینیک شامل سه اپلیکیشن برای بیمار، منشی و پزشک. این سیستم امکان مدیریت نوبت‌دهی، صف پذیرش، ثبت نسخه، یادداشت پزشک، ارجاع بیمار، یادآور دارو، ذخیره جواب آزمایش، پرونده درمانی و ارسال اطلاعیه توسط پزشک را فراهم می‌کند.',
          tags: [
            'Medical Software',
            'Android App',
            'Clinic Management',
            'HealthTech',
          ],
          imageType: 'medical-dashboard',
        },
        {
          id: 'prestia',
          title: 'فروشگاه اختصاصی Prestia.ir',
          desc: 'Prestia یک فروشگاه کیف است که طراحی، توسعه، استقرار و DevOps آن توسط تیم داناورد انجام شده است. این پروژه به صورت کاملاً اختصاصی در backend و frontend پیاده‌سازی شده و شامل یک پنل ادمین اختصاصی و امن برای مدیریت فروشگاه است.',
          tags: [
            'E-commerce',
            'Custom Backend',
            'Custom Frontend',
            'Admin Panel',
            'DevOps',
          ],
          imageType: 'ecommerce',
        },
      ],
    },
    about: {
      title: 'درباره داناورد',
      p1: 'تیم داناورد از جمعی از نخبگان دانشگاه‌های برتر در حوزه هوش مصنوعی و مهندسی نرم‌افزار تشکیل شده است. ما به دنبال ارائه راهکارهای نوین مبتنی بر هوش مصنوعی هستیم تا با ساخت محصولات هوشمند، باکیفیت و کاربردی، به چرخه رشد کشور کمک کنیم.',
      p2: 'در داناورد، کیفیت یک اصل بنیادین است. ما صرفاً به دنبال حل سطحی مسئله نیستیم؛ بلکه هر مسئله را دقیق تحلیل می‌کنیم، معماری مناسب برای آن طراحی می‌کنیم و راهکاری اصولی، امن، قابل توسعه و پایدار ارائه می‌دهیم.',
      p3: 'چشم‌انداز ما ساخت محصولاتی است که دانش، هوشمندی و بهره‌وری را وارد کسب‌وکارها و سازمان‌ها کند.',
      stats: [
        'تیم متخصص هوش مصنوعی',
        'مهندسی نرم‌افزار پیشرفته',
        'اتوماسیون هوشمند',
        'کیفیت تضمین‌شده محصول',
      ],
    },
    contact: {
      title: 'تماس با ما',
      phone: '۰۹۳۸۴۱۳۵۸۸۵',
      email: 'danavard.com@gmail.com',
      address:
        'تهران، میدان انقلاب، خیابان کارگر جنوبی، کوچه شعله‌ور، پلاک ۹، واحد ۱۰',
      postal: '۱۲۳۴۵۶۷۸۹۰',
      form: {
        name: 'نام و نام خانوادگی',
        phone: 'شماره تماس',
        email: 'ایمیل',
        subject: 'موضوع',
        message: 'توضیحات پروژه',
        submit: 'ارسال درخواست',
      },
    },
    footer: {
      slogan: 'داناورد؛ آورنده دانایی برای ساخت آینده‌ای هوشمندتر',
      copyright: 'تمام حقوق برای روشنای داناورد آریانا محفوظ است.',
    },
  },
  en: {
    nav: {
      home: 'Home',
      services: 'Services',
      projects: 'Projects',
      about: 'About',
      contact: 'Contact',
      cta: 'Start a Project',
    },
    hero: {
      title: 'Danavard — Bringing Intelligence to Real-World Solutions',
      subtitle:
        'We combine artificial intelligence, software engineering, automation, and product design to build intelligent, reliable, and scalable solutions for real business problems.',
      supporting:
        'Danavard means "bringer of knowledge". We aim to bring extensive intelligence to products, organizations, and processes through smart methodologies.',
      ctaPrimary: 'Start a Project',
      ctaSecondary: 'View Projects',
      floatingCards: [
        'AI Solutions',
        'Web Platforms',
        'Automation',
        'Medical AI',
        'Voice & Speech AI',
        'Software Engineering',
      ],
    },
    services: {
      title: 'Our Services',
      items: [
        {
          id: 'software',
          title: 'Software Design & Development',
          desc: 'We design and build custom, scalable, and high-quality software for various challenges.',
          icon: 'Code2',
        },
        {
          id: 'web',
          title: 'Website & Web Platform Development',
          desc: 'We develop fast, secure, and professional custom websites and web platforms using modern technologies.',
          icon: 'Globe',
        },
        {
          id: 'ai',
          title: 'AI Solutions',
          desc: 'We provide AI-based solutions in text, image, audio, and data domains.',
          icon: 'BrainCircuit',
        },
        {
          id: 'automation',
          title: 'Process Automation',
          desc: 'We make repetitive and time-consuming processes smart, fast, and controllable using software and AI.',
          icon: 'Workflow',
        },
        {
          id: 'medical',
          title: 'AI in Medicine',
          desc: 'We provide solutions for using AI in healthcare, clinics, medical records, and clinical decision support.',
          icon: 'Stethoscope',
        },
      ],
    },
    projects: {
      title: 'Featured Projects',
      viewCaseStudy: 'View Case Study',
      items: [
        {
          id: 'tts',
          title: 'Persian Text-to-Speech System (TTS)',
          desc: 'A Persian text-to-speech system that converts Persian text into natural speech. Applicable in automation, content creation, smart assistants, and Persian voice systems.',
          tags: ['AI', 'Speech', 'Persian TTS', 'Automation'],
          imageType: 'waveform',
        },
        {
          id: 'voice-cloning',
          title: 'Voice Conversion & Cloning System',
          desc: 'This system receives a reference voice and converts speech to the target voice. Used in audio products, content creation, and smart assistants.',
          tags: ['AI', 'Voice Cloning', 'Voice Conversion', 'Audio AI'],
          imageType: 'voice-profiles',
        },
        {
          id: 'clinic',
          title: 'Clinic Management System',
          desc: 'A comprehensive clinic management system including apps for patients, secretaries, and doctors. Features include appointment scheduling, queue management, prescriptions, and medical records.',
          tags: [
            'Medical Software',
            'Android App',
            'Clinic Management',
            'HealthTech',
          ],
          imageType: 'medical-dashboard',
        },
        {
          id: 'prestia',
          title: 'Prestia.ir Custom E-commerce',
          desc: 'Prestia is a bag store fully designed, developed, and deployed by Danavard. Features a completely custom backend and frontend with a secure admin panel.',
          tags: [
            'E-commerce',
            'Custom Backend',
            'Custom Frontend',
            'Admin Panel',
            'DevOps',
          ],
          imageType: 'ecommerce',
        },
      ],
    },
    about: {
      title: 'About Danavard',
      p1: "The Danavard team consists of elites from top universities in AI and software engineering. We seek to provide modern AI-based solutions to help the country's growth cycle by building smart, high-quality, and practical products.",
      p2: "At Danavard, quality is a fundamental principle. We don't just look for superficial solutions; we analyze every problem deeply, design the right architecture, and provide a principled, secure, scalable, and stable solution.",
      p3: 'Our vision is to build products that bring knowledge, intelligence, and productivity to businesses and organizations.',
      stats: [
        'AI-first Team',
        'Software Engineering',
        'Automation',
        'Product Quality',
      ],
    },
    contact: {
      title: 'Contact Us',
      phone: '+98 938 413 5885',
      email: 'danavard.com@gmail.com',
      address:
        'Unit 10, No. 9, Sholehvar Alley, South Kargar St., Enghelab Sq., Tehran',
      postal: '1234567890',
      form: {
        name: 'Full Name',
        phone: 'Phone Number',
        email: 'Email Address',
        subject: 'Subject',
        message: 'Project Details',
        submit: 'Send Request',
      },
    },
    footer: {
      slogan: 'Danavard; Bringing intelligence to build a smarter future.',
      copyright: 'All rights reserved for Roshana Danavard Ariana.',
    },
  },
};
