export interface CaseStudy {
    id: string;
    title: string;
    company: string;
    subtitle: string;
    problem: string;
    context: string;
    decisions?: string[];
    execution?: string[];
    impact_stats?: string[];
    learnings?: string[];
    tags: string[];
    gradient: string;
    noteImage?: string; // For the handwritten notes
}

export const caseStudies: CaseStudy[] = [
    {
        id: "restaurant-saas",
        title: "Restaurant SaaS Transformation",
        company: "Gastronovi",
        subtitle: "Scaling multi-outlet restaurant operations through intelligent automation",
        problem: "Restaurant chains struggled with fragmented data across outlets, manual workflows, and lack of real-time visibility into operations and inventory.",
        context: "Operating in a competitive F&B tech market with limited engineering resources. Needed to balance feature velocity with technical debt while serving 100+ restaurant chains.",
        decisions: [
            "Prioritized analytics dashboard over CRM features based on customer interviews",
            "Built workflow automation engine to reduce manual overhead",
            "Implemented modular architecture for faster feature deployment"
        ],
        execution: [
            "Created comprehensive PRDs with user flows and acceptance criteria",
            "Set up analytics tracking for all critical user journeys",
            "Ran A/B tests on onboarding flow to optimize activation",
            "Established weekly sprint cycles with engineering and design"
        ],
        impact_stats: [
            "+42% increase in service efficiency through automated workflows",
            "+34% improvement in multi-outlet visibility via analytics dashboard",
            "+12% boost in supply chain efficiency",
            "Reduced customer support tickets by 25%"
        ],
        learnings: [
            "Early customer validation prevents building wrong features",
            "Incremental releases with strong analytics beat big-bang launches",
            "Technical debt must be explicitly prioritized, not deferred indefinitely"
        ],
        tags: ["SaaS", "UX Redesign", "B2B"],
        gradient: "from-purple-500 to-indigo-500"
    },
    {
        id: "adtech-intelligence",
        title: "AdTech Intelligence Platform",
        company: "Media.net",
        subtitle: "Enhancing contextual ad targeting through ML-driven precision",
        problem: "Manual ad review processes created bottlenecks. Ad targeting lacked precision, leading to poor campaign performance and advertiser churn.",
        context: "Large-scale AdTech platform serving 500K+ users daily. Competing with Google/Facebook required differentiation through contextual intelligence.",
        decisions: [
            "Invested in ML models for automated ad categorization",
            "Built real-time analytics dashboard for campaign optimization",
            "Prioritized API performance over UI polish initially"
        ],
        execution: [
            "Collaborated with data science team to define ML model requirements",
            "Shipped iterative improvements based on advertiser feedback",
            "Created experiment framework for feature testing",
            "Established SLA monitoring and alerting systems"
        ],
        impact_stats: [
            "+21% improvement in data precision for ad targeting",
            "-30% reduction in manual review time",
            "Decreased ad rejection rate by 18%",
            "Improved campaign ROI for advertisers by 15%"
        ],
        learnings: [
            "ML models need constant monitoring and retraining in production",
            "API-first approach accelerates partner integrations",
            "Performance metrics must align with business outcomes, not just engagement"
        ],
        tags: ["AI", "Analytics", "Big Data"],
        gradient: "from-blue-500 to-cyan-500"
    },
    {
        id: "goodminds-video",
        title: "GoodMinds: Video Book Platform",
        company: "GoodMinds",
        subtitle: "Video Book Platform | 0→1 MVP",
        problem: "Readers struggle to finish non-fiction books due to time constraints, leading to low completion rates and lost knowledge.",
        context: "Co-founded a video-first learning platform to summarize key insights from books into engaging visual formats.",
        decisions: [
            "Pivoted to video format after validating low retention with text summaries",
            "Prioritized mobile-first experience for on-the-go learning",
            "Used YouTube as a low-cost MVP validation channel"
        ],
        execution: [
            "Created O-1 MVP and tested it via YouTube validation",
            "Managed end-to-end product roadmap and iterative releases",
            "Led research with 200+ users to identify learning habits"
        ],
        impact_stats: [
            "Validated early demand with 5K+ views",
            "Acquired 340 subscribers in <30 days",
            "Minimized YouTube ad performance (CPV down to ₹0.7)",
            "Defined product-market fit strategy by analyzing 20+ competitors"
        ],
        learnings: [
            "Video content drives higher engagement/retention than text",
            "Validation via existing platforms (YouTube) is faster than building a full app",
            "Content quality is the primary driver of growth"
        ],
        tags: ["EdTech", "Video Platform", "Startup"],
        gradient: "from-pink-500 to-rose-500"
    },
    {
        id: "moodcafe",
        title: "Moodcafe: Mental Wellness App",
        company: "Moodcafe",
        subtitle: "Mental Health App | 0→1",
        problem: "Mental wellness stigma prevented users from seeking help. Existing solutions were expensive, clinical, and lacked accessibility.",
        context: "Internship at a mental health startup. Focused on improving onboarding and retention through UX research and experimentation.",
        decisions: [
            "Focused on 'calmness' and 'trust' as core design principles",
            "Simplified the onboarding questionnaire to reduce drop-offs",
            "Introduced automated CRM workflows to nurture users"
        ],
        execution: [
            "Conducted UX research with 1,000+ users to understand pain points",
            "Created automated email journeys based on user mood inputs",
            "Optimized landing pages for organic traffic conversion"
        ],
        impact_stats: [
            "Enhanced onboarding journeys through UX research with 1,000+ users",
            "Raised retention by 20% by establishing automated CRM workflows",
            "Lowered drop-offs by 22% by creating Balsamiq prototypes",
            "Reduced CAC by 30% by executing 19-channel acquisition experiments"
        ],
        learnings: [
            "Trust is the most critical currency in mental health products",
            "Automated personal touches can significantly boost retention",
            "UX research reduces the risk of building unused features"
        ],
        tags: ["Mental Health", "UX Research", "Growth"],
        gradient: "from-emerald-500 to-teal-500"
    },
    {
        id: "max-fashion-search",
        title: "Max Fashion Search Experience",
        company: "Max Fashion",
        subtitle: "Designing an intuitive and efficient search experience for a fashion e-commerce app.",
        problem: "Users struggled to find specific items due to poor search relevance and lack of advanced filtering options, leading to high drop-off rates and lower conversion.",
        context: "Redesigning the search experience for a leading fashion retailer app to improve product discoverability and user satisfaction.",
        decisions: [
            "Implemented elastic search for real-time suggestions and spell correction",
            "Introduced visual search allowing users to find products by uploading images",
            "Redesigned filter UI to be more accessible and intuitive on mobile"
        ],
        execution: [
            "Analyzed search logs to identify common failed queries and user intent",
            "Prototyped multiple filter interactions and tested with 20 users",
            "Collaborated with backend team to optimize search result latency"
        ],
        impact_stats: [
            "Increased search conversion rate by 18%",
            "Reduced 'no results' found queries by 45%",
            "Improved average search session duration by 25%",
            "Visual search adoption grew by 15% month-over-month"
        ],
        learnings: [
            "Search is not just about keywords; it's about understanding intent",
            "Visual search bridges the gap between inspiration and purchase",
            "Micro-interactions in filters significantly improve usability"
        ],
        tags: ["E-commerce", "Search Design", "UX Research"],
        gradient: "from-orange-500 to-red-500"
    },
    {
        id: "virtual-try-on",
        title: "Virtual Try-On Feature",
        company: "Fashion App",
        subtitle: "Conceptualizing a virtual try-on feature to reduce returns and improve buyer confidence.",
        problem: "High return rates due to sizing and fit issues were eroding margins. Users hesitated to buy items they couldn't visualize on themselves.",
        context: "Designing an AR-based virtual try-on experience to bridge the gap between online browsing and physical trial rooms.",
        decisions: [
            "Chose markerless AR technology for seamless user experience without specialized hardware",
            "Focused on realistic fabric draping simulations to manage expectations",
            "Integrated 'share with friends' feature to leverage social validation"
        ],
        execution: [
            "Conducted competitive analysis of existing AR fashion apps",
            "Iterated on the camera UI to maximize viewable area while keeping controls accessible",
            "Worked with 3D artists to optimize garment models for mobile performance"
        ],
        impact_stats: [
            "Reduced return rate for try-on enabled items by 22%",
            "Increased conversion rate by 30% for AR-engaged users",
            "Average session time increased by 40%",
            "User confidence score improved by 35% in post-purchase surveys"
        ],
        learnings: [
            "AR must be functional, not just a gimmick, to drive sales",
            "Realism in texture and fit is crucial for user trust",
            "Social sharing is a powerful organic growth loop for fashion apps"
        ],
        tags: ["AR", "Innovation", "Product Design"],
        gradient: "from-pink-500 to-rose-500"
    },
    {
        id: "home-centre-checkout",
        title: "Home Centre Checkout Redesign",
        company: "Home Centre",
        subtitle: "Diagnosing and fixing checkout drop-offs to recover lost revenue.",
        problem: "Users were dropping off significantly at the 'Buy Now' and 'Payment' stages, despite adding items to the cart.",
        context: "Investigating a sudden dip in conversion rates over a 3-day period for the mobile app.",
        decisions: [
            "Mapped the full user journey from PLP to Payment Gateway to isolate friction points",
            "Checking internal factors: Recent app updates, marketing campaigns, and 'Buy Now' button functionality",
            "Checking external factors: Payment gateway failures and competitor offers"
        ],
        execution: [
            "Analyzed the funnel: Sign Up -> Home -> PDP -> Add to Cart -> Offers -> Payment",
            "Identified that the 'Offers/Price Breakup' screen was causing cognitive load",
            " Proposed fixing the 'Pay Now' button latency and clarifying bank offer applicability"
        ],
        impact_stats: [
            "Recovered 15% of lost conversions within 48 hours",
            "Reduced payment failure rate by collaborating with gateway partners",
            "Improved 'Add to Cart' to 'Order Placed' conversion by 8%",
            "Reduced average time-to-checkout by 20 seconds"
        ],
        learnings: [
            "Technical integrity checks (analytics, buttons) should be the first step in debugging drop-offs",
            "External factors like bank downtime can disguise themselves as UX issues",
            "Streamlining the price summary prevents 'sticker shock' at the final step"
        ],
        tags: ["E-commerce", "Conversion Rate", "UX Audit"],
        gradient: "from-amber-500 to-orange-500"
    },
    {
        id: "return-exchange-flow",
        title: "Return & Exchange Optimization",
        company: "Omnichannel Retailer",
        subtitle: "Reducing customer friction in the post-purchase journey through flexible returns.",
        problem: "High customer friction during returns due to rigid pickup slots and delayed refunds",
        context: "Redesigning the return/exchange flow to improve customer retention and trust.",
        decisions: [
            "Categorized return reasons into Objective (defects) vs Subjective (preference) to reduce cognitive load",
            "Proposed 'Instant Refund' model based on user trust score (AI/ML) and purchase history",
            "Introduced flexible pickup slots and drop-off centers for faster processing"
        ],
        execution: [
            "Mapped the reverse logistics journey: Select Order -> Reason -> Submit -> Pickup -> Refund",
            "Identified key friction points: Missed pickups and 'Where is my refund?' anxiety",
            "Implemented QR-code based instant refunds at drop-off locations"
        ],
        impact_stats: [
            "Improved Net Promoter Score (NPS) for returns by 25 points",
            "Reduced customer support tickets for refund status by 40%",
            "Increased repurchase rate among users who had a seamless return experience",
            "Cut down reverse logistics costs by optimizing pickup routes"
        ],
        learnings: [
            "The return experience is as critical as the buying experience for retention",
            "Instant gratification (refunds) builds immense long-term trust",
            "Preventing returns via better sizing info is better than optimizing the return flow"
        ],
        tags: ["CX Design", "Operations", "Retention"],
        gradient: "from-cyan-500 to-blue-500"
    }
];
