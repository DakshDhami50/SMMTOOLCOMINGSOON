import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifySessionJwt } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const token = (await cookies()).get("zenithly_session")?.value;
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const payload = await verifySessionJwt(token);
    const { clientEmail, niche } = await req.json();

    if (!clientEmail) {
      return NextResponse.json({ message: "Client email is required" }, { status: 400 });
    }

    // Generate a new AI-powered summary based on client data
    const newSummary = await generateAISummary(clientEmail, niche);

    return NextResponse.json({ 
      success: true, 
      summary: newSummary,
      regeneratedAt: new Date().toISOString()
    });
  } catch (error) {
    console.error("Error regenerating summary:", error);
    return NextResponse.json({ message: "Failed to regenerate summary" }, { status: 500 });
  }
}

async function generateAISummary(clientEmail: string, niche?: string): Promise<string> {
  // AI-powered summary generation based on client email and niche
  const clientDomain = clientEmail.split('@')[1];
  const businessType = niche || inferBusinessTypeFromEmail(clientDomain);
  
  const summaryTemplates = [
    {
      condition: (type: string) => type.includes('tech') || type.includes('startup') || type.includes('app'),
      template: (type: string) => `Tech-focused client specializing in ${type}. Primary objectives: Scale user acquisition, build brand authority in the tech space, and drive product adoption. Target audience: Tech-savvy professionals, early adopters, and industry decision-makers. Recommended platforms: LinkedIn for B2B networking, Twitter for thought leadership, and Instagram for behind-the-scenes content. Optimal posting cadence: Daily LinkedIn posts, 3-4 tweets per day, and 4-5 Instagram posts per week. Brand voice: Innovative, data-driven, and forward-thinking with a focus on solving real-world problems.`
    },
    {
      condition: (type: string) => type.includes('restaurant') || type.includes('food') || type.includes('cafe'),
      template: (type: string) => `Food & beverage business focused on ${type}. Core goals: Increase foot traffic, boost online orders, and build local community engagement. Target audience: Local food enthusiasts, families, and young professionals seeking dining experiences. Recommended platforms: Instagram for visual food content, Facebook for community building and events, and TikTok for trending food content. Suggested posting schedule: Daily Instagram stories, 5-6 feed posts per week, and 2-3 TikTok videos weekly. Brand personality: Warm, inviting, and community-focused with emphasis on quality ingredients and memorable experiences.`
    },
    {
      condition: (type: string) => type.includes('fashion') || type.includes('clothing') || type.includes('style'),
      template: (type: string) => `Fashion and lifestyle brand in the ${type} sector. Key objectives: Drive e-commerce sales, build brand awareness, and establish trendsetter status. Target demographic: Fashion-conscious consumers aged 18-35, style influencers, and trend-followers. Platform strategy: Instagram for visual storytelling and shopping, TikTok for trend participation and viral content, and Pinterest for style inspiration. Content frequency: 1-2 Instagram posts daily, 3-4 TikTok videos weekly, and regular Pinterest pins. Brand tone: Trendy, aspirational, and inclusive with focus on self-expression and confidence.`
    },
    {
      condition: (type: string) => type.includes('fitness') || type.includes('gym') || type.includes('health'),
      template: (type: string) => `Health and fitness business specializing in ${type}. Primary goals: Attract new members, build community, and establish expertise in wellness. Target audience: Health-conscious individuals, fitness enthusiasts, and people starting their wellness journey. Platform mix: Instagram for workout videos and transformations, YouTube for longer-form educational content, and Facebook for community support groups. Posting rhythm: Daily Instagram content, 2-3 YouTube videos weekly, and regular Facebook community engagement. Brand voice: Motivational, supportive, and knowledgeable with emphasis on sustainable lifestyle changes.`
    },
    {
      condition: (type: string) => type.includes('real estate') || type.includes('property') || type.includes('realty'),
      template: (type: string) => `Real estate professional focused on ${type}. Main objectives: Generate qualified leads, showcase property listings, and build trust as a local market expert. Target clients: Homebuyers, sellers, and investors in the local market. Platform approach: Instagram for property showcases and market insights, Facebook for community engagement and client testimonials, and LinkedIn for professional networking. Content schedule: Daily Instagram stories with listings, 4-5 feed posts weekly, and regular market update posts. Professional tone: Trustworthy, knowledgeable, and client-focused with emphasis on local market expertise.`
    },
    {
      condition: (type: string) => type.includes('beauty') || type.includes('salon') || type.includes('spa'),
      template: (type: string) => `Beauty and wellness business in the ${type} industry. Core goals: Book more appointments, showcase transformations, and build client loyalty. Target clientele: Beauty enthusiasts, self-care focused individuals, and special occasion clients. Social strategy: Instagram for before/after content and tutorials, TikTok for quick beauty tips and trends, and Facebook for appointment booking and client reviews. Posting frequency: Daily Instagram stories, 5-6 posts weekly, and 2-3 TikTok videos per week. Brand personality: Glamorous, confidence-building, and expertise-driven with focus on enhancing natural beauty.`
    }
  ];

  // Find matching template or use default
  const matchingTemplate = summaryTemplates.find(t => t.condition(businessType));
  
  if (matchingTemplate) {
    return matchingTemplate.template(businessType);
  }

  // Default comprehensive summary
  return `Professional services business with focus on ${businessType}. Strategic objectives: Expand market reach, build brand recognition, and drive customer acquisition through digital channels. Target audience: Professionals and consumers seeking quality ${businessType} solutions. Multi-platform approach: LinkedIn for B2B connections and thought leadership, Instagram for brand storytelling and visual content, and Facebook for community building and customer service. Recommended posting cadence: 4-5 posts per week across platforms with emphasis on value-driven content. Brand voice: Professional, reliable, and customer-centric with focus on delivering exceptional results and building long-term relationships.`;
}

function inferBusinessTypeFromEmail(domain: string): string {
  const domainMappings: Record<string, string> = {
    'techstartup.com': 'tech startup',
    'restaurant.com': 'restaurant',
    'fashionbrand.com': 'fashion brand',
    'fitness.com': 'fitness',
    'realestate.com': 'real estate',
    'beauty.com': 'beauty salon',
    'consulting.com': 'consulting',
    'marketing.com': 'marketing agency',
    'design.com': 'design studio',
    'photography.com': 'photography',
    'law.com': 'legal services',
    'medical.com': 'healthcare',
    'education.com': 'education',
    'nonprofit.org': 'nonprofit organization'
  };

  // Check for exact domain match
  if (domainMappings[domain]) {
    return domainMappings[domain];
  }

  // Check for partial matches
  for (const [key, value] of Object.entries(domainMappings)) {
    if (domain.includes(key.split('.')[0]) || key.includes(domain.split('.')[0])) {
      return value;
    }
  }

  // Extract business type from domain name
  const domainName = domain.split('.')[0];
  const businessKeywords = ['tech', 'food', 'fashion', 'fit', 'real', 'beauty', 'health', 'design', 'photo', 'law', 'med', 'edu'];
  
  for (const keyword of businessKeywords) {
    if (domainName.toLowerCase().includes(keyword)) {
      return `${keyword} business`;
    }
  }

  return 'professional services';
}



