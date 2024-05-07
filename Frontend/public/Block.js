document.addEventListener('contextmenu', (e) => e.preventDefault());

function ctrlShiftKey(e, keyCode) {
  return e.ctrlKey && e.shiftKey && e.keyCode === keyCode.charCodeAt(0);
}

document.onkeydown = (e) => {
  // Disable F12, Ctrl + Shift + I, Ctrl + Shift + J, Ctrl + C, Ctrl + U this for not inspect the Webpage
  if (
    event.keyCode === 123 ||
    ctrlShiftKey(e, 'I') ||
    ctrlShiftKey(e, 'J') ||
    ctrlShiftKey(e, 'C') ||
    (e.ctrlKey && e.keyCode === 'U'.charCodeAt(0))
  )
    return false;

  // Disable Ctrl + S this for not save the webpage
  if (e.ctrlKey && e.keyCode === 'S'.charCodeAt(0)) {
    e.preventDefault();
    return false;
  }
   // Disable Ctrl + p this for not to  print the Webpage
  if (e.ctrlKey && e.keyCode === 'p'.charCodeAt(0)) {
    e.preventDefault();
    return false;
  }
};
