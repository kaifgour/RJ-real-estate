import { MongoClient, ObjectId } from 'mongodb'
import { NextResponse } from 'next/server'

const MONGO_URL = process.env.MONGO_URL
let cachedDb = null

async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb
  }

  const client = await MongoClient.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  const db = client.db('realestate')
  cachedDb = db
  return db
}

// POST /api/leads - Create new lead
export async function POST(request) {
  const { pathname } = new URL(request.url)

  if (pathname === '/api/leads') {
    try {
      const body = await request.json()
      const { name, phone, email, property } = body

      if (!name || !phone) {
        return NextResponse.json(
          { error: 'Name and phone are required' },
          { status: 400 }
        )
      }

      if (phone.length !== 10) {
        return NextResponse.json(
          { error: 'Phone number must be 10 digits' },
          { status: 400 }
        )
      }

      const db = await connectToDatabase()
      const leadsCollection = db.collection('leads')

      const lead = {
        name,
        phone,
        email: email || '',
        property: property || '',
        createdAt: new Date(),
        status: 'new'
      }

      const result = await leadsCollection.insertOne(lead)

      return NextResponse.json(
        { 
          success: true, 
          message: 'Lead created successfully',
          leadId: result.insertedId.toString()
        },
        { status: 201 }
      )
    } catch (error) {
      console.error('Error creating lead:', error)
      return NextResponse.json(
        { error: 'Failed to create lead' },
        { status: 500 }
      )
    }
  }

  return NextResponse.json(
    { error: 'Route not found' },
    { status: 404 }
  )
}

// GET /api/leads - Get all leads
export async function GET(request) {
  const { pathname } = new URL(request.url)

  if (pathname === '/api/leads') {
    try {
      const db = await connectToDatabase()
      const leadsCollection = db.collection('leads')

      const leads = await leadsCollection
        .find({})
        .sort({ createdAt: -1 })
        .toArray()

      // Convert ObjectId to string for JSON serialization
      const serializedLeads = leads.map(lead => ({
        ...lead,
        _id: lead._id.toString()
      }))

      return NextResponse.json(
        { 
          success: true, 
          leads: serializedLeads,
          count: serializedLeads.length
        },
        { status: 200 }
      )
    } catch (error) {
      console.error('Error fetching leads:', error)
      return NextResponse.json(
        { error: 'Failed to fetch leads' },
        { status: 500 }
      )
    }
  }

  return NextResponse.json(
    { error: 'Route not found' },
    { status: 404 }
  )
}

// Health check endpoint
export async function HEAD(request) {
  return new NextResponse(null, { status: 200 })
}
