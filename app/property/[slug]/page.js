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
import { propertyDetails } from '@/data/properties'
import Image from 'next/image'

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
  const [previewImage, setPreviewImage] = useState(null);
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);



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

    // setIsSendingOtp(true)

    try {
      const res = await fetch('/api/otp/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: formData.phone, name: formData.name, email: formData.email, property: property.slug })
      })

      if (!res.ok) {
        toast.error('something went wrong')
        setIsSendingOtp(false)
        return
      }

       setVerifiedUser(true)
      localStorage.setItem('verified_lead', 'true')

      // ✅ CLEAN UP OTP UI
      setShowOtpForm(false)
      setOtp('')
      setOtpSent(false)

      // optional reset
      setResendTimer(30)
      setResendCount(0)

      toast.success('We have received your interest. We will reach out to you shortly.')

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
                src={property.gallery[activeGalleryIndex]}
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
                  onClick={() => setActiveGalleryIndex(idx)}
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
                      <img src={plan.image} alt={plan.type} className="w-full h-48 object-cover" onClick={() => setPreviewImage(plan.image)} />
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
            {previewImage && (
              <div
                className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center"
                onClick={() => setPreviewImage(null)}
              >
                <div
                  className="relative max-w-4xl w-full mx-4"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    className="absolute -top-10 right-0 text-white text-3xl"
                    onClick={() => setPreviewImage(null)}
                  >
                    ✕
                  </button>

                  <img
                    src={previewImage}
                    alt="Floor Plan Preview"
                    className="w-full max-h-[80vh] object-contain rounded-lg shadow-lg"
                  />
                </div>
              </div>
            )}


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
          <p>&copy; 2026 Rajasthan Property Solutions. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
