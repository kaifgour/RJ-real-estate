'use client'

import { useState, useEffect } from 'react'
import { Search, Phone, Mail, MapPin, Home as HomeIcon, Building2, Key, TrendingUp, Star, CheckCircle, X, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import WhatsAppButton from '@/components/ui/WhatsappButton'
import Link from 'next/link'
import Image from 'next/image'
import { toast } from "sonner"
import { newProjects, resaleProperties } from '@/data/properties'

export default function Home() {
  const [showLeadForm, setShowLeadForm] = useState(false)
  const [leadData, setLeadData] = useState({ name: '', phone: '', email: '' })
  const [showOtpForm, setShowOtpForm] = useState(false)
  const [otp, setOtp] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [otpSent, setOtpSent] = useState(false)
  const [resendTimer, setResendTimer] = useState(30)
  const [resendCount, setResendCount] = useState(0)
  const [isSendingOtp, setIsSendingOtp] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLeadForm(true)
    }, 12000)

    return () => clearTimeout(timer)
  }, [])


  const handleSendOtp = async () => {
    if (!leadData.name || !leadData.phone) {
      toast.error('Enter name and phone')
      return
    }
    if (leadData.phone.length !== 10) {
      toast.error('Enter valid phone number')
      return
    }

    if (resendCount >= 2) {
      toast.error('OTP limit reached. Please try later.')
      return
    }

    // setIsSendingOtp(true)

    try {
      const res = await fetch('/api/otp/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: leadData.phone, name: leadData.name, email: leadData.email })
      })

      console.log(res, 'ressssssss');

      if (!res.ok) {
        toast.error('something went wrong')
        setIsSendingOtp(false)
        return
      }

      toast.success('We have received your interest. We will reach out to you shortly.')

      setOtpSent(false)
      setResendTimer(30)
      setResendCount(0)
      setSubmitSuccess(true)
    } catch (err) {
      toast.error('Something went wrong')
    }

  }


  // const handleVerifyOtp = async () => {
  //   if (otp.length !== 6) {
  //     toast.error('Enter valid 6-digit OTP')
  //     return
  //   }
  //   try {
  //     setIsSubmitting(true)

  //     const verify = await fetch('/api/otp/verify', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({
  //         phone: leadData.phone,
  //         otp
  //       })
  //     })

  //     const data = await verify.json()

  //     if (!verify.ok) {
  //       throw new Error(data.error || 'Invalid OTP')
  //     }

  //     await fetch('/api/leads', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify(leadData)
  //     })

  //     toast.success('OTP verified! We will contact you shortly.')
  //     setOtpSent(false)
  //     setResendTimer(30)
  //     setResendCount(0)
  //     setSubmitSuccess(true)
  //   } catch (err) {
  //     toast.error(err.message || 'OTP verification failed')
  //   } finally {
  //     setIsSubmitting(false)
  //   }
  // }



  const filteredResaleProperties = resaleProperties.filter(prop => {
    const matchesCategory = selectedCategory === 'all' || prop.category.toLowerCase() === selectedCategory
    return matchesCategory
  })

  useEffect(() => {
    let timer

    if (otpSent && resendTimer > 0) {
      timer = setTimeout(() => {
        setResendTimer(prev => prev - 1)
      }, 1000)
    }

    return () => clearTimeout(timer)
  }, [otpSent, resendTimer])

  const isOtpValid = otp.length === 6

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white">
        {/* Navigation */}
        <nav className="bg-white shadow-md sticky top-0 z-40">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 flex-col">
                <Image src='/logo/nav_logo_edited.svg' alt='logo' width={300} height={100} className="lg:h-[75px] lg:w-[200px] w-[100px] h-[60px]" />
                <span className="text-sm md:text-[15px] font-bold text-[#009095] mt-1">Rajasthan Property Solutions</span>
              </div>
              <div className="hidden md:flex items-center space-x-6">
                <a href="#new-projects" className="text-gray-700 hover:text-teal-600 font-medium">New Projects</a>
                {/* <a href="#resale-rent" className="text-gray-700 hover:text-teal-600 font-medium">Resale/Rent</a> */}
                <a href="#about" className="text-gray-700 hover:text-teal-600 font-medium">About Us</a>
                <Button onClick={() => setShowLeadForm(true)} className="bg-teal-600 hover:bg-teal-700">Contact Us</Button>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-teal-600 to-teal-800 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">Find Your Dream Home in Jogeshwari</h1>
              <p className="text-xl mb-8 text-teal-100">Premium Properties from Top Builders | Expert Guidance | Best Deals</p>

              {/* Search Bar */}
              <div className="bg-white rounded-lg shadow-xl p-4 max-w-3xl mx-auto">
                <div className="flex flex-col md:flex-row gap-3">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <Input
                      placeholder="Search by project name, builder, or location"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 py-6 text-gray-800"
                    />
                  </div>
                  <Button className="bg-teal-600 hover:bg-teal-700 py-6 px-8">
                    <Search className="w-5 h-5 mr-2" />
                    Search
                  </Button>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-3xl font-bold">500+</div>
                  <div className="text-teal-100 text-sm">Properties</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-3xl font-bold">50+</div>
                  <div className="text-teal-100 text-sm">Builders</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-3xl font-bold">1000+</div>
                  <div className="text-teal-100 text-sm">Happy Clients</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-3xl font-bold">15+</div>
                  <div className="text-teal-100 text-sm">Years Experience</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* New Projects Section */}
        <section id="new-projects" className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">New Builder Projects in Jogeshwari</h2>
              <p className="text-gray-600 text-lg">Explore premium residential projects from Mumbai's top builders</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {newProjects.map((project) => (
                <Link href={`/property/${project.slug}`} key={project.id}>
                  <Card className="group hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden border-2 hover:border-teal-500">
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.name}
                        className="w-full h-full object-fill bg-gray-400 group-hover:scale-110 transition-transform duration-300"
                      />
                      {project.featured && (
                        <div className="absolute top-4 left-4 bg-teal-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                          Featured
                        </div>
                      )}
                      <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-semibold text-teal-600">
                        {project.status}
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-teal-600 transition-colors">{project.name}</h3>
                      <p className="text-gray-600 mb-1 font-medium">{project.builder}</p>
                      <p className="text-gray-500 mb-4 flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {project.location}
                      </p>
                      <div className="border-t pt-4 space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Price</span>
                          <span className="text-teal-600 font-bold text-lg">{project.price}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Type</span>
                          <span className="font-semibold">{project.type}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Area</span>
                          <span className="font-semibold">{project.area}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Possession</span>
                          <span className="font-semibold">{project.possession}</span>
                        </div>
                      </div>
                      <Button className="w-full mt-4 bg-teal-600 hover:bg-teal-700 group-hover:shadow-lg transition-all">
                        View Details
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>


        {/* Resale/Rent Section */}
        {/* <section id="resale-rent" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">Resale & Rental Properties</h2>
              <p className="text-gray-600 text-lg">Ready to move properties in Jogeshwari</p>
            </div> */}

        {/* Filter Buttons */}
        {/* <div className="flex justify-center gap-4 mb-8">
              <Button
                onClick={() => setSelectedCategory('all')}
                variant={selectedCategory === 'all' ? 'default' : 'outline'}
                className={selectedCategory === 'all' ? 'bg-teal-600 hover:bg-teal-700' : 'border-teal-600 text-teal-600 hover:bg-teal-50'}
              >
                All Properties
              </Button>
              <Button
                onClick={() => setSelectedCategory('resale')}
                variant={selectedCategory === 'resale' ? 'default' : 'outline'}
                className={selectedCategory === 'resale' ? 'bg-teal-600 hover:bg-teal-700' : 'border-teal-600 text-teal-600 hover:bg-teal-50'}
              >
                Resale
              </Button>
              <Button
                onClick={() => setSelectedCategory('rent')}
                variant={selectedCategory === 'rent' ? 'default' : 'outline'}
                className={selectedCategory === 'rent' ? 'bg-teal-600 hover:bg-teal-700' : 'border-teal-600 text-teal-600 hover:bg-teal-50'}
              >
                Rent
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredResaleProperties.map((property) => (
                <Card key={property.id} className="group hover:shadow-xl transition-all duration-300 cursor-pointer">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={property.image}
                      alt={property.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-3 right-3 bg-teal-600 text-white px-2 py-1 rounded text-xs font-semibold">
                      {property.category}
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-teal-600">{property.name}</h3>
                    <p className="text-gray-500 text-sm mb-3 flex items-center">
                      <MapPin className="w-3 h-3 mr-1" />
                      {property.location}
                    </p>
                    <div className="space-y-1 text-sm mb-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Type:</span>
                        <span className="font-semibold">{property.type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Area:</span>
                        <span className="font-semibold">{property.area}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Furnishing:</span>
                        <span className="font-semibold text-xs">{property.furnishing}</span>
                      </div>
                    </div>
                    <div className="text-teal-600 font-bold text-xl mb-3">{property.price}</div>
                    <Button size="sm" className="w-full bg-teal-600 hover:bg-teal-700">View Details</Button>
                  </CardContent>
                </Card>
              ))}
            </div> */}
        {/* </div>
        </section> */}

        {/* About Us Section */}
        {/* About Us Section */}
        <section id="about" className="py-20 bg-gradient-to-b from-white to-teal-50">
          <div className="container mx-auto px-4 max-w-6xl">

            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                About Rajasthan Property Solutions
              </h2>
              <p className="text-lg text-teal-600 font-medium">
                30+ Years of Trust • Transparency • Market Expertise
              </p>
            </div>

            <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
              <p>
                <span className="font-semibold text-teal-600">Rajasthan Property Solutions</span>
                is a trusted name in Mumbai’s real estate industry, built on a strong foundation
                of integrity, transparency, and over three decades of experience.
              </p>

              <p>
                For more than 30 years, we have successfully assisted families, investors,
                and businesses in buying, selling, and investing in the right properties across
                the western suburbs of Mumbai — especially in and around
                <span className="font-semibold"> Jogeshwari and Oshiwara.</span>
              </p>

              <p>
                Our deep market knowledge enables us to understand property valuation,
                market trends, legal procedures, and negotiation strategies — ensuring
                smooth, secure, and stress-free transactions every time.
              </p>
            </div>

            {/* Our Expertise */}
            <div className="mt-16">
              <h3 className="text-3xl font-bold text-center text-gray-800 mb-10">
                Our Expertise
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                <div className="bg-white shadow-lg rounded-xl p-6 border hover:border-teal-500 transition">
                  <h4 className="text-xl font-bold text-teal-600 mb-3">Residential Properties</h4>
                  <p className="text-gray-600">Flats, Villas, Plots & Premium Apartments</p>
                </div>

                <div className="bg-white shadow-lg rounded-xl p-6 border hover:border-teal-500 transition">
                  <h4 className="text-xl font-bold text-teal-600 mb-3">Commercial Spaces</h4>
                  <p className="text-gray-600">Offices, Shops & Investment Spaces</p>
                </div>

                <div className="bg-white shadow-lg rounded-xl p-6 border hover:border-teal-500 transition">
                  <h4 className="text-xl font-bold text-teal-600 mb-3">Investment Advisory</h4>
                  <p className="text-gray-600">Strategic Property Investment Guidance</p>
                </div>

                <div className="bg-white shadow-lg rounded-xl p-6 border hover:border-teal-500 transition">
                  <h4 className="text-xl font-bold text-teal-600 mb-3">Documentation & Legal</h4>
                  <p className="text-gray-600">Complete Property Documentation Assistance</p>
                </div>

                <div className="bg-white shadow-lg rounded-xl p-6 border hover:border-teal-500 transition">
                  <h4 className="text-xl font-bold text-teal-600 mb-3">Resale & Rentals</h4>
                  <p className="text-gray-600">End-to-End Support for Buying & Leasing</p>
                </div>

                <div className="bg-white shadow-lg rounded-xl p-6 border hover:border-teal-500 transition">
                  <h4 className="text-xl font-bold text-teal-600 mb-3">Property Valuation</h4>
                  <p className="text-gray-600">Accurate Market Pricing & Negotiation</p>
                </div>

              </div>
            </div>

            <div className="mt-16 text-center text-lg text-gray-700">
              <p className="font-semibold text-2xl">
                Your Property. Our Commitment.
              </p>
            </div>

          </div>
        </section>



        {/* Why Choose Us Section */}
        {/* Why Choose Us Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 max-w-6xl">

            <div className="text-center mb-14">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                Why Choose Rajasthan Estate Agency?
              </h2>
              <p className="text-gray-600 text-lg">
                Experience. Trust. Results.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

              <div className="text-center">
                <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-teal-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">30+ Years of Experience</h3>
                <p className="text-gray-600">
                  Deep local market understanding built over three decades.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-teal-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Honest & Transparent Dealings</h3>
                <p className="text-gray-600">
                  Clear communication with no hidden charges or surprises.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-teal-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Strong Local Network</h3>
                <p className="text-gray-600">
                  Trusted relationships with builders, owners & investors.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <HomeIcon className="w-8 h-8 text-teal-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Customer-First Approach</h3>
                <p className="text-gray-600">
                  Personalized property solutions based on your goals & budget.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building2 className="w-8 h-8 text-teal-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">End-to-End Support</h3>
                <p className="text-gray-600">
                  From property search to documentation & final deal closure.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Key className="w-8 h-8 text-teal-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Secure Transactions</h3>
                <p className="text-gray-600">
                  Legally sound, verified & safe property dealings.
                </p>
              </div>

            </div>

          </div>
        </section>


        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <div className="flex space-x-2 mb-4 gap-1 flex-col items-start">
                  <Image src='/logo/nav_logo_edited.svg' alt='logo' width={80} height={40} className="lg:h-[80px] lg:w-[200px] w-[100px] h-[60px]" />
                  <span className="lg:text-xl font-semibold text-md">Rajasthan Property Solutions</span>
                </div>
                <p className="text-gray-400">Your trusted partner in finding the perfect home in Mumbai.</p>
              </div>
              <div>
                <h4 className="font-bold mb-4">Quick Links</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#new-projects" className="hover:text-teal-500">New Projects</a></li>
                  {/* <li><a href="#resale-rent" className="hover:text-teal-500">Resale/Rent</a></li> */}
                  <li><a href="#about" className="hover:text-teal-500">About Us</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-4">Contact</h4>
                <ul className="space-y-2 text-gray-400">
                  <li className="flex items-center"><Phone className="w-4 h-4 mr-2" onClick={() => window.location.href = 'tel:+919930047748'} /> +91 99300 47748</li>
                  <li className="flex items-center"><Mail className="w-4 h-4 mr-2" /> info@rajasthanrealestate.com</li>
                  <li className="flex items-center"><MapPin className="w-4 h-4 mr-2" /> Jogeshwari, Mumbai</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-4">Office Hours</h4>
                <p className="text-gray-400">Monday - Saturday<br />9:00 AM - 7:00 PM</p>
                <p className="text-gray-400">Sunday<br />10:00 AM - 3:00 PM</p>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
              <p>&copy; 2026 Rajasthan Property Solutions. All rights reserved.</p>
            </div>
          </div>
        </footer>

        {/* Lead Form Popup */}
        {showLeadForm && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <Card className="max-w-md w-full relative">
              <button
                onClick={() => setShowLeadForm(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
              <CardContent className="p-8">
                {!submitSuccess ? (
                  <>
                    <div className="text-center mb-6">
                      <h3 className="text-2xl font-bold text-gray-800 my-2">Get Your Dream Home!</h3>
                      <p className="text-gray-600">Fill the form and get:</p>
                      <div className="mt-3 space-y-2 text-left">
                        <div className="flex items-center text-sm text-teal-600">
                          <CheckCircle className="w-4 h-4 mr-2" />
                          <span>✨ Free Property Consultation</span>
                        </div>
                        <div className="flex items-center text-sm text-teal-600">
                          <CheckCircle className="w-4 h-4 mr-2" />
                          <span>📊 Free Property Evaluation Report</span>
                        </div>
                        <div className="flex items-center text-sm text-teal-600">
                          <CheckCircle className="w-4 h-4 mr-2" />
                          <span>🎁 Exclusive Deals & Offers</span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <Input
                        placeholder="Your Name *"
                        value={leadData.name}
                        onChange={(e) => setLeadData({ ...leadData, name: e.target.value })}
                        className="border-gray-300"
                      />
                      <Input
                        placeholder="Phone Number *"
                        type="tel"
                        maxLength={10}
                        value={leadData.phone}
                        onChange={(e) => setLeadData({ ...leadData, phone: e.target.value.replace(/\D/g, '') })}
                        className="border-gray-300"
                      />
                      <Input
                        placeholder="Email (Optional)"
                        type="email"
                        value={leadData.email}
                        onChange={(e) => setLeadData({ ...leadData, email: e.target.value })}
                        className="border-gray-300"
                      />
                      <Button
                        onClick={handleSendOtp}
                        disabled={isSendingOtp || otpSent}
                        className="w-full bg-teal-600 py-6 text-lg"
                      >
                        {isSendingOtp ? 'Sending OTP...' : 'Get OTP'}
                      </Button>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-12 h-12 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">Thank You!</h3>
                    <p className="text-gray-600">Our team will contact you shortly with exclusive property deals.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
      <WhatsAppButton />
    </>

  )
}
