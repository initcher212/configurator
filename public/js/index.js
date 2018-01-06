function populateSelect(id, options) {
  //  Получение select
  const select = $('#'+id);
    //  document.getElementById(id) = $('#'+id)
  //  Цикл по вариантам
  for (let i = 0; i < options.length; i++) {
    //  Создание опции
    const option = $('<option>', {
      value: options[i],
      text: options[i],
    });
      //  const option = document.createElement('option');
      //  option.val = '';
      //  option.textContent = '';
    //  Вставка опции в select
    select.append(option);
  }
}

function populateRadios(className, options) {
  //  Получение контейнера
  const container = $('.'+className);
    //  document.getElementsByClassName(className)
    //  =
    //  $('.'+className);
  //  Цикл по вариантам
  for (let i = 0; i < options.length; i++) {
    //  Уникальный ID
    const id = className + '' + i;
    //  Обёртка для radio
    const radioContainer = $('<div>', { class: 'radio' });
    //  Создание radio-button
    const radio = $('<input>', {
      type: 'radio',
      name: className,
      id: id,
      value: options[i],
    });
    //  Создание label
    const label = $('<label>', {
      text: options[i],
    });
    //  Вставляем radio ПЕРЕД чем-то ещё
    label.prepend(radio);
    //  Вставляем label в div.radio
    radioContainer.append(label);
    //  Вставка в контейнер
    container.append(radioContainer);
  }
}

function formUniqueOptions(key) {
  const array = [];
  for (let i = 0; i < products.length; i++) {
    if (!array.includes(products[i][key])) {
      array.push(products[i][key]);
      //  products[i].type
      //  products[i]['type']
    }
  }
  return array;
}

populateSelect('type', formUniqueOptions('type'));
populateSelect('category', formUniqueOptions('category'));
populateRadios('color', formUniqueOptions('color'));
populateRadios('parameter', formUniqueOptions('parameter'));

//  Типы

// const types = [];
// for (let i = 0; i < products.length; i++) {

//   // if (types.includes(products[i])) {
//   //   return false;
//   // }
//   // types.push(products[i].type);    
  
//   if (!types.includes(products[i].type)) {
//     types.push(products[i].type);    
//   }
// }
// populateSelect('type', types);

//  Категории

// const categories = [];
// for (let i = 0; i < products.length; i++) {

//   // if (categories.includes(products[i].category)) {
//   //   return false;
//   // }
//   // categories.push(products[i].category);    
  
//   if (!categories.includes(products[i].category)) {
//     categories.push(products[i].category);    
//   }
// }
// populateSelect('category', categories);

const state = {
  type: '',
  category: '',
  color: '',
  parameter: '',
};

function onChangeHandler(selector, name) {
  $(selector).on('change', function (e) {
    const val = $(this).val();
    //  e.target.value = $(this).val()
    // console.log(val);
    state[name] = val;
    filterProducts();
  });
}

onChangeHandler('#type', 'type');
onChangeHandler('#category', 'category');
onChangeHandler('.color input', 'color');
onChangeHandler('.parameter input', 'parameter');

function filterProducts() {
  //  Пустой массив для отфильтрованных товаров
  const filteredProducts = [];
  //  Цикл по товарам
  for (let i = 0; i < products.length; i++) {
    // if (state.category !== '' && (state.category === products[i].category) && state.type !== '' && (state.type === products[i].type)) {
    //   //
    // }
    //  Массив со значениями условий
    const isCorrect = [];
    if (state.type !== '') {
      isCorrect.push(state.type === products[i].type);
    }
    if (state.category !== '') {
      isCorrect.push(state.category === products[i].category);
    }
    if (state.color !== '') {
      isCorrect.push(state.color === products[i].color);
    }
    if (state.parameter !== '') {
      isCorrect.push(state.parameter === products[i].parameter);
    }
    const shouldShow = isCorrect.every(function (val) {
      return val === true;
    });
    if (shouldShow) {
      filteredProducts.push(products[i]);
    }
  }
  //  Вызываем вывод товаров на страницу
  renderProducts(filteredProducts);
}

function renderProducts(products) {
  const container = $('.products');
  container.html('');
  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    const item = $('<div>', { class: 'col-md-4 product' });
    const img = $('<img>', { src: `./public/img/${product.img}`, class: 'product-image' });
    const name = $('<div>', { text: product.name });
    const type = $('<div>', { text: `Тип: ${product.type}` });
    const category = $('<div>', { text: 'Акции: ' + product.category });
    const color = $('<div>', { text: `Цвет: ${product.color}` });
    const parameter = $('<div>', { text: `Мобильность: ${product.parameter}` });
    item
      .append(img)
      .append(name)
      .append(type)
      .append(category)
      .append(color)
      .append(parameter);
    container.append(item);
  }
}

filterProducts();
