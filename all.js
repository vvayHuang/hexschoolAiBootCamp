$(document).ready(function () {
    // 導覽列漢堡選單
    $(".navbar-btn").click(function () {
        $(".navbar-collapse").toggleClass("show");

    });

    // back to top
    $("#scrollToTop").click(function (e) {
        $("html,body").animate(
            {
                scrollTop: 0
            },
            100
        );
    });

    // 常見問題區塊摺疊效果
    $('.qa-item').click(function (e) {
        $(this).toggleClass('active');
        $(this).find('.add-icon').toggleClass('d-none');
        $(this).find('.remove-icon').toggleClass('d-block');
        $(this).find('.qa-content p').toggleClass('show');
    });
    // 分類按鈕
  $('.product-category-btn').click(function (e) {
    e.preventDefault();
    $(this).toggleClass('active').siblings().removeClass('active');
  });

    // 下拉選單
    $('.filter').click(function (e) {
        $('#filter').toggleClass('show');
    });

    $('.new-old').click(function (e) {
        $('#new-old').toggleClass('show');
    });
    $('.new-to-old').click(function (e) {
        $('#new-old').toggleClass('show');
        $('#btn-sort').text($('.new-to-old').text());
    });
    $('.old-to-new').click(function (e) {
        $('#new-old').toggleClass('show');
        $('#btn-sort').text($('.old-to-new').text());
    });
});

// 卡片輪播
const swiper = new Swiper('.swiper', {
    spaceBetween: 24,
    breakpoints: {
        375: {
            slidesPerView: 1,
            slidesPerGroup: 1,
        },
        576: {
            slidesPerView: 2,
            slidesPerGroup: 2,
        },
        768: {
            slidesPerView: 3,
            slidesPerGroup: 3,
        },
    },
    // 分頁、左右箭頭、滾動條若有使用則必需設定          
    pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true,
    },
});


// axios串接
const apiPath = 'https://2023-engineer-camp.zeabur.app';
const list =document.querySelector('#list');
const pagination = document.querySelector('#pagination');

let worksData = []
let pagesData = {}

const data = {
    type: '',
    sort: 0,
    page: 1,
    search: '',
}

function getData({ type, sort, page, search }) {
    const apiUrl = `${apiPath}/api/v1/works?sort=${sort}&page=${page}&${type ? `type=${type}&` : ''}${search ? `search=${search}` : ''}`
    axios.get(apiUrl)
        .then(function (res) {
            worksData = res.data.ai_works.data;
            pagesData = res.data.ai_works.page;

            renderWork();
            renderPages();
        })
}

getData(data);

// 作品選染至畫面
function renderWork() {
    let works = '';
    worksData.forEach((item) => {
        works += `<div class="col">
        <div class="card">
            <div class="card-img"><img
                    src="${item.imageUrl}"
                    alt="ai image"></div>
            <div class="card-body">
                <h4 class="card-title">${item.title}</h4>
                <p class="card-text">${item.description}</p>
            </div>
            <div class="card-body d-flex justify-content-between">
                <strong>AI 模型</strong>
                <span>${item.model}</span>
            </div>
            <div class="card-body d-flex justify-content-between">
                <span>#${item.type}</span>
                <strong><a href="${item.link}"><span class="material-icons">
                            share
                        </span>
                    </a></strong>
            </div>
        </div>
    </div>`
    });
    list.innerHTML = works;
}
// 切換分頁
function changePage(pagesData) {
    const pageLinks = document.querySelectorAll('a.pagination-link')
    let pageId = '';
  
    pageLinks.forEach((item) => {
  
      item.addEventListener('click', (e) => {
        e.preventDefault();
        pageId = e.target.dataset.page;
        data.page = Number(pageId);
  
        if (!pageId) {
          data.page = Number(pagesData.current_page) + 1
        }
  
        getData(data);
      });
    });
  }
// 分頁選染至畫面
function renderPages() {
    let pageStr = '';

    for (let i = 1; i <= pagesData.total_pages; i += 1) {
        pageStr += /*html*/`<li class="pagination-item ${pagesData.current_page == i ? 'active' : ''}" >
        <a class="pagination-link ${pagesData.current_page == i ? 'disabled' : ''}" href="#"  data-page="${i}">${i}</a>
      </li>`
    };

    if (pagesData.has_next) {
        pageStr +=  /*html*/`<li class="pagination-item">
        <a class="pagination-link" href="#">
          <span class="material-icons">
            chevron_right
          </span>
        </a>
      </li>`
    };
    pagination.innerHTML = pageStr

    changePage(pagesData);
}
// 切換作品排序
const desc = document.querySelector('#desc');
const asc = document.querySelector('#asc');
const btnSort = document.querySelector('#btn-sort');
//  由新到舊 -> sort = 0
desc.addEventListener('click', (e) => {
  e.preventDefault();
  data.sort = 0;
  getData(data);
  btnSort.innerHTML = '由新到舊<span class="material-icons">expand_more</span>';
})
//  由舊到新 -> sort = 1
asc.addEventListener('click', (e) => {
  e.preventDefault();
  data.sort = 1
  getData(data);
  btnSort.innerHTML = '由舊到新<span class="material-icons">expand_more</span>';
})

// 切換作品類型
const filterBtns = document.querySelectorAll('#category-btn')
filterBtns.forEach((item) => {
  item.addEventListener('click', () => {
    if (item.textContent === '全部') {
      data.type = '';
    } else {
      data.type = item.textContent;
    }
    getData(data)
  })
})
// 搜尋
const search = document.querySelector('#search');
search.addEventListener('keydown', (e) => {
  if (e.keyCode === 13) {
    data.search = search.value
    data.page = 1
    getData(data);
  }
})