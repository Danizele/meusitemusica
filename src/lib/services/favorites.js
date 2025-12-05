import { supabase } from '$lib/supabase'

export const favoritesService = {
  // Adicionar artista aos favoritos
  async addFavorite(artist) {
    const { data: user } = await supabase.auth.getUser()
    if (!user) throw new Error('Usuário não autenticado')
    
    const { data, error } = await supabase
      .from('favorites')
      .insert({
        user_id: user.id,
        artist_name: artist.name,
        artist_mbid: artist.mbid,
        lastfm_url: artist.url,
        image_url: artist.image?.[1]?.['#text']
      })
      .select()
      .single()
    
    if (error) throw error
    return data
  },
  
  // Remover dos favoritos
  async removeFavorite(artistName) {
    const { data: user } = await supabase.auth.getUser()
    if (!user) throw new Error('Usuário não autenticado')
    
    const { error } = await supabase
      .from('favorites')
      .delete()
      .eq('user_id', user.id)
      .eq('artist_name', artistName)
    
    if (error) throw error
  },
  
  // Verificar se artista é favorito
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
  
  // Listar favoritos do usuário
  async getUserFavorites() {
    const { data: user } = await supabase.auth.getUser()
    if (!user) return []
    
    const { data, error } = await supabase
      .from('favorites')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  }
}