import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const UP_DISTRICTS = [
  { name: 'Agra', nameHi: 'आगरा', division: 'Agra' },
  { name: 'Aligarh', nameHi: 'अलीगढ़', division: 'Aligarh' },
  { name: 'Allahabad', nameHi: 'इलाहाबाद', division: 'Allahabad' },
  { name: 'Ambedkar Nagar', nameHi: 'अंबेडकर नगर', division: 'Ayodhya' },
  { name: 'Amethi', nameHi: 'अमेठी', division: 'Ayodhya' },
  { name: 'Amroha', nameHi: 'अमरोहा', division: 'Moradabad' },
  { name: 'Auraiya', nameHi: 'औरैया', division: 'Kanpur' },
  { name: 'Azamgarh', nameHi: 'अज़मगढ़', division: 'Azamgarh' },
  { name: 'Baghpat', nameHi: 'बागपत', division: 'Meerut' },
  { name: 'Bahraich', nameHi: 'बहराइच', division: 'Devipatan' },
  { name: 'Ballia', nameHi: 'बलिया', division: 'Azamgarh' },
  { name: 'Balrampur', nameHi: 'बलरामपुर', division: 'Devipatan' },
  { name: 'Banda', nameHi: 'बांदा', division: 'Chitrakoot' },
  { name: 'Barabanki', nameHi: 'बाराबंकी', division: 'Lucknow' },
  { name: 'Bareilly', nameHi: 'बरेली', division: 'Bareilly' },
  { name: 'Basti', nameHi: 'बस्ती', division: 'Bastoi' },
  { name: 'Bhadohi', nameHi: 'भदोही', division: 'Varanasi' },
  { name: 'Bijnor', nameHi: 'बिजनौर', division: 'Moradabad' },
  { name: 'Budaun', nameHi: 'बदायूं', division: 'Bareilly' },
  { name: 'Bulandshahr', nameHi: 'बुलंदशहर', division: 'Meerut' },
  { name: 'Chandauli', nameHi: 'चंदौली', division: 'Varanasi' },
  { name: 'Chitrakoot', nameHi: 'चित्रकूट', division: 'Chitrakoot' },
  { name: 'Deoria', nameHi: 'देवरिया', division: 'Gorakhpur' },
  { name: 'Etah', nameHi: 'इटावा', division: 'Aligarh' },
  { name: 'Etawah', nameHi: 'इटावा', division: 'Kanpur' },
  { name: 'Faizabad', nameHi: 'फैजाबाद', division: 'Ayodhya' },
  { name: 'Farrukhabad', nameHi: 'फर्रुखाबाद', division: 'Kanpur' },
  { name: 'Fatehpur', nameHi: 'फतेहपुर', division: 'Allahabad' },
  { name: 'Firozabad', nameHi: 'फिरोजाबाद', division: 'Agra' },
  { name: 'Gautam Buddha Nagar', nameHi: 'गौतम बुद्ध नगर', division: 'Meerut' },
  { name: 'Ghaziabad', nameHi: 'गाजियाबाद', division: 'Meerut' },
  { name: 'Ghazipur', nameHi: 'गाजीपुर', division: 'Varanasi' },
  { name: 'Gonda', nameHi: 'गोंडा', division: 'Devipatan' },
  { name: 'Gorakhpur', nameHi: 'गोरखपुर', division: 'Gorakhpur' },
  { name: 'Hamirpur', nameHi: 'हमीरपुर', division: 'Chitrakoot' },
  { name: 'Hapur', nameHi: 'हापुड़', division: 'Meerut' },
  { name: 'Hardoi', nameHi: 'हरदोई', division: 'Lucknow' },
  { name: 'Hathras', nameHi: 'हाथरस', division: 'Aligarh' },
  { name: 'Jalaun', nameHi: 'जालौन', division: 'Jhansi' },
  { name: 'Jaunpur', nameHi: 'जौनपुर', division: 'Varanasi' },
  { name: 'Jhansi', nameHi: 'झांसी', division: 'Jhansi' },
  { name: 'Kannauj', nameHi: 'कन्नौज', division: 'Kanpur' },
  { name: 'Kanpur Dehat', nameHi: 'कानपुर देहात', division: 'Kanpur' },
  { name: 'Kanpur Nagar', nameHi: 'कानपुर नगर', division: 'Kanpur' },
  { name: 'Kaushambi', nameHi: 'कौशाम्बी', division: 'Allahabad' },
  { name: 'Kushinagar', nameHi: 'कुशीनगर', division: 'Gorakhpur' },
  { name: 'Lakhimpur Kheri', nameHi: 'लखीमपुर खीरी', division: 'Lucknow' },
  { name: 'Lalitpur', nameHi: 'ललितपुर', division: 'Jhansi' },
  { name: 'Lucknow', nameHi: 'लखनऊ', division: 'Lucknow' },
  { name: 'Maharajganj', nameHi: 'महाराजगंज', division: 'Gorakhpur' },
  { name: 'Mahoba', nameHi: 'महोबा', division: 'Chitrakoot' },
  { name: 'Mainpuri', nameHi: 'मैनपुरी', division: 'Agra' },
  { name: 'Mathura', nameHi: 'मथुरा', division: 'Agra' },
  { name: 'Mau', nameHi: 'मऊ', division: 'Azamgarh' },
  { name: 'Meerut', nameHi: 'मेरठ', division: 'Meerut' },
  { name: 'Mirzapur', nameHi: 'मिर्जापुर', division: 'Varanasi' },
  { name: 'Moradabad', nameHi: 'मुरादाबाद', division: 'Moradabad' },
  { name: 'Muzaffarnagar', nameHi: 'मुजफ्फरनगर', division: 'Saharanpur' },
  { name: 'Pilibhit', nameHi: 'पीलीभीत', division: 'Bareilly' },
  { name: 'Pratapgarh', nameHi: 'प्रतापगढ़', division: 'Allahabad' },
  { name: 'Prayagraj', nameHi: 'प्रयागराज', division: 'Allahabad' },
  { name: 'Rae Bareli', nameHi: 'रायबरेली', division: 'Lucknow' },
  { name: 'Rampur', nameHi: 'रामपुर', division: 'Moradabad' },
  { name: 'Saharanpur', nameHi: 'सहारनपुर', division: 'Saharanpur' },
  { name: 'Sambhal', nameHi: 'संभल', division: 'Moradabad' },
  { name: 'Sant Kabir Nagar', nameHi: 'संत कबीर नगर', division: 'Bastoi' },
  { name: 'Shahjahanpur', nameHi: 'शाहजहांपुर', division: 'Bareilly' },
  { name: 'Shamli', nameHi: 'शामली', division: 'Saharanpur' },
  { name: 'Shravasti', nameHi: 'श्रावस्ती', division: 'Devipatan' },
  { name: 'Siddharthnagar', nameHi: 'सिद्धार्थनगर', division: 'Bastoi' },
  { name: 'Sitapur', nameHi: 'सीतापुर', division: 'Lucknow' },
  { name: 'Sonbhadra', nameHi: 'सोनभद्र', division: 'Mirzapur' },
  { name: 'Sultanpur', nameHi: 'सुल्तानपुर', division: 'Ayodhya' },
  { name: 'Unnao', nameHi: 'उन्नाव', division: 'Lucknow' },
  { name: 'Varanasi', nameHi: 'वाराणसी', division: 'Varanasi' },
];

