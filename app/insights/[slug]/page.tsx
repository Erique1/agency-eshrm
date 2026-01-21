import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowRight, Calendar, Clock, Share2, Linkedin, Twitter, Facebook } from "lucide-react"

const blogPosts = {
  "hr-zimbabwe-economic-challenges": {
    title: "Navigating HR Challenges in Zimbabwe's Economic Environment",
    excerpt:
      "Explore how Zimbabwean businesses can maintain effective HR practices amidst currency fluctuations and economic uncertainties.",
    category: "HR Trends",
    tags: ["HR Trends", "Zimbabwe", "Economic Challenges"],
    author: "Eric",
    authorRole: "HR Consultant, ESHRM",
    authorImage: "/placeholder.svg",
    image: "/images/digital.jpg",
    publishedAt: "January 15, 2026",
    readTime: "8 min read",
    content: `
      <p>In the ever-evolving landscape of Zimbabwe's economy, HR professionals face unprecedented challenges that demand innovative solutions and adaptive strategies. As organizations navigate through currency fluctuations, inflationary pressures, and economic reforms, the role of human resources becomes increasingly critical in maintaining workforce stability and driving organizational resilience. This comprehensive guide explores practical approaches for managing HR effectively in Zimbabwe's dynamic economic environment, providing actionable insights for HR leaders and business executives alike.</p>

      <h2>The Zimbabwean Economic Context: A Framework for HR Strategy</h2>
      <p>Zimbabwe's economic journey over the past decade has been characterized by significant transformations, including the adoption of a multi-currency system, efforts to combat hyperinflation, and ongoing structural reforms aimed at economic stabilization. These macroeconomic factors create a complex operating environment that directly impacts every aspect of human resource management. From compensation structures and employee motivation to talent retention and organizational development, HR practices must be designed to withstand economic volatility while supporting business objectives.</p>
      <p>The introduction of the United States dollar as legal tender alongside local currency in 2009 marked a turning point in Zimbabwe's economic landscape. While this move brought relative stability, it also introduced new challenges for HR practitioners, including the need to manage dual-currency payroll systems, navigate exchange rate fluctuations, and address the psychological impacts of economic uncertainty on the workforce.</p>

      <h2>Adaptive Compensation Strategies in Volatile Markets</h2>
      <p>Traditional fixed salary approaches, while straightforward, may not adequately address the realities of Zimbabwe's economic environment. Organizations must develop flexible compensation models that account for currency fluctuations, inflationary pressures, and changing cost-of-living indices. This requires a multi-faceted approach that combines fixed base salaries with performance-based incentives, cost-of-living adjustments, and non-monetary benefits that maintain employee purchasing power and motivation.</p>
      <p>One effective strategy is the implementation of indexed compensation systems that automatically adjust salaries based on official inflation rates or cost-of-living indices. Additionally, organizations should consider diversifying compensation packages to include benefits such as housing allowances, transportation support, and access to subsidized goods and services. These measures help maintain employee financial stability and demonstrate organizational commitment to workforce wellbeing during economic uncertainty.</p>

      <h2>Supporting Employee Wellbeing and Psychological Resilience</h2>
      <p>Economic uncertainty can create significant stress and anxiety among employees, manifesting in reduced productivity, increased absenteeism, and higher turnover rates. HR professionals must prioritize mental health support and wellbeing initiatives that address the psychological impacts of economic volatility. This includes establishing employee assistance programs that provide counseling services, financial planning advice, and stress management workshops.</p>
      <p>Clear and transparent communication becomes paramount during periods of economic uncertainty. Regular town hall meetings, employee newsletters, and leadership updates help maintain trust and reduce anxiety. Organizations should also invest in resilience-building programs that equip employees with coping strategies and foster a culture of adaptability and optimism.</p>

      <h2>Talent Retention Strategies Beyond Financial Compensation</h2>
      <p>In challenging economic times, retaining skilled employees becomes a strategic imperative for organizational success. While competitive compensation remains important, successful retention strategies must go beyond salary to create comprehensive value propositions that address employees' holistic needs. This includes providing clear career development paths, meaningful work opportunities, and a supportive organizational culture that fosters loyalty and commitment.</p>
      <p>Mentorship programs, professional development opportunities, and work-life balance initiatives become particularly valuable during economic uncertainty. Organizations that invest in their employees' growth and wellbeing during difficult times build stronger, more resilient workforces that are better equipped to navigate future challenges. Additionally, creating a sense of purpose and organizational mission helps employees maintain motivation and commitment even when external economic conditions are challenging.</p>

      <h2>Building Organizational Resilience for Long-Term Success</h2>
      <p>Ultimately, effective HR management in Zimbabwe's economic environment requires a strategic focus on building organizational resilience. This involves developing contingency plans for various economic scenarios, maintaining flexible operational models, and fostering a culture of innovation and adaptability. HR leaders must position themselves as strategic partners in organizational success, anticipating economic trends and developing proactive strategies that support both employee wellbeing and business objectives.</p>
      <p>As Zimbabwe continues its economic recovery and growth trajectory, organizations that invest in adaptive HR practices will be best positioned to attract, retain, and develop the talent needed for sustainable success. The key lies in balancing immediate economic realities with long-term organizational development goals, creating HR strategies that are both responsive to current challenges and proactive in building future capabilities.</p>
    `,
    relatedPosts: ["zimbabwe-labour-act-compliance", "workforce-planning-post-pandemic-zimbabwe"],
  },
  "zimbabwe-labour-act-compliance": {
    title: "Ensuring Compliance with Zimbabwe's Labour Act",
    excerpt: "A comprehensive guide to understanding and implementing the Labour Act requirements in your organization.",
    category: "Compliance",
    tags: ["Compliance", "Labour Act", "Zimbabwe Law"],
    author: "Kudzai",
    authorRole: "HR Specialist, ESHRM",
    authorImage: "/placeholder.svg",
    image: "/images/leadership.jpg",
    publishedAt: "January 10, 2026",
    readTime: "6 min read",
    content: `
      <p>In Zimbabwe's dynamic business environment, compliance with the Labour Act Chapter 28:01 represents more than just legal obligation—it constitutes a fundamental pillar of sustainable business practice and ethical employment relationships. As organizations navigate the complexities of workforce management in a post-reform economy, understanding and implementing the Labour Act's requirements becomes paramount for maintaining operational stability, protecting organizational reputation, and fostering positive employee relations. This comprehensive guide provides HR professionals and business leaders with the essential knowledge and practical strategies needed to achieve and maintain full compliance while building a foundation for long-term organizational success.</p>

      <h2>The Legal Framework: Understanding the Labour Act Chapter 28:01</h2>
      <p>The Labour Act Chapter 28:01 serves as Zimbabwe's primary legislation governing employment relationships, establishing the legal parameters within which all employment activities must operate. Enacted to protect the rights and interests of both employers and employees, the Act provides a comprehensive framework that addresses every aspect of the employment lifecycle—from recruitment and contracting through termination and beyond. Its provisions reflect Zimbabwe's commitment to international labor standards while accommodating the unique characteristics of the local business environment.</p>
      <p>The Act's scope extends beyond mere regulatory compliance, encompassing principles of fair treatment, workplace safety, dispute resolution mechanisms, and the promotion of harmonious industrial relations. For organizations operating in Zimbabwe, mastery of this legislation is not optional—it's essential for sustainable business operations and maintaining competitive advantage in an increasingly regulated marketplace.</p>

      <h2>Employment Contracts: The Foundation of Compliant Relationships</h2>
      <p>At the heart of the Labour Act lies the requirement for formalized employment relationships through written contracts that meet statutory standards. Every employment agreement must be documented in writing and contain specific mandatory provisions that protect both parties' interests. This includes comprehensive details on remuneration structures, working hours, leave entitlements, termination procedures, and dispute resolution mechanisms.</p>
      <p>The Act mandates that employment contracts specify the nature of employment (permanent, fixed-term, or contractual), clearly define job responsibilities and performance expectations, and establish transparent procedures for disciplinary actions and termination. Organizations must ensure that contracts are written in clear, unambiguous language that employees can understand, and that both parties receive copies of the signed agreement. This contractual foundation not only ensures legal compliance but also establishes clear expectations that reduce misunderstandings and potential disputes.</p>

      <h2>Working Hours, Overtime, and Work-Life Balance Provisions</h2>
      <p>The Labour Act establishes clear parameters for working hours and overtime arrangements that balance organizational productivity requirements with employee wellbeing. For office workers, the maximum working week is limited to 45 hours, while other categories of workers may work up to 55 hours per week. These limits reflect the Act's recognition of the importance of work-life balance and the prevention of employee burnout.</p>
      <p>Overtime provisions require that any work performed beyond normal hours be compensated at premium rates, typically time-and-a-half for the first eight hours and double time thereafter. Organizations must maintain detailed records of hours worked and overtime performed, creating an audit trail that demonstrates compliance during labor inspections. The Act also provides for rest periods, meal breaks, and restrictions on work during public holidays, ensuring that employees receive adequate time for rest and personal activities.</p>

      <h2>Leave Entitlements and Employee Benefits Framework</h2>
      <p>The Labour Act establishes comprehensive leave entitlements that constitute essential employee benefits and legal rights. Employees accrue annual leave at the rate of one day per month of service, with a maximum accumulation limit designed to encourage regular time off for rest and rejuvenation. Sick leave provisions allow employees to take up to 90 days of paid sick leave over a three-year period, providing financial security during health challenges.</p>
      <p>Maternity leave provisions are particularly progressive, granting female employees up to 98 days of paid maternity leave, with additional provisions for antenatal care and nursing breaks. The Act also provides for paternity leave, compassionate leave for family emergencies, and special leave arrangements for various circumstances. Proper administration of these entitlements requires meticulous record-keeping, timely processing of leave requests, and clear communication about employees' leave balances and rights.</p>

      <h2>Termination, Redundancy, and Dismissal Procedures</h2>
      <p>The Labour Act establishes rigorous procedures for employment termination that protect employees from arbitrary dismissal while providing employers with mechanisms to address performance issues and operational requirements. Dismissals must be based on valid reasons related to conduct, capacity, or operational requirements, and must follow fair procedures that include written warnings, opportunities for improvement, and appeals mechanisms.</p>
      <p>Redundancy situations require comprehensive consultation processes, consideration of alternative employment options, and provision of severance packages that reflect length of service and organizational capacity. The Act's provisions in this area reflect Zimbabwe's commitment to protecting vulnerable workers while maintaining business flexibility. Organizations that master these procedures not only ensure legal compliance but also build reputations as fair and responsible employers.</p>

      <h2>Dispute Resolution and Grievance Handling Mechanisms</h2>
      <p>Recognizing that disputes are inevitable in employment relationships, the Labour Act establishes comprehensive mechanisms for dispute resolution that prioritize internal resolution before external intervention. Organizations must establish internal grievance procedures that provide clear pathways for employees to raise concerns, receive fair hearings, and obtain timely resolutions.</p>
      <p>The Act encourages the use of conciliation and mediation as primary dispute resolution methods, with arbitration and labor court proceedings available as escalations. Effective implementation of these mechanisms requires trained HR personnel, documented procedures, and a commitment to fair and transparent processes. Organizations that excel in dispute resolution not only comply with legal requirements but also foster cultures of trust and open communication.</p>

      <h2>Practical Implementation Strategies for Compliance</h2>
      <p>Achieving and maintaining compliance with the Labour Act requires systematic approaches that integrate legal requirements into daily HR operations. Organizations should conduct regular compliance audits, provide ongoing training for HR staff and managers, and establish monitoring systems that identify potential issues before they become problems. Technology plays a crucial role in compliance management, with HRIS systems providing automated tracking of working hours, leave balances, and contractual obligations.</p>
      <p>Building a culture of compliance involves more than following rules—it requires creating an organizational ethos where legal requirements are seen as fundamental business practices. This involves leadership commitment, employee education, and the integration of compliance considerations into strategic decision-making processes.</p>

      <h2>The Business Benefits of Proactive Compliance</h2>
      <p>While compliance represents a legal obligation, organizations that approach it proactively often discover significant business benefits. Compliant organizations experience lower rates of labor disputes, reduced absenteeism, higher employee morale, and enhanced reputations that attract top talent. In Zimbabwe's competitive business environment, compliance excellence can become a significant differentiator that supports sustainable growth and market leadership.</p>
      <p>As Zimbabwe continues its economic development trajectory, the importance of Labor Act compliance will only increase. Organizations that invest in understanding and implementing these requirements position themselves not just for legal compliance, but for long-term business success in an increasingly regulated and competitive marketplace.</p>
    `,
    relatedPosts: ["hr-zimbabwe-economic-challenges", "talent-retention-zimbabwe-market"],
  },
  "building-resilient-teams-zimbabwe": {
    title: "Building Resilient Leadership Teams in Zimbabwe",
    excerpt:
      "Strategies for developing strong leadership capabilities that can navigate Zimbabwe's unique business challenges.",
    category: "Leadership",
    tags: ["Leadership", "Resilience", "Zimbabwe"],
    author: "Eric",
    authorRole: "HR Consultant, ESHRM",
    authorImage: "/placeholder.svg",
    image: "/images/team.jpg",
    publishedAt: "January 5, 2026",
    readTime: "7 min read",
    content: `
      <p>In Zimbabwe's complex and rapidly evolving business landscape, effective leadership transcends traditional management approaches, demanding a sophisticated blend of resilience, cultural intelligence, and strategic adaptability. As organizations navigate economic uncertainties, regulatory changes, and competitive pressures, the quality of leadership becomes the critical differentiator between sustainable success and organizational vulnerability. This comprehensive exploration examines the unique leadership imperatives of Zimbabwe's business environment and provides actionable strategies for building leadership teams capable of driving organizational excellence in challenging contexts.</p>

      <h2>The Zimbabwean Leadership Imperative: Context and Challenges</h2>
      <p>Zimbabwe's business environment presents a unique crucible for leadership development, characterized by economic volatility, regulatory complexity, and intense competitive pressures. Leaders operating in this environment must simultaneously manage short-term survival imperatives while building long-term organizational capabilities. The country's economic reforms, infrastructure development initiatives, and foreign investment inflows create both opportunities and challenges that demand sophisticated leadership responses.</p>
      <p>The legacy of economic turbulence has created a business culture that values adaptability and resilience above all else. Leaders must navigate currency fluctuations, supply chain disruptions, and regulatory uncertainty while maintaining team morale, stakeholder confidence, and strategic focus. This requires a leadership approach that combines operational excellence with strategic foresight and emotional intelligence.</p>

      <h2>Cultural Intelligence: The Foundation of Effective Leadership</h2>
      <p>Effective leadership in Zimbabwe demands deep cultural intelligence—the ability to understand, appreciate, and effectively navigate the country's diverse cultural landscape. This encompasses understanding local business customs, communication patterns, decision-making processes, and relationship-building norms that vary across different sectors and stakeholder groups. Cultural intelligence enables leaders to build trust, negotiate effectively, and create inclusive environments that leverage Zimbabwe's rich cultural diversity.</p>
      <p>Developing cultural intelligence requires intentional exposure to diverse perspectives, continuous learning about local business practices, and the cultivation of genuine relationships across cultural boundaries. Leaders who master this skill become invaluable bridges between global best practices and local realities, enabling their organizations to benefit from international knowledge while remaining firmly rooted in the Zimbabwean context.</p>

      <h2>Building Organizational Resilience Through Leadership</h2>
      <p>Economic uncertainty and rapid change require leaders who can maintain organizational stability while driving innovation and growth. Building resilience involves developing the capacity to anticipate challenges, adapt quickly to changing circumstances, and maintain team morale during difficult periods. This requires leaders who can balance short-term crisis management with long-term strategic thinking, creating organizations that not only survive turbulence but emerge stronger.</p>
      <p>Resilient leadership involves several key capabilities: emotional intelligence to manage stress and maintain team confidence, strategic flexibility to pivot when circumstances change, and the ability to foster a culture of continuous learning and adaptation. Leaders must also develop strong networks and partnerships that provide access to resources and support during challenging times.</p>

      <h2>Developing Adaptive Leadership Capabilities</h2>
      <p>Zimbabwe's business environment demands leaders who can thrive in ambiguity and complexity, making adaptive leadership capabilities essential. This involves developing skills in scenario planning, crisis management, stakeholder engagement, and change leadership. Adaptive leaders excel at reading environmental signals, anticipating trends, and mobilizing organizational resources to address emerging challenges.</p>
      <p>The development of adaptive leadership requires a commitment to continuous learning, exposure to diverse experiences, and the cultivation of networks that provide access to different perspectives and resources. Organizations that invest in developing these capabilities create leadership teams that can navigate uncertainty with confidence and drive sustainable success.</p>

      <h2>Stakeholder Relationship Management</h2>
      <p>Effective leadership in Zimbabwe requires sophisticated stakeholder relationship management skills. Leaders must navigate complex relationships with government officials, regulatory bodies, business partners, community leaders, and international stakeholders. This demands diplomatic communication, negotiation skills, and the ability to balance competing interests while advancing organizational objectives.</p>
      <p>Building strong stakeholder relationships requires consistent communication, transparency, and a commitment to mutual benefit. Leaders who excel in this area create valuable networks that provide access to opportunities, resources, and support that might otherwise be unavailable.</p>

      <h2>Leadership Development Strategies for Zimbabwean Organizations</h2>
      <p>Building resilient leadership teams requires systematic development strategies tailored to Zimbabwe's context. This includes leadership assessment and development programs, mentoring and coaching initiatives, experiential learning opportunities, and continuous feedback mechanisms. Organizations should also create leadership pipelines that identify and develop high-potential individuals at all levels.</p>
      <p>The most effective leadership development programs combine formal training with practical experience, peer learning, and ongoing support from experienced mentors. They also incorporate Zimbabwe-specific content, including local business practices, regulatory knowledge, and cultural intelligence training.</p>

      <h2>The Impact of Resilient Leadership</h2>
      <p>Organizations led by resilient, culturally intelligent leaders are better positioned to capitalize on Zimbabwe's growth opportunities while navigating its challenges. Such leadership teams create cultures of innovation, attract and retain top talent, build strong stakeholder relationships, and drive sustainable organizational success. In Zimbabwe's competitive business environment, leadership quality often determines which organizations thrive and which struggle to maintain relevance.</p>
      <p>As Zimbabwe continues its economic transformation, the need for sophisticated, resilient leadership will only increase. Organizations that invest in developing such leadership capabilities position themselves not just for survival, but for leadership in their respective sectors and contribution to the country's broader economic development objectives.</p>
    `,
    relatedPosts: ["talent-retention-zimbabwe-market", "performance-management-zimbabwe-context"],
  },
  "talent-retention-zimbabwe-market": {
    title: "Talent Retention in Zimbabwe's Competitive Job Market",
    excerpt:
      "Proven strategies to retain top talent in Harare and Bulawayo's competitive employment landscape.",
    category: "Talent Management",
    tags: ["Talent Retention", "Zimbabwe", "Harare"],
    author: "Kudzai",
    authorRole: "HR Specialist, ESHRM",
    authorImage: "/placeholder.svg",
    image: "/images/culture.jpg",
    publishedAt: "December 28, 2025",
    readTime: "9 min read",
    content: `
      <p>Zimbabwe's job market, particularly in urban centers like Harare and Bulawayo, has become increasingly competitive. Skilled professionals have more career options than ever before, making talent retention a critical strategic priority for organizations.</p>
      
      <h2>The Zimbabwe Talent Landscape</h2>
      <p>Economic growth, foreign investment, and digital transformation have created new opportunities for skilled workers. Competition for talent spans traditional sectors and emerging industries, challenging organizations to rethink their retention strategies.</p>
      
      <h2>Compensation Strategies</h2>
      <p>While competitive salaries remain important, modern retention packages include performance bonuses, benefits, and non-monetary rewards that address Zimbabwe's cost-of-living considerations and employee priorities.</p>
      
      <h2>Career Development</h2>
      <p>Zimbabwean professionals value career growth and skill development. Organizations that invest in training, mentorship, and clear career progression pathways are more successful at retaining top talent.</p>
      
      <h2>Work Environment</h2>
      <p>Creating positive work cultures that promote work-life balance, diversity, and inclusion is essential for retention in Zimbabwe's competitive market.</p>
    `,
    relatedPosts: ["building-resilient-teams-zimbabwe", "zimbabwe-labour-act-compliance"],
  },
  "performance-management-zimbabwe-context": {
    title: "Performance Management Adapted for Zimbabwe",
    excerpt:
      "How to implement effective performance management systems that align with Zimbabwean cultural values and business practices.",
    category: "HR Trends",
    tags: ["Performance Management", "Culture", "Zimbabwe"],
    author: "Eric",
    authorRole: "HR Consultant, ESHRM",
    authorImage: "/placeholder.svg",
    image: "/images/digital.jpg",
    publishedAt: "December 20, 2025",
    readTime: "6 min read",
    content: `
      <p>Effective performance management in Zimbabwe requires understanding local cultural contexts, communication styles, and business practices. This article provides guidance on implementing performance systems that drive results while respecting cultural values.</p>
      
      <h2>Cultural Considerations</h2>
      <p>Zimbabwean workplace culture values respect, hierarchy, and relationship-building. Performance management approaches must balance direct feedback with maintaining positive working relationships.</p>
      
      <h2>Communication Styles</h2>
      <p>Effective performance discussions in Zimbabwe often involve indirect communication, context-setting, and relationship-building before addressing performance issues.</p>
      
      <h2>Goal Setting</h2>
      <p>Performance objectives should align with both individual career aspirations and organizational goals, considering Zimbabwe's economic context and business priorities.</p>
    `,
    relatedPosts: ["workforce-planning-post-pandemic-zimbabwe", "building-resilient-teams-zimbabwe"],
  },
  "workforce-planning-post-pandemic-zimbabwe": {
    title: "Workforce Planning for Zimbabwe's Post-Pandemic Recovery",
    excerpt: "Strategic approaches to workforce planning that support Zimbabwe's economic recovery and growth objectives.",
    category: "Workforce Strategy",
    tags: ["Workforce Planning", "Economic Recovery", "Zimbabwe"],
    author: "Kudzai",
    authorRole: "HR Specialist, ESHRM",
    authorImage: "/placeholder.svg",
    image: "/images/afric.jpg",
    publishedAt: "December 15, 2025",
    readTime: "8 min read",
    content: `
      <p>As Zimbabwe continues its post-pandemic recovery, strategic workforce planning becomes essential for organizations aiming to capitalize on economic growth opportunities. This article explores workforce planning approaches tailored to Zimbabwe's recovery context.</p>
      
      <h2>Zimbabwe's Recovery Context</h2>
      <p>Economic reforms, infrastructure development, and foreign investment are creating new opportunities. Organizations need workforce strategies that support growth while addressing skills gaps and talent shortages.</p>
      
      <h2>Skills Assessment</h2>
      <p>Understanding current workforce capabilities and future skill requirements is crucial for effective planning in Zimbabwe's evolving economy.</p>
      
      <h2>Talent Development Strategies</h2>
      <p>Investing in local talent development, partnerships with educational institutions, and targeted recruitment strategies can help organizations build the workforce needed for sustainable growth.</p>
    `,
    relatedPosts: ["performance-management-zimbabwe-context", "hr-zimbabwe-economic-challenges"],
  },
}

