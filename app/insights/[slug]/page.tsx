import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowRight, Calendar, Clock, Share2, Linkedin, Twitter, Facebook } from "lucide-react"

const blogPosts = {
  "future-hr-africa-2025": {
    title: "The Future of HR in Africa: Trends to Watch in 2025",
    excerpt:
      "Explore the key HR trends shaping the African business landscape and how organizations can prepare for the future of work.",
    category: "HR Trends",
    tags: ["HR Trends", "Africa", "Future of Work"],
    author: "Dr. Adaora Nwankwo",
    authorRole: "Founder & CEO, ESHRM",
    authorImage: "/executive-woman-portrait.jpg",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop",
    publishedAt: "January 10, 2025",
    readTime: "8 min read",
    content: `
      <p>The African HR landscape is evolving at an unprecedented pace. As we move into 2025, several transformative trends are reshaping how organizations manage their most valuable asset—their people.</p>
      
      <h2>1. Digital Transformation Accelerates</h2>
      <p>The adoption of HR technology across Africa has surged, driven by the pandemic's lasting impact and increasing internet penetration. Cloud-based HRIS systems, AI-powered recruitment tools, and mobile-first employee engagement platforms are becoming standard rather than exceptional.</p>
      <p>Organizations that embrace these technologies are seeing significant improvements in efficiency, data-driven decision-making, and employee experience. The key is selecting solutions that work well in African contexts—including mobile-first designs and offline capabilities for areas with inconsistent connectivity.</p>
      
      <h2>2. Skills-Based Hiring Takes Center Stage</h2>
      <p>Traditional credential-based hiring is giving way to skills-based approaches. African organizations are recognizing that formal qualifications don't always predict job success, and are implementing competency assessments, portfolio reviews, and practical evaluations.</p>
      <p>This shift is particularly important in Africa, where talented individuals may have developed skills through non-traditional pathways. By focusing on what candidates can do rather than where they studied, organizations are accessing broader talent pools and improving hiring outcomes.</p>
      
      <h2>3. Employee Wellbeing Becomes Strategic</h2>
      <p>Mental health and employee wellbeing have moved from nice-to-have benefits to strategic priorities. Progressive African organizations are implementing comprehensive wellbeing programs that address mental, physical, financial, and social health.</p>
      <p>This trend reflects growing awareness that employee wellbeing directly impacts productivity, engagement, and retention. Companies are investing in employee assistance programs, flexible working arrangements, and wellness initiatives tailored to local contexts and needs.</p>
      
      <h2>4. Hybrid Work Models Mature</h2>
      <p>The hybrid work experiment that began during the pandemic is maturing into sustainable, well-designed models. African organizations are developing clearer policies, investing in collaboration technology, and redesigning physical workspaces to support hybrid work.</p>
      <p>Success requires intentional effort—including clear communication norms, equitable treatment of remote and in-office workers, and managers skilled in leading distributed teams. Organizations that get this right are seeing benefits in talent attraction, retention, and productivity.</p>
      
      <h2>5. Learning & Development Gets Personal</h2>
      <p>One-size-fits-all training programs are giving way to personalized learning journeys. African organizations are leveraging learning management systems, microlearning platforms, and AI-powered content recommendations to deliver development opportunities tailored to individual needs and career aspirations.</p>
      <p>This personalization extends to delivery methods—combining online self-paced learning, virtual instructor-led training, coaching, mentoring, and experiential learning based on individual preferences and circumstances.</p>
      
      <h2>Preparing for the Future</h2>
      <p>These trends represent both challenges and opportunities for African organizations. Success requires staying informed, being willing to experiment, and maintaining focus on what matters most—enabling people to do their best work and achieve their potential.</p>
      <p>At ESHRM, we partner with organizations across Africa to navigate these trends and build HR functions ready for the future. Contact us to discuss how we can support your HR transformation journey.</p>
    `,
    relatedPosts: ["compliance-first-hr-strategy", "leadership-remote-hybrid-teams"],
  },
  "compliance-first-hr-strategy": {
    title: "Building a Compliance-First HR Strategy",
    excerpt: "Learn how to develop HR policies that ensure regulatory compliance while supporting business objectives.",
    category: "Compliance",
    tags: ["Compliance", "HR Policy", "Risk Management"],
    author: "Emmanuel Koffi",
    authorRole: "Chief Consulting Officer, ESHRM",
    authorImage: "/executive-man-portrait.jpg",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    publishedAt: "January 5, 2025",
    readTime: "6 min read",
    content: `
      <p>In today's complex regulatory environment, compliance isn't just about avoiding penalties—it's about building trust, protecting your organization, and creating fair, consistent workplaces. Here's how to develop an HR strategy with compliance at its core.</p>
      
      <h2>Understanding Your Compliance Landscape</h2>
      <p>The first step is understanding the full scope of regulations affecting your organization. In Africa, this often means navigating multiple jurisdictions with different labor laws, data protection requirements, and industry-specific regulations.</p>
      <p>Create a comprehensive compliance register that identifies all applicable regulations, tracks requirements, and assigns ownership for ongoing monitoring and updates.</p>
      
      <h2>Building Robust Policy Frameworks</h2>
      <p>Effective compliance starts with clear, comprehensive policies. Your policy framework should cover all aspects of the employment relationship—from hiring through separation—and address specific regulatory requirements.</p>
      <p>Policies should be written in clear, accessible language, regularly reviewed and updated, and easily accessible to all employees. Consider creating policy summaries and FAQs to improve understanding and compliance.</p>
      
      <h2>Implementation and Training</h2>
      <p>Policies are only effective if they're implemented consistently. This requires training for managers and employees, clear processes for applying policies, and systems for monitoring compliance.</p>
      <p>Focus training on practical application—help managers understand not just what the policies say, but how to apply them in real situations. Use case studies and scenarios relevant to your organization.</p>
      
      <h2>Monitoring and Continuous Improvement</h2>
      <p>Compliance isn't a one-time achievement—it requires ongoing monitoring and improvement. Implement regular audits, track compliance metrics, and create channels for reporting concerns or violations.</p>
      <p>When issues arise, investigate thoroughly, take appropriate action, and update policies or processes to prevent recurrence. Treat compliance failures as learning opportunities.</p>
      
      <h2>Technology as an Enabler</h2>
      <p>Modern HR technology can significantly support compliance efforts. Use HRIS systems to automate policy distribution and acknowledgment, track mandatory training completion, manage documentation, and generate compliance reports.</p>
      
      <h2>Creating a Compliance Culture</h2>
      <p>Ultimately, compliance success depends on culture. Leaders must model compliance behaviors, reward ethical conduct, and create psychological safety for raising concerns. When compliance is seen as a shared responsibility rather than an HR burden, organizations are better protected.</p>
    `,
    relatedPosts: ["future-hr-africa-2025", "leadership-remote-hybrid-teams"],
  },
  "leadership-remote-hybrid-teams": {
    title: "Effective Leadership in Remote and Hybrid Teams",
    excerpt:
      "Discover strategies for leading distributed teams effectively and maintaining engagement across locations.",
    category: "Leadership",
    tags: ["Leadership", "Remote Work", "Team Management"],
    author: "Zainab Ibrahim",
    authorRole: "Head of Training & Development, ESHRM",
    authorImage: "/training-director-portrait.jpg",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop",
    publishedAt: "December 28, 2024",
    readTime: "7 min read",
    content: `
      <p>Leading remote and hybrid teams requires a different skill set than traditional in-person management. Here's how to build and lead effective distributed teams.</p>
      
      <h2>Building Trust at a Distance</h2>
      <p>Trust is the foundation of effective remote teams. Without the natural trust-building that happens through daily in-person interaction, leaders must be more intentional.</p>
      <p>Start by assuming positive intent. When communication is limited, it's easy to misinterpret actions or silences. Give team members the benefit of the doubt and seek clarification before making assumptions.</p>
      
      <h2>Communication: Quality Over Quantity</h2>
      <p>Effective remote communication isn't about more meetings—it's about better communication. Establish clear norms: when to use email vs. chat vs. video calls, expected response times, and how to signal urgency.</p>
      <p>Create space for both synchronous and asynchronous communication. Not everything requires a meeting, but some discussions benefit from real-time interaction. Find the right balance for your team.</p>
      
      <h2>Maintaining Connection and Culture</h2>
      <p>Remote work can feel isolating. Intentionally create opportunities for connection—both work-related and social. Virtual coffee chats, team celebrations, and informal channels can help maintain the human connections that make work meaningful.</p>
      <p>Culture doesn't maintain itself remotely. Leaders must actively reinforce values, recognize behaviors that exemplify the culture, and address issues that undermine it.</p>
      
      <h2>Results-Focused Management</h2>
      <p>In remote environments, focus on outcomes rather than activity. Set clear expectations, provide the resources and support needed to succeed, and trust team members to manage their time and work.</p>
      <p>Regular check-ins should focus on progress, obstacles, and support needed—not surveillance. The goal is enabling success, not monitoring compliance.</p>
      
      <h2>Inclusive Leadership</h2>
      <p>Hybrid arrangements create unique inclusion challenges. Ensure remote team members have equal access to information, opportunities, and leadership attention. Be mindful of proximity bias and actively work to counteract it.</p>
      
      <h2>Supporting Wellbeing</h2>
      <p>Remote work can blur boundaries between work and life. Model healthy behaviors, respect boundaries, and create space for team members to manage their energy and wellbeing.</p>
      <p>Pay attention to signs of burnout or disengagement, and address them proactively. Regular, meaningful one-on-ones create space for these conversations.</p>
    `,
    relatedPosts: ["future-hr-africa-2025", "compliance-first-hr-strategy"],
  },
  "talent-retention-competitive-market": {
    title: "Talent Retention Strategies in a Competitive Market",
    excerpt:
      "Discover proven approaches to keeping your top performers engaged and committed in today's competitive talent landscape.",
    category: "Talent Management",
    tags: ["Talent Retention", "Employee Engagement", "Compensation"],
    author: "Dr. Adaora Nwankwo",
    authorRole: "Founder & CEO, ESHRM",
    authorImage: "/executive-woman-portrait.jpg",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop",
    publishedAt: "December 20, 2024",
    readTime: "9 min read",
    content: `
      <p>In today's competitive talent market, retaining top performers is more challenging than ever. Organizations across Africa are facing increased competition for skilled professionals, making talent retention a strategic priority. Here's how to build effective retention strategies that keep your best people engaged and committed.</p>

      <h2>Understanding the Retention Challenge</h2>
      <p>The African talent landscape has transformed dramatically. Economic growth, digital transformation, and globalization have created new opportunities for skilled professionals. Top talent now has more choices than ever, and organizations must work harder to retain their key contributors.</p>
      <p>Retention isn't just about preventing turnover—it's about creating an environment where people want to stay, grow, and contribute their best work over the long term.</p>

      <h2>Compensation and Benefits That Matter</h2>
      <p>While competitive compensation remains important, modern retention strategies go beyond salary. Consider total rewards packages that include:</p>
      <ul>
        <li>Performance-based incentives and bonuses</li>
        <li>Comprehensive health and wellness benefits</li>
        <li>Professional development opportunities</li>
        <li>Work-life balance initiatives</li>
        <li>Retirement planning and financial wellness programs</li>
      </ul>
      <p>Regular compensation reviews and market benchmarking ensure your offers remain competitive while providing the flexibility to reward individual contributions.</p>

      <h2>Career Development and Growth</h2>
      <p>Today's professionals expect meaningful career progression. Create clear career paths, provide regular feedback and coaching, and offer opportunities for skill development and advancement.</p>
      <p>Implement individual development plans, mentorship programs, and job rotation opportunities that help employees see a future with your organization. When people feel they're growing and developing, they're more likely to stay committed.</p>

      <h2>Building a Positive Culture</h2>
      <p>Culture plays a critical role in retention. Create an environment where people feel valued, respected, and empowered to do their best work.</p>
      <p>Focus on psychological safety, recognition and appreciation, work-life integration, and inclusive practices that make people feel they belong and can thrive.</p>

      <h2>Engagement and Connection</h2>
      <p>Regular check-ins, feedback mechanisms, and opportunities for input help employees feel heard and valued. Create channels for open communication and ensure leaders are accessible and approachable.</p>
      <p>Team-building activities, social events, and community-building initiatives strengthen connections and create positive associations with your organization.</p>

      <h2>Measuring and Monitoring Retention</h2>
      <p>Track retention metrics, conduct stay interviews with departing employees, and regularly survey current employees about their satisfaction and commitment. Use this data to identify trends and areas for improvement.</p>

      <h2>Proactive Retention Strategies</h2>
      <p>Don't wait for people to consider leaving—implement proactive strategies that identify at-risk employees early and provide interventions to improve their satisfaction and commitment.</p>
      <p>Regular pulse surveys, performance reviews, and one-on-one meetings help identify issues before they become problems.</p>
    `,
    relatedPosts: ["leadership-remote-hybrid-teams", "performance-reviews-best-practices"],
  },
  "performance-reviews-best-practices": {
    title: "Modernizing Performance Reviews: Best Practices for 2025",
    excerpt:
      "Traditional annual reviews are outdated. Learn how to implement continuous performance management that drives results.",
    category: "HR Trends",
    tags: ["Performance Management", "Feedback", "Best Practices"],
    author: "Emmanuel Koffi",
    authorRole: "Chief Consulting Officer, ESHRM",
    authorImage: "/executive-man-portrait.jpg",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    publishedAt: "December 15, 2024",
    readTime: "6 min read",
    content: `
      <p>Traditional annual performance reviews are increasingly seen as outdated and ineffective. In 2025, organizations are moving toward continuous performance management systems that provide ongoing feedback, support development, and drive better results. Here's how to modernize your performance management approach.</p>

      <h2>The Problems with Traditional Reviews</h2>
      <p>Annual performance reviews often create anxiety, consume significant time, and fail to provide timely feedback. They can feel like a "gotcha" exercise rather than a developmental opportunity, leading to disengagement and demotivation.</p>
      <p>Research shows that traditional reviews often don't correlate with actual performance and can create bias and inconsistency in evaluations.</p>

      <h2>Continuous Performance Management</h2>
      <p>Modern performance management replaces annual reviews with ongoing conversations and feedback. This approach includes:</p>
      <ul>
        <li>Regular check-ins and coaching conversations</li>
        <li>Real-time feedback and recognition</li>
        <li>Continuous goal setting and adjustment</li>
        <li>Ongoing development planning</li>
        <li>Frequent performance discussions</li>
      </ul>
      <p>This shift from "evaluation" to "development" creates a more positive and productive performance culture.</p>

      <h2>Setting Clear Expectations</h2>
      <p>Effective performance management starts with clear, measurable goals and expectations. Use SMART goals (Specific, Measurable, Achievable, Relevant, Time-bound) and ensure employees understand how their work contributes to organizational objectives.</p>
      <p>Regular goal reviews and adjustments keep expectations aligned with changing priorities and circumstances.</p>

      <h2>Providing Ongoing Feedback</h2>
      <p>Create a culture of continuous feedback where managers and employees regularly discuss progress, challenges, and opportunities. Use both formal and informal feedback mechanisms to provide timely input and support.</p>
      <p>Focus on behavior and impact rather than personality traits, and ensure feedback is constructive and actionable.</p>

      <h2>Recognition and Development</h2>
      <p>Modern performance management emphasizes recognition for achievements and development for growth. Celebrate wins, provide coaching for improvement, and create opportunities for skill development and career advancement.</p>

      <h2>Using Technology Effectively</h2>
      <p>Leverage performance management platforms that support continuous feedback, goal tracking, and development planning. Choose tools that are user-friendly and integrate well with your existing systems.</p>

      <h2>Training Managers</h2>
      <p>Effective performance management requires skilled managers who can provide feedback, coach for development, and have difficult conversations when needed. Invest in manager training to build these critical skills.</p>

      <h2>Measuring Success</h2>
      <p>Track metrics like employee engagement, performance improvement, retention rates, and goal achievement to measure the effectiveness of your performance management system. Use this data to continuously improve your approach.</p>
    `,
    relatedPosts: ["talent-retention-competitive-market", "leadership-remote-hybrid-teams"],
  },
  "workforce-planning-uncertainty": {
    title: "Strategic Workforce Planning in Times of Uncertainty",
    excerpt: "Build a resilient workforce strategy that adapts to changing market conditions and business needs.",
    category: "Workforce Strategy",
    tags: ["Workforce Planning", "Strategy", "Resilience"],
    author: "Zainab Ibrahim",
    authorRole: "Head of Training & Development, ESHRM",
    authorImage: "/training-director-portrait.jpg",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop",
    publishedAt: "December 10, 2024",
    readTime: "8 min read",
    content: `
      <p>In an era of rapid change and uncertainty, strategic workforce planning has never been more critical. Organizations that can anticipate, adapt, and build resilience are better positioned to thrive in volatile environments. Here's how to develop a workforce planning strategy that supports sustainable success.</p>

      <h2>Understanding Workforce Planning</h2>
      <p>Workforce planning is the process of aligning your human capital strategy with your business objectives. It involves forecasting future workforce needs, identifying gaps, and developing strategies to ensure you have the right people with the right skills at the right time.</p>
      <p>In uncertain times, this becomes even more important as organizations need to be agile and responsive to changing market conditions.</p>

      <h2>Environmental Scanning</h2>
      <p>Start by understanding the external environment that could impact your workforce needs. Consider:</p>
      <ul>
        <li>Economic trends and market conditions</li>
        <li>Industry developments and disruptions</li>
        <li>Technological advancements</li>
        <li>Regulatory changes</li>
        <li>Competitive landscape</li>
        <li>Demographic shifts</li>
      </ul>
      <p>Regular environmental scanning helps you anticipate changes and plan accordingly.</p>

      <h2>Workforce Analysis</h2>
      <p>Conduct a comprehensive analysis of your current workforce, including:</p>
      <ul>
        <li>Skills inventory and capability assessment</li>
        <li>Demographic analysis (age, tenure, diversity)</li>
        <li>Performance data and productivity metrics</li>
        <li>Attrition patterns and retention risks</li>
        <li>Succession planning for critical roles</li>
      </ul>
      <p>This analysis provides the foundation for your planning decisions.</p>

      <h2>Gap Analysis</h2>
      <p>Compare your current workforce capabilities with your future needs to identify gaps. Consider both quantitative gaps (headcount) and qualitative gaps (skills, competencies).</p>
      <p>Look at upcoming retirements, expansion plans, new initiatives, and changing customer needs when projecting future requirements.</p>

      <h2>Developing Strategies</h2>
      <p>Based on your gap analysis, develop strategies to address workforce needs:</p>
      <ul>
        <li>Recruitment and hiring strategies</li>
        <li>Training and development programs</li>
        <li>Retention and engagement initiatives</li>
        <li>Organizational design changes</li>
        <li>Outsourcing or partnership arrangements</li>
      </ul>
      <p>Consider both short-term tactics and long-term strategic initiatives.</p>

      <h2>Building Resilience</h2>
      <p>In uncertain times, build workforce resilience by:</p>
      <ul>
        <li>Diversifying your talent sources</li>
        <li>Investing in adaptable skills</li>
        <li>Creating flexible work arrangements</li>
        <li>Developing contingency plans</li>
        <li>Fostering a culture of continuous learning</li>
      </ul>
      <p>Resilient organizations can pivot quickly and maintain performance despite external pressures.</p>

      <h2>Implementation and Monitoring</h2>
      <p>Develop an implementation plan with clear timelines, responsibilities, and metrics. Regularly monitor progress and adjust your strategies based on changing conditions and new information.</p>
      <p>Use workforce planning dashboards and regular reviews to keep your plan current and effective.</p>

      <h2>Technology and Tools</h2>
      <p>Leverage workforce planning tools and analytics to improve the accuracy and efficiency of your planning process. Consider workforce analytics platforms that can help you model scenarios and predict future needs.</p>

      <h2>Change Management</h2>
      <p>Workforce planning often involves significant change. Use change management principles to ensure successful implementation, including communication, stakeholder engagement, and support for those affected by the changes.</p>
    `,
    relatedPosts: ["performance-reviews-best-practices", "future-hr-africa-2025"],
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
