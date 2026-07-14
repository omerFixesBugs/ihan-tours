export interface DestinationDetails {
  overview: string;
  highlights: string[];
  bestTimeToVisit: string;
}

const detailsData: Record<"en" | "bn", Record<string, DestinationDetails>> = {
  en: {
    malaysia: {
      overview:
        "Malaysia offers an effortless blend of cultures — Malay, Chinese, and Indian traditions meet in a country of gleaming skylines, rainforest-clad highlands, and island coastlines. Kuala Lumpur's street food scene sits an hour from cool tea plantations, and a short flight puts you on the beaches of Langkawi or the dive sites of the East Coast.",
      highlights: [
        "The Petronas Twin Towers and KL's night markets",
        "Cool hill-station tea plantations in Cameron Highlands",
        "Island-hopping and diving around Langkawi",
        "A melting-pot food scene spanning three culinary traditions",
      ],
      bestTimeToVisit: "December to February, outside the monsoon season",
    },
    china: {
      overview:
        "China spans a scale few destinations can match — the Great Wall winding across ancient mountains, imperial palaces at the heart of Beijing, and modern megacities that never quite sleep. Group tours here are built around covering ground efficiently while still leaving room to slow down at the sites that matter.",
      highlights: [
        "Walking sections of the Great Wall of China",
        "The Forbidden City and Tiananmen Square in Beijing",
        "Terracotta Army and ancient capitals",
        "Modern Shanghai's skyline and riverside promenade",
      ],
      bestTimeToVisit: "September to November, for mild weather and clear skies",
    },
    thailand: {
      overview:
        "Thailand pairs the energy of Bangkok's street markets and temples with the slower pace of its southern islands. It's a country built for exactly the kind of trip most travelers want — a few days of city exploring, followed by beach time in Phuket or Krabi, all easy to combine into a single itinerary.",
      highlights: [
        "Bangkok's temples, palaces, and street food markets",
        "Longtail boat trips through Phuket and Krabi's limestone cliffs",
        "Island-hopping across the Andaman coast",
        "Warm hospitality and easy day trips outside the capital",
      ],
      bestTimeToVisit: "November to March, the cool and dry season",
    },
    maldives: {
      overview:
        "The Maldives is built almost entirely around its water — private overwater villas, lagoons in every shade of blue, and reefs close enough to snorkel from your own deck. It's a destination suited to slowing down completely, with very little need to plan beyond choosing which resort matches your idea of quiet.",
      highlights: [
        "Overwater villas with direct lagoon access",
        "Snorkeling and diving on coral reefs just offshore",
        "Private sandbank excursions and sunset cruises",
        "All-inclusive resort stays built around total relaxation",
      ],
      bestTimeToVisit: "November to April, the dry season with calm seas",
    },
  },
  bn: {
    malaysia: {
      overview:
        "মালয়েশিয়া মালয়, চীনা ও ভারতীয় সংস্কৃতির এক অনায়াস মিশ্রণ উপস্থাপন করে — উজ্জ্বল স্কাইলাইন, রেইনফরেস্টে ঢাকা পাহাড়ি এলাকা এবং দ্বীপের উপকূল নিয়ে গঠিত একটি দেশ। কুয়ালালামপুরের স্ট্রিট ফুডের দৃশ্য থেকে মাত্র এক ঘণ্টার দূরত্বে রয়েছে শীতল চা বাগান, আর অল্প সময়ের ফ্লাইটেই পৌঁছে যাওয়া যায় লংকাউইয়ের সৈকতে বা পূর্ব উপকূলের ডাইভিং স্পটে।",
      highlights: [
        "পেট্রোনাস টুইন টাওয়ার এবং কুয়ালালামপুরের নাইট মার্কেট",
        "ক্যামেরন হাইল্যান্ডসের শীতল চা বাগান",
        "লংকাউইয়ে দ্বীপ ভ্রমণ ও ডাইভিং",
        "তিনটি রন্ধনশৈলীর মিশ্রণে গড়া বৈচিত্র্যময় খাবারের দৃশ্য",
      ],
      bestTimeToVisit: "ডিসেম্বর থেকে ফেব্রুয়ারি, বর্ষা মৌসুমের বাইরে",
    },
    china: {
      overview:
        "চীনের বিশালতা খুব কম গন্তব্যের সাথেই তুলনা করা যায় — প্রাচীন পাহাড়ের মধ্য দিয়ে বিস্তৃত গ্রেট ওয়াল, বেইজিংয়ের কেন্দ্রে রাজকীয় প্রাসাদ, এবং আধুনিক মহানগরী যা কখনো ঘুমায় না। এখানকার গ্রুপ ট্যুরগুলো এমনভাবে সাজানো হয় যাতে দক্ষতার সাথে বেশি জায়গা ঘুরে দেখার পাশাপাশি গুরুত্বপূর্ণ স্থানগুলোতে সময় নিয়ে উপভোগ করা যায়।",
      highlights: [
        "চীনের মহাপ্রাচীরের অংশ ধরে হাঁটা",
        "বেইজিংয়ের নিষিদ্ধ শহর ও তিয়ানআনমেন স্কয়ার",
        "টেরাকোটা আর্মি ও প্রাচীন রাজধানীসমূহ",
        "আধুনিক সাংহাইয়ের স্কাইলাইন ও নদীতীরের প্রমেনেড",
      ],
      bestTimeToVisit: "সেপ্টেম্বর থেকে নভেম্বর, মৃদু আবহাওয়া ও পরিষ্কার আকাশের জন্য",
    },
    thailand: {
      overview:
        "থাইল্যান্ড ব্যাংককের স্ট্রিট মার্কেট ও মন্দিরের প্রাণবন্ততাকে দক্ষিণের দ্বীপগুলোর ধীর গতির সাথে একত্রিত করে। এটি এমন একটি দেশ যা ঠিক সেই ধরনের ভ্রমণের জন্য উপযুক্ত যা বেশিরভাগ ভ্রমণকারী চান — কয়েকদিন শহর ঘুরে দেখা, এরপর ফুকেট বা ক্রাবিতে সৈকতে সময় কাটানো, সবকিছু একটি মাত্র ভ্রমণ পরিকল্পনায় সহজেই মিলিয়ে নেওয়া যায়।",
      highlights: [
        "ব্যাংককের মন্দির, প্রাসাদ ও স্ট্রিট ফুড মার্কেট",
        "ফুকেট ও ক্রাবির চুনাপাথরের পাহাড়ের মধ্য দিয়ে লংটেল বোট ভ্রমণ",
        "আন্দামান উপকূল জুড়ে দ্বীপ ভ্রমণ",
        "রাজধানীর বাইরে সহজ দিনব্যাপী ভ্রমণ ও আন্তরিক আতিথেয়তা",
      ],
      bestTimeToVisit: "নভেম্বর থেকে মার্চ, শীতল ও শুষ্ক মৌসুম",
    },
    maldives: {
      overview:
        "মালদ্বীপ প্রায় সম্পূর্ণভাবে এর জলের চারপাশে গড়ে উঠেছে — ব্যক্তিগত ওয়াটার ভিলা, প্রতিটি ছায়ায় নীল লেগুন এবং নিজের ডেক থেকেই স্নরকেলিং করার মতো কাছাকাছি প্রবাল প্রাচীর। এটি সম্পূর্ণরূপে ধীর গতিতে সময় কাটানোর জন্য উপযুক্ত একটি গন্তব্য, যেখানে কোন রিসোর্ট আপনার নিরিবিলি সময়ের ধারণার সাথে মানানসই তা বেছে নেওয়া ছাড়া তেমন কিছু পরিকল্পনা করার প্রয়োজন নেই।",
      highlights: [
        "সরাসরি লেগুন প্রবেশাধিকারসহ ওয়াটার ভিলা",
        "উপকূলের কাছেই প্রবাল প্রাচীরে স্নরকেলিং ও ডাইভিং",
        "ব্যক্তিগত বালিয়াড়ি ভ্রমণ ও সূর্যাস্ত ক্রুজ",
        "সম্পূর্ণ বিশ্রামের জন্য গড়া অল-ইনক্লুসিভ রিসোর্ট অবস্থান",
      ],
      bestTimeToVisit: "নভেম্বর থেকে এপ্রিল, শান্ত সমুদ্রসহ শুষ্ক মৌসুম",
    },
  },
};

export function getDestinationDetails(
  slug: string,
  lang: "en" | "bn" = "en"
): DestinationDetails | null {
  const selectedLang = lang === "bn" ? "bn" : "en";
  return detailsData[selectedLang][slug] || detailsData.en[slug] || null;
}