const CATEGORIES = [
  { nameHi: 'राजनीति', nameEn: 'Politics', slug: 'rajniti', color: '#cc0000', icon: '🗳️', sortOrder: 1 },
  { nameHi: 'देश', nameEn: 'National', slug: 'desh', color: '#1565c0', icon: '🇮🇳', sortOrder: 2 },
  { nameHi: 'विदेश', nameEn: 'World', slug: 'videsh', color: '#0277bd', icon: '🌍', sortOrder: 3 },
  { nameHi: 'खेल', nameEn: 'Sports', slug: 'sports', color: '#007b3a', icon: '🏏', sortOrder: 4 },
  { nameHi: 'मनोरंजन', nameEn: 'Entertainment', slug: 'entertainment', color: '#9c27b0', icon: '🎬', sortOrder: 5 },
  { nameHi: 'व्यापार', nameEn: 'Business', slug: 'business', color: '#1565c0', icon: '💼', sortOrder: 6 },
  { nameHi: 'टेक', nameEn: 'Tech', slug: 'tech', color: '#0277bd', icon: '📱', sortOrder: 7 },
  { nameHi: 'किसान', nameEn: 'Farm', slug: 'kisan', color: '#558b2f', icon: '🌾', sortOrder: 8 },
  { nameHi: 'क्राइम', nameEn: 'Crime', slug: 'crime', color: '#b71c1c', icon: '🔴', sortOrder: 9 },
  { nameHi: 'शिक्षा', nameEn: 'Education', slug: 'education', color: '#e65100', icon: '📚', sortOrder: 10 },
  { nameHi: 'स्वास्थ्य', nameEn: 'Health', slug: 'health', color: '#2e7d32', icon: '🏥', sortOrder: 11 },
  { nameHi: 'यूपी विशेष', nameEn: 'UP Special', slug: 'up-vishesh', color: '#ff6600', icon: '⚡', sortOrder: 12 },
];

