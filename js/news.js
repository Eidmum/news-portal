document.getElementById('news').addEventListener('click',function(){
    window.location.href = "index.html";
})
document.getElementById('blog').addEventListener('click',function(){
    window.location.href = "blog.html";
})

const newsParent=document.getElementById('news-area');

// load datas
function loadCategory(){
    fetch('https://openapi.programming-hero.com/api/news/categories')
        .then(res=>res.json())
        .then(data=>displayCategory(data.data.news_category))
        .catch("Failed loading data")
}
function loadACategoryData(category_id,category_name1,category_name2){
    document.getElementById('spinnerArea').classList.remove('d-none');
    fetch(`https://openapi.programming-hero.com/api/news/category/${category_id}`)
        .then(res=>res.json())
        .then(data=>displaySingleCategoryData(data.data,category_name1,category_name2))
        .catch("Failed loading data")
}
function moreDetailsLoadData(id){
    fetch(`https://openapi.programming-hero.com/api/news/${id}`)
        .then(res=>res.json())
        .then(data=>displayMoreDetailsData(data.data))
        .catch("Failed loading data")
}
loadCategory();
loadACategoryData("01","Breaking","News");

const categoryParent=document.getElementById('category');
// Display data
let displayMoreDetailsData=(news)=>{
    console.log(news);
    document.getElementById('exampleModalLabel').innerText=news[0].title;
    document.getElementById('modalBody').innerHTML=`
        <h2>Author : ${news[0].author.name ? news[0].author.name : "No data found"}</h2>
        <h3>Published Date and Time : ${news[0].author.published_date ? news[0].author.published_date : "No data found"}</h3>
        <h4>Total views : ${news[0].total_view ? news[0].total_view+"M" : "No data found"}</h4>
        <div>
            <p>
                ${news[0].details}
            </p>
        </div>

    
    `;
}
function displayCategory(categories){
    for(const category of categories){
        let div=document.createElement('div');
        div.classList.add("col-lg-1");
        div.classList.add("col-md-3");
        console.log(category.category_name);
        let categoryName=category.category_name.split(" ");
        console.log(categoryName);
        div.innerHTML=`
            <a onclick=loadACategoryData('${category.category_id}','${categoryName[0]}','${categoryName[1]}')>${category.category_name}</a>
        `;
        
        categoryParent.appendChild(div);
    }
}
function displaySingleCategoryData(news,category_name1,category_name2){
    if(news.length==0)
        document.getElementById('newsCount').innerText= "No News has found";
    else if(category_name2!= "undefined")
        document.getElementById('newsCount').innerText=`${news.length} items found for category ${category_name1} ${category_name2}`;
    else
        document.getElementById('newsCount').innerText=`${news.length} items found for category ${category_name1}`;
        newsParent.innerHTML=``;
    news.sort((x,y)=>{
        if(x.total_view<y.total_view)
            return -1;
        else
            return 1;
    })
    for(let singleNews of news){
        console.log(singleNews._id);
        let totalNews=singleNews.details;
        let slicedNews=totalNews.slice(0,500);
        const div=document.createElement('div');
        div.classList.add('card');
        div.classList.add('mb-3');
        div.innerHTML=`
        <div class="row g-0">
        <div class="col-md-4">
            <img src="${singleNews.image_url}" class="img-fluid h-100 rounded-start" alt="...">
        </div>
        <div class="col-md-8">
            <div class="card-body">
                <h3 class="card-title">${singleNews.title}</h3>
                <p>${slicedNews+" ....."}</p>
           
            </div>
           <div class="row">
                <div class="col-lg-5 d-flex justify-content-center justify-content-lg-start">
                    <div class="d-lg-flex"> 
                        <div class="text-center text-lg-start">
                            <img class="ms-2 rounded-circle" style="height:40px;width:40px" src=${singleNews.author.img}>
                        </div>
                       
                    
                        <div class="ms-3 text-center text-lg-start">
                            <h6>
                                ${singleNews.author.name ? singleNews.author.name : "No data found"}
                            </h6>
                            <p>${singleNews.author.published_date ? singleNews.author.published_date : "No data found"}</p>
                        </div>
                    
                    </div>
                </div>
                <div class="col-lg-2 d-flex justify-content-lg-start justify-content-center">
                    <i class="fa-regular fa-eye"></i>
                    <h6 class='ms-2'>${singleNews.total_view ? singleNews.total_view+"M" : "No data found"}
                    </h6>
                </div>
                <div class="col-lg-3 d-flex justify-content-center justify-content-lg-start ">
                    <h5>Rating : <i class="fa-regular fa-star"></i> ${singleNews.rating.number}</h5>
                </div>
                <div class="col-lg-2 d-flex justify-content-center justify-content-lg-start">
                    <i onclick=moreDetailsLoadData('${singleNews._id}') class="fa-solid fa-arrow-right" data-bs-toggle="modal" data-bs-target="#exampleModal"></i>
                </div>
           </div>
        </div>
    </div>
        `;
    newsParent.appendChild(div);
    

    }
    document.getElementById('spinnerArea').classList.add('d-none');

}

