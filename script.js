console.log('script.js connected')

const cardContainer = document.getElementById('card-container')

const fetchAllPosts = () => {
    const url = 'https://openapi.programming-hero.com/api/retro-forum/posts';
    fetch(url)
    .then((res) => res.json())
    .then(({posts}) => {
       posts.forEach((id) => {
        console.log(id)
        const newCard = document.createElement('div')
        newCard.innerHTML = `
        <div>
        <div class="flex flex-row">
        <div class="pl-4 avatar mt-10 h-28">
          <div id="online-status" class="absolute translate-x-16 -translate-y-1 h-4 w-4 rounded-full bg-green-400"></div>
          <div class="w-20 h-20 rounded-lg">
            <img src="${id.image}" />
          </div>
        </div>

        <div class="card-body">
          <div class="flex font-semibold">
            <h4 class="mr-8">&nbsp;#${id.category}</h4>
            <h4>Author:&nbsp;${id.author.name}</h4>
          </div>
          <h2 class="card-title">${id.title}</h2>
          <p class="border-b-2 border-dashed border-gray-500 pb-4">
            ${id.description}
          </p>
          <div class="flex justify-between">
            <div class="flex gap-8">
              <p><i class="fa-regular fa-message"></i>&nbsp;${id.comment_count}</p>
              <p><i class="fa-solid fa-eye"></i>&nbsp;${id.view_count}</p>
              <p><i class="fa-regular fa-clock"></i>&nbsp;${id.posted_time}</p>
            </div>
            <div class="card-actions justify-end">
              <button class="btn btn-primary rounded-full bg-green-600"><i class="fa-solid fa-envelope-open"></i></button>
            </div>
          </div>
        </div>
      </div>
      </div>
        `
        cardContainer.appendChild(newCard)
       })
    })
    
}
fetchAllPosts();