const SAMPLE_HEADLINES = [
  'यूपी सरकार ने नई शिक्षा नीति लागू करने का ऐलान किया',
  'लखनऊ में मेट्रो का दूसरा चरण शुरू, पीएम मोदी ने उद्घाटन किया',
  'कानपुर में पुलिस और अपराधियों के बीच मुठभेड़, दो गिरफ्तार',
  'वाराणसी में संगम तट पर सफाई अभियान चल रहा है',
  'आगरा में ताज महल के आसपास ट्रैफिक व्यवस्था में बदलाव',
  'मेरठ यूनिवर्सिटी के रिजल्ट आज जारी होंगे',
  'गाजियाबाद में नया फ्लाईओवर खोला गया',
  'नोएडा में आईटी कंपनियों ने वर्क फ्रॉम होम बढ़ाया',
  'इलाहाबाद हाईकोर्ट ने महत्वपूर्ण फैसला सुनाया',
  'गोरखपुर में अस्पताल में ऑक्सीजन की कमी की खबरें गलत: प्रशासन',
  'बरेली में किसान आंदोलन शांतिपूर्ण रहा',
  'झांसी की रानी जयंती पर कार्यक्रम आयोजित',
  'अयोध्या में राम मंदिर निर्माण की प्रगति तेज',
  'मथुरा में होली उत्सव की तैयारियां जोरों पर',
  'फिरोजाबाद में कांच उद्योग को राहत पैकेज',
];

function slug(s: string): string {
  return s
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\u0900-\u097F-]+/g, '');
}

