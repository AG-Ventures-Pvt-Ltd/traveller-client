"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/common/ui/card";
import { Badge } from "@/common/ui/badge";
import { Button } from "@/common/ui/button";
import { MessageSquare, Clock, Plus, Headphones } from "lucide-react";
import { TicketDetailsDialog } from "./SupportTickets/ticket-details-dialog";
import { CreateTicketDialog } from "./SupportTickets/create-ticket-dialog";
import { useGetData } from "@/services/useGetData";
import { API_ENDPOINTS } from "@/common/constants/apiEndpoints";
import Loader from "@/common/ui/Loader/Loader";
import { formatDateTime } from "@/common/utils/dateUtils";
// import { toast } from "sonner";

interface SupportTicket {
  _id: string;
  description: string;
  type: string;
  status: "open" | "inProgress" | "resolved";
  createdAt: string;
  updatedAt: string;
  reply?: string;
}

export function SupportTicketsTab() {
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

    const { data: tickets , isLoading, refetch } = useGetData<{ tickets: SupportTicket[] }>(API_ENDPOINTS.SUPPORT.GET_TICKETS);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-[#008EF4]/10 text-[#008EF4] border-[#008EF4]/20";
      case "inProgress":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "resolved":
        return "bg-green-100 text-green-700 border-green-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };
  

  const getCategoryColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "payment":
        return "bg-purple-100 text-purple-700 border-purple-200";
      case "booking":
        return "bg-blue-100 text-blue-700 border-blue-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const handleCreateTicket = () => {
    setIsCreateOpen(true);
  };

  const handleViewDetails = (ticket: SupportTicket) => {
    setSelectedTicket(ticket);
    setIsDetailsOpen(true);
  };

  return (
    <Card className="shadow-lg border-0">
      <CardHeader className="border-b bg-gradient-to-r from-gray-50 to-white sticky top-0 z-10">
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
      <CardContent className="p-2">
        {isLoading ? (
          <Loader />
        ) : (
          <div className="space-y-8">
            {tickets?.tickets.map((ticket) => (
              <div
                key={ticket._id}
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
                          {ticket.description}
                        </h3>
                        <Badge className={getStatusColor(ticket.status)} variant="outline">
                          {ticket.status}
                        </Badge>
                        <Badge className={getCategoryColor(ticket.type)} variant="outline">
                          {ticket.type}
                        </Badge>
                      </div>
                      <div className="flex flex-wrap items-center gap-4 text-gray-600">
                        <span className="text-gray-500">#{ticket._id}</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4 text-[#008EF4]" />
                          Created {formatDateTime(ticket.createdAt)}
                        </span>
                      </div>
                      <p className="text-gray-500 mt-2 bg-gray-50 px-3 py-2 rounded-lg inline-block">
                        Last updated: {formatDateTime(ticket.updatedAt)}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleViewDetails(ticket)}
                    className="border-gray-200 hover:border-[#008EF4] hover:text-[#008EF4] hover:bg-[#008EF4]/5"
                  >
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
      <TicketDetailsDialog
        ticket={selectedTicket}
        open={isDetailsOpen}
        onOpenChange={setIsDetailsOpen}
      />
      <CreateTicketDialog
        open={isCreateOpen}
        onOpenChange={setIsCreateOpen}
        onSuccess={refetch}
      />
    </Card>
  );
}
