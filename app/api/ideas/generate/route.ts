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
    const { platform, category, clientEmail, niche } = await req.json();

    if (!platform || !category || !clientEmail) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    // AI-powered idea generation based on platform, category, and niche
    const idea = await generateAIIdea(platform, category, clientEmail, niche);

    return NextResponse.json({ 
      success: true, 
      idea: {
        id: `idea_${Date.now()}`,
        clientEmail,
        title: `${category.charAt(0).toUpperCase() + category.slice(1)} for ${platform}`,
        description: idea,
        platform,
        category,
        generatedAt: new Date().toISOString(),
        used: false,
      }
    });
  } catch (error) {
    console.error("Error generating idea:", error);
    return NextResponse.json({ message: "Failed to generate idea" }, { status: 500 });
  }
}

async function generateAIIdea(platform: string, category: string, clientEmail: string, niche?: string): Promise<string> {
  // If no niche provided, use generic content
  if (!niche || niche.trim() === "") {
    return generateGenericIdea(platform, category);
  }

  // Generate niche-specific AI content
  return generateNicheSpecificIdea(platform, category, niche);
}

function generateGenericIdea(platform: string, category: string): string {
  const genericIdeas = {
    hook: {
      Instagram: "Did you know that 90% of people scroll past content in the first 3 seconds? Here's how to make them stop...",
      TikTok: "POV: You're about to learn the secret that changed my life...",
      LinkedIn: "After 10 years in the industry, here's what I wish I knew from day one...",
      Facebook: "Can we talk about the elephant in the room?"
    },
    script: {
      Instagram: "Hook: Start with an unexpected fact\n\nStory: Share a relatable experience\n\nLesson: Extract the key takeaway\n\nApplication: Show how to implement it\n\nCTA: Ask a question to encourage comments",
      TikTok: "Setup: Create intrigue in the first 3 seconds\n\nConflict: Introduce tension or surprise\n\nResolution: Provide the payoff\n\nLesson: Share the key insight\n\nCTA: Encourage shares or follows",
      LinkedIn: "Opening: Start with a compelling statistic\n\nContext: Provide background and relevance\n\nAnalysis: Break down the key points\n\nImplications: Discuss what this means\n\nCTA: Encourage discussion and sharing",
      Facebook: "Personal: Start with a relatable experience\n\nUniversal: Connect it to a broader truth\n\nInsight: Share what you learned\n\nApplication: Show how others can benefit\n\nCommunity: Encourage discussion"
    },
    caption: {
      Instagram: "✨ [Engaging opening that hooks attention] ✨\n\n[Main content that provides value to your audience]\n\n[Personal touch or behind-the-scenes insight]\n\n[Call to action - ask a question or encourage engagement]\n\n#hashtags #relevant #tags #for #discovery",
      TikTok: "POV: [Relatable scenario]\n\n[Build the story]\n\n[Add the twist or lesson]\n\n[Encourage shares]\n\n#fyp #viral #relatable #trending",
      LinkedIn: "After [time period] in [industry], here's what I've learned:\n\n[Key insights]\n\n[Personal experience]\n\n[Professional implications]\n\nWhat's your experience with this? Share below! 👇",
      Facebook: "Can we talk about [topic]?\n\n[Share your perspective]\n\n[Add personal experience]\n\n[Encourage discussion]\n\nWhat do you think? Share your thoughts below! 💭"
    },
    outline: {
      Instagram: "1. Hook: [Attention-grabbing opening]\n2. Problem: [Identify pain point]\n3. Solution: [Your approach]\n4. Benefits: [What they gain]\n5. CTA: [Clear next step]",
      TikTok: "1. Setup: [Create intrigue in 3 seconds]\n2. Conflict: [Introduce tension]\n3. Resolution: [Provide payoff]\n4. Lesson: [Key insight]\n5. CTA: [Encourage shares]",
      LinkedIn: "1. Opening: [Compelling statistic/insight]\n2. Context: [Background and relevance]\n3. Analysis: [Break down key points]\n4. Implications: [What this means]\n5. CTA: [Encourage discussion]",
      Facebook: "1. Personal: [Relatable experience]\n2. Universal: [Broader truth]\n3. Insight: [What you learned]\n4. Application: [How others benefit]\n5. Community: [Encourage discussion]"
    }
  };

  return genericIdeas[category as keyof typeof genericIdeas]?.[platform as keyof typeof genericIdeas.hook] || 
         "Generate engaging content that resonates with your audience and drives meaningful engagement.";
}

