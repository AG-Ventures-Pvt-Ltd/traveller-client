import React from 'react'
import { X, Check, AlertTriangle } from 'lucide-react'

const Policy = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      {/* PRIVACY POLICY */}
      <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
      <p className="text-sm text-gray-600 mb-8"><strong>Last Updated: January 14, 2026</strong></p>

      <p className="mb-6">
        At <strong>WONDRR TRIPS</strong>, we are committed to protecting your privacy and personal data. This Privacy Policy explains how we collect, use, store, and protect your information when you use our website and services.
      </p>

      <hr className="my-8" />

      <h2 className="text-2xl font-bold mb-4">Who We Are</h2>
      <p className="mb-4">
        WONDRR TRIPS is currently owned and operated by <strong>Shreyansh Agrawal</strong>,
        in his individual capacity as a sole proprietor, as the business has not yet been
        incorporated as a separate legal entity. References to &quot;WONDRR TRIPS,&quot;
        &quot;Company,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot; in this
        Privacy Policy refer to Shreyansh Agrawal, trading under the brand name &quot;WONDRR TRIPS.&quot;
      </p>
      <p className="mb-6">
        <strong>Contact Information:</strong><br />
        Email: support@wondrr.in<br />
        Privacy Inquiries: support@wondrr.in<br />
        Website: www.wondrr.in
      </p>

      <hr className="my-8" />

      <h2 className="text-2xl font-bold mb-4">Information We Collect</h2>

      <h3 className="text-xl font-semibold mb-3">1. Information You Provide Directly</h3>
      <div className="mb-4">
        <p className="font-semibold">Account Registration:</p>
        <ul className="list-disc list-inside ml-4 mb-2">
          <li>Full name</li>
          <li>Email address</li>
          <li>Phone number</li>
          <li>Password (encrypted)</li>
          <li>Date of birth (optional)</li>
        </ul>
      </div>

      <div className="mb-4">
        <p className="font-semibold">Booking Information:</p>
        <ul className="list-disc list-inside ml-4 mb-2">
          <li>Travel preferences and requirements</li>
          <li>Emergency contact details</li>
          <li>Special requests (dietary, medical, accessibility)</li>
          <li>Government ID details (as required by operators)</li>
          <li>Demographic information such as postcode, preferences and interests (if provided)</li>
          <li>Other information relevant to customer surveys and/or offers</li>
        </ul>
      </div>

      <div className="mb-6">
        <p className="font-semibold">Payment Information:</p>
        <ul className="list-disc list-inside ml-4 mb-2">
          <li>Payment details are processed securely by Razorpay</li>
          <li>We do not store your complete card details</li>
          <li>We retain transaction records for accounting purposes</li>
        </ul>
      </div>

      <h3 className="text-xl font-semibold mb-3">2. Information Collected Automatically</h3>
      <div className="mb-4">
        <p className="font-semibold">Usage Data:</p>
        <ul className="list-disc list-inside ml-4 mb-2">
          <li>IP address</li>
          <li>Browser type and version</li>
          <li>Device information</li>
          <li>Pages visited and time spent</li>
          <li>Referral source</li>
        </ul>
      </div>

      <div className="mb-6">
        <p className="font-semibold">Analytics Data:</p>
        <ul className="list-disc list-inside ml-4 mb-2">
          <li>Google Analytics: Website usage patterns</li>
          <li>Microsoft Clarity: User behavior and heatmaps</li>
          <li>See our Cookie Policy below for more details</li>
        </ul>
      </div>

      <h3 className="text-xl font-semibold mb-3">3. Information from Third Parties</h3>
      <p className="mb-6">
        We may receive information about you from trip operators you book with, payment processors (Razorpay), and fraud prevention services.
      </p>

      <hr className="my-8" />

      <h2 className="text-2xl font-bold mb-4">How We Use Your Information</h2>
      <p className="mb-4">We use your personal data for the following purposes:</p>

      <div className="mb-4">
        <p className="font-semibold">1. Service Delivery</p>
        <ul className="list-disc list-inside ml-4 mb-2">
          <li>Process and manage your bookings</li>
          <li>Communicate trip details and updates</li>
          <li>Share your information with trip operators you book with</li>
          <li>Provide customer support</li>
        </ul>
      </div>

      <div className="mb-4">
        <p className="font-semibold">2. Account Management</p>
        <ul className="list-disc list-inside ml-4 mb-2">
          <li>Create and maintain your account</li>
          <li>Authenticate your identity</li>
          <li>Send account-related notifications</li>
        </ul>
      </div>

      <div className="mb-4">
        <p className="font-semibold">3. Payment Processing</p>
        <ul className="list-disc list-inside ml-4 mb-2">
          <li>Process payments securely through Razorpay</li>
          <li>Issue invoices and receipts</li>
          <li>Handle refunds and cancellations</li>
        </ul>
      </div>

      <div className="mb-4">
        <p className="font-semibold">4. Communication</p>
        <ul className="list-disc list-inside ml-4 mb-2">
          <li>Send booking confirmations and updates</li>
          <li>Respond to your inquiries</li>
          <li>Send important service announcements</li>
          <li>Marketing communications (with your consent)</li>
          <li>Contact you by phone, fax, or mail for service-related purposes</li>
        </ul>
      </div>

      <div className="mb-4">
        <p className="font-semibold">5. Improvement and Analytics</p>
        <ul className="list-disc list-inside ml-4 mb-2">
          <li>Understand how our website is used</li>
          <li>Improve user experience and features</li>
          <li>Conduct research and analysis</li>
          <li>Conduct customer surveys and market research to improve our services</li>
        </ul>
      </div>

      <div className="mb-6">
        <p className="font-semibold">6. Legal and Security</p>
        <ul className="list-disc list-inside ml-4 mb-2">
          <li>Comply with legal obligations</li>
          <li>Prevent fraud and abuse</li>
          <li>Protect our rights and property</li>
          <li>Resolve disputes</li>
        </ul>
      </div>

      <hr className="my-8" />

      <h2 className="text-2xl font-bold mb-4">Legal Basis for Processing (DPDPA 2023)</h2>
      <p className="mb-4">We process your personal data based on:</p>
      <ul className="list-disc list-inside ml-4 mb-6">
        <li><strong>Consent:</strong> You provide explicit consent when creating an account or booking a trip</li>
        <li><strong>Contract Performance:</strong> Processing is necessary to fulfill our booking and service agreements</li>
        <li><strong>Legal Obligation:</strong> We must comply with tax, accounting, and other legal requirements</li>
        <li><strong>Legitimate Interest:</strong> Fraud prevention, security, and service improvement</li>
      </ul>

      <hr className="my-8" />

      <h2 className="text-2xl font-bold mb-4">How We Share Your Information</h2>

      <h3 className="text-xl font-semibold mb-3">With Trip Operators</h3>
      <p className="mb-4">
        When you book a trip, we share necessary information (name, contact details, special requirements) with the trip operator to facilitate your booking and ensure a safe experience.
      </p>

      <h3 className="text-xl font-semibold mb-3">With Service Providers</h3>
      <p className="mb-4">We work with trusted third-party service providers:</p>
      <ul className="list-disc list-inside ml-4 mb-4">
        <li><strong>Razorpay:</strong> Payment processing (PCI DSS compliant)</li>
        <li><strong>Google Analytics:</strong> Website analytics</li>
        <li><strong>Microsoft Clarity:</strong> User behavior analytics</li>
        <li><strong>Email Service Providers:</strong> Transactional and marketing emails</li>
        <li><strong>Cloud Hosting:</strong> Data storage and website hosting</li>
      </ul>

      <h3 className="text-xl font-semibold mb-3">Legal Requirements</h3>
      <p className="mb-4">
        We may disclose your information if required by law, court order, or government authority, or to protect our rights, property, and safety.
      </p>

      <h3 className="text-xl font-semibold mb-3">Business Transfers</h3>
      <p className="mb-6">
        In the event of a merger, acquisition, or sale of assets, your information may be transferred to the acquiring entity.
      </p>

      <p className="mb-6">
        <strong>We do NOT sell your personal data to third parties for marketing purposes.</strong>
      </p>

      <hr className="my-8" />

      <h2 className="text-2xl font-bold mb-4">Data Retention</h2>
      <p className="mb-4">We retain your personal data for as long as necessary:</p>
      <ul className="list-disc list-inside ml-4 mb-6">
        <li><strong>Account Data:</strong> Until you request deletion or close your account</li>
        <li><strong>Booking Records:</strong> 7 years (for tax and legal compliance)</li>
        <li><strong>Payment Data:</strong> Transaction records retained for 7 years</li>
        <li><strong>Analytics Data:</strong> Up to 2 years (Google Analytics, Microsoft Clarity)</li>
        <li><strong>Marketing Communications:</strong> Until you unsubscribe</li>
      </ul>
      <p className="mb-6">
        After the retention period, we securely delete or anonymize your data.
      </p>

      <hr className="my-8" />

      <h2 className="text-2xl font-bold mb-4">Your Rights Under DPDPA 2023</h2>
      <p className="mb-4">Under the Digital Personal Data Protection Act, 2023, you have the following rights:</p>

      <div className="mb-4">
        <p className="font-semibold">1. Right to Access</p>
        <p className="ml-4">Request a copy of all personal data we hold about you</p>
      </div>

      <div className="mb-4">
        <p className="font-semibold">2. Right to Correction</p>
        <p className="ml-4">Request correction of inaccurate or incomplete data</p>
      </div>

      <div className="mb-4">
        <p className="font-semibold">3. Right to Erasure</p>
        <p className="ml-4">Request deletion of your personal data (subject to legal retention requirements)</p>
      </div>

      <div className="mb-4">
        <p className="font-semibold">4. Right to Withdraw Consent</p>
        <p className="ml-4">Withdraw consent for marketing communications or analytics tracking at any time</p>
      </div>

      <div className="mb-4">
        <p className="font-semibold">5. Right to Nominate</p>
        <p className="ml-4">Nominate another person to exercise your rights in case of death or incapacity</p>
      </div>

      <div className="mb-6">
        <p className="font-semibold">6. Right to Grievance Redressal</p>
        <p className="ml-4">Lodge complaints about data handling practices</p>
      </div>

      <p className="mb-6">
        <strong>To exercise your rights, contact us at:</strong> support@wondrr.in
      </p>

      <hr className="my-8" />

      <h2 className="text-2xl font-bold mb-4">Data Security</h2>
      <p className="mb-4">We implement industry-standard security measures to protect your data:</p>
      <ul className="list-disc list-inside ml-4 mb-6">
        <li><strong>Encryption:</strong> HTTPS/TLS encryption for data in transit</li>
        <li><strong>Password Protection:</strong> Passwords are hashed and salted</li>
        <li><strong>Access Controls:</strong> Strict employee access controls</li>
        <li><strong>Payment Security:</strong> Razorpay handles payments (PCI DSS Level 1 certified)</li>
        <li><strong>Regular Audits:</strong> Security assessments and vulnerability testing</li>
        <li><strong>Data Backups:</strong> Regular encrypted backups</li>
      </ul>
      <p className="mb-6">
        While we take all reasonable precautions, no method of internet transmission is 100% secure. We cannot guarantee absolute security.
      </p>

      <hr className="my-8" />

      <h2 className="text-2xl font-bold mb-4">Children&apos;s Privacy</h2>
      <p className="mb-6">
        Our services are not intended for children under 18 years of age. We do not knowingly collect personal data from minors. If you are a parent or guardian and believe your child has provided us with personal information, please contact us at support@wondrr.in, and we will delete it promptly.
      </p>

      <hr className="my-8" />

      <h2 className="text-2xl font-bold mb-4">International Data Transfers</h2>
      <p className="mb-6">
        Your data may be transferred to and stored on servers located outside India, including by our service providers (Google, Microsoft, cloud hosting providers). We ensure that such transfers comply with DPDPA 2023 and that appropriate safeguards are in place.
      </p>

      <hr className="my-8" />

      <h2 className="text-2xl font-bold mb-4">Marketing Communications</h2>
      <p className="mb-4">
        With your consent, we may send you marketing emails about new trips, special offers, and updates. With your explicit consent, we may also send you promotional information about third parties which we think you may find interesting.
      </p>
      <p className="mb-6">
        <strong>You can opt out at any time by:</strong>
      </p>
      <ul className="list-disc list-inside ml-4 mb-6">
        <li>Clicking the &quot;Unsubscribe&quot; link in any marketing email</li>
        <li>Updating your preferences in your account settings</li>
        <li>Emailing us at support@wondrr.in</li>
      </ul>
      <p className="mb-6">
        Note: Even if you opt out of marketing emails, we will still send you essential service-related communications (booking confirmations, account updates, etc.).
      </p>

      <hr className="my-8" />

      <h2 className="text-2xl font-bold mb-4">Changes to This Privacy Policy</h2>
      <p className="mb-6">
        We may update this Privacy Policy from time to time to reflect changes in our practices, legal requirements, or services. We will notify you of significant changes by:
      </p>
      <ul className="list-disc list-inside ml-4 mb-6">
        <li>Posting the updated policy on this page with a new &quot;Last Updated&quot; date</li>
        <li>Sending an email notification (for material changes)</li>
      </ul>
      <p className="mb-6">
        Your continued use of our services after changes indicates acceptance of the updated policy.
      </p>

      <hr className="my-8" />

      <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
      <p className="mb-4">
        If you have questions, concerns, or requests regarding this Privacy Policy or your personal data:
      </p>
      <div className="mb-6">
        <p><strong>WONDRR TRIPS</strong></p>
        <p>Email: support@wondrr.in</p>
        <p>Privacy Inquiries: support@wondrr.in</p>
        <p>Website: www.wondrr.in</p>
      </div>

      <hr className="my-8" />

      <h2 className="text-2xl font-bold mb-4">Grievance Redressal</h2>
      <p className="mb-6">
        Under DPDPA 2023, you have the right to lodge complaints about our data handling practices. Please contact our grievance officer at support@wondrr.in. If you are not satisfied with our response, you may escalate to the Data Protection Board of India.
      </p>

      <hr className="my-16 border-t-4" />

      {/* COOKIE POLICY */}
      <h1 className="text-4xl font-bold mb-4 mt-16">Cookie Policy</h1>
      <p className="text-sm text-gray-600 mb-8"><strong>Last Updated: January 14, 2026</strong></p>

      <p className="mb-6">
        This Cookie Policy explains how <strong>WONDRR TRIPS</strong> uses cookies on our website.
      </p>

      <hr className="my-8" />

      <h2 className="text-2xl font-bold mb-4">What Are Cookies?</h2>
      <p className="mb-4">
        A cookie is a small text file which asks permission to be placed on your computer&apos;s hard drive or mobile device when you visit a website. Once you agree, the file is added and the cookie helps the website function properly. Cookies allow websites to respond to you as an individual and remember important information about your session.
      </p>
      <p className="mb-6">
        A cookie in no way gives us access to your computer or any information about you, other than the data you choose to share with us.
      </p>

      <hr className="my-8" />

      <h2 className="text-2xl font-bold mb-4">Cookies We Use</h2>
      <p className="mb-4">
        We use both <strong>essential cookies</strong> (required for website functionality) and <strong>analytics cookies</strong> (to improve your experience).
      </p>

      <h3 className="text-xl font-semibold mb-3">Essential Cookies (Always Active)</h3>

      <div className="mb-4">
        <p className="font-semibold">1. Session Cookies</p>
        <ul className="list-disc list-inside ml-4 mb-2">
          <li>Purpose: Keep you logged into your account</li>
          <li>Duration: Until you close your browser</li>
          <li>Why necessary: Without these, you cannot access your account or make bookings</li>
        </ul>
      </div>

      <div className="mb-4">
        <p className="font-semibold">2. Authentication Cookies</p>
        <ul className="list-disc list-inside ml-4 mb-2">
          <li>Purpose: Verify your identity and secure your session</li>
          <li>Duration: Session-based</li>
          <li>Why necessary: Prevents unauthorized access to your account</li>
        </ul>
      </div>

      <div className="mb-6">
        <p className="font-semibold">3. Razorpay Payment Cookies</p>
        <ul className="list-disc list-inside ml-4 mb-2">
          <li>Purpose: Process payments securely</li>
          <li>Set by: Razorpay (our payment gateway partner)</li>
          <li>Duration: Session-based</li>
          <li>Why necessary: Required to complete payment transactions</li>
          <li>Privacy: Razorpay is PCI DSS compliant. Read their privacy policy at{' '}
            <a href="https://razorpay.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              razorpay.com/privacy
            </a>
          </li>
        </ul>
      </div>

      <h3 className="text-xl font-semibold mt-8 mb-3">Analytics Cookies</h3>
      <p className="mb-4">
        We use analytics cookies to understand how visitors use our website and improve your experience.
      </p>

      <div className="mb-4">
        <p className="font-semibold">4. Google Analytics</p>
        <ul className="list-disc list-inside ml-4 mb-2">
          <li>Purpose: Understand how visitors interact with our website</li>
          <li>Data collected: Pages visited, time spent, browser type, device type, location (country/city level)</li>
          <li>Duration: Up to 2 years</li>
          <li>Privacy: Google Analytics is configured with IP anonymization</li>
          <li>Third party: Set by Google LLC</li>
        </ul>
      </div>

      <div className="mb-6">
        <p className="font-semibold">5. Microsoft Clarity</p>
        <ul className="list-disc list-inside ml-4 mb-2">
          <li>Purpose: Understand user behavior through session recordings and heatmaps</li>
          <li>Data collected: Mouse movements, clicks, scrolling behavior, pages visited</li>
          <li>Duration: Up to 1 year</li>
          <li>Privacy: Personal information is masked and anonymized</li>
          <li>Third party: Set by Microsoft Corporation</li>
        </ul>
      </div>

      <hr className="my-8" />

      <h2 className="text-2xl font-bold mb-4">What We Don&apos;t Use</h2>
      <p className="mb-4">We do <strong>NOT</strong> use the following:</p>
      <ul className="list-none ml-4 mb-6 space-y-1">
        <li className="flex items-center gap-2"><X className="w-4 h-4 text-red-500 flex-shrink-0" /> Marketing or advertising cookies</li>
        <li className="flex items-center gap-2"><X className="w-4 h-4 text-red-500 flex-shrink-0" /> Social media tracking cookies (Facebook Pixel, etc.)</li>
        <li className="flex items-center gap-2"><X className="w-4 h-4 text-red-500 flex-shrink-0" /> Third-party advertising networks</li>
        <li className="flex items-center gap-2"><X className="w-4 h-4 text-red-500 flex-shrink-0" /> Cross-site behavioral profiling for ads</li>
        <li className="flex items-center gap-2"><X className="w-4 h-4 text-red-500 flex-shrink-0" /> Retargeting or remarketing cookies</li>
        <li className="flex items-center gap-2"><X className="w-4 h-4 text-red-500 flex-shrink-0" /> Cookies that sell your data to third parties</li>
      </ul>

      <hr className="my-8" />

      <h2 className="text-2xl font-bold mb-4">Why These Cookies Are Essential</h2>
      <p className="mb-4">These cookies are necessary for core website functionality:</p>
      <ul className="list-none ml-4 mb-4 space-y-2">
        <li className="flex items-start gap-2"><Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" /> <span><strong>Login and Account Access:</strong> Without session cookies, you would need to re-enter your credentials on every page</span></li>
        <li className="flex items-start gap-2"><Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" /> <span><strong>Security:</strong> Authentication cookies protect your account from unauthorized access</span></li>
        <li className="flex items-start gap-2"><Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" /> <span><strong>Payment Processing:</strong> Razorpay cookies enable secure payment transactions</span></li>
        <li className="flex items-start gap-2"><Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" /> <span><strong>Shopping Cart:</strong> Remembering items you&apos;re booking</span></li>
      </ul>
      <p className="mb-6">
        <strong>These cookies cannot be disabled</strong> as they are essential for the website to work. They are not used for tracking or marketing.
      </p>

      <hr className="my-8" />

      <h2 className="text-2xl font-bold mb-4">Managing Cookies</h2>

      <h3 className="text-xl font-semibold mb-3">Opting Out of Analytics Cookies</h3>
      <p className="mb-4">
        You can opt out of analytics tracking without affecting website functionality:
      </p>

      <div className="mb-6">
        <p className="font-semibold mb-2">Google Analytics Opt-Out:</p>
        <ul className="list-disc list-inside ml-4 space-y-1">
          <li>Install the{' '}
            <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              Google Analytics Opt-out Browser Add-on
            </a>
          </li>
          <li>Or use your browser&apos;s Do Not Track (DNT) setting</li>
        </ul>
      </div>

      <div className="mb-6">
        <p className="font-semibold mb-2">Microsoft Clarity Opt-Out:</p>
        <ul className="list-disc list-inside ml-4 space-y-1">
          <li>Visit{' '}
            <a href="https://privacy.microsoft.com/en-us/privacystatement" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              Microsoft Privacy Settings
            </a>
          </li>
          <li>Or block cookies through your browser settings (see below)</li>
        </ul>
      </div>

      <h3 className="text-xl font-semibold mb-3">Browser Settings</h3>
      <p className="mb-4">
        You can control cookies through your browser settings. Disabling essential cookies will prevent you from using core features like login and payments, but disabling analytics cookies will not affect website functionality.
      </p>

      <div className="mb-4 space-y-2">
        <p><strong>Google Chrome:</strong> Settings → Privacy and Security → Cookies and other site data</p>
        <p><strong>Mozilla Firefox:</strong> Settings → Privacy & Security → Cookies and Site Data</p>
        <p><strong>Safari:</strong> Preferences → Privacy → Manage Website Data</p>
        <p><strong>Microsoft Edge:</strong> Settings → Cookies and site permissions</p>
      </div>

      <div className="mb-6">
        <p className="font-semibold mb-2">Mobile Browsers:</p>
        <ul className="list-disc list-inside ml-4 space-y-1">
          <li>iOS Safari: Settings → Safari → Block All Cookies</li>
          <li>Chrome Mobile: Settings → Site Settings → Cookies</li>
          <li>Firefox Mobile: Settings → Privacy → Cookies</li>
        </ul>
      </div>

      <h3 className="text-xl font-semibold mb-3">Impact of Disabling Cookies</h3>

      <p className="font-semibold mb-2">Disabling Essential Cookies:</p>
      <ul className="list-none ml-4 mb-4 space-y-1">
        <li className="flex items-center gap-2"><X className="w-4 h-4 text-red-500 flex-shrink-0" /> You will not be able to log into your account</li>
        <li className="flex items-center gap-2"><X className="w-4 h-4 text-red-500 flex-shrink-0" /> You cannot complete bookings or payments</li>
        <li className="flex items-center gap-2"><X className="w-4 h-4 text-red-500 flex-shrink-0" /> The website will not function properly</li>
        <li className="flex items-center gap-2"><X className="w-4 h-4 text-red-500 flex-shrink-0" /> Your session will not be maintained</li>
      </ul>

      <p className="font-semibold mb-2">Disabling Analytics Cookies:</p>
      <ul className="list-none ml-4 mb-4 space-y-1">
        <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500 flex-shrink-0" /> Website will continue to work normally</li>
        <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500 flex-shrink-0" /> You can still book trips and make payments</li>
        <li className="flex items-center gap-2"><AlertTriangle className="w-4 h-4 text-yellow-500 flex-shrink-0" /> We won&apos;t be able to improve your experience based on usage data</li>
      </ul>

      <p className="mb-6">
        <strong>We recommend allowing cookies from wondrr.in, razorpay.com, google-analytics.com, and clarity.ms for the best experience.</strong>
      </p>

      <hr className="my-8" />

      <h2 className="text-2xl font-bold mb-4">Third-Party Cookies</h2>

      <h3 className="text-xl font-semibold mb-3">Razorpay Payment Cookies</h3>
      <p className="mb-4">Razorpay is our trusted payment gateway partner. They use cookies to:</p>
      <ul className="list-disc list-inside ml-4 mb-4">
        <li>Process payments securely</li>
        <li>Prevent fraud</li>
        <li>Comply with payment card industry standards (PCI DSS)</li>
        <li>Maintain payment session integrity</li>
      </ul>
      <p className="mb-4">
        Razorpay does not use these cookies for marketing or tracking purposes outside of payment processing.
      </p>
      <p className="mb-6">
        <strong>Learn more:</strong>{' '}
        <a href="https://razorpay.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
          Razorpay Privacy Policy
        </a>
      </p>

      <h3 className="text-xl font-semibold mb-3">Google Analytics Cookies</h3>
      <p className="mb-4">
        Google Analytics is a web analytics service provided by Google LLC. It helps us understand:
      </p>
      <ul className="list-disc list-inside ml-4 mb-4">
        <li>How many people visit our website</li>
        <li>Which pages are most popular</li>
        <li>How long visitors stay on each page</li>
        <li>What devices and browsers are used</li>
        <li>General geographic location (country/city level)</li>
      </ul>
      <p className="mb-4">
        Google Analytics uses cookies to track this information. The data is anonymous and cannot identify you personally.
      </p>
      <p className="mb-6">
        <strong>Learn more:</strong>{' '}
        <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
          Google Privacy Policy
        </a>
        {' | '}
        <a href="https://support.google.com/analytics/answer/6004245" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
          How Google uses data
        </a>
      </p>

      <h3 className="text-xl font-semibold mb-3">Microsoft Clarity Cookies</h3>
      <p className="mb-4">
        Microsoft Clarity is a user behavior analytics tool provided by Microsoft Corporation. It helps us:
      </p>
      <ul className="list-disc list-inside ml-4 mb-4">
        <li>See how users navigate our website (heatmaps)</li>
        <li>Identify usability issues</li>
        <li>Understand where users click and scroll</li>
        <li>Improve website design and user experience</li>
      </ul>
      <p className="mb-4">
        Clarity uses cookies and may record sessions (mouse movements, clicks, scrolling). Personal information like names, addresses, and payment details are automatically masked.
      </p>
      <p className="mb-6">
        <strong>Learn more:</strong>{' '}
        <a href="https://privacy.microsoft.com/en-us/privacystatement" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
          Microsoft Privacy Statement
        </a>
        {' | '}
        <a href="https://docs.microsoft.com/en-us/clarity/setup-and-installation/cookie-list" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
          Clarity Cookie List
        </a>
      </p>

      <hr className="my-8" />

      <h2 className="text-2xl font-bold mb-4">Data Protection and Privacy</h2>
      <p className="mb-4">
        All cookies we use are covered by our Privacy Policy and comply with the Digital Personal Data Protection Act, 2023:
      </p>
      <ul className="list-disc list-inside ml-4 mb-4">
        <li><strong>Essential cookies:</strong> Strictly necessary for website functionality</li>
        <li><strong>Analytics cookies:</strong> Used only to improve user experience, data is anonymized</li>
        <li><strong>No cross-site tracking:</strong> We do not track your browsing on other websites</li>
        <li><strong>No data selling:</strong> Your data is never sold to third parties</li>
        <li><strong>Security:</strong> All cookies are secured with appropriate technical safeguards</li>
      </ul>
      <p className="mb-6">
        Third-party cookies (Google Analytics, Microsoft Clarity, Razorpay) are governed by their respective privacy policies and are compliant with international data protection standards.
      </p>

      <hr className="my-8" />

      <h2 className="text-2xl font-bold mb-4">Your Rights</h2>
      <p className="mb-4">Under DPDPA 2023, you have the right to:</p>
      <ul className="list-disc list-inside ml-4 mb-4">
        <li>Know what data is collected through cookies</li>
        <li>Access your personal information</li>
        <li>Request deletion of your account and associated data</li>
        <li>Opt out of analytics cookies (using the methods described above)</li>
        <li>Withdraw consent (though essential cookies are required for website functionality)</li>
        <li>Lodge complaints about data handling</li>
      </ul>
      <p className="mb-6">
        <strong>Contact us:</strong> support@wondrr.in
      </p>

      <hr className="my-8" />

      <h2 className="text-2xl font-bold mb-4">Updates to This Policy</h2>
      <p className="mb-6">
        We may update this Cookie Policy from time to time. Any changes will be posted on this page with an updated &quot;Last Updated&quot; date. If we start using additional types of cookies, we will update this policy and notify users accordingly.
      </p>

      <hr className="my-8" />

      <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
      <p className="mb-2">If you have questions about our use of cookies:</p>
      <div className="mb-6">
        <p><strong>WONDRR TRIPS</strong></p>
        <p>Email: support@wondrr.in</p>
        <p>Website: www.wondrr.in</p>
      </div>

      <hr className="my-8" />

      <p className="text-sm text-gray-600 italic">
        This Cookie Policy is compliant with the Digital Personal Data Protection Act, 2023 and Digital Personal Data Protection Rules, 2025. By continuing to use our website, you consent to the use of essential cookies. You can opt out of analytics cookies using the methods described above without affecting website functionality.
      </p>
    </div>
  )
}

export default Policy