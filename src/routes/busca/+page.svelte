<script>
  import { searchArtists, getArtistInfo, getTopTracks } from '$lib/api/lastfm';
  import { onMount } from 'svelte';
  
  let searchQuery = '';
  let artists = [];
  let selectedArtist = null;
  let topTracks = [];
  let isLoading = false;
  let error = null;
  
  async function handleSearch() {
    if (!searchQuery.trim()) return;
    
    isLoading = true;
    error = null;
    
    try {
      artists = await searchArtists(searchQuery);
      
      if (artists.length === 0) {
        error = 'Nenhum artista encontrado. Tente outro nome.';
      }
    } catch (err) {
      error = 'Erro ao buscar artistas. Tente novamente.';
      console.error(err);
    } finally {
      isLoading = false;
    }
  }
  
  async function selectArtist(artist) {
    isLoading = true;
    
    try {
      const [artistInfo, tracks] = await Promise.all([
        getArtistInfo(artist.name),
        getTopTracks(artist.name)
      ]);
      
      selectedArtist = {
        ...artist,
        ...artistInfo,
        topTracks: tracks
      };
      topTracks = tracks;
    } catch (err) {
      error = 'Erro ao carregar informações do artista.';
      console.error(err);
    } finally {
      isLoading = false;
    }
  }
  
  function clearSearch() {
    searchQuery = '';
    artists = [];
    selectedArtist = null;
    topTracks = [];
    error = null;
  }
  
  // Buscar alguns artistas populares ao carregar a página
  onMount(async () => {
    isLoading = true;
    artists = await searchArtists('the weeknd');
    isLoading = false;
  });
</script>

