const API_KEY = '14d3a4c54824c1d12723bc2968ba3083'; // SUA KEY AQUI!
const BASE_URL = 'https://ws.audioscrobbler.com/2.0/';

// Função genérica para fazer requests
async function lastfmRequest(params) {
  try {
    const urlParams = new URLSearchParams({
      api_key: API_KEY,
      format: 'json',
      ...params
    });
    
    const response = await fetch(`${BASE_URL}?${urlParams}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Verifica se há erro na resposta da API
    if (data.error) {
      console.error('Last.fm API Error:', data.message);
      throw new Error(data.message);
    }
    
    return data;
  } catch (error) {
    console.error('Request failed:', error);
    throw error;
  }
}

export async function searchArtists(query, limit = 12) {
  try {
    const data = await lastfmRequest({
      method: 'artist.search',
      artist: query,
      limit: limit
    });
    
    return data.results?.artistmatches?.artist || [];
  } catch (error) {
    console.error('Erro ao buscar artistas:', error);
    return [];
  }
}

export async function getArtistInfo(artistName) {
  try {
    const data = await lastfmRequest({
      method: 'artist.getinfo',
      artist: artistName,
      lang: 'pt'
    });
    
    return data.artist || null;
  } catch (error) {
    console.error('Erro ao buscar info do artista:', error);
    return null;
  }
}

export async function getTopTracks(artistName, limit = 10) {
  try {
    const data = await lastfmRequest({
      method: 'artist.gettoptracks',
      artist: artistName,
      limit: limit
    });
    
    return data.toptracks?.track || [];
  } catch (error) {
    console.error('Erro ao buscar top tracks:', error);
    return [];
  }
}

// NOVA FUNÇÃO: Buscar músicas populares no momento
export async function getChartTopTracks(limit = 10) {
  try {
    const data = await lastfmRequest({
      method: 'chart.gettoptracks',
      limit: limit
    });
    
    return data.tracks?.track || [];
  } catch (error) {
    console.error('Erro ao buscar chart:', error);
    return [];
  }
}

// NOVA FUNÇÃO: Buscar por música
export async function searchTracks(query, limit = 10) {
  try {
    const data = await lastfmRequest({
      method: 'track.search',
      track: query,
      limit: limit
    });
    
    return data.results?.trackmatches?.track || [];
  } catch (error) {
    console.error('Erro ao buscar músicas:', error);
    return [];
  }
}