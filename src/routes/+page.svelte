<script>
  import { goto } from '$app/navigation';
  
  function verPlaylists() {
    goto('/musicas');
  }
  
  function verBusca() {
    goto('/busca');
  }
</script>

<main style="
  background: #000;
  color: white;
  min-height: 100vh;
  padding: 2rem;
  text-align: center;
  font-family: Arial, sans-serif;
">
  <h1 style="color: #1db954; font-size: 3rem; margin-bottom: 1rem;">
    🎵 Meu Site de Música
  </h1>
  
  <p style="font-size: 1.2rem; color: #b3b3b3; max-width: 600px; margin: 0 auto 3rem;">
    Site desenvolvido com Svelte para meu último trabalho de Programação.
    <br>
    Explore artistas, playlists e muito mais!
  </p>
  
  <div style="
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
    max-width: 800px;
    margin: 0 auto 3rem;
  ">
    <div style="
      background: #121212;
      padding: 2rem;
      border-radius: 12px;
      cursor: pointer;
    " on:click={verBusca}>
      <div style="font-size: 3rem; margin-bottom: 1rem;">🔍</div>
      <h3>Buscar Artistas</h3>
      <p>Encontre seus artistas favoritos</p>
    </div>
    
    <div style="
      background: #121212;
      padding: 2rem;
      border-radius: 12px;
      cursor: pointer;
    " on:click={verPlaylists}>
      <div style="font-size: 3rem; margin-bottom: 1rem;">🎵</div>
      <h3>Playlists</h3>
      <p>Ouça playlists incríveis</p>
    </div>
 
  </div>
</main>