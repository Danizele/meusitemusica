<script>
  import { goto } from '$app/navigation';
  
  function verPlaylists() {
    goto('/musicas');
  }
</script>

<main>
  <h1>🎵 Meu Site de Música</h1>
  <p>Bem-vindo ao meu site sobre música! Clique abaixo para ver as playlists.</p>
  
  <button on:click={verPlaylists} class="btn-primary">
    Ver Playlists 🎧
  </button>
</main>

<style>
  main {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
    text-align: center;
  }
  
  h1 {
    color: #ff6b6b;
    margin-bottom: 1rem;
  }
  
  .btn-primary {
    background: #ff6b6b;
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 8px;
    font-size: 1.1rem;
    cursor: pointer;
    margin-top: 2rem;
  }
</style>