export interface ItineraryItem {
  day: number;
  title: string;
  description: string;
}

export interface AccommodationDetails {
  name: string;
  rating: string;
  type: string;
  details: string;
}

export interface PackageDetails {
  overview: string;
  highlights: string[];
  itinerary: ItineraryItem[];
  inclusions: string[];
  exclusions: string[];
  accommodation: AccommodationDetails;
}

const detailsData: Record<"en" | "bn", Record<string, PackageDetails>> = {
  en: {
    "maldives-luxury": {
      overview: "Experience the epitome of tropical luxury in the Maldives. Stay in a stunning overwater villa suspended over clear turquoise waters, enjoy private deck access directly to the sea, and indulge in gourmet beachside dining.",
      highlights: [
        "Private overwater villa with direct ocean access",
        "Guided snorkeling safari through vibrant coral reefs",
        "Curated 3-course private sunset beach dinner",
        "Premium speed boat airport transfers"
      ],
      itinerary: [
        { day: 1, title: "Arrival & Speedboat Escort", description: "Arrive at Velana International Airport, where our representative welcomes you and escorts you to your speed boat transfer. Enjoy a scenic 40-minute ride to the luxury resort. Check into your Overwater Villa and spend a peaceful evening watching the sunset." },
        { day: 2, title: "Snorkeling & Dolphin Safari", description: "Start the day with a delicious beach breakfast. Board a guided catamaran for a snorkeling safari to view exotic sea life, sea turtles, and coral gardens. In the afternoon, embark on a sunset dolphin cruise with refreshments." },
        { day: 3, title: "Spa & Sandbank Escape", description: "Indulge in a relaxing 60-minute massage at the overwater spa. In the afternoon, take a private boat excursion to a secluded white sandbank for swimming, photo sessions, and absolute relaxation." },
        { day: 4, title: "Private Beach Dining", description: "Enjoy a day of leisure. Walk along the beach, kayak in the lagoon, or swim. In the evening, a private chef will prepare a bespoke 3-course candlelit dinner on the beach just for you." },
        { day: 5, title: "Farewell Maldives", description: "Savor your final tropical breakfast, take a last dip in the ocean, and check out. Board the speed boat back to Male Airport for your flight home." }
      ],
      inclusions: [
        "4 Nights in an Overwater Pool Villa",
        "Daily Buffet Breakfast & Dinner (Half Board)",
        "Round-trip Speedboat Airport Transfers",
        "Snorkeling Equipment & Non-motorized Water Sports",
        "1 Sunset Dolphin Cruise & 60-min Spa Treatment"
      ],
      exclusions: [
        "International Airfare",
        "Daily Lunches & Alcoholic Beverages",
        "Travel Insurance & Green Tax ($6 USD per person per night)",
        "Personal expenses (Laundry, shopping, tips)"
      ],
      accommodation: {
        name: "Adaaran Prestige Vadoo / Similar Luxury Resort",
        rating: "5-Star Luxury",
        type: "Overwater Villa",
        details: "An award-winning boutique resort featuring glass-bottom bathroom floors, private plunge pools, and 24-hour butler service."
      }
    },
    "premium-umrah": {
      overview: "Embark on a spiritually fulfilling Umrah journey featuring VIP accommodations just steps from the Haram in Makkah and Madinah, private transportation, and experienced guides to facilitate your rituals.",
      highlights: [
        "VIP 5-Star accommodations adjacent to the Haram",
        "Comprehensive Umrah visa processing & health insurance",
        "Luxury private transfers between Makkah, Madinah, & airports",
        "Guided visits (Ziyarah) to historically significant Islamic sites"
      ],
      itinerary: [
        { day: 1, title: "Jeddah Arrival & Makkah Transfer", description: "Arrive at Jeddah International Airport, undergo immigration assistance, and board your private VIP car. Transfer to Makkah, check in to your hotel near the Haram, and perform your Umrah under the guidance of our local guide." },
        { day: 2, title: "Masjid al-Haram & Devotion", description: "Spend a full day in continuous prayer and devotion inside the Haram. Rest and enjoy five-star dining overlooking the Kaaba." },
        { day: 3, title: "Makkah Ziyarah Tour", description: "Guided tour to sacred locations including Mount Arafat, Mina, Muzdalifah, Jabal al-Nour (Ghar Hira), and Jabal Thawr, with historical explanations from an Islamic scholar." },
        { day: 4, title: "Second Umrah (Optional)", description: "Opportunity to visit Masjid Aisha (Taneem) to enter Ihram and perform a second Umrah for yourself or loved ones." },
        { day: 5, title: "Haramain High-Speed Train to Madinah", description: "Check out from Makkah, and travel in VIP class on the Haramain High-Speed Train to Madinah. Check in to your hotel situated steps away from Masjid an-Nabawi." },
        { day: 6, title: "Masjid an-Nabawi & Rawdah", description: "Spend the day praying at the Prophet's Mosque. Benefit from scheduled permits to pray in the sacred Rawdah Shareef." },
        { day: 7, title: "Madinah Ziyarah Tour", description: "Guided tour to Masjid Quba (first mosque in Islam), Mount Uhud (battle site), Masjid al-Qiblatayn, and dates market." },
        { day: 8, title: "Final Prayers & Departure", description: "Perform final prayers in Madinah, check out, and take a private vehicle transfer to Jeddah/Madinah Airport for your return flight." }
      ],
      inclusions: [
        "7 Nights Makkah Accommodation (Swissôtel Makkah / Similar)",
        "7 Nights Madinah Accommodation (Pullman Zamzam Madinah / Similar)",
        "Umrah Visa processing & Insurance",
        "Daily Buffet Breakfast",
        "Private VIP Transport throughout the trip",
        "Muallem/Guide support for Umrah rituals"
      ],
      exclusions: [
        "Return Flight Tickets (available as addon)",
        "Lunches and dinners",
        "Tips, laundry, and items of a personal nature"
      ],
      accommodation: {
        name: "Swissôtel Makkah & Pullman Madinah",
        rating: "5-Star Premium",
        type: "Luxury Rooms",
        details: "Direct access to the Haram courtyard in Makkah, and immediate walking distance to the Prophet's Mosque in Madinah, with superb hospitality."
      }
    },
    "sylhet-eco": {
      overview: "Discover the lush tea capital of Bangladesh. Engage in guided treks inside Lawachara National Park, enjoy boat cruises through the pristine Ratargul Swamp Forest, and relax at a premium eco-resort.",
      highlights: [
        "Traditional walks inside historic Sreemangal tea estates",
        "Guided canoe safari in Ratargul freshwater swamp forest",
        "Wildlife trekking in Lawachara (spot gibbons & rare flora)",
        "Stay in a sustainable, premium eco-lodge"
      ],
      itinerary: [
        { day: 1, title: "Dhaka to Sreemangal tea capital", description: "Drive or take a scenic train from Dhaka to Sreemangal. Check in to the premium eco-resort. In the afternoon, walk through lush tea gardens and taste the famous 7-layer tea." },
        { day: 2, title: "Lawachara Forest & Madhabpur Lake", description: "Embark on an early morning trek in Lawachara National Park to spot Hoolock Gibbons. Visit the Khasia tribal village inside the forest. In the afternoon, enjoy the scenic vistas at Madhabpur Lake." },
        { day: 3, title: "Ratargul Swamp Forest & Bisnakhandi", description: "Drive to Ratargul Swamp Forest. Ride a traditional wooden canoe to navigate the submerged trees. Later, visit Bisnakhandi, where hills from India's Meghalaya meet a crystal-clear river." },
        { day: 4, title: "Lalakhal & Return to Dhaka", description: "Check out and visit Lalakhal, famous for its emerald-green waters. Enjoy a boat ride to the Indian border point. In the evening, return to Dhaka." }
      ],
      inclusions: [
        "3 Nights at Grand Sultan Tea Resort / DuSai Eco Resort",
        "Traditional Sylheti Buffet Breakfast, Lunch & Dinner",
        "AC Private SUV for all transfers and sightseeing",
        "All forest entry permits, boat rentals, and local guide fees",
        "Dhaka-Sylhet return transfer"
      ],
      exclusions: [
        "Personal shopping & tips",
        "Extra beverages and room service bills",
        "Any entry fees not explicitly covered"
      ],
      accommodation: {
        name: "DuSai Resort & Spa / Grand Sultan",
        rating: "5-Star Eco Resort",
        type: "Villa / Premium Room",
        details: "Nestled in the hills of Sreemangal, featuring open-air jacuzzis, private lake access, and top-tier luxury amenities in nature."
      }
    },
    "bali-retreat": {
      overview: "Immerse yourself in Balinese spirituality and culture. Explore the volcanic landscapes, step onto historic terraced rice paddies, view grand ocean temples, and relax in a private luxury pool villa.",
      highlights: [
        "Private pool villa accommodation in Ubud and Seminyak",
        "Guided tour to Tanah Lot and Uluwatu cliff temples",
        "Sacred Monkey Forest & Tegalalang Rice Terrace walk",
        "Traditional Balinese spa treatment"
      ],
      itinerary: [
        { day: 1, title: "Bali Arrival & Ubud Check-In", description: "Arrive at Denpasar Airport. Meet your private driver and transfer to your luxury villa in Ubud, the cultural heart of Bali. Rest and adjust." },
        { day: 2, title: "Temples & Terraces", description: "Visit the stunning Tegalalang Rice Terraces. Walk through the Sacred Monkey Forest, followed by Ubud Palace. Catch a traditional Kecak dance show in the evening." },
        { day: 3, title: "Mount Batur Volcano & Holy Springs", description: "Travel to Kintamani for panoramic views of active volcano Mount Batur and its crater lake. Visit Tirta Empul Holy Water Temple to witness traditional purification rituals." },
        { day: 4, title: "Beach Club & Sunset Tanah Lot", description: "Transfer to Seminyak. Check in to your beachside villa. In the late afternoon, visit Tanah Lot temple, perched on a rock in the ocean, to capture a majestic sunset." },
        { day: 5, title: "Uluwatu Cliff & Spa Day", description: "Enjoy a morning of luxury spa pampering. In the afternoon, drive to Uluwatu Temple, situated on a dramatic 70-meter cliff. Enjoy a beachside seafood BBQ dinner at Jimbaran Bay." },
        { day: 6, title: "Departure", description: "Spend your morning shopping or swimming. Transfer to Denpasar airport for your departure flight." }
      ],
      inclusions: [
        "3 Nights Ubud Pool Villa & 2 Nights Seminyak Villa",
        "Daily Breakfast & 1 Jimbaran Seafood Dinner",
        "Private AC Car with English-speaking driver-guide",
        "All entrance tickets to temples, dance shows, and parks",
        "60-minute Balinese Aromatherapy Spa Treatment"
      ],
      exclusions: [
        "International Airfare",
        "Lunches and other Dinners",
        "Travel Insurance & Indonesia Visa fees (VOA $35 USD)",
        "Tips for guide/driver"
      ],
      accommodation: {
        name: "Komaneka at Bisma Ubud / The Samaya Seminyak",
        rating: "5-Star Luxury",
        type: "Private Pool Villa",
        details: "Surrounded by luxury gardens or gorgeous beaches, offering ultimate privacy, modern Balinese design, and top-tier butler service."
      }
    },
    "thailand-discovery": {
      overview: "Experience the perfect mix of bustling city life and tropical relaxation. Explore Bangkok's grand temples, shop in floating markets, and sunbathe on Phuket's pristine white beaches.",
      highlights: [
        "Bangkok Grand Palace & Wat Arun guided tour",
        "Traditional long-tail boat ride in Damnoen Saduak Floating Market",
        "Scenic speedboat tour to Phi Phi Islands",
        "Luxury beach resort accommodations"
      ],
      itinerary: [
        { day: 1, title: "Bangkok Arrival & Chao Phraya Cruise", description: "Arrive in Bangkok. Meet our representative and transfer to your luxury hotel. In the evening, enjoy a dinner cruise on the Chao Phraya River, viewing the lit-up Grand Palace." },
        { day: 2, title: "Temples & Floating Markets", description: "Visit the Grand Palace and the Emerald Buddha Temple. Take a trip to Damnoen Saduak Floating Market to shop directly from wooden boats." },
        { day: 3, title: "Flight to Phuket", description: "Fly from Bangkok to Phuket. Check in to your premium beach resort. Relax on the sandy Patong beach or enjoy local nightlife." },
        { day: 4, title: "Phi Phi Islands Tour", description: "Embark on an exciting speedboat tour to Phi Phi Islands. Swim in Maya Bay, snorkel in Pileh Lagoon, and see monkeys at Monkey Beach. Lunch included." },
        { day: 5, title: "Phuket Viewpoints & Spa", description: "Explore the Big Buddha, Karon Viewpoint, and Old Phuket Town. End the day with a relaxing traditional Thai massage." },
        { day: 6, title: "Departure", description: "Enjoy a final beach stroll, pack up, and transfer to Phuket International Airport for your flight home." }
      ],
      inclusions: [
        "2 Nights Bangkok & 3 Nights Phuket Premium Hotels",
        "Daily Buffet Breakfast & 2 Lunches",
        "Domestic Flight Ticket (Bangkok-Phuket)",
        "All transfers via private AC vehicle",
        "Speedboat tour to Phi Phi Islands with snorkeling gear"
      ],
      exclusions: [
        "International Airfare",
        "Lunches and dinners not listed in inclusions",
        "Thailand Visa fee",
        "Tips and personal expenses"
      ],
      accommodation: {
        name: "Centara Grand Bangkok & Marriott Phuket Resort",
        rating: "4.5-Star Premium",
        type: "Deluxe Ocean View Room",
        details: "Top-tier comfort, sky bars, rooftop dining in Bangkok, and private beach access in Phuket."
      }
    },
    "sundarbans-safari": {
      overview: "Adventure deep into the largest mangrove forest in the world. Traverse winding canals by boat, look for the elusive Royal Bengal Tiger, and observe saltwater crocodiles and herds of spotted deer.",
      highlights: [
        "Multi-day jungle cruise on a premium vessel",
        "Guided jungle walk through Kotka Wildlife Sanctuary",
        "Early morning silent wooden boat canal cruises",
        "Visit to Hiron Point for bird watching"
      ],
      itinerary: [
        { day: 1, title: "Khulna Boarding & Jungle Entry", description: "Board the safari ship at Khulna early morning. Sail down the Rupsha and Shibsha rivers. Enter the Sundarbans forest and dock near Harbaria forest station for your first forest walk." },
        { day: 2, title: "Kotka Wildlife Trail", description: "Arrive at Kotka. Walk through the dense forest trail to Kotka beach to observe herds of spotted deer, wild boars, and diverse birds. Take a small wooden boat into narrow canals for silent wildlife tracking." },
        { day: 3, title: "Kachikhali & Hiron Point", description: "Cruise to Kachikhali (Tiger Point) for a guided forest trek. Afternoon visit to Hiron Point, a crucial habitat for wild tigers, crocodiles, and large monitor lizards." },
        { day: 4, title: "Karamjal & Return to Khulna", description: "Visit Karamjal Deer Breeding Center and crocodile breeding project. Sail back to Khulna, arriving in the evening to disembark." }
      ],
      inclusions: [
        "3 Nights on a Premium AC Tourist Vessel (Private Cabin)",
        "All meals (Breakfast, lunch, dinner, snacks, tea/coffee)",
        "Jungle entry fees & armed forest guard escort security",
        "Experienced naturalist guide",
        "Small country boat hire for canal trips"
      ],
      exclusions: [
        "Travel to/from Khulna (customizable addon)",
        "Soft drinks and alcoholic beverages",
        "Tips for boat crew and guides"
      ],
      accommodation: {
        name: "M.V. The Wave / Premium Cruise Vessel",
        rating: "Premium Tourist Ship",
        type: "Private AC Cabin",
        details: "Clean cabins with attached toilets, observation deck, expert chefs onboard serving fresh local delicacies."
      }
    },
    "dubai-city": {
      overview: "Step into the city of the future. Marvel at the Burj Khalifa, embark on a thrilling desert safari with dune bashing and BBQ dinner, and shop at the world-renowned Dubai Mall.",
      highlights: [
        "Burj Khalifa 124th Floor Observation Deck entry",
        "4x4 Desert Safari with dune bashing & belly dance show",
        "Half-day Dubai city tour covering Palm Jumeirah & Marina",
        "Premium marina dhow dinner cruise"
      ],
      itinerary: [
        { day: 1, title: "Dubai Arrival & Dhow Dinner Cruise", description: "Arrive in Dubai. Transfer to your luxury hotel via private car. In the evening, enjoy a traditional Arabic Dhow cruise along Dubai Marina with dinner and music." },
        { day: 2, title: "City Tour & Burj Khalifa", description: "Explore Dubai’s historic and modern sites. Visit Palm Jumeirah, Atlantis, and Dubai Marina. In the afternoon, ascend the Burj Khalifa to the 124th floor for panoramic views." },
        { day: 3, title: "Desert Safari Adventure", description: "Sleep in. In the afternoon, board a 4x4 Land Cruiser. Experience thrilling dune bashing, camel riding, sandboarding, henna painting, and a delicious BBQ buffet dinner under the stars." },
        { day: 4, title: "Shopping & Leisure", description: "A day for shopping and leisure. Visit Dubai Mall, check out the aquarium, watch the Dubai fountain show, or explore the gold and spice souks." },
        { day: 5, title: "Departure", description: "Check out, take last-minute photos, and transfer to Dubai International Airport for your flight home." }
      ],
      inclusions: [
        "4 Nights in a 4-Star Premium Hotel (Downtown Dubai)",
        "Daily Buffet Breakfast & 2 Dinners",
        "All transfers via private AC car",
        "Burj Khalifa entry tickets & Desert Safari tour",
        "Dubai tourist visa processing"
      ],
      exclusions: [
        "International Airfare",
        "Lunches",
        "Tourism Dirham fee (approx. $5 USD per room per night, payable directly to hotel)",
        "Tips and personal spending"
      ],
      accommodation: {
        name: "Millennium Place Marina / Rove Downtown",
        rating: "4-Star Premium",
        type: "Deluxe City View Room",
        details: "Modern, chic hotels with swimming pools, gym, and proximity to prime shopping malls and metro stations."
      }
    },
    "short-umrah": {
      overview: "A highly optimized, shorter Umrah package designed for busy individuals. Stay in top hotels near the Haram and perform your pilgrimage with dedicated VIP transfers.",
      highlights: [
        "Optimized itinerary for busy professionals",
        "3-Star / 4-Star hotels close to Masjid al-Haram & Nabawi",
        "Fast track Umrah visa processing",
        "VIP airport transfers"
      ],
      itinerary: [
        { day: 1, title: "Jeddah Arrival & Umrah", description: "Arrive in Jeddah. Take a private VIP car to Makkah. Check in, and proceed to Masjid al-Haram to perform Umrah with our guide." },
        { day: 2, title: "Makkah Devotions", description: "Full day in Makkah for prayers and personal reflection at the Kaaba." },
        { day: 3, title: "Makkah Ziyarah & Madinah Transfer", description: "Short morning tour of Makkah's holy sites, then take a private car or high-speed train to Madinah. Check in." },
        { day: 4, title: "Madinah Devotions & Rawdah", description: "Perform prayers at Masjid an-Nabawi. Visit Rawdah Shareef (subject to permit timing)." },
        { day: 5, title: "Madinah Ziyarah & Departure", description: "Visit Masjid Quba and Mount Uhud, then transfer directly to Madinah/Jeddah Airport for your flight back." }
      ],
      inclusions: [
        "3 Nights Makkah Hotel (Anjum Hotel / Similar)",
        "3 Nights Madinah Hotel (Al Aqeeq Madinah / Similar)",
        "Umrah Visa processing & Health Insurance",
        "Daily Breakfast",
        "Private VIP Transport",
        "Umrah Guide service"
      ],
      exclusions: [
        "Return Airfare",
        "Meals not listed",
        "Personal expenses"
      ],
      accommodation: {
        name: "Anjum Hotel Makkah & Al Aqeeq Madinah",
        rating: "4-Star Quality",
        type: "Deluxe Room",
        details: "Very close to the Haram boundaries, excellent buffet breakfast, and spacious rooms."
      }
    },
    "swiss-alps": {
      overview: "Breathtaking landscapes, snowy peaks, and scenic train rides. Stay in Swiss alpine chalets, take cable cars up Mount Titlis, and walk the historic wooden Chapel Bridge in Lucerne.",
      highlights: [
        "Jungfraujoch - Top of Europe scenic train journey",
        "Mount Titlis rotating cable car ride with snow activities",
        "Lake Lucerne panoramic boat cruise",
        "Stay in charming Alpine lodges"
      ],
      itinerary: [
        { day: 1, title: "Zurich Arrival & Lucerne Transfer", description: "Arrive in Zurich. Board the scenic Swiss Rail to Lucerne. Check in to your alpine hotel, and walk across the historic 14th-century Chapel Bridge." },
        { day: 2, title: "Mount Titlis Snow Adventure", description: "Take the train to Engelberg. Ride the Titlis Rotair, the world’s first rotating cable car, to 3,020 meters. Walk the Titlis Cliff Bridge (highest suspension bridge in Europe) and play in the snow." },
        { day: 3, title: "Interlaken & Jungfraujoch", description: "Travel to Interlaken. Board the cogwheel train climbing up to Jungfraujoch (3,454m), the highest railway station in Europe. Experience the Ice Palace and views of the Aletsch Glacier." },
        { day: 4, title: "Lake Brienz Cruise & Lauterbrunnen", description: "Enjoy a morning boat cruise on the turquoise waters of Lake Brienz. In the afternoon, visit Lauterbrunnen, the valley of 72 waterfalls, and see Staubbach Falls." },
        { day: 5, title: "Zurich City Exploration", description: "Return to Zurich. Enjoy a city tour covering the historic Old Town, Bahnhofstrasse (prime shopping street), and Lake Zurich." },
        { day: 6, title: "Departure", description: "Enjoy a final Swiss chocolate breakfast, transfer to Zurich Airport via train, and board your departure flight." }
      ],
      inclusions: [
        "3 Nights Lucerne & 2 Nights Zurich Premium Chalets / Hotels",
        "Daily Continental Breakfast",
        "8-Day Swiss Travel Pass (Unlimited train, bus, and boat rides)",
        "Mount Titlis Cable Car & Jungfraujoch cogwheel train tickets",
        "Schengen Visa guidance documents"
      ],
      exclusions: [
        "International Airfare",
        "Lunch and Dinner",
        "Schengen Visa fee",
        "Tips and personal spending"
      ],
      accommodation: {
        name: "Hotel Monopol Lucerne & Hotel Schweizerhof Zurich",
        rating: "4.5-Star Luxury",
        type: "Chalet / City Room",
        details: "Charming historic hotels right in the city centers next to train stations, with stunning views of lake or city."
      }
    }
  },
  bn: {
    "maldives-luxury": {
      overview: "মালদ্বীপের গ্রীষ্মমন্ডলীয় স্বর্গরাজ্যে বিলাসিতার চরম অনুভূতি লাভ করুন। ক্রিস্টাল-স্বচ্ছ নীল পানির ওপরে অবস্থিত একটি চমৎকার ওয়াটার ভিলায় থাকুন, আপনার ব্যক্তিগত বারান্দা থেকে সরাসরি সাগরে নামুন এবং সুস্বাদু সমুদ্রতীরবর্তী খাবারের স্বাদ নিন।",
      highlights: [
        "সরাসরি সমুদ্রে নামার সুবিধাসহ ব্যক্তিগত ওয়াটার ভিলা",
        "রঙিন প্রবাল প্রাচীরের মধ্য দিয়ে গাইডেড স্নরকেলিং সাফারি",
        "সূর্যাস্তের সময়ে সমুদ্র সৈকতে ৩-কোর্সের ক্যান্ডেললাইট ডিনার",
        "প্রিমিয়াম স্পিডবোট এয়ারপোর্ট ট্রান্সফার"
      ],
      itinerary: [
        { day: 1, title: "মালদ্বীপে আগমন ও স্পিডবোট যাত্রা", description: "ভেলা জাতীয় বিমানবন্দরে অবতরণের পর আমাদের প্রতিনিধি আপনাকে স্বাগত জানাবেন এবং স্পিডবোটে পৌঁছে দেবেন। বিলাসবহুল রিসোর্টে ৪০ মিনিটের একটি চমৎকার স্পিডবোট রাইড উপভোগ করুন। ওয়াটার ভিলায় চেক-ইন করুন এবং সূর্যাস্ত দেখতে দেখতে একটি সুন্দর সন্ধ্যা কাটান।" },
        { day: 2, title: "স্নরকেলিং এবং ডলফিন সাফারি", description: "সমুদ্র সৈকতে সকালের নাস্তা দিয়ে দিনটি শুরু করুন। একটি গাইডেড ক্যাটামারানে চড়ে সমুদ্রের কচ্ছপ, রঙিন মাছ এবং প্রবাল বাগান দেখতে স্নরকেলিং সাফারিতে অংশ নিন। বিকেলে রিফ্রেশমেন্ট সহ একটি সূর্যাস্ত ডলফিন ক্রুজে যোগ দিন।" },
        { day: 3, title: "স্পা এবং বালিয়াড়ি ভ্রমণ", description: " his ওয়াটার স্পা-তে ৬০ মিনিটের একটি আরামদায়ক ম্যাসেজ উপভোগ করুন। বিকেলে একটি নির্জন সাদা বালিয়াড়িতে সুইমিং, ছবি তোলার সেশন এবং পূর্ণ বিশ্রামের জন্য একটি ব্যক্তিগত নৌকায় ভ্রমণ করুন।" },
        { day: 4, title: "ব্যক্তিগত সমুদ্র সৈকত ডাইনিং", description: "দিনের অবসর সময়টি নিজের মতো কাটান। সমুদ্র সৈকতে হাঁটুন, লেগুনে কায়াকিং করুন অথবা সাঁতার কাটুন। সন্ধ্যায় শুধুমাত্র আপনাদের জন্য সমুদ্র সৈকতে ক্যান্ডেললাইট ৩-কোর্সের ডিনার পরিবেশন করা হবে।" },
        { day: 5, title: "বিদায় মালদ্বীপ", description: "আপনার শেষ সকালের নাস্তা উপভোগ করুন, সমুদ্রে শেষবারের মতো ডুব দিন এবং চেকআউট করুন। মালে এয়ারপোর্টের উদ্দেশে স্পিডবোটে চড়ুন এবং দেশের পথে রওনা হোন।" }
      ],
      inclusions: [
        "৪ রাত একটি চমৎকার ওয়াটার পুল ভিলায় আবাসন",
        "প্রতিদিনের বুফে সকালের নাস্তা ও রাতের খাবার (হাফ বোর্ড)",
        "মালে এয়ারপোর্ট থেকে আসা-যাওয়ার স্পিডবোট ট্রান্সফার",
        "স্নরকেলিং গিয়ার এবং কায়াকিং সুবিধা",
        "১টি সূর্যাস্ত ডলফিন ক্রুজ এবং ৬০ মিনিটের স্পা ট্রিটমেন্ট"
      ],
      exclusions: [
        "আন্তর্জাতিক বিমান টিকিট",
        "দুপুরের খাবার এবং অ্যালকোহলযুক্ত পানীয়",
        "ভ্রমণ বীমা এবং গ্রিন ট্যাক্স (প্রতি রাতে জনপ্রতি ৬ ডলার)",
        "ব্যক্তিগত খরচ (লন্ড্রি, শপিং, বকশিস)"
      ],
      accommodation: {
        name: "আদারান প্রেস্টিজ ভাদু / সমমানের বিলাসবহুল রিসোর্ট",
        rating: "৫-স্টার লাক্সারি",
        type: "ওয়াটার ভিলা",
        details: "কাঁচের মেঝে বিশিষ্ট বাথরুম, ব্যক্তিগত পুল এবং ২৪ ঘণ্টা বাটলার সার্ভিস সহ একটি পুরস্কারপ্রাপ্ত বুটিক রিসোর্ট।"
      }
    },
    "premium-umrah": {
      overview: "মক্কা ও মদিনায় হারাম শরীফের ঠিক কাছেই ভিআইপি আবাসন সুবিধা, ব্যক্তিগত পরিবহন এবং অভিজ্ঞ গাইডের তত্ত্বাবধানে একটি আধ্যাত্মিক ও চমৎকার ওমরাহ যাত্রা সম্পন্ন করুন।",
      highlights: [
        "মক্কা ও মদিনায় হারামের একদম কাছে ৫-স্টার আবাসন সুবিধা",
        "ওমরাহ ভিসা প্রসেসিং ও স্বাস্থ্য বীমা সুবিধা",
        "মক্কা, মদিনা ও এয়ারপোর্টের মধ্যে ভিআইপি প্রাইভেট কারে যাতায়াত",
        "ঐতিহাসিক স্থানগুলোতে (জিয়ারত) গাইডেড ট্যুর"
      ],
      itinerary: [
        { day: 1, title: "জেদ্দায় আগমন ও মক্কায় যাত্রা", description: "জেদ্দা আন্তর্জাতিক বিমানবন্দরে পৌঁছানোর পর ইমিগ্রেশন সহায়তা শেষে ভিআইপি গাড়িতে মক্কায় পৌঁছাবেন। হারামের কাছে আপনার হোটেলে চেক-ইন করুন এবং আমাদের স্থানীয় গাইডের সাথে ওমরাহ পালন করুন।" },
        { day: 2, title: "মসজিদুল হারাম ও ইবাদত", description: "কাবা শরীফ দর্শন এবং মসজিদে হারামের ভেতরে টানা প্রার্থনা ও ইবাদতের মধ্য দিয়ে একটি পূর্ণ দিন অতিবাহিত করুন।" },
        { day: 3, title: "মক্কার জিয়ারত ট্যুর", description: "আরাফাত ময়দান, মিনা, মুজদালিফা, জাবালে নূর (হেরা গুহা) এবং জাবালে সাওর সহ পবিত্র স্থানগুলোতে গাইডেড ট্যুর এবং ইসলামী স্কলারের কাছ থেকে সেগুলোর ইতিহাস জানুন।" },
        { day: 4, title: " can দ্বিতীয় ওমরাহ (ঐচ্ছিক)", description: "মসজিদে আয়েশা (তানঈম) পরিদর্শনের মাধ্যমে এহরাম পরিধান করে নিজের বা পরিবারের জন্য দ্বিতীয় ওমরাহ পালনের সুযোগ।" },
        { day: 5, title: "মদিনায় স্থানান্তর", description: "মক্কা থেকে চেকআউট করে ভিআইপি ক্লাসে চড়ে হারামাইন বুলেট ট্রেনে মদিনায় পৌঁছান। মসজিদে নববীর ঠিক কাছে আপনার হোটেলে চেক-ইন করুন।" },
        { day: 6, title: "মসজিদে নববী ও রওজা শরীফ", description: "পবিত্র মসজিদে নববীতে নামাজ আদায় করে দিনটি কাটান। রওজা শরীফে ইবাদত করার জন্য নির্ধারিত পারমিটের সুবিধা গ্রহণ করুন।" },
        { day: 7, title: "মদিনার জিয়ারত ট্যুর", description: "মসজিদে কুবা (ইসলামের প্রথম মসজিদ), ওহুদ পাহাড় (যুদ্ধের ঐতিহাসিক স্থান), মসজিদে কিবলাতাইন এবং খেজুরের বাজার পরিদর্শন।" },
        { day: 8, title: "শেষ প্রার্থনা ও বিদায়", description: "মদিনায় শেষ নামাজ আদায় করে চেকআউট করুন এবং জেদ্দা/মদিনা বিমানবন্দরে প্রাইভেট কারে পৌঁছান ও দেশের ফ্লাইট ধরুন।" }
      ],
      inclusions: [
        "৭ রাত মক্কায় আবাসন (সুইস হোটেল মক্কা / সমমানের)",
        "৭ রাত মদিনায় আবাসন (পুলম্যান জমজম মদিনা / সমমানের)",
        "ওমরাহ ভিসা এবং স্বাস্থ্য বীমা প্রসেসিং",
        "প্রতিদিনের বুফে সকালের নাস্তা",
        " VIP যাতায়াত গাড়ি সুবিধা",
        "ওমরাহ পালন করার জন্য মুয়াল্লেম বা গাইড সহায়তা"
      ],
      exclusions: [
        "বিমান টিকিট",
        "দুপুর এবং রাতের খাবার",
        "ব্যক্তিগত খরচ ও লন্ড্রি বিল"
      ],
      accommodation: {
        name: "সুইস হোটেল মক্কা ও পুলম্যান মদিনা",
        rating: "৫-স্টার প্রিমিয়াম",
        type: "লাক্সারি রুম",
        details: "মক্কায় হারামের চত্বরের সাথে সরাসরি যুক্ত এবং মদিনায় মসজিদে নববীর একদম পাশে অবস্থিত সর্বাধুনিক ৫-স্টার হোটেল।"
      }
    },
    "sylhet-eco": {
      overview: "বাংলাদেশের চায়ের রাজধানী সিলেটের প্রাকৃতিক সৌন্দর্য আবিষ্কার করুন। লাউয়াছড়া জাতীয় উদ্যানের সবুজ বনে ট্রেকিং, রাতারগুল সোয়াম্প ফরেস্টে নৌকা ভ্রমণ এবং একটি চমৎকার প্রিমিয়াম ইকো-রিসোর্টে বিশ্রামের সুযোগ।",
      highlights: [
        "শ্রীমঙ্গলের ঐতিহ্যবাহী ও ঐতিহাসিক চা বাগানে হাঁটার অভিজ্ঞতা",
        "রাতারগুল মিঠাপানির জলাবনে ঐতিহ্যবাহী নৌকায় ঘুরে বেড়ানো",
        "লাউয়াছড়ায় বন্যপ্রাণী ও বিরল উদ্ভিদ দেখতে ট্রেইল ট্রেকিং",
        "প্রাকৃতিক পরিবেশে একটি চমৎকার বিলাসবহুল ইকো-লজে রাত্রিযাপন"
      ],
      itinerary: [
        { day: 1, title: "ঢাকা থেকে Sreemangal ও চা বাগান ভ্রমণ", description: "ঢাকা থেকে শ্রীমঙ্গলের উদ্দেশে রওনা দিন। বিলাসবহুল ইকো-রিসোর্টে চেক-ইন করুন। বিকেলে সবুজ চা বাগানের মধ্য দিয়ে হাঁটুন এবং বিখ্যাত ৭ রঙের চায়ের স্বাদ নিন।" },
        { day: 2, title: "লাউয়াছড়া বন ও মাধবপুর লেক", description: "খুব ভোরে লাউয়াছড়া জাতীয় উদ্যানে উল্লুক এবং বিরল বন্যপ্রাণী দেখতে ট্রেকিং শুরু করুন। বনের ভেতরে খাসিয়া আদিবাসী গ্রাম পরিদর্শন করুন। বিকেলে মাধবপুর লেকের চমৎকার দৃশ্য উপভোগ করুন।" },
        { day: 3, title: "রাতারগুল সোয়াম্প ফরেস্ট ও বিছনাকান্দি", description: "রাতারগুল জলাবনে যান। পানির নিচের গাছের মধ্য দিয়ে নৌকা ভ্রমণ করুন। পরবর্তীতে বিছনাকান্দি পরিদর্শন করুন, যেখানে ভারতের মেঘালয় পাহাড় থেকে নেমে আসা ঝরনা ও ক্রিস্টাল পানির নদী মিলেছে।" },
        { day: 4, title: "লালাখাল ও ঢাকায় প্রত্যাবর্তন", description: "চেকআউট করে পান্না-সবুজ পানির জন্য বিখ্যাত লালাখাল নদী ভ্রমণ করুন। ভারত সীমান্ত পর্যন্ত নৌকা ভ্রমণ উপভোগ করুন। সন্ধ্যায় ঢাকার উদ্দেশে রওনা দিন।" }
      ],
      inclusions: [
        "৩ রাত গ্র্যান্ড সুলতান চা রিসোর্ট / দুসাই ইকো রিসোর্টে আবাসন",
        "ঐতিহ্যবাহী সিলেটি বুফে সকালের নাস্তা, দুপুরের ও রাতের খাবার",
        "যাতায়াত ও সাইটসিয়িং-এর জন্য প্রিমিয়াম এসি এসইউভি গাড়ি",
        "বনের টিকিট, নৌকা ভাড়া এবং স্থানীয় গাইডের ফি",
        "Dhaka-Sylhet return transfer"
      ],
      exclusions: [
        "ব্যক্তিগত কেনাকাটা এবং বকশিস",
        "রুম সার্ভিস বিল এবং অতিরিক্ত পানীয়",
        "ইটিনারেবির বাইরের কোনো প্রবেশ ফি"
      ],
      accommodation: {
        name: "দুসাই রিসোর্ট অ্যান্ড স্পা / গ্র্যান্ড সুলতান",
        rating: "৫-স্টার ইকো রিসোর্ট",
        type: "ভিলা / প্রিমিয়াম রুম",
        details: "শ্রীমঙ্গলের পাহাড়ের মাঝে অবস্থিত, যেখানে রয়েছে ওপেন-এয়ার জ্যাকুজি, লেক ভিউ এবং প্রকৃতির মাঝে বিলাসবহুল নাগরিক সুবিধা।"
      }
    },
    "bali-retreat": {
      overview: "বালির আধ্যাত্মিকতা এবং সংস্কৃতিতে হারিয়ে যান। আগ্নেয়গিরির দৃশ্য অন্বেষণ করুন, বিখ্যাত ধানের ক্ষেতে হাঁটুন, ঐতিহাসিক সমুদ্র মন্দির দর্শন করুন এবং একটি চমৎকার প্রাইভেট পুল ভিলায় আরাম করুন।",
      highlights: [
        "উবুদ এবং সেমিনিয়াকের বিলাসবহুল প্রাইভেট পুল ভিলায় আবাসন",
        "তানা লট এবং উলুওয়াতু ক্লিফ মন্দিরে সূর্যাস্ত ভ্রমণ",
        "মাঙ্কি ফরেস্ট এবং তেগালালাং রাইস ট্যুর",
        "ঐতিহ্যবাহী বালিনিজ স্পা ট্রিটমেন্ট"
      ],
      itinerary: [
        { day: 1, title: "বালিতে আগমন ও উবুদে চেক-ইন", description: "ডেনপাসার বিমানবন্দরে পৌঁছানোর পর আপনার ব্যক্তিগত গাড়িচালক আপনাকে উবুদের বিলাসবহুল ভিলায় নিয়ে যাবেন। বালি সংস্কৃতির কেন্দ্রবিন্দু উবুদে আজ বিশ্রাম নিন।" },
        { day: 2, title: "ধানের ক্ষেত ও সাংস্কৃতিক ঐতিহ্য", description: "বিখ্যাত তেগালালাং ধানের ক্ষেত এবং মাঙ্কি ফরেস্ট ভ্রমণ করুন। উবুদ রাজপ্রাসাদ দেখুন। সন্ধ্যায় ঐতিহ্যবাহী কেচাক নৃত্য উপভোগ করুন।" },
        { day: 3, title: "মাউন্ট বাতুর আগ্নেয়গিরি ও পবিত্র ঝরনা", description: "মাউন্ট বাতুর জীবন্ত আগ্নেয়গিরি এবং হ্রদের দৃশ্য দেখতে কিন্তুমানি ভ্রমণ করুন। Tirta Empul মন্দিরে গিয়ে পবিত্র পানিতে মানুষের স্নান ও প্রার্থনার ধর্মীয় আচার দেখুন।" },
        { day: 4, title: "beach club এবং তানা লট সূর্যাস্ত", description: "সেমিনিয়াক সমুদ্রতীরবর্তী ভিলায় স্থানান্তর করুন। বিকেলে সমুদ্রের পাথরের ওপর অবস্থিত বিখ্যাত তানা লট মন্দির থেকে চমৎকার সূর্যাস্ত উপভোগ করুন।" },
        { day: 5, title: "উলুওয়াতু ক্লিফ ও স্পা ডে", description: "সকালে বালিনিজ স্পা উপভোগ করুন। বিকেলে ক্লিফের ওপর অবস্থিত উলুওয়াতু মন্দির ভ্রমণ করুন এবং জিম্বারান বে-তে চমৎকার সি-ফুড ডিনার করুন।" },
        { day: 6, title: "বিদায় বালি", description: "সকালে কেনাকাটা বা সাঁতার কেটে সময় কাটান। আপনার ফিরতি ফ্লাইটের জন্য বিমানবন্দরে স্থানান্তর করুন।" }
      ],
      inclusions: [
        "৩ রাত উবুদ পুল ভিলা এবং ২ রাত সেমিনিয়াক ভিলায় আবাসন",
        "প্রতিদিনের সকালের নাস্তা এবং ১টি জিম্বারান সি-ফুড ডিনার",
        " চালক ও গাইডসহ এসি প্রাইভেট কার",
        "মন্দির, ড্যান্স শো এবং পার্কের সমস্ত প্রবেশ টিকিট",
        "৬০ মিনিটের বিশেষ বালিনিজ স্পা ট্রিটমেন্ট"
      ],
      exclusions: [
        "আন্তর্জাতিক বিমান টিকিট",
        "দুপুরের ও রাতের খাবার",
        "ভ্রমণ বীমা এবং অন-অ্যারাইভাল ভিসা ফি (৩৫ ডলার)",
        "চালক/গাইডের জন্য টিপস"
      ],
      accommodation: {
        name: "কোমানেকা অ্যাট বিসমা উবুদ / দ্য সামায়া সেমিনিয়াক",
        rating: "৫-স্টার লাক্সারি",
        type: "প্রাইভেট পুল ভিলা",
        details: "জঙ্গল বা সমুদ্র সৈকত পরিবেষ্টিত ব্যক্তিগত বিলাসবহুল ভিলা, যেখানে রয়েছে আধুনিক বালিনিজ ডিজাইন এবং চমৎকার সার্ভিস।"
      }
    },
    "thailand-discovery": {
      overview: "থাইল্যান্ডের প্রাণবন্ত শহর এবং গ্রীষ্মমন্ডলীয় সমুদ্র সৈকতের এক নিখুঁত মিশ্রণ উপভোগ করুন। ব্যাংককের রাজকীয় মন্দিরগুলো ঘুরে দেখুন, ভাসমান বাজারে কেনাকাটা করুন এবং ফুকেটের সাদা বালির সৈকতে রোদ পোহান।",
      highlights: [
        "ব্যাংককের গ্র্যান্ড প্যালেস এবং ওয়াট অরুণ গাইডেড ট্যুর",
        "ভাসমান বাজারে কাঠের নৌকায় করে কেনাকাটার চমৎকার অভিজ্ঞতা",
        "ফি ফি দ্বীপে রোমাঞ্চকর স্পিডবোট ট্যুর",
        "বিলাসবহুল সমুদ্র সৈকত रिसॉर्टে আবাসন"
      ],
      itinerary: [
        { day: 1, title: "ব্যাংককে আগমন ও ক্রুজ ডিনার", description: "ব্যাংকক পৌঁছানোর পর হোটেলে চেক-ইন করুন। সন্ধ্যায় Chao Phraya নদীতে বিলাসবহুল ডিনার ক্রুজ উপভোগ করতে করতে আলোকিত গ্র্যান্ড প্যালেস দেখুন।" },
        { day: 2, title: "গ্র্যান্ড প্যালেস ও ভাসমান বাজার", description: "গ্র্যান্ড প্যালেস এবং বুদ্ধের মন্দির পরিদর্শন করুন। ভাসমান বাজারে গিয়ে ঐতিহ্যবাহী নৌকায় কেনাকাটার অভিজ্ঞতা নিন।" },
        { day: 3, title: "ফুকেটে অভ্যন্তরীণ যাত্রা", description: "ব্যাংকক থেকে ফুকেটের উদ্দেশে অভ্যন্তরীণ ফ্লাইটে রওনা দিন। ফুকেটের বিচ রিসোর্টে চেক-ইন করে পাতং সৈকতে বিকেলে আরাম করুন।" },
        { day: 4, title: "phi phi দ্বীপ ভ্রমণ", description: "স্পিডবোটে করে বিখ্যাত ফি ফি দ্বীপে চমৎকার ডে-ট্যুর উপভোগ করুন। স্নরকেলিং করার সুযোগ।" },
        { day: 5, title: "Old Phuket Town ও স্পা", description: "ফুকেটের বিগ বুদ্ধ এবং ওল্ড ফুকেট টাউন ঘুরে দেখুন। দিনটি শেষ করুন একটি আরামদায়ক থাই ম্যাসেজের সাথে।" },
        { day: 6, title: "বিদায় থাইল্যান্ড", description: "সকালে সৈকতে হেঁটে বিদায় জানান এবং ফ্লাইটের জন্য ফুকেট বিমানবন্দরে চলে যান।" }
      ],
      inclusions: [
        "২ রাত ব্যাংকক এবং ৩ রাত ফুকেটের প্রিমিয়াম হোটেলে আবাসন",
        "প্রতিদিনের বুফে সকালের নাস্তা এবং ২টি দুপুরের খাবার",
        "domestic flight টিকিট (ব্যাংকক-ফুকেট)",
        "এসি প্রাইভেট কারে সমস্ত যাতায়াত সুবিধা",
        "ফি ফি দ্বীপে স্নরকেলিং গিয়ার সহ স্পিডবোট ট্যুর"
      ],
      exclusions: [
        "আন্তর্জাতিক বিমান টিকিট",
        "দুপুর এবং রাতের খাবার",
        "ভিসা প্রসেসিং ফি",
        "ব্যক্তিগত খরচ ও বকশিস"
      ],
      accommodation: {
        name: "সেন্টারা গ্র্যান্ড ব্যাংকক ও ম্যারিয়ট ফুকেট রিসোর্ট",
        rating: "৪.৫-স্টার প্রিমিয়াম",
        type: "ডিলাক্স ওশান ভিউ রুম",
        details: "ব্যাংককের চমৎকার রুফটপ বার ভিউ এবং ফুকেটের সমুদ্র সৈকতে সরাসরি প্রবেশের সুবিধাসহ সেরা মানের হোটেল।"
      }
    },
    "sundarbans-safari": {
      overview: "বিশ্বের বৃহত্তম ম্যানগ্রোভ বন সুন্দরবনের গভীরে এক অ্যাডভেঞ্চারে অংশ নিন। আঁকাবাঁকা খাল দিয়ে লঞ্চ ভ্রমণ, রয়্যাল বেঙ্গল টাইগার সন্ধান এবং চিত্রা হরিণের পাল পর্যবেক্ষণ করুন।",
      highlights: [
        "জাহাজে করে সুন্দরবনের গভীরে একাধিক দিনের ক্রুজ",
        "কটকা অভয়ারণ্যের মধ্য দিয়ে জঙ্গল ওয়াকিং",
        "ক্যানাল বোট ক্রুজ",
        "পাখি পর্যবেক্ষণের জন্য হিরণ পয়েন্ট ভ্রমণ"
      ],
      itinerary: [
        { day: 1, title: "খুলনা থেকে বোর্ডিং ও বনে প্রবেশ", description: "খুলনা থেকে সকালে জাহাজে আরোহণ করুন। রূপসা ও শিবসা নদী পার হয়ে বনে প্রবেশ করুন। প্রথম জঙ্গল ওয়াকের জন্য হাড়বাড়িয়া ফরেস্ট স্টেশনের কাছে নোঙর করুন।" },
        { day: 2, title: "কটকার বন্যপ্রাণী ট্রেইল", description: "কটকায় পৌঁছান। কটকা সমুদ্র সৈকত পর্যন্ত হেঁটে হরিণের পাল এবং বিভিন্ন পাখি দেখুন। বিকেলে ছোট কাঠের নৌকায় করে নীরব বনের শান্ত খালে ঘুরে বেড়ান।" },
        { day: 3, title: "কচিখালী ও হিরণ পয়েন্ট", description: "কচিখালী ফরেস্টে গাইডেড ট্রেকিং করুন। হিরণ পয়েন্ট ভ্রমণ করুন, যা রয়্যাল বেঙ্গল টাইগারের প্রধান আবাসস্থল।" },
        { day: 4, title: "করমজল ও খুলনা প্রত্যাবর্তন", description: "করমজল হরিণ ও কুমির প্রজনন কেন্দ্র পরিদর্শন করুন। বিকেলে খুলনার উদ্দেশে রওনা দিন এবং সন্ধ্যায় পৌঁছান।" }
      ],
      inclusions: [
        "৩ রাত প্রিমিয়াম এসি জাহাজে আবাসন (প্রাইভেট কেবিন)",
        "প্রতিদিনের সকালের নাস্তা, দুপুরের খাবার, রাতের খাবার ও চা-নাস্তা",
        "বন বিভাগের প্রবেশ ফি এবং সশস্ত্র ফরেস্ট গার্ড নিরাপত্তা প্রহরী",
        "naturalist গাইড",
        "খালের ভেতর ভ্রমণের জন্য ছোট নৌকার ব্যবস্থা"
      ],
      exclusions: [
        "খুলনা আসা-যাওয়ার যাতায়াত ব্যবস্থা",
        "কোমল পানীয় এবং ব্যক্তিগত খরচ",
        "টিপস"
      ],
      accommodation: {
        name: "এম.ভি. দ্য ওয়েভ / সমমানের প্রিমিয়াম ক্রুজ শিপ",
        rating: "প্রিমিয়াম ট্যুরিস্ট শিপ",
        type: "প্রাইভেট এসি কেবিন",
        details: "অ্যাটাচড টয়লেট সহ পরিচ্ছন্ন কেবিন, অবজারভেশন ডেক এবং তাজা সিলেক্টেড খাবার পরিবেশনকারী দক্ষ শেফ।"
      }
    },
    "dubai-city": {
      overview: "ভবিষ্যতের শহর দুবাইতে পা রাখুন। বুর্জ খলিফার ওপর থেকে শহর দেখুন, মরুভূমিতে রোমাঞ্চকর ডেজার্ট সাফারি ও বেলি ড্যান্স উপভোগ করুন এবং বিখ্যাত দুবাই মলে কেনাকাটা করুন।",
      highlights: [
        "বুর্জ খলিফার ১২৪ তলার অবজারভেশন ডেকে ওঠার টিকিট",
        "মরুভূমিতে ৪x৪ ল্যান্ড ক্রুজার সাফারি ও বার্বিকিউ ডিনার",
        "Palm Jumeirah ও দুবাই মেরিনা কভার করে সিটি ট্যুর",
        "মেরিনা ডাউ ক্রুজ ডিনার"
      ],
      itinerary: [
        { day: 1, title: "দুবাইতে আগমন ও মেরিনা ক্রুজ ডিনার", description: "দুবাই পৌঁছানোর পর এয়ারপোর্ট থেকে প্রাইভেট কারে হোটেলে পৌঁছান। সন্ধ্যায় দুবাই মেরিনাতে গান ও আরবীয় খাবারের সাথে ঐতিহ্যবাহী ডাউ ক্রুজ উপভোগ করুন।" },
        { day: 2, title: "সিটি ট্যুর ও বুর্জ খলিফা", description: "পাম জুমেইরাহ, আটলান্টিস ও দুবাই মেরিনা ঘুরে দেখুন। বিকেলে বুর্জ খলিফার ১২৪ তলায় উঠে পুরো দুবাই শহরের দৃশ্য দেখুন।" },
        { day: 3, title: "ডেজার্ট সাফারি অ্যাডভেঞ্চার", description: "দুপুরে ৪x৪ ল্যান্ড ক্রুজারে করে মরুভূমির সাফারির উদ্দেশে রওনা হোন। বালি ট্র্যাকিং, উটের পিঠে চড়া, মেহেদি রাঙানো এবং বার্বিকিউ বুফে উপভোগ করুন।" },
        { day: 4, title: "কেনাকাটা ও বিনোদন", description: "দুবাই মলে কেনাকাটা করুন, একুরিয়াম দেখুন এবং বিখ্যাত দুবাই ফাউন্টেন শো উপভোগ করুন।" },
        { day: 5, title: "দুবাই বিদায়", description: "হোটেল থেকে চেকআউট করে বিদায় ফ্লাইটের জন্য দুবাই বিমানবন্দরে চলে যান।" }
      ],
      inclusions: [
        "৪ রাত দুবাইয়ের ৪-স্টার প্রিমিয়াম হোটেলে আবাসন",
        "প্রতিদিনের বুফে সকালের নাস্তা এবং ২টি রাতের খাবার",
        "এসি প্রাইভেট কারে আসা-যাওয়ার যাতায়াত ব্যবস্থা",
        "বুর্জ খলিফার টিকিট এবং ডেজার্ট সাফারি ট্যুর",
        "দুবাই ট্যুরিস্ট ভিসা প্রসেসিং"
      ],
      exclusions: [
        "আন্তর্জাতিক বিমান টিকিট",
        "দুপুরের খাবার",
        "ট্যুরিজম দিরহাম ফি (payable directly to hotel)",
        "ব্যক্তিগত কেনাকাটা ও টিপস"
      ],
      accommodation: {
        name: "মিলেনিয়াম প্লেস মেরিনা / রোভ ডাউনটাউন",
        rating: "৪-স্টার প্রিমিয়াম",
        type: "ডিলাক্স সিটি ভিউ রুম",
        details: "সুইমিং পুল, জিম সহ আধুনিক ও অভিজাত হোটেল, যা শপিং মল ও মেট্রো স্টেশনের কাছে অবস্থিত।"
      }
    },
    "short-umrah": {
      overview: "ব্যস্ত ব্যক্তিদের জন্য বিশেষভাবে ডিজাইন করা একটি সংক্ষিপ্ত ও সাশ্রয়ী ওমরাহ প্যাকেজ। হারামের কাছে হোটেলের সুবিধা এবং ব্যক্তিগত যাতায়াত সহ ওমরাহ পালন করুন।",
      highlights: [
        "ব্যস্ত পেশাদারদের জন্য নিখুঁত ওমরাহ ইটিনারেবি",
        "মসজিদুল হারাম ও মসজিদে নববীর কাছে ভালো মানের হোটেল",
        "ওমরাহ ভিসা প্রসেসিং সুবিধা",
        "VIP এয়ারপোর্ট ও হোটেল যাতায়াত"
      ],
      itinerary: [
        { day: 1, title: "জেদ্দায় আগমন ও ওমরাহ পালন", description: "জেদ্দা বিমানবন্দরে নেমে ব্যক্তিগত গাড়িতে মক্কা পৌঁছান। চেক-ইন করে মসজিদে হারামে গিয়ে ওমরাহ পালন করুন।" },
        { day: 2, title: "মক্কায় প্রার্থনা", description: "কাবা শরীফে নামাজ আদায় করে ও নিজের মতো ইবাদত করে মক্কায় পুরো দিন কাটান।" },
        { day: 3, title: "মক্কা জিয়ারত ও মদিনায় স্থানান্তর", description: "মক্কার ঐতিহাসিক স্থানগুলো দেখে নিয়ে বুলেট ট্রেন বা প্রাইভেট কারে মদিনা পৌঁছান।" },
        { day: 4, title: "মদিনায় ইবাদত ও রওজা শরীফ", description: "মসজিদে নববীতে নামাজ আদায় করুন এবং রওজা মোবারক জিয়ারত করুন।" },
        { day: 5, title: "মদিনা জিয়ারত ও বিদায়", description: "মসজিদে কুবা দেখে নিয়ে মদিনা বা জেদ্দা এয়ারপোর্টের উদ্দেশে রওনা দিন ফিরতি ফ্লাইটের জন্য।" }
      ],
      inclusions: [
        "৩ রাত মক্কা হোটেল (আনজুম হোটেল / সমমানের)",
        "৩ রাত মদিনা হোটেল (আল আকীক মদিনা / সমমানের)",
        "ওমরাহ ভিসা এবং স্বাস্থ্য বীমা প্রসেসিং",
        "প্রতিদিনের সকালের নাস্তা",
        "VIP প্রাইভেট ট্রান্সপোর্ট",
        "ওমরাহ পালনের জন্য গাইড সুবিধা"
      ],
      exclusions: [
        "বিমান টিকিট",
        "দুপুর ও রাতের খাবার",
        "ব্যক্তিগত খরচ"
      ],
      accommodation: {
        name: "আনজুম হোটেল মক্কা ও আল আকীক মদিনা",
        rating: "৪-স্টার কোয়ালিটি",
        type: "ডিলাক্স রুম",
        details: "হারামের সীমানার একদম কাছে অবস্থিত হোটেল, যেখানে রয়েছে সুস্বাদু খাবারের ব্যবস্থা এবং আরামদায়ক রুম।"
      }
    },
    "swiss-alps": {
      overview: "সুইজারল্যান্ডের বরফে ঢাকা পর্বতমালা, অসাধারণ প্রাকৃতিক দৃশ্য এবং ট্রেনের মনোরম যাত্রার অভিজ্ঞতা নিন। সুইস অ্যালপাইন লজে থাকুন, মাউন্ট টিটলিস ক্যাবল কারে চড়ুন এবং লুসার্নের চ্যাপেল ব্রিজ দিয়ে হাঁটুন।",
      highlights: [
        "জংফ্রাউজোখ - ইউরোপের সর্বোচ্চ পর্বত রেল স্টেশন ভ্রমণ",
        "মাউন্ট টিটলিস ঘূর্ণায়মান ক্যাবল কার এবং বরফের খেলা",
        "লুসার্ন লেকে বোট ক্রুজ",
        "Alpine লজে চমৎকার আবাসন"
      ],
      itinerary: [
        { day: 1, title: "জুরিখ আগমন ও লুসার্ন স্থানান্তর", description: "জুরিখে অবতরণ করার পর ট্রেনে চড়ে লুসার্ন পৌঁছান। লেকের কাছে হোটেলে চেক-ইন করুন এবং চ্যাপেল ব্রিজ ঘুরে দেখুন।" },
        { day: 2, title: "মাউন্ট টিটলিস স্নো অ্যাডভেঞ্চার", description: "Engelberg-এ গিয়ে ক্যাবল কারে চড়ে ৩,০২০ মিটার উঁচুতে উঠুন এবং ইউরোপের সর্বোচ্চ ঝুলন্ত ব্রিজ দিয়ে হাঁটুন।" },
        { day: 3, title: "ইন্টারলাকেন ও জংফ্রাউজোখ", description: "ইন্টারলাকেন থেকে কগহুইল ট্রেনে চড়ে ইউরোপের সর্বোচ্চ রেল স্টেশন Jungfraujoch-এ যান এবং আইস প্যালেস দেখুন।" },
        { day: 4, title: "লেক ব্রিয়েঞ্জ ক্রুজ ও লাউটারব্রুনেন", description: "লুসার্ন লেক ক্রুজ উপভোগ করুন। বিকেলে ৭২টি ঝরনার উপত্যকা Lauterbrunnen-এ যান।" },
        { day: 5, title: "জুরিখ শহর অন্বেষণ", description: "জুরিখ ফিরে ওল্ড টাউন, লেক জুরিখ এবং শপিং স্ট্রিট ঘুরে দেখুন।" },
        { day: 6, title: "সুইজারল্যান্ড বিদায়", description: "শেষ সুইস চকলেট সকালের নাস্তা খেয়ে ফ্লাইটের জন্য জুরিখ বিমানবন্দরে চলে যান।" }
      ],
      inclusions: [
        "৩ রাত লুসার্ন ও ২ রাত জুরিখের ঐতিহ্যবাহী আলপাইন হোটেল / চ্যালেটে আবাসন",
        "প্রতিদিনের কন্টিনেন্টাল সকালের নাস্তা",
        "৮-দিনের সুইস ট্রাভেল পাস (অসীম ট্রেন, বাস ও নৌকায় যাতায়াত)",
        "মাউন্ট টিটলিস এবং জংফ্রাউজোখ ট্রেন ও ক্যাবল কারের টিকিট",
        "ভিসার জন্য প্রয়োজনীয় গাইডেন্স ও কাগজপত্র"
      ],
      exclusions: [
        "আন্তর্জাতিক বিমান টিকিট",
        "দুপুর ও রাতের খাবার",
        "ভিসা ফি",
        "ব্যক্তিগত কেনাকাটা"
      ],
      accommodation: {
        name: "হোটেল মনোপোল লুসার্ন ও হোটেল সোয়াইজারহফ জুরিখ",
        rating: "৪.৫-স্টার লাক্সারি",
        type: "আলপাইন চ্যালেট / সিটি রুম",
        details: "লুসার্ন এবং জুরিখের কেন্দ্রবিন্দুতে অবস্থিত প্রিমিয়াম মানের ঐতিহাসিক হোটেল।"
      }
    }
  }
};

