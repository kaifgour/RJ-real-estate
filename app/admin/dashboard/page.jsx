'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { exportLeadsToExcel } from '@/lib/exportExcel'

export default function AdminDashboard() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [leads, setLeads] = useState([])
  const [search, setSearch] = useState('')
  const [activeTab, setActiveTab] = useState('verified') // 👈 tab state

  // 🔐 Auth guard
  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getUser()

      if (!data.user) {
        router.replace('/admin/login')
        return
      }

      fetchLeads()
      setLoading(false)
    }

    checkAuth()
  }, [router])

  const fetchLeads = async () => {
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false })

    if (!error) setLeads(data)
  }

  // 🔎 Status filter
  const statusFilteredLeads = leads.filter(
    lead => lead.status === activeTab
  )

  // 🔎 Search filter
  const filteredLeads = statusFilteredLeads.filter(l =>
    (l.name || '').toLowerCase().includes(search.toLowerCase()) ||
    (l.phone || '').includes(search) ||
    (l.email || '').toLowerCase().includes(search.toLowerCase())
  )

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Checking authentication...
      </div>
    )
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>

        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={() =>
              supabase.auth.signOut().then(() => {
                router.replace('/admin/login')
              })
            }
          >
            Logout
          </Button>

          <Button onClick={() => exportLeadsToExcel(filteredLeads)}>
            Export Excel
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-4">
        <button
          onClick={() => setActiveTab('verified')}
          className={`px-4 py-2 rounded-lg font-medium ${
            activeTab === 'verified'
              ? 'bg-teal-600 text-white'
              : 'bg-gray-100 text-gray-700'
          }`}
        >
          Verified Leads ({leads.filter(l => l.status === 'verified').length})
        </button>

        <button
          onClick={() => setActiveTab('drop_off')}
          className={`px-4 py-2 rounded-lg font-medium ${
            activeTab === 'drop_off'
              ? 'bg-orange-500 text-white'
              : 'bg-gray-100 text-gray-700'
          }`}
        >
          Drop-off Leads ({leads.filter(l => l.status === 'drop_off').length})
        </button>
      </div>

      {/* Search */}
      <Input
        placeholder="Search by name, phone or email"
        className="mb-4 max-w-md"
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Email</th>
              <th className="p-3">Property</th>
              <th className="p-3">
                {activeTab === 'verified' ? 'Verified At' : 'Created At'}
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredLeads.map(lead => (
              <tr key={lead.id} className="border-t">
                <td className="p-3">{lead.name || '-'}</td>
                <td className="p-3">{lead.phone}</td>
                <td className="p-3">{lead.email || '-'}</td>
                <td className="p-3">{lead.property || '-'}</td>
                <td className="p-3">
                  {new Date(
                    activeTab === 'verified'
                      ? lead.verified_at
                      : lead.created_at
                  ).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredLeads.length === 0 && (
          <p className="p-4 text-center text-gray-500">
            No leads found
          </p>
        )}
      </div>
    </div>
  )
}
