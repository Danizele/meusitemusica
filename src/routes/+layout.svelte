<nav>
  <a href="/">🏠 Home</a>
  <a href="/busca">🔍 Buscar</a>
  <a href="/musicas">🎵 Playlists</a>
</nav>

<slot />

<style>
  nav {
    background: #000;
    padding: 1rem 2rem;
    display: flex;
    gap: 2rem;
    border-bottom: 1px solid #333;
  }
  
  nav a {
    color: #b3b3b3;
    text-decoration: none;
    font-weight: bold;
    transition: color 0.2s;
  }
  
  nav a:hover {
    color: #fff;
  }
</style>