"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/common/ui/dialog";
import { Button } from "@/common/ui/button";
import { Label } from "@/common/ui/label";
import { Textarea } from "@/common/ui/textarea";
import { Select, MenuItem, FormControl } from "@mui/material";
import { Plus, Send } from "lucide-react";
import usePostData from "@/services/usePostData";
import { API_ENDPOINTS } from "@/common/constants/apiEndpoints";

interface CreateTicketDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

const categories = [
  "Booking Issues",
  "Refunds & Cancellations",
  "Login & Account Issues",
  "Payment Problems",
  "Report Trip/Content",
  "Problem Creating Trips/Stories",
  "Data Export/Download Issues",
  "Bug Report",
  "Feature Request",
  "UI/UX Feedback",
  "Offers & Coupons Help",
  "Other"
];

export function CreateTicketDialog({ open, onOpenChange, onSuccess }: CreateTicketDialogProps) {
  const [formData, setFormData] = useState({
    category: "",
    description: "",
  });

  const createTicketMutation = usePostData({
    url: API_ENDPOINTS.SUPPORT.CREATE_TICKET,
    onSuccess: () => {
      onOpenChange(false);
      setFormData({
        category: "",
        description: "",
      });
      onSuccess?.();
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createTicketMutation.mutate({ type: formData.category, description: formData.description });
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-[#008EF4]/10 rounded-xl">
              <Plus className="w-6 h-6 text-[#008EF4]" />
            </div>
            <div>
              <DialogTitle className="text-2xl">Create Support Ticket</DialogTitle>
              <DialogDescription>
                Tell us about your issue and we&apos;ll get back to you as soon as possible
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          {/* Category */}
          <div className="space-y-2">
            <Label htmlFor="category" className="text-sm font-medium">
              Category <span className="text-red-500">*</span>
            </Label>
            <FormControl fullWidth required>
              <Select
                id="category"
                value={formData.category}
                onChange={(e) => handleChange("category", e.target.value)}
                displayEmpty
                sx={{
                  height: '40px',
                  borderRadius: '6px',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#d1d5db',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#008EF4',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#008EF4',
                    borderWidth: '1px',
                  },
                }}
              >
                <MenuItem value="" disabled>
                  Select category
                </MenuItem>
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium">
              Description <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="description"
              placeholder="Please provide as much detail as possible about your issue..."
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              required
              rows={8}
              className="border-gray-300 focus:border-[#008EF4] focus:ring-[#008EF4] resize-none"
            />
            <p className="text-xs text-gray-500">
              Include any relevant booking IDs, transaction numbers, or error messages
            </p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-900">
              <strong>Response Time:</strong> Our support team typically responds within 24 hours.
              For urgent issues, please contact us via phone.
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1 border-gray-300"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-[#008EF4] hover:bg-[#0077CC] gap-2"
              disabled={!formData.category || !formData.description || createTicketMutation.isPending}
            >
              <Send className="w-4 h-4" />
              Submit Ticket
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
