import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useMutation } from "@tanstack/react-query";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CreditCard, X } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { ValidationData } from "@/pages/validation";

if (!import.meta.env.VITE_STRIPE_PUBLIC_KEY) {
  throw new Error('Missing required Stripe key: VITE_STRIPE_PUBLIC_KEY');
}

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

interface PaymentModalProps {
  data: ValidationData;
  sessionId: string;
  onClose: () => void;
}

function CheckoutForm({ data, sessionId, onClose }: PaymentModalProps) {
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [isProcessing, setIsProcessing] = useState(false);

  const paymentMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("POST", "/api/create-payment-intent", { sessionId });
      return response.json();
    },
    onSuccess: (result) => {
      // Payment intent created successfully, proceed with payment
      console.log("Payment intent created:", result.clientSecret);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    if (!stripe || !elements) {
      setIsProcessing(false);
      return;
    }

    try {
      // Create payment intent for the existing session
      const paymentResult = await paymentMutation.mutateAsync();
      
      // Confirm the payment
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/results/${sessionId}`,
        },
        redirect: "if_required",
      });

      if (error) {
        toast({
          title: "Payment Failed",
          description: error.message,
          variant: "destructive",
        });
      } else {
        // Payment succeeded, redirect to results
        toast({
          title: "Payment Successful",
          description: "Redirecting to your validation results...",
        });
        setLocation(`/results/${sessionId}`);
        onClose();
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement />
      <div className="flex space-x-3">
        <Button type="button" variant="outline" onClick={onClose} className="flex-1">
          Cancel
        </Button>
        <Button 
          type="submit" 
          disabled={!stripe || isProcessing}
          className="flex-1 bg-blue-700 hover:bg-blue-800"
        >
          {isProcessing ? "Processing..." : "Pay $9.99"}
        </Button>
      </div>
    </form>
  );
}

export default function PaymentModal({ data, onClose }: PaymentModalProps) {
  const [clientSecret, setClientSecret] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    // Create PaymentIntent when modal opens
    const createPaymentIntent = async () => {
      try {
        const response = await apiRequest("POST", "/api/create-payment-intent", { 
          sessionId: "temp-" + Date.now() // Temporary ID for payment intent
        });
        const result = await response.json();
        setClientSecret(result.clientSecret);
      } catch (error: any) {
        toast({
          title: "Error",
          description: "Failed to initialize payment",
          variant: "destructive",
        });
      }
    };

    createPaymentIntent();
  }, [toast]);

  if (!clientSecret) {
    return (
      <Dialog open onOpenChange={onClose}>
        <DialogContent className="max-w-md">
          <div className="text-center py-8">
            <div className="animate-spin w-8 h-8 border-4 border-blue-700 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-slate-600">Initializing payment...</p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <div className="text-center mb-6">
          <CreditCard className="w-12 h-12 text-blue-700 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900">Secure Payment</h3>
          <p className="text-slate-600">Complete payment to start document validation</p>
        </div>
        
        <Card className="border border-gray-200 mb-6">
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Document Validation Service</span>
              <span className="font-semibold">$9.99</span>
            </div>
          </CardContent>
        </Card>
        
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm data={data} sessionId={sessionId} onClose={onClose} />
        </Elements>
      </DialogContent>
    </Dialog>
  );
}
