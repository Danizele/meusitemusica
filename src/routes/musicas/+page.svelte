<script>
    let playlistSelecionada = null;
    
    const playlists = [
        { id: 1, nome: "Rock Clássico", musicas: 15, cor: "#ff6b6b", emoji: "🎸" },
        { id: 2, nome: "Pop Hits 2024", musicas: 20, cor: "#4ecdc4", emoji: "🎤" },
        { id: 3, nome: "Sertanejo Universitário", musicas: 18, cor: "#45b7d1", emoji: "🤠" },
        { id: 4, nome: "Funk Brasil", musicas: 25, cor: "#96ceb4", emoji: "💃" }
    ];

    function ouvirPlaylist(playlist) {
        playlistSelecionada = playlist;
    }

    function voltar() {
        playlistSelecionada = null;
    }
</script>

<main>
    {#if !playlistSelecionada}
        <h1>🎵 Minhas Playlists</h1>
        
        <div class="playlists">
            {#each playlists as playlist}
                <div class="playlist-card" style="border-left: 5px solid {playlist.cor}">
                    <div class="emoji">{playlist.emoji}</div>
                    <h3>{playlist.nome}</h3>
                    <p>{playlist.musicas} músicas</p>
                    <button on:click={() => ouvirPlaylist(playlist)} 
                            style="background: {playlist.cor}">
                        ▶️ Ouvir Playlist
                    </button>
                </div>
            {/each}
        </div>
        
        <a href="/" class="voltar-link">← Voltar para home</a>
        
    {:else}
        <div class="player" style="background: linear-gradient(135deg, {playlistSelecionada.cor} 0%, #ffffff 100%)">
            <button on:click={voltar} class="btn-voltar">← Voltar para playlists</button>
            
            <div class="player-header">
                <span class="emoji-grande">{playlistSelecionada.emoji}</span>
                <div>
                    <h1>{playlistSelecionada.nome}</h1>
                    <p>{playlistSelecionada.musicas} músicas na playlist</p>
                </div>
            </div>
            
            <div class="player-content">
                <div class="agora-tocando">
                    <p>🎵 Agora tocando: <strong>Música Top da Playlist</strong></p>
                </div>
                
                <div class="controles">
                    <button>⏮ Anterior</button>
                    <button class="btn-pause">⏸️ Pausar</button>
                    <button>Próxima ⏭</button>
                </div>
                
                <div class="progresso">
                    <div class="barra-progresso">
                        <div class="progresso-feito" style="width: 65%"></div>
                    </div>
                    <p>2:30 / 3:45</p>
                </div>
            </div>
        </div>
    {/if}
</main>

<style>
    main {
        max-width: 1000px;
        margin: 0 auto;
        padding: 2rem;
        font-family: Arial, sans-serif;
    }
    
    h1 {
        text-align: center;
        color: #333;
        margin-bottom: 2rem;
    }
    
    .playlists {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 2rem;
        margin-bottom: 3rem;
    }
    
    .playlist-card {
        background: white;
        padding: 2rem;
        border-radius: 12px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        text-align: center;
        transition: transform 0.3s ease;
    }
    
    .playlist-card:hover {
        transform: translateY(-5px);
    }
    
    .emoji {
        font-size: 3rem;
        margin-bottom: 1rem;
    }
    
    .playlist-card h3 {
        margin: 1rem 0;
        color: #333;
        font-size: 1.4em;
    }
    
    .playlist-card p {
        color: #666;
        margin: 0.5rem 0 1.5rem 0;
    }
    
    .playlist-card button {
        color: white;
        border: none;
        padding: 12px 24px;
        border-radius: 25px;
        cursor: pointer;
        font-weight: bold;
        font-size: 1em;
        transition: all 0.3s ease;
    }
    
    .playlist-card button:hover {
        transform: scale(1.05);
        opacity: 0.9;
    }
    
    .voltar-link {
        display: block;
        text-align: center;
        margin-top: 2rem;
        color: #666;
        text-decoration: none;
        font-size: 1.1em;
    }
    
    .voltar-link:hover {
        color: #333;
        text-decoration: underline;
    }
    
    .player {
        color: white;
        padding: 2rem;
        border-radius: 15px;
        min-height: 400px;
    }
    
    .btn-voltar {
        background: rgba(255,255,255,0.2);
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 20px;
        cursor: pointer;
        margin-bottom: 1rem;
        font-size: 1em;
    }
    
    .btn-voltar:hover {
        background: rgba(255,255,255,0.3);
    }
    
    .player-header {
        display: flex;
        align-items: center;
        gap: 1.5rem;
        margin-bottom: 2rem;
    }
    
    .emoji-grande {
        font-size: 5rem;
    }
    
    .player-header h1 {
        text-align: left;
        margin: 0;
        color: white;
        font-size: 2.5em;
    }
    
    .player-header p {
        margin: 0.5rem 0 0 0;
        opacity: 0.9;
    }
    
    .player-content {
        background: rgba(255,255,255,0.9);
        color: #333;
        padding: 2rem;
        border-radius: 12px;
        text-align: center;
    }
    
    .agora-tocando {
        margin-bottom: 2rem;
    }
    
    .agora-tocando p {
        font-size: 1.2em;
        margin: 0;
    }
    
    .controles {
        display: flex;
        gap: 1rem;
        justify-content: center;
        margin-bottom: 2rem;
    }
    
    .controles button {
        background: #333;
        color: white;
        border: none;
        padding: 12px 20px;
        border-radius: 8px;
        cursor: pointer;
        font-size: 1em;
    }
    
    .btn-pause {
        background: #ff6b6b !important;
        font-weight: bold;
    }
    
    .progresso {
        text-align: center;
    }
    
    .barra-progresso {
        background: #ddd;
        border-radius: 10px;
        height: 8px;
        margin: 1rem 0;
        overflow: hidden;
    }
    
    .progresso-feito {
        background: #ff6b6b;
        height: 100%;
        border-radius: 10px;
        transition: width 0.3s ease;
    }
</style>