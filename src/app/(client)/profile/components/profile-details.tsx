import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/common/ui/card";
import { Button } from "@/common/ui/button";
import { Mail, Phone, Lock, Edit, Shield } from "lucide-react";
import { Separator } from "@/common/ui/separator";

interface ProfileDetailsProps {
  user: {
    name: string;
    email: string;
    phone: string;
  };
  onEdit: () => void;
}

export function ProfileDetails({ user, onEdit }: ProfileDetailsProps) {
  return (
    <div className="grid gap-6">
      <Card className="shadow-lg border-0 hover:shadow-xl transition-shadow">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <div className="p-2 bg-[#008EF4]/10 rounded-lg">
                  <Mail className="w-5 h-5 text-[#008EF4]" />
                </div>
                Personal Information
              </CardTitle>
              <CardDescription className="mt-2">Your basic account details</CardDescription>
            </div>
            <Button 
              variant="outline" 
              onClick={onEdit} 
              className="gap-2 border-gray-200 hover:border-[#008EF4] hover:text-[#008EF4] hover:bg-[#008EF4]/5"
            >
              <Edit className="w-4 h-4" />
              Edit
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-6">
            <div className="group">
              <label className="text-gray-500 mb-2 block">Full Name</label>
              <p className="text-gray-900 p-3 bg-gray-50 rounded-lg group-hover:bg-[#008EF4]/5 transition-colors">
                {user.name}
              </p>
            </div>
            <Separator />
            <div className="group">
              <label className="text-gray-500 mb-2 flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#008EF4]" />
                Email Address
              </label>
              <p className="text-gray-900 p-3 bg-gray-50 rounded-lg group-hover:bg-[#008EF4]/5 transition-colors">
                {user.email}
              </p>
            </div>
            <Separator />
            <div className="group">
              <label className="text-gray-500 mb-2 flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#008EF4]" />
                Phone Number
              </label>
              <p className="text-gray-900 p-3 bg-gray-50 rounded-lg group-hover:bg-[#008EF4]/5 transition-colors">
                {user.phone}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-lg border-0 hover:shadow-xl transition-shadow overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#008EF4]/10 to-transparent rounded-bl-full" />
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="p-2 bg-[#008EF4]/10 rounded-lg">
              <Shield className="w-5 h-5 text-[#008EF4]" />
            </div>
            Security
          </CardTitle>
          <CardDescription className="mt-2">Manage your password and security settings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-transparent rounded-xl">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white rounded-xl shadow-sm">
                <Lock className="w-6 h-6 text-[#008EF4]" />
              </div>
              <div>
                <p className="text-gray-900">Password</p>
                <p className="text-gray-500">Last changed 3 months ago</p>
              </div>
            </div>
            <Button 
              variant="outline"
              className="border-[#008EF4] text-[#008EF4] hover:bg-[#008EF4] hover:text-white"
            >
              Reset Password
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
