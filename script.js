

const cardContainer = document.getElementById('card-container')
const titleContainer = document.getElementById('title-div')
const latestPostContainer = document.getElementById('latest-posts-container')

const online = document.getElementById("online-status");
// Show all posts in let's discuss section
const fetchAllPosts = (...searchText) => {
    const url = `https://openapi.programming-hero.com/api/retro-forum/posts?category=${searchText}`;
    fetch(url)
    .then((res) => res.json())
    .then(({posts}) => {
        cardContainer.textContent = ''
       posts.forEach((id) => {
  
        
        const newCard = document.createElement('div')
        
      //  let online = document.getElementById('online-status');
      // mark online status as green or red
        let status= ''
        if (id.isActive) {
         status = `bg-green-400`
        } else {
         status = `bg-red-400`
        }
       
        
        newCard.innerHTML = `
        <div>
        <div class="flex flex-row">
        <div class="pl-4 avatar mt-10 h-28">
          <div id="online-status" class="absolute translate-x-16 -translate-y-1 h-4 w-4 rounded-full ${status}">  
          </div>
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
              <button onclick="addToTitleBox('${id.title}', '${id.view_count}')" id = "mark-button" class="btn btn-primary bg-white rounded-full"><i class="fa-solid fa-envelope-open"></i></button>
            </div>
          </div>
        </div>
      </div>
      </div>

        `
        
        cardContainer.appendChild(newCard)
       })
      laodingSpinner(false);
       
    })
    
}


//adds title into title box 
function  addToTitleBox(id, view_count){

    const post = document.getElementById('id');
    const newCard = document.createElement('div');

    newCard.innerHTML = ` <div>
    <div class="card w-full bg-gray-50 text-gray-600 shadow-xl mt-4">
      <div class="flex justify-between p-4 gap-4">
        <h2 class="font-bold">${id}</h2>
        <p><i class="fa-solid fa-eye"></i>&nbsp;  ${view_count}</p>
      </div>
    </div>
  </div>
  `

  titleContainer.appendChild(newCard)

  //update mark as read count when mark button is clicked
  let count = parseInt(document.getElementById('mark-as-read').innerText);
  document.getElementById('mark-as-read').innerText = count+1;


}

// makes mark button green 



const latestPosts =() =>{
    const url = 'https://openapi.programming-hero.com/api/retro-forum/latest-posts';
    fetch(url)
    .then((res) => res.json())
    .then((res) => {
        res.forEach((id) => {

         const newCard = document.createElement('div')
         newCard.innerHTML = `<div class=" w-full bg-base-100 shadow-xl rounded-2xl">
         <figure><img class = "rounded-2xl" src="${id.cover_image}" alt="Shoes" /></figure>
         <div class="card-body">
             <p id = "publish-date"><i class="fa-regular fa-calendar"></i> ${id.author.posted_date ? id.author.posted_date : 'No publish date'}</p>
           <h2 class="card-title"> ${id.title}</h2>
           <p>${id.description} </p>
             <div class="chat chat-start">
                 <div class="chat-image avatar">
                   <div class="w-10 rounded-full">
                     <img alt="Tailwind CSS chat bubble component" src="${id.profile_image}" />
                   </div>
                 </div>
                 <div class="chat-header text-md font-semibold">
                     ${id.author.name}
                 </div>
                 <div class="">${id.author.designation ? id.author.designation : 'Unknown'}</div>
               </div>
         </div>
       </div>`

       latestPostContainer.appendChild(newCard)
 })
})

}
fetchAllPosts();

const search = () => {
    laodingSpinner(true);
    const searchField = document.getElementById('search-field')
    const searchText = searchField.value;
    fetchAllPosts(searchText);

}

const laodingSpinner = (isLoading) =>{
    const laodingSpinner= document.getElementById('spinner');
    if (isLoading) {
        laodingSpinner.classList.remove('hidden'); 
        setTimeout(() => {
            laodingSpinner.classList.add('hidden'); 
        }, 3000);
    } else {
        laodingSpinner.classList.add('hidden'); 
    }
}
latestPosts();

