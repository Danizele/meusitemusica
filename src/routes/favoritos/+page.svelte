<script>
  import { dbService } from '$lib/services/database'
  import { authService } from '$lib/services/auth'
  import { onMount } from 'svelte'
  
  let favorites = []
  let isLoading = true
  let user = null
  
  onMount(async () => {
    try {
      user = await authService.getUser()
      if (user) {
        await loadFavorites()
      }
    } catch (error) {
      console.error(error)
    } finally {
      isLoading = false
    }
  })
  
  async function loadFavorites() {
    favorites = await dbService.getFavorites()
  }
  
  async function removeFavorite(artistName) {
    if (!confirm('Remover dos favoritos?')) return
    
    try {
      await dbService.removeFavorite(artistName)
      favorites = favorites.filter(f => f.artist_name !== artistName)
    } catch (error) {
      alert('Erro ao remover favorito')
    }
  }
  
  function searchArtist(name) {
    window.location.href = `/busca?q=${encodeURIComponent(name)}`
  }
</script>

<main class="favorites-page">
  <header class="page-header">
    <h1>❤️ Meus Favoritos</h1>
    <p>{favorites.length} artistas favoritados</p>
  </header>
  
  {#if !user}
    <div class="auth-prompt">
      <p>Faça login para ver seus favoritos</p>
      <a href="/login" class="auth-btn">Entrar / Cadastrar</a>
    </div>
  
  {:else if isLoading}
    <div class="loading">
      <div class="spinner"></div>
      <p>Carregando favoritos...</p>
    </div>
  
  {:else if favorites.length === 0}
    <div class="empty-state">
      <p>Você ainda não tem artistas favoritos</p>
      <p>Busque por seus artistas favoritos e clique no coração!</p>
      <a href="/busca" class="browse-btn">Buscar Artistas</a>
    </div>
  
  {:else}
    <div class="favorites-grid">
      {#each favorites as fav}
        <div class="favorite-card">
          <div class="fav-image">
            {#if fav.image_url}
              <img src={fav.image_url} alt={fav.artist_name} />
            {:else}
              <div class="img-placeholder">🎤</div>
            {/if}
          </div>
          
          <div class="fav-info">
            <h3>{fav.artist_name}</h3>
            <p class="fav-date">Favoritado em {new Date(fav.created_at).toLocaleDateString('pt-BR')}</p>
          </div>
          
          <div class="fav-actions">
            <button on:click={() => searchArtist(fav.artist_name)} class="search-btn">
              🔍 Ver
            </button>
            <button on:click={() => removeFavorite(fav.artist_name)} class="remove-btn">
              ❌ Remover
            </button>
          </div>
        </div>
      {/each}
    </div>
  {/if}
</main>

<style>
  .favorites-page {
    background: #000;
    color: #fff;
    min-height: 100vh;
    padding: 2rem;
  }
  
  .page-header {
    margin-bottom: 2rem;
  }
  
  .page-header h1 {
    margin: 0 0 0.5rem 0;
    font-size: 2rem;
  }
  
  .page-header p {
    color: #b3b3b3;
    margin: 0;
  }
  
  .auth-prompt, .empty-state {
    text-align: center;
    padding: 4rem 2rem;
    background: #121212;
    border-radius: 12px;
    margin-top: 2rem;
  }
  
  .auth-btn, .browse-btn {
    display: inline-block;
    background: #1db954;
    color: #fff;
    padding: 0.75rem 1.5rem;
    border-radius: 25px;
    text-decoration: none;
    font-weight: bold;
    margin-top: 1rem;
  }
  
  .favorites-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1rem;
  }
  
  .favorite-card {
    background: #181818;
    border-radius: 8px;
    padding: 1.5rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    transition: transform 0.2s;
  }
  
  .favorite-card:hover {
    transform: translateY(-2px);
    background: #282828;
  }
  
  .fav-image {
    width: 60px;
    height: 60px;
    border-radius: 4px;
    overflow: hidden;
    flex-shrink: 0;
  }
  
  .fav-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .img-placeholder {
    width: 100%;
    height: 100%;
    background: #333;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
  }
  
  .fav-info {
    flex: 1;
  }
  
  .fav-info h3 {
    margin: 0 0 0.25rem 0;
    font-size: 1rem;
  }
  
  .fav-date {
    color: #b3b3b3;
    font-size: 0.75rem;
    margin: 0;
  }
  
  .fav-actions {
    display: flex;
    gap: 0.5rem;
  }
  
  .search-btn, .remove-btn {
    padding: 0.5rem 0.75rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.875rem;
  }
  
  .search-btn {
    background: #1db954;
    color: #fff;
  }
  
  .remove-btn {
    background: #ff375f;
    color: #fff;
  }
  
  .loading {
    text-align: center;
    padding: 4rem;
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
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
</style>