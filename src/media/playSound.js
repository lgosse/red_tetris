export const createPlayer = music => sound => {
  if (music) {
    try {
      const audio = new Audio(sound);
      audio.play().catch(console.log);
    } catch (error) {}
  }
};
