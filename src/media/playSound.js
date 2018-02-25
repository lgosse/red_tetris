export const createPlayer = music => sound => {
  if (music) {
    const audio = new Audio(sound);
    audio.play().catch(console.log);
  }
};
