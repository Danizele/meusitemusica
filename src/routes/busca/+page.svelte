<script>
  import { searchArtists, getArtistInfo, getTopTracks } from '$lib/api/lastfm';
  import { onMount } from 'svelte';
  
  let searchQuery = '';
  let artists = [];
  let selectedArtist = null;
  let topTracks = [];
  let isLoading = false;
  let error = null;
  
  // Função para obter a melhor imagem disponível
  function getArtistImage(artist, size = 'large') {
    // Tamanhos: small, medium, large, extralarge, mega
    const sizeIndex = {
      'small': 0,
      'medium': 1,
      'large': 2,
      'extralarge': 3,
      'mega': 4
    };
    
    if (artist.image && artist.image[sizeIndex[size]] && artist.image[sizeIndex[size]]['#text']) {
      return artist.image[sizeIndex[size]]['#text'];
    }
    
    // Fallback para imagem padrão
    return 'https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png';
  }
  
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
      
      // Log para debug das imagens
      console.log('Artista selecionado:', {
        name: selectedArtist.name,
        images: selectedArtist.image,
        bestImage: getArtistImage(selectedArtist, 'extralarge')
      });
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
    try {
      // Busca artistas populares para exemplo
      artists = await searchArtists('the weeknd');
      console.log('Artistas carregados:', artists);
    } catch (err) {
      console.error('Erro ao carregar artistas iniciais:', err);
    } finally {
      isLoading = false;
    }
  });
</script>

