<script>
  let playlists = [
    { 
      id: 1, 
      nome: "Daily Mix 1", 
      musicas: 30, 
      descricao: "Artist1, Artist2, Artist3 and more",
      cor: "#1db954",
      imagem: "🎧"
    },
    { 
      id: 2, 
      nome: "Liked Songs", 
      musicas: 125, 
      descricao: "Your favorite tracks",
      cor: "#535353",
      imagem: "❤️"
    },
    { 
      id: 3, 
      nome: "Study Focus", 
      musicas: 45, 
      descricao: "Concentration beats",
      cor: "#8d67ab",
      imagem: "📚"
    },
    { 
      id: 4, 
      nome: "Workout Energy", 
      musicas: 35, 
      descricao: "High intensity tracks",
      cor: "#ba5d07",
      imagem: "💪"
    },
    { 
      id: 5, 
      nome: "Chill Vibes", 
      musicas: 28, 
      descricao: "Relax and unwind",
      cor: "#477d95",
      imagem: "🌙"
    },
    { 
      id: 6, 
      nome: "Rock Classics", 
      musicas: 52, 
      descricao: "Timeless rock anthems",
      cor: "#e61e32",
      imagem: "🎸"
    }
  ];

  let playlistSelecionada = null;
  let isPlaying = false;
  let currentTime = 95;
  let totalTime = 210;

  function ouvirPlaylist(playlist) {
    playlistSelecionada = playlist;
    isPlaying = true;
  }

  function voltarParaLista() {
    playlistSelecionada = null;
    isPlaying = false;
  }

  function togglePlay() {
    isPlaying = !isPlaying;
  }

  function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }
</script>

