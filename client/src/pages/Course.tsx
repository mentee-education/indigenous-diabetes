/**
 * COURSE PAGE: Healing Pathways — Indigenous Diabetes Wellness
 * Unique editorial layout — NOT LearnDash. Sidebar navigation + long-form reading.
 * DM Serif Display (headings) + Lato (body) + Space Mono (labels)
 */

import { useState, useEffect, useRef } from "react";
import { ChevronDown, ChevronRight, BookOpen, ArrowLeft, ArrowRight, ExternalLink, CheckCircle, Menu, X } from "lucide-react";
import { Link, useParams } from "wouter";

// ─── Assets ───────────────────────────────────────────────────────────────────
const ASSETS = {
  logo: "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663407421710/fqxdLbTBuAhxRleH.png?Expires=1804739201&Signature=UtgNupPjx056USQgv9myA-UELbE42JGzyJcArkthf02ovz75jLNhWMxxlm8atpzmz0j9ZH9O1x-vZCJXk-A9CgOBpdSIXcMVIH0kZpcf2yABedVEnb5vsbi06Gt3OPzxlFMiNxKtqHlA70ABgllGLS5FhKbVbZHYRvR3LIkH-cFma-XEJeJfACGevKqx6sa1vsHB65sLmZWIKltcXOOYUo2xxVVAOJNF0K6aH9EvFzDuUol~vXRQRwfrhIVe0CV87r5MoAEoOpzZM13vQ8noFRZz7usFeomD66Nr2SfSFIBYjkysaPP5wRezl7z9Gb~JxH2CZnNoG5XaP94kxw5akA__&Key-Pair-Id=K2HSFNDJXOU9YS",
  medicineWheel: "https://d2xsxph8kpxj0f.cloudfront.net/310519663407421710/YkkWDodg4CAnRmp25yhfTA/medicine-wheel-simple-AhtwZRYz96CkosUPLDm4w8.webp",
};

// ─── Course Data ──────────────────────────────────────────────────────────────
interface Section {
  title: string;
  content: string;
  keyTakeaways?: string[];
  resources?: { label: string; url: string }[];
}

interface Module {
  id: number;
  title: string;
  subtitle: string;
  color: string;
  sections: Section[];
}

