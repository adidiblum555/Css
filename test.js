let originalHotels = [];
let hotelImg = [];
let newDivContent = [];
let globalId;
let count;

const onLoad = () => {
    originalHotels = document.querySelectorAll('.contentDiv');
    hotelImg = ["hilton.png", "marriott.png", "5thHilton.png", "tempo.png", "san.png", "renaissance.png", "iroquois.png"]
      newDivContent = ["", "", "", "", "Great hotel come visit", "New hotel in the city", "The best hotel in country"]
    globalId = originalHotels.length + 1;
    count = 4
}

const clickHeart = (id) => {
    let imgHeart = document.getElementById(id);
    if (imgHeart.getAttribute('src') == "heartCircle.png") {
        imgHeart.src = "fullHeartCircle.png"
    }
    else {
        imgHeart.src = "heartCircle.png"
    }


    organize()


}

const organize = () => {
    let lst = sortConatiner()
    let container = document.getElementById('hotelsDiv');
    container.innerHTML = ' '
    lst.forEach((element) => {
        container.appendChild(element)
    })

}

const checkFilter = () => {
    let checkedItems = checkedArr();

    let hiltonFilters = {
        idHotel: 1,
        filters: ["item1", "item4", "item5"]
    };

    let marriottFilters = {
        idHotel: 2,
        filters: ["item1", "item6", "item5"]
    };

    let clubFilters = {
        idHotel: 3,
        filters: ["item1", "item7", "item6"]
    };

    let tempoFilters = {
        idHotel: 4,
        filters: ["item3", "item4", "item8", "item1"]
    };

    let sanFilters = {
        idHotel: 5,
        filters: ["item1"]
    };

    let renaissanceFilters = {
        idHotel: 6,
        filters: ["item3", "item4", "item8", "item1"]
    };

        let iroquoisFilters = {
        idHotel: 7,
        filters: ["item1"]
    };


    let hotels = [hiltonFilters, marriottFilters, clubFilters, tempoFilters, sanFilters, renaissanceFilters, iroquoisFilters];
    let newHotelsOrder = [];

    for (let i = 0; i < hotels.length; i++) {
        let { idHotel, filters } = hotels[i];


        if (compare(filters, checkedItems) == true) {
            newHotelsOrder.push(idHotel);

        }
    }

    return newHotelsOrder;
}

const isChecked = () => {
    let checkBoxlst = document.querySelectorAll('.filterBtn')
    checkBoxlst.forEach((element) => {
        if (element.checked == true) {
            return false;
        }
    })

    return true;
}
const checkedArr = () => {
    let checkBoxlst = document.querySelectorAll('.filterBtn')
    let arr = [];


    checkBoxlst.forEach((element) => {
        if (element.checked) {
            arr.push(element.getAttribute('id'))
        }
    })



    return arr;
}

const compare = (arr1, arr2) => {
    for (let i = 0; i < arr2.length; i++) {
        if (arr1.includes(arr2[i]) == false) {
            return false;
        }
    }
    return true;
}

const order = () => {
    let container = document.getElementById('hotelsDiv');
    let hotels = checkFilter();
    container.innerHTML = ' '

    if (hotels.length == 0 && !isChecked()) {
        originalHotels.forEach((original) => {
            container.appendChild(original);
        })
    }



    hotels.forEach((element) => {
        originalHotels.forEach((original) => {
            if (element == original.getAttribute('id')) {
                container.appendChild(original);
            }
        })

    })


}

const deleteHotel = (hotelId) => {
    hotels = document.querySelectorAll('.contentDiv');
    originalHotels = hotels
    let arr = (hotelId.split('')).reverse()
    let hotelDelete = document.getElementById(arr[0])
    hotelDelete.remove()
    originalHotels = document.querySelectorAll('.contentDiv');
}



const sortConatiner = () => {
    let container = document.querySelectorAll('.contentDiv')
    let top = []
    let bottom = []
    container.forEach((element) => {
        if (document.getElementById(`heart${element.getAttribute('id')}`).getAttribute('src') == "fullHeartCircle.png") {
            top.push(element)
        }
        else {
            bottom.push(element)
        }


    })
    top = [...top, ...bottom]
    return top;
}

const info = () => {
    let text = document.getElementById('text')
    let input = text.value;
    if (count < hotelImg.length)
    {
    addDiv(input)
    count += 1;
    }

    else{
        alert('No more hotels to add')
    }


}

const addDiv = (text) => {
    let container = document.getElementById('hotelsDiv');
    const newDiv = document.createElement('div');
    const imgDiv = document.createElement('div');
    const textDiv = document.createElement('div');
    newDiv.id = globalId;
    globalId += 1;
    const newH = document.createElement('h2')
    const newImg = document.createElement('img')
    const p = document.createElement('p')
    const heartImg = document.createElement('div')
    const heartCircle = document.createElement('img')
    const hotelImgBorder = document.createElement('div')
    const deleteBorder = document.createElement('div')
    const deleteImgDiv = document.createElement('div')
    const deleteImg = document.createElement('img')
        const rateDiv = document.querySelector('.rateDiv').cloneNode(true)

      





    
    newDiv.classList.add('contentDiv')
    newImg.src = hotelImg[newDiv.getAttribute('id') - 1]
    imgDiv.classList.add('hotelImg')
    newImg.classList.add('contentImg')
    imgDiv.appendChild(newImg);
    heartCircle.src = "heartCircle.png"
    heartImg.classList.add('heartImg')
    heartCircle.classList.add('circleImg')
    deleteBorder.classList.add('deleteImgBorder')
    deleteImgDiv.classList.add('deleteImg')
    deleteImg.classList.add('circleImg')
    deleteBorder.appendChild(deleteImgDiv)
    deleteImgDiv.appendChild(deleteImg)
    deleteImg.src = "delete.png"
    deleteImg.id = 'delete' + newDiv.id
    deleteImg.addEventListener('click', () => {
        deleteHotel(deleteImg.id)
    })
    heartImg.appendChild(heartCircle);
    hotelImgBorder.classList.add('hotelImgBorder');
    hotelImgBorder.appendChild(newImg)
    hotelImgBorder.appendChild(heartImg);
    hotelImgBorder.appendChild(deleteImgDiv)
    newDiv.appendChild(hotelImgBorder)
    heartCircle.id = 'heart' + newDiv.id
    heartCircle.addEventListener('click', () => {
        clickHeart(heartCircle.id)
    })
    textDiv.classList.add('contentText')
    textDiv.append(newH)
    newH.textContent = text
    newH.className = "hDiv"
    textDiv.appendChild(newH)
    p.classList.add('pDiv')
    textDiv.appendChild(p)
    newDiv.appendChild(textDiv)
    p.textContent = newDivContent[newDiv.getAttribute('id') - 1]
    originalHotels = [...originalHotels, newDiv]
    container.appendChild(newDiv);
    newDiv.appendChild(rateDiv)
    newDiv.style.position = 'relative'
    rateDiv.style.marginLeft = 'auto'
}


