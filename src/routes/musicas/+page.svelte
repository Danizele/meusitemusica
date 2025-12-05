<script>
  let playlists = [
    { 
      id: 1, 
      nome: "Daily Mix 1", 
      musicas: 30, 
      emoji: "🎧", 
      cor: "#1db954",
      descricao: "The Weeknd, Dua Lipa, Doja Cat and more",
      tracks: [
        { nome: "Blinding Lights", artista: "The Weeknd", duracao: "3:20" },
        { nome: "Levitating", artista: "Dua Lipa", duracao: "3:23" },
        { nome: "Say So", artista: "Doja Cat", duracao: "3:57" },
        { nome: "Stay", artista: "The Kid LAROI, Justin Bieber", duracao: "2:21" },
        { nome: "good 4 u", artista: "Olivia Rodrigo", duracao: "2:58" }
      ]
    },
    { 
      id: 2, 
      nome: "Liked Songs", 
      musicas: 125, 
      emoji: "❤️", 
      cor: "#535353",
      descricao: "Your favorite tracks all in one playlist",
      tracks: [
        { nome: "Flowers", artista: "Miley Cyrus", duracao: "3:20" },
        { nome: "Anti-Hero", artista: "Taylor Swift", duracao: "3:20" },
        { nome: "As It Was", artista: "Harry Styles", duracao: "2:47" },
        { nome: "Unholy", artista: "Sam Smith ft. Kim Petras", duracao: "2:36" },
        { nome: "Bad Habit", artista: "Steve Lacy", duracao: "3:52" }
      ]
    },
    { 
      id: 3, 
      nome: "Study Focus", 
      musicas: 45, 
      emoji: "📚", 
      cor: "#8d67ab",
      descricao: "Concentration beats for deep work",
      tracks: [
        { nome: "Weightless", artista: "Marconi Union", duracao: "8:00" },
        { nome: "Clair de Lune", artista: "Claude Debussy", duracao: "5:03" },
        { nome: "Spiegel im Spiegel", artista: "Arvo Pärt", duracao: "10:21" },
        { nome: "Experience", artista: "Ludovico Einaudi", duracao: "5:16" },
        { nome: "Gymnopédie No.1", artista: "Erik Satie", duracao: "3:33" }
      ]
    },
    { 
      id: 4, 
      nome: "Workout Energy", 
      musicas: 35, 
      emoji: "💪", 
      cor: "#ba5d07",
      descricao: "High intensity tracks to push harder",
      tracks: [
        { nome: "Eye of the Tiger", artista: "Survivor", duracao: "4:05" },
        { nome: "Stronger", artista: "Kanye West", duracao: "5:12" },
        { nome: "Till I Collapse", artista: "Eminem", duracao: "4:57" },
        { nome: "Can't Hold Us", artista: "Macklemore & Ryan Lewis", duracao: "4:18" },
        { nome: "Lose Yourself", artista: "Eminem", duracao: "5:20" }
      ]
    },
    { 
      id: 5, 
      nome: "Chill Vibes", 
      musicas: 28, 
      emoji: "🌙", 
      cor: "#477d95",
      descricao: "Relax and unwind with these smooth tracks",
      tracks: [
        { nome: "Sunflower", artista: "Post Malone, Swae Lee", duracao: "2:38" },
        { nome: "Circles", artista: "Post Malone", duracao: "3:35" },
        { nome: "Watermelon Sugar", artista: "Harry Styles", duracao: "2:54" },
        { nome: "The Less I Know The Better", artista: "Tame Impala", duracao: "3:36" },
        { nome: "Electric Feel", artista: "MGMT", duracao: "3:49" }
      ]
    },
    { 
      id: 6, 
      nome: "Rock Classics", 
      musicas: 52, 
      emoji: "🎸", 
      cor: "#e61e32",
      descricao: "Timeless rock anthems from every era",
      tracks: [
        { nome: "Bohemian Rhapsody", artista: "Queen", duracao: "5:55" },
        { nome: "Stairway to Heaven", artista: "Led Zeppelin", duracao: "8:02" },
        { nome: "Sweet Child O' Mine", artista: "Guns N' Roses", duracao: "5:56" },
        { nome: "Hotel California", artista: "Eagles", duracao: "6:30" },
        { nome: "Smells Like Teen Spirit", artista: "Nirvana", duracao: "5:01" }
      ]
    }
  ];

  // Estado do player
  let playlistAtiva = null;
  let musicaAtual = null;
  let isPlaying = false;
  let progresso = 0;
  let intervalo = null;
  let volume = 80;

  // Funções do player
  function selecionarPlaylist(playlist) {
    playlistAtiva = playlist;
    musicaAtual = playlist.tracks[0];
    isPlaying = true;
    progresso = 0;
    
    iniciarPlayer();
  }

  function tocarMusica(track) {
    musicaAtual = track;
    isPlaying = true;
    progresso = 0;
    
    iniciarPlayer();
  }

  function iniciarPlayer() {
    if (intervalo) clearInterval(intervalo);
    
    intervalo = setInterval(() => {
      if (progresso < 100) {
        progresso += 0.5; // Mais lento para parecer real
      } else {
        proximaMusica();
      }
    }, 200);
  }

  function togglePlayPause() {
    isPlaying = !isPlaying;
    
    if (isPlaying && musicaAtual) {
      iniciarPlayer();
    } else {
      if (intervalo) {
        clearInterval(intervalo);
        intervalo = null;
      }
    }
  }

  function proximaMusica() {
    if (!playlistAtiva || !musicaAtual) return;
    
    const indexAtual = playlistAtiva.tracks.findIndex(t => t.nome === musicaAtual.nome);
    const proximoIndex = (indexAtual + 1) % playlistAtiva.tracks.length;
    
    tocarMusica(playlistAtiva.tracks[proximoIndex]);
  }

  function musicaAnterior() {
    if (!playlistAtiva || !musicaAtual) return;
    
    const indexAtual = playlistAtiva.tracks.findIndex(t => t.nome === musicaAtual.nome);
    const anteriorIndex = indexAtual === 0 ? playlistAtiva.tracks.length - 1 : indexAtual - 1;
    
    tocarMusica(playlistAtiva.tracks[anteriorIndex]);
  }

  function formatarTempo(percentual) {
    const segundosTotais = 200; // 3:20
    const segundosAtuais = Math.floor((percentual / 100) * segundosTotais);
    
    const minutos = Math.floor(segundosAtuais / 60);
    const segundos = segundosAtuais % 60;
    
    return `${minutos}:${segundos.toString().padStart(2, '0')}`;
  }

  function ajustarVolume(event) {
    volume = event.target.value;
  }
