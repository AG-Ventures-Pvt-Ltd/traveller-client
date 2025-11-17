"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/common/ui/dialog";
import { Badge } from "@/common/ui/badge";
import { Button } from "@/common/ui/button";
import { Separator } from "@/common/ui/separator";
import { MessageSquare, Clock, User, Tag } from "lucide-react";
import { formatDateTime } from "@/common/utils/dateUtils";

const SUPPORT_EMAIL = "support@wondrr.in";

interface SupportTicket {
  _id: string;
  description: string;
  type: string;
  status: "open" | "inProgress" | "resolved";
  createdAt: string;
  updatedAt: string;
  reply?: string;
}

interface TicketMessage {
  id: string;
  sender: "user" | "support";
  message: string;
  timestamp: string;
}

interface TicketDetailsDialogProps {
  ticket: SupportTicket | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TicketDetailsDialog({ ticket, open, onOpenChange }: TicketDetailsDialogProps) {
  if (!ticket) return null;

  // Build messages from ticket data
  const messages: TicketMessage[] = [
    {
      id: "1",
      sender: "user",
      message: ticket.description,
      timestamp: formatDateTime(ticket.createdAt),
    },
    ...(ticket.reply ? [{
      id: "2",
      sender: "support" as const,
      message: ticket.reply,
      timestamp: formatDateTime(ticket.updatedAt),
    }] : []),
  ];

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


  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-6">
            <DialogTitle>Ticket #{ticket._id}</DialogTitle>
            <Badge className={getStatusColor(ticket.status)} variant="outline">
              {ticket.status}
            </Badge>
          </div>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          <div className="flex justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4 text-gray-500" />
              <div>
                <p className="text-xs text-gray-500">Category</p>
                <Badge className={getCategoryColor(ticket.type)} variant="outline">
                  {ticket.type}
                </Badge>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-gray-500" />
              <div>
                <p className="text-xs text-gray-500">Last Updated</p>
                <p className="text-xs font-medium">{formatDateTime(ticket.updatedAt)}</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Conversation */}
          <div className="space-y-4">
            <h3 className="font-semibold flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-[#008EF4]" />
              Query
            </h3>
            <div className="space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${msg.sender === "user" ? "flex-row-reverse" : ""}`}
                >
                  <div
                    className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${msg.sender === "user"
                      ? "bg-[#008EF4] text-white"
                      : "bg-gray-200 text-gray-700"
                      }`}
                  >
                    <User className="w-5 h-5" />
                  </div>
                  <div className={`flex-1 ${msg.sender === "user" ? "text-right" : ""}`}>
                    {msg.sender === "user" ? (
                      <div className="flex flex-col items-end">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs text-gray-500">{msg.timestamp}</span>
                          <span className="text-sm font-medium">You</span>
                        </div>
                        <div className="bg-[#008EF4] text-white p-4 rounded-2xl rounded-tr-sm max-w-[80%]">
                          <p className="text-sm whitespace-pre-wrap">{msg.message}</p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-medium">Support Team</span>
                          <span className="text-xs text-gray-500">{msg.timestamp}</span>
                        </div>
                        <div className="bg-gray-100 text-gray-900 p-4 rounded-2xl rounded-tl-sm max-w-[80%]">
                          <p className="text-sm whitespace-pre-wrap">{msg.message}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          {ticket.status === "open" && (
            <>
              <Separator />
              <div className="flex gap-3">
                <Button className="flex-1 bg-[#008EF4] hover:bg-[#0077CC]">
                  Reply to Ticket
                </Button>
                <Button variant="outline" className="border-gray-300">
                  Close Ticket
                </Button>
              </div>
            </>
          )}
          {ticket.status === "inProgress" && (
            <>
              <Separator />
              <div className="text-center py-6">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                  <p className="text-yellow-900 font-medium mb-2">
                    Need urgent assistance?
                  </p>
                  <p className="text-sm text-yellow-700">
                    Contact us at <a href={`mailto:${SUPPORT_EMAIL}`} className="font-medium underline hover:text-yellow-800">{SUPPORT_EMAIL}</a>
                  </p>
                </div>
              </div>
            </>
          )}

          {ticket.status === "resolved" && (
            <>
              <Separator />
              <div className="text-center py-6">
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <p className="text-green-900 font-medium mb-2">
                    Need further assistance?
                  </p>
                  <p className="text-sm text-green-700">
                    Write us at <a href={`mailto:${SUPPORT_EMAIL}`} className="font-medium underline hover:text-green-800">{SUPPORT_EMAIL}</a>
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
