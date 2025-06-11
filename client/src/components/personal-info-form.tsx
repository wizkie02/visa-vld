import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { personalInfoSchema, type PersonalInfo } from "@shared/schema";
import type { ValidationData } from "@/pages/validation";

interface PersonalInfoFormProps {
  data: ValidationData;
  onUpdate: (updates: Partial<ValidationData>) => void;
  onNext: () => void;
  onPrevious: () => void;
  canProceed: boolean;
}

const nationalities = [
  { value: "indian", label: "Indian" },
  { value: "chinese", label: "Chinese" },
  { value: "mexican", label: "Mexican" },
  { value: "brazilian", label: "Brazilian" },
  { value: "british", label: "British" },
  { value: "german", label: "German" },
  { value: "canadian", label: "Canadian" },
  { value: "australian", label: "Australian" },
];

export default function PersonalInfoForm({ data, onUpdate, onNext, onPrevious }: PersonalInfoFormProps) {
  const form = useForm<PersonalInfo>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: data.personalInfo,
  });

  const onSubmit = (values: PersonalInfo) => {
    onUpdate({ personalInfo: values });
    onNext();
  };

  return (
    <Card className="bg-white rounded-xl shadow-lg">
      <CardContent className="p-8">
        <h3 className="text-2xl font-semibold text-gray-900 mb-6">Personal Information</h3>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="applicantName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="As shown on passport" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="passportNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Passport Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter passport number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="dateOfBirth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date of Birth</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="nationality"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nationality</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select nationality..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {nationalities.map((nationality) => (
                          <SelectItem key={nationality.value} value={nationality.value}>
                            {nationality.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="travelDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Planned Travel Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="stayDuration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Duration of Stay (days)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="e.g., 14" 
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex space-x-4">
              <Button type="button" variant="outline" onClick={onPrevious} className="flex-1">
                Previous
              </Button>
              <Button type="submit" className="flex-1 bg-blue-700 hover:bg-blue-800">
                Next
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
