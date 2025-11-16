import { CardContent, CardHeader, CardTitle } from "@/common/ui/card";
import { Mail, Phone, Camera, Edit, Calendar, FileText, MapPin, Home } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/common/ui/avatar";
import { useGetData } from "@/services/useGetData";
import usePostData from "@/services/usePostData";
import { useState } from "react";
import { Input } from "@/common/ui/input";
import { Textarea } from "@/common/ui/textarea";
import { useQueryClient } from "@tanstack/react-query";
import { validatePhone } from "../../auth/utils/validations";
import { notify } from "@/common/utils/notify";
import Loader from "@/common/ui/Loader/Loader";

export interface ProfileDetailsProps {
  user?: {
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
  };
}


export function ProfileDetails({ user }: ProfileDetailsProps) {

  const { data: fetchedUser, isLoading } = useGetData<NonNullable<ProfileDetailsProps['user']>>(`api/client/v1/user/me`);

  const displayUser = fetchedUser || user;

  const updateUser = usePostData({ url: 'api/client/v1/user/me/update' });
  const queryClient = useQueryClient();

  const [editingField, setEditingField] = useState<keyof NonNullable<ProfileDetailsProps['user']> | null>(null);
  const [editedUser, setEditedUser] = useState<NonNullable<ProfileDetailsProps['user']> | null>(null);

  const handleAvatarChange = () => {
  };

  const parseAddress = (combinedAddress: string) => {
    const parts = combinedAddress.split(',');
    if (parts.length >= 3) {
      const state = parts.pop()!.trim();
      const city = parts.pop()!.trim();
      const address = parts.join(',').trim();
      return { address, city, state };
    } else {
      return { address: combinedAddress, city: '', state: '' };
    }
  };

  const parsedAddress = parseAddress(displayUser!.address || '');

  const startEditing = (field: keyof NonNullable<ProfileDetailsProps['user']>) => {
    setEditingField(field);
    setEditedUser({ ...displayUser!, ...parsedAddress } as NonNullable<ProfileDetailsProps['user']>);
  };

  const handleSave = () => {
    if (editedUser && editingField) {
      let key: string = editingField;
      let value = editedUser[editingField];

      if (editingField === 'phone') {
        key = 'mobileNumber';
        const validationError = validatePhone(value as string);
        if (validationError) {
          notify.error(validationError);
          return;
        }
        value = (value as string).replace(/^\+91/, '');
      } else if (['address', 'city', 'state'].includes(editingField)) {
        key = 'address';
        value = `${editedUser.address || ''},${editedUser.city || ''},${editedUser.state || ''}`;
      }

      const originalValue = key === 'address' ? `${displayUser!.address || ''},${displayUser!.city || ''},${displayUser!.state || ''}` : displayUser![editingField];

      if (value !== originalValue) {
        const data = { key, value };
        updateUser.mutate(data, {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['api/client/v1/user/me'] });
            setEditingField(null);
            setEditedUser(null);
          },
        });
      } else {
        setEditingField(null);
        setEditedUser(null);
      }
    }
  };  const updateField = (field: keyof NonNullable<ProfileDetailsProps['user']>, value: string) => {
    if (editedUser) {
      setEditedUser({ ...editedUser, [field]: value });
    }
  };


  if (isLoading) {
    return <Loader/>;
  }

  if (!displayUser) {
    return <div>Loading...</div>;
  }

  const fields = [
    { key: 'email' as const, label: 'Email Address', icon: Mail, editable: false, type: 'text' as const },
    { key: 'phone' as const, label: 'Phone Number', icon: Phone, editable: true, type: 'text' as const },
    { key: 'birthDate' as const, label: 'Birth Date', icon: Calendar, editable: true, type: 'date' as const },
    { key: 'address' as const, label: 'Address (Flat, House)', icon: Home, editable: true, type: 'text' as const },
    { key: 'city' as const, label: 'City', icon: MapPin, editable: true, type: 'text' as const },
    { key: 'state' as const, label: 'State', icon: MapPin, editable: true, type: 'text' as const },
  ];

  return (
    <div className="grid ">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <div className="p-2 bg-[#008EF4]/10 rounded-lg">
                <Mail className="w-5 h-5 text-[#008EF4]" />
              </div>
              Personal Information
            </CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col items-center space-y-2">
          <div className="relative">
            <Avatar className="w-32 h-32 border-4 border-white shadow-lg">
              <AvatarImage src={displayUser?.avatar || ""} alt={displayUser.fullName} />
              <AvatarFallback className="text-3xl bg-gradient-to-br from-[#008EF4] to-[#00C6FF] text-white">
                {displayUser.fullName.split(' ').map(n => n[0]).join('').toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <button
              onClick={handleAvatarChange}
              className="absolute bottom-0 right-0 p-3 bg-[#008EF4] rounded-full text-white hover:bg-[#0077CC] transition-all shadow-lg hover:scale-110"
            >
              <Camera className="w-5 h-5" />
            </button>
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900">{displayUser.fullName}</h2>
            <p className="text-gray-600">@{displayUser.username}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {fields.map((field) => {
            const Icon = field.icon;
            const isEditing = editingField === field.key;
            const value = field.key === 'address' ? parsedAddress.address : field.key === 'city' ? parsedAddress.city : field.key === 'state' ? parsedAddress.state : displayUser![field.key];
            const editedValue = editedUser?.[field.key] || '';

            return (
              <div key={field.key} className="group">
                <label className="text-gray-500 mb-2 flex items-center gap-2">
                  <Icon className="w-4 h-4 text-[#008EF4]" />
                  {field.label}
                  {field.editable && !isEditing && (
                    <Edit className="w-4 h-4 cursor-pointer hover:text-[#008EF4]" onClick={() => startEditing(field.key)} />
                  )}
                </label>
                {isEditing ? (
                  <Input
                    type={field.type}
                    value={editedValue}
                    onChange={(e) => updateField(field.key, e.target.value)}
                    onBlur={handleSave}
                    className="p-3 bg-gray-50 rounded-lg"
                  />
                ) : (
                  <p className="text-gray-900 p-3 bg-gray-50 rounded-lg group-hover:bg-[#008EF4]/5 transition-colors">
                    {value || 'Not provided'}
                  </p>
                )}
              </div>
            );
          })}
          <div className="group md:col-span-2">
            <label className="text-gray-500 mb-2 flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#008EF4]" />
              Bio
              {editingField !== 'bio' && <Edit className="w-4 h-4 cursor-pointer hover:text-[#008EF4]" onClick={() => startEditing('bio')} />}
            </label>
            {editingField === 'bio' ? (
              <Textarea
                value={editedUser?.bio || ''}
                onChange={(e) => updateField('bio', e.target.value)}
                onBlur={handleSave}
                className="p-3 bg-gray-50 rounded-lg"
                rows={3}
              />
            ) : (
              <p className="text-gray-900 p-3 bg-gray-50 rounded-lg group-hover:bg-[#008EF4]/5 transition-colors">
                {displayUser.bio || 'No bio added yet'}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </div>
  );
}
