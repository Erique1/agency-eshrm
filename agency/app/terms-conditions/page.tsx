import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

export const metadata = {
  title: "Terms & Conditions | ESHRM",
  description: "Terms and conditions for using ESHRM's website and services.",
}

export default function TermsConditionsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="py-20 lg:py-28">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl">
              <h1 className="text-4xl font-bold mb-8">Terms & Conditions</h1>
              <p className="text-muted-foreground mb-8">Last updated: January 1, 2025</p>

              <div className="prose prose-lg max-w-none">
                <h2 className="text-2xl font-bold mt-8 mb-4">1. Acceptance of Terms</h2>
                <p className="text-muted-foreground mb-4">
                  By accessing and using the ESHRM website and services, you agree to be bound by these Terms &
                  Conditions. If you do not agree, please do not use our services.
                </p>

                <h2 className="text-2xl font-bold mt-8 mb-4">2. Services</h2>
                <p className="text-muted-foreground mb-4">
                  ESHRM provides HR consulting services including but not limited to custom HR solutions, organizational
                  development, training, policy development, performance management, and talent acquisition. Specific
                  terms for consulting engagements will be outlined in separate agreements.
                </p>

                <h2 className="text-2xl font-bold mt-8 mb-4">3. User Responsibilities</h2>
                <p className="text-muted-foreground mb-4">When using our website and services, you agree to:</p>
                <ul className="list-disc pl-6 text-muted-foreground mb-4">
                  <li>Provide accurate and complete information</li>
                  <li>Use our services only for lawful purposes</li>
                  <li>Not attempt to disrupt or compromise our systems</li>
                  <li>Respect intellectual property rights</li>
                </ul>

                <h2 className="text-2xl font-bold mt-8 mb-4">4. Intellectual Property</h2>
                <p className="text-muted-foreground mb-4">
                  All content on this website, including text, graphics, logos, and software, is the property of ESHRM
                  or its licensors and is protected by intellectual property laws.
                </p>

                <h2 className="text-2xl font-bold mt-8 mb-4">5. Limitation of Liability</h2>
                <p className="text-muted-foreground mb-4">
                  ESHRM shall not be liable for any indirect, incidental, special, or consequential damages arising from
                  your use of our website or services, to the extent permitted by law.
                </p>

                <h2 className="text-2xl font-bold mt-8 mb-4">6. Confidentiality</h2>
                <p className="text-muted-foreground mb-4">
                  We treat all client information as confidential. Specific confidentiality obligations will be detailed
                  in consulting engagement agreements.
                </p>

                <h2 className="text-2xl font-bold mt-8 mb-4">7. Modifications</h2>
                <p className="text-muted-foreground mb-4">
                  We reserve the right to modify these Terms & Conditions at any time. Changes will be effective upon
                  posting to this page.
                </p>

                <h2 className="text-2xl font-bold mt-8 mb-4">8. Governing Law</h2>
                <p className="text-muted-foreground mb-4">
                  These terms shall be governed by and construed in accordance with the laws of Nigeria, without regard
                  to conflict of law principles.
                </p>

                <h2 className="text-2xl font-bold mt-8 mb-4">9. Contact</h2>
                <p className="text-muted-foreground">
                  For questions about these Terms & Conditions, contact us at:
                  <br />
                  Email: legal@eshrm.com
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
