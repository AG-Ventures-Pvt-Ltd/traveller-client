import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/common/ui/card";
import { Button } from "@/common/ui/button";
import { Avatar, AvatarFallback } from "@/common/ui/avatar";
import { Plus, Mail, Phone, Edit, Trash2, Users as UsersIcon } from "lucide-react";
import { AddPersonDialog } from "./add-person-dialog";
// import { toast } from "sonner";

interface Person {
  id: string;
  name: string;
  email: string;
  phone: string;
  relationship: string;
}

export function PeopleProfilesTab() {
  const [people, setPeople] = useState<Person[]>([
    {
      id: "1",
      name: "Michael Anderson",
      email: "michael.anderson@example.com",
      phone: "+1 (555) 234-5678",
      relationship: "Spouse",
    },
    {
      id: "2",
      name: "Emma Anderson",
      email: "emma.anderson@example.com",
      phone: "+1 (555) 345-6789",
      relationship: "Daughter",
    },
  ]);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const handleAddPerson = (person: Omit<Person, "id">) => {
    const newPerson = {
      ...person,
      id: Date.now().toString(),
    };
    setPeople([...people, newPerson]);
    // toast.success("Person added successfully");
  };

  const handleRemovePerson = (id: string) => {
    setPeople(people.filter(p => p.id !== id));
    // toast.success("Person removed");
  };

  const getRelationshipColor = (relationship: string) => {
    switch (relationship.toLowerCase()) {
      case "spouse":
      case "partner":
        return "bg-pink-100 text-pink-700 border-pink-200";
      case "child":
      case "son":
      case "daughter":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "parent":
        return "bg-purple-100 text-purple-700 border-purple-200";
      case "friend":
        return "bg-green-100 text-green-700 border-green-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
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
            {people.map((person) => (
              <div
                key={person.id}
                className="group relative overflow-hidden rounded-2xl border border-gray-200 hover:border-[#008EF4]/50 transition-all hover:shadow-xl bg-white"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-5">
                  <div className="flex items-center gap-4 flex-1">
                    <Avatar className="w-16 h-16 border-2 border-[#008EF4]/20 group-hover:border-[#008EF4]/50 transition-colors">
                      <AvatarFallback className="bg-gradient-to-br from-[#008EF4] to-[#00C6FF] text-white">
                        {person.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <h3 className="text-gray-900 group-hover:text-[#008EF4] transition-colors">
                          {person.name}
                        </h3>
                        <span 
                          className={`px-3 py-1 rounded-full text-xs border ${getRelationshipColor(person.relationship)}`}
                        >
                          {person.relationship}
                        </span>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-gray-600">
                        <span className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-[#008EF4]" />
                          {person.email}
                        </span>
                        <span className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-[#008EF4]" />
                          {person.phone}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="gap-2 flex-1 sm:flex-none border-gray-200 hover:border-[#008EF4] hover:text-[#008EF4] hover:bg-[#008EF4]/5"
                    >
                      <Edit className="w-4 h-4" />
                      Edit
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemovePerson(person.id)}
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
    </>
  );
}