function generateNicheSpecificIdea(platform: string, category: string, niche: string): string {
  const nicheNormalized = niche.toLowerCase().trim();
  
  // AI-powered niche-specific content generation
  switch (category) {
    case "hook":
      return generateNicheHook(platform, nicheNormalized);
    case "script":
      return generateNicheScript(platform, nicheNormalized);
    case "caption":
      return generateNicheCaption(platform, nicheNormalized);
    case "outline":
      return generateNicheOutline(platform, nicheNormalized);
    default:
      return `Create engaging ${niche} content that resonates with your target audience.`;
  }
}

function generateNicheHook(platform: string, niche: string): string {
  const hooks = {
    Instagram: [
      `Did you know that 90% of ${niche} businesses fail because of this one mistake?`,
      `The ${niche} secret that changed everything for my clients...`,
      `Why most ${niche} professionals are doing it wrong (and how to fix it)`,
      `This ${niche} trend is about to explode - here's how to get ahead`,
      `The uncomfortable truth about the ${niche} industry that nobody talks about`
    ],
    TikTok: [
      `POV: You're a ${niche} business owner who just discovered this game-changing secret`,
      `This is why I stopped following traditional ${niche} advice`,
      `The ${niche} mistake that's costing you thousands every month`,
      `What they don't tell you about starting a ${niche} business`,
      `The ${niche} industry doesn't want you to know this`
    ],
    LinkedIn: [
      `After 10 years in ${niche}, here's what I wish someone told me on day one`,
      `The ${niche} skill that separates successful professionals from the rest`,
      `Why most ${niche} strategies fail (and what actually works)`,
      `The future of ${niche} is changing - are you ready?`,
      `How I transformed my ${niche} business with this one insight`
    ],
    Facebook: [
      `Can we talk about what's really happening in the ${niche} world?`,
      `As a ${niche} professional, this realization changed everything`,
      `The ${niche} conversation nobody wants to have`,
      `Why I'm passionate about helping ${niche} businesses succeed`,
      `The biggest ${niche} myth that's holding you back`
    ]
  };

  const platformHooks = hooks[platform as keyof typeof hooks] || hooks.Instagram;
  return platformHooks[Math.floor(Math.random() * platformHooks.length)];
}

function generateNicheScript(platform: string, niche: string): string {
  const scripts = {
    Instagram: `Hook: Start with a surprising ${niche} statistic or fact

Story: Share a real ${niche} success story or case study

Problem: Identify the biggest challenge ${niche} businesses face

Solution: Present your proven ${niche} strategy or approach

Proof: Show results, testimonials, or before/after examples

CTA: Ask viewers to share their ${niche} experiences or questions`,

    TikTok: `Setup: Create intrigue about a ${niche} secret or trend (first 3 seconds)

Build: Show the common ${niche} mistake everyone makes

Revelation: Reveal the correct ${niche} approach that actually works

Transformation: Show the dramatic difference this makes

CTA: Encourage viewers to try this ${niche} strategy and share results`,

    LinkedIn: `Opening: Share a compelling ${niche} industry insight or statistic

Context: Explain why this matters for ${niche} professionals right now

Analysis: Break down the key factors affecting ${niche} success

Case Study: Share a specific ${niche} example or client story

Implications: Discuss what this means for the future of ${niche}

CTA: Invite ${niche} professionals to share their experiences`,

    Facebook: `Personal: Start with your ${niche} journey or experience

Challenge: Describe a common ${niche} problem your audience faces

Discovery: Share what you learned about solving ${niche} challenges

Solution: Explain your approach to ${niche} success

Community: Connect with others in the ${niche} space

CTA: Encourage ${niche} professionals to join the conversation`
  };

  return scripts[platform as keyof typeof scripts] || scripts.Instagram;
}