</script>

<main class="spotify-theme">
  <!-- HEADER SPOTIFY -->
  <header class="spotify-header">
    <div class="header-left">
      <button class="nav-btn">‹</button>
      <button class="nav-btn">›</button>
    </div>
    <div class="header-right">
      <button class="upgrade-btn">Upgrade</button>
      <div class="user-profile">
        <span>User</span>
        <div class="user-avatar">U</div>
      </div>
    </div>
  </header>

  <!-- CONTEÚDO PRINCIPAL -->
  <div class="main-content">
    <!-- GREETING -->
    <section class="greeting-section">
      <h1>Good afternoon</h1>
      <div class="quick-playlists">
        {#each playlists.slice(0, 6) as playlist}
          <div class="quick-playlist-card" on:click={() => selecionarPlaylist(playlist)}>
            <div class="quick-card-image" style="background: {playlist.cor}">
              {playlist.emoji}
            </div>
            <span>{playlist.nome}</span>
          </div>
        {/each}
      </div>
    </section>

    <!-- MADE FOR YOU -->
    <section class="section">
      <div class="section-header">
        <h2>Made for you</h2>
        <a href="#" class="show-all">Show all</a>
      </div>
      <div class="playlists-grid">
        {#each playlists as playlist}
          <div class="playlist-card" on:click={() => selecionarPlaylist(playlist)}>
            <div class="card-image" style="background: {playlist.cor}">
              {playlist.emoji}
            </div>
            <div class="card-content">
              <h3>{playlist.nome}</h3>
              <p>{playlist.descricao}</p>
            </div>
            <div class="play-overlay">
              <button class="play-btn">▶</button>
            </div>
          </div>
        {/each}
      </div>
    </section>

    <!-- RECENTLY PLAYED -->
    <section class="section">
      <div class="section-header">
        <h2>Recently played</h2>
        <a href="#" class="show-all">Show all</a>
      </div>
      <div class="playlists-grid">
        {#each playlists.slice(0, 4) as playlist}
          <div class="playlist-card" on:click={() => selecionarPlaylist(playlist)}>
            <div class="card-image" style="background: {playlist.cor}">
              {playlist.emoji}
            </div>
            <div class="card-content">
              <h3>{playlist.nome}</h3>
              <p>{playlist.descricao}</p>
            </div>
            <div class="play-overlay">
              <button class="play-btn">▶</button>
            </div>
          </div>
        {/each}
      </div>
    </section>
  </div>

  <!-- PLAYER FIXO (SPOTIFY-STYLE) -->
  {#if musicaAtual}
    <div class="bottom-player">
      <!-- LEFT: TRACK INFO -->
      <div class="player-left">
        <div class="track-info-mini">
          <div class="track-image-mini" style="background: {playlistAtiva?.cor || '#1db954'}">
            {playlistAtiva?.emoji || '🎵'}
          </div>
          <div class="track-details-mini">
            <span class="track-name-mini">{musicaAtual.nome}</span>
            <span class="artist-name-mini">{musicaAtual.artista}</span>
          </div>
          <button class="like-btn-mini">♥</button>
        </div>
      </div>

      <!-- CENTER: PLAYER CONTROLS -->
      <div class="player-center">
        <div class="player-controls-mini">
          <button class="control-btn-mini shuffle" title="Shuffle">🔀</button>
          <button class="control-btn-mini" on:click={musicaAnterior} title="Previous">⏮</button>
          <button class="control-btn-mini play-pause-mini" on:click={togglePlayPause} title="{isPlaying ? 'Pause' : 'Play'}">
            {#if isPlaying}⏸{:else}▶{/if}
          </button>
          <button class="control-btn-mini" on:click={proximaMusica} title="Next">⏭</button>
          <button class="control-btn-mini repeat" title="Repeat">🔁</button>
        </div>
        <div class="progress-mini">
          <span class="time-current">{formatarTempo(progresso)}</span>
          <div class="progress-bar-mini">
            <div class="progress-fill-mini" style="width: {progresso}%"></div>
          </div>
          <span class="time-total">{formatarTempo(100)}</span>
        </div>
      </div>

      <!-- RIGHT: VOLUME & EXTRAS -->
      <div class="player-right">
        <button class="queue-btn" title="Queue">📋</button>
        <button class="device-btn" title="Connect to a device">📱</button>
        <div class="volume-container">
          <span class="volume-icon">🔊</span>
          <input 
            type="range" 
            min="0" 
            max="100" 
            bind:value={volume}
            on:input={ajustarVolume}
            class="volume-slider"
          />
        </div>
        <button class="fullscreen-btn" title="Fullscreen">⛶</button>
      </div>
    </div>
  {/if}
</main>

<style>
  /* SPOTIFY THEME */
  .spotify-theme {
    background: #000;
    color: #fff;
    min-height: 100vh;
    font-family: 'Helvetica Neue', Arial, sans-serif;
    padding-bottom: 90px; /* Espaço para o player fixo */
  }

  /* HEADER */
  .spotify-header {
    background: #000;
    padding: 1rem 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: sticky;
    top: 0;
    z-index: 100;
  }

  .header-left, .header-right {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .nav-btn {
    background: rgba(0,0,0,0.7);
    color: #fff;
    border: none;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .upgrade-btn {
    background: transparent;
    color: #fff;
    border: 1px solid #fff;
    padding: 0.5rem 1.5rem;
    border-radius: 20px;
    cursor: pointer;
    font-weight: bold;
  }

  .user-profile {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: #333;
    padding: 0.25rem 0.5rem 0.25rem 1rem;
    border-radius: 20px;
    cursor: pointer;
  }

  .user-avatar {
    background: #1db954;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
  }

  /* MAIN CONTENT */
  .main-content {
    padding: 0 2rem;
  }

  /* GREETING SECTION */
  .greeting-section h1 {
    font-size: 2rem;
    margin-bottom: 1.5rem;
  }

  .quick-playlists {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1rem;
    margin-bottom: 3rem;
  }

  .quick-playlist-card {
    background: #333;
    border-radius: 8px;
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.75rem;
    cursor: pointer;
    transition: background 0.2s;
  }

  .quick-playlist-card:hover {
    background: #444;
  }

  .quick-card-image {
    width: 48px;
    height: 48px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
  }

  /* SECTION STYLES */
  .section {
    margin-bottom: 3rem;
  }

  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }

  .section-header h2 {
    font-size: 1.5rem;
  }

  .show-all {
    color: #b3b3b3;
    text-decoration: none;
    font-size: 0.9rem;
    font-weight: bold;
  }

  .show-all:hover {
    text-decoration: underline;
  }

  /* PLAYLIST GRID */
  .playlists-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 1.5rem;
  }

  .playlist-card {
    background: #181818;
    padding: 1rem;
    border-radius: 8px;
    cursor: pointer;
    transition: background 0.3s;
    position: relative;
  }

  .playlist-card:hover {
    background: #282828;
  }

  .playlist-card:hover .play-overlay {
    opacity: 1;
    transform: translateY(0);
  }

  .card-image {
    width: 100%;
    aspect-ratio: 1;
    border-radius: 4px;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 3rem;
  }

  .card-content h3 {
    font-size: 1rem;
    margin: 0 0 0.5rem 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .card-content p {
    color: #b3b3b3;
    font-size: 0.875rem;
    margin: 0;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .play-overlay {
    position: absolute;
    bottom: 1rem;
    right: 1rem;
    opacity: 0;
    transform: translateY(10px);
    transition: all 0.3s;
  }

  .play-btn {
    background: #1db954;
    border: none;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: 0 8px 16px rgba(0,0,0,0.3);
  }

  /* BOTTOM PLAYER (SPOTIFY-STYLE) */
  .bottom-player {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: #181818;
    border-top: 1px solid #282828;
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 1000;
  }

  /* LEFT SIDE */
  .player-left {
    width: 30%;
  }

  .track-info-mini {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .track-image-mini {
    width: 56px;
    height: 56px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
  }

  .track-details-mini {
    display: flex;
    flex-direction: column;
    min-width: 0;
  }

  .track-name-mini {
    font-weight: bold;
    font-size: 0.875rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .artist-name-mini {
    color: #b3b3b3;
    font-size: 0.75rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .like-btn-mini {
    background: transparent;
    border: none;
    color: #1db954;
    cursor: pointer;
    font-size: 1rem;
  }

  /* CENTER */
  .player-center {
    width: 40%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
  }

  .player-controls-mini {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .control-btn-mini {
    background: transparent;
    border: none;
    color: #b3b3b3;
    cursor: pointer;
    font-size: 1rem;
    transition: color 0.2s;
  }

  .control-btn-mini:hover {
    color: #fff;
  }

  .play-pause-mini {
    background: #fff;
    color: #000;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    font-size: 0.75rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .progress-mini {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    width: 100%;
    max-width: 500px;
  }

  .time-current, .time-total {
    color: #b3b3b3;
    font-size: 0.75rem;
    min-width: 35px;
  }

  .progress-bar-mini {
    background: #5e5e5e;
    height: 4px;
    border-radius: 2px;
    flex: 1;
    cursor: pointer;
    overflow: hidden;
  }

  .progress-fill-mini {
    background: #fff;
    height: 100%;
    border-radius: 2px;
    transition: width 0.1s linear;
  }

  /* RIGHT SIDE */
  .player-right {
    width: 30%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 1rem;
  }

  .queue-btn, .device-btn, .fullscreen-btn {
    background: transparent;
    border: none;
    color: #b3b3b3;
    cursor: pointer;
    font-size: 1rem;
  }

  .volume-container {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    width: 120px;
  }

  .volume-slider {
    width: 100%;
    height: 4px;
    -webkit-appearance: none;
    background: #5e5e5e;
    border-radius: 2px;
    outline: none;
  }

  .volume-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #fff;
    cursor: pointer;
  }
</style>