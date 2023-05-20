var dat = JSON.parse(JSON.stringify(data));
let obj = dat;



let btncheck = 0;
let itemzone = document.querySelector("#itemzone");

let i = 1;
let transx = 0;
for (i = 0; i < 20; i++) {
    let x = 0;
    if (i % 3 == 2) {
        x = 65;
    }
    else if (i % 3 == 1) {
        x = 40;
    }
    else if (i % 3 == 0) {
        x = 15;
    }
    if (i >= 2 && i % 3 == 0) {
        transx += 1;
    }
    itemzone.innerHTML += `
    <li style="left:${x + 100 * transx}vw; position:absolute;">
        <div class="itembox">
            <div class="imgzone" ondrop="drop(event)" ondragover="dragEnter(event)" ondragend="mouseup()">
                <img src="./resources/상품사진/${obj[i].photo}" class="mainimg" id="img${obj[i].id}" draggable="true" ondragstart="drag(event)">
            </div>
            <div class="itemtext">
                <p>브랜드 : ${obj[i].brand} </p>
                <p>상품명 : ${obj[i].product_name}</p>
                <p>특별가 : <b>${obj[i].price}</b>원 </p>
            </div>
        </div>
    </li>
    `
}

function cho_hangul(val) {
    cho = ["ㄱ", "ㄲ", "ㄴ", "ㄷ", "ㄸ", "ㄹ", "ㅁ", "ㅂ", "ㅃ", "ㅅ", "ㅆ", "ㅇ", "ㅈ", "ㅉ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"];
    result = "";
    for (i = 0; i < val.length; i++) {
        code = val.charCodeAt(i) - 44032;
        if (code > -1 && code < 11172) result += cho[Math.floor(code / 588)];
    }
    return result;
}

let search = document.getElementById("search");
let findValue;
search.onkeyup = function (e) {
    itemzone.innerHTML = ``;
    if (window.event.keyCode == 13) {
        let sarvalue = e.target.value;
        findValue = e.target.value;
        console.log(sarvalue);
        setcnt += 1;

    } 
    else if (search.value == ``) {
        let k = 1;
        let transx = 0;
        console.log(itemzone);
        for (k = 0; k < 20; k++) {
            let x = 0;
            if (k % 3 == 2) {
                x = 65;
            }
            else if (k % 3 == 1) {
                x = 40;
            }
            else if (k % 3 == 0) {
                x = 15;
            }
            if (k >= 2 && k % 3 == 0) {
                transx += 1;
            }
            itemzone.innerHTML += `
            <li style="left:${x + 100 * transx}vw; position:absolute;">
                <div class="itembox">
                    <div class="imgzone" ondrop="drop(event)" ondragover="dragEnter(event)">
                        <img src="./resources/상품사진/${obj[k].photo}" class="mainimg" id="img${obj[k].id}" draggable="true" ondragstart="drag(event)" onmouseup="mouseup()">
                    </div>
                    <div class="itemtext">
                        <p>브랜드 : ${obj[k].brand} </p>
                        <p>상품명 : ${obj[k].product_name}</p>
                        <p id="p${i}>특별가 : <b>${obj[k].price}</b>원 </p>
                    </div>
                </div>
            </li>
            `;
        }
    } else {
        console.log("테스트");
        find();
    }
} 

function keyfind(text){
    let data = "";
    for(let z = 0; z < text.length; z++){
        if(text[z] == search.value[z] || cho_hangul(text[z]) == search.value[z]){
            data = `${data}${text.split(``)[z]}`;
        }
    }
    return data;
}
function keyend(text){
    let data2 = "";
    for(let z = 0; z < text.length; z++){
        console.log("sd",cho_hangul(search.value).split(``)[z] == search.value.split(``)[z]);
        if(search.value.split(``)[z] == cho_hangul(search.value).split(``)[z] && cho_hangul(text).split(``)[z] != search.value.split(``)[z]){
            data2 = `${data2}${text.split(``)[z]}`;
        } else if(search.value.split(``)[z] != cho_hangul(search.value).split(``)[z]){
            data2 = `${data2}${text.split(``)[z]}`;
        }
    }
    console.log("data2", data2);
    return data2;
}

