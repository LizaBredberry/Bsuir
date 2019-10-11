const tableHeader = ['Номер п/п', 'Значение', 'Номер в списке']
let deletedItems = []

function addItem() {
  let option = document.createElement("option")
  let inputValue = document.querySelector('input[name="model"]').value
  option.value = inputValue
  option.text = inputValue
  document.getElementById('select').options.add(option, 2)
  document.querySelector('input[name="model"]').value = ''
}

function deleteItem() {
  let select = document.getElementById('select')
  if (select.selectedIndex !== -1) {
    let selectValue = select.options[select.selectedIndex].value
    deletedItems.push({
      index: Number,
      value: selectValue,
      deleteNumber: select.selectedIndex + 1
    })
    select.remove(select.selectedIndex)
  }
}


function createTable() {
  let tableElem = document.createElement('table')
  let tbodyElem = document.createElement('tbody')
  let ol = document.createElement('ol')
  for (let i = 0; i <= deletedItems.length; i++) { // цикл строк
    if (i === 0) {// условие для построение главной шапки таблицы
      let tr = document.createElement('tr')
      for(let j = 0; j < tableHeader.length; j++) { 
        let th = document.createElement('th')
        th.appendChild(document.createTextNode(tableHeader[j])) // добавляет текст в тег
        tr.appendChild(th)
        tbodyElem.appendChild(tr)
      }
    }
    let tr = document.createElement('tr')
    let li = document.createElement('li')
    if (deletedItems.length && deletedItems[i]) {
      deletedItems[i].index = i + 1
      for (let key in deletedItems[i]) { // цикл столбцов
        let td = document.createElement('td')
        td.appendChild(document.createTextNode(deletedItems[i][key])) // добавляет текст в тег
        tr.appendChild(td)
      }
      li.appendChild(document.createTextNode(deletedItems[i].value))
      ol.appendChild(li)
    } else {
      let td = document.createElement('td')
      td.appendChild(document.createTextNode('Таблица пуста')) // добавляет текст в тег
      td.setAttribute('colspan', tableHeader.length) // добавляет текст в тег
      tr.appendChild(td)
    }
    if (i !== deletedItems.length || i === 0) {
      tbodyElem.appendChild(tr)
    }
  }
  tableElem.appendChild(tbodyElem)
  openWindow(tableElem.outerHTML, ol.outerHTML)
}

function openWindow(data, list) {
  let params = ''
  params  = 'width='+screen.width - 100
  params += ', height='+screen.height
  params += ', top=0, left=0'
  params += ', fullscreen=yes'
  params += ', directories=no'
  params += ', location=no'
  params += ', menubar=no'
  params += ', resizable=no'
  params += ', scrollbars=no'
  params += ', status=no'
  params += ', toolbar=no'
  let document = 
  '<head>' +
    '<meta charset="UTF-8">' +
    '<meta name="viewport" content="width=device-width, initial-scale=1.0">' +
    '<meta http-equiv="X-UA-Compatible" content="ie=edge">' +
    '<link rel="stylesheet" href="css/style.css">' +
    '<title>Main page</title>' +
  '</head>' +
  '<body>' +
    '<div class="container">' +
      '<section class="main-page">' +
        '<div class="main-block">' +
          '<div class="field">' +
            '<h3 class="t-a-s">Таблица</h3>' +
          '</div>' +
          '<div class="field" id="table">' +
            data +
          '</div>' + (deletedItems.length ?
          ('<div class="field" id="list">' +
            list +
          '</div>') : '') +
          '<div class="field button-field">' +
            '<button type="button" onclick="window.close()">Закрыть</button>' +
          '</div>' +
        '</div>' +
      '</section>' +
    '</div>' +
    '<script src="./js/index.js"></script>' +
  '</body>'
  let newWindow = window.open('', 'Результаты', params)
  newWindow.document.write('<link rel="stylesheet" href="css/style.css">')
  newWindow.document.write(document)
}
