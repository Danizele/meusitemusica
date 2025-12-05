import { supabase } from '$lib/supabase'

export const dbService = {
  // ========== FAVORITOS ==========
  async getFavorites() {
    const { data: user } = await supabase.auth.getUser()
    if (!user) return []
    
    const { data, error } = await supabase
      .from('favorites')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
    
    return data || []
  },
  
  async addFavorite(artist) {
    const { data: user } = await supabase.auth.getUser()
    if (!user) throw new Error('Não autenticado')
    
    const { data, error } = await supabase
      .from('favorites')
      .insert({
        user_id: user.id,
        artist_name: artist.name,
        artist_mbid: artist.mbid,
        lastfm_url: artist.url,
        image_url: artist.image?.[1]?.['#text']
      })
    
    return data
  },
  
  async removeFavorite(artistName) {
    const { data: user } = await supabase.auth.getUser()
    if (!user) throw new Error('Não autenticado')
    
    const { error } = await supabase
      .from('favorites')
      .delete()
      .eq('user_id', user.id)
      .eq('artist_name', artistName)
    
    if (error) throw error
  },
  
  async isFavorite(artistName) {
    const { data: user } = await supabase.auth.getUser()
    if (!user) return false
    
    const { data, error } = await supabase
      .from('favorites')
      .select('id')
      .eq('user_id', user.id)
      .eq('artist_name', artistName)
      .single()
    
    return !!data && !error
  },
  
  // ========== HISTÓRICO ==========
  async addToHistory(query) {
    const { data: user } = await supabase.auth.getUser()
    if (!user) return
    
    await supabase
      .from('search_history')
      .insert({
        user_id: user.id,
        query: query
      })
  },
  
  async getHistory(limit = 10) {
    const { data: user } = await supabase.auth.getUser()
    if (!user) return []
    
    const { data, error } = await supabase
      .from('search_history')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(limit)
    
    return data || []
  },
  
  async clearHistory() {
    const { data: user } = await supabase.auth.getUser()
    if (!user) throw new Error('Não autenticado')
    
    const { error } = await supabase
      .from('search_history')
      .delete()
      .eq('user_id', user.id)
    
    if (error) throw error
  },
  
  // ========== PLAYLISTS ==========
  async getPlaylists() {
    const { data: user } = await supabase.auth.getUser()
    if (!user) return []
    
    const { data, error } = await supabase
      .from('playlists')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
    
    return data || []
  },
  
  async createPlaylist(name, description = '') {
    const { data: user } = await supabase.auth.getUser()
    if (!user) throw new Error('Não autenticado')
    
    const { data, error } = await supabase
      .from('playlists')
      .insert({
        user_id: user.id,
        name: name,
        description: description
      })
      .select()
      .single()
    
    if (error) throw error
    return data
  },
  
  async deletePlaylist(playlistId) {
    const { error } = await supabase
      .from('playlists')
      .delete()
      .eq('id', playlistId)
    
    if (error) throw error
  },
  
  async addToPlaylist(playlistId, track) {
    const { data, error } = await supabase
      .from('playlist_tracks')
      .insert({
        playlist_id: playlistId,
        track_name: track.name,
        artist_name: track.artist?.name || 'Desconhecido',
        lastfm_url: track.url
      })
    
    if (error) throw error
    return data
  },
  
  async getPlaylistTracks(playlistId) {
    const { data, error } = await supabase
      .from('playlist_tracks')
      .select('*')
      .eq('playlist_id', playlistId)
      .order('added_at', { ascending: false })
    
    return data || []
  },
  
  async removeFromPlaylist(trackId) {
    const { error } = await supabase
      .from('playlist_tracks')
      .delete()
      .eq('id', trackId)
    
    if (error) throw error
  },
  
  // ========== ESTATÍSTICAS ==========
  async getUserStats() {
    const { data: user } = await supabase.auth.getUser()
    if (!user) return null
    
    const [
      { count: favoritesCount },
      { count: historyCount },
      { count: playlistsCount }
    ] = await Promise.all([
      supabase.from('favorites').select('*', { count: 'exact', head: true }).eq('user_id', user.id),
      supabase.from('search_history').select('*', { count: 'exact', head: true }).eq('user_id', user.id),
      supabase.from('playlists').select('*', { count: 'exact', head: true }).eq('user_id', user.id)
    ])
    
    return {
      favorites: favoritesCount || 0,
      searches: historyCount || 0,
      playlists: playlistsCount || 0,
      memberSince: user.created_at
    }
  }
}