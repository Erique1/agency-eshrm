import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

export const metadata = {
  title: "Privacy Policy | ESHRM",
  description: "ESHRM's privacy policy explaining how we collect, use, and protect your personal information.",
}

export default function PrivacyPolicyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="py-20 lg:py-28">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl">
              <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
              <p className="text-muted-foreground mb-8">Last updated: January 1, 2025</p>

              <div className="prose prose-lg max-w-none">
                <h2 className="text-2xl font-bold mt-8 mb-4">1. Introduction</h2>
                <p className="text-muted-foreground mb-4">
                  ESHRM ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how
                  we collect, use, disclose, and safeguard your information when you visit our website or use our
                  services.
                </p>

                <h2 className="text-2xl font-bold mt-8 mb-4">2. Information We Collect</h2>
                <p className="text-muted-foreground mb-4">We may collect information about you in various ways:</p>
                <ul className="list-disc pl-6 text-muted-foreground mb-4">
                  <li>Personal information you provide (name, email, phone number, company)</li>
                  <li>Information from contact forms and consultation bookings</li>
                  <li>Automatically collected data (IP address, browser type, pages visited)</li>
                  <li>Cookies and similar tracking technologies</li>
                </ul>

                <h2 className="text-2xl font-bold mt-8 mb-4">3. How We Use Your Information</h2>
                <p className="text-muted-foreground mb-4">We use the information we collect to:</p>
                <ul className="list-disc pl-6 text-muted-foreground mb-4">
                  <li>Provide and maintain our services</li>
                  <li>Respond to your inquiries and fulfill your requests</li>
                  <li>Send you marketing communications (with your consent)</li>
                  <li>Improve our website and services</li>
                  <li>Comply with legal obligations</li>
                </ul>

                <h2 className="text-2xl font-bold mt-8 mb-4">4. Information Sharing</h2>
                <p className="text-muted-foreground mb-4">
                  We do not sell your personal information. We may share your information with service providers who
                  assist in our operations, when required by law, or with your consent.
                </p>

                <h2 className="text-2xl font-bold mt-8 mb-4">5. Data Security</h2>
                <p className="text-muted-foreground mb-4">
                  We implement appropriate technical and organizational measures to protect your personal information.
                  However, no method of transmission over the Internet is 100% secure.
                </p>

                <h2 className="text-2xl font-bold mt-8 mb-4">6. Your Rights</h2>
                <p className="text-muted-foreground mb-4">
                  Depending on your location, you may have rights to access, correct, delete, or port your personal
                  data. Contact us to exercise these rights.
                </p>

                <h2 className="text-2xl font-bold mt-8 mb-4">7. Contact Us</h2>
                <p className="text-muted-foreground mb-4">
                  If you have questions about this Privacy Policy, please contact us at:
                </p>
                <p className="text-muted-foreground">
                  Email: privacy@eshrm.com
                  <br />
                  Address: 123 Business District, Lagos, Nigeria
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
