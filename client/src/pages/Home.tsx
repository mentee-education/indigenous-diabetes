/**
 * DESIGN SYSTEM: Warm Institutional
 * Charcoal #2C2C2C | Burnt Sienna #A0522D | Warm White #FAF8F5
 * Sage Green #5C7A5C | Amber #C8842A | Pale Gold #E8C97A
 * DM Serif Display (headings) + Lato (body) + Space Mono (labels)
 * Left-aligned editorial layout, amber-bordered resource cards, pull-quote blocks
 */

import { useState, useEffect, useRef } from "react";
import { ChevronDown, ExternalLink, BookOpen, Search, Menu, X, ArrowRight, Phone } from "lucide-react";
import { Link } from "wouter";

// ─── Asset URLs ───────────────────────────────────────────────────────────────
const ASSETS = {
  heroBg: "https://pub-9e14b2010cb245cd94b6fd11c77c5524.r2.dev/hero-bg.webp",
  communityHands: "https://pub-9e14b2010cb245cd94b6fd11c77c5524.r2.dev/sage-medicine.webp",
  traditionalFoods: "https://pub-9e14b2010cb245cd94b6fd11c77c5524.r2.dev/traditional-foods.webp",
  medicineWheel: "https://pub-9e14b2010cb245cd94b6fd11c77c5524.r2.dev/medicine-wheel.svg",
  logo: "https://pub-9e14b2010cb245cd94b6fd11c77c5524.r2.dev/logo.svg",
};

// ─── Data ─────────────────────────────────────────────────────────────────────
const STATS = [
  { value: "3\u20135\u00D7", label: "Higher diabetes prevalence in First Nations vs. general population" },
  { value: "17.2%", label: "Diabetes prevalence among First Nations people living on-reserve" },
  { value: "9.9%", label: "Diabetes prevalence among M\u00E9tis people (vs. 5% general population)" },
  { value: "80%", label: "Lifetime risk of diabetes for First Nations persons over 18 in Alberta" },
];

