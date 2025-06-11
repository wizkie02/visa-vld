import { Link } from "wouter";
import { ArrowLeft, Mail, Phone, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function Contact() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    alert("Thank you for your message. We'll get back to you within 24 hours.");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
            <p className="text-xl text-gray-600">
              Get in touch with our support team for assistance with your visa document validation
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Information */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="w-5 h-5 text-blue-600" />
                    Email Support
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-2">For general inquiries and support:</p>
                  <p className="font-semibold text-blue-600">support@visavalidator.pro</p>
                  <p className="text-gray-600 mt-4 mb-2">For technical issues:</p>
                  <p className="font-semibold text-blue-600">tech@visavalidator.pro</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Phone className="w-5 h-5 text-green-600" />
                    Phone Support
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-2">Customer Service:</p>
                  <p className="font-semibold text-green-600">+1 (555) 123-4567</p>
                  <p className="text-gray-600 mt-4 mb-2">Technical Support:</p>
                  <p className="font-semibold text-green-600">+1 (555) 765-4321</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-purple-600" />
                    Business Hours
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Monday - Friday:</span>
                      <span className="font-semibold">9:00 AM - 6:00 PM EST</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Saturday:</span>
                      <span className="font-semibold">10:00 AM - 4:00 PM EST</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Sunday:</span>
                      <span className="font-semibold">Closed</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-red-600" />
                    Office Address
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <address className="not-italic text-gray-600">
                    VisaValidator Pro Inc.<br />
                    123 Business Avenue<br />
                    Suite 456<br />
                    New York, NY 10001<br />
                    United States
                  </address>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle>Send us a Message</CardTitle>
                <p className="text-gray-600">
                  Fill out the form below and we'll get back to you within 24 hours.
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" required />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" required />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" required />
                  </div>

                  <div>
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" required />
                  </div>

                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea 
                      id="message" 
                      rows={6} 
                      placeholder="Please describe your inquiry or issue..."
                      required 
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* FAQ Section */}
          <Card className="mt-12">
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-2">How accurate is the AI analysis?</h3>
                  <p className="text-gray-600 text-sm">
                    Our AI achieves 95%+ accuracy in document recognition, but we recommend verifying all information with official embassy sources.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Is my data secure?</h3>
                  <p className="text-gray-600 text-sm">
                    Yes, all documents are encrypted during transmission and deleted within 24 hours after processing.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Do you guarantee visa approval?</h3>
                  <p className="text-gray-600 text-sm">
                    No, we provide document analysis and recommendations. Visa decisions are made solely by embassy officials.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Can I get a refund?</h3>
                  <p className="text-gray-600 text-sm">
                    Refunds are available for technical issues with our service, but not for visa application outcomes.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}