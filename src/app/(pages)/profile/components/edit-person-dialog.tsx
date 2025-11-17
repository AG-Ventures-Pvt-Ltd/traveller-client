import { useState, useEffect } from "react";
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
import { Users, Mail, Phone, MapPin } from "lucide-react";
import usePostData from "@/services/usePostData";
import { API_ENDPOINTS } from "@/common/constants/apiEndpoints";

interface Person {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  emergencyContactNumber: string;
  age: number;
  address: string;
  city: string;
  state: string;
}

interface EditPersonDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  person: Person | undefined;
  onUpdateSuccess: () => void;
}

export default function EditPersonDialog({
  open,
  onOpenChange,
  person,
  onUpdateSuccess,
}: EditPersonDialogProps) {
  const [formData, setFormData] = useState({
    _id: "",
    fullName: "",
    email: "",
    phone: "",
    emergencyContactNumber: "",
    age: 0,
    address: "",
    city: "",
    state: "",
  });

  const [updateUrl, setUpdateUrl] = useState('');

  const updateMutation = usePostData({
    url: updateUrl,
    onSuccess: () => {
      onUpdateSuccess();
      onOpenChange(false);
    }
  });

  useEffect(() => {
    if (person) {
      setFormData(person);
    }
  }, [person]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (person) {
      const changes: Record<string, unknown> = {};
      (Object.keys(formData) as (keyof Person)[]).forEach(key => {
        if (formData[key] !== person[key]) {
          changes[key as string] = formData[key];
        }
      });
      // Remove _id from changes if present
      delete changes._id;
      if (Object.keys(changes).length > 0) {
        setUpdateUrl(API_ENDPOINTS.GUEST_USERS.UPDATE(person._id));
        updateMutation.mutate(changes as unknown as Record<string, unknown>);
      } else {
        onOpenChange(false);
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] border-0 shadow-2xl">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-[#008EF4]/10 rounded-xl">
              <Users className="w-6 h-6 text-[#008EF4]" />
            </div>
            <div>
              <DialogTitle>Edit Person Profile</DialogTitle>
              <DialogDescription className="mt-1">
                Update the person&apos;s information
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-5 py-4">
            <div className="space-y-2">
              <Label htmlFor="person-name" className="flex items-center gap-2 text-gray-700">
                <Users className="w-4 h-4 text-[#008EF4]" />
                Full Name
              </Label>
              <Input
                id="person-name"
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
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
              <Label htmlFor="emergency-contact" className="flex items-center gap-2 text-gray-700">
                <Phone className="w-4 h-4 text-[#008EF4]" />
                Emergency Contact Number
              </Label>
              <Input
                id="emergency-contact"
                type="tel"
                value={formData.emergencyContactNumber}
                onChange={(e) =>
                  setFormData({ ...formData, emergencyContactNumber: e.target.value })
                }
                placeholder="Enter emergency contact number"
                className="border-gray-200 focus:border-[#008EF4] focus:ring-[#008EF4]/20"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="person-age" className="flex items-center gap-2 text-gray-700">
                <Users className="w-4 h-4 text-[#008EF4]" />
                Age
              </Label>
              <Input
                id="person-age"
                type="number"
                value={formData.age}
                onChange={(e) =>
                  setFormData({ ...formData, age: parseInt(e.target.value) || 0 })
                }
                placeholder="Enter age"
                className="border-gray-200 focus:border-[#008EF4] focus:ring-[#008EF4]/20"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="person-address" className="flex items-center gap-2 text-gray-700">
                <MapPin className="w-4 h-4 text-[#008EF4]" />
                Address
              </Label>
              <Input
                id="person-address"
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
                placeholder="Enter address"
                className="border-gray-200 focus:border-[#008EF4] focus:ring-[#008EF4]/20"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="person-city" className="flex items-center gap-2 text-gray-700">
                <MapPin className="w-4 h-4 text-[#008EF4]" />
                City
              </Label>
              <Input
                id="person-city"
                value={formData.city}
                onChange={(e) =>
                  setFormData({ ...formData, city: e.target.value })
                }
                placeholder="Enter city"
                className="border-gray-200 focus:border-[#008EF4] focus:ring-[#008EF4]/20"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="person-state" className="flex items-center gap-2 text-gray-700">
                <MapPin className="w-4 h-4 text-[#008EF4]" />
                State
              </Label>
              <Input
                id="person-state"
                value={formData.state}
                onChange={(e) =>
                  setFormData({ ...formData, state: e.target.value })
                }
                placeholder="Enter state"
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
              Update Person
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}