// Comprehensive default jobs and courses covering Healthcare (Doctor, Nurse), Tech, Education, Finance, and Remote roles

export function getJobs() {
  return [
    {
      job_id: 'J-101',
      title: 'Senior Frontend React Developer',
      category: 'Software & Tech',
      location: 'Lahore / Remote',
      job_type: 'Full-time',
      company: 'Systems Limited',
      salary_pkr: '150,000 - 220,000',
      required_skills: ['React.js', 'JavaScript', 'Tailwind CSS', 'Next.js'],
      description: 'Lead frontend development for enterprise web applications using React, Tailwind CSS, and Next.js. Flexible working hours for women returning to tech.'
    },
    {
      job_id: 'J-102',
      title: 'Telehealth Medical Officer & Doctor Consultant',
      category: 'Healthcare & Medical',
      location: 'Karachi / Remote',
      job_type: 'Full-time / Part-time',
      company: 'Aga Khan Health Services / Sehat Kahani',
      salary_pkr: '120,000 - 180,000',
      required_skills: ['MBBS', 'Patient Consultation', 'Telemedicine', 'Medical Record Keeping'],
      description: 'Provide online medical consultations, diagnose patient conditions, prescribe treatments via telehealth portals, and advise on healthcare management.'
    },
    {
      job_id: 'J-103',
      title: 'Clinical Research Associate & Medical Writer',
      category: 'Healthcare & Medical',
      location: 'Islamabad / Hybrid',
      job_type: 'Full-time',
      company: 'Shaukat Khanum Memorial Trust',
      salary_pkr: '90,000 - 140,000',
      required_skills: ['Medical Research', 'Healthcare Writing', 'Data Analysis', 'Clinical Trials'],
      description: 'Coordinate clinical research studies, write medical documentation, and analyze patient trial data in compliance with clinical standards.'
    },
    {
      job_id: 'J-104',
      title: 'Digital Marketing & E-Commerce Lead',
      category: 'Marketing',
      location: 'Karachi',
      job_type: 'Full-time',
      company: 'Daraz PK',
      salary_pkr: '90,000 - 130,000',
      required_skills: ['Digital Marketing', 'SEO', 'Social Media Ads', 'Analytics'],
      description: 'Manage seller growth campaigns, performance marketing, and digital outreach across Pakistan.'
    },
    {
      job_id: 'J-105',
      title: 'Remote Content Writer & Copywriter',
      category: 'Content & Copywriting',
      location: 'Remote',
      job_type: 'Part-time',
      company: 'Creative Hive Global',
      salary_pkr: '60,000 - 85,000',
      required_skills: ['English Writing', 'SEO', 'WordPress', 'Copywriting'],
      description: 'Create high-engagement blogs, newsletters, and social media copy with completely flexible remote working hours.'
    },
    {
      job_id: 'J-106',
      title: 'Junior Data Analyst & BI Specialist',
      category: 'Finance & Administration',
      location: 'Islamabad / Hybrid',
      job_type: 'Full-time',
      company: 'Habib Bank Limited (HBL)',
      salary_pkr: '80,000 - 110,000',
      required_skills: ['SQL', 'Power BI', 'MS Excel', 'Data Cleaning'],
      description: 'Transform banking operational datasets into interactive executive dashboards using Power BI and SQL.'
    },
    {
      job_id: 'J-107',
      title: 'UI/UX Product Designer',
      category: 'Design & Creative',
      location: 'Karachi / Remote',
      job_type: 'Full-time',
      company: 'PixelCraft Studios',
      salary_pkr: '100,000 - 160,000',
      required_skills: ['Figma', 'User Research', 'Wireframing', 'Prototyping'],
      description: 'Design intuitive user interfaces for mobile apps and web platforms. Create wireframes and interactive prototypes in Figma.'
    },
    {
      job_id: 'J-108',
      title: 'Primary School English & Science Teacher',
      category: 'Education & Training',
      location: 'Rawalpindi',
      job_type: 'Full-time',
      company: 'Beaconhouse School System',
      salary_pkr: '45,000 - 70,000',
      required_skills: ['Lesson Planning', 'Classroom Management', 'English Fluency', 'Science Pedagogy'],
      description: 'Teach English language and science to primary students. Prepare lesson plans and conduct interactive classroom activities.'
    },
    {
      job_id: 'J-109',
      title: 'Junior Python Backend Developer',
      category: 'Software & Tech',
      location: 'Islamabad / Remote',
      job_type: 'Full-time',
      company: 'CodeCrafters Islamabad',
      salary_pkr: '80,000 - 130,000',
      required_skills: ['Python', 'Django', 'SQL', 'REST APIs'],
      description: 'Develop backend logic and data processing scripts using Python and Django. Work with databases and REST APIs.'
    },
    {
      job_id: 'J-110',
      title: 'Virtual Assistant & Admin Support',
      category: 'Administrative',
      location: 'Remote',
      job_type: 'Part-time',
      company: 'Apex Solutions Lahore',
      salary_pkr: '35,000 - 50,000',
      required_skills: ['Data Entry', 'MS Excel', 'Email Management', 'Communication'],
      description: 'Manage schedules, handle customer email correspondence, organize spreadsheets, and provide remote administrative support.'
    }
  ];
}

