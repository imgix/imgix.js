const images = document.querySelectorAll('#photos-grid img');

console.log(images);

images.forEach((img) => {
  const newDiv = document.createElement('div');
  const newP = document.createElement('p');
  let size = img.getAttribute('sizes');
  newDiv.className = 'size-info';
  newP.textContent = 'sizes=' + size;
  newDiv.appendChild(newP);
  img.insertAdjacentElement('afterend', newDiv);
});

window.addEventListener('resize', () => {
  images.forEach((img) => {
    let div = img.nextSibling;
    let text = div.firstChild;
    let size = img.getAttribute('sizes');
    text.textContent = 'sizes=' + size;
  });
});