async function main() {
  console.log('Seeding districts...');
  for (const d of UP_DISTRICTS) {
    await prisma.district.upsert({
      where: { slug: slug(d.name) },
      create: { name: d.name, nameHi: d.nameHi, slug: slug(d.name), division: d.division },
      update: {},
    });
  }

  console.log('Seeding categories...');
  const categoryIds: string[] = [];
  for (const c of CATEGORIES) {
    const cat = await prisma.category.upsert({
      where: { slug: c.slug },
      create: { nameHi: c.nameHi, nameEn: c.nameEn, slug: c.slug, color: c.color, icon: c.icon, sortOrder: c.sortOrder },
      update: {},
    });
    categoryIds.push(cat.id);
  }

  console.log('Seeding authors...');
  const authors = await Promise.all([
    prisma.author.upsert({
      where: { slug: 'ram-kumar' },
      create: { name: 'राम कुमार', slug: 'ram-kumar', designation: 'वरिष्ठ संवाददाता, लखनऊ', email: 'ram@uttarkesri.com', bio: '15 साल का अनुभव।' },
      update: {},
    }),
    prisma.author.upsert({
      where: { slug: 'priya-sharma' },
      create: { name: 'प्रिया शर्मा', slug: 'priya-sharma', designation: 'संवाददाता, कानपुर', email: 'priya@uttarkesri.com', bio: 'राजनीति और शिक्षा कवर।' },
      update: {},
    }),
    prisma.author.upsert({
      where: { slug: 'vijay-singh' },
      create: { name: 'विजय सिंह', slug: 'vijay-singh', designation: 'खेल संवाददाता', email: 'vijay@uttarkesri.com', bio: 'क्रिकेट और फुटबॉल।' },
      update: {},
    }),
    prisma.author.upsert({
      where: { slug: 'anita-devi' },
      create: { name: 'अनीता देवी', slug: 'anita-devi', designation: 'संवाददाता, वाराणसी', email: 'anita@uttarkesri.com', bio: 'सामाजिक मुद्दे।' },
      update: {},
    }),
    prisma.author.upsert({
      where: { slug: 'suresh-yadav' },
      create: { name: 'सुरेश यादव', slug: 'suresh-yadav', designation: 'किसान संवाददाता', email: 'suresh@uttarkesri.com', bio: 'मंडी और किसान नीति।' },
      update: {},
    }),
  ]);

  const defaultImage = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800';
  const defaultBody = { type: 'doc', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'यह नमूना लेख की सामग्री है। विस्तार से पढ़ने के लिए पूरा लेख पढ़ें।' }] }] };
  const defaultBodyText = 'यह नमूना लेख की सामग्री है। विस्तार से पढ़ने के लिए पूरा लेख पढ़ें।';

  console.log('Seeding articles...');
  let articleCount = 0;
  for (let i = 0; i < 50; i++) {
    const catIndex = i % CATEGORIES.length;
    const author = authors[i % authors.length];
    const category = await prisma.category.findFirst({ where: { slug: CATEGORIES[catIndex].slug } });
    if (!category) continue;
    const title = SAMPLE_HEADLINES[i % SAMPLE_HEADLINES.length] + (i > 15 ? ` ${i}` : '');
    const articleSlug = slug(title) + '-' + Date.now() + '-' + i;
    await prisma.article.create({
      data: {
        title,
        slug: articleSlug,
        excerpt: title + ' — पूरी खबर पढ़ें उत्तर केसरी पर।',
        body: defaultBody,
        bodyText: defaultBodyText,
        featuredImage: defaultImage,
        featuredImageAlt: title,
        status: 'PUBLISHED',
        isBreaking: i < 3,
        isLive: i === 0,
        categoryId: category.id,
        authorId: author.id,
        readTimeMinutes: 2,
        publishedAt: new Date(Date.now() - i * 3600000),
        viewCount: Math.floor(Math.random() * 50000) + 1000,
      },
    });
    articleCount++;
  }

  console.log('Seeding ticker...');
  const tickerCount = await prisma.tickerItem.count();
  if (tickerCount === 0) {
    await prisma.tickerItem.createMany({
      data: [
        { text: 'यूपी सरकार ने नई योजनाओं का ऐलान किया', url: null, sortOrder: 0, isActive: true },
        { text: 'लखनऊ मेट्रो का दूसरा चरण शुरू', url: null, sortOrder: 1, isActive: true },
        { text: 'कानपुर में पुलिस ने बड़ा छापा मारा', url: null, sortOrder: 2, isActive: true },
      ],
    });
  }

  console.log('Seed complete. Districts:', UP_DISTRICTS.length, 'Categories:', CATEGORIES.length, 'Authors:', authors.length, 'Articles:', articleCount);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
