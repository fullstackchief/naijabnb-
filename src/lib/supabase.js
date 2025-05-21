import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  },
  realtime: {
    params: {
      eventsPerSecond: 10
    }
  }
})

// Test connection function
export const testConnection = async () => {
  try {
    const { data, error } = await supabase.from('listings').select('count').single()
    if (error) throw error
    console.log('Supabase connection successful!')
    return true
  } catch (error) {
    console.error('Supabase connection error:', error.message)
    return false
  }
}

// Storage API
export const storageApi = {
  // Upload file
  uploadFile: async (bucket, path, file) => {
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(path, file)

    if (error) throw error
    return data
  },

  // Get public URL
  getPublicUrl: (bucket, path) => {
    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(path)

    return publicUrl
  },

  // Remove file
  removeFile: async (bucket, path) => {
    const { data, error } = await supabase.storage
      .from(bucket)
      .remove([path])

    if (error) throw error
    return data
  },

  // List files
  listFiles: async (bucket, path = '') => {
    const { data, error } = await supabase.storage
      .from(bucket)
      .list(path)

    if (error) throw error
    return data
  }
}

// Hosts API
export const hostsApi = {
  // Get current host profile
  getProfile: async () => {
    const { data: { user } } = await supabase.auth.getUser()
    
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()

    if (error) throw error
    return data
  },

  // Update host profile
  updateProfile: async (data) => {
    const { data: { user } } = await supabase.auth.getUser()
    
    const { data: profile, error } = await supabase
      .from('profiles')
      .update(data)
      .eq('id', user.id)
      .select()
      .single()

    if (error) throw error
    return profile
  },

  // Get host's properties
  getProperties: async () => {
    const { data: { user } } = await supabase.auth.getUser()
    
    const { data, error } = await supabase
      .from('properties')
      .select(`
        *,
        property_images (*),
        property_amenities (*)
      `)
      .eq('host_id', user.id)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data
  },

  // Get host's bookings
  getBookings: async () => {
    const { data: { user } } = await supabase.auth.getUser()
    
    const { data, error } = await supabase
      .from('bookings')
      .select(`
        *,
        properties!inner (
          id,
          title,
          address,
          city,
          state,
          price_per_night,
          host_id
        ),
        users!bookings_user_id_fkey (
          id,
          email
        )
      `)
      .eq('properties.host_id', user.id)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data
  },

  // Get host's reviews
  getReviews: async () => {
    const { data: { user } } = await supabase.auth.getUser()
    
    const { data, error } = await supabase
      .from('reviews')
      .select(`
        *,
        properties!inner (
          id,
          title,
          host_id
        ),
        users!reviews_user_id_fkey (
          id,
          email
        )
      `)
      .eq('properties.host_id', user.id)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data
  }
}

// Agents API
export const agentsApi = {
  // Get current agent profile
  getProfile: async () => {
    const { data: { user } } = await supabase.auth.getUser()
    
    const { data, error } = await supabase
      .from('agents')
      .select('*')
      .eq('id', user.id)
      .single()

    if (error) throw error
    return data
  },

  // Request to become an agent
  requestToBeAgent: async (data) => {
    const { data: { user } } = await supabase.auth.getUser()
    
    const { data: agent, error } = await supabase
      .from('agents')
      .insert([{
        id: user.id,
        ...data,
        status: 'pending'
      }])
      .select()
      .single()

    if (error) throw error
    return agent
  },

  // Update agent profile
  updateProfile: async (data) => {
    const { data: { user } } = await supabase.auth.getUser()
    
    const { data: agent, error } = await supabase
      .from('agents')
      .update(data)
      .eq('id', user.id)
      .select()
      .single()

    if (error) throw error
    return agent
  },

  // Get agent's listings
  getListings: async () => {
    const { data: { user } } = await supabase.auth.getUser()
    
    const { data, error } = await supabase
      .from('listings')
      .select(`
        *,
        listing_images (*),
        listing_amenities (*)
      `)
      .eq('agent_id', user.id)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data
  },

  // Get agent's commission history
  getCommissionHistory: async () => {
    const { data: { user } } = await supabase.auth.getUser()
    
    const { data, error } = await supabase
      .from('bookings')
      .select(`
        *,
        listings!inner (
          title,
          price_per_night,
          agent_id
        )
      `)
      .eq('listings.agent_id', user.id)
      .eq('status', 'completed')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data
  },

  // Get agent's pending commissions
  getPendingCommissions: async () => {
    const { data: { user } } = await supabase.auth.getUser()
    
    const { data, error } = await supabase
      .from('bookings')
      .select(`
        *,
        listings!inner (
          title,
          price_per_night,
          agent_id
        )
      `)
      .eq('listings.agent_id', user.id)
      .eq('status', 'confirmed')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data
  }
}