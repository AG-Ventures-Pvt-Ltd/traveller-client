import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react";
import { Divider, Typography, IconButton, Box } from "@mui/material";

export function Footer() {
  return (
    <Box component="footer" sx={{ bgcolor: 'grey.50', borderTop: 1, borderColor: 'divider', mt: 8 }}>
      <Box sx={{ maxWidth: 'lg', mx: 'auto', px: 4, py: 6 }}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Typography variant="h6">TravelExplore</Typography>
            <Typography variant="body2" color="text.secondary">
              Discover amazing destinations and create unforgettable memories with our curated travel experiences.
            </Typography>
            <div className="flex gap-3">
              <IconButton 
                size="small" 
                sx={{ bgcolor: 'background.paper', '&:hover': { bgcolor: 'grey.100' } }}
              >
                <Facebook className="h-5 w-5 text-gray-600" />
              </IconButton>
              <IconButton 
                size="small" 
                sx={{ bgcolor: 'background.paper', '&:hover': { bgcolor: 'grey.100' } }}
              >
                <Twitter className="h-5 w-5 text-gray-600" />
              </IconButton>
              <IconButton 
                size="small" 
                sx={{ bgcolor: 'background.paper', '&:hover': { bgcolor: 'grey.100' } }}
              >
                <Instagram className="h-5 w-5 text-gray-600" />
              </IconButton>
            </div>
          </div>

          <div className="space-y-4">
            <Typography variant="subtitle1">Quick Links</Typography>
            <ul className="space-y-2">
              <li>
                <Typography 
                  variant="body2" 
                  color="text.secondary" 
                  sx={{ cursor: 'pointer', '&:hover': { color: 'text.primary' } }}
                >
                  About Us
                </Typography>
              </li>
              <li>
                <Typography 
                  variant="body2" 
                  color="text.secondary" 
                  sx={{ cursor: 'pointer', '&:hover': { color: 'text.primary' } }}
                >
                  Destinations
                </Typography>
              </li>
              <li>
                <Typography 
                  variant="body2" 
                  color="text.secondary" 
                  sx={{ cursor: 'pointer', '&:hover': { color: 'text.primary' } }}
                >
                  Travel Blog
                </Typography>
              </li>
              <li>
                <Typography 
                  variant="body2" 
                  color="text.secondary" 
                  sx={{ cursor: 'pointer', '&:hover': { color: 'text.primary' } }}
                >
                  Become a Host
                </Typography>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <Typography variant="subtitle1">Support</Typography>
            <ul className="space-y-2">
              <li>
                <Typography 
                  variant="body2" 
                  color="text.secondary" 
                  sx={{ cursor: 'pointer', '&:hover': { color: 'text.primary' } }}
                >
                  Help Center
                </Typography>
              </li>
              <li>
                <Typography 
                  variant="body2" 
                  color="text.secondary" 
                  sx={{ cursor: 'pointer', '&:hover': { color: 'text.primary' } }}
                >
                  Safety
                </Typography>
              </li>
              <li>
                <Typography 
                  variant="body2" 
                  color="text.secondary" 
                  sx={{ cursor: 'pointer', '&:hover': { color: 'text.primary' } }}
                >
                  Cancellation Policy
                </Typography>
              </li>
              <li>
                <Typography 
                  variant="body2" 
                  color="text.secondary" 
                  sx={{ cursor: 'pointer', '&:hover': { color: 'text.primary' } }}
                >
                  Contact Us
                </Typography>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <Typography variant="subtitle1">Contact</Typography>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <Typography variant="body2" color="text.secondary">
                  support@travelexplore.com
                </Typography>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <Typography variant="body2" color="text.secondary">
                  +1 (555) 123-4567
                </Typography>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-1" />
                <Typography variant="body2" color="text.secondary">
                  123 Travel Street, Adventure City, AC 12345
                </Typography>
              </li>
            </ul>
          </div>
        </div>

        <Divider sx={{ my: 4 }} />

        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'space-between', 
          alignItems: 'center',
          gap: 2
        }}>
          <Typography variant="body2" color="text.secondary">
            © 2025 TravelExplore. All rights reserved.
          </Typography>
          <div className="flex gap-6">
            <Typography 
              variant="body2" 
              color="text.secondary" 
              sx={{ cursor: 'pointer', '&:hover': { color: 'text.primary' } }}
            >
              Privacy Policy
            </Typography>
            <Typography 
              variant="body2" 
              color="text.secondary" 
              sx={{ cursor: 'pointer', '&:hover': { color: 'text.primary' } }}
            >
              Terms of Service
            </Typography>
            <Typography 
              variant="body2" 
              color="text.secondary" 
              sx={{ cursor: 'pointer', '&:hover': { color: 'text.primary' } }}
            >
              Cookie Policy
            </Typography>
          </div>
        </Box>
      </Box>
    </Box>
  );
}
