'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { ArrowLeft, MapPin, Building2, Calendar, Home, CheckCircle, Phone, Mail, Share2, Heart, Check, Whatsapp, Ruler, IndianRupee } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { toast } from "sonner"
import { normalizePropertyName } from '@/lib/utils'

import Image from 'next/image'

const propertyDetails = {
  'lodha-amara-jogeshwari': {
    id: 1,
    name: 'Lodha Amara',
    builder: 'Lodha Group',
    location: 'Jogeshwari West, Mumbai',
    price: '₹1.2 - 2.5 Cr',
    pricePerSqft: '₹18,500',
    type: '2, 3 BHK Apartments',
    possession: 'Dec 2025',
    area: '650 - 1200 sq.ft',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&h=800&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop'
    ],
    status: 'Under Construction',
    rera: 'P51800012345',
    description: 'Lodha Amara is a premium residential project offering world-class amenities and modern architecture. Located in the heart of Jogeshwari West, it provides excellent connectivity to major business hubs and entertainment centers.',
    amenities: [
      'Swimming Pool', 'Gym & Fitness Center', 'Clubhouse', 'Landscaped Gardens',
      '24/7 Security', 'Children Play Area', 'Jogging Track', 'Indoor Games Room',
      'Party Hall', 'Amphitheater', 'Yoga Deck', 'Multipurpose Court',
      'Visitor Parking', 'Power Backup', 'Intercom Facility', 'Lift'
    ],
    specifications: [
      { label: 'Total Towers', value: '4 Towers' },
      { label: 'Total Floors', value: '25 Floors' },
      { label: 'Total Units', value: '320 Units' },
      { label: 'Apartment Types', value: '2 BHK, 3 BHK' },
      { label: 'Floor Area', value: '650 - 1200 sq.ft' },
      { label: 'Open Parking', value: 'Available' },
      { label: 'Covered Parking', value: 'Available' },
      { label: 'Project Status', value: 'Under Construction' }
    ],
    floorPlans: [
      {
        type: '2 BHK',
        area: '650 sq.ft',
        price: '₹1.2 Cr',
        image: 'https://images.unsplash.com/photo-1503174971373-b1f69850bded?w=600&h=400&fit=crop'
      },
      {
        type: '2 BHK Premium',
        area: '850 sq.ft',
        price: '₹1.57 Cr',
        image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=600&h=400&fit=crop'
      },
      {
        type: '3 BHK',
        area: '1050 sq.ft',
        price: '₹1.94 Cr',
        image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&h=400&fit=crop'
      },
      {
        type: '3 BHK Premium',
        area: '1200 sq.ft',
        price: '₹2.22 Cr',
        image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&h=400&fit=crop'
      }
    ],
    nearbyPlaces: [
      { name: 'Jogeshwari Metro Station', distance: '0.5 km', type: 'Metro' },
      { name: 'JVPD Scheme', distance: '2 km', type: 'Locality' },
      { name: 'Infinity Mall', distance: '1.5 km', type: 'Shopping' },
      { name: 'Kokilaben Hospital', distance: '3 km', type: 'Hospital' },
      { name: 'Ryan International School', distance: '1 km', type: 'School' },
      { name: 'Western Express Highway', distance: '0.8 km', type: 'Highway' }
    ]
  },
  'oberoi-enigma-jogeshwari': {
    id: 2,
    name: 'Oberoi Enigma',
    builder: 'Oberoi Realty',
    location: 'Jogeshwari East, Mumbai',
    price: '₹2.8 - 4.5 Cr',
    pricePerSqft: '₹22,000',
    type: '3, 4 BHK Apartments',
    possession: 'Jun 2026',
    area: '1100 - 1800 sq.ft',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&h=800&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop'
    ],
    status: 'New Launch',
    rera: 'P51800023456',
    description: 'Oberoi Enigma brings ultra-luxury living to Jogeshwari East. With meticulously designed apartments and world-class amenities, this project sets new standards in premium residential living.',
    amenities: [
      'Olympic Size Swimming Pool', 'State-of-art Gym', 'Tennis Court', 'Squash Court',
      'Luxury Spa', 'Private Theatre', 'Business Center', 'Concierge Service',
      'Banquet Hall', 'Sky Lounge', 'Meditation Zone', 'Indoor Badminton Court',
      'Jogging Track', 'Cricket Pitch', 'Basketball Court', 'Kids Play Zone',
      'Senior Citizens Area', '24/7 Security', 'Video Door Phone', 'Smart Home Features'
    ],
    specifications: [
      { label: 'Total Towers', value: '3 Towers' },
      { label: 'Total Floors', value: '32 Floors' },
      { label: 'Total Units', value: '280 Units' },
      { label: 'Apartment Types', value: '3 BHK, 4 BHK' },
      { label: 'Floor Area', value: '1100 - 1800 sq.ft' },
      { label: 'Parking', value: '2 Covered Parking per flat' },
      { label: 'Project Status', value: 'New Launch' },
      { label: 'Club House', value: '50,000 sq.ft' }
    ],
    floorPlans: [
      {
        type: '3 BHK',
        area: '1100 sq.ft',
        price: '₹2.42 Cr',
        image: 'https://images.unsplash.com/photo-1503174971373-b1f69850bded?w=600&h=400&fit=crop'
      },
      {
        type: '3 BHK Premium',
        area: '1350 sq.ft',
        price: '₹2.97 Cr',
        image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=600&h=400&fit=crop'
      },
      {
        type: '4 BHK',
        area: '1600 sq.ft',
        price: '₹3.52 Cr',
        image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&h=400&fit=crop'
      },
      {
        type: '4 BHK Penthouse',
        area: '1800 sq.ft',
        price: '₹3.96 Cr',
        image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&h=400&fit=crop'
      }
    ],
    nearbyPlaces: [
      { name: 'Jogeshwari Railway Station', distance: '1 km', type: 'Railway' },
      { name: 'Mumbai Airport', distance: '4 km', type: 'Airport' },
      { name: 'Raheja Mall', distance: '2 km', type: 'Shopping' },
      { name: 'Nanavati Hospital', distance: '3.5 km', type: 'Hospital' },
      { name: 'DPS School', distance: '1.2 km', type: 'School' },
      { name: 'Link Road', distance: '0.5 km', type: 'Highway' }
    ]
  },
  'godrej-summit-jogeshwari': {
    id: 3,
    name: 'Godrej Summit',
    builder: 'Godrej Properties',
    location: 'Jogeshwari West, Mumbai',
    price: '₹95 L - 1.8 Cr',
    pricePerSqft: '₹16,800',
    type: '1, 2 BHK Apartments',
    possession: 'Mar 2026',
    area: '550 - 950 sq.ft',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=800&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1460317442991-0ec209397118?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop'
    ],
    status: 'Under Construction',
    rera: 'P51800034567',
    description: 'Godrej Summit offers affordable luxury in the prime location of Jogeshwari West. Perfect for first-time homebuyers and young professionals looking for quality living spaces.',
    amenities: [
      'Swimming Pool', 'Gym', 'Landscaped Garden', 'Jogging Track',
      '24/7 Security', 'Children Play Area', 'Indoor Games', 'Yoga Area',
      'Community Hall', 'Visitor Parking', 'Power Backup', 'Intercom',
      'Fire Fighting Systems', 'Lift', 'Rainwater Harvesting'
    ],
    specifications: [
      { label: 'Total Towers', value: '2 Towers' },
      { label: 'Total Floors', value: '18 Floors' },
      { label: 'Total Units', value: '240 Units' },
      { label: 'Apartment Types', value: '1 BHK, 2 BHK' },
      { label: 'Floor Area', value: '550 - 950 sq.ft' },
      { label: 'Parking', value: '1 Covered per flat' },
      { label: 'Project Status', value: 'Under Construction' },
      { label: 'Completion', value: 'Mar 2026' }
    ],
    floorPlans: [
      {
        type: '1 BHK',
        area: '550 sq.ft',
        price: '₹92 L',
        image: 'https://images.unsplash.com/photo-1503174971373-b1f69850bded?w=600&h=400&fit=crop'
      },
      {
        type: '1 BHK Premium',
        area: '650 sq.ft',
        price: '₹1.09 Cr',
        image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=600&h=400&fit=crop'
      },
      {
        type: '2 BHK',
        area: '800 sq.ft',
        price: '₹1.34 Cr',
        image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&h=400&fit=crop'
      },
      {
        type: '2 BHK Premium',
        area: '950 sq.ft',
        price: '₹1.60 Cr',
        image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&h=400&fit=crop'
      }
    ],
    nearbyPlaces: [
      { name: 'Jogeshwari Metro', distance: '0.8 km', type: 'Metro' },
      { name: 'Lokhandwala Market', distance: '2.5 km', type: 'Shopping' },
      { name: 'Shoppers Stop', distance: '1.8 km', type: 'Shopping' },
      { name: 'Shushrusha Hospital', distance: '2 km', type: 'Hospital' },
      { label: 'St. Xavier School', distance: '1.5 km', type: 'School' },
      { name: 'SV Road', distance: '0.6 km', type: 'Main Road' }
    ]
  }
}