const MODULES: Module[] = [
  {
    id: 1,
    title: "Understanding Diabetes",
    subtitle: "What diabetes is, how it affects the body, and why Indigenous communities are disproportionately impacted.",
    color: "#A0522D",
    sections: [
      {
        title: "What Is Diabetes?",
        content: "Diabetes is a chronic condition that affects how your body turns food into energy. When you eat, your body breaks down most food into sugar (glucose) and releases it into your bloodstream. When blood sugar goes up, your pancreas releases insulin — a hormone that acts like a key, letting blood sugar into your body's cells to be used as energy.\n\nWith diabetes, your body either doesn't make enough insulin or can't use the insulin it makes as well as it should. When there isn't enough insulin — or cells stop responding to insulin — too much blood sugar stays in your bloodstream. Over time, this can cause serious health problems such as heart disease, vision loss, and kidney disease.\n\nThere is no cure yet for diabetes, but it can be managed effectively. Losing weight, eating well, being active, and taking prescribed medications can all help reduce the impact of diabetes on your daily life.",
        keyTakeaways: [
          "Diabetes affects how your body processes sugar (glucose) from food",
          "Insulin is the key hormone that helps cells absorb blood sugar",
          "Unmanaged diabetes can lead to heart disease, vision loss, and kidney disease",
          "Diabetes can be managed through lifestyle changes and medication",
        ],
      },
      {
        title: "Types of Diabetes",
        content: "There are three main types of diabetes:\n\n**Type 1 Diabetes** is thought to be caused by an autoimmune reaction where the body attacks itself by mistake. This stops the body from making insulin. Approximately 5-10% of people with diabetes have Type 1. Symptoms often develop quickly. It is usually diagnosed in children, teens, and young adults. People with Type 1 diabetes need to take insulin every day.\n\n**Type 2 Diabetes** is the most common form, accounting for about 90-95% of all diabetes cases. With Type 2, your body doesn't use insulin well and can't keep blood sugar at normal levels. It develops over many years and is usually diagnosed in adults — though it is increasingly being seen in children, teens, and young adults. Type 2 diabetes can often be prevented or delayed with healthy lifestyle changes.\n\n**Gestational Diabetes** develops in pregnant women who have never had diabetes. It usually goes away after the baby is born, but it increases the risk of Type 2 diabetes later in life for both the mother and child. In Indigenous communities, gestational diabetes rates are significantly higher than the general population.",
        keyTakeaways: [
          "Type 1: Body doesn't make insulin (autoimmune) — requires daily insulin",
          "Type 2: Body doesn't use insulin well — most common, often preventable",
          "Gestational: Develops during pregnancy — increases future diabetes risk",
          "Type 2 is increasingly seen in younger Indigenous populations",
        ],
      },
      {
        title: "Diabetes in Indigenous Communities",
        content: "Indigenous peoples in Canada face diabetes rates 3 to 5 times higher than the general population. Among First Nations people living on-reserve, the prevalence of diabetes is 17.2%, compared to approximately 5% in the general Canadian population. Among Métis people, the rate is 9.9%. In some communities, the lifetime risk of developing diabetes exceeds 80%.\n\nThese disparities are not the result of individual choices. They are rooted in the ongoing impacts of colonization — including the disruption of traditional food systems, forced relocation from traditional territories, the intergenerational trauma of residential schools, and systemic barriers to culturally safe healthcare.\n\nThe shift from traditional diets rich in wild game, fish, berries, and plants to processed, store-bought foods high in sugar and refined carbohydrates has been a major driver of diabetes in Indigenous communities. This dietary transition, combined with reduced physical activity and the stress of socioeconomic disadvantage, has created what many health researchers describe as a \"perfect storm\" for diabetes.\n\nUnderstanding this context is essential. Diabetes in Indigenous communities is not simply a medical condition — it is a consequence of historical and ongoing injustice. Effective diabetes wellness must address these root causes, not just the symptoms.",
        keyTakeaways: [
          "First Nations on-reserve: 17.2% diabetes prevalence (vs. 5% general population)",
          "Disparities are rooted in colonization, not individual choices",
          "Disruption of traditional food systems is a major driver",
          "Effective wellness must address root causes, not just symptoms",
        ],
      },
      {
        title: "Risk Factors and Prevention",
        content: "Several factors increase the risk of developing Type 2 diabetes:\n\n**Non-modifiable risk factors** include family history of diabetes, Indigenous ancestry, age (risk increases with age), and history of gestational diabetes.\n\n**Modifiable risk factors** include being overweight or obese (especially carrying weight around the abdomen), physical inactivity, unhealthy eating patterns, high blood pressure, high cholesterol, and smoking.\n\n**Pre-diabetes** is a condition where blood sugar levels are higher than normal but not yet high enough to be diagnosed as Type 2 diabetes. Pre-diabetes is a warning sign — but it is also an opportunity. With lifestyle changes, pre-diabetes can often be reversed.\n\nPrevention strategies that are most effective in Indigenous communities are those that are culturally grounded — incorporating traditional foods, land-based activities, community support, and holistic wellness approaches. Programs like the Aboriginal Diabetes Initiative (ADI) and NADA's Pathway to Wellness have demonstrated that culturally relevant prevention works.",
        keyTakeaways: [
          "Risk factors include family history, Indigenous ancestry, and lifestyle factors",
          "Pre-diabetes is a warning sign — and an opportunity for prevention",
          "Culturally grounded prevention strategies are most effective",
          "Programs like ADI and NADA's Pathway to Wellness demonstrate success",
        ],
        resources: [
          { label: "NADA Pathway to Wellness", url: "https://nada.ca/pathway-to-wellness/" },
          { label: "Diabetes Canada Risk Assessment", url: "https://www.diabetes.ca/risk-quiz" },
        ],
      },
    ],
  },
  {
    id: 2,
    title: "The Medicine Wheel Framework",
    subtitle: "Applying the four dimensions of wellness — physical, emotional, mental, and spiritual — to diabetes care.",
    color: "#5C7A5C",
    sections: [
      {
        title: "Introduction to the Medicine Wheel",
        content: "The Medicine Wheel is one of the most widely recognized symbols in Indigenous cultures across North America. While its specific teachings vary among nations and communities, the Medicine Wheel commonly represents the interconnectedness of all aspects of life — including the four directions, the four seasons, and the four dimensions of human wellness.\n\nIn the context of diabetes wellness, the Medicine Wheel provides a framework for understanding health as more than the absence of disease. It teaches that true wellness requires balance across all four dimensions: physical, emotional, mental, and spiritual. When one dimension is out of balance, it affects all the others.\n\nThis holistic understanding stands in contrast to the Western biomedical model, which tends to focus primarily on physical symptoms and clinical interventions. The Medicine Wheel framework does not reject Western medicine — rather, it expands the definition of health to include the whole person, their relationships, and their connection to the land and community.",
        keyTakeaways: [
          "The Medicine Wheel represents interconnectedness of all aspects of life",
          "True wellness requires balance across physical, emotional, mental, and spiritual dimensions",
          "This framework expands — not replaces — Western medical approaches",
          "When one dimension is out of balance, it affects all others",
        ],
      },
      {
        title: "The Four Dimensions of Wellness",
        content: "**Physical Wellness (East)** encompasses nutrition, movement, sleep, and the daily practices that keep the body healthy. In diabetes care, this includes blood sugar monitoring, medication management, healthy eating, and regular physical activity. Traditional practices such as harvesting, hunting, fishing, and gathering medicines are powerful forms of physical wellness.\n\n**Emotional Wellness (South)** involves managing feelings, building resilience, and maintaining healthy relationships. Living with diabetes can bring frustration, fear, grief, and burnout. Emotional wellness means acknowledging these feelings, seeking support from family and community, and finding healthy ways to cope — including through ceremony, storytelling, and creative expression.\n\n**Mental Wellness (West)** relates to knowledge, understanding, and the ability to make informed decisions about your health. This includes health literacy — understanding what diabetes is, how to manage it, and how to navigate the healthcare system. Mental wellness also means maintaining a positive mindset and sense of purpose.\n\n**Spiritual Wellness (North)** connects to identity, culture, ceremony, and relationship with the land. For many Indigenous peoples, spiritual wellness is the foundation of all other dimensions. It includes practices such as prayer, smudging, sweat lodge ceremonies, connection to Elders, and time spent on the land. Spiritual wellness provides meaning, hope, and strength in the face of chronic illness.",
        keyTakeaways: [
          "Physical (East): Nutrition, movement, monitoring, traditional harvesting",
          "Emotional (South): Managing feelings, building resilience, community support",
          "Mental (West): Health literacy, informed decisions, positive mindset",
          "Spiritual (North): Culture, ceremony, identity, connection to land",
        ],
      },
      {
        title: "Applying the Medicine Wheel to Diabetes Care",
        content: "The Medicine Wheel framework can be applied practically to diabetes care by ensuring that each dimension of wellness is addressed in your care plan:\n\n**Ask yourself these questions:**\n\nPhysical: Am I eating well? Am I moving my body regularly? Am I taking my medications as prescribed? Am I monitoring my blood sugar?\n\nEmotional: How am I feeling about my diabetes? Am I carrying stress, anger, or sadness? Do I have someone I can talk to? Am I being kind to myself?\n\nMental: Do I understand my condition? Do I know what my blood sugar numbers mean? Do I feel confident navigating the healthcare system? Am I learning new things about my health?\n\nSpiritual: Am I connected to my culture and community? Am I spending time on the land? Am I participating in ceremony or cultural practices? Do I feel a sense of purpose and hope?\n\nWhen you notice that one area is being neglected, that's a signal to bring it back into balance. The goal is not perfection — it's awareness and intention. Even small steps toward balance in each dimension can have a profound impact on your overall wellness.",
        keyTakeaways: [
          "Use the four dimensions as a self-assessment tool for your care plan",
          "Notice which areas are being neglected and bring them back into balance",
          "The goal is awareness and intention, not perfection",
          "Small steps toward balance have profound impact on overall wellness",
        ],
        resources: [
          { label: "NADA Pathway to Wellness", url: "https://nada.ca/pathway-to-wellness/" },
          { label: "Medicine Wheel as Public Health Approach (Research)", url: "https://www.frontiersin.org/journals/public-health/articles/10.3389/fpubh.2024.1392517/full" },
        ],
      },
    ],
  },
  {
    id: 3,
    title: "Nutrition & Traditional Foods",
    subtitle: "Traditional Indigenous foods as medicine, understanding macronutrients, and the My Native Plate concept.",
    color: "#C8842A",
    sections: [
      {
        title: "Traditional Foods as Medicine",
        content: "For thousands of years, Indigenous peoples across Turtle Island sustained themselves with foods harvested from the land, water, and sky. Wild game (moose, deer, bison, caribou), fish (salmon, trout, walleye, char), berries (blueberries, saskatoon berries, cranberries), wild rice, corn, squash, beans, and a vast array of medicinal plants formed the foundation of a diet that was naturally low in refined sugars and high in protein, healthy fats, and fibre.\n\nThe disruption of these traditional food systems through colonization — including forced relocation from traditional territories, the banning of cultural practices, and the introduction of processed foods through the reserve system — is one of the primary drivers of the diabetes epidemic in Indigenous communities.\n\nReclaiming traditional foods is not just a nutritional strategy — it is an act of cultural revitalization and self-determination. Research consistently shows that traditional Indigenous diets are associated with lower rates of diabetes, obesity, and cardiovascular disease. Programs that support traditional food harvesting, community gardens, and food sovereignty have demonstrated measurable improvements in health outcomes.",
        keyTakeaways: [
          "Traditional diets were naturally low in refined sugars and high in nutrients",
          "Disruption of food systems through colonization drives the diabetes epidemic",
          "Reclaiming traditional foods is both nutritional strategy and cultural revitalization",
          "Research shows traditional diets are associated with lower diabetes rates",
        ],
      },
      {
        title: "Understanding Carbohydrates, Fats, and Proteins",
        content: "Understanding the three macronutrients is essential for managing blood sugar:\n\n**Carbohydrates** have the biggest impact on blood sugar. They are found in grains, fruits, vegetables, milk, and sweets. When you eat carbohydrates, your body breaks them down into glucose. Not all carbohydrates are equal — whole grains, fruits, and vegetables release sugar slowly (low glycemic index), while white bread, sugary drinks, and processed snacks cause rapid blood sugar spikes.\n\n**Proteins** help build and repair your body. They have minimal direct impact on blood sugar. Good sources include fish, wild game, poultry, eggs, beans, lentils, and nuts. Traditional protein sources like moose, deer, bison, and fish are excellent choices — they are lean, nutrient-dense, and culturally meaningful.\n\n**Fats** are essential for brain health, hormone production, and energy. Healthy fats (found in fish, nuts, seeds, and avocados) can actually help manage blood sugar by slowing digestion. Unhealthy fats (found in fried foods, processed snacks, and fast food) can increase the risk of heart disease — a serious concern for people with diabetes.\n\nThe key is balance: fill your plate with a variety of traditional and whole foods, limit processed and sugary items, and pay attention to portion sizes.",
        keyTakeaways: [
          "Carbohydrates have the biggest impact on blood sugar",
          "Traditional proteins (wild game, fish) are lean and nutrient-dense",
          "Healthy fats slow digestion and help manage blood sugar",
          "Balance and variety are more important than strict restriction",
        ],
      },
      {
        title: "The My Native Plate Concept",
        content: "My Native Plate is a visual guide developed by the Indian Health Service (IHS) to help Indigenous peoples make healthy food choices. It adapts the standard plate model to reflect traditional Indigenous foods and eating patterns.\n\nThe concept is simple: divide your plate into sections.\n\n**Half your plate: Vegetables and fruits.** Think wild greens, squash, corn, berries, root vegetables. These are rich in fibre, vitamins, and minerals, and they help manage blood sugar.\n\n**One quarter: Protein.** Wild game, fish, poultry, eggs, beans, lentils. These keep you full and provide essential nutrients without spiking blood sugar.\n\n**One quarter: Whole grains or starchy foods.** Wild rice, bannock (made with whole grain flour), corn, potatoes. Choose whole grains over refined grains when possible.\n\n**A small serving of healthy fat.** Fish oil, nuts, seeds, or a drizzle of olive oil.\n\n**Water as your primary drink.** Traditional teas (Labrador tea, cedar tea) are also excellent choices.\n\nThe beauty of My Native Plate is that it doesn't ask you to abandon your food traditions — it helps you build on them. It's a framework, not a prescription.",
        keyTakeaways: [
          "Half your plate: vegetables and fruits (wild greens, squash, berries)",
          "One quarter: protein (wild game, fish, beans)",
          "One quarter: whole grains (wild rice, whole grain bannock)",
          "Water and traditional teas as primary beverages",
        ],
        resources: [
          { label: "My Native Plate (IHS)", url: "https://www.ihs.gov/diabetes/education-materials-and-resources/diabetes-topics/nutrition/my-native-plate/" },
          { label: "CDC Traditional Foods", url: "https://www.cdc.gov/diabetes-ndwp/traditional-foods/index.html" },
          { label: "Canada Food Guide", url: "https://food-guide.canada.ca/en/" },
        ],
      },
    ],
  },
  {
    id: 4,
    title: "Physical Activity & Movement",
    subtitle: "Benefits of exercise, traditional activities, and building sustainable movement habits.",
    color: "#2C2C2C",
    sections: [
      {
        title: "Why Movement Matters for Diabetes",
        content: "Physical activity is one of the most powerful tools for managing and preventing Type 2 diabetes. When you move your body, your muscles use glucose for energy — which directly lowers blood sugar levels. Regular physical activity also improves insulin sensitivity, meaning your body can use insulin more effectively.\n\nThe benefits extend far beyond blood sugar control:\n\n- Reduces the risk of heart disease and stroke\n- Helps maintain a healthy weight\n- Lowers blood pressure and cholesterol\n- Improves sleep quality\n- Reduces stress, anxiety, and depression\n- Increases energy and stamina\n- Strengthens bones and muscles\n\nFor people with diabetes, even moderate activity — such as a 30-minute walk — can lower blood sugar for up to 24 hours. The key is consistency, not intensity. Any movement is better than no movement.",
        keyTakeaways: [
          "Physical activity directly lowers blood sugar by using glucose for energy",
          "Regular movement improves insulin sensitivity",
          "Even a 30-minute walk can lower blood sugar for up to 24 hours",
          "Consistency matters more than intensity",
        ],
      },
      {
        title: "Traditional Activities and Land-Based Movement",
        content: "Before colonization, Indigenous peoples were among the most physically active populations in the world. Daily life involved walking, running, paddling, hunting, fishing, gathering, harvesting, and building — all forms of vigorous physical activity deeply connected to culture, community, and the land.\n\nReclaiming these traditional activities is a powerful way to integrate movement into diabetes wellness:\n\n**Hunting and fishing** involve walking long distances, carrying equipment, and processing food — excellent cardiovascular and strength exercise.\n\n**Berry picking and plant harvesting** require walking, bending, reaching, and carrying — gentle but sustained physical activity.\n\n**Canoeing and kayaking** provide upper body strength training and cardiovascular exercise.\n\n**Powwow dancing** is a vigorous form of aerobic exercise that also nourishes emotional and spiritual wellness.\n\n**Snowshoeing and cross-country skiing** are traditional winter activities that provide excellent cardiovascular exercise.\n\n**Community walks and runs** — many communities organize regular walking groups, fun runs, and cultural walks that combine physical activity with social connection.\n\nThese activities are not just exercise — they are expressions of identity, culture, and connection to the land. They address multiple dimensions of the Medicine Wheel simultaneously.",
        keyTakeaways: [
          "Traditional activities are powerful forms of physical activity",
          "Hunting, fishing, harvesting, canoeing, and dancing are all excellent exercise",
          "Land-based movement addresses multiple dimensions of wellness simultaneously",
          "Community walks and runs combine physical activity with social connection",
        ],
      },
      {
        title: "Getting Started Safely",
        content: "If you haven't been physically active for a while, it's important to start slowly and build up gradually. Here are some practical tips:\n\n**Talk to your healthcare provider** before starting a new exercise program, especially if you take insulin or other diabetes medications. Exercise can lower blood sugar, so you may need to adjust your medication or eat a snack before activity.\n\n**Start with 10 minutes a day** and gradually increase to 30 minutes most days of the week. The goal is 150 minutes of moderate activity per week — but any amount is beneficial.\n\n**Choose activities you enjoy.** You're much more likely to stick with movement that feels good and meaningful to you. If you love being on the land, make that your exercise. If you enjoy walking with friends, do that.\n\n**Monitor your blood sugar** before and after exercise, especially when you're starting out. This helps you understand how different activities affect your levels.\n\n**Stay hydrated** and wear appropriate footwear. Foot care is especially important for people with diabetes.\n\n**Listen to your body.** If you feel dizzy, shaky, or unwell during exercise, stop and check your blood sugar. Keep a fast-acting sugar source (like juice or glucose tablets) with you.\n\n**Find a buddy.** Exercising with a friend, family member, or community group makes it more enjoyable and helps you stay accountable.",
        keyTakeaways: [
          "Start slowly — even 10 minutes a day is beneficial",
          "Talk to your healthcare provider before starting, especially if on medication",
          "Choose activities you enjoy and that are culturally meaningful",
          "Monitor blood sugar before and after exercise",
        ],
      },
    ],
  },
  {
    id: 5,
    title: "Emotional & Mental Wellness",
    subtitle: "Diabetes distress, managing stress, depression, and building resilience through culture.",
    color: "#A0522D",
    sections: [
      {
        title: "Diabetes Distress and Burnout",
        content: "Living with diabetes is not just a physical challenge — it is an emotional one. The daily demands of blood sugar monitoring, medication management, dietary choices, and healthcare appointments can be overwhelming. This is known as diabetes distress.\n\nDiabetes distress is different from clinical depression. It is a normal emotional response to the burden of managing a chronic condition. Symptoms include:\n\n- Feeling overwhelmed by the demands of diabetes management\n- Feeling angry, frustrated, or defeated\n- Worrying about complications\n- Feeling guilty about blood sugar numbers or food choices\n- Feeling alone in managing diabetes\n- Avoiding diabetes-related tasks (skipping blood sugar checks, missing appointments)\n\nDiabetes burnout occurs when distress becomes so overwhelming that a person essentially gives up on managing their diabetes. They may stop checking blood sugar, skip medications, or disengage from their healthcare team.\n\nIt's important to know that diabetes distress and burnout are common — and they are not signs of weakness or failure. They are signals that you need more support.",
        keyTakeaways: [
          "Diabetes distress is a normal response to the burden of chronic disease management",
          "It is different from clinical depression — it is specific to diabetes",
          "Burnout occurs when distress becomes overwhelming",
          "These are not signs of weakness — they are signals you need more support",
        ],
      },
      {
        title: "Managing Stress",
        content: "Stress directly affects blood sugar. When you're stressed, your body releases hormones (cortisol and adrenaline) that cause blood sugar to rise — even if you haven't eaten. Chronic stress can make diabetes harder to manage and increase the risk of complications.\n\nStress management strategies that are grounded in Indigenous wellness include:\n\n**Ceremony and prayer.** Smudging, sweat lodge, prayer, and other ceremonial practices can reduce stress, provide spiritual grounding, and restore a sense of balance.\n\n**Time on the land.** Being in nature — walking in the bush, sitting by water, gardening — has been shown to reduce cortisol levels and improve mental health.\n\n**Storytelling and sharing circles.** Talking about your experiences in a safe, supportive environment helps process emotions and reduces isolation.\n\n**Creative expression.** Beading, painting, drumming, singing, and other creative activities provide emotional release and cultural connection.\n\n**Deep breathing and relaxation.** Simple breathing exercises can activate the body's relaxation response and lower blood sugar.\n\n**Physical activity.** As discussed in Module 4, movement is one of the most effective stress reducers.\n\n**Connecting with Elders and knowledge keepers.** Their wisdom, perspective, and presence can provide comfort and guidance during difficult times.",
        keyTakeaways: [
          "Stress directly raises blood sugar through cortisol and adrenaline",
          "Ceremony, prayer, and time on the land are powerful stress reducers",
          "Sharing circles and storytelling help process emotions",
          "Creative expression provides emotional release and cultural connection",
        ],
      },
      {
        title: "Building Resilience Through Culture and Community",
        content: "Resilience is the ability to adapt and recover in the face of adversity. For Indigenous peoples, resilience is not just an individual trait — it is a collective strength rooted in culture, language, ceremony, and community.\n\nResearch consistently shows that cultural connectedness is a protective factor against chronic disease, mental illness, and substance use. Indigenous peoples who are connected to their culture, language, and community have better health outcomes — including better diabetes management.\n\nWays to build resilience through culture:\n\n- **Learn your language.** Even basic words and phrases strengthen cultural identity and connection.\n- **Participate in ceremony.** Regular participation in cultural practices provides spiritual grounding and community support.\n- **Connect with Elders.** Their knowledge and experience are invaluable resources for navigating health challenges.\n- **Share your story.** Your experience with diabetes can help others and strengthen your own sense of purpose.\n- **Support others.** Helping community members with their wellness journey strengthens your own resilience.\n- **Celebrate small victories.** Every healthy choice, every day of managed blood sugar, every step on the land is worth acknowledging.\n\nYou are not alone in this journey. Your community, your culture, and your traditions are sources of strength that no clinical intervention can replace.",
        keyTakeaways: [
          "Cultural connectedness is a protective factor against chronic disease",
          "Resilience is collective, rooted in culture, language, and community",
          "Language learning, ceremony, and Elder connection build resilience",
          "Sharing your story helps others and strengthens your own purpose",
        ],
      },
    ],
  },
  {
    id: 6,
    title: "Managing Your Diabetes",
    subtitle: "Blood sugar monitoring, medications, insulin, and creating your diabetes care plan.",
    color: "#5C7A5C",
    sections: [
      {
        title: "Blood Sugar Monitoring",
        content: "Monitoring your blood sugar (blood glucose) is one of the most important tools for managing diabetes. It tells you how your body is responding to food, activity, stress, and medication — and helps you and your healthcare team make informed decisions about your care.\n\n**How to check your blood sugar:**\n1. Wash your hands with warm water and soap\n2. Insert a test strip into your blood glucose meter\n3. Use the lancing device to prick the side of your fingertip\n4. Touch the edge of the test strip to the drop of blood\n5. Your meter will display your blood sugar level in a few seconds\n\n**Target blood sugar ranges** (general guidelines — your healthcare provider may set different targets for you):\n- Before meals: 4.0 to 7.0 mmol/L\n- Two hours after meals: 5.0 to 10.0 mmol/L\n- A1C (average over 2-3 months): 7.0% or less\n\n**Continuous Glucose Monitors (CGMs)** are devices that track blood sugar continuously through a small sensor under the skin. They provide real-time readings and alerts when blood sugar is too high or too low. CGMs are increasingly covered under NIHB for eligible First Nations and Inuit clients.\n\n**Keep a log** of your blood sugar readings, meals, activity, and how you're feeling. This information is invaluable for your healthcare team and helps you identify patterns.",
        keyTakeaways: [
          "Blood sugar monitoring helps you understand how food, activity, and stress affect your levels",
          "Target before meals: 4.0-7.0 mmol/L; after meals: 5.0-10.0 mmol/L",
          "CGMs are increasingly covered under NIHB for eligible clients",
          "Keeping a log helps identify patterns and informs your care plan",
        ],
      },
      {
        title: "Medications and Insulin",
        content: "Many people with Type 2 diabetes manage their condition with a combination of lifestyle changes and medication. It's important to understand that needing medication is not a failure — it means your body needs additional support.\n\n**Oral medications** (pills) work in different ways:\n- Some help your body make more insulin (e.g., glyburide, gliclazide)\n- Some help your body use insulin better (e.g., metformin)\n- Some slow down the absorption of carbohydrates (e.g., acarbose)\n- Some help your kidneys remove excess sugar (e.g., empagliflozin)\n\n**Metformin** is usually the first medication prescribed for Type 2 diabetes. It helps your body use insulin more effectively and is generally well-tolerated.\n\n**Insulin** may be needed if oral medications are not enough to control blood sugar. Insulin is not just for Type 1 diabetes — many people with Type 2 diabetes eventually need insulin as the condition progresses. This is a natural part of the disease process, not a personal failure.\n\n**Important medication tips:**\n- Take medications exactly as prescribed\n- Don't skip doses, even if you feel fine\n- Tell your healthcare provider about all medications you take, including traditional medicines\n- Report any side effects promptly\n- Store insulin properly (refrigerate unopened; room temperature once opened)\n- Never share needles or insulin pens\n\n**Coverage:** Most diabetes medications are covered under NIHB for eligible First Nations and Inuit clients. Provincial drug plans also provide coverage for many diabetes medications.",
        keyTakeaways: [
          "Needing medication is not a failure — it means your body needs support",
          "Metformin is usually the first medication prescribed for Type 2",
          "Many people with Type 2 eventually need insulin — this is normal",
          "Most diabetes medications are covered under NIHB for eligible clients",
        ],
      },
      {
        title: "Creating Your Diabetes Care Plan",
        content: "A diabetes care plan is a personalized roadmap for managing your health. It should be developed with your healthcare team and reflect your goals, values, and cultural practices.\n\nYour care plan should include:\n\n**Physical goals:** Blood sugar targets, medication schedule, meal planning approach, physical activity goals, and regular health check-ups (eyes, feet, kidneys, heart).\n\n**Emotional goals:** Strategies for managing stress and diabetes distress, support people you can talk to, and activities that bring you joy and peace.\n\n**Mental goals:** Learning objectives (understanding your medications, reading food labels, knowing your rights), and questions you want to ask your healthcare team.\n\n**Spiritual goals:** Cultural practices and ceremonies you want to maintain, time on the land, connection with Elders, and activities that nourish your spirit.\n\n**Your healthcare team** may include:\n- Family doctor or nurse practitioner\n- Diabetes educator\n- Dietitian\n- Pharmacist\n- Foot care specialist\n- Eye care specialist\n- Mental health counsellor\n- Traditional healer or Elder\n- Community health worker\n\nRemember: you are the most important member of your healthcare team. Your voice, your values, and your cultural practices should be at the centre of your care plan.",
        keyTakeaways: [
          "A care plan is a personalized roadmap developed with your healthcare team",
          "Include goals across all four dimensions: physical, emotional, mental, spiritual",
          "You are the most important member of your healthcare team",
          "Your cultural practices should be at the centre of your care plan",
        ],
        resources: [
          { label: "NIHB Coverage Information", url: "https://www.sac-isc.gc.ca/eng/1578079214611/1578079236012" },
          { label: "Diabetes Canada Clinical Guidelines", url: "https://www.diabetes.ca/health-care-providers/clinical-practice-guidelines" },
        ],
      },
    ],
  },
  {
    id: 7,
    title: "Navigating the Healthcare System",
    subtitle: "Understanding your rights, culturally safe care, NIHB coverage, and self-advocacy.",
    color: "#C8842A",
    sections: [
      {
        title: "Understanding Your Rights",
        content: "As an Indigenous person navigating the healthcare system, you have rights — and knowing them is essential for receiving the care you deserve.\n\n**The right to culturally safe care.** Healthcare providers have a responsibility to deliver care that respects your cultural identity, practices, and beliefs. You should never be required to abandon your cultural practices to receive healthcare.\n\n**The right to informed consent.** You have the right to understand any treatment, medication, or procedure before agreeing to it. This includes knowing the risks, benefits, and alternatives — in language you understand.\n\n**The right to refuse treatment.** You can say no to any treatment or procedure. Your healthcare provider should respect your decision and discuss alternatives.\n\n**The right to access your health records.** You can request copies of your medical records at any time.\n\n**The right to bring a support person.** You can bring a family member, Elder, or advocate to any healthcare appointment.\n\n**The right to file a complaint.** If you experience discrimination, disrespect, or unsafe care, you have the right to file a complaint with the healthcare facility, the provincial health authority, or the relevant regulatory body.\n\n**Jordan's Principle** ensures that First Nations children can access the health, social, and educational products, services, and supports they need when they need them. It applies to all First Nations children, whether they live on- or off-reserve.",
        keyTakeaways: [
          "You have the right to culturally safe care that respects your identity",
          "You can bring a support person to any healthcare appointment",
          "You have the right to informed consent and to refuse treatment",
          "Jordan's Principle ensures First Nations children access needed services",
        ],
      },
      {
        title: "Non-Insured Health Benefits (NIHB)",
        content: "The Non-Insured Health Benefits (NIHB) program provides coverage for a range of health benefits to eligible First Nations and Inuit clients who are not covered by other plans. For people with diabetes, NIHB can cover:\n\n**Medications:** Most diabetes medications, including insulin, metformin, and newer medications like SGLT2 inhibitors and GLP-1 receptor agonists.\n\n**Diabetes supplies:** Blood glucose meters, test strips, lancets, insulin syringes, insulin pen needles, and insulin pumps (with prior approval).\n\n**Continuous Glucose Monitors (CGMs):** Coverage for CGM devices and sensors has been expanding. Check with your regional NIHB office for current coverage.\n\n**Medical transportation:** Travel to medical appointments, including diabetes education programs, specialist visits, and hospital appointments.\n\n**Dental care:** Important for people with diabetes, as diabetes increases the risk of gum disease.\n\n**Vision care:** Eye exams and glasses — critical for early detection of diabetic retinopathy.\n\n**Mental health counselling:** Coverage for counselling services, including culturally appropriate mental health support.\n\n**How to access NIHB:**\n- You must be a registered First Nations person or recognized Inuit\n- Present your Status Card or Inuit beneficiary card at the pharmacy or healthcare provider\n- Some benefits require prior approval — your healthcare provider can submit the request\n- If a claim is denied, you have the right to appeal\n\nFor questions about NIHB coverage, call 1-866-225-0709 or visit the ISC website.",
        keyTakeaways: [
          "NIHB covers medications, supplies, CGMs, transportation, dental, vision, and counselling",
          "Present your Status Card or Inuit beneficiary card to access benefits",
          "Some benefits require prior approval — your provider can submit requests",
          "If a claim is denied, you have the right to appeal",
        ],
        resources: [
          { label: "NIHB Program Information", url: "https://www.sac-isc.gc.ca/eng/1578079214611/1578079236012" },
          { label: "NIHB Contact: 1-866-225-0709", url: "tel:18662250709" },
        ],
      },
      {
        title: "Advocating for Yourself and Your Community",
        content: "Self-advocacy is the practice of speaking up for your own needs, rights, and well-being within the healthcare system. It is not always easy — especially when you've experienced discrimination or dismissal — but it is essential.\n\n**Practical self-advocacy tips:**\n\n- **Prepare for appointments.** Write down your questions, concerns, and symptoms before you go. Bring your blood sugar log and medication list.\n- **Bring a support person.** A family member, friend, or community health worker can help you remember information and speak up if needed.\n- **Ask questions.** If you don't understand something, ask your provider to explain it in plain language. \"Can you explain that differently?\" is always a valid question.\n- **Request an interpreter.** If English is not your first language, you have the right to an interpreter.\n- **Document everything.** Keep copies of test results, prescriptions, and care plans.\n- **Know your coverage.** Understand what NIHB, your provincial plan, and any employer benefits cover.\n- **Report concerns.** If you experience racism, discrimination, or unsafe care, report it. You can file complaints with the healthcare facility, the provincial health authority, or the Canadian Human Rights Commission.\n\n**Community advocacy** is equally important. Supporting diabetes awareness in your community, sharing resources, volunteering with local health programs, and advocating for better healthcare services all contribute to systemic change.",
        keyTakeaways: [
          "Prepare for appointments with written questions and your blood sugar log",
          "You have the right to an interpreter and a support person",
          "Document everything — test results, prescriptions, care plans",
          "Community advocacy creates systemic change for everyone",
        ],
      },
    ],
  },
  {
    id: 8,
    title: "Living Well — Community & Support",
    subtitle: "Building your support circle, community resources, and next steps on your wellness journey.",
    color: "#2C2C2C",
    sections: [
      {
        title: "Building Your Support Circle",
        content: "Living well with diabetes is not a solo journey. Research consistently shows that people with strong social support have better health outcomes — including better blood sugar control, lower rates of complications, and improved mental health.\n\nYour support circle might include:\n\n**Family members** who understand your condition and support your wellness goals. Educating your family about diabetes helps them provide meaningful support — and may even inspire them to adopt healthier habits themselves.\n\n**Friends and peers** who are also managing diabetes. Peer support is incredibly powerful — knowing that someone else understands your experience reduces isolation and provides practical tips.\n\n**Community health workers** who can connect you with local programs, resources, and services. Many communities have diabetes educators, community health representatives (CHRs), and wellness workers.\n\n**Elders and knowledge keepers** who provide cultural guidance, spiritual support, and the wisdom of lived experience.\n\n**Healthcare providers** who respect your cultural identity and work with you as partners in your care.\n\n**Online communities** where you can connect with other Indigenous peoples managing diabetes, share experiences, and access information.\n\nDon't be afraid to ask for help. Reaching out is not a sign of weakness — it is a sign of wisdom.",
        keyTakeaways: [
          "Strong social support leads to better blood sugar control and mental health",
          "Your circle includes family, peers, community workers, Elders, and providers",
          "Peer support is incredibly powerful for reducing isolation",
          "Asking for help is a sign of wisdom, not weakness",
        ],
      },
      {
        title: "Community Resources and Programs",
        content: "Across Canada, there are hundreds of programs and services specifically designed to support Indigenous peoples with diabetes. Many of these are funded through the Aboriginal Diabetes Initiative (ADI) and delivered by Indigenous communities themselves.\n\n**Types of community programs:**\n\n- **Diabetes education programs** — offered by community health centres, friendship centres, and health authorities. These programs teach self-management skills in culturally safe environments.\n- **Traditional food programs** — community gardens, traditional harvesting programs, cooking classes featuring traditional recipes, and food sharing initiatives.\n- **Physical activity programs** — community walking groups, cultural fitness programs, land-based activity programs, and youth sports initiatives.\n- **Peer support groups** — diabetes support circles where community members share experiences, challenges, and successes.\n- **Mental health and wellness programs** — counselling services, healing circles, cultural camps, and Elder-led wellness programs.\n- **Mobile diabetes clinics** — in some regions, mobile clinics bring diabetes care directly to remote and rural communities.\n\n**How to find programs in your area:**\n- Contact your local community health centre or nursing station\n- Call NADA at (204) 927-1221 for referrals\n- Visit the NADA website (nada.ca) for regional services\n- Ask your healthcare provider about local programs\n- Contact your provincial or territorial health authority",
        keyTakeaways: [
          "Hundreds of ADI-funded programs exist across Canada",
          "Programs include education, traditional foods, physical activity, and peer support",
          "Contact NADA at (204) 927-1221 for referrals to programs in your area",
          "Mobile clinics bring care to remote and rural communities",
        ],
        resources: [
          { label: "NADA National Services", url: "https://nada.ca/national-services/" },
          { label: "NADA Regional Programs", url: "https://nada.ca" },
          { label: "Indigenous Diabetes Health Circle", url: "https://idhc.life" },
        ],
      },
      {
        title: "Next Steps on Your Wellness Journey",
        content: "You've completed the Healing Pathways course. This is not an ending — it's a beginning. Here are your next steps:\n\n**1. Create or update your diabetes care plan.** Use the Medicine Wheel framework from Module 2 to set goals across all four dimensions of wellness. Share your plan with your healthcare team.\n\n**2. Connect with your community.** Reach out to local diabetes programs, support groups, and community health workers. If none exist in your community, consider starting one.\n\n**3. Share what you've learned.** Knowledge is most powerful when it's shared. Talk to your family, friends, and community about what you've learned. You may inspire someone else to take their first step.\n\n**4. Access the resources.** Visit the Resource Directory on this site (indigenousdiabetes.ca) to explore organizations, toolkits, traditional wellness resources, and support services.\n\n**5. Take it one day at a time.** Diabetes management is a marathon, not a sprint. Some days will be harder than others. Be kind to yourself. Celebrate your progress. And remember — you are not alone.\n\n**6. Stay connected.** Bookmark this site, share it with others, and check back regularly as we continue to add new resources and update existing ones.\n\nMiigwech. Mahsi cho. Ekosi. Thank you for walking this path.",
        keyTakeaways: [
          "Create or update your care plan using the Medicine Wheel framework",
          "Connect with local programs and share what you've learned",
          "Visit the Resource Directory for organizations and support services",
          "Take it one day at a time — be kind to yourself",
        ],
      },
    ],
  },
];

