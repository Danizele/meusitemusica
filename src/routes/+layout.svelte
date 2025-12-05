<nav style="
  background: #000;
  padding: 1rem 2rem;
  display: flex;
  gap: 2rem;
  border-bottom: 1px solid #333;
">
  <a href="/" style="color: #1db954; text-decoration: none; font-weight: bold;">
    🎵 MusicApp
  </a>
  <a href="/" style="color: #b3b3b3; text-decoration: none;">
    🏠 Home
  </a>
  <a href="/busca" style="color: #b3b3b3; text-decoration: none;">
    🔍 Buscar
  </a>
  <a href="/musicas" style="color: #b3b3b3; text-decoration: none;">
    🎵 Playlists
  </a>
  <a href="/login" style="color: #1db954; text-decoration: none; margin-left: auto;">
    👤 Entrar
  </a>
</nav>

<slot />

<style>
  nav a:hover {
    color: white;
  }
</style>