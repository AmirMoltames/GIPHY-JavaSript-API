// let links = [
//     {
//         label: "MostPopular",
//         url: "#MostPopular"
//     },
//     {
//         label: "MostTrending",
//         url: "#MostTrending"
//     },
//     {
//         label: "Random",
//         url: "#Random"
//     },
// ];
// let ulElement = document.createElement('ul');
// ulElement.id = "main-nav";
//
// for (let i = 0; i < links.length; i++) {
//     let liElement = document.createElement('li');
//
//     let aElement = document.createElement('a')
//
//     aElement.href = links[i].url;
//
//     aElement.textContent = links[i].label;
//
//     liElement.appendChild(aElement);
//
//     ulElement.appendChild(liElement);
// }
// /* let buttonElement = document.createElement('button');
// buttonElement.textContent = 'Search'; */
//
// let formElement = document.createElement('form');
// formElement.id = 'search-form';
// document.body.appendChild(ulElement);
// document.body.appendChild(formElement);
// let inputElement = document.createElement('input');
// inputElement.placeholder = "search for Giphy";
// let buttonFormElement = document.createElement('button');
// buttonFormElement.textContent = "search";
// formElement.appendChild(inputElement);
// formElement.appendChild(buttonFormElement);

async function displayContent(endPoint, search = false, query = '') {
  let resultElement = document.getElementById('result');
  resultElement.innerHTML = '';
  if (search) {
    if (query === 'popular') {
      document.getElementById('title').innerText = query.charAt(0).toUpperCase() + query.slice(1);
    } else {
      document.getElementById('title').innerText = 'Search result for: ' + query.charAt(0).toUpperCase() + query.slice(1);
    }
  } else {
    document.getElementById('title').innerText = endPoint.charAt(0).toUpperCase() + endPoint.slice(1);

  }
  const reply = await loadGifs(endPoint, search, query);
  if (reply.data.length > 1) {
    for (let i = 0; i < reply.data.length; i++) {
      let gifElement = createGifElement(reply.data[i]);
      resultElement.appendChild(gifElement);
    }
  } else if (Object.keys(reply.data).length !== 0) {
    let gifElement = createGifElement(reply.data);
    resultElement.appendChild(gifElement);
  } else {
    document.getElementById('title').innerText = 'No search result found for "' + query.charAt(0).toUpperCase() + query.slice(1) + '"';
  }
}

async function loadGifs(endPoint, search, query) {
  const apiKey = '7RnCAJRM2UuG6CfLOHTU835dVNfQ1XgF';
  let url;
  if (search === true) {
    url = 'https://api.giphy.com/v1/gifs/search';
    url += '?api_key=' + apiKey + '&q=' + query + '&limit=30';
  } else {
    url = 'https://api.giphy.com/v1/gifs/' + endPoint;
    url += '?api_key=' + apiKey + '&limit=30';
  }
  let result = await fetch(url);
  return await result.json();
}

function createGifElement(data) {
  let imgLinkElm = document.createElement('a');
  imgLinkElm.href = data.url;
  let imgElement = document.createElement('img');
  imgElement.classList.add('giphy-img');
  imgLinkElm.appendChild(imgElement);
  imgElement.src = data.images.original.url;

  return imgLinkElm;
}

function displaySearch() {
  let searchForm = document.getElementById('search_form');
  searchForm.addEventListener('submit', function(e) {
    e.preventDefault();
    let searchInput = document.getElementById('search');
    displayContent('', true, searchInput.value).catch(console.error);

  });
}

window.addEventListener('load', function() {
  document.getElementById('date').innerText = new Date().getFullYear().toString();
  displaySearch();
  // displayContent('', true, 'popular').catch(console.error);
});