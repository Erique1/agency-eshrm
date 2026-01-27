"use client"

import type React from "react"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { CheckCircle, CalendarIcon, Clock, Users, Video, Building } from "lucide-react"
import { format, addDays, isWeekend } from "date-fns"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

const services = [
  { value: "custom-hr-solutions", label: "Custom HR Solutions" },
  { value: "organizational-development", label: "Organizational Development" },
  { value: "training-workshops", label: "Training & Workshops" },
  { value: "hr-policy-development", label: "HR Policy Development" },
  { value: "performance-management", label: "Performance Management" },
  { value: "talent-acquisition", label: "Talent Acquisition" },
  { value: "general-inquiry", label: "General HR Inquiry" },
]

const timeSlots = ["09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"]

const consultationTypes = [
  {
    value: "video",
    label: "Video Call",
    description: "Meet via Zoom or Google Meet",
    icon: Video,
  },
  {
    value: "phone",
    label: "Phone Call",
    description: "We'll call you directly",
    icon: Users,
  },
  {
    value: "in-person",
    label: "In-Person",
    description: "Visit our office",
    icon: Building,
  },
]

export default function BookConsultationPage() {
  const [step, setStep] = useState(1)
  const [date, setDate] = useState<Date>()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    consultationType: "video",
    time: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleNext = () => {
    if (step < 3) setStep(step + 1)
  }

  const handleBack = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          service: services.find((s) => s.value === formData.service)?.label || formData.service,
          booking_date: date ? format(date, "yyyy-MM-dd") : "",
          booking_time: formData.time,
          consultation_type: formData.consultationType,
          message: formData.message,
        }),
      })

      if (response.ok) {
        // Send emails asynchronously (don't block the UI)
        const emailData = {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          service: services.find((s) => s.value === formData.service)?.label || formData.service,
          booking_date: date ? format(date, "yyyy-MM-dd") : "",
          booking_time: formData.time,
          consultation_type: formData.consultationType,
          message: formData.message,
        }

        fetch('/api/send-booking-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(emailData),
        }).then((emailResponse) => {
          if (!emailResponse.ok) {
            console.error('Email sending failed')
            toast.warning('Booking confirmed, but email notification failed. We\'ll still contact you!')
          }
        }).catch((emailError) => {
          console.error('Email sending failed:', emailError)
          toast.warning('Booking confirmed, but email notification failed. We\'ll still contact you!')
        })

        toast.success('Booking confirmed successfully!')
        setIsSubmitted(true)
      } else {
        toast.error('Failed to book consultation. Please try again.')
      }
    } catch (error) {
      console.error('Error submitting booking:', error)
      toast.error('An error occurred. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const isStep1Valid = formData.name && formData.email && formData.phone && formData.service
  const isStep2Valid = date && formData.time && formData.consultationType

  // Disable dates before today (allow today and future dates)
  const disabledDays = (date: Date) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0) // Start of today
    return date < today
  }

  if (isSubmitted) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          <section className="py-20 lg:py-32">
            <div className="container mx-auto px-4">
              <div className="mx-auto max-w-lg text-center">
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <CheckCircle className="h-10 w-10" />
                </div>
                <h1 className="text-3xl font-bold mb-4">Booking Confirmed!</h1>
                <p className="text-muted-foreground mb-6">
                  Thank you for scheduling a consultation with ESHRM. We've received your booking request and will send
                  a confirmation email shortly.
                </p>

                <Card className="text-left mb-8">
                  <CardContent className="p-6 space-y-4">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Date</span>
                      <span className="font-medium">{date && format(date, "MMMM d, yyyy")}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Time</span>
                      <span className="font-medium">{formData.time} (WAT)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Type</span>
                      <span className="font-medium capitalize">{formData.consultationType} Consultation</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Service</span>
                      <span className="font-medium">{services.find((s) => s.value === formData.service)?.label}</span>
                    </div>
                  </CardContent>
                </Card>

                <p className="text-sm text-muted-foreground mb-6">
                  A confirmation email has been sent to <strong>{formData.email}</strong> with calendar invite and
                  meeting details.
                </p>

                <Button
                  onClick={() => {
                    setIsSubmitted(false)
                    setStep(1)
                    setFormData({
                      name: "",
                      email: "",
                      phone: "",
                      company: "",
                      service: "",
                      consultationType: "video",
                      time: "",
                      message: "",
                    })
                    setDate(undefined)
                  }}
                  variant="outline"
                >
                  Book Another Consultation
                </Button>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-muted py-16 lg:py-20">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />
          <div className="container relative mx-auto px-4">
            <div className="mx-auto max-w-2xl text-center">
              <div className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-4">
                Free Consultation
              </div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
                Book Your <span className="text-primary">Consultation</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Schedule a complimentary 30-minute consultation with our HR experts to discuss your challenges and
                explore how we can help.
              </p>
            </div>
          </div>
        </section>

        {/* Booking Form */}
        <section className="py-16 lg:py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl">
              {/* Progress Steps */}
              <div className="mb-12">
                <div className="flex items-center justify-between">
                  {[1, 2, 3].map((s) => (
                    <div key={s} className="flex items-center">
                      <div
                        className={cn(
                          "flex h-10 w-10 items-center justify-center rounded-full font-medium",
                          step >= s ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground",
                        )}
                      >
                        {step > s ? <CheckCircle className="h-5 w-5" /> : s}
                      </div>
                      {s < 3 && <div className={cn("h-1 w-24 mx-2", step > s ? "bg-primary" : "bg-muted")} />}
                    </div>
                  ))}
                </div>
                <div className="flex justify-between mt-2 text-sm">
                  <span className={step >= 1 ? "text-primary font-medium" : "text-muted-foreground"}>Your Details</span>
                  <span className={step >= 2 ? "text-primary font-medium" : "text-muted-foreground"}>Date & Time</span>
                  <span className={step >= 3 ? "text-primary font-medium" : "text-muted-foreground"}>Confirm</span>
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                {/* Step 1: Personal Details */}
                {step === 1 && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold mb-6">Your Details</h2>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Your full name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+263 7XX XXX XXX"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="company">Company / Organization</Label>
                        <Input
                          id="company"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          placeholder="Your company name"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="service">Service Interest *</Label>
                      <Select
                        value={formData.service}
                        onValueChange={(value: string) => setFormData({ ...formData, service: value })}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a service" />
                        </SelectTrigger>
                        <SelectContent>
                          {services.map((service) => (
                            <SelectItem key={service.value} value={service.value}>
                              {service.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex justify-end">
                      <Button type="button" onClick={handleNext} disabled={!isStep1Valid}>
                        Continue
                      </Button>
                    </div>
                  </div>
                )}

                {/* Step 2: Date & Time */}
                {step === 2 && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold mb-6">Choose Date & Time</h2>

                    <div className="grid gap-8 lg:grid-cols-2">
                      <div className="space-y-4">
                        <Label>Select Date *</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !date && "text-muted-foreground",
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {date ? format(date, "EEEE, MMMM d, yyyy") : "Pick a date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={date}
                              onSelect={setDate}
                              disabled={disabledDays}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>

                        <div className="space-y-4 mt-6">
                          <Label>Select Time (WAT) *</Label>
                          <div className="grid grid-cols-2 gap-2">
                            {timeSlots.map((slot) => (
                              <Button
                                key={slot}
                                type="button"
                                variant={formData.time === slot ? "default" : "outline"}
                                className="justify-start"
                                onClick={() => setFormData({ ...formData, time: slot })}
                              >
                                <Clock className="mr-2 h-4 w-4" />
                                {slot}
                              </Button>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <Label>Consultation Type *</Label>
                        <RadioGroup
                          value={formData.consultationType}
                          onValueChange={(value: string) => setFormData({ ...formData, consultationType: value })}
                          className="space-y-3"
                        >
                          {consultationTypes.map((type) => (
                            <div key={type.value}>
                              <RadioGroupItem value={type.value} id={type.value} className="peer sr-only" />
                              <Label
                                htmlFor={type.value}
                                className="flex items-center gap-4 rounded-lg border p-4 cursor-pointer hover:bg-accent peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5"
                              >
                                <type.icon className="h-6 w-6 text-primary" />
                                <div>
                                  <div className="font-medium">{type.label}</div>
                                  <div className="text-sm text-muted-foreground">{type.description}</div>
                                </div>
                              </Label>
                            </div>
                          ))}
                        </RadioGroup>
                      </div>
                    </div>

                    <div className="flex justify-between">
                      <Button type="button" variant="outline" onClick={handleBack}>
                        Back
                      </Button>
                      <Button type="button" onClick={handleNext} disabled={!isStep2Valid}>
                        Continue
                      </Button>
                    </div>
                  </div>
                )}

                {/* Step 3: Confirm */}
                {step === 3 && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold mb-6">Confirm Your Booking</h2>

                    <Card>
                      <CardContent className="p-6 space-y-4">
                        <h3 className="font-semibold text-lg">Booking Summary</h3>

                        <div className="grid gap-4 sm:grid-cols-2">
                          <div>
                            <span className="text-sm text-muted-foreground">Name</span>
                            <p className="font-medium">{formData.name}</p>
                          </div>
                          <div>
                            <span className="text-sm text-muted-foreground">Email</span>
                            <p className="font-medium">{formData.email}</p>
                          </div>
                          <div>
                            <span className="text-sm text-muted-foreground">Phone</span>
                            <p className="font-medium">{formData.phone}</p>
                          </div>
                          <div>
                            <span className="text-sm text-muted-foreground">Company</span>
                            <p className="font-medium">{formData.company || "-"}</p>
                          </div>
                        </div>

                        <div className="border-t pt-4 mt-4">
                          <div className="grid gap-4 sm:grid-cols-2">
                            <div>
                              <span className="text-sm text-muted-foreground">Service</span>
                              <p className="font-medium">{services.find((s) => s.value === formData.service)?.label}</p>
                            </div>
                            <div>
                              <span className="text-sm text-muted-foreground">Consultation Type</span>
                              <p className="font-medium capitalize">{formData.consultationType}</p>
                            </div>
                            <div>
                              <span className="text-sm text-muted-foreground">Date</span>
                              <p className="font-medium">{date && format(date, "EEEE, MMMM d, yyyy")}</p>
                            </div>
                            <div>
                              <span className="text-sm text-muted-foreground">Time</span>
                              <p className="font-medium">{formData.time} (WAT)</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <div className="space-y-2">
                      <Label htmlFor="message">Additional Notes (Optional)</Label>
                      <Textarea
                        id="message"
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Any specific topics you'd like to discuss or questions you have..."
                      />
                    </div>

                    <div className="flex justify-between">
                      <Button type="button" variant="outline" onClick={handleBack}>
                        Back
                      </Button>
                      <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Confirming..." : "Confirm Booking"}
                      </Button>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>
        </section>

        {/* Info Section */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl">
              <h2 className="text-2xl font-bold mb-8 text-center">What to Expect</h2>
              <div className="grid gap-6 md:grid-cols-3">
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Clock className="h-6 w-6" />
                    </div>
                    <h3 className="font-semibold mb-2">30 Minutes</h3>
                    <p className="text-sm text-muted-foreground">
                      A focused session to understand your challenges and explore solutions.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Users className="h-6 w-6" />
                    </div>
                    <h3 className="font-semibold mb-2">Expert Consultant</h3>
                    <p className="text-sm text-muted-foreground">
                      Speak directly with an experienced HR consultant from our team.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <CheckCircle className="h-6 w-6" />
                    </div>
                    <h3 className="font-semibold mb-2">No Obligation</h3>
                    <p className="text-sm text-muted-foreground">
                      A complimentary consultation with no pressure or commitment required.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