<main class="spotify-theme">
  {#if !playlistSelecionada}
    <!-- TELA PRINCIPAL SPOTIFY-STYLE -->
    <div class="spotify-container">
      <!-- HEADER -->
      <header class="spotify-header">
        <div class="header-nav">
          <button class="nav-btn">‹</button>
          <button class="nav-btn">›</button>
        </div>
        <div class="header-user">
          <button class="upgrade-btn">Upgrade</button>
          <div class="user-profile">
            <span>User</span>
            <div class="user-avatar">U</div>
          </div>
        </div>
      </header>

      <!-- MAIN CONTENT -->
      <div class="main-content">
        <!-- GREETING -->
        <section class="greeting-section">
          <h1>Good afternoon</h1>
          <div class="quick-playlists">
            {#each playlists.slice(0, 6) as playlist}
              <div class="quick-playlist-card" on:click={() => ouvirPlaylist(playlist)}>
                <div class="quick-card-image">{playlist.imagem}</div>
                <span>{playlist.nome}</span>
                <div class="play-icon">▶</div>
              </div>
            {/each}
          </div>
        </section>

        <!-- MADE FOR YOU SECTION -->
        <section class="section">
          <div class="section-header">
            <h2>Made for you</h2>
            <a href="#" class="show-all">Show all</a>
          </div>
          <div class="playlists-grid">
            {#each playlists as playlist}
              <div class="playlist-card" on:click={() => ouvirPlaylist(playlist)}>
                <div class="card-image">{playlist.imagem}</div>
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
              <div class="playlist-card" on:click={() => ouvirPlaylist(playlist)}>
                <div class="card-image">{playlist.imagem}</div>
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
    </div>
  
  {:else}
    <!-- TELA DO PLAYER SPOTIFY-STYLE -->
    <div class="player-screen" style="--accent-color: {playlistSelecionada.cor}">
      <!-- PLAYER HEADER -->
      <header class="player-header">
        <button class="back-btn" on:click={voltarParaLista}>↓</button>
        <div class="player-info">
          <h1>PLAYING FROM PLAYLIST</h1>
          <h2>{playlistSelecionada.nome}</h2>
        </div>
      </header>

      <!-- PLAYER CONTENT -->
      <div class="player-content">
        <div class="album-art">
          <div class="art-placeholder">{playlistSelecionada.imagem}</div>
        </div>

        <!-- TRACK INFO -->
        <div class="track-info">
          <h1>Blinding Lights</h1>
          <h2>The Weeknd</h2>
          <p>From <strong>After Hours</strong></p>
        </div>

        <!-- PROGRESS BAR -->
        <div class="progress-section">
          <div class="progress-bar">
            <div class="progress-fill" style="width: {(currentTime / totalTime) * 100}%"></div>
          </div>
          <div class="time-display">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(totalTime)}</span>
          </div>
        </div>

        <!-- PLAYER CONTROLS -->
        <div class="player-controls">
          <button class="control-btn shuffle">🔀</button>
          <button class="control-btn">⏮</button>
          <button class="control-btn play-pause" on:click={togglePlay}>
            {#if isPlaying}⏸️{:else}▶{/if}
          </button>
          <button class="control-btn">⏭</button>
          <button class="control-btn repeat">🔁</button>
        </div>

        <!-- VOLUME -->
        <div class="volume-control">
          <span>🔊</span>
          <div class="volume-bar">
            <div class="volume-fill" style="width: 70%"></div>
          </div>
        </div>
      </div>

      <!-- BOTTOM PLAYER BAR -->
      <div class="bottom-player">
        <div class="current-track">
          <div class="track-image">{playlistSelecionada.imagem}</div>
          <div class="track-details">
            <span class="track-name">Blinding Lights</span>
            <span class="artist-name">The Weeknd</span>
          </div>
          <button class="like-btn">❤️</button>
        </div>
        
        <div class="mini-controls">
          <button class="mini-btn">🔀</button>
          <button class="mini-btn">⏮</button>
          <button class="mini-btn play-pause-mini" on:click={togglePlay}>
            {#if isPlaying}⏸️{:else}▶{/if}
          </button>
          <button class="mini-btn">⏭</button>
          <button class="mini-btn">🔁</button>
        </div>

        <div class="progress-mini">
          <span>{formatTime(currentTime)}</span>
          <div class="progress-bar-mini">
            <div class="progress-fill-mini" style="width: {(currentTime / totalTime) * 100}%"></div>
          </div>
          <span>{formatTime(totalTime)}</span>
        </div>
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

  .header-nav {
    display: flex;
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

  .header-user {
    display: flex;
    align-items: center;
    gap: 1rem;
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
    padding: 0 2rem 8rem 2rem;
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
    position: relative;
    overflow: hidden;
  }

  .quick-playlist-card:hover {
    background: #444;
  }

  .quick-playlist-card:hover .play-icon {
    opacity: 1;
    transform: translateX(0);
  }

  .quick-card-image {
    font-size: 2rem;
    width: 48px;
    height: 48px;
    background: linear-gradient(135deg, var(--accent-color, #1db954), #000);
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .play-icon {
    position: absolute;
    right: 1rem;
    background: #1db954;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transform: translateX(10px);
    transition: all 0.3s;
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
    background: #333;
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

  /* PLAYER SCREEN */
  .player-screen {
    background: linear-gradient(180deg, var(--accent-color, #1db954) 0%, #000 300px);
    min-height: 100vh;
    color: #fff;
  }

  .player-header {
    padding: 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
  }

  .back-btn {
    background: rgba(0,0,0,0.7);
    color: #fff;
    border: none;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    cursor: pointer;
    font-size: 1.2rem;
  }

  .player-info h1 {
    font-size: 0.75rem;
    font-weight: bold;
    margin: 0;
    opacity: 0.7;
  }

  .player-info h2 {
    font-size: 2rem;
    margin: 0.25rem 0 0 0;
  }

  .player-content {
    padding: 2rem;
    text-align: center;
  }

  .album-art {
    margin-bottom: 2rem;
  }

  .art-placeholder {
    width: 300px;
    height: 300px;
    background: #333;
    border-radius: 8px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 5rem;
    box-shadow: 0 8px 32px rgba(0,0,0,0.5);
  }

  .track-info h1 {
    font-size: 2rem;
    margin: 0 0 0.5rem 0;
  }

  .track-info h2 {
    font-size: 1.2rem;
    margin: 0 0 1rem 0;
    opacity: 0.7;
  }

  .progress-section {
    margin: 3rem 0;
  }

  .progress-bar {
    background: #5e5e5e;
    height: 4px;
    border-radius: 2px;
    margin-bottom: 0.5rem;
    cursor: pointer;
  }

  .progress-fill {
    background: #fff;
    height: 100%;
    border-radius: 2px;
    position: relative;
  }

  .time-display {
    display: flex;
    justify-content: space-between;
    font-size: 0.75rem;
    color: #b3b3b3;
  }

  .player-controls {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    margin-bottom: 2rem;
  }

  .control-btn {
    background: transparent;
    border: none;
    color: #b3b3b3;
    cursor: pointer;
    font-size: 1.2rem;
    transition: color 0.2s;
  }

  .control-btn:hover {
    color: #fff;
  }

  .play-pause {
    background: #fff;
    color: #000;
    width: 64px;
    height: 64px;
    border-radius: 50%;
    font-size: 1.5rem;
  }

  .play-pause:hover {
    transform: scale(1.05);
  }

  .volume-control {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    max-width: 300px;
    margin: 0 auto;
  }

  .volume-bar {
    background: #5e5e5e;
    height: 4px;
    border-radius: 2px;
    flex: 1;
    cursor: pointer;
  }

  .volume-fill {
    background: #fff;
    height: 100%;
    border-radius: 2px;
  }

  /* BOTTOM PLAYER */
  .bottom-player {
    background: #181818;
    border-top: 1px solid #282828;
    padding: 1rem;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .current-track {
    display: flex;
    align-items: center;
    gap: 1rem;
    flex: 1;
  }

  .track-image {
    width: 56px;
    height: 56px;
    background: #333;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
  }

  .track-details {
    display: flex;
    flex-direction: column;
  }

  .track-name {
    font-weight: bold;
    font-size: 0.875rem;
  }

  .artist-name {
    font-size: 0.75rem;
    color: #b3b3b3;
  }

  .like-btn {
    background: transparent;
    border: none;
    color: #b3b3b3;
    cursor: pointer;
  }

  .mini-controls {
    display: flex;
    align-items: center;
    gap: 1rem;
    flex: 1;
    justify-content: center;
  }

  .mini-btn {
    background: transparent;
    border: none;
    color: #b3b3b3;
    cursor: pointer;
  }

  .play-pause-mini {
    background: #fff;
    color: #000;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    font-size: 0.75rem;
  }

  .progress-mini {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex: 1;
    justify-content: flex-end;
  }

  .progress-bar-mini {
    background: #5e5e5e;
    height: 4px;
    border-radius: 2px;
    flex: 1;
    max-width: 100px;
    cursor: pointer;
  }

  .progress-fill-mini {
    background: #fff;
    height: 100%;
    border-radius: 2px;
  }

  .progress-mini span {
    font-size: 0.75rem;
    color: #b3b3b3;
    min-width: 35px;
  }
</style>