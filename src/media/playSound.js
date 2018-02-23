export const createPlayer = music => sound => {
  const audio = new Audio(sound);
  audio.play().catch(console.log);
};
