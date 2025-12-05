<script>
  import { dbService } from '$lib/services/database'
  import { authService } from '$lib/services/auth'
  import { onMount } from 'svelte'
  import { goto } from '$app/navigation'
  
  let user = null
  let stats = null
  let isLoading = true
  
  onMount(async () => {
    try {
      user = await authService.getUser()
      if (user) {
        stats = await dbService.getUserStats()
      }
    } catch (error) {
      console.error(error)
    } finally {
      isLoading = false
    }
  })
  
  async function handleLogout() {
    try {
      await authService.signOut()
      goto('/')
    } catch (error) {
      alert('Erro ao sair')
    }
  }
  
  function formatDate(dateString) {
    const date = new Date(dateString)
    return date.toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }
</script>

<main class="profile-page">
  {#if !user}
    <div class="auth-required">
      <h2>🔒 Acesso Restrito</h2>
      <p>Faça login para ver seu perfil</p>
      <a href="/login" class="login-link">Entrar / Cadastrar</a>
    </div>
  
  {:else if isLoading}
    <div class="loading">
      <div class="spinner"></div>
      <p>Carregando perfil...</p>
    </div>
  
  {:else}
    <header class="profile-header">
      <div class="avatar">
        {user.email?.charAt(0).toUpperCase()}
      </div>
      <div class="profile-info">
        <h1>{user.email}</h1>
        <p class="member-since">Membro desde {formatDate(user.created_at)}</p>
      </div>
    </header>
    
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon">❤️</div>
        <div class="stat-info">
          <h3>Favoritos</h3>
          <p class="stat-value">{stats?.favorites || 0} artistas</p>
        </div>
        <a href="/favoritos" class="stat-link">Ver todos →</a>
      </div>
      
      <div class="stat-card">
        <div class="stat-icon">🔍</div>
        <div class="stat-info">
          <h3>Buscas</h3>
          <p class="stat-value">{stats?.searches || 0} pesquisas</p>
        </div>
        <a href="/busca" class="stat-link">Buscar mais →</a>
      </div>
      
      <div class="stat-card">
        <div class="stat-icon">🎵</div>
        <div class="stat-info">
          <h3>Playlists</h3>
          <p class="stat-value">{stats?.playlists || 0} criadas</p>
        </div>
        <a href="/playlists" class="stat-link">Gerenciar →</a>
      </div>
    </div>
    
    <div class="profile-actions">
      <h2>Configurações</h2>
      <div class="actions-list">
        <button on:click={() => goto('/favoritos')} class="action-btn">
          <span>❤️</span> Meus Favoritos
        </button>
        <button on:click={() => goto('/busca')} class="action-btn">
          <span>🔍</span> Buscar Música
        </button>
        <button on:click={() => goto('/playlists')} class="action-btn">
          <span>🎵</span> Minhas Playlists
        </button>
        <button on:click={handleLogout} class="action-btn logout">
          <span>🚪</span> Sair da Conta
        </button>
      </div>
    </div>
  {/if}
</main>

<style>
  .profile-page {
    background: #000;
    color: #fff;
    min-height: 100vh;
    padding: 2rem;
  }
  
  .auth-required {
    text-align: center;
    padding: 4rem 2rem;
    background: #121212;
    border-radius: 12px;
    margin-top: 4rem;
  }
  
  .login-link {
    display: inline-block;
    background: #1db954;
    color: #fff;
    padding: 0.75rem 1.5rem;
    border-radius: 25px;
    text-decoration: none;
    margin-top: 1rem;
    font-weight: bold;
  }
  
  .profile-header {
    display: flex;
    align-items: center;
    gap: 2rem;
    margin-bottom: 3rem;
    padding-bottom: 2rem;
    border-bottom: 1px solid #333;
  }
  
  .avatar {
    width: 80px;
    height: 80px;
    background: #1db954;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    font-weight: bold;
  }
  
  .profile-info h1 {
    margin: 0 0 0.5rem 0;
    font-size: 1.5rem;
  }
  
  .member-since {
    color: #b3b3b3;
    margin: 0;
  }
  
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1rem;
    margin-bottom: 3rem;
  }
  
  .stat-card {
    background: #121212;
    padding: 1.5rem;
    border-radius: 12px;
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  
  .stat-icon {
    font-size: 2rem;
  }
  
  .stat-info {
    flex: 1;
  }
  
  .stat-info h3 {
    margin: 0 0 0.25rem 0;
    font-size: 0.875rem;
    color: #b3b3b3;
  }
  
  .stat-value {
    margin: 0;
    font-size: 1.5rem;
    font-weight: bold;
  }
  
  .stat-link {
    color: #1db954;
    text-decoration: none;
    font-size: 0.875rem;
    white-space: nowrap;
  }
  
  .profile-actions {
    background: #121212;
    padding: 2rem;
    border-radius: 12px;
  }
  
  .profile-actions h2 {
    margin: 0 0 1.5rem 0;
    font-size: 1.25rem;
  }
  
  .actions-list {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .action-btn {
    background: #181818;
    color: #fff;
    border: none;
    padding: 1rem 1.5rem;
    border-radius: 8px;
    text-align: left;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 1rem;
    font-size: 1rem;
    transition: background 0.2s;
  }
  
  .action-btn:hover {
    background: #282828;
  }
  
  .action-btn.logout {
    color: #ff375f;
    margin-top: 1rem;
  }
  
  .action-btn span {
    font-size: 1.2rem;
  }
</style>