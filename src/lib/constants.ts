export const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Services", href: "#services" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Achievements", href: "#achievements" },
  { label: "Contact", href: "#contact" },
] as const;

export const HERO_ROLES = [
  "AI Engineer",
  "LLM Systems Architect",
  "Agentic AI Developer",
  "Foundation Model Specialist",
] as const;

export const STATS = [
  { value: 2, suffix: "+", label: "Years in AI" },
  { value: 5, suffix: "+", label: "Projects Shipped" },
  { value: 31, suffix: "%", label: "NLP Accuracy ↑" },
  { value: 40, suffix: "%", label: "Pipeline Speed ↑" },
] as const;

export const SKILL_CATEGORIES = [
  {
    icon: "🤖",
    title: "Agentic AI & LLMs",
    skills: [
      { name: "LangChain", proficiency: 5 },
      { name: "LangGraph", proficiency: 5 },
      { name: "CrewAI", proficiency: 4 },
      { name: "HuggingFace Agents", proficiency: 4 },
      { name: "RAG", proficiency: 5 },
      { name: "Vector Stores", proficiency: 5 },
      { name: "Prompt Engineering", proficiency: 5 },
      { name: "Context Management", proficiency: 4 },
      { name: "Tool Use", proficiency: 4 },
      { name: "Claude API", proficiency: 5 },
      { name: "GPT-4o", proficiency: 5 },
      { name: "LLaMA", proficiency: 4 },
      { name: "AWS Bedrock", proficiency: 4 },
    ],
  },
  {
    icon: "🧠",
    title: "ML & Deep Learning",
    skills: [
      { name: "PyTorch", proficiency: 5 },
      { name: "TensorFlow", proficiency: 4 },
      { name: "Keras", proficiency: 4 },
      { name: "Transformers", proficiency: 5 },
      { name: "CNNs", proficiency: 4 },
      { name: "YOLO", proficiency: 4 },
      { name: "Computer Vision", proficiency: 4 },
      { name: "NLP", proficiency: 5 },
      { name: "OpenCV", proficiency: 4 },
    ],
  },
  {
    icon: "☁️",
    title: "Cloud & Infrastructure",
    skills: [
      { name: "AWS (Bedrock, S3, EC2)", proficiency: 4 },
      { name: "Docker", proficiency: 4 },
      { name: "REST APIs", proficiency: 5 },
      { name: "Streamlit", proficiency: 4 },
      { name: "Deployment Pipelines", proficiency: 4 },
      { name: "HuggingFace Hub", proficiency: 5 },
      { name: "W&B", proficiency: 3 },
    ],
  },
  {
    icon: "💻",
    title: "Languages & Tools",
    skills: [
      { name: "Python (Expert)", proficiency: 5 },
      { name: "SQL", proficiency: 4 },
      { name: "JavaScript/TypeScript", proficiency: 3 },
      { name: "Java", proficiency: 3 },
      { name: "GitHub", proficiency: 5 },
      { name: "Jupyter", proficiency: 5 },
      { name: "VS Code", proficiency: 5 },
    ],
  },
] as const;

