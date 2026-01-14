'use client'

import BackButton from "@/common/ui/BackButton";

export default function BookingPolicy() {
    return (
        <div>
            <div className="container mx-auto px-4 py-8 max-w-4xl">
            <BackButton className="mb-4" />

                <h1 className="text-3xl font-bold mb-6">Terms & Conditions - Please Read Before Booking</h1>
                <p className="mb-6">
                    By completing this booking, you acknowledge and agree to the following:
                </p>

                <h2 className="text-2xl font-semibold mb-4">1. Booking Confirmation</h2>
                <ul className="list-disc list-inside mb-6 space-y-2">
                    <li>Upon successful payment, you will receive a booking confirmation via email within 24 hours</li>
                    <li>This confirmation serves as official proof of your reservation</li>
                    <li>Please verify all booking details in the confirmation email immediately and contact us within 48 hours if any information is incorrect</li>
                </ul>

                <h2 className="text-2xl font-semibold mb-4">2. Cancellation & Refund Policy</h2>
                <ul className="list-disc list-inside mb-4 space-y-1">
                    <li>More than 7 days before the experience: 100% refund (less payment gateway charges)</li>
                    <li>Between 72 hours and 7 days before the experience: 50% refund (less payment gateway charges)</li>
                    <li>Less than 72 hours before the experience: No refund</li>
                    <li>No-Show (failure to appear): No refund</li>
                </ul>
                <p className="mb-4"><strong>Important Refund Terms:</strong></p>
                <ul className="list-disc list-inside mb-6 space-y-1">
                    <li>All refunds are subject to deduction of payment gateway processing charges (typically 2-3% of transaction value)</li>
                    <li>Refunds will be processed within 7-10 business days to your original payment method</li>
                    <li>In cases where the Partner has received advance payments for non-refundable third-party costs (accommodation, transportation, permits), these costs will be deducted from your refund.
                        {/* Such costs will be clearly disclosed in the experience listing prior to booking. */}
                    </li>
                </ul>

                <h2 className="text-2xl font-semibold mb-4">3. Partner Cancellations</h2>
                <ul className="list-disc list-inside mb-6 space-y-2">
                    <li><strong>General Rule:</strong> Partners shall not cancel confirmed bookings except in genuine emergency situations</li>
                    <li><strong>Permitted Cancellations:</strong> Only in cases of medical emergency, force majeure (acts of God), unsafe weather conditions, or government restrictions</li>
                    <li><strong>Your Options:</strong> If the Partner cancels, you will be offered:</li>
                </ul>
                <ol className="list-decimal list-inside mb-6 ml-6 space-y-1">
                    <li>Full 100% refund (including all fees), OR</li>
                    <li>Reschedule to an alternative date within 6 months at no additional cost</li>
                </ol>

                <h2 className="text-2xl font-semibold mb-4">4. Your Responsibilities</h2>
                <p className="mb-4">As a participant, you are responsible for:</p>
                <ul className="list-disc list-inside mb-6 space-y-1">
                    <li>Arriving at the designated meeting point on time (late arrivals may be treated as no-shows)</li>
                    <li>Meeting all age, physical fitness, and health requirements specified for the experience</li>
                    <li>Disclosing any medical conditions, allergies, or special requirements that may affect your participation</li>
                    <li>Bringing all required documents (valid ID, permits, travel documents, etc.)</li>
                    <li>Following all safety instructions and guidelines provided by the Partner</li>
                    <li>Ensuring you have appropriate travel and medical insurance coverage</li>
                </ul>

                <h2 className="text-2xl font-semibold mb-4">5. Assumption of Risk and Personal Responsibility</h2>
                <p className="mb-4">You acknowledge and accept that:</p>
                <ul className="list-disc list-inside mb-6 space-y-1">
                    <li>You are voluntarily participating in the booked experience and assume all inherent risks associated with the activity</li>
                    <li>Adventure and outdoor activities carry inherent risks including, but not limited to, injury, illness, or property damage</li>
                    <li>You are personally responsible for any mishap, injury, loss, or damage that occurs during the experience or due to your participation in any activity</li>
                    <li>You release Wondrr Trips and its Partners from liability for injuries or damages resulting from your participation, except in cases of gross negligence or willful misconduct by the Partner</li>
                    <li>You will comply with all safety protocols, instructions, and guidelines provided by the Partner</li>
                </ul>

                <h2 className="text-2xl font-semibold mb-4">6. Pricing & Payment</h2>
                <ul className="list-disc list-inside mb-6 space-y-1">
                    <li>All prices displayed on the platform are in Indian Rupees (INR) and include applicable taxes unless explicitly stated otherwise</li>
                    <li>Payment must be completed at the time of booking through our secure payment gateway</li>
                    <li>Payment gateway processing charges are non-refundable in all circumstances</li>
                    <li>For international transactions, currency conversion fees charged by your financial institution are your responsibility</li>
                    <li>Wondrr Trips reserves the right to correct pricing errors; in such cases, you will be offered the option to proceed at the correct price or receive a full refund</li>
                </ul>

                <h2 className="text-2xl font-semibold mb-4">7. Platform Role & Limitation of Liability</h2>
                <h3 className="text-xl font-medium mb-2">7.1 Platform Role</h3>
                <ul className="list-disc list-inside mb-4 space-y-1">
                    <li>Wondrr Trips acts solely as an intermediary booking platform connecting users with independent service Partners (tour operators, activity providers, accommodation providers, transportation services)</li>
                    <li>The ultimate contract for the experience is formed directly between you and the Partner</li>
                    <li>Wondrr Trips does not own, operate, manage, or control the experiences offered by Partners</li>
                </ul>
                <h3 className="text-xl font-medium mb-2">7.2 Partner Responsibility</h3>
                <ul className="list-disc list-inside mb-4 space-y-1">
                    <li>Partners are solely and exclusively responsible for the delivery, quality, safety, and execution of all experiences</li>
                    <li>Wondrr Trips bears no liability for Partners&apos; acts, omissions, errors, representations, warranties, breaches, negligence, or service standards</li>
                    <li>This includes but is not limited to the quality, availability, accuracy of descriptions, safety measures, or fitness for purpose of any service</li>
                </ul>
                <h3 className="text-xl font-medium mb-2">7.3 No Liability for Service Delivery</h3>
                <p className="mb-2">Wondrr Trips explicitly disclaims all responsibility for service quality issues, including:</p>
                <p className="mb-2"><strong>Accommodation Issues:</strong></p>
                <ul className="list-disc list-inside mb-2 space-y-1">
                    <li>Hotel/lodging discrepancies (room type, amenities, cleanliness, location differences from description)</li>
                    <li>Check-in denials, overbookings, or unavailability</li>
                    <li>Food quality or meal service issues</li>
                </ul>
                <p className="mb-2"><strong>Transportation Issues:</strong></p>
                <ul className="list-disc list-inside mb-2 space-y-1">
                    <li>Bus, vehicle, or transport delays, cancellations, or route changes</li>
                    <li>Vehicle condition, cleanliness, or comfort levels</li>
                    <li>Baggage loss, damage, or mishandling</li>
                    <li>Seat allocation or changes</li>
                </ul>
                <p className="mb-2"><strong>Activity & Tour Issues:</strong></p>
                <ul className="list-disc list-inside mb-2 space-y-1">
                    <li>Itinerary changes, delays, or cancellations by Partners</li>
                    <li>Quality of guides, equipment, or facilities</li>
                    <li>Any Partner shortcomings in service delivery</li>
                </ul>
                <p className="mb-4"><strong>User Action Required:</strong> You must resolve all service quality issues directly with the Partner or relevant service provider. Wondrr Trips offers no guarantees regarding the execution or quality of Partner services.</p>
                <h3 className="text-xl font-medium mb-2">7.4 Limited Liability Scope</h3>
                <ul className="list-disc list-inside mb-4 space-y-1">
                    <li>Wondrr Trips&apos; role ends upon confirmed booking; we facilitate the transaction but do not guarantee service outcomes</li>
                    <li>We are not liable for:</li>
                </ul>
                <ul className="list-disc list-inside mb-4 ml-6 space-y-1">
                    <li>Inaccurate, incomplete, or outdated information provided by Partners</li>
                    <li>Technical failures, website errors, or system malfunctions</li>
                    <li>Force majeure events (pandemics, natural disasters, civil unrest, government actions, travel restrictions)</li>
                    <li>Partner bankruptcy, cessation of operations, or breach of contract</li>
                    <li>Third-party service failures</li>
                    <li>Any consequential, indirect, incidental, special, or punitive damages</li>
                    <li>Loss of profits, data, business opportunities, or personal time</li>
                    <li>Emotional distress or disappointment</li>
                </ul>
                <ul className="list-disc list-inside mb-4 space-y-1">
                    <li>All services are provided &quot;AS IS&quot; without warranties of any kind, express or implied, including warranties of merchantability or fitness for a particular purpose</li>
                    <li>Maximum Liability Cap: Wondrr Trips&apos; total aggregate liability for any claim shall not exceed the total booking amount you paid for the specific experience in question</li>
                </ul>
                <h3 className="text-xl font-medium mb-2">7.5 Insurance Recommendation</h3>
                <p className="mb-4">We strongly recommend that all users purchase comprehensive travel and medical insurance covering:</p>
                <ul className="list-disc list-inside mb-6 space-y-1">
                    <li>Trip cancellation and interruption</li>
                    <li>Medical emergencies and evacuation</li>
                    <li>Personal accident and liability</li>
                    <li>Lost or damaged baggage</li>
                    <li>Adventure activity coverage (if applicable)</li>
                </ul>

                <h2 className="text-2xl font-semibold mb-4">8. Force Majeure and Unforeseen Events</h2>
                <p className="mb-4">Wondrr Trips, Partners, and service providers are not liable for failure to perform obligations due to events beyond reasonable control, including but not limited to:</p>
                <ul className="list-disc list-inside mb-4 space-y-1">
                    <li>Natural disasters (earthquakes, floods, hurricanes, tsunamis)</li>
                    <li>Epidemics, pandemics, or public health emergencies</li>
                    <li>War, terrorism, civil unrest, or political instability</li>
                    <li>Government orders, travel bans, or regulatory changes</li>
                    <li>Strikes, labor disputes, or transportation disruptions</li>
                    <li>Technical failures or cyberattacks</li>
                </ul>
                <p className="mb-4"><strong>In the event of force majeure:</strong></p>
                <ul className="list-disc list-inside mb-6 space-y-1">
                    <li>Wondrr Trips&apos; liability is limited to facilitating communication with Partners regarding alternatives or refunds</li>
                    <li>Any refunds or rescheduling options are subject to Partner policies and capabilities</li>
                    <li>You must contact the Partner directly for resolution; Wondrr Trips disclaims broader liability beyond facilitating contact</li>
                </ul>

                <h2 className="text-2xl font-semibold mb-4">9. Health & Safety</h2>
                <ul className="list-disc list-inside mb-6 space-y-1">
                    <li>You confirm that you are medically and physically fit to participate in the booked experience</li>
                    <li>You acknowledge that adventure, outdoor, and physical activities carry inherent risks of injury or illness</li>
                    <li>You must follow all safety instructions, guidelines, and protocols provided by the Partner</li>
                    <li>You must inform the Partner in advance of any medical conditions, allergies, medications, disabilities, or health concerns that may affect your participation or require special accommodations</li>
                    <li>Failure to disclose relevant health information may result in denial of participation without refund</li>
                    <li><strong>COVID-19 and Infectious Disease Protocols:</strong> You agree to comply with all applicable health authority guidelines, including vaccination proof or testing requirements if mandated</li>
                </ul>

                <h2 className="text-2xl font-semibold mb-4">10. Minors and Parental Consent</h2>
                <ul className="list-disc list-inside mb-6 space-y-1">
                    <li>Participants under 18 years of age are considered minors and must be accompanied by a parent or legal guardian unless the experience explicitly permits unaccompanied minors</li>
                    <li>Age restrictions and requirements are clearly stated in each experience listing</li>
                    <li>By booking an experience for a minor, you confirm that:</li>
                </ul>
                <ul className="list-disc list-inside mb-6 ml-6 space-y-1">
                    <li>You are the parent or legal guardian of the minor</li>
                    <li>You provide full parental consent for the minor&apos;s participation</li>
                    <li>You acknowledge and assume all risks on behalf of the minor</li>
                    <li>The minor meets all age, health, and fitness requirements</li>
                </ul>

                <h2 className="text-2xl font-semibold mb-4">11. Modification of Bookings</h2>
                <ul className="list-disc list-inside mb-6 space-y-1">
                    <li>Date or time changes to existing bookings are subject to Partner availability and approval</li>
                    <li>Modification requests must be made at least 7 days before the original experience date</li>
                    <li>Modifications may incur a processing fee of up to 10% of the booking value at the Partner&apos;s discretion</li>
                    <li>Modifications requested within 7 days of the experience date will be treated as cancellations subject to the applicable refund policy</li>
                </ul>

                <h2 className="text-2xl font-semibold mb-4">12. Photo/Video Usage and Media Rights</h2>
                <ul className="list-disc list-inside mb-6 space-y-1">
                    <li>Partners may take photographs or videos during the experience for documentation and marketing purposes</li>
                    <li>By participating, you grant Wondrr Trips and Partners permission to use such images in promotional materials unless you explicitly opt out in writing prior to the experience</li>
                    <li>You retain the right to request removal of any images featuring you</li>
                </ul>

                <h2 className="text-2xl font-semibold mb-4">13. Dispute Resolution and Governing Law</h2>
                <h3 className="text-xl font-medium mb-2">14.1 Complaint and Grievance Process</h3>
                <ul className="list-disc list-inside mb-4 space-y-1">
                    <li>Any complaints or issues should first be reported to Wondrr Trips customer support within 48 hours of experience completion</li>
                    <li>Contact: support@wondrr.com | +91-XXXX-XXXXXX</li>
                    <li>We will investigate and attempt resolution within 14 business days</li>
                    <li>Grievance Officer: [Name] | [Email] | [Phone]</li>
                </ul>
                <h3 className="text-xl font-medium mb-2">13.2 Governing Law</h3>
                <ul className="list-disc list-inside mb-4 space-y-1">
                    <li>These Terms & Conditions are governed by and construed in accordance with the laws of India</li>
                    <li>Any disputes shall be subject to the exclusive jurisdiction of the courts in [Your City/State], India</li>
                    <li>For disputes involving amounts exceeding ₹1,00,000, parties agree to binding arbitration in accordance with the Arbitration and Conciliation Act, 1996</li>
                </ul>
                <h3 className="text-xl font-medium mb-2">13.3 Consumer Rights</h3>
                <ul className="list-disc list-inside mb-6 space-y-1">
                    <li>These terms comply with the Consumer Protection Act, 2019</li>
                    <li>You retain all rights to file complaints with Consumer Forums if grievances are not resolved satisfactorily</li>
                </ul>

                <h2 className="text-2xl font-semibold mb-4">14. Prohibited Conduct</h2>
                <p className="mb-4">Users shall not:</p>
                <ul className="list-disc list-inside mb-4 space-y-1">
                    <li>Provide false, inaccurate, or misleading information during booking</li>
                    <li>Use the platform for any unlawful purpose</li>
                    <li>Attempt to circumvent the platform to book directly with Partners</li>
                    <li>Engage in fraudulent payment activities</li>
                    <li>Harass, threaten, or abuse Partners, guides, or other participants</li>
                    <li>Violate any applicable laws or regulations during the experience</li>
                </ul>
                <p className="mb-6">Violation of these terms may result in booking cancellation without refund and account suspension.</p>

                <h2 className="text-2xl font-semibold mb-4">15. Entire Agreement and Severability</h2>
                <ul className="list-disc list-inside mb-6 space-y-1">
                    <li>These Terms & Conditions, together with our Privacy Policy and Refund Policy, constitute the entire agreement between you and Wondrr Trips</li>
                    <li>If any provision is found to be unenforceable or invalid, the remaining provisions shall remain in full force and effect</li>
                    <li>Wondrr Trips reserves the right to modify these terms at any time; material changes will be communicated via email at least 30 days before taking effect</li>
                    <li>Continued use of the platform after changes constitutes acceptance of modified terms</li>
                </ul>

                <div className="bg-gray-100 p-6 rounded-lg mb-6">
                    <p className="font-semibold mb-4">By proceeding with this booking, you confirm that:</p>
                    <ul className="space-y-2">
                        <li>☐ I have read, understood, and agree to these Terms & Conditions</li>
                        <li>☐ I have read and agree to the Privacy Policy and Refund Policy</li>
                        <li>☐ I confirm that I meet all requirements for this experience</li>
                        <li>☐ I acknowledge the assumption of risk and limitations of liability</li>
                        <li>☐ I understand that Wondrr Trips is a booking platform and Partners are solely responsible for service delivery</li>
                    </ul>
                </div>

                <div className="bg-blue-50 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold mb-4">Need Help?</h3>
                    <ul className="space-y-2">
                        <li>📧 support@wondrr.com</li>
                        <li>📞 +91-8217728508 / 9151315550</li>
                        <li>💬 Live Chat Available: 9 AM - 9 PM IST</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
