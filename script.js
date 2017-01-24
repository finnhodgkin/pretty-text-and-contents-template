function applyAnchor(tag) {
    var elements = document.getElementsByTagName(tag);
    var anchorName = '';
    var link = '';
    for (var i = 0; i < elements.length; i++){
      anchorName = elements[i].innerHTML.replace(/ /g, '-');
      if (tag === 'h2') {
        link = ' <a href="#' + anchorName + '">#</a>';
      }
      elements[i].innerHTML = elements[i].innerHTML +
      '<span id="' + anchorName + '" class="anchor">' +
      link + '</span>\n';
    }
}

function buildContents(element) {
    applyAnchor('h1');
    applyAnchor('h2');

    document.getElementById(element).innerHTML =
      buildList(document.getElementsByClassName('anchor'));
}

function buildList(list){
  var prev = null;
  var ulP = '<ul>\n'; var ulA = '</ul>\n';
  var liP = '<li>'; var liA = '</li>\n';
  var one = '  '; var two = '    ';
  var a = null; var contents = [];
  for (var i = 0; i < list.length; i++) {
    a = '<a href="#' + list[i].id + '">' +
        list[i].id.replace(/-/g, ' ') +
        '</a>'; //Define link
    if (!i) {//IF FIRST ELEMENT
      a = '<a href="#">' +
          list[i].id.replace(/-/g, ' ') +
          '</a>';
      contents.push([ ulP, one, liP, a, liA ].join(''));
      prev = 'h1';
    } else if (list[i].parentElement.nodeName === 'H1') {
        if (prev === 'h1') {                              //IF H1 FOLLOWING H1
          contents.push([ ulA, ulP, one, liP, a, liA ].join(''));
          prev = 'h1';
        }
        else {                                           //IF H1 FOLLOWING H2
          contents.push([ one, ulA, ulA, ulP, one, liP, a, liA ].join(''));
          prev = 'h1';
      }
    } else {
        if (prev === 'h1') {                             //IF H2 FOLLOWING H1
          contents.push([ one, ulP, two, liP, a, liA ].join(''));
          prev = 'h2';
        } else {                                           //IF H2 FOLLOWING H2
          contents.push([ two, liP, a, liA ].join(''));
          prev = 'h2';
        }
    }
  }

  if (prev === 'h2') { //Add closing tags
    contents.push([ one, ulA, ulA ].join(''));
  } else { contents.push([ ulA ].join('')); }

  return contents.length > 2 ?
  '<h3>Page contents</h3>\n' + contents.join('') :
  '';
}

buildContents('tableOfContents');

(function navbar(nav) {
  var item = document.getElementsByTagName(nav)[0]; // first nav in doc
  var height = document.getElementById('headercontainer').clientHeight;
  function scroll(loc) {
    if (loc > height) {
      item.classList = 'nav__fixed';
    } else {
      item.classList = '';
    }
  }
  window.onscroll = (e) => {
    scroll(e.pageY);
  };
})('nav');
