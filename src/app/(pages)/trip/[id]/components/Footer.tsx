import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react";
import { Separator } from "@/common/ui/separator";

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-8">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h6 className="text-lg font-semibold">TravelExplore</h6>
            <p className="text-sm text-gray-600">
              Discover amazing destinations and create unforgettable memories with our curated travel experiences.
            </p>
            <div className="flex gap-3">
              <button className="p-2 bg-white hover:bg-gray-100 rounded-full transition-colors">
                <Facebook className="h-5 w-5 text-gray-600" />
              </button>
              <button className="p-2 bg-white hover:bg-gray-100 rounded-full transition-colors">
                <Twitter className="h-5 w-5 text-gray-600" />
              </button>
              <button className="p-2 bg-white hover:bg-gray-100 rounded-full transition-colors">
                <Instagram className="h-5 w-5 text-gray-600" />
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <h6 className="text-base font-semibold">Quick Links</h6>
            <ul className="space-y-2">
              <li>
                <a className="text-sm text-gray-600 hover:text-gray-900 cursor-pointer transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a className="text-sm text-gray-600 hover:text-gray-900 cursor-pointer transition-colors">
                  Destinations
                </a>
              </li>
              <li>
                <a className="text-sm text-gray-600 hover:text-gray-900 cursor-pointer transition-colors">
                  Travel Blog
                </a>
              </li>
              <li>
                <a className="text-sm text-gray-600 hover:text-gray-900 cursor-pointer transition-colors">
                  Become a Host
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h6 className="text-base font-semibold">Support</h6>
            <ul className="space-y-2">
              <li>
                <a className="text-sm text-gray-600 hover:text-gray-900 cursor-pointer transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a className="text-sm text-gray-600 hover:text-gray-900 cursor-pointer transition-colors">
                  Safety
                </a>
              </li>
              <li>
                <a className="text-sm text-gray-600 hover:text-gray-900 cursor-pointer transition-colors">
                  Cancellation Policy
                </a>
              </li>
              <li>
                <a className="text-sm text-gray-600 hover:text-gray-900 cursor-pointer transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h6 className="text-base font-semibold">Contact</h6>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span className="text-sm text-gray-600">
                  support@travelexplore.com
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span className="text-sm text-gray-600">
                  +1 (555) 123-4567
                </span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-1" />
                <span className="text-sm text-gray-600">
                  123 Travel Street, Adventure City, AC 12345
                </span>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-4" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-2">
          <p className="text-sm text-gray-600">
            © 2025 TravelExplore. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a className="text-sm text-gray-600 hover:text-gray-900 cursor-pointer transition-colors">
              Privacy Policy
            </a>
            <a className="text-sm text-gray-600 hover:text-gray-900 cursor-pointer transition-colors">
              Terms of Service
            </a>
            <a className="text-sm text-gray-600 hover:text-gray-900 cursor-pointer transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
