export type Question = {
    id: string;
    type: 'select' | 'text' | 'slider';
    question: string;
    options?: { label: string; points: number }[];
    placeholder?: string;
    min?: number;
    max?: number;
    step?: number;
    unit?: string;
  };
  
  export const questions: Question[] = [
    /* --- PHASE 1: INITIAL PROFILE --- */
    {
      id: 'name',
      type: 'text',
      question: "Identify yourself. What is your name?",
      placeholder: "Enter name or alias..."
    },
    {
      id: 'gender',
      type: 'select',
      question: "Gender identification:",
      options: [
        { label: "Prefer not to disclose", points: 15 },
        { label: "Female", points: 5 },
        { label: "Non-binary / Other", points: 10 },
        { label: "Male", points: 5 }
      ]
    },
    {
      id: 'height',
      type: 'slider',
      question: "Physical stature (No footwear):",
      min: 50,
      max: 84,
      step: 1,
      unit: "in"
    },
  
    /* --- PHASE 2: DIGITAL FOOTPRINT & SOCIAL --- */
    {
      id: 'first_app',
      type: 'select',
      question: "First app opened after waking up:",
      options: [
        { label: "I don't check my phone immediately", points: 0 },
        { label: "Instagram / TikTok / X", points: 45 },
        { label: "Weather / Calendar", points: 0 },
        { label: "Messages / Email", points: 5 }
      ]
    },
    {
      id: 'screen_time',
      type: 'slider',
      question: "Logged average daily screen time:",
      min: 0,
      max: 24,
      step: 1,
      unit: "hrs"
    },
    {
      id: 'read_receipts',
      type: 'select',
      question: "Communication protocol (Read Receipts):",
      options: [
        { label: "Conditional / Ghosting based", points: 20 },
        { label: "Always ON", points: 0 },
        { label: "Always OFF", points: 30 }
      ]
    },
    {
      id: 'follower_ratio',
      type: 'select',
      question: "Social validation metrics (Follower Ratio):",
      options: [
        { label: "I follow significantly fewer than follow me", points: 0 },
        { label: "I do not use social media", points: 25 },
        { label: "I follow significantly more than follow me", points: 35 },
        { label: "Evenly matched", points: 10 }
      ]
    },
    {
      id: 'group_chat_role',
      type: 'select',
      question: "Your role in group chats:",
      options: [
        { label: "Lurker", points: 30 },
        { label: "Muted permanently", points: 50 },
        { label: "Organizer / Instigator", points: 0 },
        { label: "Occasional contributor", points: 10 }
      ]
    },
  
    /* --- PHASE 3: THE EX & ROMANCE (THE TRAPS) --- */
    {
      id: 'ex_situation',
      type: 'select',
      question: "Nature of contact with your most recent ex-partner:",
      options: [
        { label: "I am currently monitoring their digital footprint", points: 50 },
        { label: "Mutual friend groups / Shared spaces", points: 15 },
        { label: "Complete no-contact", points: 0 },
        { label: "Occasional 'checking-in'", points: 20 }
      ]
    },
    {
      id: 'still_in_love',
      type: 'select',
      question: "Psychological attachment to previous partner:",
      options: [
        { label: "Moderate nostalgia", points: 15 },
        { label: "Total indifference", points: 0 },
        { label: "Profound, unaddressed longing", points: 55 }
      ]
    },
    {
      id: 'backup_person',
      type: 'select',
      question: "Do you currently have a romantic 'backup option'?",
      options: [
        { label: "Yes, and they don't know", points: 65 },
        { label: "No, I move with intention", points: 0 },
        { label: "Maybe unintentionally", points: 15 },
        { label: "Yes, but it's mutual", points: 30 }
      ]
    },
  
    /* --- PHASE 4: LIFESTYLE & BIOLOGY --- */
    {
      id: 'job',
      type: 'select',
      question: "Current employment status:",
      options: [
        { label: "Full-time (Corporate/Trade)", points: 5 },
        { label: "Student", points: 15 },
        { label: "Self-employed / Freelance", points: 20 },
        { label: "Unemployed / Between roles", points: 35 }
      ]
    },
    {
      id: 'meal',
      type: 'text',
      question: "Last caloric intake (Be honest):",
      placeholder: "Describe exactly what you ate..."
    },
    {
      id: 'sleep_hygiene',
      type: 'select',
      question: "Typical time of sleep onset:",
      options: [
        { label: "1:00 AM - 3:00 AM", points: 25 },
        { label: "Before 11:00 PM", points: 0 },
        { label: "When the sun rises", points: 45 }
      ]
    },
    {
      id: 'social',
      type: 'select',
      question: "Last intentional outdoor activity (excluding transit):",
      options: [
        { label: "Over 72 hours ago", points: 30 },
        { label: "Within the last week", points: 15 },
        { label: "Within the last 24 hours", points: 0 }
      ]
    },
  
    /* --- PHASE 5: FINANCES & ASSETS --- */
    {
      id: 'finance',
      type: 'select',
      question: "Current financial liquidity:",
      options: [
        { label: "Living paycheck to paycheck", points: 20 },
        { label: "Strategic savings growth", points: 0 },
        { label: "Net negative / Credit reliant", points: 45 }
      ]
    },
    {
      id: 'emergency_fund',
      type: 'select',
      question: "If income stopped tomorrow, how long could you survive?",
      options: [
        { label: "I would be instantly cooked", points: 65 },
        { label: "2–5 months", points: 15 },
        { label: "6+ months", points: 0 },
        { label: "Less than 1 month", points: 40 }
      ]
    },
    {
      id: 'flex_purchase',
      type: 'select',
      question: "Largest recent non-essential purchase:",
      options: [
        { label: "Under $100", points: 0 },
        { label: "Debt-financed lifestyle item", points: 60 },
        { label: "$100–$500", points: 15 },
        { label: "$500–$2,000", points: 35 }
      ]
    },
  
    /* --- PHASE 6: EGO & WORLDVIEW --- */
    {
      id: 'aura_ego',
      type: 'slider',
      question: "Perceived level of social dominance (Aura):",
      min: 0,
      max: 100,
      step: 1,
      unit: "%"
    },
    {
      id: 'emotional_crutch',
      type: 'select',
      question: "Primary emotional coping mechanism:",
      options: [
        { label: "Online attention / Validation", points: 40 },
        { label: "Healthy relationships / Community", points: 0 },
        { label: "Substances / Escapism", points: 60 },
        { label: "Gym / Productivity obsession", points: 15 }
      ]
    },
    {
      id: 'victimhood',
      type: 'select',
      question: "Why are you not where you want to be in life?",
      options: [
        { label: "A mix of factors", points: 15 },
        { label: "The system is stacked against me", points: 40 },
        { label: "My own decisions", points: 0 },
        { label: "Society actively oppresses me", points: 65 }
      ]
    },
    {
      id: 'success_belief',
      type: 'select',
      question: "Why do most people fail?",
      options: [
        { label: " Structural inequality", points: 40 },
        { label: "Lack of discipline", points: 0 },
        { label: "The game is rigged and pointless", points: 65 },
        { label: "Poor guidance or environment", points: 20 }
      ]
    },
    {
      id: 'delusion_check',
      type: 'text',
      question: "What is a 'controversial' truth you believe in?",
      placeholder: "State a fact that others find delusional..."
    },
    {
      id: 'enemies',
      type: 'text',
      question: "How would your biggest hater describe your lifestyle?",
      placeholder: "One sentence..."
    },
    {
      id: 'late_night_thoughts',
      type: 'text',
      question: "What thought keeps you awake at night?",
      placeholder: "Be specific..."
    }
  ];