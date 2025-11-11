import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/common/ui/card";
import { Badge } from "@/common/ui/badge";
import { Button } from "@/common/ui/button";
import { MessageSquare, Clock, Plus, Headphones } from "lucide-react";
// import { toast } from "sonner";

interface SupportTicket {
  id: string;
  subject: string;
  category: string;
  status: "open" | "pending" | "resolved";
  date: string;
  lastUpdate: string;
}

export function SupportTicketsTab() {
  const tickets: SupportTicket[] = [
    {
      id: "TKT-1247",
      subject: "Issue with booking payment",
      category: "Payment",
      status: "resolved",
      date: "Nov 5, 2024",
      lastUpdate: "Nov 6, 2024",
    },
    {
      id: "TKT-1189",
      subject: "Cancellation request for Tokyo trip",
      category: "Booking",
      status: "pending",
      date: "Nov 1, 2024",
      lastUpdate: "Nov 8, 2024",
    },
    {
      id: "TKT-1056",
      subject: "Question about refund policy",
      category: "General",
      status: "resolved",
      date: "Oct 15, 2024",
      lastUpdate: "Oct 16, 2024",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-[#008EF4]/10 text-[#008EF4] border-[#008EF4]/20";
      case "pending":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "resolved":
        return "bg-green-100 text-green-700 border-green-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case "payment":
        return "bg-purple-100 text-purple-700 border-purple-200";
      case "booking":
        return "bg-blue-100 text-blue-700 border-blue-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const handleCreateTicket = () => {
    // toast.info("Create ticket coming soon");
  };

  return (
    <Card className="shadow-lg border-0">
      <CardHeader className="border-b bg-gradient-to-r from-gray-50 to-white">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-[#008EF4]/10 rounded-xl">
              <Headphones className="w-6 h-6 text-[#008EF4]" />
            </div>
            <div>
              <CardTitle>Support Tickets</CardTitle>
              <CardDescription className="mt-1">View and track your support requests</CardDescription>
            </div>
          </div>
          <Button 
            onClick={handleCreateTicket} 
            className="gap-2 bg-[#008EF4] hover:bg-[#0077CC] shadow-lg shadow-[#008EF4]/25"
          >
            <Plus className="w-4 h-4" />
            New Ticket
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          {tickets.map((ticket) => (
            <div
              key={ticket.id}
              className="group relative overflow-hidden rounded-2xl border border-gray-200 hover:border-[#008EF4]/50 transition-all hover:shadow-xl bg-white"
            >
              <div className="flex flex-col sm:flex-row items-start gap-4 p-5">
                <div className="flex items-start gap-4 flex-1">
                  <div className="p-3 bg-gradient-to-br from-[#008EF4]/10 to-[#008EF4]/5 rounded-xl group-hover:from-[#008EF4]/20 group-hover:to-[#008EF4]/10 transition-colors">
                    <MessageSquare className="w-6 h-6 text-[#008EF4]" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <h3 className="text-gray-900 group-hover:text-[#008EF4] transition-colors">
                        {ticket.subject}
                      </h3>
                      <Badge className={getStatusColor(ticket.status)} variant="outline">
                        {ticket.status}
                      </Badge>
                      <Badge className={getCategoryColor(ticket.category)} variant="outline">
                        {ticket.category}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-gray-600">
                      <span className="text-gray-500">#{ticket.id}</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4 text-[#008EF4]" />
                        Created {ticket.date}
                      </span>
                    </div>
                    <p className="text-gray-500 mt-2 bg-gray-50 px-3 py-2 rounded-lg inline-block">
                      Last updated: {ticket.lastUpdate}
                    </p>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-gray-200 hover:border-[#008EF4] hover:text-[#008EF4] hover:bg-[#008EF4]/5"
                >
                  View Details
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
