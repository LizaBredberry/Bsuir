const tableHeader = ['Ноубук', 'Память', 'Процессор', 'Цвет', 'Комментарий', 'Email'] // названия ячеек таблица

function submit() { // метод, который используется при нажатии на кнопку "Отправить"
  if (validation()) { // если все поля валидны, то проходим
    document.getElementById('button').classList.add('success')
    setItems() // Этот метод добавляет данные формы в LOCALSTORAGE (браузерное хранилище данных, что-то типо маленькой фейковой базы данных)
    setTimeout(() => { // окрашиваем кнопку в зелённый если всё хорошо на 300 мс
      document.getElementById('button').classList.remove('success')
    }, 300)
  } else {
    document.getElementById('button').classList.add('error') //окрашиваем кнопку в зелённый если всё плохо (поля не валидны) на 300 мс
    setTimeout(() => {
      document.getElementById('button').classList.remove('error')
    }, 300)
  }
}
function validation() { // проверка всех полей
  const reEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/i
  if (document.getElementById('name').value === '' // тут проверяем, заполнены ли все поля
  || document.getElementById('textarea').value === ''
  || document.getElementById('email').value === ''
  || document.getElementById('list').options[document.getElementById('list').selectedIndex].value === ''
  || document.querySelector('[type="radio"]:checked').value === '') {
    return false
  }
  if (!document.querySelectorAll('[type="checkbox"]:checked').length) { // отдельная проверка на выбор хотя бы одного чекбокса
    return false
  }
  if (!reEmail.test(document.getElementById('email').value)) { // проверка email на корректность, с помощью регулярного выражения (то длинное сверху) P.s. не надо знать, как оно работает)
    return false
  }
  return true // если всё збс, идём дальше
}

function setItems() { // тут Добавляем данные
  let formData = JSON.parse(localStorage.getItem('form')) // вытягиваем данные с LocalStorage и преобразуем их в обычный массив
  let array = []
  if (formData) { // если в localStorage что-то есть, то в полученный массив добавляем данные с формы 
    array = addItem(formData)
    localStorage.setItem('form', JSON.stringify(array)) // теперь заменяем старые данные на новые в localStorage
  } else { // если ничего в localStorage нет, то добавляем 
    array = addItem([])
    localStorage.setItem('form', JSON.stringify(array)) // тут устанавливаем новые данные в localStorage, так как там ничего не было
  }
}

function addItem(array) { // тут просто добавляем данные формы в существующий массив данных, который приходит по параметрам
  let memory = []
  document.querySelectorAll('[type="checkbox"]:checked').forEach(item => memory.push(item.value))
  let formObject = {
    name: document.getElementById('name').value,
    memory,
    cpu: document.getElementById('list').options[document.getElementById('list').selectedIndex].value,
    color: document.querySelector('[type="radio"]:checked').value,
    comment: document.getElementById('textarea').value,
    email: document.getElementById('email').value
  }
  array.push(formObject)
  // clearFields() // чистит поля формы
  return array
}

function clearFields() { // чистит поля формы
  document.getElementById('name').value = ''
  document.getElementById('textarea').value = ''
  document.getElementById('email').value = ''
  document.getElementById('list').selectedIndex = 0
  let radios = document.getElementsByName("radio")
  let checkboxes = document.querySelectorAll('[type="checkbox"]:checked')
  for (let i = 0 ; i < radios.length; i++) {
    radios[i].checked = false
  }
  for (let i = 0 ; i < checkboxes.length; i++) {
    checkboxes[i].checked = false
  }
}

window.onload = function() { // этот метод срабатывает каждый раз, когда страница перезагружается или происходит переход между вкладками
  tableCreate() 
}

function tableCreate() { // при каждом обновлении создаём таблицу из данных в LocalStorage
  let formData = JSON.parse(localStorage.getItem('form')) // Получаем данные из LocalStorage
  let tableId = document.getElementById('table')
  if (tableId) {
    let tableElem = document.createElement('table')
    let tbodyElem = document.createElement('tbody')
    if (formData) { // тут строим таблицу, строки и столбцы
      for (let i = 0; i < formData.length; i++) { // цикл строк
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
        for (let key in formData[i]) { // цикл столбцов
          let td = document.createElement('td')
          td.appendChild(document.createTextNode(formData[i][key])) // добавляет текст в тег
          tr.appendChild(td)
        }
        tbodyElem.appendChild(tr)
      }
    } else {
      tableId.appendChild(document.createTextNode('Таблица пуста'))
      tableId.classList.add('t-a-s') // добавляем класс
    }
    tableElem.appendChild(tbodyElem)
    tableId.appendChild(tableElem)
  }
}

function clearStoreFields() { // метод для очистки всей таблицы
  localStorage.removeItem('form') // очищает LocalStorage
  document.getElementsByTagName('tbody')[0].remove() // сносит внутренность таблицы
  document.getElementById('table').appendChild(document.createTextNode('Таблица пуста'))
  document.getElementById('table').classList.add('t-a-s')
}