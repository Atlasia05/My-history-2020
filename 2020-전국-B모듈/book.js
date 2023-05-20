let arr = [];
let choNameArr = [];
let choCategoryArr = [];

const searchInput = document.getElementById('search');
const searchBtn = document.getElementById('searchBtn');
function cho_hangul(val) {
  cho = ["ㄱ","ㄲ","ㄴ","ㄷ","ㄸ","ㄹ","ㅁ","ㅂ","ㅃ","ㅅ","ㅆ","ㅇ","ㅈ","ㅉ","ㅊ","ㅋ","ㅌ","ㅍ","ㅎ"];
  result = "";
  for(i=0;i<val.length;i++) {
    code = val.charCodeAt(i)-44032;
    if(code>-1 && code<11172) result += cho[Math.floor(code/588)];
  }
  return result;
}

for(let i = 0; i < 6; i++) {
  choCategoryArr[i] = cho_hangul[data[i].c]
}

const list = document.getElementById('list');
for (let i = 0; i < data.length; i++) {
  list.innerHTML += `
  <li>
  <label for="modalck"><img src='./선수제공파일/B/img/${data[i].image}' alt='${data[i].name}'>
  <p>책 제목: ${data[i].name}</p>
  <p>카테고리: ${data[i].category}</p>
  <p>지은이: ${data[i].writer}</p>
  </li>
  `
}
console.log(arr);



function showList(val) {
  console.log(val);
  console.log(data[0].name);
  for(let k = 0; k < 6; k++) {
    console.log(data[k].name.split(val).length >= 2);
    if(data[k].name.split(val).length >= 2 || data[k].category.split(val).length >= 2 || cho_hangul(data[k].category).split(val).length >= 2 || cho_hangul(data[k].writer.split(val).length >= 2)) {
      list.innerHTML = '';
      const li = document.createElement('li');
        li.innerHTML += 
        `
            <label for="modalck"><img src='./선수제공파일/B/img/${data[k].image}' alt='${data[k].name}' class="listimg"></label>
            <p>책 제목: ${data[k].name}</p>
            <p>카테고리: ${data[k].category}</p>
            <p>지은이: ${data[k].writer}</p>
        `
        list.appendChild(li);
    }
  }
    // for(let i = 0; i < 6; i++) {
    //     if(data.name.split(val).length >= 2 || data.category.split(val).length >= 2 || cho_hangul(data.category).split(val).length >= 2 || chosplitdata.writer.split(val).length >= 2) {
          // list.innerHTML = '';
          // const li = document.createElement('li');
          //   li.innerHTML += 
          //   `
          //       <label for="modalck"><img src='./선수제공파일/B/img/${data.image}' alt='${data.name}' class="listimg"></label>
          //       <p>책 제목: ${data.name}</p>
          //       <p>카테고리: ${data.category}</p>
          //       <p>지은이: ${data.writer}</p>
          //   `
          //   list.appendChild(li);
    //     }
    //   }
  }

searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    let value = searchInput.value;
    showList(value);
})


let mzone = document.getElementById('mainzone');

const submit = document.getElementById('submit');
submit.addEventListener('click', (e) => {
  e.preventDefault();
  let tvalue = document.getElementById('tvalue').value;
  let xvalue = document.getElementById('xvalue').value;
  let yvalue = document.getElementById('yvalue').value;
  let fvalue = document.getElementById('fvalue').value;
  let cvalue = document.getElementById('cvalue').value;

  console.log(cvalue);
  
  mzone.innerHTML += 
  `
  <input type="radio" name="objclick" id="obj${chcnt}">
  <label for="obj${chcnt}">
      <span style="position:absolute; left:${xvalue}px; top:${yvalue}px; color:${cvalue}; font-size:${fvalue}px;" class="items">${tvalue}</span>
  </label>
  `

  let input1 = document.getElementById('tvalue'); 
  let input2 = document.getElementById('xvalue');
  let input3 = document.getElementById('yvalue');
  let input4 = document.getElementById('fvalue');
  let input5 = document.getElementById('cvalue');
  
  input1.value = none;
  input2.value = none;
  input3.value = none;
  input4.value = none;
  input5.value = none;

  tar()
  checkcnt()
  document.getElementById("textzone").checked = false;
}
)

let count = 1;
let pagecnt = 3;

const page = document.getElementById('addpage');
page.addEventListener('click', () => {
  console.log(pagecnt);
})

counter()
function counter() {
const cnt = document.getElementById('count');
  cnt.innerHTML = `
    <p>${count} / ${pagecnt} </p>
  `
  pagecnt++
  console.log(pagecnt);
}