const RESOURCES = [
  {
    category: "Organizations",
    items: [
      { name: "National Indigenous Diabetes Association (NADA)", description: "Building diabetes-free healthy communities. Offers resources, programs, regional services, and the Diabetes Kinship Circle.", url: "https://nada.ca", tags: ["National", "Programs"] },
      { name: "Indigenous Diabetes Health Circle (IDHC)", description: "Promotes diabetes awareness from an Indigenous perspective and assists communities in identifying appropriate resources and services.", url: "https://idhc.life", tags: ["Awareness", "Community"] },
      { name: "First Nations Health Authority \u2014 Diabetes", description: "BC-based authority offering diabetes education materials, coverage for supplies, and wholistic care resources for First Nations people.", url: "https://www.fnha.ca/what-we-do/healthy-living/diabetes", tags: ["BC", "Education"] },
      { name: "Diabetes Action Canada \u2014 Indigenous Peoples Health", description: "IYMP program promotes well-being and encourages a holistic approach to living the good way by building resilience and self-agency.", url: "https://diabetesaction.ca/programs/indigenous-peoples-health/", tags: ["Research", "Youth"] },
      { name: "Diabetes Canada \u2014 Indigenous Communities", description: "Clinical practice guidelines, community tools, and resources specifically developed for and with Indigenous communities.", url: "https://www.diabetes.ca/resources/tools---resources/indigenous-communities-and-diabetes", tags: ["Clinical", "National"] },
      { name: "Aboriginal Diabetes Initiative (ADI) \u2014 ISC", description: "Indigenous Services Canada funds culturally appropriate, community-directed diabetes prevention and management programs across Canada.", url: "https://www.sac-isc.gc.ca/eng/1569960595332/1569960634063", tags: ["Federal", "Funding"] },
      { name: "Assembly of First Nations", description: "National advocacy organization representing First Nations citizens in Canada, with health and diabetes policy work.", url: "https://www.afn.ca", tags: ["National", "Advocacy"] },
      { name: "Native Women\u2019s Association of Canada", description: "Advocates for Indigenous women\u2019s health including diabetes education, traditional foods, and culturally safe care.", url: "https://www.nwac.ca", tags: ["Women", "National"] },
      { name: "Inuit Tapiriit Kanatami", description: "National representational organization for Inuit in Canada, addressing health disparities including diabetes.", url: "https://www.itk.ca", tags: ["Inuit", "National"] },
      { name: "M\u00E9tis National Council", description: "Represents the M\u00E9tis Nation nationally, including health policy and diabetes-related advocacy.", url: "https://www.metisnation.ca", tags: ["M\u00E9tis", "National"] },
      { name: "T2D Network \u2014 Indigenous Resources", description: "Curated list of organizations and resources specifically supporting Indigenous peoples with Type 2 diabetes across Canada.", url: "https://www.t2dnetwork.ca/indigenous-resources", tags: ["Directory", "National"] },
      { name: "International Diabetes Federation", description: "Global organization providing diabetes data, advocacy, and resources. Includes Indigenous-specific data.", url: "https://www.idf.org", tags: ["Global", "Data"] },
    ],
  },
  {
    category: "Toolkits & Guides",
    items: [
      { name: "Diabetes Self-Management Toolkit for Aboriginal Women", description: "Practical self-management guide for First Nations, Inuit, and M\u00E9tis women \u2014 covers blood sugar, nutrition, and daily wellness. Free PDF.", url: "https://nada.ca/wp-content/uploads/2012-NWAC-Diabetes-Toolkit.pdf", tags: ["Women", "PDF"] },
      { name: "NADA Pathway to Wellness Handbook", description: "Comprehensive 120-page handbook covering diabetes education, the Medicine Wheel framework, nutrition, physical activity, and lifestyle management.", url: "https://nada.ca/pathway-to-wellness/", tags: ["Handbook", "Comprehensive"] },
      { name: "Communities in Action: ADI Program Guide", description: "Guide to the Aboriginal Diabetes Initiative \u2014 health promotion, prevention, screening, and treatment services.", url: "https://nada.ca/wp-content/uploads/Communities-in-Action-English.pdf", tags: ["ADI", "PDF"] },
      { name: "ONWA Indigenous Diabetes Education Program", description: "Ontario Native Women\u2019s Association program increasing awareness by providing Indigenous women and families with information and resources.", url: "https://www.onwa.ca/indigenous-diabetes-education-awareness", tags: ["Ontario", "Women"] },
      { name: "New Beginnings Discussion Guide (CDC)", description: "Seven-module discussion guide for small groups with people who have diabetes \u2014 American Indian and Alaska Native focused.", url: "https://www.cdc.gov/diabetes/php/toolkits/new-beginnings-american-indian-alaska-native.html", tags: ["Group Learning", "Modules"] },
      { name: "IHS Education Materials & Resources", description: "Free, culturally relevant materials to prevent and treat diabetes \u2014 developed by the Indian Health Service for Indigenous communities.", url: "https://www.ihs.gov/diabetes/education-materials-and-resources/", tags: ["Free", "Prevention"] },
      { name: "My Native Plate \u2014 Nutrition Guide", description: "Visual plate guide for healthy eating grounded in Indigenous food traditions. Simple, practical, and culturally relevant.", url: "https://www.ihs.gov/diabetes/education-materials-and-resources/diabetes-topics/nutrition/my-native-plate/", tags: ["Nutrition", "Visual"] },
      { name: "FNHA Four Pillars of Managing Diabetes", description: "Guide outlining healthy eating, physical activity, monitoring blood glucose, and emotional wellness as four pillars of diabetes management.", url: "https://www.fnha.ca/what-we-do/healthy-living/diabetes", tags: ["BC", "Holistic"] },
      { name: "Canada Food Guide for First Nations, Inuit, and M\u00E9tis", description: "Culturally relevant nutrition guidance tailored to the unique dietary practices and food traditions of Indigenous communities.", url: "https://food-guide.canada.ca/en/", tags: ["Nutrition", "Federal"] },
      { name: "Five Principles of Trauma-Informed Care", description: "CMA guide on safety, trustworthiness, choice, collaboration, and empowerment \u2014 essential for culturally safe diabetes care.", url: "https://www.cma.ca", tags: ["Trauma-Informed", "Care"] },
      { name: "Indigenous Original Food Guide (NIDA)", description: "Gifts from Our Relations booklet showcasing 18 traditional Indigenous foods to promote healthy eating and lifestyle.", url: "https://nada.ca", tags: ["Traditional Foods", "Guide"] },
      { name: "Glycemic Index Food Guide", description: "Understanding the glycemic index to manage blood sugar \u2014 ranks carbohydrate-containing foods by their effect on blood sugar levels.", url: "https://www.diabetes.ca/nutrition---fitness/meal-planning/the-glycemic-index", tags: ["Nutrition", "Blood Sugar"] },
    ],
  },
  {
    category: "Traditional Wellness",
    items: [
      { name: "Native Diabetes Wellness Program (CDC)", description: "Shares messages about traditional ways of health and supports sustainable ecological approaches and health practices for Native communities.", url: "https://www.cdc.gov/diabetes-ndwp/index.html", tags: ["Traditional", "Ecological"] },
      { name: "Traditional Foods in Native America", description: "CDC-commissioned compendium highlighting traditional foods and their role in health and diabetes prevention across Native communities.", url: "https://www.cdc.gov/diabetes-ndwp/traditional-foods/index.html", tags: ["Traditional Foods", "Prevention"] },
      { name: "Medicine Wheel Nutrition Model", description: "Uses the Medicine Wheel diagram to promote a diet patterned according to traditional consumption \u2014 holistic and culturally grounded.", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC2765410/", tags: ["Medicine Wheel", "Research"] },
      { name: "IDHC: Traditional Healing Practices", description: "Overview of traditional healing practices including herbal medicine, ceremonies, and community support for Indigenous diabetes wellness.", url: "https://idhc.life", tags: ["Healing", "Ceremony"] },
      { name: "FNHA: Wholistic Landscape of Diabetes Wellness", description: "Stories from First Nations people in BC living well with diabetes \u2014 a wholistic approach integrating physical, emotional, mental, and spiritual wellness.", url: "https://www.fnha.ca/about/news-and-events/news/the-wholistic-landscape-of-diabetes-wellness-learning-from-each-other", tags: ["Stories", "BC"] },
      { name: "Medicine Wheel as a Public Health Approach", description: "Peer-reviewed research on how Medicine Wheel teachings provide a path toward holistic, Indigenous-based lifestyle intervention for diabetes.", url: "https://www.frontiersin.org/journals/public-health/articles/10.3389/fpubh.2024.1392517/full", tags: ["Research", "Public Health"] },
      { name: "FNHA Strength in Stories Report", description: "Collection of personal stories from First Nations people across BC living with diabetes \u2014 elevating voices and experiences.", url: "https://www.fnha.ca/Documents/FNHA-Strength-in-Stories.pdf", tags: ["Stories", "BC"] },
      { name: "Diabetes and My Nation Videos", description: "Chief Bob Joseph shares insights on Indigenous health and the journey toward healing, resilience, and community well-being.", url: "https://www.diabetesandmynation.com", tags: ["Video", "Education"] },
      { name: "Voices from the Field Podcast (NCCIH)", description: "Podcast highlighting innovative research and community initiatives advancing the health and well-being of First Nations, Inuit, and M\u00E9tis peoples.", url: "https://www.nccih.ca", tags: ["Podcast", "Research"] },
      { name: "Kahnawake Schools Diabetes Prevention Project", description: "Community-based research project in Kahnawake Mohawk Territory promoting diabetes prevention through traditional knowledge and education.", url: "https://www.ksdpp.org", tags: ["Prevention", "Community"] },
      { name: "Indigenous Harm Reduction Principles (FNHA)", description: "Culturally relevant harm reduction strategies for Indigenous communities, supporting holistic wellness approaches.", url: "https://www.fnha.ca", tags: ["Harm Reduction", "Wellness"] },
    ],
  },
  {
    category: "Health Centres & Programs",
    items: [
      { name: "Diabetes and My Nation Prevention & Management", description: "Community-based program offering culturally relevant resources and strategies for preventing and managing diabetes within Indigenous communities.", url: "https://www.diabetesandmynation.com", tags: ["Community", "Prevention"] },
      { name: "First Nations and Inuit Health Regional Offices", description: "Support First Nations and Inuit communities across Canada by delivering culturally tailored health services, programs, and partnerships.", url: "https://www.sac-isc.gc.ca", tags: ["Federal", "Regional"] },
      { name: "Fraser Health Indigenous Health", description: "Provides culturally safe, holistic healthcare services tailored for Indigenous communities within the Fraser Health region in BC.", url: "https://www.fraserhealth.ca", tags: ["BC", "Health Services"] },
      { name: "Interior Health Indigenous Program", description: "Collaborates with Indigenous communities to deliver health services that respect traditional practices and support well-being.", url: "https://www.interiorhealth.ca", tags: ["BC", "Health Services"] },
      { name: "Island Health Indigenous Program", description: "Enhances Indigenous health through culturally relevant care, partnerships, and services in the Island Health region.", url: "https://www.islandhealth.ca", tags: ["BC", "Health Services"] },
      { name: "Northern Health Indigenous Program", description: "Provides health services with a focus on Indigenous health initiatives, integrating cultural values and traditions.", url: "https://www.northernhealth.ca", tags: ["BC", "Health Services"] },
      { name: "Vancouver Coastal Health Indigenous Program", description: "Supports physical, mental, emotional, and spiritual wellness of Indigenous peoples with cultural sensitivity.", url: "https://www.vch.ca", tags: ["BC", "Health Services"] },
      { name: "Anishnawbe Health Toronto", description: "Provides traditional healing, primary care, and diabetes support services for Indigenous people in the Greater Toronto Area.", url: "https://www.aht.ca", tags: ["Ontario", "Urban"] },
      { name: "Sioux Lookout First Nations Health Authority", description: "Delivers health services to First Nations communities in the Sioux Lookout region of northwestern Ontario.", url: "https://www.slfnha.com", tags: ["Ontario", "Regional"] },
      { name: "Manitoba First Nations Diabetes Integration Project", description: "Mobile diabetes care and treatment model providing on-reserve services to support First Nations adults with Type 2 diabetes.", url: "https://www.fnhssm.com/dip", tags: ["Manitoba", "Mobile Care"] },
      { name: "SOAHAC Diabetes Education Services", description: "For Indigenous adults 18+ living with Type 2 diabetes, pre-diabetes, or at high risk. Culturally safe, no referral needed.", url: "https://www.soahac.on.ca", tags: ["Ontario", "No Referral"] },
    ],
  },
  {
    category: "Support Lines & Services",
    items: [
      { name: "NADA National Services", description: "National Indigenous Diabetes Association direct support line. Coordinator available for program referrals and community support.", url: "https://nada.ca/national-services/", tags: ["Phone", "National"], contact: "(204) 927-1221" },
      { name: "Aboriginal Diabetes Initiative \u2014 Health Canada", description: "Federal program support line for ADI-funded programs across Canada. Regional offices available in all provinces.", url: "https://www.sac-isc.gc.ca", tags: ["Federal", "Phone"], contact: "1-866-225-0709" },
      { name: "Health Quality BC \u2014 Indigenous Diabetes", description: "Emphasizes Indigenous self-determination and equity in diabetes care with culturally safe practices and community-driven solutions.", url: "https://www.healthqualitybc.ca", tags: ["BC", "Quality"] },
      { name: "Diabetes Information and Advice Line (DIAL) \u2014 Alberta", description: "Alberta-based diabetes information and advice line for self-management support.", url: "https://www.primarycarealberta.ca", tags: ["Alberta", "Phone"] },
      { name: "Alberta Health Link", description: "Call 811 for non-emergency health advice including diabetes management support in Alberta.", url: "https://www.albertahealthservices.ca", tags: ["Alberta", "811"], contact: "811" },
      { name: "Chronic Disease Network \u2014 Prince Albert", description: "Saskatchewan-based network supporting chronic disease management including diabetes in Indigenous communities.", url: "https://www.cdnap.ca", tags: ["Saskatchewan", "Network"] },
      { name: "Tungasuvvingat Inuit", description: "Ottawa-based organization providing programs and services for Inuit, including health and diabetes support.", url: "https://www.tungasuvvingatinuit.ca", tags: ["Inuit", "Ontario"] },
      { name: "Non-Insured Health Benefits (NIHB)", description: "Federal program providing coverage for diabetes medications, supplies, and CGM devices for First Nations and Inuit clients.", url: "https://www.sac-isc.gc.ca/eng/1578079214611/1578079236012", tags: ["Coverage", "Federal"] },
      { name: "Diabetes Hope Foundation", description: "Provides financial assistance and support for Canadians living with diabetes who cannot afford supplies.", url: "https://www.diabeteshopefoundation.com", tags: ["Financial Aid", "National"] },
      { name: "Pathway to Wellness \u2014 NADA", description: "NADA\u2019s flagship wellness pathway connecting Indigenous Canadians with diabetes resources, Spirit Healthcare Group, and optometry support.", url: "https://nada.ca/pathway-to-wellness/", tags: ["Pathway", "National"] },
    ],
  },
];

const PILLARS = [
  { title: "Physical Wellness", description: "Nutrition, movement, and daily practices grounded in traditional and contemporary knowledge.", color: "#A0522D", direction: "East" },
  { title: "Emotional Wellness", description: "Managing stress, building resilience, and finding support within family and community.", color: "#2C2C2C", direction: "South" },
  { title: "Mental Wellness", description: "Understanding diabetes, building health literacy, and navigating the healthcare system.", color: "#C8842A", direction: "West" },
  { title: "Spiritual Wellness", description: "Cultural teachings, ceremony, and connection to land as pathways to healing and balance.", color: "#FAF8F5", textColor: "#2C2C2C", direction: "North" },
];

const FAQS = [
  { q: "Who is this resource hub for?", a: "This hub is for anyone navigating Indigenous diabetes wellness \u2014 community members, health workers, nurses, dietitians, social workers, educators, caregivers, and family members. All resources are freely accessible." },
  { q: "Are these resources specific to Canada?", a: "The majority of resources are Canadian (First Nations, M\u00E9tis, and Inuit focused), but we also include high-quality resources from the United States (CDC, IHS) where they offer culturally relevant tools not available in Canada." },
  { q: "What is the Aboriginal Diabetes Initiative (ADI)?", a: "The ADI is a federal program funded by Indigenous Services Canada that supports culturally appropriate, community-directed diabetes prevention and management programs. It funds health promoters, community programs, and education initiatives across Canada." },
  { q: "What does \u2018culturally safe care\u2019 mean in diabetes wellness?", a: "Culturally safe care means healthcare that acknowledges and respects the cultural identity of Indigenous peoples \u2014 including traditional knowledge, language, and healing practices \u2014 and does not require patients to assimilate or abandon their identity to receive care." },
  { q: "Where can I take the free online course?", a: "The Healing Pathways: Indigenous Diabetes Wellness course is hosted on a dedicated learning platform. Click \u2018Begin the Course\u2019 anywhere on this page to access it at course.indigenousdiabetes.ca." },
  { q: "How can I suggest a resource to be added?", a: "We welcome community contributions. If you know of a program, toolkit, or organization that should be listed here, please reach out through the contact information below." },
  { q: "What is the Non-Insured Health Benefits (NIHB) program?", a: "NIHB is a federal program that provides eligible First Nations and Inuit clients with coverage for a range of health benefits not covered by other plans, including diabetes medications, insulin, blood glucose monitors, and continuous glucose monitoring (CGM) devices." },
];

const COURSE_MODULES = [
  { id: 1, title: "Understanding Diabetes", description: "What diabetes is, how it affects the body, and why Indigenous communities are disproportionately impacted." },
  { id: 2, title: "The Medicine Wheel Framework", description: "Applying the four dimensions of wellness \u2014 physical, emotional, mental, and spiritual \u2014 to diabetes care." },
  { id: 3, title: "Nutrition & Traditional Foods", description: "Traditional Indigenous foods as medicine, understanding carbohydrates, and the My Native Plate concept." },
  { id: 4, title: "Physical Activity & Movement", description: "Benefits of exercise, traditional activities, and building sustainable movement habits." },
  { id: 5, title: "Emotional & Mental Wellness", description: "Diabetes distress, managing stress, depression, and building resilience through culture." },
  { id: 6, title: "Managing Your Diabetes", description: "Blood sugar monitoring, medications, insulin, and creating your diabetes care plan." },
  { id: 7, title: "Navigating the Healthcare System", description: "Understanding your rights, culturally safe care, NIHB coverage, and self-advocacy." },
  { id: 8, title: "Living Well \u2014 Community & Support", description: "Building your support circle, community resources, and next steps on your wellness journey." },
];

// ─── Hooks ────────────────────────────────────────────────────────────────────
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

// ─── Components ───────────────────────────────────────────────────────────────
function SectionLabel({ children }: { children: React.ReactNode }) {
  return <span className="label-tag" style={{ color: "#A0522D" }}>{children}</span>;
}

function AmberRule() {
  return <div className="amber-rule mb-6" />;
}

function FadeSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const { ref, inView } = useInView();
  return (
    <div ref={ref} className={className} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(28px)",
      transition: "opacity 0.65s ease, transform 0.65s ease",
    }}>
      {children}
    </div>
  );
}