export const EXPERIENCE = [
  {
    role: "Project Officer & SME — AI/ML",
    company: "Edunet Foundation",
    period: "Feb 2026 – March 2026",
    type: "Onsite",
    description: [
      "Industry-aligned AI/ML training covering ML, DL, NLP, LLM Fine-Tuning, CV, and GenAI",
      "Curriculum design + agentic AI project modules for hands-on learning",
      "Mentoring on end-to-end AI deployment with PyTorch, TensorFlow, and HuggingFace",
    ],
    metrics: [] as { label: string; value: number }[],
  },
  {
    role: "AI Engineer Intern",
    company: "Rubixe AI Solutions",
    period: "Oct 2025 – Feb 2026",
    type: "Remote",
    description: [
      "Architecture optimization & batching for inference efficiency",
      "YOLO-based Computer Vision POCs for real-time analytics",
      "Multi-stage preprocessing pipeline optimization",
      "Backend REST APIs for AI model serving",
    ],
    metrics: [
      { label: "Inference Efficiency", value: 28 },
      { label: "Faster Data Prep", value: 40 },
    ],
  },
  {
    role: "Data Scientist Intern",
    company: "Rubixe AI Solutions",
    period: "March 2026 – Oct 2025",
    type: "Remote",
    description: [
      "ML model accuracy improvement through feature engineering",
      "Automated feature-engineering pipelines for faster experimentation",
    ],
    metrics: [
      { label: "Model Accuracy ↑", value: 22 },
      { label: "Faster Experiments", value: 35 },
    ],
  },
  {
    role: "LLM & Data Analysis Intern",
    company: "Springer Capital",
    period: "May 2025 – Aug 2025",
    type: "Remote",
    description: [
      "LLM output consistency gain via fine-tuning with HuggingFace Transformers",
      "RAG integration with vector store retrieval systems",
      "Prompt engineering for LLM reasoning optimization",
    ],
    metrics: [{ label: "LLM Consistency ↑", value: 31 }],
  },
] as const;

export const PROJECTS = [
  {
    title: "Agentic LLM Summarization Pipeline",
    date: "Nov 2024",
    category: "Agentic AI",
    description: "Multi-lingual transformer-based agentic summarization with LangChain tool-use + RAG integration. +22% coherence improvement.",
    stack: ["Python", "LangChain", "HuggingFace", "Vector Stores", "RAG", "Transformers"],
    github: "https://github.com/arunnayaka123",
    live: null,
    featured: true,
    problem: "Existing summarization pipelines struggled with multi-lingual content.",
    approach: "Built an agentic pipeline using LangChain with tool-use capabilities and RAG.",
    results: "+22% coherence improvement. Handles 5+ languages.",
  },
  {
    title: "CCTV Crowd Management System",
    date: "Dec 2024",
    category: "Computer Vision",
    description: "YOLO-based real-time anomaly detection at 40+ FPS. Docker-ready, edge-deployable.",
    stack: ["YOLO", "OpenCV", "Python", "Docker", "Real-Time Streaming"],
    github: null,
    live: null,
    featured: true,
    problem: "Manual CCTV monitoring is error-prone and cannot scale.",
    approach: "Deployed YOLO optimized for edge devices with Docker containerization.",
    results: "40+ FPS real-time detection. Automated alerts reduced response time by 60%.",
  },
] as const;

export const ACHIEVEMENTS = [
  { title: "AWS Cloud Practitioner", issuer: "Amazon Web Services", date: "2025", description: "Cloud fundamentals and AI/ML service proficiency" },
  { title: "HuggingFace NLP Course", issuer: "HuggingFace", date: "2024", description: "Transformers, fine-tuning, and NLP pipeline mastery" },
  { title: "Deep Learning Specialization", issuer: "DeepLearning.AI / Coursera", date: "2024", description: "Neural networks, CNNs, sequence models" },
  { title: "LangChain for LLM Apps", issuer: "DeepLearning.AI", date: "2024", description: "Building production LLM apps with LangChain" },
] as const;

export const SOCIAL_LINKS = [
  { label: "GitHub", href: "https://github.com/arunnayaka123", icon: "github" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/arun-nayak-b272b232a/", icon: "linkedin" },
  { label: "Instagram", href: "https://www.instagram.com/arun_nayak_a123/", icon: "instagram" },
  { label: "X", href: "https://x.com/Arunnayaka123", icon: "x" },
  { label: "HuggingFace", href: "https://huggingface.co/arunnayak", icon: "huggingface" },
] as const;

export const CONTACT_INFO = {
  email: "aa5954225@gmail.com",
  location: "Hyderabad, India",
  status: "Open to Opportunities",
} as const;