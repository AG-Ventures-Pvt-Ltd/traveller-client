import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/common/ui/card";
import { Button } from "@/common/ui/button";
import { Avatar, AvatarFallback } from "@/common/ui/avatar";
import { Plus, Mail, Phone, Edit, Trash2, Users as UsersIcon, MapPin, Calendar, AlertTriangle } from "lucide-react";
import { AddPersonDialog } from "./add-person-dialog";
import EditPersonDialog from "./edit-person-dialog";
import usePostData from "@/services/usePostData";
import { useGetData } from "@/services/useGetData";
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

export function PeopleProfilesTab() {
  const [people, setPeople] = useState<Person[]>([]);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingPerson, setEditingPerson] = useState<{ person: Person; index: number } | null>(null);
  const [deleteUrl, setDeleteUrl] = useState('');

  const { data: peopleData, refetch } = useGetData<Person[]>(API_ENDPOINTS.GUEST_USERS.GET);

  useEffect(() => {
    if (peopleData) {
      setPeople(peopleData);
    }
  }, [peopleData]);

  const addPersonMutation = usePostData({
    url: API_ENDPOINTS.GUEST_USERS.CREATE,
    onSuccess: (data) => {
      setPeople([...people, data as Person]);
    }
  });

  const deleteMutation = usePostData({
    url: deleteUrl,
    onSuccess: () => {
      refetch();
    }
  });

  const handleAddPerson = (person: Omit<Person, '_id'>) => {
    addPersonMutation.mutate(person as unknown as Record<string, unknown>);
    setIsAddDialogOpen(false);
  };

  const handleRemovePerson = (id: string) => {
    setDeleteUrl(API_ENDPOINTS.GUEST_USERS.DELETE(id));
    deleteMutation.mutate({} as Record<string, unknown>);
  };

  return (
    <>
      <Card className="shadow-lg border-0">
        <CardHeader className="border-b bg-gradient-to-r from-gray-50 to-white">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-[#008EF4]/10 rounded-xl">
                <UsersIcon className="w-6 h-6 text-[#008EF4]" />
              </div>
              <div>
                <CardTitle>People Profiles</CardTitle>
                <CardDescription className="mt-1">
                  Add family members or friends to make bookings on their behalf
                </CardDescription>
              </div>
            </div>
            <Button
              onClick={() => setIsAddDialogOpen(true)}
              className="gap-2 bg-[#008EF4] hover:bg-[#0077CC] shadow-lg shadow-[#008EF4]/25"
            >
              <Plus className="w-4 h-4" />
              Add Person
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            {people.map((person, index) => (
              <div
                key={person._id}
                className="group relative overflow-hidden rounded-2xl border border-gray-200 hover:border-[#008EF4]/50 transition-all hover:shadow-xl bg-white"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-5">
                  <div className="flex items-center gap-4 flex-1">
                    <Avatar className="w-16 h-16 border-2 border-[#008EF4]/20 group-hover:border-[#008EF4]/50 transition-colors">
                      <AvatarFallback className="bg-gradient-to-br from-[#008EF4] to-[#00C6FF] text-white">
                        {person.fullName
                          ?.split(" ")
                          .map((n: string) => n[0])
                          .join("") || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <h3 className="text-gray-900 group-hover:text-[#008EF4] transition-colors">
                          {person.fullName}
                        </h3>
                      </div>
                      <div className="text-gray-600 space-y-2">
                        <div className="flex flex-wrap gap-4">
                          <span className="flex items-center gap-2">
                            <Mail className="w-4 h-4 text-[#008EF4]" />
                            {person.email}
                          </span>
                          <span className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-[#008EF4]" />
                            {person.phone}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-4">
                          <span className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-[#008EF4]" />
                            Age: {person.age}
                          </span>
                          <span className="flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4 text-[#008EF4]" />
                            Emergency: {person.emergencyContactNumber}
                          </span>
                          <span className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-[#008EF4]" />
                            {person.address}, {person.city}, {person.state}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditingPerson({ person, index })}
                      className="gap-2 flex-1 sm:flex-none border-gray-200 hover:border-[#008EF4] hover:text-[#008EF4] hover:bg-[#008EF4]/5"
                    >
                      <Edit className="w-4 h-4" />
                      Edit
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemovePerson(person._id)}
                      className="hover:bg-red-50 hover:text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <AddPersonDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onSubmit={handleAddPerson}
      />

      <EditPersonDialog
        open={!!editingPerson}
        onOpenChange={(open: boolean) => !open && setEditingPerson(null)}
        person={editingPerson?.person}
        onUpdateSuccess={refetch}
      />
    </>
  );
}