function ResourceCard({ item }: { item: { name: string; description: string; url: string; tags: string[]; contact?: string } }) {
  return (
    <a href={item.url} target="_blank" rel="noopener noreferrer" className="resource-card block group" style={{ textDecoration: "none" }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "0.5rem" }}>
        <h4 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.05rem", color: "#2C2C2C", lineHeight: 1.35, marginBottom: "0.5rem" }}>{item.name}</h4>
        <ExternalLink size={14} style={{ color: "#A0522D", flexShrink: 0, marginTop: "3px", opacity: 0.7 }} />
      </div>
      <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.88rem", color: "#555", lineHeight: 1.6, marginBottom: "0.75rem" }}>{item.description}</p>
      {item.contact && (
        <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.78rem", color: "#A0522D", marginBottom: "0.5rem", display: "flex", alignItems: "center", gap: "0.35rem" }}>
          <Phone size={12} /> {item.contact}
        </p>
      )}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
        {item.tags.map(tag => (
          <span key={tag} className="label-tag" style={{ background: "#F0EBE0", color: "#6B4226", padding: "2px 8px", borderRadius: "2px", fontSize: "0.65rem" }}>{tag}</span>
        ))}
      </div>
    </a>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: "1px solid #E5DDD0" }}>
      <button onClick={() => setOpen(!open)} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1.25rem 0", background: "none", border: "none", textAlign: "left", gap: "1rem" }}>
        <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.05rem", color: "#2C2C2C", lineHeight: 1.4 }}>{q}</span>
        <ChevronDown size={18} style={{ color: "#A0522D", flexShrink: 0, transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.25s ease" }} />
      </button>
      <div style={{ maxHeight: open ? "300px" : "0", overflow: "hidden", transition: "max-height 0.3s ease" }}>
        <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.95rem", color: "#555", lineHeight: 1.7, paddingBottom: "1.25rem" }}>{a}</p>
      </div>
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────
export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeCategory, setActiveCategory] = useState("Organizations");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const activeResources = RESOURCES.find(r => r.category === activeCategory);
  const filteredItems = activeResources?.items.filter(item =>
    searchQuery === "" ||
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
  ) ?? [];

  const totalResources = RESOURCES.reduce((sum, r) => sum + r.items.length, 0);

  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Resources", href: "#resources" },
    { label: "Wellness", href: "#wellness" },
    { label: "Course", href: "/course" },
    { label: "FAQs", href: "#faqs" },
  ];

  return (
    <div style={{ background: "#FAF8F5", minHeight: "100vh" }}>

      {/* ── Navigation ─────────────────────────────────────────────────────── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? "rgba(250,248,245,0.97)" : "rgba(20,35,20,0.45)",
        backdropFilter: "blur(8px)",
        borderBottom: scrolled ? "1px solid #E5DDD0" : "1px solid rgba(250,248,245,0.1)",
        transition: "all 0.3s ease", padding: "0 2rem",
      }}>
        <div style={{ maxWidth: "1320px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: "68px" }}>
          <a href="/" style={{ display: "flex", alignItems: "center", gap: "0.75rem", textDecoration: "none" }}>
            <img src={ASSETS.logo} alt="Indigenous Diabetes Wellness" style={{ width: "42px", height: "42px", objectFit: "contain" }} />
            <div>
              <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1rem", color: scrolled ? "#2C2C2C" : "#FAF8F5", lineHeight: 1.2, transition: "color 0.3s" }}>Indigenous Diabetes</div>
              <div className="label-tag" style={{ color: scrolled ? "#A0522D" : "#E8C97A", fontSize: "0.6rem", transition: "color 0.3s" }}>Wellness Resource Hub</div>
            </div>
          </a>

          <div style={{ display: "flex", alignItems: "center", gap: "2.5rem" }} className="hidden md:flex">
            {navLinks.map(link => {
              const isInternal = link.href.startsWith("/");
              if (isInternal) {
                return (
                  <Link key={link.label} href={link.href} style={{
                    fontFamily: "'Lato', sans-serif", fontSize: "0.9rem", fontWeight: 700,
                    color: scrolled ? "#2C2C2C" : "#FAF8F5", textDecoration: "none",
                    letterSpacing: "0.02em", transition: "color 0.3s",
                  }}
                  onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.color = scrolled ? "#A0522D" : "#E8C97A")}
                  onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.color = scrolled ? "#2C2C2C" : "#FAF8F5")}
                  >{link.label}</Link>
                );
              }
              return (
                <a key={link.label} href={link.href} style={{
                  fontFamily: "'Lato', sans-serif", fontSize: "0.9rem", fontWeight: 700,
                  color: scrolled ? "#2C2C2C" : "#FAF8F5", textDecoration: "none",
                  letterSpacing: "0.02em", transition: "color 0.3s",
                }}
                onMouseEnter={e => (e.currentTarget.style.color = scrolled ? "#A0522D" : "#E8C97A")}
                onMouseLeave={e => (e.currentTarget.style.color = scrolled ? "#2C2C2C" : "#FAF8F5")}
                >{link.label}</a>
              );
            })}
            <a href="https://course.indigenousdiabetes.ca" target="_blank" rel="noopener noreferrer" style={{
              fontFamily: "'Lato', sans-serif", fontSize: "0.85rem", fontWeight: 700,
              letterSpacing: "0.06em", textTransform: "uppercase",
              background: "#A0522D", color: "white", padding: "0.6rem 1.4rem",
              borderRadius: "2px", textDecoration: "none", transition: "background 0.2s",
            }}
            onMouseEnter={e => (e.currentTarget.style.background = "#7A3E22")}
            onMouseLeave={e => (e.currentTarget.style.background = "#A0522D")}
            >Begin the Course</a>
          </div>

          <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} style={{ background: "none", border: "none", color: scrolled ? "#2C2C2C" : "#FAF8F5", padding: "0.5rem", transition: "color 0.3s" }}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div style={{ background: "#FAF8F5", borderTop: "1px solid #E5DDD0", padding: "1.5rem 2rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {navLinks.map(link => {
              const isInternal = link.href.startsWith("/");
              if (isInternal) {
                return <Link key={link.label} href={link.href} onClick={() => setMobileMenuOpen(false)} style={{ fontFamily: "'Lato', sans-serif", fontSize: "1rem", fontWeight: 700, color: "#2C2C2C", textDecoration: "none" }}>{link.label}</Link>;
              }
              return <a key={link.label} href={link.href} onClick={() => setMobileMenuOpen(false)} style={{ fontFamily: "'Lato', sans-serif", fontSize: "1rem", fontWeight: 700, color: "#2C2C2C", textDecoration: "none" }}>{link.label}</a>;
            })}
            <a href="https://course.indigenousdiabetes.ca" target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.85rem", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", background: "#A0522D", color: "white", padding: "0.75rem 1.5rem", borderRadius: "2px", textDecoration: "none", textAlign: "center" }}>Begin the Course</a>
          </div>
        )}
      </nav>

      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${ASSETS.heroBg})`, backgroundSize: "cover", backgroundPosition: "center 40%", zIndex: 0 }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(105deg, rgba(20,35,20,0.88) 0%, rgba(20,35,20,0.72) 45%, rgba(20,35,20,0.25) 100%)", zIndex: 1 }} />

        <div style={{ position: "relative", zIndex: 2, maxWidth: "1320px", margin: "0 auto", padding: "8rem 2rem 5rem", width: "100%" }}>
          <div style={{ maxWidth: "680px" }}>
            <div className="fade-up fade-up-delay-1">
              <span className="label-tag" style={{ color: "#E8C97A" }}>A National Resource Hub</span>
            </div>
            <h1 className="fade-up fade-up-delay-2" style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(2.8rem, 6vw, 5rem)", color: "#FAF8F5", lineHeight: 1.1, marginTop: "1rem", marginBottom: "1.5rem" }}>
              Indigenous Diabetes<br /><em style={{ color: "#E8C97A" }}>Wellness</em>
            </h1>
            <p className="fade-up fade-up-delay-3" style={{ fontFamily: "'Lato', sans-serif", fontSize: "1.15rem", color: "rgba(250,248,245,0.88)", lineHeight: 1.75, marginBottom: "2.5rem", maxWidth: "560px" }}>
              A comprehensive hub bringing together {totalResources}+ organizations, toolkits, traditional wellness resources, and support services for Indigenous peoples, health workers, and caregivers navigating diabetes wellness.
            </p>
            <div className="fade-up fade-up-delay-4" style={{ display: "flex", flexWrap: "wrap", gap: "1rem", alignItems: "center" }}>
              <a href="#resources" style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.88rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", background: "#A0522D", color: "white", padding: "0.9rem 2rem", borderRadius: "2px", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.5rem", transition: "background 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.background = "#7A3E22")}
                onMouseLeave={e => (e.currentTarget.style.background = "#A0522D")}
              >Explore Resources <ArrowRight size={16} /></a>
              <Link href="/course" style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.88rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", background: "transparent", color: "#FAF8F5", padding: "0.9rem 2rem", borderRadius: "2px", border: "1px solid rgba(250,248,245,0.5)", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
                Free Online Course <BookOpen size={16} />
              </Link>
            </div>
          </div>
        </div>

        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 2, background: "rgba(20,35,20,0.85)", backdropFilter: "blur(4px)", borderTop: "1px solid rgba(200,132,42,0.3)" }}>
          <div className="stats-grid" style={{ maxWidth: "1320px", margin: "0 auto", padding: "0 2rem", display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}>
            {STATS.map((stat, i) => (
              <div key={i} style={{ padding: "1.25rem 1rem", borderRight: i < STATS.length - 1 ? "1px solid rgba(200,132,42,0.2)" : "none" }}>
                <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.8rem", color: "#E8C97A", lineHeight: 1 }}>{stat.value}</div>
                <div style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.78rem", color: "rgba(250,248,245,0.7)", marginTop: "0.35rem", lineHeight: 1.4 }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── About ──────────────────────────────────────────────────────────── */}
      <section id="about" style={{ padding: "6rem 2rem", background: "#FAF8F5" }}>
        <div style={{ maxWidth: "1320px", margin: "0 auto" }}>
          <div className="about-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center" }}>
            <FadeSection>
              <SectionLabel>About This Hub</SectionLabel>
              <AmberRule />
              <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(2rem, 4vw, 3rem)", color: "#2C2C2C", lineHeight: 1.2, marginBottom: "1.5rem" }}>
                Knowledge that belongs to the community
              </h2>
              <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "1rem", color: "#555", lineHeight: 1.8, marginBottom: "1.25rem" }}>
                Indigenous peoples in Canada face diabetes rates 3 to 5 times higher than the general population — yet resources are scattered, hard to find, and often not culturally grounded. This hub changes that.
              </p>
              <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "1rem", color: "#555", lineHeight: 1.8, marginBottom: "1.25rem" }}>
                We compile the most trusted organizations, toolkits, traditional wellness resources, and support services in one place — organized, searchable, and free. Whether you are a community member, health worker, or caregiver, this is your starting point.
              </p>
              <blockquote style={{ borderLeft: "3px solid #C8842A", paddingLeft: "1.25rem", margin: "1.5rem 0", fontFamily: "'DM Serif Display', serif", fontSize: "1.15rem", color: "#2C2C2C", fontStyle: "italic", lineHeight: 1.6 }}>
                "Diabetes can be discovered early and managed effectively — with the right knowledge and the right support."
              </blockquote>
              <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.85rem", color: "#888" }}>— National Aboriginal Women's Association Diabetes Toolkit</p>
            </FadeSection>

            <FadeSection>
              <div style={{ position: "relative" }}>
                <img src={ASSETS.communityHands} alt="Sage bundle and sweetgrass braid — traditional medicines" style={{ width: "100%", borderRadius: "4px", boxShadow: "0 12px 40px rgba(0,0,0,0.15)", display: "block" }} />
                <div style={{ position: "absolute", bottom: "-1.5rem", right: "-1.5rem", background: "#A0522D", color: "white", padding: "1.25rem 1.5rem", borderRadius: "2px", boxShadow: "0 4px 16px rgba(0,0,0,0.15)" }}>
                  <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.8rem", lineHeight: 1 }}>{totalResources}+</div>
                  <div style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.78rem", letterSpacing: "0.08em", textTransform: "uppercase", marginTop: "0.25rem", opacity: 0.85 }}>Resources</div>
                </div>
              </div>
            </FadeSection>
          </div>
        </div>
      </section>

      {/* ── Resources ──────────────────────────────────────────────────────── */}
      <section id="resources" style={{ padding: "6rem 2rem", background: "#F2EDE4" }}>
        <div style={{ maxWidth: "1320px", margin: "0 auto" }}>
          <FadeSection>
            <SectionLabel>Resource Directory</SectionLabel>
            <AmberRule />
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: "1.5rem", marginBottom: "2.5rem" }}>
              <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(2rem, 4vw, 2.8rem)", color: "#2C2C2C", lineHeight: 1.2, maxWidth: "500px" }}>
                Everything in one place
              </h2>
              <div style={{ position: "relative", minWidth: "260px", flex: "1", maxWidth: "360px" }}>
                <Search size={16} style={{ position: "absolute", left: "0.85rem", top: "50%", transform: "translateY(-50%)", color: "#888" }} />
                <input type="text" placeholder="Search resources..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} style={{ width: "100%", padding: "0.7rem 0.85rem 0.7rem 2.5rem", fontFamily: "'Lato', sans-serif", fontSize: "0.9rem", border: "1px solid #D5C9B8", borderRadius: "2px", background: "white", color: "#2C2C2C", outline: "none" }} />
              </div>
            </div>

            <div className="category-tabs" style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "2.5rem" }}>
              {RESOURCES.map(r => (
                <button key={r.category} onClick={() => { setActiveCategory(r.category); setSearchQuery(""); }} style={{
                  fontFamily: "'Lato', sans-serif", fontSize: "0.85rem", fontWeight: 700,
                  padding: "0.55rem 1.25rem", borderRadius: "2px", border: "1px solid",
                  borderColor: activeCategory === r.category ? "#A0522D" : "#D5C9B8",
                  background: activeCategory === r.category ? "#A0522D" : "white",
                  color: activeCategory === r.category ? "white" : "#555",
                  transition: "all 0.2s", cursor: "pointer",
                }}>
                  {r.category} <span style={{ opacity: 0.7, marginLeft: "0.35rem" }}>({r.items.length})</span>
                </button>
              ))}
            </div>
          </FadeSection>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: "1.25rem" }}>
            {filteredItems.map(item => (
              <FadeSection key={item.name}>
                <ResourceCard item={item} />
              </FadeSection>
            ))}
            {filteredItems.length === 0 && (
              <div style={{ gridColumn: "1/-1", textAlign: "center", padding: "3rem", color: "#888", fontFamily: "'Lato', sans-serif" }}>
                No resources found for "{searchQuery}". Try a different search term.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── Four Pillars / Wellness ─────────────────────────────────────────── */}
      <section id="wellness" style={{ padding: "6rem 2rem", background: "#FAF8F5" }}>
        <div style={{ maxWidth: "1320px", margin: "0 auto" }}>
          <FadeSection>
            <SectionLabel>Holistic Wellness</SectionLabel>
            <AmberRule />
            <div className="wellness-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }}>
              <div>
                <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(2rem, 4vw, 2.8rem)", color: "#2C2C2C", lineHeight: 1.2, marginBottom: "1.25rem" }}>
                  The four dimensions of wellness
                </h2>
                <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "1rem", color: "#555", lineHeight: 1.8, marginBottom: "2rem" }}>
                  Indigenous approaches to diabetes wellness recognize that health is not just physical. The Medicine Wheel framework integrates physical, emotional, mental, and spiritual dimensions — reflecting the holistic understanding of health held by many Indigenous communities.
                </p>
                <div className="pillars-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  {PILLARS.map(pillar => (
                    <div key={pillar.title} style={{
                      background: pillar.color,
                      padding: "1.5rem",
                      borderRadius: "4px",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                    }}>
                      <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: pillar.textColor || "rgba(250,248,245,0.6)", marginBottom: "0.5rem" }}>{pillar.direction}</div>
                      <h4 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.05rem", color: pillar.textColor || "#FAF8F5", marginBottom: "0.5rem" }}>{pillar.title}</h4>
                      <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.83rem", color: pillar.textColor ? "rgba(44,44,44,0.7)" : "rgba(250,248,245,0.75)", lineHeight: 1.6 }}>{pillar.description}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <img src={ASSETS.medicineWheel} alt="Medicine Wheel — four dimensions of wellness" style={{ width: "85%", maxWidth: "420px", display: "block" }} />
              </div>
            </div>
          </FadeSection>
        </div>
      </section>

      {/* ── Traditional Foods ──────────────────────────────────────────────── */}
      <section style={{ padding: "6rem 2rem", background: "#2C1A0E" }}>
        <div style={{ maxWidth: "1320px", margin: "0 auto" }}>
          <div className="foods-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center" }}>
            <FadeSection>
              <img src={ASSETS.traditionalFoods} alt="Traditional Indigenous foods" style={{ width: "100%", borderRadius: "4px", boxShadow: "0 12px 40px rgba(0,0,0,0.3)", display: "block" }} />
            </FadeSection>
            <FadeSection>
              <span className="label-tag" style={{ color: "#E8C97A" }}>Traditional Foods & Nutrition</span>
              <div style={{ width: "3rem", height: "3px", background: "#E8C97A", borderRadius: "2px", margin: "1.25rem 0" }} />
              <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", color: "#FAF8F5", lineHeight: 1.2, marginBottom: "1.25rem" }}>
                Reclaiming traditional foods as medicine
              </h2>
              <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "1rem", color: "rgba(250,248,245,0.8)", lineHeight: 1.8, marginBottom: "1.25rem" }}>
                Traditional Indigenous foods — wild rice, bannock, berries, fish, game, corn, squash, and medicinal plants — are not just cultural heritage. They are powerful tools for diabetes prevention and management, often lower in refined sugars and higher in fibre than modern processed foods.
              </p>
              <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "1rem", color: "rgba(250,248,245,0.8)", lineHeight: 1.8, marginBottom: "2rem" }}>
                The CDC's Native Diabetes Wellness Program and the IHS Traditional Foods resources provide evidence-based guidance on integrating traditional foods into diabetes care — grounded in cultural knowledge, not clinical detachment.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
                <a href="https://www.cdc.gov/diabetes-ndwp/traditional-foods/index.html" target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.85rem", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", background: "#A0522D", color: "white", padding: "0.75rem 1.5rem", borderRadius: "2px", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
                  CDC Traditional Foods <ExternalLink size={14} />
                </a>
                <a href="https://www.ihs.gov/diabetes/education-materials-and-resources/diabetes-topics/nutrition/my-native-plate/" target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.85rem", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", background: "transparent", color: "#FAF8F5", padding: "0.75rem 1.5rem", borderRadius: "2px", border: "1px solid rgba(250,248,245,0.35)", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
                  My Native Plate <ExternalLink size={14} />
                </a>
              </div>
            </FadeSection>
          </div>
        </div>
      </section>

      {/* ── Course CTA ─────────────────────────────────────────────────────── */}
      <section style={{ padding: "6rem 2rem", background: "#3A2010", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${ASSETS.heroBg})`, backgroundSize: "cover", backgroundPosition: "center", opacity: 0.12 }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: "1320px", margin: "0 auto", textAlign: "center" }}>
          <FadeSection>
            <span className="label-tag" style={{ color: "#E8C97A" }}>Free Online Course</span>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "#FAF8F5", lineHeight: 1.15, margin: "1.25rem auto 1.5rem", maxWidth: "700px" }}>
              Healing Pathways: Indigenous Diabetes Wellness
            </h2>
            <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "1.05rem", color: "rgba(250,248,245,0.8)", lineHeight: 1.75, maxWidth: "580px", margin: "0 auto 2rem" }}>
              A culturally grounded, self-paced course for community members, health workers, and caregivers. Eight modules covering everything from understanding diabetes to community support.
            </p>

            {/* Module preview */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "0.75rem", maxWidth: "900px", margin: "0 auto 2.5rem", textAlign: "left" }}>
              {COURSE_MODULES.map(mod => (
                <div key={mod.id} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", padding: "0.75rem 1rem", background: "rgba(250,248,245,0.06)", borderRadius: "2px", border: "1px solid rgba(232,201,122,0.12)" }}>
                  <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.2rem", color: "#E8C97A", lineHeight: 1, flexShrink: 0 }}>{mod.id}</span>
                  <span style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.85rem", color: "rgba(250,248,245,0.75)", lineHeight: 1.4 }}>{mod.title}</span>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "1rem" }}>
              <Link href="/course" style={{
                fontFamily: "'Lato', sans-serif", fontSize: "0.9rem", fontWeight: 700,
                letterSpacing: "0.08em", textTransform: "uppercase",
                background: "#A0522D", color: "white", padding: "1rem 2.5rem",
                borderRadius: "2px", textDecoration: "none", display: "inline-flex",
                alignItems: "center", gap: "0.6rem",
                boxShadow: "0 4px 20px rgba(160,82,45,0.4)",
              }}>
                Preview the Course <BookOpen size={18} />
              </Link>
              <a href="https://course.indigenousdiabetes.ca" target="_blank" rel="noopener noreferrer" style={{
                fontFamily: "'Lato', sans-serif", fontSize: "0.9rem", fontWeight: 700,
                letterSpacing: "0.08em", textTransform: "uppercase",
                background: "transparent", color: "#FAF8F5", padding: "1rem 2.5rem",
                borderRadius: "2px", border: "1px solid rgba(250,248,245,0.4)",
                textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.6rem",
              }}>
                Go to LearnDash <ExternalLink size={16} />
              </a>
            </div>
          </FadeSection>
        </div>
      </section>

      {/* ── FAQs ───────────────────────────────────────────────────────────── */}
      <section id="faqs" style={{ padding: "6rem 2rem", background: "#FAF8F5" }}>
        <div style={{ maxWidth: "1320px", margin: "0 auto" }}>
          <div className="faq-grid" style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "5rem", alignItems: "start" }}>
            <FadeSection>
              <SectionLabel>Frequently Asked</SectionLabel>
              <AmberRule />
              <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)", color: "#2C2C2C", lineHeight: 1.2 }}>Common questions</h2>
              <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.95rem", color: "#666", lineHeight: 1.7, marginTop: "1rem" }}>
                Questions about the resources, the course, and how this hub works.
              </p>
            </FadeSection>
            <FadeSection>
              <div style={{ borderTop: "1px solid #E5DDD0" }}>
                {FAQS.map((faq, i) => <FAQItem key={i} q={faq.q} a={faq.a} />)}
              </div>
            </FadeSection>
          </div>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────────────────────── */}
      <footer style={{ background: "#1A1208", borderTop: "3px solid #A0522D" }}>
        <div style={{ maxWidth: "1320px", margin: "0 auto", padding: "4rem 2rem 2rem" }}>
          <div className="footer-grid" style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: "4rem", marginBottom: "3rem" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
                <img src={ASSETS.logo} alt="Logo" style={{ width: "40px", height: "40px", objectFit: "contain" }} />
                <div>
                  <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.1rem", color: "#FAF8F5" }}>Indigenous Diabetes Wellness</div>
                  <div className="label-tag" style={{ color: "#C8842A", fontSize: "0.6rem" }}>Resource Hub</div>
                </div>
              </div>
              <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.88rem", color: "rgba(250,248,245,0.6)", lineHeight: 1.7, maxWidth: "320px" }}>
                A comprehensive, freely accessible hub for Indigenous peoples, health workers, and caregivers navigating diabetes wellness across Canada and beyond.
              </p>
            </div>

            <div>
              <div className="label-tag" style={{ color: "#C8842A", marginBottom: "1rem" }}>Navigate</div>
              {[
                { label: "About", href: "#about" },
                { label: "Resource Directory", href: "#resources" },
                { label: "Holistic Wellness", href: "#wellness" },
                { label: "Course", href: "/course", internal: true },
                { label: "FAQs", href: "#faqs" },
                { label: "Begin the Course", href: "https://course.indigenousdiabetes.ca" },
              ].map(link => {
                if ((link as any).internal) {
                  return <Link key={link.label} href={link.href} style={{ display: "block", fontFamily: "'Lato', sans-serif", fontSize: "0.88rem", color: "rgba(250,248,245,0.65)", textDecoration: "none", marginBottom: "0.6rem" }}>{link.label}</Link>;
                }
                return (
                  <a key={link.label} href={link.href} style={{ display: "block", fontFamily: "'Lato', sans-serif", fontSize: "0.88rem", color: "rgba(250,248,245,0.65)", textDecoration: "none", marginBottom: "0.6rem", transition: "color 0.2s" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#E8C97A")}
                  onMouseLeave={e => (e.currentTarget.style.color = "rgba(250,248,245,0.65)")}
                  >{link.label}</a>
                );
              })}
            </div>

            <div>
              <div className="label-tag" style={{ color: "#C8842A", marginBottom: "1rem" }}>Key Organizations</div>
              {[
                { label: "NADA", href: "https://nada.ca" },
                { label: "IDHC", href: "https://idhc.life" },
                { label: "FNHA Diabetes", href: "https://www.fnha.ca/what-we-do/healthy-living/diabetes" },
                { label: "Diabetes Canada", href: "https://www.diabetes.ca" },
                { label: "T2D Network", href: "https://www.t2dnetwork.ca/indigenous-resources" },
                { label: "CDC Native Diabetes", href: "https://www.cdc.gov/diabetes-ndwp/index.html" },
              ].map(link => (
                <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontFamily: "'Lato', sans-serif", fontSize: "0.88rem", color: "rgba(250,248,245,0.65)", textDecoration: "none", marginBottom: "0.6rem", transition: "color 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#E8C97A")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(250,248,245,0.65)")}
                ><ExternalLink size={11} />{link.label}</a>
              ))}
            </div>
          </div>

          <div style={{ borderTop: "1px solid rgba(250,248,245,0.1)", paddingTop: "1.5rem", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "1rem" }}>
            <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.8rem", color: "rgba(250,248,245,0.4)" }}>
              &copy; 2026 Indigenous Diabetes Wellness. All resources are freely accessible. Built with Civic Firm.
            </p>
            <div style={{ display: "flex", gap: "1.5rem" }}>
              {["Accessibility", "Privacy Policy"].map(label => (
                <a key={label} href="#" style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.8rem", color: "rgba(250,248,245,0.4)", textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#E8C97A")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(250,248,245,0.4)")}
                >{label}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* ── Responsive Styles ──────────────────────────────────────────────── */}
      <style>{`
        @media (max-width: 768px) {
          .about-grid, .wellness-grid, .foods-grid, .faq-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
          .footer-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
          .stats-grid { grid-template-columns: 1fr 1fr !important; }
          .pillars-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