export default function PropertyDetail() {
  const params = useParams()
  const slug = params.slug
  const property = propertyDetails[slug] || propertyDetails['lodha-amara-jogeshwari']
  const normalizedProperty = normalizePropertyName(slug)

  const [selectedImage, setSelectedImage] = useState(0)
  const [showContactForm, setShowContactForm] = useState(false)
  const [formData, setFormData] = useState({ name: '', phone: '', email: '' })
  const [showOtpForm, setShowOtpForm] = useState(false)
  const [otp, setOtp] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [otpSent, setOtpSent] = useState(false)
  const [resendTimer, setResendTimer] = useState(30)
  const [resendCount, setResendCount] = useState(0)
  const [isSendingOtp, setIsSendingOtp] = useState(false)
  const [verifiedUser, setVerifiedUser] = useState(false)


  useEffect(() => {
    const verified = localStorage.getItem('verified_lead')
    if (verified === 'true') {
      setVerifiedUser(true)
    }
  }, [])


  const handleSendOtp = async () => {
    if (!formData.name || !formData.phone) {
      toast.error('Enter name and phone')
      return
    }

    if (resendCount >= 2) {
      toast.error('OTP limit reached. Please try later.')
      return
    }

    setIsSendingOtp(true)

    try {
      const res = await fetch('/api/otp/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: formData.phone })
      })

      if (!res.ok) {
        toast.error('Failed to send OTP')
        setIsSendingOtp(false)
        return
      }

      toast.success('OTP sent successfully')

      setOtpSent(true)
      setShowOtpForm(true)
      setResendTimer(30)
      setResendCount(prev => prev + 1)
    } catch (err) {
      toast.error('Something went wrong')
    }

    setIsSendingOtp(false)
  }

  const handleVerifyOtp = async () => {
    if (otp.length !== 6) {
      toast.error('Enter valid 6-digit OTP')
      return
    }

    try {
      setIsSubmitting(true)

      const verify = await fetch('/api/otp/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: formData.phone,
          otp
        })
      })

      const data = await verify.json()

      if (!verify.ok) {
        throw new Error(data.error || 'Invalid OTP')
      }

      // ✅ Save lead ONLY after OTP verified
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      // ✅ MARK USER AS VERIFIED
      setVerifiedUser(true)
      localStorage.setItem('verified_lead', 'true')

      // ✅ CLEAN UP OTP UI
      setShowOtpForm(false)
      setOtp('')
      setOtpSent(false)

      // optional reset
      setResendTimer(30)
      setResendCount(0)

      toast.success('OTP verified! Our team will contact you shortly.')
    } catch (err) {
      toast.error(err.message || 'OTP verification failed')
    } finally {
      setIsSubmitting(false)
    }
  }


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
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-md sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2 text-teal-600 hover:text-teal-700">
              <ArrowLeft className="w-5 h-5" />
              <span className="font-semibold">Back</span>
            </Link>
            <div className="flex items-center space-x-2">
              <Image src='/logo/nav_logo_edited.svg' alt='logo' width={300} height={100} className="lg:h-[80px] lg:w-[200px] w-[100px] h-[60px]" />
            </div>
          </div>
        </div>
      </nav>

      {/* Image Gallery */}
      <div className="bg-white">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <img
                src={property.gallery[selectedImage]}
                alt={property.name}
                className="w-full h-[500px] object-cover rounded-lg"
              />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-1 gap-4">
              {property.gallery.slice(0, 4).map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Gallery ${idx + 1}`}
                  onClick={() => setSelectedImage(idx)}
                  className={`w-full h-[120px] object-cover rounded-lg cursor-pointer transition-all ${selectedImage === idx ? 'ring-4 ring-teal-500' : 'hover:opacity-75'
                    }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Property Info */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">{property.name}</h1>
                    <p className="text-xl text-gray-600 mb-2">{property.builder}</p>
                    <p className="text-gray-600 flex items-center">
                      <MapPin className="w-5 h-5 mr-2 text-teal-600" />
                      {property.location}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon">
                      <Heart className="w-5 h-5" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Share2 className="w-5 h-5" />
                    </Button>
                  </div>
                </div>

                <div className="flex items-center gap-4 mb-4">
                  <span className="bg-teal-100 text-teal-700 px-4 py-2 rounded-full font-semibold">{property.status}</span>
                  <span className="text-gray-600">RERA: {property.rera}</span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t">
                  <div>
                    <p className="text-gray-600 text-sm">Price Range</p>
                    <p className="text-2xl font-bold text-teal-600">{property.price}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Price/sq.ft</p>
                    <p className="text-xl font-bold text-gray-800">{property.pricePerSqft}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Property Type</p>
                    <p className="text-lg font-semibold text-gray-800">{property.type}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Possession</p>
                    <p className="text-lg font-semibold text-gray-800">{property.possession}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Description */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">About {property.name}</h2>
                <p className="text-gray-600 leading-relaxed">{property.description}</p>
              </CardContent>
            </Card>

            {/* Floor Plans */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Floor Plans</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {property.floorPlans.map((plan, idx) => (
                    <div key={idx} className="border rounded-lg overflow-hidden hover:shadow-lg transition-all">
                      <img src={plan.image} alt={plan.type} className="w-full h-48 object-cover" />
                      <div className="p-4 bg-gray-50">
                        <h3 className="font-bold text-lg mb-2">{plan.type}</h3>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">{plan.area}</span>
                          <span className="text-teal-600 font-bold text-lg">{plan.price}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Amenities */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Amenities & Facilities</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {property.amenities.map((amenity, idx) => (
                    <div key={idx} className="flex items-center space-x-2 text-gray-700">
                      <CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0" />
                      <span className="text-sm">{amenity}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Specifications */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Project Specifications</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {property.specifications.map((spec, idx) => (
                    <div key={idx} className="flex justify-between items-center py-3 border-b">
                      <span className="text-gray-600">{spec.label}</span>
                      <span className="font-semibold text-gray-800">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Nearby Places */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Nearby Connectivity</h2>
                <div className="space-y-3">
                  {property.nearbyPlaces.map((place, idx) => (
                    <div key={idx} className="flex items-center justify-between py-3 border-b last:border-0">
                      <div className="flex items-center space-x-3">
                        <MapPin className="w-5 h-5 text-teal-600" />
                        <div>
                          <p className="font-semibold text-gray-800">{place.name}</p>
                          <p className="text-sm text-gray-500">{place.type}</p>
                        </div>
                      </div>
                      <span className="text-teal-600 font-semibold">{place.distance}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                {
                  verifiedUser ? <div className="text-center py-6">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                      <Check className="h-8 w-8 text-green-600" />
                    </div>

                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      We’ve received your interest 🎉
                    </h3>

                    <p className="text-gray-600 text-sm mb-4">
                      Our property expert will reach out to you shortly with
                      complete details and exclusive offers.
                    </p>

                    <div className="text-sm text-gray-500">
                      📞 You can also call us directly if you need immediate assistance.
                    </div>
                    <div className="mt-4 space-y-3">
                      <Button variant="outline" className="w-full" onClick={() => window.location.href = 'tel:+919930047748'}>
                        <Phone className="w-5 h-5 mr-2" />
                        Call Now
                      </Button>
                    </div>
                  </div> :
                    <>
                      <h3 className="text-xl font-bold text-gray-800 mb-4">Interested in this property?</h3>
                      <p className="text-gray-600 mb-4">Get a free consultation and evaluation report</p>

                      <form className="space-y-4">
                        {!showOtpForm ? (
                          <>
                            <Input
                              placeholder="Your Name *"
                              value={formData.name}
                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                              required
                            />

                            <Input
                              placeholder="Phone Number *"
                              type="tel"
                              maxLength={10}
                              value={formData.phone}
                              onChange={(e) =>
                                setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '') })
                              }
                              required
                            />

                            <Input
                              placeholder="Email (Optional)"
                              type="email"
                              value={formData.email}
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />

                            <Button
                              onClick={(e) => {
                                e.preventDefault()
                                handleSendOtp()
                              }}
                              disabled={isSendingOtp || otpSent}
                              className="w-full bg-teal-600 py-6 text-lg"
                            >
                              {isSendingOtp ? 'Sending OTP...' : 'Get Free Consultation'}
                            </Button>

                          </>
                        ) : (
                          <>
                            <p className="text-sm text-center text-gray-600">
                              OTP sent to {formData.phone}
                            </p>

                            <Input
                              placeholder="Enter OTP"
                              maxLength={6}
                              value={otp}
                              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                              className="text-center text-xl tracking-widest"
                            />

                            <Button
                              type="button"
                              className="w-full bg-teal-600 py-6"
                              onClick={handleVerifyOtp}
                              disabled={isSubmitting || !otpSent}
                            >
                              {isSubmitting ? 'Verifying...' : 'Verify & Submit'}
                            </Button>
                            {otpSent && (
                              <div className="text-center text-sm mt-2">
                                {resendTimer > 0 ? (
                                  <span className="text-gray-500">
                                    Resend OTP in {resendTimer}s
                                  </span>
                                ) : resendCount < 2 ? (
                                  <button
                                    onClick={(e) => {
                                      e.preventDefault()
                                      handleSendOtp()
                                    }}
                                    className="text-teal-600 font-semibold underline"
                                  >
                                    Resend OTP
                                  </button>
                                ) : (
                                  <span className="text-red-500">
                                    OTP limit reached
                                  </span>
                                )}
                              </div>
                            )}

                          </>
                        )}
                      </form>

                      <div className="mt-4 space-y-3">
                        <Button variant="outline" className="w-full" onClick={() => window.location.href = 'tel:+919930047748'}>
                          <Phone className="w-5 h-5 mr-2" />
                          Call Now
                        </Button>
                      </div>

                      <div className="mt-6 p-4 bg-teal-50 rounded-lg">
                        <h4 className="font-bold text-teal-800 mb-2">🎁 Special Offers</h4>
                        <div className="text-sm text-teal-700 space-y-1">
                          <div className='flex gap-2'><Check className="w-5 h-5" /> <span>Free site visit</span></div>
                          <div className='flex gap-2'><Check className="w-5 h-5" /> <span>Free property evaluation</span></div>
                          <div className='flex gap-2'><Check className="w-5 h-5" /> <span>Exclusive discounts</span></div>
                          <div className='flex gap-2'><Check className="w-5 h-5" /> <span>Home loan assistance</span></div>
                        </div>
                      </div>
                    </>
                }
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2026 Rajasthan Real Estate Solutions. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