function generateNicheCaption(platform: string, niche: string): string {
  const captions = {
    Instagram: `🚀 ${niche.charAt(0).toUpperCase() + niche.slice(1)} game-changer alert! 🚀

Here's what I learned after working with 100+ ${niche} businesses:

[Share your key insight about the ${niche} industry]

The biggest mistake I see ${niche} professionals make? [Common mistake]

Instead, try this: [Your solution]

Results? [Expected outcome for ${niche} businesses]

What's your biggest ${niche} challenge right now? Drop it below! 👇

#${niche.replace(/\s+/g, '')} #${niche.replace(/\s+/g, '')}business #entrepreneur #success #tips`,

    TikTok: `POV: You're a ${niche} business owner who just discovered this secret

[Tell the ${niche} story]

[Share the transformation]

[Encourage others to try]

Who else is in the ${niche} space? Let's connect! 

#${niche.replace(/\s+/g, '')} #${niche.replace(/\s+/g, '')}business #entrepreneur #fyp #viral #businesstips`,

    LinkedIn: `The ${niche} industry is evolving rapidly, and here's what I'm seeing:

[Share your ${niche} industry insight]

After working with dozens of ${niche} professionals, I've noticed:
• [Key observation 1]
• [Key observation 2] 
• [Key observation 3]

For ${niche} businesses looking to scale, my advice is:
[Your recommendation]

What trends are you seeing in ${niche}? I'd love to hear your perspective! 👇

#${niche.replace(/\s+/g, '')} #${niche.replace(/\s+/g, '')}industry #business #professional #growth`,

    Facebook: `Fellow ${niche} professionals - can we talk?

I've been in the ${niche} space for [time period], and I keep seeing the same patterns:

[Share your ${niche} observation]

Here's what's working for successful ${niche} businesses:
[Your strategy]

And here's what's not:
[Common mistake]

If you're in ${niche}, what's your biggest challenge right now? Let's help each other out! 💪

#${niche.replace(/\s+/g, '')} #${niche.replace(/\s+/g, '')}community #business #support`
  };

  return captions[platform as keyof typeof captions] || captions.Instagram;
}

function generateNicheOutline(platform: string, niche: string): string {
  const outlines = {
    Instagram: `1. Hook: Share a surprising ${niche} statistic or trend
2. Problem: Identify the main challenge ${niche} businesses face
3. Solution: Present your proven ${niche} strategy
4. Benefits: Show what ${niche} professionals gain
5. Social Proof: Share ${niche} success stories or results
6. CTA: Ask ${niche} audience to engage or take action`,

    TikTok: `1. Setup: Create intrigue about ${niche} secret (3 seconds)
2. Problem: Show common ${niche} struggle or mistake
3. Revelation: Reveal the ${niche} solution that works
4. Transformation: Show before/after for ${niche} business
5. Proof: Quick ${niche} success story or result
6. CTA: Encourage ${niche} professionals to try and share`,

    LinkedIn: `1. Opening: Share compelling ${niche} industry insight
2. Context: Explain current ${niche} market situation
3. Analysis: Break down key ${niche} success factors
4. Case Study: Present specific ${niche} example
5. Implications: Discuss future of ${niche} industry
6. CTA: Invite ${niche} professionals to connect and discuss`,

    Facebook: `1. Personal: Share your ${niche} journey or experience
2. Community: Connect with ${niche} audience's struggles
3. Insight: Reveal what you've learned about ${niche}
4. Value: Provide actionable ${niche} advice or tips
5. Engagement: Ask ${niche} community for their input
6. CTA: Encourage ${niche} professionals to share and connect`
  };

  return outlines[platform as keyof typeof outlines] || outlines.Instagram;
}
