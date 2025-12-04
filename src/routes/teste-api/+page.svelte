<script>
  import { searchArtists, getChartTopTracks } from '$lib/api/lastfm';
  import { onMount } from 'svelte';
  
  let artists = [];
  let topTracks = [];
  let loading = true;
  
  onMount(async () => {
    try {
      // Teste 1: Buscar artistas populares
      artists = await searchArtists('coldplay');
      
      // Teste 2: Buscar músicas do chart
      topTracks = await getChartTopTracks(5);
      
      console.log('Artistas encontrados:', artists);
      console.log('Top tracks:', topTracks);
    } catch (error) {
      console.error('Erro no teste:', error);
    } finally {
      loading = false;
    }
  });
</script>

<main style="padding: 2rem; background: #000; color: white; min-height: 100vh;">
  <h1>🧪 Teste da API Last.fm</h1>
  
  {#if loading}
    <p>Testando API Key... ⏳</p>
  {:else}
    <div style="margin-top: 2rem;">
      <h2>✅ API Funcionando!</h2>
      <p>Sua API Key está configurada corretamente!</p>
      
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-top: 2rem;">
        <!-- ARTISTAS -->
        <div>
          <h3>🎤 Artistas Encontrados:</h3>
          {#each artists.slice(0, 5) as artist}
            <div style="background: #181818; padding: 1rem; margin: 0.5rem 0; border-radius: 8px;">
              <strong>{artist.name}</strong>
              {#if artist.listeners}
                <p style="color: #1db954; margin: 0.25rem 0;">
                  👂 {parseInt(artist.listeners).toLocaleString()} ouvintes
                </p>
              {/if}
            </div>
          {/each}
        </div>
        
        <!-- TOP TRACKS -->
        <div>
          <h3>🎵 Músicas Populares:</h3>
          {#each topTracks as track}
            <div style="background: #181818; padding: 1rem; margin: 0.5rem 0; border-radius: 8px;">
              <strong>{track.name}</strong>
              <p style="margin: 0.25rem 0;">🎤 {track.artist?.name}</p>
              {#if track.listeners}
                <p style="color: #1db954; margin: 0.25rem 0;">
                  ▶️ {parseInt(track.listeners).toLocaleString()} plays
                </p>
              {/if}
            </div>
          {/each}
        </div>
      </div>
      
      <div style="margin-top: 3rem; padding: 1.5rem; background: #1db954; border-radius: 8px;">
        <h3>🎉 Sucesso!</h3>
        <p>Sua API Key <code>14d3a4c54824c1d12723bc2968ba3083</code> está funcionando!</p>
        <p>Agora você pode implementar a página de busca completa.</p>
        
        <a href="/busca" style="display: inline-block; background: black; color: white; 
           padding: 0.75rem 1.5rem; border-radius: 25px; text-decoration: none; margin-top: 1rem;">
          Ir para Busca →
        </a>
      </div>
    </div>
  {/if}
</main>