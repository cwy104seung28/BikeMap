var map = L.map('map');

// 設定經緯度座標
map.setView(new L.LatLng(23.5, 121), 1);

// 設定圖資來源
var osmUrl = 'https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png';
var osm = new L.TileLayer(
    osmUrl, 
    {
        minZoom: 8,
        maxZoom: 18 
    });
map.addLayer(osm);

function getAuthorizationHeader() {
    //  填入自己 ID、KEY 開始
    let AppID = '207c5a36445144deb01d8b95f4fc1a3c';
    let AppKey = 'sA8n5MZTY6_V-uHoJYi27BlbJyk';
    //  填入自己 ID、KEY 結束
    let GMTString = new Date().toGMTString();
    let ShaObj = new jsSHA('SHA-1', 'TEXT');
    ShaObj.setHMACKey(AppKey, 'TEXT');
    ShaObj.update('x-date: ' + GMTString);
    let HMAC = ShaObj.getHMAC('B64');
    let Authorization = 'hmac username=\"' + AppID + '\", algorithm=\"hmac-sha1\", headers=\"x-date\", signature=\"' + HMAC + '\"';
    return { 'Authorization': Authorization, 'X-Date': GMTString };
}
function addressResponse(address) {
    // let addressCard = document.querySelector("#address-address");
    let content = '';
    axios.get(
        'https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot?$filter=Class1%20ne%20null%20and%20Class2%20ne%20null%20and%20Class3%20ne%20null&$top=16&$format=JSON',

        {
            headers: getAuthorizationHeader()
        }
    )
    // .then((response) => {
    //     // console.log(response.data.Class1)
    //     response.data.forEach(function (data, ID) {
    //         content +=
    //             `<div class="col">
    //             <div class="card">
    //                 <img src="${response.data[ID].Picture.PictureUrl1}" class="card-img-top" alt="${response.data[ID].Picture.PictureDescription1}">
    //                 <div class="card-body">
    //                     <h5 class="card-title">${response.data[ID].Name}</h5>
    //                     <div class="card-address"><i class="fas fa-map-marker-alt fa-fw"></i>${response.data[ID].Address}</div>
    //                     <span class="card-sort">${response.data[ID].Class1}</span>
    //                     <span class="card-sort">${response.data[ID].Class2}</span>
    //                     <span class="card-sort">${response.data[ID].Class3}</span>
    //                 </div>
    //             </div>
    //         </div>
    //         `
    //         // if (response.data[ID].Class1 == undefined){
    //         //     let sort1 = document.getElementsByClassName(".card-sort-1");
    //         //     sort1.style.display = "none";
    //         // }
    //     });
    //     document.querySelector(`#${address}`).innerHTML = content + `<button id="address-more" onClick="moreBtn()" class="travel-more">更多景點</button>`;
    // })
        .catch((error) => console.log(error))

}