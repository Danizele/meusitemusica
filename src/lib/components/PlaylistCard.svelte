<script>
  export let playlist;
</script>

<a
  href={`/playlists/${playlist.id}`}
  class="bg-gray-800 p-4 rounded-xl hover:bg-gray-700 transition block"
>
  <img src={playlist.cover} class="rounded-lg mb-3" />
  <h2 class="text-xl font-bold">{playlist.name}</h2>
  <p class="text-gray-300 text-sm">{playlist.description}</p>
</a>
