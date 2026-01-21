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
      <p>Zimbabwe's economic environment presents unique challenges for HR professionals. Currency fluctuations, inflation, and economic uncertainty require adaptive HR strategies that maintain employee engagement while ensuring business continuity. This article explores practical approaches for managing HR in Zimbabwe's dynamic economic context.</p>
      
      <h2>Understanding Zimbabwe's Economic Context</h2>
      <p>Zimbabwe has experienced significant economic changes, including multi-currency systems, inflation challenges, and economic reforms. These factors directly impact HR practices, from compensation structures to employee motivation and retention strategies.</p>
      
      <h2>Adapting Compensation Strategies</h2>
      <p>Traditional fixed salary approaches may not suffice in volatile economic conditions. Organizations need flexible compensation models that account for currency fluctuations and maintain purchasing power for employees.</p>
      
      <h2>Employee Wellbeing and Stability</h2>
      <p>Economic uncertainty can create stress and anxiety among employees. HR professionals must prioritize mental health support, financial wellness programs, and clear communication about organizational stability and future plans.</p>
      
      <h2>Retention in Uncertain Times</h2>
      <p>When economic conditions are challenging, retaining skilled employees becomes critical. Focus on creating value beyond salary, including development opportunities, work-life balance, and a sense of purpose and stability.</p>
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
      <p>Compliance with Zimbabwe's Labour Act is essential for all organizations operating in the country. This comprehensive guide covers key requirements, implementation strategies, and best practices for maintaining legal compliance while building positive employee relations.</p>
      
      <h2>Key Provisions of the Labour Act</h2>
      <p>The Labour Act Chapter 28:01 provides the legal framework for employment relationships in Zimbabwe. Understanding its provisions is crucial for HR professionals and business leaders.</p>
      
      <h2>Employment Contracts</h2>
      <p>All employment relationships must be formalized through written contracts that comply with statutory requirements. This includes clear terms on remuneration, working hours, leave entitlements, and termination procedures.</p>
      
      <h2>Working Hours and Overtime</h2>
      <p>The Act specifies maximum working hours (45 hours per week for office workers, 55 hours for others) and overtime requirements. Organizations must maintain accurate records and ensure fair compensation for additional hours.</p>
      
      <h2>Leave Entitlements</h2>
      <p>Employees are entitled to annual leave, sick leave, and maternity/paternity leave as specified in the Act. Proper administration of these entitlements is both a legal requirement and a key employee benefit.</p>
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
      <p>Leadership in Zimbabwe requires resilience, adaptability, and cultural intelligence. This article explores strategies for building leadership teams that can effectively navigate the country's business environment and drive organizational success.</p>
      
      <h2>Understanding Zimbabwe's Business Context</h2>
      <p>Zimbabwe's business environment is characterized by economic volatility, regulatory changes, and competitive pressures. Leaders must be equipped to navigate these challenges while maintaining team morale and organizational focus.</p>
      
      <h2>Developing Cultural Intelligence</h2>
      <p>Effective leadership in Zimbabwe requires understanding local business culture, communication styles, and relationship-building approaches. Cultural intelligence helps leaders build trust and achieve results across diverse stakeholder groups.</p>
      
      <h2>Building Resilience</h2>
      <p>Economic uncertainty and rapid changes require leaders who can remain steady under pressure. Developing resilience includes emotional intelligence, stress management, and adaptive problem-solving skills.</p>
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
