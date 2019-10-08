const tableHeader = ['Ноутбук', 'Память', 'Процессор', 'Цвет', 'Комментарий', 'Email']
let tableInfo = []
function submit() {
  if (validation()) {
    document.getElementById('button').classList.add('success')
    setItems()
    setTimeout(() => {
      document.getElementById('button').classList.remove('success')
    }, 300)
  } else {
    document.getElementById('button').classList.add('error')
    setTimeout(() => {
      document.getElementById('button').classList.remove('error')
    }, 300)
  }
}
function validation() {
  const reEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/i
  let bool = true
  let fields = [{
    type: 'input',
    inputName: 'model'
  },
  {
    type: 'select',
    inputName: 'select'
  },
  {
    type: 'input',
    inputName: 'radio'
  },
  {
    type: 'textarea',
    inputName: 'textarea'
  },
  {
    type: 'input',
    inputName: 'email'
  }]
  fields.forEach(field => checkValidField(field.type, field.inputName))
  if (fields.some(field => validateField(field.type, field.inputName))) {
    bool = false
  }
  if (!document.querySelectorAll('[type="checkbox"]:checked').length) {
    document.getElementById('checkbox-box').classList.add('error')
    setTimeout(() => {
      document.getElementById('checkbox-box').classList.remove('error')
    }, 300)
    bool = false
  }
  if (!reEmail.test(document.getElementById('email').value)) {
    bool = false
  }
  return bool
}

function validateField(type, inputName) {
  return document.querySelector(type + '[name=\"' + inputName + '\"]').value === ''
}

function checkValidField(type, inputName) {
  if (document.querySelector(type + '[name=\"' + inputName + '\"]').value === '') {
    document.querySelector(type + '[name=\"' + inputName + '\"]').classList.add('error')
    setTimeout(() => {
      document.querySelector(type + '[name=\"' + inputName + '\"]').classList.remove('error')
    }, 300)
    return true
  } else if (inputName === 'select' || inputName === 'radio') {
    if (inputName === 'radio' && !document.querySelector('[type="radio"]:checked')) {
      document.getElementById(inputName).classList.add('error')
      setTimeout(() => {
        document.getElementById(inputName).classList.remove('error')
      }, 300)
    }
    if (inputName === 'select' && document.getElementById('select').options[document.getElementById('select').selectedIndex].value) {
      document.getElementById(inputName).classList.add('error')
      setTimeout(() => {
        document.getElementById(inputName).classList.remove('error')
      }, 300)
    }
  } else {
    return false
  }
}

function setItems() {
  let memory = []
  document.querySelectorAll('[type="checkbox"]:checked').forEach(item => memory.push(item.value))
  let formObject = {
    name: document.getElementById('name').value,
    memory,
    cpu: document.getElementById('select').options[document.getElementById('select').selectedIndex].value,
    color: document.querySelector('[type="radio"]:checked').value,
    comment: document.getElementById('textarea').value,
    email: document.getElementById('email').value
  }
  tableInfo.push(formObject)
  clearFields()
}

function clearFields() {
  document.getElementById('name').value = ''
  document.getElementById('textarea').value = ''
  document.getElementById('email').value = ''
  document.getElementById('select').selectedIndex = 0
  let radios = document.getElementsByName("radio")
  let checkboxes = document.querySelectorAll('[type="checkbox"]:checked')
  for (let i = 0 ; i < radios.length; i++) {
    radios[i].checked = false
  }
  for (let i = 0 ; i < checkboxes.length; i++) {
    checkboxes[i].checked = false
  }
}

function clearTable() {
  document.getElementsByTagName('tbody')[0].remove()
  let tbody = document.createElement('tbody')
  let tr = document.createElement('tr')
  let td = document.createElement('td')
  for(let i = 0; i < tableHeader.length; i++) { 
    let th = document.createElement('th')
    th.append(document.createTextNode(tableHeader[i])) // добавляет текст в тег
    tr.append(th)
  }
  tbody.append(tr)
  td.setAttribute('colspan', 6)
  td.append(document.createTextNode('Таблица пуста'))
  tr = document.createElement('tr')
  tr.append(td)
  tbody.append(tr)
  document.getElementsByTagName('table')[0].append(tbody)
}

function createTable() {
  let tableElem = document.createElement('table')
  let tbodyElem = document.createElement('tbody')
  let ol = document.createElement('ol')
  for (let i = 0; i <= tableInfo.length; i++) { // цикл строк
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
    if (tableInfo.length && tableInfo[i]) {
      for (let key in tableInfo[i]) { // цикл столбцов
        let td = document.createElement('td')
        td.appendChild(document.createTextNode(tableInfo[i][key])) // добавляет текст в тег
        tr.appendChild(td)
      }
      li.appendChild(document.createTextNode(tableInfo[i]['name']))
      ol.appendChild(li)
    } else {
      let td = document.createElement('td')
      td.appendChild(document.createTextNode('Таблица пуста')) // добавляет текст в тег
      td.setAttribute('colspan', '6') // добавляет текст в тег
      tr.appendChild(td)
    }
    if (i !== tableInfo.length || i === 0) {
      tbodyElem.appendChild(tr)
    }
  }
  tableElem.appendChild(tbodyElem)
  openWindow(tableElem.outerHTML, ol.outerHTML)
}

function openWindow(data, list) {
  let params = ''
  params  = 'width='+screen.width
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
    '<div class="flex-container">' +
      '<header>' +
        '<div class="header">' +
          '<img src="./assets/logo.svg" alt="logo">' +
          '<h1>Магазин ноутбуков Xiaomi</h1>' +
          '<span class="info-text"> +375 (29) 182-78-43</span>' +
          '<span class="info-text"> 10:00 – 21:00</span>' +
        '</div>' +
      '</header>' +
      '<div class="container">' +
        '<nav class="nav-bar">' +
          '<p onclick="window.close()">Закрыть окно</p>' +
        '</nav>' +
        '<section class="main-page">' +
          '<div class="line">' +
            '<h2>Результаты</h2>' +
          '</div>' +
          '<div class="main-block">' +
            '<div class="field">' +
              '<h3 class="t-a-s">Таблица</h3>' +
            '</div>' +
            '<div class="field" id="table">' +
              data +
            '</div>' +
            '<div class="field" id="list">' +
              list +
            '</div>' +
            '<div class="field">' +
              '<button type="button" onclick="clearTable()">Очистить</button>' +
            '</div>' +
          '</div>' +
        '</section>' +
        '<section class="side-bar"></section>' +
      '</div>' +
      '<footer>' +
        '<p>© 2017–2019 Общество с ограниченной ответственностью "МИ БАЙ" 224030 г. Брест, ул. Советская, д.56</p>' +
        '<p>Разработка интернет-магазина — Новый сайт</p>' +
      '</footer>' +
    '</div>' +
    '<script src="./js/index.js"></script>' +
  '</body>'
  let newWindow = window.open('', 'Результаты', params)
  newWindow.document.write('<link rel="stylesheet" href="css/style.css">')
  newWindow.document.write(document)
}