function find(){
    itemzone.innerHTML = ``;
    let setcnt = 0;
    btncheck = 0;
    itemzone.style.cssText = `transform: translateX(0vw);`;
    let transx = 0;
    for(let i = 0; i < obj.length; i++) {
        if (obj[i].brand.includes(search.value)) {
            for (let k = 0; k < 1; k++) {
                let x = 0;   
                if (itemzone.childElementCount == 2 + (3 * transx)) {
                    x = 65;
                }
                else if (itemzone.childElementCount == 1 + (3 * transx)) {
                    x = 40;
                }
                else if (itemzone.childElementCount % 3 == 0) {
                    x = 15;
                }
                if (itemzone.childElementCount == 3 * (transx + 1)) {
                    transx += 1;
                }
                console.log(transx, x);
                itemzone.innerHTML += `
                <li style="left:${x + (100 * transx)}vw; position:absolute;">
                    <div class="itembox">
                        <div class="imgzone" ondrop="drop(event)" ondragover="dragEnter(event)">
                            <img src="./resources/상품사진/${obj[i].photo}" class="mainimg" id="img${obj[i].id}" draggable="true" ondragstart="drag(event)" onmouseup="mouseup()">
                        </div>
                        <div class="itemtext">
                            <p>브랜드 : <span class="keyword">${keyfind(obj[i].brand)}</span>${keyend(obj[i].brand)} </p>
                            <p>상품명 : ${obj[i].product_name}</p>
                            <p id="p${i}>특별가 : <b>${obj[i].price}</b>원 </p>
                        </div>
                    </div>
                </li>
                `
                setcnt++
                console.log(setcnt, "얍얍");
                console.log(setcnt);
            }
        } 
        else if (cho_hangul(obj[i].brand).includes(search.value)) {
            for (let k = 0; k < 1; k++) {
                let x = 0;
                if (itemzone.childElementCount == 2 + (3 * transx)) {
                    x = 65;
                }
                else if (itemzone.childElementCount == 1 + (3 * transx)) {
                    x = 40;
                }
                else if (itemzone.childElementCount % 3 == 0) {
                    x = 15;
                }
                if (itemzone.childElementCount == 3 * (transx + 1)) {
                    transx += 1;
                }
                console.log(transx, x);
                itemzone.innerHTML += `
                <li style="left:${x + (100 * transx)}vw; position:absolute;">
                    <div class="itembox">
                        <div class="imgzone" ondrop="drop(event)" ondragover="dragEnter(event)">
                            <img src="./resources/상품사진/${obj[i].photo}" class="mainimg" id="img${obj[i].id}" draggable="true" ondragstart="drag(event)" onmouseup="mouseup()">
                        </div>
                        <div class="itemtext">
                            <p>브랜드 : <span class="keyword">${keyfind(obj[i].brand)}</span>${keyend(obj[i].brand)} </p>
                            <p>상품명 : ${obj[i].product_name}</p>
                            <p id="p${i} >특별가 : <b>${obj[i].price}</b>원 </p>
                            <p> 수량 : </p>
                        </div>
                    </div>
                </li>
                `
                setcnt++
                console.log(setcnt, "얍얍");
                if(setcnt == 0) {
                    alert("검색 결과가 없습니다.");       
                }
            }

        }
    }
    if(itemzone.childElementCount == 0) {
        alert("검색 결과가 없습니다.");       
    }
}

let leftbtn = document.querySelector("#left");
let rightbtn = document.querySelector("#right");


rightbtn.addEventListener('click', (e) => {
    if (btncheck <= 5) {
        btncheck += 1;
    }
    itemzone.style.cssText = `transform: translateX(${btncheck * -100}vw)`;
})

leftbtn.addEventListener('click', (e) => {
    if (btncheck > 0) {
        btncheck -= 1;
    }
    itemzone.style.cssText = `transform: translateX(${btncheck * -100}vw)`;
})

let nope = document.querySelector("#nope");
let pocket = document.querySelector("#pocket");
nope.addEventListener("click", (e) => {
    pocket.checked = false;
})

let imgzone = document.querySelector(".imgzone");
let mainimg = document.querySelectorAll(".mainimg");
let imgid = null;

let arr = [];
let sum = [];

let itprice = [];
let total = [];


for (let k = 0; k < 20; k++) {
    itprice[k] = obj[k].price;
    let hap = itprice[k].split(',', 3);
    if (hap[2] == undefined) {
        sum[k] = hap[0] + hap[1];
    }
    else {
        sum[k] = hap[0] + hap[1] + hap[2];
    }
    sum[k] = Number(sum[k]);
}

/* 장바구니 담기 */
function dragEnter(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
    let targetid = ev.target.id;
    imgid = targetid.substring(3, 5);
    console.log("imgId",ev.target.id);
    let drop = document.querySelector("#dropzone");
    drop.style.cssText = `transform: scale(1); transition:0.5s;`;
}

