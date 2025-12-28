import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/common/ui/dialog";
import { Button } from "@/common/ui/button";
import { Input } from "@/common/ui/input";
import { Label } from "@/common/ui/label";
import { User, Mail, Phone } from "lucide-react";

interface UserData {
  fullName: string;
  email: string;
  phone: string;
  username: string;
  birthDate?: string;
  bio?: string;
  city?: string;
  state?: string;
  address?: string;
  avatar?: string;
}

interface EditProfileDialogProps {
  user?: UserData;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (data: { fullName: string; email: string; phone: string }) => void;
}

export function EditProfileDialog({
  user,
  open,
  onOpenChange,
  onSave,
}: EditProfileDialogProps) {
  const [formData, setFormData] = useState({
    fullName: user?.fullName || '',
    email: user?.email || '',
    phone: user?.phone || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] border-0 shadow-2xl">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-[#008EF4]/10 rounded-xl">
              <User className="w-6 h-6 text-[#008EF4]" />
            </div>
            <div>
              <DialogTitle>Edit Profile</DialogTitle>
              <DialogDescription className="mt-1">
                Update your personal information
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-5 py-4">
            <div className="space-y-2">
              <Label htmlFor="fullName" className="flex items-center gap-2 text-gray-700">
                <User className="w-4 h-4 text-[#008EF4]" />
                Full Name
              </Label>
              <Input
                id="fullName"
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
                className="border-gray-200 focus:border-[#008EF4] focus:ring-[#008EF4]/20"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2 text-gray-700">
                <Mail className="w-4 h-4 text-[#008EF4]" />
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="border-gray-200 focus:border-[#008EF4] focus:ring-[#008EF4]/20"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center gap-2 text-gray-700">
                <Phone className="w-4 h-4 text-[#008EF4]" />
                Phone Number
              </Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="border-gray-200 focus:border-[#008EF4] focus:ring-[#008EF4]/20"
                required
              />
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="border-gray-200"
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              className="bg-[#008EF4] hover:bg-[#0077CC] shadow-lg shadow-[#008EF4]/25"
            >
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
