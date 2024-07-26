const initResize = (event) => {
  const col = event.target.parentElement;
  const startCursorX = event.pageX;
  const startWidth = col.offsetWidth;

  const doResize = (e) => {
    col.style.width = `${Math.max(startWidth + e.pageX - startCursorX, 50)}px`;
  };

  const stopResize = () => {
    document.removeEventListener("mousemove", doResize);
    document.removeEventListener("mouseup", stopResize);
  };

  document.addEventListener("mousemove", doResize);
  document.addEventListener("mouseup", stopResize);
};
export default initResize;