let det = document.querySelector(".detail");
det.addEventListener("click", e => {
  if(e.target.id == "beforepage"){
    if(count > 1) {
      count--;
    }
    const cnt = document.getElementById('count');
    cnt.innerHTML = `
    <p>${count} / ${pagecnt-1} </p>
   `
  } 
  else {
    if(count < pagecnt-1) {
      count++;
    }
    const cnt = document.getElementById('count');

    cnt.innerHTML = `
      <p>${count} / ${pagecnt-1} </p>
    `
  }
});
console.log(pagecnt);

var fileInput = document.getElementById("fileInput");
//값이 변경될때 호출 되는 이벤트 리스너
fileInput.addEventListener('change',function(e){
  var file = e.target.files[0]; //선택된 파일
  var reader = new FileReader();
  reader.readAsDataURL(file); //파일을 읽는 메서드 


  reader.onload = function(){
    mzone.innerHTML += `
    <input type="radio" name="objclick" id="obj${chcnt}">
    <label for="obj${chcnt}">
      <video src="${reader.result}" controls autoplay loop style="position:absolute;" class="items"></video>
    </label>
      
    `
    tar()
    checkcnt()
  }
})

let choose = document.querySelector(".choose");
choose.addEventListener("click", e => {
  let imgsrc = e.target.src;

  //SRC로 가져오기

  let [trash, sorce] = imgsrc.split('/B');
  console.log(sorce);
  mzone.innerHTML += `
  <input type="radio" name="objclick" id="obj${chcnt}" class="obj">
  <label for="obj${chcnt}">
    <img draggable="false" src="./선수제공파일/B${sorce}" class="items" style="position:absolute;">
  </label>
  `
  document.getElementById("imgput").checked = false;
  //tar()
  checkcnt()

  //alt로 가져오는 코드

  //let imgalt = e.target.alt;
  // if(e.target.className == "btn-close"){
  //   document.getElementById("imgput").checked = false;
  // }
  // mzone.innerHTML += `
  // <img src="./선수제공파일/B/img/${imgalt}">
  // `
  
})
let none = document.querySelector(".none");
let texts = document.querySelector(".texts");
//드래그앤 드롭
  const draggable = (itemtarget) => {
    let isPress = false,
        prevPosX = 0,
        prevPosY = 0;
    console.log("sd",itemtarget);
    if(choise.checked == true){
      itemtarget.addEventListener("mousedown", e => {
        if(choise.checked == true) start(e);
      });
      itemtarget.addEventListener("mouseup", e => {
        if(choise.checked == true) end(e);
      });
    } else if(choise.checked==false) {
      itemtarget = none;
      console.log("check");
    }
    

    // 상위 영역
    //mzone.onmousemove = move;
    mzone.addEventListener("mousemove", e =>{
      if(choise.checked == true){
        move(e);
      }
    });
  
    function start(e) {
      prevPosX = e.clientX;
      prevPosY = e.clientY;

      isPress = true;
      console.log("start");
    }

    function move(e) {
      if (!isPress) return;
      let textcolor = itemtarget.style.color;
      let textsize = itemtarget.style.fontSize;
      const posX = prevPosX - e.clientX; 
      const posY = prevPosY - e.clientY; 

      prevPosX = e.clientX; 
      prevPosY = e.clientY;
      if(choise.checked == true){
        if(e.target.classList == "items"){
          itemtarget.style.cssText = `position:absolute; top: ${itemtarget.offsetTop - posY}px; left: ${itemtarget.offsetLeft - posX}px; font-size:${textsize}; color:${textcolor};`
      
        } else {
          end(e);
        }
      }
      
    }

    function end(e) {
      isPress = false;
      itemtarget = none;
      console.log("endfun",itemtarget);
    }
    console.log("end",itemtarget);
  }

function tar() {
  let itemtarget = document.querySelector(".items");

    draggable(itemtarget);

}

let chcnt = 0;

function checkcnt() {
  chcnt += 1;
  console.log(chcnt);
}
var del = document.querySelector("#del");
let choise = document.querySelector("#choise");
let obj = document.querySelector(".obj");

mzone.addEventListener("click", e =>{ 
  if(e.target.classList == "items"){
    if(choise.checked == true) {
      draggable(e.target);
      console.log("클릭 호출");
    }
  }
  if(del.checked == true) {
    if(e.target.classList == "items"){
      e.target.remove();
      del.checked = false;
    }
  }
})



