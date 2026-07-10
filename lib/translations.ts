export interface TranslationMap {
  [key: string]: any;
}

export const translations: Record<"en" | "bn", TranslationMap> = {
  en: {
    nav: {
      brand: "Ihan Tours",
      brand_sub: "and Travels",
      umrah: "Umrah",
      packages: "Packages",
      inbound: "Inbound",
      visa: "Visa",
      about_us: "About Us",
      chat: "Chat",
    },
    common: {
      view_details: "View Details",
      book_now: "Book Now",
      book_tour: "Book Your Tour",
      explore_more: "Explore More",
      contact_us: "Contact Us",
      nights: "Nights",
      days: "Days",
      reviews: "reviews",
      min_pax: "Min Pax",
      max_pax: "Max Pax",
      accommodation: "Accommodation",
      rating: "Rating",
      exclusive_offers_title: "Exclusive Offers Just for You",
    },
    footer: {
      our_services: "Our Services",
      quick_links: "Quick Links",
      get_in_touch: "Get in Touch",
      rights_reserved: "All rights reserved.",
      privacy_policy: "Privacy Policy",
      terms_of_service: "Terms of Service",
      email_us: "Email Us",
      office_address: "Office Address",
      address_val: "Ihan Tours and Travels — Dhaka, Bangladesh",
      phone_val: "+8801977242403",
      about_description:
        "Celebrate the Journey. Curated experiences and local expertise for the modern explorer. Your gateway to authentic adventures.",
      services_list: {
        umrah: "Umrah Packages",
        holiday: "Holiday Tours",
        ticketing: "Air Ticketing",
        visa: "Visa Processing",
        corporate: "Corporate Travel",
      },
      links_list: {
        about: "About Us",
        destinations: "Destinations",
        blog: "Travel Blog",
        contact: "Contact Us",
        terms: "Terms & Conditions",
      },
    },
    hero: {
      celebrate: "Celebrate",
      the_journey: "the Journey",
      discover: "Discover",
      holidays: "Holidays",
      expand: "Expand your",
      travel_horizons: "travel horizons",
      intro_body:
        "From curated group tours to private bespoke itineraries, we handle the details so you can focus on making unforgettable memories.",
      scroll_down: "Scroll down",
      to_start: "To start",
      the_journey_small: "the journey",
    },
    whyChooseUs: {
      title:
        'We make your travel <br><span class="text-brand-red"> experience unique</span>',
      subtitle: "Why Choose Us",
      description:
        "At Ihan Tours, we go beyond standard itineraries. We focus on curating exceptional experiences, ensuring every aspect of your journey is handled with precision, care, and a deep understanding of your travel aspirations.",
      btn_text: "More About Us",
    },
    trustStats: {
      rating: "Average traveler rating",
      travelers: "Happy travelers served",
      destinations: "Destinations worldwide",
      support: "Dedicated group support",
    },
    offers: {
      seasonal: "Seasonal",
      special_rate: "Special Rate",
      corporate: "Corporate",
      items: {
        summer: {
          title: "Summer Getaway Discounts",
          description:
            "Enjoy up to 15% off on our premium island packages when you book this summer.",
        },
        umrah: {
          title: "Family Umrah Package",
          description:
            "Special rates for families traveling together for Umrah. Includes premium accommodation near the Haram.",
        },
        corporate: {
          title: "Corporate Retreats",
          description:
            "Book a group of 10 or more and receive complimentary airport lounge access and private transfers.",
        },
      },
    },
    expertSolutions: {
      title: "Expert Solutions for Your Needs",
      sacred_umrah: "Sacred Umrah Journeys",
      sacred_umrah_body:
        "Meticulously planned Umrah packages designed to provide comfort, guidance, and peace of mind throughout your pilgrimage.",
      corporate: "Corporate Retreats & Groups",
      corporate_body:
        "Elevate your team's experience with our expertly curated corporate travel and bespoke group tour packages.",
      inbound: "Authentic Inbound Tours",
      inbound_body:
        "Discover the hidden gems, rich heritage, and vibrant culture of Bangladesh through our guided local experiences.",
      view_packages: "View Packages",
      contact_advisor: "Contact Advisor",
      get_quote: "Get a Quote",
      explore_bangladesh: "Explore Bangladesh",
    },
    featuredDestinations: {
      title: "Featured Destinations",
      description:
        "Explore our most sought-after holiday and spiritual spots across the globe.",
      items: {
        umrah:
          "Embark on a deeply spiritual journey. Our tailored Umrah packages ensure your focus remains entirely on your devotion and peace.",
        malaysia:
          "Experience the vibrant blend of cultures, lush rainforests, and modern cityscapes in the heart of Southeast Asia.",
        china:
          "Walk through history along the Great Wall and explore the majestic palaces of ancient dynasties in our curated group tours.",
        thailand:
          "From the bustling streets of Bangkok to the serene turquoise waters of Phuket, immerse yourself in the Land of Smiles.",
        maldives:
          "Escape to private luxury villas suspended over crystal-clear waters. The ultimate island retreat for relaxation and romance.",
      },
    },
    flyAnywhere: {
      title: "Fly anywhere",
      global: "Global",
      book_flight: "Book the Flight",
      cities: {
        paris: "Paris",
        toronto: "Toronto",
        miami: "Miami",
        bangkok: "Bangkok",
        melbourne: "Melbourne",
        london: "London",
        seoul: "Seoul",
        sydney: "Sydney",
        tokyo: "Tokyo",
        dubai: "Dubai",
        new_york: "New York",
        rome: "Rome",
      },
    },
    testimonials: {
      title:
        'Loved by groups & <br><span class="text-brand-red"> families alike</span>',
      subtitle: "Voice of Satisfaction",
      items: {
        rahim: {
          name: "Rahim Uddin",
          designation: "Managing Director",
          company: "Alpha Group",
          content:
            "Ihan Tours arranged our corporate retreat to Malaysia flawlessly. From flights to accommodations, every detail was handled with utmost professionalism. Highly recommended for seamless travel.",
        },
        ayesha: {
          name: "Ayesha Rahman",
          designation: "Marketing Head",
          company: "Tech Innovations",
          content:
            "Our family's Umrah trip was spiritually uplifting and incredibly comfortable, all thanks to the meticulous planning by the Ihan Tours team. They truly care about their clients.",
        },
        kamal: {
          name: "Kamal Hasan",
          designation: "CEO",
          company: "Prime Builders",
          content:
            "We have relied on Ihan Tours for our executive business travels for years. Their visa processing and ticketing services are swift and reliable, giving us total peace of mind.",
        },
      },
    },
    tourShowcase: {
      better_way: "A BETTER WAY TO FLY",
      book_flight: "Book the Flight",
      elevate_expectations: "Elevate Your Expectations",
      journey_continues: "Your Journey Continues",
      explore_world: "Explore the World",
      explore_world_desc:
        "From hidden coastlines and pristine island shores to dramatic mountain peaks and secluded retreats — every singular destination is meticulously curated to redefine your perspective of premium private travel.",
      immersive_exp: "Immersive Experiences",
      curated_discoveries: "Curated Discoveries",
      curated_discoveries_desc:
        "Go beyond the pages of traditional guidebooks. We weave authentic, private cultural encounters, behind-the-scenes guided tours, and exclusive VIP access into personalized itineraries designed exclusively for the discerning explorer.",
      end_to_end: "End-to-End Service",
      seamless_travel: "Seamless Travel",
      seamless_travel_desc:
        "Enjoy complete peace of mind with our end-to-end luxury concierge team. From custom private jet charters and chauffeur transfers to luxury villa bookings and local guides, we ensure a seamless and frictionless global journey.",
      accordion: {
        pets: {
          title: "Pets",
          content:
            "Traveling with pets on a private jet means comfort and peace of mind for both owners and their companions. Our dedicated team ensures seamless arrangements, from documentation and safety to onboard care, so that your pet enjoys the same level of attention and luxury as you do.",
        },
        availability: {
          title: "24/7 Availability",
          content:
            "Our global concierge team is ready at a moment's notice to arrange your charter. Whether it's a last-minute business trip or a sudden weekend getaway, we ensure an aircraft is prepared and waiting for you anywhere in the world.",
        },
        services: {
          title: "Onboard Services",
          content:
            "Experience Michelin-star dining, premium beverages, and bespoke entertainment options tailored entirely to your preferences. Every flight is curated to your exact tastes by our dedicated cabin crew.",
        },
        efficient: {
          title: "Efficient",
          content:
            "Skip the lines, security queues, and layovers. Private travel minimizes your transit time, allowing you to fly direct to thousands of executive airports worldwide, getting you closer to your final destination faster.",
        },
      },
      callouts: {
        umrah: {
          eyebrow: "Spiritual Journey",
          title: "Umrah",
          body: "Umrah is not just a physical journey; it is a divine summons.",
        },
        malaysia: {
          eyebrow: "Southeast Asia",
          title: "Malaysia",
          body: "Known for its beaches, rainforests and mix of cultural influences.",
        },
        china: {
          eyebrow: "Heritage",
          title: "China",
          body: "Walk the Great Wall and wander imperial palaces across iconic destinations.",
        },
        thailand: {
          eyebrow: "Tropical Escape",
          title: "Thailand",
          body: "From golden temples in Bangkok to the turquoise islands of the south.",
        },
        maldives: {
          eyebrow: "Coastal",
          title: "Maldives",
          body: "Iconic harbours and sun-drenched coasts. The ultimate island retreat.",
        },
        bangladesh: {
          eyebrow: "Inbound",
          title: "Bangladesh",
          body: "Curated experiences and local expertise for the modern explorer.",
        },
      },
    },
    contactSection: {
      have_questions: "Have questions?",
      plan_departure:
        'Let\'s plan your <br/> <span class="text-brand-red">next departure!</span>',
      reach_out: "Reach out to us directly",
      description:
        "Have questions about our packages or want to customize your own tour? Our travel experts are here to help you craft the perfect itinerary.",
      email_us: "Email Us",
      office_address: "Office Address",
      send_message: "Send a Message",
      full_name: "Full Name",
      whatsapp_number: "WhatsApp Number",
      email_address: "Email Address",
      interested_service: "Interested Service",
      select_service: "Select a service...",
      umrah_pkg: "Umrah Package",
      holiday_tour: "Holiday Tour",
      visa_proc: "Visa Processing",
      air_ticketing: "Air Ticketing",
      your_message: "Your Message",
      message_placeholder: "Tell us about your travel plans...",
      sending: "Sending...",
      send_msg_btn: "Send Message",
      msg_sent: "Message Sent!",
      msg_success_desc:
        "Thank you for reaching out. Our team will contact you shortly.",
    },
    aboutPage: {
      title: "Our Story",
      subtitle: "Ihan Tours and Travels",
      heading: "Crafting Unforgettable Memories Since Inception",
      p1: "Ihan Tours and Travels was founded on a simple principle: travel should be transformative, seamless, and deeply personal. We recognized that modern travelers seek more than just a ticket and a hotel; they seek an experience curated to their specific desires.",
      p2: "Whether you are embarking on a sacred Umrah pilgrimage, exploring the serene landscapes of Bangladesh, or retreating to a luxury island resort, our dedicated team of travel experts is committed to handling every detail with precision and care.",
    },
    inboundPage: {
      title: "Discover Bangladesh",
      subtitle: "Inbound Tours",
      description:
        "Experience the rich heritage, vibrant culture, and unparalleled natural beauty of Bangladesh. Our guided local experiences take you deep into the heart of the country, from the Sundarbans to the lush tea gardens of Sylhet.",
    },
    packagesPage: {
      title: "Global Escapes",
      subtitle: "Holiday Packages",
      description:
        "Expand your travel horizons with our curated international holiday packages. From the turquoise waters of the Maldives to the majestic Swiss Alps, we design unforgettable experiences tailored to your desires.",
    },
    umrahPage: {
      title: "Sacred Journeys",
      subtitle: "Umrah Packages",
      description:
        "Embark on a deeply spiritual journey with our meticulously planned Umrah packages. We ensure your focus remains entirely on your devotion and peace, while we handle the logistics, premium accommodations near the Haram, and comfortable transport.",
    },
    visaPage: {
      title: "Visa & Ticketing",
      subtitle: "Seamless Travel Prep",
      heading: "Hassle-Free Processing",
      description:
        "Navigating visa requirements can be complex and time-consuming. At Ihan Tours, our experienced consultants handle the paperwork, appointments, and follow-ups for major destinations worldwide.",
      bullets: [
        "Comprehensive document checking",
        "Appointment scheduling",
        "Form filling assistance",
        "Flight & Hotel itinerary generation for visas",
        "Competitive airfare ticketing",
      ],
    },
    popularPackages: {
      "maldives-luxury": {
        title: "Maldives Luxury Escape",
        location: "Maldives",
        description:
          "Experience the epitome of relaxation in private water villas, surrounded by azure lagoons and pristine beaches.",
        duration: "4 Nights 5 Days",
        price: "৳ 120,000",
        accommodation: "Resort",
      },
      "premium-umrah": {
        title: "Premium Umrah Experience",
        location: "Saudi Arabia",
        description:
          "A spiritually fulfilling journey with premium accommodations near the Haram, dedicated transport, and expert guidance.",
        duration: "14 Nights 15 Days",
        price: "৳ 165,000",
        accommodation: "5-Star Hotel",
      },
      "sylhet-eco": {
        title: "Sylhet Eco-Adventure",
        location: "Bangladesh",
        description:
          "Discover the lush tea gardens, serene wetlands, and vibrant local culture in this immersive eco-tour.",
        duration: "3 Nights 4 Days",
        price: "৳ 25,000",
        accommodation: "Eco-Resort",
      },
      "bali-retreat": {
        title: "Bali Cultural Retreat",
        location: "Indonesia",
        description:
          "Explore majestic temples, vibrant rice terraces, and beautiful beaches in this comprehensive Bali tour.",
        duration: "5 Nights 6 Days",
        price: "৳ 75,000",
        accommodation: "Villa",
      },
      "thailand-discovery": {
        title: "Thailand Discovery",
        location: "Thailand",
        description:
          "A perfect blend of city tours in Bangkok and relaxing beach days in Phuket and Krabi.",
        duration: "4 Nights 5 Days",
        price: "৳ 55,000",
        accommodation: "Hotel",
      },
      "sundarbans-safari": {
        title: "Sundarbans Wildlife Safari",
        location: "Bangladesh",
        description:
          "Navigate through the world's largest mangrove forest and witness diverse wildlife in their natural habitat.",
        duration: "2 Nights 3 Days",
        price: "৳ 18,000",
        accommodation: "Cruise Ship",
      },
      "dubai-city": {
        title: "Dubai City Escapade",
        location: "UAE",
        description:
          "Experience the ultimate modern luxury, from towering skyscrapers to desert safaris and premium shopping.",
        duration: "3 Nights 4 Days",
        price: "৳ 85,000",
        accommodation: "Hotel",
      },
      "short-umrah": {
        title: "Short Umrah Package",
        location: "Saudi Arabia",
        description:
          "A compact, highly organized Umrah package for those with limited time but seeking a fulfilling experience.",
        duration: "6 Nights 7 Days",
        price: "৳ 110,000",
        accommodation: "Hotel",
      },
      "swiss-alps": {
        title: "Swiss Alps Adventure",
        location: "Switzerland",
        description:
          "Breathtaking mountain views, scenic train rides, and charming alpine villages await you.",
        duration: "6 Nights 7 Days",
        price: "৳ 210,000",
        accommodation: "Lodge",
      },
    },
    heroScroll: {
      about_text:
        "Ihan Tours® is a private travel operator with over 5,000 journeys completed across 150+ countries. From international explorers to luxury seekers, our clients trust us to deliver unforgettable experiences, every time.",
      tagline:
        "Curated journeys for those who seek time, privacy, and unforgettable experiences.",
      what_we_offer: "What We Offer",
      private_group_tours: "Private & Group Tours",
      what_we_offer_desc:
        "Handcrafted itineraries across continents — from intimate escapes to grand expeditions, every detail planned for you.",
      why_choose_us: "Why Choose Us",
      travel_with_confidence: "Travel With Confidence",
      why_choose_us_desc:
        "Trusted local partners, transparent pricing, and round-the-clock support — so every mile of your journey feels effortless and secure.",
      local_expertise: "Local Expertise",
      expert_guides: "Expert Guides",
      local_expertise_desc:
        "Native guides who know every hidden trail, secret viewpoint, and cultural gem along your route.",
      unmatched_comfort: "Unmatched Comfort",
      vip_experiences: "VIP Experiences",
      unmatched_comfort_desc:
        "Enjoy exclusive access, private transfers, and luxury accommodations carefully selected to exceed your expectations.",
      global_reach: "Global Reach",
      destinations_count: "150+ Destinations",
      global_reach_desc:
        "From vibrant cityscapes to serene untouched landscapes, your dream destination is within our reach.",
      transcend_boundaries: "Transcend Boundaries",
      transcend_boundaries_desc:
        "From hidden coastlines to mountain retreats — every destination crafted to transform the way you travel.",
    },
    luxuryTransition: {
      travel_in: "Travel in",
      luxury: "Luxury",
      moves_with_you: "luxury\nthat moves\nwith you",
      description:
        "Every journey is engineered for comfort and precision — bespoke itineraries, private transfers, and handpicked destinations that let you arrive refreshed, every time.",
    },
    globe: {
      global_destinations: "Global Destinations",
      unrestricted_routing: "Unrestricted Routing",
      unrestricted_routing_desc:
        "From remote islands to cultural capitals — every path optimized for discovery beyond the ordinary.",
      begin_journey: "Begin Your Journey",
      flights_count: "5K+",
      flights: "flights",
      successfully_arranged: "Successfully Arranged",
      card_description:
        "Each journey reflects years of expertise, precision, and trust. From last-minute charters to intercontinental business routes — Ihan Tours ensures safety, discretion, and excellence in every flight.",
      destinations: {
        maldives: "Maldives",
        umrah: "Umrah",
        china: "China",
        thailand: "Thailand",
        malaysia: "Malaysia",
      },
    },
  },
  bn: {
    nav: {
      brand: "ইহান ট্যুরস",
      brand_sub: "অ্যান্ড ট্রাভেলস",
      umrah: "ওমরাহ",
      packages: "ছুটির প্যাকেজ",
      inbound: "দেশীয় ভ্রমণ",
      visa: "ভিসা",
      about_us: "আমাদের সম্পর্কে",
      chat: "চ্যাট করুন",
    },
    common: {
      view_details: "বিস্তারিত দেখুন",
      book_now: "বুক করুন",
      book_tour: "আপনার ট্যুর বুক করুন",
      explore_more: "আরও জানুন",
      contact_us: "যোগাযোগ করুন",
      nights: "রাত",
      days: "দিন",
      reviews: "রিভিউ",
      min_pax: "সর্বনিম্ন জন",
      max_pax: "সর্বোচ্চ জন",
      accommodation: "আবাসন",
      rating: "রেটিং",
      exclusive_offers_title: "শুধু আপনার জন্য বিশেষ অফার",
    },
    footer: {
      our_services: "আমাদের সেবাসমূহ",
      quick_links: "গুরুত্বপূর্ণ লিংক",
      get_in_touch: "যোগাযোগ করুন",
      rights_reserved: "সর্বস্বত্ব সংরক্ষিত।",
      privacy_policy: "গোপনীয়তা নীতি",
      terms_of_service: "সেবার শর্তাবলী",
      email_us: "ইমেইল করুন",
      office_address: "অফিসের ঠিকানা",
      address_val: "ইহান ট্যুরস অ্যান্ড ট্রাভেলস — ঢাকা, বাংলাদেশ",
      phone_val: "+৮৮০১৯৭৭২৪২৪০৩",
      about_description:
        "ভ্রমণের আনন্দ উদযাপন করুন। আধুনিক পর্যটকদের জন্য নিখুঁত পরিকল্পনা এবং স্থানীয় অভিজ্ঞতা। আপনার রোমাঞ্চকর অভিযানের প্রবেশদ্বার।",
      services_list: {
        umrah: "ওমরাহ প্যাকেজসমূহ",
        holiday: "ছুটির দিন ট্যুর",
        ticketing: "বিমান টিকিট",
        visa: "ভিসা প্রসেসিং",
        corporate: "কর্পোরেট ট্রাভেল",
      },
      links_list: {
        about: "আমাদের সম্পর্কে",
        destinations: "গন্তব্যসমূহ",
        blog: "ভ্রমণ ব্লগ",
        contact: "যোগাযোগ করুন",
        terms: "শর্তাবলী",
      },
    },
    hero: {
      celebrate: "উদযাপন করুন",
      the_journey: "ভ্রমণের আনন্দ",
      discover: "আবিষ্কার করুন",
      holidays: "ছুটির দিন",
      expand: "দিগন্ত প্রসারিত করুন",
      travel_horizons: "আপনার ভ্রমণের",
      intro_body:
        "কাস্টমাইজড গ্রুপ ট্যুর থেকে শুরু করে ব্যক্তিগত ভ্রমণ পরিকল্পনা পর্যন্ত, আমরা প্রতিটি বিষয়ের যত্ন নিই যাতে আপনি কেবল সুন্দর স্মৃতি তৈরিতে মনোনিবেশ করতে পারেন।",
      scroll_down: "নিচে স্ক্রোল করুন",
      to_start: "শুরু করতে",
      the_journey_small: "ভ্রমণ যাত্রা",
    },
    whyChooseUs: {
      title:
        'আমরা আপনার ভ্রমণকে করি <br><span class="text-brand-red"> অনন্য ও চমৎকার</span>',
      subtitle: "কেন আমাদের বেছে নেবেন",
      description:
        "ইহান ট্যুরস-এ আমরা সাধারণ ভ্রমণ পরিকল্পনার বাইরে গিয়ে কাজ করি। আমরা প্রতিটি যাত্রার খুঁটিনাটি যত্ন সহকারে এবং নিখুঁতভাবে পরিচালনা করি, যাতে আপনার স্বপ্নের ভ্রমণ বাস্তব রূপ পায় এবং আপনার আকাঙ্ক্ষা পূরণ হয়।",
      btn_text: "আমাদের সম্পর্কে আরও জানুন",
    },
    trustStats: {
      rating: "গড় ভ্রমণকারী রেটিং",
      travelers: "সন্তুষ্ট ভ্রমণকারী সেবা পেয়েছেন",
      destinations: "বিশ্বজুড়ে গন্তব্যসমূহ",
      support: "২৪/৭ ডেডিকেটেড সাপোর্ট",
    },
    offers: {
      seasonal: "মৌসুমি অফার",
      special_rate: "বিশেষ মূল্য",
      corporate: "কর্পোরেট",
      items: {
        summer: {
          title: "গ্রীষ্মকালীন ছুটির ডিসকাউন্ট",
          description:
            "এই গ্রীষ্মে বুকিং করলে আমাদের প্রিমিয়াম দ্বীপ প্যাকেজে ১৫% পর্যন্ত ছাড় উপভোগ করুন।",
        },
        umrah: {
          title: "পারিবারিক ওমরাহ প্যাকেজ",
          description:
            "একসাথে ওমরাহ যাত্রা করা পরিবারের জন্য বিশেষ মূল্য। হারামের কাছে প্রিমিয়াম আবাসন সুবিধা অন্তর্ভুক্ত।",
        },
        corporate: {
          title: "কর্পোরেট রিট্রিট",
          description:
            "১০ বা তার বেশি সদস্যের গ্রুপ বুকিং করে পান পরিপূরক এয়ারপোর্ট লাউঞ্জ সুবিধা এবং ব্যক্তিগত যাতায়াত ব্যবস্থা।",
        },
      },
    },
    expertSolutions: {
      title: "আপনার প্রয়োজনের জন্য বিশেষজ্ঞ সমাধান",
      sacred_umrah: "পবিত্র ওমরাহ যাত্রা",
      sacred_umrah_body:
        "আপনার ওমরাহ যাত্রায় সম্পূর্ণ আরাম, সঠিক দিকনির্দেশনা এবং মানসিক শান্তি প্রদানের জন্য অত্যন্ত সতর্কতার সাথে পরিকল্পিত ওমরাহ প্যাকেজসমূহ।",
      corporate: "কর্পোরেট রিট্রিট ও গ্রুপ ট্যুর",
      corporate_body:
        "আমাদের বিশেষভাবে পরিকল্পিত কর্পোরেট ট্রাভেল এবং কাস্টমাইজড গ্রুপ ট্যুর প্যাকেজের মাধ্যমে আপনার টিমের ভ্রমণ অভিজ্ঞতাকে নতুন উচ্চতায় নিয়ে যান।",
      inbound: "খাঁটি দেশীয় ভ্রমণ ট্যুর",
      inbound_body:
        "আমাদের গাইডেড লোকাল ট্যুরের মাধ্যমে বাংলাদেশের অপরূপ সৌন্দর্য, সমৃদ্ধ ঐতিহ্য এবং প্রাণবন্ত সংস্কৃতি নতুন করে আবিষ্কার করুন।",
      view_packages: "প্যাকেজ দেখুন",
      contact_advisor: "পরামর্শদাতার সাথে যোগাযোগ",
      get_quote: "বুকিং কোটেশন নিন",
      explore_bangladesh: "বাংলাদেশ ঘুরে দেখুন",
    },
    featuredDestinations: {
      title: "জনপ্রিয় গন্তব্যসমূহ",
      description:
        "সারা বিশ্বজুড়ে আমাদের সবচেয়ে জনপ্রিয় ছুটি এবং আধ্যাত্মিক ভ্রমণের গন্তব্যগুলো অন্বেষণ করুন।",
      items: {
        umrah:
          "একটি গভীর আধ্যাত্মিক যাত্রায় যাত্রা শুরু করুন। আমাদের বিশেষায়িত ওমরাহ প্যাকেজগুলো আপনার ভক্তি ও মানসিক শান্তি নিশ্চিত করবে।",
        malaysia:
          "দক্ষিণ-পূর্ব এশিয়ার প্রাণকেন্দ্রে সংস্কৃতি, ঘন রেইনফরেস্ট এবং আধুনিক শহরের প্রাণবন্ত মিশ্রণ উপভোগ করুন।",
        china:
          "আমাদের বিশেষায়িত গ্রুপ ট্যুরে গ্রেট ওয়াল ধরে ইতিহাসের পথে হাঁটুন এবং প্রাচীন রাজবংশের রাজকীয় প্রাসাদগুলো অন্বেষণ করুন।",
        thailand:
          "ব্যাংককের ব্যস্ত রাস্তা থেকে শুরু করে ফুকেট ও ক্রাবির শান্ত নীল জলরাশি পর্যন্ত, হাসির দেশে নিজেকে নিমজ্জিত করুন।",
        maldives:
          "স্ফটিকের মতো স্বচ্ছ পানির ওপরে ঝুলন্ত ব্যক্তিগত বিলাসবহুল ভিলায় হারিয়ে যান। আরাম এবং রোম্যান্সের জন্য এক অনন্য দ্বীপের অনুভূতি।",
      },
    },
    flyAnywhere: {
      title: "যেকোনো স্থানে উড়ুন",
      global: "বিশ্বব্যাপী",
      book_flight: "ফ্লাইট বুক করুন",
      cities: {
        paris: "প্যারিস",
        toronto: "টরোন্টো",
        miami: "মায়ামি",
        bangkok: "ব্যাংকক",
        melbourne: "মেলবোর্ন",
        london: "লন্ডন",
        seoul: "সিউল",
        sydney: "সিডনি",
        tokyo: "টোকিও",
        dubai: "দুবাই",
        new_york: "নিউ ইয়র্ক",
        rome: "রোম",
      },
    },
    testimonials: {
      title:
        'দলবদ্ধ ও পরিবারগুলোর <br><span class="text-brand-red"> পছন্দের ভ্রমণ অংশীদার</span>',
      subtitle: "সন্তুষ্টির বাণী",
      items: {
        rahim: {
          name: "রহিম উদ্দিন",
          designation: "ব্যবস্থাপনা পরিচালক",
          company: "আলফা গ্রুপ",
          content:
            "ইহান ট্যুরস মালয়েশিয়ায় আমাদের কর্পোরেট ট্রিপ চমৎকারভাবে আয়োজন করেছে। ফ্লাইট থেকে শুরু করে হোটেল বুকিং পর্যন্ত প্রতিটি বিবরণ অত্যন্ত পেশাদারিত্বের সাথে পরিচালনা করা হয়েছে। চমৎকার ভ্রমণের জন্য অত্যন্ত সুপারিশকৃত।",
        },
        ayesha: {
          name: "আয়েশা রহমান",
          designation: "বিপণন প্রধান",
          company: "টেক ইনোভেশনস",
          content:
            "ইহান ট্যুরস টিমের নিখুঁত পরিকল্পনার কারণে আমাদের পরিবারের ওমরাহ যাত্রাটি আধ্যাত্মিকভাবে ফলপ্রসূ এবং অবিশ্বাস্যভাবে আরামদায়ক ছিল। তারা সত্যিই তাদের গ্রাহকদের যত্ন নেয়।",
        },
        kamal: {
          name: "কামাল হাসান",
          designation: "প্রধান নির্বাহী কর্মকর্তা",
          company: "প্রাইম বিল্ডার্স",
          content:
            "আমরা বছরের পর বছর ধরে আমাদের নির্বাহী ব্যবসার ভ্রমণের জন্য ইহান ট্যুরসের ওপর নির্ভর করছি। তাদের ভিসা প্রসেসিং এবং টিকিট পরিষেবা অত্যন্ত দ্রুত ও নির্ভরযোগ্য, যা আমাদের সম্পূর্ণ মানসিক শান্তি দেয়।",
        },
      },
    },
    tourShowcase: {
      better_way: "ভ্রমণের এক অনন্য মাধ্যম",
      book_flight: "ফ্লাইট বুক করুন",
      elevate_expectations: "প্রত্যাশাকে নতুন উচ্চতায় নিয়ে যান",
      journey_continues: "আপনার যাত্রা চলমান",
      explore_world: "বিশ্ব অন্বেষণ করুন",
      explore_world_desc:
        "লুকানো উপকূল এবং আদিম দ্বীপের সৈকত থেকে শুরু করে নাটকীয় পর্বতশৃঙ্গ ও নির্জন রিট্রিট পর্যন্ত — প্রতিটি অনন্য গন্তব্য আপনার প্রিমিয়াম ব্যক্তিগত ভ্রমণের দৃষ্টিভঙ্গিকে নতুনভাবে সংজ্ঞায়িত করার জন্য যত্ন সহকারে তৈরি করা হয়েছে।",
      immersive_exp: "নিমজ্জিত করার মতো অভিজ্ঞতা",
      curated_discoveries: "বিশেষ আবিষ্কার",
      curated_discoveries_desc:
        "ঐতিহ্যবাহী গাইডবুকের পৃষ্ঠাগুলির বাইরে চলে যান। আমরা সচেতন ভ্রমণকারীদের জন্য একচেটিয়া ভিআইপি অ্যাক্সেস, নেপথ্যের নির্দেশিত ট্যুর এবং খাঁটি ব্যক্তিগত সাংস্কৃতিক মেলবন্ধনকে আপনার ব্যক্তিগতকৃত ভ্রমণসূচীতে নিখুঁতভাবে ফুটিয়ে তুলি।",
      end_to_end: "শুরু থেকে শেষ পর্যন্ত সেবা",
      seamless_travel: "ঝামেলাহীন ভ্রমণ",
      seamless_travel_desc:
        "আমাদের শুরু থেকে শেষ পর্যন্ত সেবা দেওয়ার মাধ্যমে সম্পূর্ণ মানসিক শান্তি উপভোগ করুন। কাস্টম প্রাইভেট জেট চার্টার এবং পেশাদার ড্রাইভার স্থানান্তর থেকে শুরু করে বিলাসবহুল ভিলা বুকিং এবং স্থানীয় গাইড সেবা সহ, আমরা একটি ঝামেলাহীন এবং নিরাপদ বৈশ্বিক যাত্রা নিশ্চিত করি।",
      accordion: {
        pets: {
          title: "পোষা প্রাণী",
          content:
            "ব্যক্তিগত জেটে পোষা প্রাণীদের সাথে ভ্রমণের অর্থ হলো মালিক এবং তাদের সঙ্গী উভয়ের জন্যই আরাম এবং মানসিক শান্তি। আমাদের ডেডিকেটেড টিম প্রয়োজনীয় কাগজপত্র ও নিরাপত্তা থেকে শুরু করে অনবোর্ড কেয়ার পর্যন্ত নিখুঁত ব্যবস্থা নিশ্চিত করে, যাতে আপনার প্রিয় পোষা প্রাণীটিও আপনার মতোই মনোযোগ এবং বিলাসিতা উপভোগ করতে পারে।",
        },
        availability: {
          title: "২৪/৭ উপলব্ধতা",
          content:
            "আমাদের বিশ্বব্যাপী সহায়তা দল আপনার বিমান বুকিংয়ের জন্য সর্বদা প্রস্তুত। এটি কোনো শেষ মুহূর্তের ব্যবসায়িক ট্রিপ হোক বা হঠাৎ ছুটির দিনের ভ্রমণ হোক, আমরা বিমানের প্রস্তুতি নিশ্চিত করি এবং বিশ্বের যেকোনো স্থানে আপনার জন্য বিমান প্রস্তুত রাখি।",
        },
        services: {
          title: "অনবোর্ড সেবাসমূহ",
          content:
            "আপনার পছন্দ অনুযায়ী মিশেলিন-স্টার ডাইনিং, প্রিমিয়াম পানীয় এবং বিশেষ বিনোদন সুবিধার অভিজ্ঞতা নিন। প্রতিটি ফ্লাইট আমাদের ডেডিকেটেড ক্রু দ্বারা আপনার রুচি অনুযায়ী কাস্টমাইজ করা হয়।",
        },
        efficient: {
          title: "দক্ষ ও দ্রুত",
          content:
            "লাইন, সিকিউরিটি কিউ এবং ট্রানজিট এড়িয়ে চলুন। ব্যক্তিগত ভ্রমণ আপনার যাতায়াতের সময় কমিয়ে দেয়, যা আপনাকে সরাসরি বিশ্বজুড়ে হাজার হাজার বিমানবন্দরে পৌঁছাতে সাহায্য করে এবং আপনার চূড়ান্ত গন্তব্যে দ্রুত নিয়ে যায়।",
        },
      },
      callouts: {
        umrah: {
          eyebrow: "আধ্যাত্মিক যাত্রা",
          title: "ওমরাহ",
          body: "ওমরাহ কেবল কোনো শারীরিক ভ্রমণ নয়; এটি একটি ঐশ্বরিক ডাক।",
        },
        malaysia: {
          eyebrow: "দক্ষিণ-পূর্ব এশিয়া",
          title: "মালয়েশিয়া",
          body: "সমুদ্র সৈকত, রেইনফরেস্ট এবং মিশ্র সংস্কৃতির জন্য সুপরিচিত।",
        },
        china: {
          eyebrow: "ঐতিহ্য ও ইতিহাস",
          title: "চীন",
          body: "গ্রেট ওয়ালে হাঁটুন এবং আইকনিক গন্তব্যগুলোর রাজকীয় প্রাসাদগুলো ঘুরে দেখুন।",
        },
        thailand: {
          eyebrow: "গ্রীষ্মমণ্ডলীয় অবকাশ",
          title: "থাইল্যান্ড",
          body: "ব্যাংককের সোনালী মন্দির থেকে শুরু করে দক্ষিণের নীল দ্বীপপুঞ্জ।",
        },
        maldives: {
          eyebrow: "উপকূলীয় স্বর্গ",
          title: "মালদ্বীপ",
          body: "আইকনিক বন্দর এবং রোদে ভেজা উপকূল। এক অনন্য দ্বীপের অনুভূতি।",
        },
        bangladesh: {
          eyebrow: "দেশীয় ভ্রমণ",
          title: "বাংলাদেশ",
          body: "আধুনিক ভ্রমণকারীদের জন্য বিশেষ পরিকল্পনা এবং স্থানীয় অভিজ্ঞতা।",
        },
      },
    },
    contactSection: {
      have_questions: "কোনো প্রশ্ন আছে?",
      plan_departure:
        'চলুন আপনার পরবর্তী <br/> <span class="text-brand-red">যাত্রা পরিকল্পনা করি!</span>',
      reach_out: "আমাদের সাথে সরাসরি যোগাযোগ করুন",
      description:
        "আমাদের প্যাকেজগুলো সম্পর্কে কোনো প্রশ্ন আছে অথবা নিজের মতো করে ট্যুর সাজাতে চান? আপনার নিখুঁত ভ্রমণ পরিকল্পনা করতে আমাদের বিশেষজ্ঞরা সাহায্য করবেন।",
      email_us: "আমাদের ইমেইল করুন",
      office_address: "অফিসের ঠিকানা",
      send_message: "বার্তা পাঠান",
      full_name: "পূর্ণ নাম",
      whatsapp_number: "হোয়াটসঅ্যাপ নম্বর",
      email_address: "ইমেইল ঠিকানা",
      interested_service: "আগ্রহী সেবা",
      select_service: "একটি সেবা নির্বাচন করুন...",
      umrah_pkg: "ওমরাহ প্যাকেজ",
      holiday_tour: "ছুটির দিন ট্যুর",
      visa_proc: "ভিসা প্রসেসিং",
      air_ticketing: "বিমান টিকেটিং",
      your_message: "আপনার বার্তা",
      message_placeholder: "আপনার ভ্রমণ পরিকল্পনা সম্পর্কে আমাদের বলুন...",
      sending: "পাঠানো হচ্ছে...",
      send_msg_btn: "বার্তা পাঠান",
      msg_sent: "বার্তা পাঠানো হয়েছে!",
      msg_success_desc:
        "যোগাযোগ করার জন্য আপনাকে ধন্যবাদ। আমাদের টিম শীঘ্রই আপনার সাথে যোগাযোগ করবে।",
    },
    aboutPage: {
      title: "আমাদের গল্প",
      subtitle: "ইহান ট্যুরস অ্যান্ড ট্রাভেলস",
      heading: "যাত্রার শুরু থেকেই অবিস্মরণীয় স্মৃতি তৈরি করে চলেছি",
      p1: "ইহান ট্যুরস অ্যান্ড ট্রাভেলস একটি সাধারণ নীতির ওপর ভিত্তি করে প্রতিষ্ঠিত হয়েছিল: ভ্রমণ হওয়া উচিত রূপান্তরকারী, ঝামেলাহীন এবং গভীরভাবে ব্যক্তিগত। আমরা উপলব্ধি করেছি যে আধুনিক ভ্রমণকারীরা কেবল একটি টিকিট এবং হোটেলের চেয়ে বেশি কিছু চান; তারা চান তাদের নির্দিষ্ট আকাঙ্ক্ষা অনুযায়ী তৈরি একটি সুন্দর অভিজ্ঞতা।",
      p2: "আপনি পবিত্র ওমরাহ পালনে যাত্রা করুন, বাংলাদেশের শান্ত প্রাকৃতিক সৌন্দর্য অন্বেষণ করুন, অথবা কোনো বিলাসবহুল দ্বীপের রিসোর্টে বিশ্রাম নিন। আমাদের নিবেদিত ভ্রমণ বিশেষজ্ঞ দল প্রতিটি খুঁটিনাটি বিষয় নির্ভুলতা ও যত্নের সাথে সামলাতে প্রতিশ্রুতিবদ্ধ।",
    },
    inboundPage: {
      title: "বাংলাদেশ আবিষ্কার করুন",
      subtitle: "দেশীয় ভ্রমণ ট্যুর",
      description:
        "বাংলাদেশের সমৃদ্ধ ঐতিহ্য, প্রাণবন্ত সংস্কৃতি এবং অতুলনীয় প্রাকৃতিক সৌন্দর্য উপভোগ করুন। আমাদের গাইডেড লোকাল ট্যুর আপনাকে দেশের হৃদয়ে নিয়ে যাবে, সুন্দরবন থেকে শুরু করে সিলেটের সবুজ চা বাগান পর্যন্ত।",
    },
    packagesPage: {
      title: "বিশ্বব্যাপী ভ্রমণ",
      subtitle: "ছুটির প্যাকেজসমূহ",
      description:
        "আমাদের বিশেষায়িত আন্তর্জাতিক ছুটির প্যাকেজগুলোর মাধ্যমে আপনার ভ্রমণের দিগন্ত প্রসারিত করুন। মালদ্বীপের নীল জলরাশি থেকে শুরু করে সুইজারল্যান্ডের আল্পস পর্বতমালা পর্যন্ত, আমরা আপনার ইচ্ছা অনুযায়ী অবিস্মরণীয় ভ্রমণ অভিজ্ঞতা ডিজাইন করি।",
    },
    umrahPage: {
      title: "পবিত্র যাত্রা",
      subtitle: "ওমরাহ প্যাকেজসমূহ",
      description:
        "আমাদের সতর্কতার সাথে পরিকল্পিত ওমরাহ প্যাকেজগুলোর সাথে একটি গভীর আধ্যাত্মিক যাত্রায় যাত্রা শুরু করুন। আমরা নিশ্চিত করি যে আপনার মনোযোগ যেন সম্পূর্ণভাবে আপনার ইবাদত এবং শান্তিতে থাকে, আর আমরা বাকি সমস্ত লজিস্টিকস, হারামের কাছাকাছি প্রিমিয়াম আবাসন এবং আরামদায়ক যাতায়াত ব্যবস্থা পরিচালনা করব।",
    },
    visaPage: {
      title: "ভিসা ও টিকেটিং",
      subtitle: "ঝামেলাহীন ভ্রমণ প্রস্তুতি",
      heading: "সহজ ও ঝামেলাহীন প্রসেসিং",
      description:
        "ভিসার নিয়মকানুন সামলানো জটিল এবং সময়সাপেক্ষ হতে পারে। ইহান ট্যুরস-এ আমাদের অভিজ্ঞ পরামর্শদাতারা বিশ্বজুড়ে প্রধান প্রধান গন্তব্যস্থলের জন্য কাগজপত্র, অ্যাপয়েন্টমেন্ট এবং ফলো-আপের কাজগুলো সামলে নেন।",
      bullets: [
        "সম্পূর্ণ নথিপত্র যাচাইকরণ",
        "অ্যাপয়েন্টমেন্ট নির্ধারণ",
        "ভিসা ফরম পূরণে সহায়তা",
        "ভিসার জন্য ফ্লাইট ও হোটেলের ভ্রমণসূচী তৈরি",
        "সাশ্রয়ী মূল্যে বিমান টিকিট সুবিধা",
      ],
    },
    popularPackages: {
      "maldives-luxury": {
        title: "মালদ্বীপ লাক্সারি এস্কেপ",
        location: "মালদ্বীপ",
        description:
          "নীল হ্রদ এবং আদিম সৈকত দ্বারা বেষ্টিত ব্যক্তিগত ওয়াটার ভিলায় আরামের চরম অভিজ্ঞতা লাভ করুন।",
        duration: "৪ রাত ৫ দিন",
        price: "৳ ১,২০,০০০",
        accommodation: "রিসোর্ট",
      },
      "premium-umrah": {
        title: "প্রিমিয়াম ওমরাহ অভিজ্ঞতা",
        location: "সৌদি আরব",
        description:
          "হারামের কাছে প্রিমিয়াম আবাসন, ডেডিকেটেড পরিবহন এবং বিশেষজ্ঞ গাইডেন্স সহ একটি আধ্যাত্মিক ও চমৎকার ওমরাহ যাত্রা।",
        duration: "১৪ রাত ১৫ দিন",
        price: "৳ ১,৬৫,০০০",
        accommodation: "৫-স্টার হোটেল",
      },
      "sylhet-eco": {
        title: "সিলেট ইকো-অ্যাডভেঞ্চার",
        location: "বাংলাদেশ",
        description:
          "এই আকর্ষণীয় ইকো-ট্যুরে সিলেটের সবুজ চা বাগান, শান্ত জলাভূমি এবং প্রাণবন্ত স্থানীয় সংস্কৃতি আবিষ্কার করুন।",
        duration: "৩ রাত ৪ দিন",
        price: "৳ ২৫,০০০",
        accommodation: "ইকো-রিসোর্ট",
      },
      "bali-retreat": {
        title: "বালি সাংস্কৃতিক রিট্রিট",
        location: "ইন্দোনেশিয়া",
        description:
          "বালির এই চমৎকার সফরে রাজকীয় মন্দির, প্রাণবন্ত ধানের ক্ষেত এবং সুন্দর সমুদ্র সৈকত অন্বেষণ করুন।",
        duration: "৫ রাত ৬ দিন",
        price: "৳ ৭৫,০০০",
        accommodation: "ভিলা",
      },
      "thailand-discovery": {
        title: "থাইল্যান্ড ডিসকভারি",
        location: "থাইল্যান্ড",
        description:
          "ব্যাংককে সিটি ট্যুর এবং ফুকেট ও ক্রাবিতে আরামদায়ক সৈকত ভ্রমণের এক নিখুঁত সংমিশ্রণ।",
        duration: "৪ রাত ৫ দিন",
        price: "৳ ৫৫,০০০",
        accommodation: "হোটেল",
      },
      "sundarbans-safari": {
        title: "সুন্দরবন ওয়াইল্ডলাইফ সাফারি",
        location: "বাংলাদেশ",
        description:
          "বিশ্বের বৃহত্তম ম্যানগ্রোভ বনের মধ্য দিয়ে ভ্রমণ করুন এবং তাদের প্রাকৃতিক আবাসে বৈচিত্র্যময় বন্যপ্রাণী প্রত্যক্ষ করুন।",
        duration: "২ রাত ৩ দিন",
        price: "৳ ১৮,০০০",
        accommodation: "ক্রুজ শিপ",
      },
      "dubai-city": {
        title: "দুবাই সিটি এস্কেপেড",
        location: "সংযুক্ত আরব আমিরাত",
        description:
          "উঁচু আকাশচুম্বী ভবন থেকে শুরু করে মরুভূমির সাফারি এবং প্রিমিয়াম শপিং পর্যন্ত আধুনিক বিলাসিতার অভিজ্ঞতা নিন।",
        duration: "৩ রাত ৪ দিন",
        price: "৳ ৮৫,০০০",
        accommodation: "হোটেল",
      },
      "short-umrah": {
        title: "সংক্ষিপ্ত ওমরাহ প্যাকেজ",
        location: "সৌদি আরব",
        description:
          "যাদের সময় সীমিত কিন্তু একটি সন্তোষজনক ওমরাহ করতে চান, তাদের জন্য একটি সংক্ষিপ্ত ও অত্যন্ত সুসংগঠিত ওমরাহ প্যাকেজ।",
        duration: "৬ রাত ৭ দিন",
        price: "৳ ১,১০,০০০",
        accommodation: "হোটেল",
      },
      "swiss-alps": {
        title: "সুইস আল্পস অ্যাডভেঞ্চার",
        location: "সুইজারল্যান্ড",
        description:
          "মনোমুগ্ধকর পাহাড়ি দৃশ্য, মনোরম ট্রেন ভ্রমণ এবং আকর্ষণীয় আলপাইন গ্রাম আপনার জন্য অপেক্ষা করছে।",
        duration: "৬ রাত ৭ দিন",
        price: "৳ ২,১০,০০০",
        accommodation: "লজ",
      },
    },
    heroScroll: {
      about_text:
        "ইহান ট্যুরস® একটি বেসরকারি ট্রাভেল অপারেটর যা ১৫০টিরও বেশি দেশে ৫,০০০টিরও বেশি সফল ভ্রমণ সম্পন্ন করেছে। আন্তর্জাতিক অভিযাত্রী থেকে শুরু করে বিলাসবহুল ভ্রমণপিপাসু সবাই প্রতিবার একটি অবিস্মরণীয় অভিজ্ঞতা পেতে আমাদের ওপর আস্থা রাখেন।",
      tagline:
        "যারা সময়, গোপনীয়তা এবং অবিস্মরণীয় অভিজ্ঞতা চান তাদের জন্য পরিকল্পিত ভ্রমণ।",
      what_we_offer: "আমাদের সেবা",
      private_group_tours: "ব্যক্তিগত ও গ্রুপ ট্যুর",
      what_we_offer_desc:
        "মহাদেশ জুড়ে সুপরিকল্পিত ভ্রমণপথ — রোমাঞ্চকর অ্যাডভেঞ্চার থেকে শুরু করে মহাজাগতিক অভিযান, প্রতিটি বিবরণ আপনার জন্য পরিকল্পিত।",
      why_choose_us: "কেন আমাদের বেছে নেবেন",
      travel_with_confidence: "আত্মবিশ্বাসের সাথে ভ্রমণ করুন",
      why_choose_us_desc:
        "বিশ্বস্ত স্থানীয় অংশীদার, স্বচ্ছ মূল্য নির্ধারণ এবং চব্বিশ ঘণ্টা সহায়তা — যাতে আপনার ভ্রমণের প্রতিটি মুহূর্ত নিরাপদ ও স্বাচ্ছন্দ্যময় হয়।",
      local_expertise: "স্থানীয় অভিজ্ঞতা",
      expert_guides: "অভিজ্ঞ গাইড",
      local_expertise_desc:
        "স্থানীয় গাইড যারা আপনার ভ্রমণের প্রতিটি গোপন পথ, অনন্য দৃষ্টিকোণ এবং সাংস্কৃতিক রত্ন সম্পর্কে অবগত।",
      unmatched_comfort: "অতুলনীয় আরাম",
      vip_experiences: "ভিআইপি অভিজ্ঞতা",
      unmatched_comfort_desc:
        "আপনার প্রত্যাশা ছাড়িয়ে যাওয়ার জন্য বিশেষভাবে নির্বাচিত একচেটিয়া প্রবেশাধিকার, ব্যক্তিগত স্থানান্তর এবং বিলাসবহুল আবাসন উপভোগ করুন।",
      global_reach: "বিশ্বব্যাপী বিস্তার",
      destinations_count: "১৫০+ গন্তব্য",
      global_reach_desc:
        "প্রাণবন্ত শহর থেকে শুরু করে শান্ত নির্জন প্রকৃতি, আপনার স্বপ্নের গন্তব্য আমাদের নাগালের মধ্যেই রয়েছে।",
      transcend_boundaries: "সীমানা ছাড়িয়ে",
      transcend_boundaries_desc:
        "লুকানো উপকূলরেখা থেকে পাহাড়ি অবকাশ — প্রতিটি গন্তব্য আপনার ভ্রমণের অভিজ্ঞতাকে রূপান্তর করার জন্য তৈরি।",
    },
    luxuryTransition: {
      travel_in: "ভ্রমণ করুন",
      luxury: "আভিজাত্য",
      moves_with_you: "বিলাসিতা\nযা চলে\nআপনার সাথে",
      description:
        "প্রতিটি যাত্রা আরাম এবং নিখুঁততার জন্য ডিজাইন করা হয়েছে — কাস্টমাইজড ভ্রমণপথ, ব্যক্তিগত স্থানান্তর এবং নির্বাচিত গন্তব্য যা আপনাকে প্রতিবার সতেজ রাখবে।",
    },
    globe: {
      global_destinations: "বিশ্বব্যাপী গন্তব্য",
      unrestricted_routing: "অবাধ রুট নির্ধারণ",
      unrestricted_routing_desc:
        "সুদূর দ্বীপ থেকে সাংস্কৃতিক রাজধানী — প্রতিটি পথ সাধারণের বাইরে নতুন কিছু আবিষ্কারের জন্য অপ্টিমাইজড।",
      begin_journey: "আপনার যাত্রা শুরু করুন",
      flights_count: "৫ হাজার+",
      flights: "ফ্লাইট",
      successfully_arranged: "সফলভাবে সম্পন্ন",
      card_description:
        "প্রতিটি যাত্রা বহু বছরের অভিজ্ঞতা, নিখুঁততা এবং বিশ্বাসের প্রতিফলন। শেষ মুহূর্তের বুকিং থেকে শুরু করে আন্তঃমহাদেশীয় ব্যবসায়িক রুট — ইহান ট্যুরস প্রতিটি ফ্লাইটে নিরাপত্তা ও শ্রেষ্ঠত্ব নিশ্চিত করে।",
      destinations: {
        maldives: "মালদ্বীপ",
        umrah: "ওমরাহ",
        china: "চীন",
        thailand: "থাইল্যান্ড",
        malaysia: "মালয়েশিয়া",
      },
    },
  },
};
