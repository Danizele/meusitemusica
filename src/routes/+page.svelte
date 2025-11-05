<script>
    import { goto } from '$app/navigation';
    
    function verPlaylists() {
        goto('/musicas');
    }
</script>

<main>
    <h1>🎵 Meu Site de Música</h1>
    <p>Bem-vindo ao meu site sobre música! Aqui vamos explorar artistas, estilos e playlists incríveis.</p>
    
    <hr />
    
    <button on:click={verPlaylists} class="btn-primary">
        🎧 Ver playlists
    </button>
</main>

<style>
    main {
        max-width: 800px;
        margin: 0 auto;
        padding: 2rem;
        text-align: center;
        font-family: Arial, sans-serif;
    }
    
    h1 {
        color: #ff6b6b;
        margin-bottom: 1rem;
        font-size: 2.5em;
    }
    
    p {
        color: #666;
        font-size: 1.2em;
        line-height: 1.6;
    }
    
    .btn-primary {
        background: #ff6b6b;
        color: white;
        border: none;
        padding: 15px 30px;
        border-radius: 10px;
        font-size: 1.2rem;
        cursor: pointer;
        margin-top: 2rem;
        font-weight: bold;
    }
    
    .btn-primary:hover {
        background: #ff5252;
        transform: scale(1.05);
    }
    
    hr {
        margin: 2rem 0;
        border: 1px solid #eee;
    }
</style>