<main class="search-page">
  <!-- HEADER -->
  <header class="search-header">
    <button class="back-btn" on:click={() => history.back()}>←</button>
    <h1>🔍 Buscar Música</h1>
  </header>
  
  <!-- BARRA DE BUSCA -->
  <div class="search-bar-container">
    <div class="search-input-group">
      <input
        type="text"
        bind:value={searchQuery}
        placeholder="Buscar artistas, músicas..."
        on:keydown={(e) => e.key === 'Enter' && handleSearch()}
        class="search-input"
      />
      <button on:click={handleSearch} class="search-btn" disabled={isLoading}>
        {isLoading ? 'Buscando...' : 'Buscar'}
      </button>
    </div>
    
    {#if searchQuery}
      <button on:click={clearSearch} class="clear-btn">Limpar</button>
    {/if}
  </div>
  
  <!-- MENSAGEM DE ERRO -->
  {#if error}
    <div class="error-message">
      ⚠️ {error}
    </div>
  {/if}
  
  <!-- RESULTADOS -->
  <div class="results-container">
    {#if selectedArtist}
      <!-- DETALHES DO ARTISTA -->
      <div class="artist-details">
        <button on:click={() => selectedArtist = null} class="back-to-results">
          ← Voltar aos resultados
        </button>
        
        <div class="artist-header">
          <div class="artist-image">
            {#if selectedArtist.image?.[2]?.['#text']}
              <img src={selectedArtist.image[2]['#text']} alt={selectedArtist.name} />
            {:else}
              <div class="artist-image-placeholder">🎤</div>
            {/if}
          </div>
          
          <div class="artist-info">
            <h2>{selectedArtist.name}</h2>
            {#if selectedArtist.stats?.listeners}
              <p class="listeners">{selectedArtist.stats.listeners.toLocaleString()} ouvintes</p>
            {/if}
            {#if selectedArtist.bio?.summary}
              <div class="bio">
                <h3>Biografia</h3>
                <p>{selectedArtist.bio.summary.replace(/<a[^>]*>.*?<\/a>/g, '')}</p>
              </div>
            {/if}
          </div>
        </div>
        
        <!-- TOP TRACKS -->
        <div class="top-tracks">
          <h3>🎵 Top Músicas</h3>
          <div class="tracks-list">
            {#each topTracks as track, index}
              <div class="track-item">
                <span class="track-number">{index + 1}.</span>
                <div class="track-info">
                  <span class="track-name">{track.name}</span>
                  {#if track.listeners}
                    <span class="track-listeners">{track.listeners.toLocaleString()} plays</span>
                  {/if}
                </div>
                <button class="play-track-btn" title="Ouvir prévia">▶</button>
              </div>
            {/each}
          </div>
        </div>
      </div>
      
    {:else}
      <!-- LISTA DE ARTISTAS -->
      <div class="artists-grid">
        {#each artists as artist}
          <div class="artist-card" on:click={() => selectArtist(artist)}>
            <div class="artist-card-image">
              {#if artist.image?.[1]?.['#text']}
                <img src={artist.image[1]['#text']} alt={artist.name} />
              {:else}
                <div class="image-placeholder">🎤</div>
              {/if}
            </div>
            <div class="artist-card-info">
              <h3>{artist.name}</h3>
              <p class="artist-listeners">
                {artist.listeners ? `${parseInt(artist.listeners).toLocaleString()} ouvintes` : 'Artista'}
              </p>
            </div>
            <div class="artist-card-action">
              <button class="view-btn">Ver detalhes →</button>
            </div>
          </div>
        {/each}
      </div>
      
      {#if artists.length === 0 && !isLoading && searchQuery}
        <div class="empty-state">
          <p>Nenhum artista encontrado para "{searchQuery}"</p>
          <p class="suggestion">Tente buscar por: "The Weeknd", "Taylor Swift", "Coldplay"</p>
        </div>
      {/if}
    {/if}
    
    {#if isLoading}
      <div class="loading-spinner">
        <div class="spinner"></div>
        <p>Carregando dados da API...</p>
      </div>
    {/if}
  </div>
</main>

<style>
  /* ESTILOS GERAIS */
  .search-page {
    background: #000;
    color: #fff;
    min-height: 100vh;
    padding: 1rem;
  }
  
  .search-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 2rem;
    padding: 1rem 0;
    border-bottom: 1px solid #333;
  }
  
  .back-btn {
    background: #333;
    color: #fff;
    border: none;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    cursor: pointer;
    font-size: 1.2rem;
  }
  
  .search-header h1 {
    margin: 0;
    font-size: 1.5rem;
  }
  
  /* BARRA DE BUSCA */
  .search-bar-container {
    margin-bottom: 2rem;
  }
  
  .search-input-group {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
  }
  
  .search-input {
    flex: 1;
    padding: 0.75rem 1rem;
    border: 2px solid #333;
    border-radius: 25px;
    background: #121212;
    color: #fff;
    font-size: 1rem;
  }
  
  .search-input:focus {
    outline: none;
    border-color: #1db954;
  }
  
  .search-btn {
    background: #1db954;
    color: #fff;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 25px;
    cursor: pointer;
    font-weight: bold;
  }
  
  .search-btn:disabled {
    background: #535353;
    cursor: not-allowed;
  }
  
  .clear-btn {
    background: transparent;
    color: #b3b3b3;
    border: none;
    cursor: pointer;
    font-size: 0.875rem;
  }
  
  .clear-btn:hover {
    color: #fff;
  }
  
  /* MENSAGENS */
  .error-message {
    background: rgba(255, 50, 50, 0.1);
    border: 1px solid #ff3232;
    color: #ff3232;
    padding: 1rem;
    border-radius: 8px;
    margin-bottom: 1rem;
  }
  
  /* GRID DE ARTISTAS */
  .artists-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1rem;
  }
  
  .artist-card {
    background: #181818;
    border-radius: 8px;
    padding: 1rem;
    cursor: pointer;
    transition: background 0.2s;
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  
  .artist-card:hover {
    background: #282828;
  }
  
  .artist-card-image {
    width: 60px;
    height: 60px;
    border-radius: 4px;
    overflow: hidden;
  }
  
  .artist-card-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .image-placeholder {
    width: 100%;
    height: 100%;
    background: #333;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
  }
  
  .artist-card-info {
    flex: 1;
  }
  
  .artist-card-info h3 {
    margin: 0 0 0.25rem 0;
    font-size: 1rem;
  }
  
  .artist-listeners {
    margin: 0;
    color: #b3b3b3;
    font-size: 0.875rem;
  }
  
  .view-btn {
    background: transparent;
    color: #1db954;
    border: none;
    cursor: pointer;
    font-size: 0.875rem;
  }
  
  /* DETALHES DO ARTISTA */
  .artist-details {
    animation: fadeIn 0.3s ease;
  }
  
  .back-to-results {
    background: transparent;
    color: #b3b3b3;
    border: none;
    cursor: pointer;
    margin-bottom: 1rem;
    font-size: 0.875rem;
  }
  
  .artist-header {
    display: flex;
    gap: 2rem;
    margin-bottom: 2rem;
    align-items: flex-start;
  }
  
  .artist-image {
    width: 200px;
    height: 200px;
    border-radius: 8px;
    overflow: hidden;
    flex-shrink: 0;
  }
  
  .artist-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .artist-image-placeholder {
    width: 100%;
    height: 100%;
    background: #333;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 4rem;
  }
  
  .artist-info h2 {
    font-size: 2rem;
    margin: 0 0 0.5rem 0;
  }
  
  .listeners {
    color: #1db954;
    font-weight: bold;
    margin: 0 0 1rem 0;
  }
  
  .bio h3 {
    margin: 0 0 0.5rem 0;
    font-size: 1.25rem;
  }
  
  .bio p {
    color: #b3b3b3;
    line-height: 1.6;
    max-height: 200px;
    overflow-y: auto;
    padding-right: 1rem;
  }
  
  /* TOP TRACKS */
  .top-tracks {
    background: #121212;
    border-radius: 8px;
    padding: 1.5rem;
  }
  
  .top-tracks h3 {
    margin: 0 0 1rem 0;
    font-size: 1.25rem;
  }
  
  .tracks-list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .track-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.75rem;
    border-radius: 4px;
    transition: background 0.2s;
  }
  
  .track-item:hover {
    background: rgba(255, 255, 255, 0.05);
  }
  
  .track-number {
    color: #b3b3b3;
    font-weight: bold;
    min-width: 30px;
  }
  
  .track-info {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  
  .track-name {
    font-weight: bold;
  }
  
  .track-listeners {
    color: #b3b3b3;
    font-size: 0.875rem;
  }
  
  .play-track-btn {
    background: transparent;
    color: #1db954;
    border: 2px solid #1db954;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  /* STATES */
  .empty-state {
    text-align: center;
    padding: 3rem 1rem;
    color: #b3b3b3;
  }
  
  .suggestion {
    font-size: 0.875rem;
    margin-top: 0.5rem;
  }
  
  .loading-spinner {
    text-align: center;
    padding: 3rem 1rem;
  }
  
  .spinner {
    border: 3px solid #333;
    border-top: 3px solid #1db954;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spin 1s linear infinite;
    margin: 0 auto 1rem;
  }
  
  /* ANIMAÇÕES */
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
</style>