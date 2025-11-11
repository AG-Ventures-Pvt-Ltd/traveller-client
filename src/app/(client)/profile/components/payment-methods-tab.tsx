import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/common/ui/card";
import { Button } from "@/common/ui/button";
import { CreditCard, Plus, Trash2, Wallet } from "lucide-react";
import { Badge } from "@/common/ui/badge";
// import { toast } from "sonner";

interface PaymentMethod {
  id: string;
  type: "card";
  brand: string;
  last4: string;
  expiry: string;
  isDefault: boolean;
}

export function PaymentMethodsTab() {
  const paymentMethods: PaymentMethod[] = [
    {
      id: "1",
      type: "card",
      brand: "Visa",
      last4: "4242",
      expiry: "12/25",
      isDefault: true,
    },
    {
      id: "2",
      type: "card",
      brand: "Mastercard",
      last4: "8888",
      expiry: "09/26",
      isDefault: false,
    },
  ];

  const handleAddPaymentMethod = () => {
    // toast.info("Add payment method coming soon");
  };

  const handleRemovePaymentMethod = (_id: string) => {
    // toast.success("Payment method removed");
  };

  const getCardGradient = (brand: string) => {
    switch (brand.toLowerCase()) {
      case "visa":
        return "from-blue-500 to-blue-700";
      case "mastercard":
        return "from-orange-500 to-red-600";
      case "amex":
        return "from-green-500 to-teal-600";
      default:
        return "from-gray-600 to-gray-800";
    }
  };

  return (
    <Card className="shadow-lg border-0">
      <CardHeader className="border-b bg-gradient-to-r from-gray-50 to-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-[#008EF4]/10 rounded-xl">
              <Wallet className="w-6 h-6 text-[#008EF4]" />
            </div>
            <div>
              <CardTitle>Payment Methods</CardTitle>
              <CardDescription className="mt-1">Manage your saved payment methods</CardDescription>
            </div>
          </div>
          <Button 
            onClick={handleAddPaymentMethod} 
            className="gap-2 bg-[#008EF4] hover:bg-[#0077CC] shadow-lg shadow-[#008EF4]/25"
          >
            <Plus className="w-4 h-4" />
            Add Card
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          {paymentMethods.map((method) => (
            <div
              key={method.id}
              className="group relative overflow-hidden rounded-2xl border border-gray-200 hover:border-[#008EF4]/50 transition-all hover:shadow-xl bg-white"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-5">
                {/* Card Visual */}
                <div className={`relative w-full sm:w-64 h-40 rounded-xl bg-gradient-to-br ${getCardGradient(method.brand)} p-6 text-white shadow-lg flex flex-col justify-between`}>
                  <div className="flex justify-between items-start">
                    <CreditCard className="w-8 h-8" />
                    {method.isDefault && (
                      <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm">
                        Default
                      </Badge>
                    )}
                  </div>
                  <div>
                    <p className="text-white/80 mb-1">Card Number</p>
                    <p className="tracking-wider">•••• •••• •••• {method.last4}</p>
                  </div>
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-white/80">Expires</p>
                      <p>{method.expiry}</p>
                    </div>
                    <p className="uppercase">{method.brand}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex-1 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 w-full sm:w-auto">
                  <div>
                    <p className="text-gray-900 mb-1">
                      {method.brand} •••• {method.last4}
                    </p>
                    <p className="text-gray-500">Expires {method.expiry}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {!method.isDefault && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="border-[#008EF4] text-[#008EF4] hover:bg-[#008EF4] hover:text-white"
                      >
                        Set as Default
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemovePaymentMethod(method.id)}
                      className="hover:bg-red-50 hover:text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
