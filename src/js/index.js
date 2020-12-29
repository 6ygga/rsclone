const data = null;
let objData;
const xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener('readystatechange', function () {
  if (this.readyState === this.DONE) {
    objData = JSON.parse(this.responseText);
    console.log(objData);
  }
});

xhr.open('GET', 'https://deezerdevs-deezer.p.rapidapi.com/playlist/8547115742/tracks');
xhr.setRequestHeader('x-rapidapi-key', '4835959b42msh3bee7141676b066p14ab6bjsn550b9c90d751');
xhr.setRequestHeader('x-rapidapi-host', 'deezerdevs-deezer.p.rapidapi.com');
xhr.send(data);
