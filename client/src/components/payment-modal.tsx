import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useMutation } from "@tanstack/react-query";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CreditCard, X, Download } from "lucide-react";
import LoadingSpinner from "@/components/loading-spinner";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/lib/i18n";
import type { ValidationData } from "@/pages/validation";

if (!import.meta.env.VITE_STRIPE_PUBLIC_KEY) {
  throw new Error('Missing required Stripe key: VITE_STRIPE_PUBLIC_KEY');
}

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

interface PaymentModalProps {
  data: ValidationData;
  sessionId: string;
  onClose: () => void;
  onPaymentSuccess?: () => void;
}

function CheckoutForm({ data, sessionId, onClose, onPaymentSuccess }: PaymentModalProps) {
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();
  const { t } = useLanguage();
  const [, setLocation] = useLocation();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccessful, setPaymentSuccessful] = useState(false);

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
          title: t("paymentFailed"),
          description: error.message,
          variant: "destructive",
        });
      } else {
        // Payment succeeded, show success state with download button
        setPaymentSuccessful(true);
        toast({
          title: t("paymentSuccess"),
          description: t("validationComplete"),
        });
        // Notify parent component of successful payment
        if (onPaymentSuccess) {
          onPaymentSuccess();
        }
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

  const downloadReport = async () => {
    try {
      const response = await apiRequest("POST", "/api/download-validation-report", { sessionId });
      const blob = await response.blob();
      
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = `visa-validation-report-${sessionId}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      toast({
        title: t("reportDownloaded"),
        description: t("reportDownloadDesc"),
      });
    } catch (error) {
      console.error("Error downloading report:", error);
      toast({
        title: t("downloadFailed"),
        description: t("downloadFailedDesc"),
        variant: "destructive",
      });
    }
  };

  if (paymentSuccessful) {
    return (
      <div className="space-y-6 text-center">
        <div className="text-green-600">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold">{t("paymentSuccess")}</h3>
          <p className="text-sm text-gray-600">{t("validationComplete")}</p>
        </div>
        
        <div className="space-y-3">
          <Button 
            onClick={downloadReport}
            className="w-full bg-blue-700 hover:bg-blue-800"
          >
            <Download className="w-4 h-4 mr-2" />
            {t("downloadReport")}
          </Button>
          
          <Button 
            type="button" 
            variant="outline" 
            onClick={onClose} 
            className="w-full"
          >
            {t("close")}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement />
      <div className="flex space-x-3">
        <Button type="button" variant="outline" onClick={onClose} className="flex-1">
          {t("cancel")}
        </Button>
        <Button 
          type="submit" 
          disabled={!stripe || isProcessing}
          className="flex-1 bg-blue-700 hover:bg-blue-800"
        >
          {isProcessing ? t("processing") : t("payNow")}
        </Button>
      </div>
    </form>
  );
}

export default function PaymentModal({ data, sessionId, onClose, onPaymentSuccess }: PaymentModalProps) {
  const [clientSecret, setClientSecret] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    if (!sessionId) return;
    
    // Create PaymentIntent when modal opens
    const createPaymentIntent = async () => {
      try {
        const response = await apiRequest("POST", "/api/create-payment-intent", { 
          sessionId
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
  }, [sessionId, toast]);

  if (!clientSecret) {
    return (
      <Dialog open onOpenChange={onClose}>
        <DialogContent className="max-w-md">
          <div className="text-center py-8">
            <LoadingSpinner
              size="lg"
              text="Initializing payment..."
              className="mb-4"
            />
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
          <CheckoutForm data={data} sessionId={sessionId} onClose={onClose} onPaymentSuccess={onPaymentSuccess} />
        </Elements>
      </DialogContent>
    </Dialog>
  );
}