export function generateStaticParams() {
  return Object.keys(blogPosts).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = blogPosts[slug as keyof typeof blogPosts]
  if (!post) return {}
  return {
    title: `${post.title} | ESHRM Insights`,
    description: post.excerpt,
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = blogPosts[slug as keyof typeof blogPosts]

  if (!post) {
    notFound()
  }

  const relatedPostsData = post.relatedPosts
    .map((id) => {
      const related = blogPosts[id as keyof typeof blogPosts]
      return related ? { id, ...related } : null
    })
    .filter(Boolean)

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-muted py-16 lg:py-24">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />
          <div className="container relative mx-auto px-4">
            <Button asChild variant="ghost" className="mb-8 -ml-4">
              <Link href="/insights">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Insights
              </Link>
            </Button>

            <div className="mx-auto max-w-3xl">
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge>{post.category}</Badge>
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>

              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl mb-6">{post.title}</h1>

              <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <img
                    src={post.authorImage || "/placeholder.svg"}
                    alt={post.author}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-medium text-foreground">{post.author}</div>
                    <div>{post.authorRole}</div>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {post.publishedAt}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {post.readTime}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Image */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              <div className="aspect-video overflow-hidden rounded-2xl">
                <img src={post.image || "/placeholder.svg"} alt={post.title} className="h-full w-full object-cover" />
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl">
              <div
                className="prose prose-lg max-w-none prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4 prose-p:text-muted-foreground prose-p:leading-relaxed"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Share */}
              <div className="mt-12 pt-8 border-t">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <Share2 className="h-4 w-4" />
                    Share this article
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon">
                      <Linkedin className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Twitter className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Facebook className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Author Bio */}
              <Card className="mt-8">
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <img
                      src={post.authorImage || "/placeholder.svg"}
                      alt={post.author}
                      className="h-16 w-16 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-bold">{post.author}</h3>
                      <p className="text-sm text-primary mb-2">{post.authorRole}</p>
                      <p className="text-sm text-muted-foreground">
                        With extensive experience in HR consulting across Africa, {post.author.split(" ")[0]} is
                        passionate about helping organizations build high-performing teams and achieve sustainable
                        growth.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Related Posts */}
        {relatedPostsData.length > 0 && (
          <section className="py-16 bg-muted">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-bold mb-8">Related Articles</h2>
              <div className="grid gap-6 md:grid-cols-2">
                {relatedPostsData.map(
                  (related) =>
                    related && (
                      <Card key={related.id} className="group overflow-hidden">
                        <div className="aspect-video overflow-hidden">
                          <img
                            src={related.image || "/placeholder.svg"}
                            alt={related.title}
                            className="h-full w-full object-cover transition-transform group-hover:scale-105"
                          />
                        </div>
                        <CardContent className="p-6">
                          <Badge className="mb-3">{related.category}</Badge>
                          <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                            <Link href={`/insights/${related.id}`}>{related.title}</Link>
                          </h3>
                          <p className="text-sm text-muted-foreground mb-4">{related.excerpt}</p>
                          <Link
                            href={`/insights/${related.id}`}
                            className="text-sm font-medium text-primary hover:underline flex items-center gap-1"
                          >
                            Read more <ArrowRight className="h-4 w-4" />
                          </Link>
                        </CardContent>
                      </Card>
                    ),
                )}
              </div>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="py-20 lg:py-28">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl rounded-2xl bg-primary p-8 text-center text-primary-foreground lg:p-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Need Expert HR Guidance?</h2>
              <p className="mx-auto mb-8 max-w-2xl text-lg text-primary-foreground/80">
                Let's discuss how ESHRM can help your organization implement these strategies and achieve your HR goals.
              </p>
              <Button asChild size="lg" variant="secondary" className="gap-2">
                <Link href="/book-consultation">
                  Book a Consultation
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