<main class="search-page">
  <!-- HEADER -->
  <header class="search-header">
    <button class="back-btn" on:click={() => history.back()}>←</button>
    <h1>🔍 Buscar Artistas</h1>
  </header>
  
  <!-- BARRA DE BUSCA -->
  <div class="search-bar-container">
    <div class="search-input-group">
      <input
        type="text"
        bind:value={searchQuery}
        placeholder="Digite o nome do artista..."
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
      <!-- DETALHES DO ARTISTA COM FOTO GRANDE -->
      <div class="artist-details">
        <button on:click={() => selectedArtist = null} class="back-to-results">
          ← Voltar aos resultados
        </button>
        
        <div class="artist-header">
          <div class="artist-image-large">
            <img 
              src={getArtistImage(selectedArtist, 'extralarge')} 
              alt={selectedArtist.name}
              on:error={(e) => {
                e.target.src = 'https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png';
              }}
            />
          </div>
          
          <div class="artist-info">
            <h2>{selectedArtist.name}</h2>
            
            {#if selectedArtist.stats?.listeners}
              <p class="listeners">
                👂 {selectedArtist.stats.listeners.toLocaleString()} ouvintes
              </p>
            {/if}
            
            {#if selectedArtist.stats?.playcount}
              <p class="playcount">
                ▶️ {selectedArtist.stats.playcount.toLocaleString()} plays
              </p>
            {/if}
            
            {#if selectedArtist.bio?.summary}
              <div class="bio">
                <h3>📖 Biografia</h3>
                <div class="bio-content">
                  {@html selectedArtist.bio.summary
                    .replace(/<a\b[^>]*>(.*?)<\/a>/gi, '$1')
                    .replace(/User-contributed text is available.*$/gi, '')
                    .substring(0, 500) + '...'}
                </div>
              </div>
            {/if}
            
            {#if selectedArtist.tags?.tag}
              <div class="tags">
                <h3>🏷️ Tags</h3>
                <div class="tags-list">
                  {#each selectedArtist.tags.tag.slice(0, 5) as tag}
                    <span class="tag">{tag.name}</span>
                  {/each}
                </div>
              </div>
            {/if}
          </div>
        </div>
        
        <!-- TOP TRACKS -->
        <div class="top-tracks">
          <h3>🎵 Top Músicas</h3>
          <div class="tracks-list">
            {#each topTracks.slice(0, 10) as track, index}
              <div class="track-item">
                <span class="track-number">{index + 1}.</span>
                <div class="track-info">
                  <span class="track-name">{track.name}</span>
                  {#if track.listeners}
                    <span class="track-listeners">
                      👂 {track.listeners.toLocaleString()} plays
                    </span>
                  {/if}
                </div>
                <button class="play-track-btn" title="Ouvir prévia">▶</button>
              </div>
            {/each}
          </div>
        </div>
      </div>
      
    {:else}
      <!-- LISTA DE ARTISTAS COM FOTOS -->
      <div class="artists-grid">
        {#each artists as artist}
          <div class="artist-card" on:click={() => selectArtist(artist)}>
            <div class="artist-card-image">
              <img 
                src={getArtistImage(artist, 'medium')} 
                alt={artist.name}
                on:error={(e) => {
                  e.target.src = 'https://lastfm.freetls.fastly.net/i/u/174s/2a96cbd8b46e442fc41c2b86b821562f.png';
                  e.target.onerror = null;
                }}
              />
              <div class="image-overlay">
                <span class="view-details">Ver detalhes</span>
              </div>
            </div>
            <div class="artist-card-info">
              <h3>{artist.name}</h3>
              {#if artist.listeners}
                <p class="artist-listeners">
                  👂 {parseInt(artist.listeners).toLocaleString()} ouvintes
                </p>
              {/if}
            </div>
          </div>
        {/each}
      </div>
      
      {#if artists.length === 0 && !isLoading && searchQuery}
        <div class="empty-state">
          <div class="empty-icon">🎤</div>
          <p>Nenhum artista encontrado para "<strong>{searchQuery}</strong>"</p>
          <p class="suggestion">Tente buscar por: "The Weeknd", "Taylor Swift", "Coldplay", "Anitta"</p>
        </div>
      {/if}
    {/if}
    
    {#if isLoading}
      <div class="loading-spinner">
        <div class="spinner"></div>
        <p>Carregando artistas...</p>
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
  
  /* GRID DE ARTISTAS COM FOTOS */
  .artists-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1.5rem;
  }
  
  .artist-card {
    background: #181818;
    border-radius: 8px;
    overflow: hidden;
    cursor: pointer;
    transition: transform 0.2s, background 0.2s;
  }
  
  .artist-card:hover {
    transform: translateY(-5px);
    background: #282828;
  }
  
  .artist-card-image {
    position: relative;
    width: 100%;
    aspect-ratio: 1;
    overflow: hidden;
  }
  
  .artist-card-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s;
  }
  
  .artist-card:hover .artist-card-image img {
    transform: scale(1.05);
  }
  
  .image-overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: linear-gradient(transparent, rgba(0,0,0,0.8));
    padding: 1rem;
    opacity: 0;
    transition: opacity 0.3s;
  }
  
  .artist-card:hover .image-overlay {
    opacity: 1;
  }
  
  .view-details {
    color: #fff;
    font-size: 0.875rem;
    font-weight: bold;
  }
  
  .artist-card-info {
    padding: 1rem;
  }
  
  .artist-card-info h3 {
    margin: 0 0 0.25rem 0;
    font-size: 1rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  .artist-listeners {
    margin: 0;
    color: #b3b3b3;
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
    gap: 3rem;
    margin-bottom: 3rem;
    align-items: flex-start;
  }
  
  .artist-image-large {
    width: 300px;
    height: 300px;
    border-radius: 8px;
    overflow: hidden;
    flex-shrink: 0;
    box-shadow: 0 8px 32px rgba(0,0,0,0.5);
  }
  
  .artist-image-large img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .artist-info {
    flex: 1;
  }
  
  .artist-info h2 {
    font-size: 2.5rem;
    margin: 0 0 1rem 0;
  }
  
  .listeners, .playcount {
    color: #1db954;
    font-size: 1rem;
    margin: 0 0 1rem 0;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .bio h3 {
    margin: 2rem 0 0.5rem 0;
    font-size: 1.25rem;
  }
  
  .bio-content {
    color: #b3b3b3;
    line-height: 1.6;
    max-height: 200px;
    overflow-y: auto;
    padding-right: 1rem;
  }
  
  .tags h3 {
    margin: 2rem 0 0.5rem 0;
    font-size: 1.25rem;
  }
  
  .tags-list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
  
  .tag {
    background: #333;
    color: #fff;
    padding: 0.25rem 0.75rem;
    border-radius: 20px;
    font-size: 0.875rem;
  }
  
  /* TOP TRACKS */
  .top-tracks {
    background: #121212;
    border-radius: 12px;
    padding: 2rem;
  }
  
  .top-tracks h3 {
    margin: 0 0 1.5rem 0;
    font-size: 1.5rem;
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
    padding: 1rem;
    border-radius: 8px;
    transition: background 0.2s;
  }
  
  .track-item:hover {
    background: rgba(255, 255, 255, 0.05);
  }
  
  .track-number {
    color: #b3b3b3;
    font-weight: bold;
    min-width: 30px;
    text-align: center;
  }
  
  .track-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }
  
  .track-name {
    font-weight: bold;
    font-size: 1rem;
  }
  
  .track-listeners {
    color: #b3b3b3;
    font-size: 0.875rem;
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }
  
  .play-track-btn {
    background: #1db954;
    color: white;
    border: none;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    transition: transform 0.2s;
  }
  
  .play-track-btn:hover {
    transform: scale(1.1);
  }
  
  /* EMPTY STATE */
  .empty-state {
    text-align: center;
    padding: 4rem 1rem;
    color: #b3b3b3;
  }
  
  .empty-icon {
    font-size: 4rem;
    margin-bottom: 1rem;
    opacity: 0.5;
  }
  
  .empty-state p {
    margin: 0.5rem 0;
  }
  
  .suggestion {
    font-size: 0.875rem;
    margin-top: 1rem;
    color: #666;
  }
  
  /* LOADING */
  .loading-spinner {
    text-align: center;
    padding: 4rem 1rem;
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
  
  /* RESPONSIVO */
  @media (max-width: 768px) {
    .artist-header {
      flex-direction: column;
      gap: 2rem;
    }
    
    .artist-image-large {
      width: 100%;
      height: auto;
      aspect-ratio: 1;
    }
    
    .artists-grid {
      grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    }
  }
</style>