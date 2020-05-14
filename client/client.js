const doc = document;

let submit = doc.querySelector('.shorten-btn');
let longUrlText = doc.querySelector('.longUrlText');
let ul = doc.querySelector('.list-group');
let newLink = doc.querySelector('#new-link');


const render = (e)=>{
  fetch('https://tdtr.herokuapp.com/all/urls')
  .then((res)=>res.json())
  .then((json)=>{inject(json)})
}

const renderLast = (e)=>{
  fetch('https://tdtr.herokuapp.com/all/urls')
  .then((res)=>res.json())
  .then((json)=>{
    let last = json[json.length-1];
    let longUrl = doc.createElement('p');
    let longText = doc.createTextNode("Long Url : "+last.longUrl.slice(0,50));
    let shortUrl = doc.createElement('p');
    let copytext = last.shortUrl;
    let shortText = doc.createTextNode("Short Url : "+last.shortUrl);
    longUrl.appendChild(longText);
    shortUrl.appendChild(shortText);
    let p = doc.createElement('p');
    p.appendChild(doc.createTextNode("Click to Copy!"));
    // a.setAttribute("href", last.shortUrl);
    p.id = "copy-to-clipboard";
    p.className = "badge badge-success text-wrap";
    newLink.appendChild(longUrl);
    newLink.appendChild(shortUrl);
    newLink.appendChild(p);
    newLink.setAttribute("style","display:block;")
    doc.querySelector('#copy-to-clipboard').addEventListener('click',async (e)=>{
      if(!navigator.clipboard) return;
      try {
        await navigator.clipboard.writeText(copytext);
        p.textContent = 'Copied to clipboard!'
      } catch (err) {
        console.error('Failed to copy!', err)
      }
    })
  })
}

window.addEventListener('load',(e)=>{
  render();
});

const inject = (json)=>{
  let child = ul.lastElementChild;
  while(child){
    ul.removeChild(child);
    child = ul.lastElementChild;
  }
  for(let i=json.length-1;i>=json.length-10;i--){
    let j = json[i];
    if(j==null) break;
    let li = doc.createElement('li');
    let text = doc.createTextNode(j.shortUrl);
    let breakPt = doc.createElement('br');
    let text1 = doc.createTextNode(j.longUrl.slice(0,50));
    let p = doc.createElement('p');
    p.className = 'text-info';
    p.appendChild(text1);
    li.className = "list-group-item";
    li.appendChild(text);
    li.appendChild(breakPt);
    li.appendChild(p);
    ul.appendChild(li);
  }
}

const shortenUrl = (e) => {
    e.preventDefault();
    const data = {
        "longUrl" : longUrlText.value
    }

    const payload = {
        method : 'POST',
        headers : {
          'Content-Type' : 'application/json'
        },
        body : JSON.stringify(data)
    }

    longUrlText.value = "";

    fetch('https://tdtr.herokuapp.com/api/url/shorten',payload)
    .then(
      (res)=>{console.log(res.body);}
    ).then(()=>{render();renderLast();});

}

submit.addEventListener('click',shortenUrl);