// ─── Course Page Component ────────────────────────────────────────────────────
export default function Course() {
  const params = useParams<{ moduleId?: string }>();
  const moduleId = params.moduleId ? parseInt(params.moduleId) : null;
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedModule, setExpandedModule] = useState<number | null>(moduleId || 1);
  const contentRef = useRef<HTMLDivElement>(null);

  const activeModule = moduleId ? MODULES.find(m => m.id === moduleId) : null;

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [moduleId]);

  useEffect(() => {
    if (moduleId) setExpandedModule(moduleId);
  }, [moduleId]);

  // ─── Course Overview (no module selected) ─────────────────────────────
  if (!activeModule) {
    return (
      <div style={{ background: "#FAF8F5", minHeight: "100vh" }}>
        {/* Header */}
        <nav style={{ background: "rgba(26,18,8,0.97)", backdropFilter: "blur(8px)", borderBottom: "1px solid rgba(200,132,42,0.2)", padding: "0 2rem", position: "sticky", top: 0, zIndex: 100 }}>
          <div style={{ maxWidth: "1320px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: "68px" }}>
            <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.75rem", textDecoration: "none" }}>
              <ArrowLeft size={18} style={{ color: "#E8C97A" }} />
              <img src={ASSETS.logo} alt="Logo" style={{ width: "36px", height: "36px", objectFit: "contain" }} />
              <div>
                <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: "0.95rem", color: "#FAF8F5", lineHeight: 1.2 }}>Healing Pathways</div>
                <div className="label-tag" style={{ color: "#E8C97A", fontSize: "0.55rem" }}>Course Overview</div>
              </div>
            </Link>
            <a href="https://course.indigenousdiabetes.ca" target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", background: "#A0522D", color: "white", padding: "0.55rem 1.25rem", borderRadius: "2px", textDecoration: "none" }}>
              Start on LearnDash
            </a>
          </div>
        </nav>

        {/* Hero */}
        <section style={{ padding: "5rem 2rem 4rem", background: "linear-gradient(180deg, #1A1208 0%, #2C1A0E 100%)" }}>
          <div style={{ maxWidth: "900px", margin: "0 auto", textAlign: "center" }}>
            <span className="label-tag" style={{ color: "#E8C97A" }}>Free &middot; Self-Paced &middot; 8 Modules</span>
            <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(2.5rem, 5vw, 4rem)", color: "#FAF8F5", lineHeight: 1.15, margin: "1rem 0 1.5rem" }}>
              Healing Pathways:<br /><em style={{ color: "#E8C97A" }}>Indigenous Diabetes Wellness</em>
            </h1>
            <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "1.1rem", color: "rgba(250,248,245,0.8)", lineHeight: 1.75, maxWidth: "600px", margin: "0 auto" }}>
              A culturally grounded learning experience for community members, health workers, and caregivers. Eight modules covering everything from understanding diabetes to community support and living well.
            </p>
          </div>
        </section>

        {/* Module Grid */}
        <section style={{ padding: "4rem 2rem 6rem" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "1.5rem" }}>
              {MODULES.map(mod => (
                <Link key={mod.id} href={`/course/${mod.id}`} style={{ textDecoration: "none" }}>
                  <div style={{
                    background: "white", borderLeft: `4px solid ${mod.color}`, padding: "2rem",
                    borderRadius: "0 4px 4px 0", boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                    transition: "box-shadow 0.2s, transform 0.2s", cursor: "pointer", height: "100%",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.12)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.06)"; e.currentTarget.style.transform = "translateY(0)"; }}
                  >
                    <div style={{ display: "flex", alignItems: "baseline", gap: "0.75rem", marginBottom: "0.75rem" }}>
                      <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: "2rem", color: mod.color, lineHeight: 1, opacity: 0.4 }}>{mod.id}</span>
                      <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.2rem", color: "#2C2C2C", lineHeight: 1.3 }}>{mod.title}</h3>
                    </div>
                    <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.9rem", color: "#666", lineHeight: 1.6, marginBottom: "1rem" }}>{mod.subtitle}</p>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
                      <span className="label-tag" style={{ color: "#A0522D" }}>{mod.sections.length} sections</span>
                      <ArrowRight size={14} style={{ color: "#A0522D" }} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    );
  }

  // ─── Module Detail View ───────────────────────────────────────────────
  const prevModule = MODULES.find(m => m.id === activeModule.id - 1);
  const nextModule = MODULES.find(m => m.id === activeModule.id + 1);

  return (
    <div style={{ background: "#FAF8F5", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Top Bar */}
      <nav style={{ background: "rgba(26,18,8,0.97)", backdropFilter: "blur(8px)", borderBottom: "1px solid rgba(200,132,42,0.2)", padding: "0 2rem", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", height: "60px", gap: "1rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <button className="lg:hidden" onClick={() => setSidebarOpen(!sidebarOpen)} style={{ background: "none", border: "none", color: "#FAF8F5", padding: "0.25rem" }}>
              {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
            <Link href="/course" style={{ display: "flex", alignItems: "center", gap: "0.6rem", textDecoration: "none" }}>
              <ArrowLeft size={16} style={{ color: "#E8C97A" }} />
              <img src={ASSETS.logo} alt="Logo" style={{ width: "32px", height: "32px", objectFit: "contain" }} />
              <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: "0.9rem", color: "#FAF8F5" }}>Healing Pathways</span>
            </Link>
          </div>
          <div style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.85rem", color: "rgba(250,248,245,0.6)" }}>
            Module {activeModule.id} of {MODULES.length}
          </div>
        </div>
      </nav>

      <div style={{ display: "flex", flex: 1 }}>
        {/* Sidebar */}
        <aside className={`course-sidebar ${sidebarOpen ? "open" : ""}`} style={{
          width: "320px", minWidth: "320px", background: "#1A1208", borderRight: "1px solid rgba(200,132,42,0.15)",
          overflowY: "auto", position: "sticky", top: "60px", height: "calc(100vh - 60px)",
        }}>
          <div style={{ padding: "1.5rem 1rem" }}>
            <div className="label-tag" style={{ color: "#E8C97A", marginBottom: "1.25rem", paddingLeft: "0.5rem" }}>Course Modules</div>
            {MODULES.map(mod => (
              <div key={mod.id} style={{ marginBottom: "0.25rem" }}>
                <button onClick={() => setExpandedModule(expandedModule === mod.id ? null : mod.id)} style={{
                  width: "100%", display: "flex", alignItems: "center", gap: "0.75rem",
                  padding: "0.75rem 0.5rem", background: mod.id === activeModule.id ? "rgba(160,82,45,0.15)" : "transparent",
                  border: "none", borderRadius: "4px", textAlign: "left", transition: "background 0.15s",
                }}>
                  <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.1rem", color: mod.id === activeModule.id ? "#E8C97A" : "rgba(250,248,245,0.4)", lineHeight: 1, width: "1.5rem", textAlign: "center" }}>{mod.id}</span>
                  <span style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.85rem", fontWeight: 700, color: mod.id === activeModule.id ? "#FAF8F5" : "rgba(250,248,245,0.7)", flex: 1 }}>{mod.title}</span>
                  <ChevronDown size={14} style={{ color: "rgba(250,248,245,0.4)", transform: expandedModule === mod.id ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }} />
                </button>
                {expandedModule === mod.id && (
                  <div style={{ paddingLeft: "2.75rem", paddingBottom: "0.5rem" }}>
                    {mod.sections.map((sec, i) => (
                      <Link key={i} href={`/course/${mod.id}`} style={{ display: "block", fontFamily: "'Lato', sans-serif", fontSize: "0.8rem", color: "rgba(250,248,245,0.5)", textDecoration: "none", padding: "0.35rem 0", lineHeight: 1.4 }}>
                        {sec.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </aside>

        {/* Main Content */}
        <main ref={contentRef} style={{ flex: 1, overflowY: "auto" }}>
          {/* Module Header */}
          <div style={{ background: activeModule.color, padding: "3.5rem 3rem 3rem", position: "relative" }}>
            <div style={{ maxWidth: "800px" }}>
              <span className="label-tag" style={{ color: "rgba(250,248,245,0.6)" }}>Module {activeModule.id}</span>
              <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(2rem, 4vw, 3rem)", color: "#FAF8F5", lineHeight: 1.15, marginTop: "0.5rem", marginBottom: "1rem" }}>
                {activeModule.title}
              </h1>
              <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "1.05rem", color: "rgba(250,248,245,0.8)", lineHeight: 1.6 }}>
                {activeModule.subtitle}
              </p>
            </div>
          </div>

          {/* Sections */}
          <div style={{ maxWidth: "800px", padding: "3rem 3rem 4rem" }}>
            {activeModule.sections.map((section, sIdx) => (
              <article key={sIdx} style={{ marginBottom: "4rem" }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: "0.75rem", marginBottom: "1.5rem" }}>
                  <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.7rem", fontWeight: 700, color: activeModule.color, letterSpacing: "0.1em", opacity: 0.6 }}>{String(sIdx + 1).padStart(2, "0")}</span>
                  <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.8rem", color: "#2C2C2C", lineHeight: 1.25 }}>{section.title}</h2>
                </div>

                <div style={{ fontFamily: "'Lato', sans-serif", fontSize: "1.05rem", color: "#444", lineHeight: 1.85 }}>
                  {section.content.split("\n\n").map((para, pIdx) => {
                    if (para.startsWith("**") && para.includes("**")) {
                      const parts = para.split(/(\*\*.*?\*\*)/g);
                      return (
                        <p key={pIdx} style={{ marginBottom: "1.25rem" }}>
                          {parts.map((part, i) => {
                            if (part.startsWith("**") && part.endsWith("**")) {
                              return <strong key={i} style={{ color: "#2C2C2C", fontWeight: 700 }}>{part.slice(2, -2)}</strong>;
                            }
                            return <span key={i}>{part}</span>;
                          })}
                        </p>
                      );
                    }
                    if (para.startsWith("- ")) {
                      const items = para.split("\n").filter(l => l.startsWith("- "));
                      return (
                        <ul key={pIdx} style={{ marginBottom: "1.25rem", paddingLeft: "1.5rem" }}>
                          {items.map((item, i) => (
                            <li key={i} style={{ marginBottom: "0.5rem", color: "#444" }}>{item.slice(2)}</li>
                          ))}
                        </ul>
                      );
                    }
                    return <p key={pIdx} style={{ marginBottom: "1.25rem" }}>{para}</p>;
                  })}
                </div>

                {section.keyTakeaways && (
                  <div style={{ background: "#F2EDE4", borderLeft: `3px solid ${activeModule.color}`, padding: "1.5rem 1.75rem", borderRadius: "0 4px 4px 0", marginTop: "1.5rem" }}>
                    <div className="label-tag" style={{ color: activeModule.color, marginBottom: "0.75rem" }}>Key Takeaways</div>
                    {section.keyTakeaways.map((t, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem", marginBottom: "0.5rem" }}>
                        <CheckCircle size={16} style={{ color: activeModule.color, flexShrink: 0, marginTop: "3px" }} />
                        <span style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.92rem", color: "#444", lineHeight: 1.5 }}>{t}</span>
                      </div>
                    ))}
                  </div>
                )}

                {section.resources && (
                  <div style={{ marginTop: "1.5rem", display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
                    {section.resources.map(r => (
                      <a key={r.label} href={r.url} target="_blank" rel="noopener noreferrer" style={{
                        fontFamily: "'Lato', sans-serif", fontSize: "0.82rem", fontWeight: 700,
                        color: activeModule.color, textDecoration: "none", display: "inline-flex",
                        alignItems: "center", gap: "0.35rem", padding: "0.4rem 0.85rem",
                        border: `1px solid ${activeModule.color}33`, borderRadius: "2px",
                        transition: "background 0.15s",
                      }}
                      onMouseEnter={e => (e.currentTarget.style.background = `${activeModule.color}10`)}
                      onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                      >{r.label} <ExternalLink size={12} /></a>
                    ))}
                  </div>
                )}

                {sIdx < activeModule.sections.length - 1 && (
                  <hr style={{ border: "none", borderTop: "1px solid #E5DDD0", margin: "3rem 0 0" }} />
                )}
              </article>
            ))}

            {/* Module Navigation */}
            <div style={{ borderTop: "2px solid #E5DDD0", paddingTop: "2rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
              {prevModule ? (
                <Link href={`/course/${prevModule.id}`} style={{ display: "flex", alignItems: "center", gap: "0.5rem", textDecoration: "none", fontFamily: "'Lato', sans-serif", fontSize: "0.9rem", fontWeight: 700, color: "#A0522D" }}>
                  <ArrowLeft size={16} /> Module {prevModule.id}: {prevModule.title}
                </Link>
              ) : (
                <Link href="/course" style={{ display: "flex", alignItems: "center", gap: "0.5rem", textDecoration: "none", fontFamily: "'Lato', sans-serif", fontSize: "0.9rem", fontWeight: 700, color: "#A0522D" }}>
                  <ArrowLeft size={16} /> Course Overview
                </Link>
              )}
              {nextModule ? (
                <Link href={`/course/${nextModule.id}`} style={{ display: "flex", alignItems: "center", gap: "0.5rem", textDecoration: "none", fontFamily: "'Lato', sans-serif", fontSize: "0.9rem", fontWeight: 700, color: "#A0522D" }}>
                  Module {nextModule.id}: {nextModule.title} <ArrowRight size={16} />
                </Link>
              ) : (
                <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.5rem", textDecoration: "none", fontFamily: "'Lato', sans-serif", fontSize: "0.9rem", fontWeight: 700, color: "#A0522D" }}>
                  Back to Resource Hub <ArrowRight size={16} />
                </Link>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Mobile sidebar styles */}
      <style>{`
        @media (max-width: 1023px) {
          .course-sidebar {
            position: fixed !important;
            top: 60px !important;
            left: 0;
            z-index: 90;
            transform: translateX(-100%);
            transition: transform 0.3s ease;
            height: calc(100vh - 60px) !important;
          }
          .course-sidebar.open {
            transform: translateX(0);
          }
          main {
            padding-left: 0 !important;
          }
        }
        @media (max-width: 768px) {
          main > div:last-child {
            padding: 2rem 1.5rem 3rem !important;
          }
          main > div:first-child {
            padding: 2.5rem 1.5rem 2rem !important;
          }
        }
      `}</style>
    </div>
  );
}
