'use client'

import { useState, useEffect } from 'react'
import { Search, Phone, Mail, MapPin, Home as HomeIcon, Building2, Key, TrendingUp, Star, CheckCircle, X, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import Link from 'next/link'
import Image from 'next/image'

const newProjects = [
  {
    id: 1,
    slug: 'lodha-amara-jogeshwari',
    name: 'Lodha Amara',
    builder: 'Lodha Group',
    location: 'Jogeshwari West, Mumbai',
    price: '₹1.2 - 2.5 Cr',
    pricePerSqft: '₹18,500',
    type: '2, 3 BHK Apartments',
    possession: 'Dec 2025',
    area: '650 - 1200 sq.ft',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop',
    featured: true,
    amenities: ['Swimming Pool', 'Gym', 'Clubhouse', 'Garden', 'Security', 'Parking'],
    status: 'Under Construction',
    rera: 'P51800012345'
  },
  {
    id: 2,
    slug: 'oberoi-enigma-jogeshwari',
    name: 'Oberoi Enigma',
    builder: 'Oberoi Realty',
    location: 'Jogeshwari East, Mumbai',
    price: '₹2.8 - 4.5 Cr',
    pricePerSqft: '₹22,000',
    type: '3, 4 BHK Apartments',
    possession: 'Jun 2026',
    area: '1100 - 1800 sq.ft',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop',
    featured: true,
    amenities: ['Swimming Pool', 'Gym', 'Tennis Court', 'Spa', 'Theatre', 'Kids Play Area'],
    status: 'New Launch',
    rera: 'P51800023456'
  },
  {
    id: 3,
    slug: 'godrej-summit-jogeshwari',
    name: 'Godrej Summit',
    builder: 'Godrej Properties',
    location: 'Jogeshwari West, Mumbai',
    price: '₹95 L - 1.8 Cr',
    pricePerSqft: '₹16,800',
    type: '1, 2 BHK Apartments',
    possession: 'Mar 2026',
    area: '550 - 950 sq.ft',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop',
    featured: false,
    amenities: ['Swimming Pool', 'Gym', 'Garden', 'Jogging Track', 'Security'],
    status: 'Under Construction',
    rera: 'P51800034567'
  },
  {
    id: 4,
    slug: 'runwal-elegante-jogeshwari',
    name: 'Runwal Elegante',
    builder: 'Runwal Group',
    location: 'Jogeshwari East, Mumbai',
    price: '₹1.5 - 2.8 Cr',
    pricePerSqft: '₹19,500',
    type: '2, 3 BHK Apartments',
    possession: 'Sep 2025',
    area: '750 - 1300 sq.ft',
    image: 'https://images.unsplash.com/photo-1460317442991-0ec209397118?w=800&h=600&fit=crop',
    featured: false,
    amenities: ['Swimming Pool', 'Gym', 'Clubhouse', 'Indoor Games', 'Security'],
    status: 'Under Construction',
    rera: 'P51800045678'
  },
  {
    id: 5,
    slug: 'shapoorji-joyville-jogeshwari',
    name: 'Shapoorji Joyville',
    builder: 'Shapoorji Pallonji',
    location: 'Jogeshwari West, Mumbai',
    price: '₹85 L - 1.6 Cr',
    pricePerSqft: '₹15,500',
    type: '1, 2 BHK Apartments',
    possession: 'Nov 2025',
    area: '500 - 900 sq.ft',
    image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&h=600&fit=crop',
    featured: false,
    amenities: ['Gym', 'Garden', 'Kids Play Area', 'Security', 'Parking'],
    status: 'New Launch',
    rera: 'P51800056789'
  },
  {
    id: 6,
    slug: 'peninsula-heights-jogeshwari',
    name: 'Peninsula Heights',
    builder: 'Peninsula Land',
    location: 'Jogeshwari East, Mumbai',
    price: '₹3.2 - 5.5 Cr',
    pricePerSqft: '₹24,000',
    type: '3, 4 BHK Apartments',
    possession: 'Dec 2026',
    area: '1250 - 2000 sq.ft',
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop',
    featured: true,
    amenities: ['Swimming Pool', 'Gym', 'Spa', 'Clubhouse', 'Library', 'Theatre', 'Security'],
    status: 'New Launch',
    rera: 'P51800067890'
  }
]

const resaleProperties = [
  {
    id: 101,
    name: 'Spacious 2BHK in Jogeshwari',
    location: 'Jogeshwari West',
    price: '₹1.35 Cr',
    type: '2 BHK',
    area: '850 sq.ft',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop',
    category: 'Resale',
    furnishing: 'Semi-Furnished'
  },
  {
    id: 102,
    name: 'Luxury 3BHK Apartment',
    location: 'Jogeshwari East',
    price: '₹45,000/month',
    type: '3 BHK',
    area: '1200 sq.ft',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop',
    category: 'Rent',
    furnishing: 'Fully-Furnished'
  },
  {
    id: 103,
    name: 'Modern 1BHK Flat',
    location: 'Jogeshwari West',
    price: '₹28,000/month',
    type: '1 BHK',
    area: '550 sq.ft',
    image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&h=600&fit=crop',
    category: 'Rent',
    furnishing: 'Semi-Furnished'
  },
  {
    id: 104,
    name: 'Premium 3BHK with Garden',
    location: 'Jogeshwari East',
    price: '₹2.15 Cr',
    type: '3 BHK',
    area: '1100 sq.ft',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop',
    category: 'Resale',
    furnishing: 'Unfurnished'
  },
  {
    id: 105,
    name: 'Cozy 2BHK near Metro',
    location: 'Jogeshwari West',
    price: '₹35,000/month',
    type: '2 BHK',
    area: '750 sq.ft',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
    category: 'Rent',
    furnishing: 'Fully-Furnished'
  },
  {
    id: 106,
    name: 'Elegant 4BHK Penthouse',
    location: 'Jogeshwari East',
    price: '₹3.85 Cr',
    type: '4 BHK',
    area: '1850 sq.ft',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
    category: 'Resale',
    furnishing: 'Semi-Furnished'
  },
  {
    id: 107,
    name: 'Affordable 1BHK Studio',
    location: 'Jogeshwari West',
    price: '₹22,000/month',
    type: '1 BHK',
    area: '450 sq.ft',
    image: 'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop',
    category: 'Rent',
    furnishing: 'Unfurnished'
  },
  {
    id: 108,
    name: 'Spacious 2BHK Corner Flat',
    location: 'Jogeshwari East',
    price: '₹1.55 Cr',
    type: '2 BHK',
    area: '900 sq.ft',
    image: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?w=800&h=600&fit=crop',
    category: 'Resale',
    furnishing: 'Semi-Furnished'
  }
]

export default function Home() {
  const [showLeadForm, setShowLeadForm] = useState(false)
  const [leadData, setLeadData] = useState({ name: '', phone: '', email: '' })
  const [showOtpForm, setShowOtpForm] = useState(false)
  const [otp, setOtp] = useState('')
  const [generatedOtp, setGeneratedOtp] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLeadForm(true)
    }, 4000)

    return () => clearTimeout(timer)
  }, [])

  const handleSendOtp = () => {
    if (!leadData.name || !leadData.phone) {
      alert('Please enter name and phone number')
      return
    }
    if (leadData.phone.length !== 10) {
      alert('Please enter a valid 10-digit phone number')
      return
    }
    const randomOtp = Math.floor(1000 + Math.random() * 9000).toString()
    setGeneratedOtp(randomOtp)
    setShowOtpForm(true)
    alert(`OTP sent to ${leadData.phone}: ${randomOtp}`)
  }

  const handleVerifyOtp = async () => {
    if (otp !== generatedOtp) {
      alert('Invalid OTP. Please try again.')
      return
    }

    setIsSubmitting(true)
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leadData)
      })

      if (response.ok) {
        setSubmitSuccess(true)
        setTimeout(() => {
          setShowLeadForm(false)
          setSubmitSuccess(false)
          setLeadData({ name: '', phone: '', email: '' })
          setOtp('')
          setShowOtpForm(false)
        }, 2000)
      }
    } catch (error) {
      alert('Failed to submit. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const filteredResaleProperties = resaleProperties.filter(prop => {
    const matchesCategory = selectedCategory === 'all' || prop.category.toLowerCase() === selectedCategory
    return matchesCategory
  })

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white">
      {/* Navigation */}
      <nav className="bg-white shadow-md sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Image src='/logo/navbar-logo.png' alt='logo' width={300} height={100} className="h-[55px] w-[140px] md:h-[70px] md:w-[165px] object-cover" />
              {/* <span className="text-2xl font-bold text-teal-600">Rajasthan Real Estate Solution</span> */}
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <a href="#new-projects" className="text-gray-700 hover:text-teal-600 font-medium">New Projects</a>
              <a href="#resale-rent" className="text-gray-700 hover:text-teal-600 font-medium">Resale/Rent</a>
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
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
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
      <section id="resale-rent" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Resale & Rental Properties</h2>
            <p className="text-gray-600 text-lg">Ready to move properties in Jogeshwari</p>
          </div>

          {/* Filter Buttons */}
          <div className="flex justify-center gap-4 mb-8">
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
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-teal-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Verified Properties</h3>
              <p className="text-gray-600">All properties are RERA verified and genuine</p>
            </div>
            <div className="text-center">
              <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-teal-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Expert Guidance</h3>
              <p className="text-gray-600">15+ years of real estate expertise</p>
            </div>
            <div className="text-center">
              <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-teal-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Best Deals</h3>
              <p className="text-gray-600">Exclusive offers and pricing</p>
            </div>
            <div className="text-center">
              <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-teal-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">24/7 Support</h3>
              <p className="text-gray-600">Always here to help you</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Building2 className="w-6 h-6 text-teal-500" />
                <span className="text-xl font-bold">RRES</span>
              </div>
              <p className="text-gray-400">Your trusted partner in finding the perfect home in Mumbai.</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#new-projects" className="hover:text-teal-500">New Projects</a></li>
                <li><a href="#resale-rent" className="hover:text-teal-500">Resale/Rent</a></li>
                <li><a href="#about" className="hover:text-teal-500">About Us</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center"><Phone className="w-4 h-4 mr-2" /> +91 98765 43210</li>
                <li className="flex items-center"><Mail className="w-4 h-4 mr-2" /> info@rajasthanrealestate.com</li>
                <li className="flex items-center"><MapPin className="w-4 h-4 mr-2" /> Jogeshwari, Mumbai</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Office Hours</h4>
              <p className="text-gray-400">Monday - Saturday<br />9:00 AM - 7:00 PM</p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Rajasthan Real Estate Solutions. All rights reserved.</p>
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
                    <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <HomeIcon className="w-8 h-8 text-teal-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">Get Your Dream Home!</h3>
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

                  {!showOtpForm ? (
                    <div className="space-y-4">
                      <Input 
                        placeholder="Your Name *"
                        value={leadData.name}
                        onChange={(e) => setLeadData({...leadData, name: e.target.value})}
                        className="border-gray-300"
                      />
                      <Input 
                        placeholder="Phone Number *"
                        type="tel"
                        maxLength={10}
                        value={leadData.phone}
                        onChange={(e) => setLeadData({...leadData, phone: e.target.value.replace(/\D/g, '')})}
                        className="border-gray-300"
                      />
                      <Input 
                        placeholder="Email (Optional)"
                        type="email"
                        value={leadData.email}
                        onChange={(e) => setLeadData({...leadData, email: e.target.value})}
                        className="border-gray-300"
                      />
                      <Button 
                        onClick={handleSendOtp}
                        className="w-full bg-teal-600 hover:bg-teal-700 py-6 text-lg"
                      >
                        Send OTP
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <p className="text-center text-sm text-gray-600 mb-4">
                        OTP sent to {leadData.phone}
                      </p>
                      <Input 
                        placeholder="Enter 4-digit OTP"
                        maxLength={4}
                        value={otp}
                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                        className="text-center text-2xl tracking-widest border-gray-300"
                      />
                      <Button 
                        onClick={handleVerifyOtp}
                        disabled={isSubmitting}
                        className="w-full bg-teal-600 hover:bg-teal-700 py-6 text-lg"
                      >
                        {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Verify & Submit'}
                      </Button>
                      <Button 
                        onClick={() => setShowOtpForm(false)}
                        variant="outline"
                        className="w-full"
                      >
                        Change Number
                      </Button>
                    </div>
                  )}
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
  )
}