export function getPackageDetails(id: string, lang: "en" | "bn" = "en"): PackageDetails {
  const selectedLang = lang === "bn" ? "bn" : "en";
  const data = detailsData[selectedLang][id] || detailsData["en"][id];
  
  if (data) return data;
  
  // Generic fallback if not found in data
  const isBn = selectedLang === "bn";
  return {
    overview: isBn 
      ? "আমাদের প্রিমিয়াম প্যাকেজের সাথে আপনার পছন্দের গন্তব্যে ভ্রমণের অনন্য অভিজ্ঞতা লাভ করুন। ইহান ট্যুরস অ্যান্ড ট্রাভেলসের নিখুঁত আয়োজনে আপনার প্রতিটি সফর হবে আরামদায়ক ও স্মরণীয়।" 
      : "Experience the journey of a lifetime with our premium curated packages. We take care of every detail to ensure you have a comfortable and memorable vacation.",
    highlights: isBn
      ? [
          "আরামদায়ক ও বিলাসবহুল hotel আবাসন",
          "এসি প্রাইভেট কারে যাতায়াত সুবিধা",
          "দক্ষ ও স্থানীয় ট্যুর গাইডের তত্ত্বাবধান",
          "জরুরি ২৪/৭ সাপোর্ট সুবিধা"
        ]
      : [
          "Comfortable premium hotel accommodations",
          "Dedicated air-conditioned private vehicle transfers",
          "Expert local guide and sightseeing support",
          "24/7 dedicated customer assistance"
        ],
    itinerary: [
      { day: 1, title: isBn ? "আগমন ও হোটেলে চেক-ইন" : "Arrival & Hotel Check-in", description: isBn ? "বিমানবন্দরে পৌঁছানোর পর আমাদের প্রতিনিধি আপনাকে হোটেলে পৌঁছে দেবেন। চেক-ইন করে বিশ্রাম নিন।" : "Upon arrival at the airport, our representative will transfer you to the hotel. Check in and spend the day relaxing." },
      { day: 2, title: isBn ? "শহর ভ্রমণ ও সাইটসিয়িং" : "City Tour & Sightseeing", description: isBn ? "সকালে নাস্তা শেষে ঐতিহাসিক ও প্রধান পর্যটন কেন্দ্রগুলো ঘুরে দেখুন।" : "Enjoy a full day of sightseeing, visiting the main attractions and historical landmarks." },
      { day: 3, title: isBn ? "অবসর ও কেনাকাটা" : "Leisure & Shopping", description: isBn ? "নিজের মতো করে শহর ঘুরে দেখুন এবং কেনাকাটা করুন।" : "Spend the day at leisure, exploring local markets and shopping." },
      { day: 4, title: isBn ? "বিদায় ও প্রস্থান" : "Departure & Farewell", description: isBn ? "নাস্তা শেষে চেকআউট করুন এবং ফ্লাইটের জন্য বিমানবন্দরে স্থানান্তর করুন।" : "After breakfast, check out of the hotel and transfer to the airport for your flight home." }
    ],
    inclusions: isBn
      ? ["৩ রাত হোটেল আবাসন", "প্রতিদিনের সকালের নাস্তা", "বিমানবন্দর আসা-যাওয়ার ট্রান্সফার", "সাইটসিয়িং ট্যুর"]
      : ["3 Nights Hotel Accommodation", "Daily Breakfast", "Roundtrip Airport Transfers", "Sightseeing Tours"],
    exclusions: isBn
      ? ["আন্তর্জাতিক বিমান টিকিট", "দুপুর ও রাতের খাবার", "ব্যক্তিগত খরচ ও টিপস"]
      : ["International Airfare", "Lunches & Dinners", "Personal expenses & tips"],
    accommodation: {
      name: isBn ? "ভালো মানের প্রিমিয়াম হোটেল" : "Premium Standard Hotel",
      rating: isBn ? "৪-স্টার রেটিং" : "4-Star Rating",
      type: isBn ? "ডিলাক্স রুম" : "Deluxe Room",
      details: isBn 
        ? "শহরের প্রাণকেন্দ্রে অবস্থিত এবং উন্নত সুযোগ-সুবিধা সম্বলিত আবাসন।" 
        : "Centrally located accommodation with top amenities, free Wi-Fi, and buffet breakfast."
    }
  };
}
