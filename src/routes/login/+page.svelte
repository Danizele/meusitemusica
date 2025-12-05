<script>
  import { authService } from '$lib/services/auth'
  import { goto } from '$app/navigation'
  
  let email = ''
  let password = ''
  let isLoading = false
  let error = ''
  let isSignUp = false
  
  async function handleAuth() {
    if (!email || !password) {
      error = 'Preencha todos os campos'
      return
    }
    
    isLoading = true
    error = ''
    
    try {
      if (isSignUp) {
        await authService.signUp(email, password)
        error = 'Confirme seu email para continuar!'
      } else {
        await authService.signIn(email, password)
        goto('/')
      }
    } catch (err) {
      error = err.message
    } finally {
      isLoading = false
    }
  }
</script>

<main class="auth-page">
  <div class="auth-container">
    <h1>{isSignUp ? 'Criar Conta' : 'Entrar'}</h1>
    <p class="subtitle">Gerencie seus favoritos e playlists</p>
    
    {#if error}
      <div class="error-message">{error}</div>
    {/if}
    
    <div class="auth-form">
      <input
        type="email"
        bind:value={email}
        placeholder="Seu email"
        class="auth-input"
        disabled={isLoading}
      />
      
      <input
        type="password"
        bind:value={password}
        placeholder="Sua senha"
        class="auth-input"
        disabled={isLoading}
      />
      
      <button 
        on:click={handleAuth} 
        class="auth-button"
        disabled={isLoading}
      >
        {isLoading ? 'Processando...' : (isSignUp ? 'Criar Conta' : 'Entrar')}
      </button>
    </div>
    
    <button 
      on:click={() => isSignUp = !isSignUp}
      class="switch-mode"
    >
      {isSignUp ? 'Já tem uma conta? Entrar' : 'Não tem conta? Criar conta'}
    </button>
  </div>
</main>

<style>
  .auth-page {
    background: #000;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
  }
  
  .auth-container {
    background: #121212;
    padding: 3rem;
    border-radius: 12px;
    max-width: 400px;
    width: 100%;
    text-align: center;
  }
  
  h1 {
    color: #fff;
    margin: 0 0 0.5rem 0;
  }
  
  .subtitle {
    color: #b3b3b3;
    margin: 0 0 2rem 0;
  }
  
  .auth-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 2rem;
  }
  
  .auth-input {
    padding: 0.75rem 1rem;
    border: 1px solid #333;
    border-radius: 4px;
    background: #181818;
    color: #fff;
    font-size: 1rem;
  }
  
  .auth-input:focus {
    outline: none;
    border-color: #1db954;
  }
  
  .auth-button {
    background: #1db954;
    color: #fff;
    border: none;
    padding: 0.75rem;
    border-radius: 25px;
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
    margin-top: 1rem;
  }
  
  .auth-button:disabled {
    background: #535353;
    cursor: not-allowed;
  }
  
  .error-message {
    background: rgba(255, 50, 50, 0.1);
    color: #ff3232;
    padding: 1rem;
    border-radius: 4px;
    margin-bottom: 1rem;
  }
  
  .switch-mode {
    background: transparent;
    color: #1db954;
    border: none;
    cursor: pointer;
    font-size: 0.875rem;
  }
</style>