function mouseup(){
    console.log("s")
    document.querySelector("#dropzone").style.cssText = `transform: scale(0); transition:0.5s;`;
};

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    let droptext = document.querySelector("#droptext");
    console.log(ev.target.id)
    let dropb = document.querySelector("#dropzone");
    dropb.style.cssText = `transform: scale(0); transition:0.5s;`;
    if(ev.target.id == "droptext" || ev.target.id == "drop") {
        itemadd()
        total[imgid] = sum[imgid - 1]
        Printhap()
    } else {
        dropb.style.cssText = `transform: scale(0); transition:0.5s;`;
    }
    console.log(ev.target);
}
/* 장바구니 담기 */

/* 삭제 및 더하기 */
function Del(el) {
    console.log(el);
    let dropa = el.id.substring(5, 7);
    console.log("drop",dropa);
    let dropli = document.querySelector(`#li${dropa}`);
    total[dropa] = 0;
    console.log("imgid",imgid);
    arr[dropa] = 0;
    total[dropa] = 0;
    dropli.remove();
    Printhap()
}

function Sum(val) {
    let value = val.value; //바뀐 값
    let itemid = Number(val.id.substring(6, 8));
    console.log("sum[imgid]",sum,imgid);
    total[itemid] = sum[Number(val.id.split("r")[1])-1] * value;
    console.log("total[itemid]",val.id.split("r")[1], total[itemid]);
    let pid = document.querySelector(`#p${itemid}`);
    pid.innerHTML =
        `
            가격 : <b> ${total[itemid]} </b>원
        `
    Printhap();
}
function Printhap() {
    let sumzone = document.querySelector("#sum");
    let totalsum = 0;
    for (let j = 0; j < 21; j++) {
        if (total[j] != undefined) {
            totalsum += total[j];
        }
    }
    sumzone.innerHTML = `
            <h1> 총합:<span> ${totalsum}</span> 원</h1>
        `;
}

/* 삭제 및 더하기 */

function itemadd() {

    let thing = document.querySelector("#thing");
    if (imgid != 20) {
        if (arr.includes(imgid) == false) {
            thing.innerHTML += `
                <li id="li${imgid}">
                    <div id="close${imgid}" class="close" onClick="Del(this)">
                        <div></div>
                        <div></div>
                    </div>
                    <input type="number" value="1" id="number${imgid}" min="1" placeholder="수량" onChange="Sum(this)" onmouseup="mouseup()">
                    </label>
                    <img src="./resources/상품사진/product_${imgid}.jpg" style="width:10vw;" onmouseup="mouseup()">
                    <div class="description">
                        <h1>${obj[imgid-1].brand} </h1> 
                        <p>브랜드 : ${obj[imgid-1].product_name}</p>
                        <p id="p${imgid}">가격 : <b>${sum[imgid-1]}</b>원</p>
                    </p>
                </li>
            `
            arr[imgid] = imgid;
        }
        else {
            alert("이미 장바구니에 담긴 상품입니다.");
        }
    }
    else {
        if (arr.includes(imgid) == false) {
            thing.innerHTML += `
                <li id="li${imgid}" class="litem">
                    <div id="close${imgid}" class="close" onClick="Del(this)">
                        <div></div>
                        <div></div>
                    </div>
                    <input type="number" value="1" id="number20" min="1" placeholder="수량" onChange="Sum(this)">
                    </label>
                    <img src="./resources/상품사진/product_20.jpg" style="width:10vw;">
                    <div class="description">
                        <h1>세븐펫 </h1> 
                        <p>브랜드 : 세븐펫</p>
                        <p id="p20">가격 : <b>15900</b>원 </p>
                    </p>
                </li>
    `
            arr[imgid] = imgid;
        }
        else {
            alert("이미 장바구니에 담긴 상품입니다.");
        }
    }
};

let buy = document.querySelector("#end");
let order = document.querySelector("#order");

buy.addEventListener("click", (e) => {
    let name = document.querySelector("#name").value
    let address1 = document.querySelector("#address1").value
    let address2 = document.querySelector("#address2").value
    if(name.length != 0 && address1.length != 0 && address2.length != 0) {
        thing.innerHTML = '';
        order.checked = false;
        pocket.checked = false;
        for(let i = 0; i<21; i++) {
            arr[i] = 0;
            total[i] = 0;
        }
        Printhap()
    }
})


