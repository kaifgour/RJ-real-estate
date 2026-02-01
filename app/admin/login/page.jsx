'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from "sonner"

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const login = async () => {
    setLoading(true)
    toast.loading('Logging in...')

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    console.log(data,'dataaaaaaaaaa');

    setLoading(false)

    if (error) {
        console.log(error,'errrrr');
      toast.error(error.message || 'Failed to login')
      return
    }

    if (data.session) {
        toast.success('Logged in successfully')
      router.push('/admin/dashboard')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-sm bg-white p-6 rounded-xl shadow">
        <h2 className="text-2xl font-bold mb-4 text-center">Admin Login</h2>

        <Input
          placeholder="Email"
          className="mb-3"
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          type="password"
          placeholder="Password"
          className="mb-4"
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          type="button"
          className="w-full"
          onClick={(e) => {
                e.preventDefault()
                login()
            }}
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </Button>
      </div>
    </div>
  )
}
