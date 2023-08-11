document.addEventListener("DOMContentLoaded", () => {
});

const searchResultStatus = document.querySelector('.search-blog-status');
const searchResultStatusText = document.querySelector('.search-blog-status-text');
const blogFilterList = document.querySelector('#blog-filter-list');
const blogInputSearch = document.querySelector('#search-blog');
function searchBlogs() {
  var searchInput = document.getElementById('search-blog');
  var query = searchInput.value.toLowerCase();

  var allBlogCards = document.querySelectorAll('.blog-post-card');
  var count = 0;

  for (var i = 0; i < allBlogCards.length; i++) {
    var blogCard = allBlogCards[i];
    const blogContent = blogCard.textContent.toLowerCase();
    blogCard.classList.add('search-active');
    if (blogContent.includes(query)) {
      blogCard.classList.add('active');
      count++;
    } else {
      blogCard.classList.remove('active');
    }
  }
  if(query.length > 0) {
    //enable search
    //console.log('enable search');
    searchResultStatus.style.display = 'block';
    searchResultStatusText.innerHTML = '<b>'+count+'</b>';
    searchResultStatusText.innerHTML += count>1?' Results for':' Result for';
    blogFilterList.textContent = query;
    blogInputSearch.classList.add('active');
    if (count > 0) {
    } else {
    }
  } else {
    //disabled search
    //console.log('disable search');
    blogCard.classList.remove('search-active');
    blogCard.classList.remove('active');
    searchResultStatus.style.display = 'none';
    blogInputSearch.classList.remove('active');
  }
}

searchResultStatus.style.display = 'none';
blogInputSearch.addEventListener("keyup", (event) => {
  if (event.isComposing || event.keyCode === 229) {
    return;
  }
  searchBlogs();
});
blogInputSearch.addEventListener("change", (event) => {
  if (event.isComposing || event.keyCode === 229) {
    return;
  }
  searchBlogs();
});

function blogClearSearch() {
  var searchInput = document.getElementById('search-blog');
  searchInput.value = '';
  searchBlogs();
}

const btnClear = document.querySelector('#blog-clear-button');
btnClear.addEventListener('click', blogClearSearch);

const btnClearSearch = document.querySelector('#blog-clear-search');
btnClearSearch.addEventListener('click', blogClearSearch);