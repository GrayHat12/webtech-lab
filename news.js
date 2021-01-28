const scrollEl = document.getElementById("scroll");
const search = document.getElementById("searchButton");
const input = document.getElementById("search");

function createArticleUI(news) {
    let a = document.createElement("a");
    a.href = news.url;
    let section = document.createElement("section");
    
    let left = document.createElement("div");
    left.className = "left";
    let img = document.createElement("img");
    img.src = news.urlToImage;
    left.appendChild(img);
    a.appendChild(left);

    let right = document.createElement("div");
    right.className = "right";
    let name = document.createElement("h3");
    let author = document.createElement("h4");
    name.innerText = news.source.name;
    author.innerText = news.author;
    right.appendChild(name);
    right.appendChild(author);

    let title = document.createElement("strong");
    title.innerText = news.title;
    right.appendChild(title);

    let description = document.createElement("div");
    description.appendChild(document.createElement("span"));
    description.children[0].innerText = news.description;
    right.appendChild(description);

    let content = document.createElement("div");
    content.appendChild(document.createElement("span"));
    content.children[0].innerText = news.content;
    right.appendChild(content);

    section.appendChild(left);
    section.appendChild(right);
    a.appendChild(section);
    return a;
};

async function fetchArticles(query) {
    let api = `<<YOUR API KEY>>`;
    let res = await fetch(`https://newsapi.org/v2/everything?apiKey=${api}&q=${query.replace(' ','+')}`);
    let articles = await res.json();
    articles = articles.articles;
    return articles;
};

search.onclick = () => {
    let query = input.value;
    if(query.length <= 4) return;
    fetchArticles(query).then(articles => {
        scrollEl.innerHTML = "";
        articles.forEach(element => {
            let ui = createArticleUI(element);
            scrollEl.appendChild(ui);
        });
    }).catch(console.error);
};