export function getCourses() {
  return [
    {
      course_id: 'C-01',
      title: 'DigiSkills Freelancing & WordPress',
      provider: 'DigiSkills Pakistan (MoITT)',
      duration_weeks: 12,
      skills_covered: ['Freelancing', 'WordPress', 'Upwork', 'Fiverr'],
      format: 'Online',
      cost_pkr: 'Free',
      description: 'Master the fundamentals of freelancing on Upwork and Fiverr, create professional profiles, and build custom WordPress websites.'
    },
    {
      course_id: 'C-02',
      title: 'Healthcare Writing & Medical Transcription',
      provider: 'MediLearn PK',
      duration_weeks: 6,
      skills_covered: ['Medical Terminology', 'Healthcare Writing', 'Proofreading'],
      format: 'Online',
      cost_pkr: '10,000',
      description: 'Learn medical terminology, anatomy basics, and accurate transcription of physician dictations and health blogs.'
    },
    {
      course_id: 'C-03',
      title: 'React.js Frontend Masterclass',
      provider: 'PNY Trainings Lahore',
      duration_weeks: 8,
      skills_covered: ['React.js', 'JavaScript', 'Tailwind CSS'],
      format: 'Hybrid / Online',
      cost_pkr: '25,000',
      description: 'Comprehensive hands-on training in modern React.js development, hooks, state management, and Tailwind CSS.'
    },
    {
      course_id: 'C-04',
      title: 'English Language & Business Communication',
      provider: 'Saylani Mass IT Training',
      duration_weeks: 10,
      skills_covered: ['English Writing', 'Professional Communication', 'Speaking'],
      format: 'On-site / Online',
      cost_pkr: 'Free',
      description: 'Improve spoken and written English communication skills for professional workplace environments.'
    }
  ];
}

export function getSampleProfiles() {
  return [
    {
      id: 'profile_1',
      name: 'Ayesha Siddiqui',
      city: 'Lahore',
      education: 'BS Computer Science (Fresh Graduate)',
      experience: 'Internship as Web Developer (3 months)',
      skills: ['HTML/CSS', 'JavaScript', 'React.js', 'Git'],
      career_goal: 'Want to secure a remote or hybrid frontend developer role in Lahore supporting family with flexible hours and competitive pay.',
      preferred_category: 'Software & Tech',
      availability: 'Full-time'
    },
    {
      id: 'profile_2',
      name: 'Dr. Mahnoor Khan',
      city: 'Karachi',
      education: 'MBBS (Medical Graduate)',
      experience: 'House Job at Civil Hospital Karachi (1 year)',
      skills: ['MBBS', 'Patient Consultation', 'Telemedicine', 'Medical Research'],
      career_goal: 'Looking for telehealth doctor consulting and clinical research writing roles with flexible remote hours.',
      preferred_category: 'Healthcare & Medical',
      availability: 'Full-time'
    },
    {
      id: 'profile_3',
      name: 'Zainab Bibi',
      city: 'Islamabad',
      education: 'BA English Literature',
      experience: 'High school English tutor (2 years)',
      skills: ['English Writing', 'Communication', 'Lesson Planning', 'Proofreading'],
      career_goal: 'Seeking a remote content writing, copywriting, or online teaching position with flexible hours and stable income.',
      preferred_category: 'Content & Copywriting',
      availability: 'Remote / Flexible'
    }
  ];
}
