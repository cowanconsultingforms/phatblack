export const isMobile = () => {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  return /android|iPad|iPhone|iPod|webOS/i.test(userAgent);
};

export default isMobile;