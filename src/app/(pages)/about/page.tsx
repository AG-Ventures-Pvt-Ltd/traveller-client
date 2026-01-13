'use client'

import Button from "@/common/components/atoms/Button";
import MyImage from "@/common/ui/Image";
import { Calendar, CreditCard, FileText, MapPin, MessageCircle, Shell, Shield, TrendingUp, Users, Zap } from 'lucide-react';
import { ProblemCard, ApproachCard, UserCard, PrincipleCard } from './components';


export default function Page() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <section className="flex flex-col lg:flex-row px-4 sm:px-6 lg:px-12 pt-8 sm:pt-12 bg-gradient-to-b from-neutral-50 to-white border-b-2 border-gray-200 justify-between pb-12 sm:pb-20">
        <div className="flex flex-col gap-4 sm:gap-6 lg:w-1/2">
          <div className="flex items-center gap-4">
            <div className="w-32 sm:w-48 h-8 sm:h-10 bg-primary rounded-full flex items-center px-3 sm:px-4">
              <div className="w-3 sm:w-4 h-3 sm:h-4 overflow-hidden mr-2">
                <div className="w-2 sm:w-2.5 h-3 sm:h-3.5 outline outline-offset-[-0.67px] outline-white" />
              </div>
              <div className="text-white text-xs sm:text-sm font-bold font-['Satoshi']">Trust-First Platform</div>
            </div>
          </div>
          <div className="text-primary text-3xl sm:text-4xl lg:text-6xl font-bold font-['Satoshi'] leading-tight lg:leading-[70.40px]">What Wondrr Is</div>
          <div className="text-neutral-700 text-base sm:text-lg lg:text-xl font-medium font-['Satoshi'] leading-6 sm:leading-7 lg:leading-8 max-w-2xl">
            Wondrr is a structured, trust-first platform built to organize India&apos;s unorganized group travel ecosystem. We help travel groups and travel companies move away from WhatsApp-based coordination by providing a professional system to post trips, manage batches, track participants, handle payments, and communicate clearly.
          </div>
          <div className="bg-white rounded-2xl sm:rounded-3xl outline-2 outline-offset-[-1.84px] outline-gray-200 p-4 sm:p-7 max-w-2xl">
            <div className="text-primary text-sm sm:text-base font-bold font-['Satoshi'] leading-5 sm:leading-6">Wondrr does not sell travel experiences.</div>
            <div className="text-neutral-700 text-sm sm:text-base font-medium font-['Satoshi'] leading-5 sm:leading-6 mt-2">
              We enable operators to manage and deliver group trips in a reliable, scalable way, while giving travelers clarity, transparency, and confidence.
            </div>
          </div>
        </div>
        <div className="flex justify-center lg:justify-end items-start mt-6 lg:mt-0">
          <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-none">
            <MyImage width={652} height={500} className="rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl w-full h-auto" src="https://placehold.co/652x500" alt="Hero" />
            {/* <div className="absolute -left-4 sm:-left-8 top-[200px] sm:top-[300px] lg:top-[413px] w-32 sm:w-44 h-20 sm:h-28 bg-white rounded-xl sm:rounded-2xl shadow-lg outline-2 outline-offset-[-1.84px] outline-gray-200 p-3 sm:p-4">
              <div className="text-primary text-2xl sm:text-3xl lg:text-4xl font-bold font-['Satoshi']">1000+</div>
              <div className="text-neutral-700 text-xs sm:text-sm font-medium font-['Satoshi']">Trips Organized</div>
            </div> */}
          </div>
        </div>
      </section>

      <section className="flex flex-col px-4 sm:px-8 lg:px-32 pt-12 sm:pt-16 lg:pt-24 pb-12 sm:pb-16 lg:pb-20 bg-white border-b-2 border-gray-200">
        <div className="flex flex-col gap-8 sm:gap-12 lg:gap-16">
          <div className="text-center">
            <div className="text-primary text-3xl sm:text-4xl lg:text-5xl font-bold font-['Satoshi'] leading-tight lg:leading-[52.80px]">The Problem</div>
            <div className="text-neutral-700 text-base sm:text-lg lg:text-xl font-medium font-['Satoshi'] leading-6 sm:leading-7 lg:leading-8 mt-2 sm:mt-4">Chaos, lack of structure, and trust issues define group travel in India today</div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
            <ProblemCard
              icon={<div className="w-6 sm:w-8 h-6 sm:h-8 outline-[2.67px] outline-white"></div>}
              title="WhatsApp Chaos"
              description="Group trips are managed through endless WhatsApp messages, scattered spreadsheets, and informal payment collection. Critical information gets lost in chat history, leading to confusion and miscommunication."
            />
            <ProblemCard
              icon={<div className="w-4 sm:w-5 h-6 sm:h-7 outline-[2.67px] outline-white"></div>}
              title="Trust Breakdown"
              description="Travelers have no way to verify operator credibility. Unclear refund policies, hidden costs, and last-minute changes erode confidence. The lack of transparency creates anxiety instead of excitement."
            />
            <ProblemCard
              icon={<div className="w-4 sm:w-5 h-6 sm:h-7 outline-[2.67px] outline-white"><div className="w-2 h-2 outline-[2.67px] outline-white"></div><div className="w-[2.67px] h-0 outline-[2.67px] outline-white"></div><div className="w-2.5 h-0 outline-[2.67px] outline-white"></div><div className="w-2.5 h-0 outline-[2.67px] outline-white"></div></div>}
              title="No Structure"
              description="Operators struggle to manage multiple batches, track payments, and keep participants informed. Without proper systems, scaling becomes impossible and quality suffers as the business grows."
            />
            <ProblemCard
              icon={<div className="w-6 sm:w-7 h-4 sm:h-5 outline-[2.67px] outline-white"><div className="w-6 sm:w-7 h-0 outline-[2.67px] outline-white"></div></div>}
              title="Payment Hassles"
              description="Manual payment tracking via bank transfers and Google Pay leads to errors, delays, and disputes. Refund requests become nightmares. There's no clear record of who paid what and when."
            />
          </div>
        </div>
      </section>

      <section className="flex flex-col px-4 sm:px-8 lg:px-32 pt-12 sm:pt-16 lg:pt-24 pb-12 sm:pb-16 lg:pb-20 bg-gradient-to-b from-neutral-50 to-white border-b-2 border-gray-200">
        <div className="flex flex-col gap-8 sm:gap-12 lg:gap-16">
          <div className="text-center">
            <div className="text-primary text-3xl sm:text-4xl lg:text-5xl font-bold font-['Satoshi'] leading-tight lg:leading-[52.80px]">The Wondrr Approach</div>
            <div className="text-neutral-700 text-base sm:text-lg lg:text-xl font-medium font-['Satoshi'] leading-6 sm:leading-7 lg:leading-8 mt-2 sm:mt-4">How structure, transparency, and systems solve the chaos</div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <ApproachCard
              icon={<Calendar/>}
              title="Structured Trip Management"
              description="Operators can create trips with detailed itineraries, manage multiple batches, set capacities, and update information in one place—visible to all participants."
            />
            <ApproachCard
              icon={<Shield/>}
              title="Transparency By Default"
              description="Clear pricing, refund policies, host profiles, and reviews are mandatory. No hidden surprises. Everything travelers need to know is upfront."
            />
            <ApproachCard
              icon={<CreditCard/>}
              title="Payment Tracking"
              description="Automated payment reminders, status tracking, and refund workflows eliminate manual errors and reduce operator workload significantly."
            />
            <ApproachCard
              icon={<Users/>}
              title="Participant Management"
              description="Track who's joined, who's paid, who's pending. Send batch-specific updates. Manage waitlists. All in one dashboard."
            />
            <ApproachCard
              icon={<MessageCircle/>}
              title="Clear Communication"
              description="No more lost messages. Important trip updates, policy changes, and announcements reach everyone through organized channels."
            />
            <ApproachCard
              icon={<TrendingUp/>}
              title="Scalable Operations"
              description="Operators can grow from 10 trips a year to 100+ without chaos. Systems scale with the business, not against it."
            />
          </div>
          <div className="bg-primary rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 text-center relative overflow-hidden">
            <MyImage fill className="object-cover opacity-10" src="https://placehold.co/1200x174" alt="Background" />
            <div className="relative text-white text-xl sm:text-2xl lg:text-3xl font-bold font-['Satoshi'] leading-7 sm:leading-8 lg:leading-10">
              &quot;Structure doesn&apos;t limit creativity.<br />It enables reliability.&quot;
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col px-4 sm:px-8 lg:px-32 pt-12 sm:pt-16 lg:pt-24 pb-12 sm:pb-16 lg:pb-20 bg-white border-b-2 border-gray-200">
        <div className="flex flex-col gap-8 sm:gap-12 lg:gap-16">
          <div className="text-center">
            <div className="text-primary text-3xl sm:text-4xl lg:text-5xl font-bold font-['Satoshi'] leading-tight lg:leading-[52.80px]">Who It&apos;s Built For</div>
            <div className="text-neutral-700 text-base sm:text-lg lg:text-xl font-medium font-['Satoshi'] leading-6 sm:leading-7 lg:leading-8 mt-2 sm:mt-4">Two sides. One platform. Mutual benefit.</div>
          </div>
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-8">
            <MyImage width={588} height={280} className="flex-1 h-48 sm:h-56 lg:h-72 rounded-2xl sm:rounded-3xl shadow-lg w-full" src="https://placehold.co/588x280" alt="Operators" />
            <MyImage width={588} height={280} className="flex-1 h-48 sm:h-56 lg:h-72 rounded-2xl sm:rounded-3xl shadow-lg w-full" src="https://placehold.co/588x280" alt="Travelers" />
          </div>
          <div className="flex flex-col lg:flex-row gap-6 sm:gap-8">
            <UserCard
              title="For Travel Operators"
              description="Whether you're a solo guide running weekend treks or a company managing 50+ trips a month, Wondrr gives you the tools to operate professionally."
              features={[
                "Create and manage trips with detailed itineraries",
                "Handle multiple batches and track participants effortlessly",
                "Automate payment tracking and reminders",
                "Build credibility through reviews and transparent policies",
                "Scale operations without adding administrative overhead"
              ]}
              bg="bg-gradient-to-b from-primary to-zinc-800"
              textColor="text-white"
              icon={<Users/>}
            />
            <UserCard
              title="For Travelers"
              description="Stop worrying about trust, clarity, and hidden surprises. Book group trips with confidence and transparency."
              features={[
                "See complete trip details, itineraries, and pricing upfront",
                "Verify operator credibility through reviews and profiles",
                "Track your bookings, payments, and trip status in one place",
                "Know exactly what's included, what's not, and refund policies",
                "Receive clear communication without WhatsApp chaos"
              ]}
              bg="bg-gradient-to-b from-neutral-50 to-gray-200"
              textColor="text-primary"
              icon={<MapPin/>}
            />
          </div>
        </div>
      </section>

      <section className="flex flex-col px-4 sm:px-8 lg:px-32 pt-12 sm:pt-16 lg:pt-24 pb-12 sm:pb-16 lg:pb-20 bg-gradient-to-b from-neutral-50 to-white border-b-2 border-gray-200">
        <div className="flex flex-col gap-8 sm:gap-12 lg:gap-16">
          <div className="text-center">
            <div className="text-primary text-3xl sm:text-4xl lg:text-5xl font-bold font-['Satoshi'] leading-tight lg:leading-[52.80px]">Core Principles</div>
            <div className="text-neutral-700 text-base sm:text-lg lg:text-xl font-medium font-['Satoshi'] leading-6 sm:leading-7 lg:leading-8 mt-2 sm:mt-4">What guides everything we build</div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
            <PrincipleCard
              icon={<Shell/>}
              title="Clarity Over Complexity"
              description="We don't add features for the sake of it. Every tool serves a clear purpose: reduce confusion, increase trust, and make coordination effortless."
            />
            <PrincipleCard
              icon={<Shield/>}
              title="Trust as Infrastructure"
              description="Trust isn't built through promises. It's built through systems—transparent pricing, clear policies, verified reviews, and accountability at every step."
            />
            <PrincipleCard
              icon={<FileText/>}
              title="Structure Enables Scale"
              description="Chaos doesn't scale. Whether you're managing 5 travelers or 500, structured systems ensure quality remains consistent and operations stay manageable."
            />
            <PrincipleCard
              icon={<Zap/>}
              title="Empower, Don't Replace"
              description="We're not trying to replace travel operators. We're giving them the infrastructure to do what they do best—create great experiences—without the operational headaches."
            />
          </div>
        </div>
      </section>

      <section className="flex flex-col px-4 sm:px-8 lg:px-16 xl:px-32 2xl:px-64 pt-12 sm:pt-16 lg:pt-24 pb-12 sm:pb-16 lg:pb-20 bg-gradient-to-b bg-primary">
        <div className="flex flex-col gap-6 sm:gap-8">
          <div className="flex items-center justify-center gap-4">
            <div className="h-8 sm:h-10 bg-white/10 rounded-full flex items-center px-3 sm:px-4 gap-2">
                <TrendingUp className="text-white w-4 h-4 sm:w-5 sm:h-5"/>
              <div className="text-white text-xs sm:text-sm font-bold font-['Satoshi']">Long-Term Vision</div>
            </div>
          </div>
          <div className="text-center text-white text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold font-['Satoshi'] leading-tight lg:leading-[61.60px]">
            Building Reliability Into<br className="hidden sm:block" />Group Travel
          </div>
          <div className="text-center text-white/80 text-base sm:text-lg lg:text-xl font-medium font-['Satoshi'] leading-6 sm:leading-7 lg:leading-8">
            India&apos;s group travel market is massive, but it runs on unorganized systems. Wondrr is here to change that—not by controlling the market, but by giving operators and travelers the tools they need to work better together.
          </div>
          <div className="bg-white/5 rounded-2xl sm:rounded-3xl outline-2 outline-offset-[-1.84px] outline-white/10 p-6 sm:p-8 lg:p-10 text-center">
            <div className="text-white text-lg sm:text-xl lg:text-2xl font-bold font-['Satoshi'] leading-7 sm:leading-8 lg:leading-9">
              We&apos;re building a platform that lasts.<br />One that scales. One that you can rely on.<br />
              <span className="text-white/60">Every trip. Every time.</span>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button className="bg-white! text-primary! w-full sm:w-auto">Explore Tours</Button>
            <Button className="bg-white/10! text-white! border-2! border-white/20! w-full sm:w-auto">Contact Us</Button>
          </div>
        </div>
      </section>

      <footer className="flex flex-col sm:flex-row justify-between items-center px-4 sm:px-6 lg:px-9 py-8 sm:py-12 bg-white border-t-2 border-gray-200 gap-4">
        <div className="text-primary text-xl sm:text-2xl font-black">Wondrr</div>
        <div className="text-neutral-700 text-xs sm:text-sm font-medium font-['Satoshi'] text-center sm:text-right">© 2025 Wondrr. Building trust in group travel.</div>
      </footer>
    </div>
  );
}