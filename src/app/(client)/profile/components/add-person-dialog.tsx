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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/common/ui/select";
import { Users, Mail, Phone, Heart } from "lucide-react";

interface AddPersonDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (person: {
    name: string;
    email: string;
    phone: string;
    relationship: string;
  }) => void;
}

export function AddPersonDialog({
  open,
  onOpenChange,
  onSubmit,
}: AddPersonDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    relationship: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ name: "", email: "", phone: "", relationship: "" });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px] border-0 shadow-2xl">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-[#008EF4]/10 rounded-xl">
              <Users className="w-6 h-6 text-[#008EF4]" />
            </div>
            <div>
              <DialogTitle>Add Person Profile</DialogTitle>
              <DialogDescription className="mt-1">
                Add a family member or friend to book trips on their behalf
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-5 py-4">
            <div className="space-y-2">
              <Label htmlFor="person-name" className="flex items-center gap-2 text-gray-700">
                <Users className="w-4 h-4 text-[#008EF4]" />
                Full Name
              </Label>
              <Input
                id="person-name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Enter full name"
                className="border-gray-200 focus:border-[#008EF4] focus:ring-[#008EF4]/20"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="person-email" className="flex items-center gap-2 text-gray-700">
                <Mail className="w-4 h-4 text-[#008EF4]" />
                Email Address
              </Label>
              <Input
                id="person-email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="Enter email address"
                className="border-gray-200 focus:border-[#008EF4] focus:ring-[#008EF4]/20"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="person-phone" className="flex items-center gap-2 text-gray-700">
                <Phone className="w-4 h-4 text-[#008EF4]" />
                Phone Number
              </Label>
              <Input
                id="person-phone"
                type="tel"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                placeholder="Enter phone number"
                className="border-gray-200 focus:border-[#008EF4] focus:ring-[#008EF4]/20"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="relationship" className="flex items-center gap-2 text-gray-700">
                <Heart className="w-4 h-4 text-[#008EF4]" />
                Relationship
              </Label>
              <Select
                value={formData.relationship}
                onValueChange={(value) =>
                  setFormData({ ...formData, relationship: value })
                }
                required
              >
                <SelectTrigger 
                  id="relationship"
                  className="border-gray-200 focus:border-[#008EF4] focus:ring-[#008EF4]/20"
                >
                  <SelectValue placeholder="Select relationship" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Spouse">Spouse</SelectItem>
                  <SelectItem value="Partner">Partner</SelectItem>
                  <SelectItem value="Parent">Parent</SelectItem>
                  <SelectItem value="Child">Child</SelectItem>
                  <SelectItem value="Son">Son</SelectItem>
                  <SelectItem value="Daughter">Daughter</SelectItem>
                  <SelectItem value="Sibling">Sibling</SelectItem>
                  <SelectItem value="Friend">Friend</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
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
              Add Person
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
