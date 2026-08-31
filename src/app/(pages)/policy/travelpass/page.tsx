'use client'

import BackButton from '@/common/ui/BackButton'

export default function TravelPassPolicy() {
  return (
    <div className="min-h-screen bg-[#fff9f4]">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <BackButton className="mb-4" />

        <h1 className="text-3xl font-bold mb-6">TravelPass Policy</h1>
        <p className="mb-6 text-gray-700">
          TravelPass is Wondrr&apos;s recurring auto-pay (SIP) feature that helps you save toward a trip in installments. By subscribing to a TravelPass plan, you agree to the following terms:
        </p>

        <ul className="list-disc list-inside space-y-3 text-gray-800">
          <li>TravelPass installments are credited to your account only as <strong>Wondrr Cash</strong> and can be redeemed exclusively by purchasing trips on Wondrr — they cannot be withdrawn as real money.</li>
          <li>You can have only <strong>one active TravelPass subscription at a time</strong>. A new plan can only be started once your current one is completed or cancelled.</li>
          <li>Once a TravelPass subscription is <strong>cancelled, it cannot be resumed</strong> — you&apos;ll need to start a fresh subscription if you want to save again.</li>
          <li>If you cancel <strong>before reaching the plan&apos;s target amount</strong>, the completion bonus is forfeited — only the installments you&apos;ve already paid remain in your wallet as Wondrr Cash.</li>
          <li>The completion bonus is credited only once your cumulative installments reach the plan&apos;s target amount, and the mandate is closed automatically after that.</li>
          <li>Wondrr Cash earned through TravelPass <strong>cannot be transferred</strong> to another user or account, and cannot be exchanged for cash.</li>
          <li>Wondrr Cash credited through TravelPass has a validity period from the date it&apos;s credited; unused balance may expire as per the wallet&apos;s expiry terms shown in your account.</li>
          <li>Installments are auto-debited via the payment method (UPI Autopay, eNACH, or card, depending on availability) you authorize at setup, on the frequency (daily/weekly/monthly) you choose.</li>
          <li>A missed or failed installment does not cancel your subscription automatically, but repeated failures may lead the bank or payment gateway to terminate the mandate.</li>
          <li>TravelPass is a self-funded savings tool, not a bank deposit, investment product, or interest-bearing instrument. Returns are limited to the disclosed completion bonus and nothing beyond it is guaranteed.</li>
          <li>You are responsible for ensuring your linked payment method has sufficient balance and mandate limits for each scheduled debit.</li>
          <li>Wondrr may modify or discontinue TravelPass plans for future subscribers at any time; any changes will not affect the terms of a subscription you&apos;ve already started.</li>
        </ul>

        <div className="bg-blue-50 p-6 rounded-lg mt-8">
          <h3 className="text-xl font-semibold mb-2">Need Help?</h3>
          <p>Reach out to us at <strong>support@wondrr.com</strong> for any questions about your TravelPass subscription.</p>
        </div>
      </div>
    </div>
  )
}
