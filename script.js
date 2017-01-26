function applyAnchor(tag) {
    var elements = document.getElementsByTagName(tag);
    var anchorName = null;
    var link = null;
    var div = null;
    var span = null;
    for (var i = 0; i < elements.length; i++) {
      anchorName = elements[i].innerHTML.replace(/ /g, '-');
      div = document.createElement('div');
            div.id = anchorName;
            div.className = 'anchor';
      span = document.createElement('span');
             span.appendChild(document.createTextNode(' '));
             span.className = 'anchor-span';
      link = document.createElement('a');
             link.appendChild(document.createTextNode('#'));
             link.href = '#' + anchorName;
      span.appendChild(link);
      elements[i].appendChild(span);
      elements[i].insertBefore(div, elements[i].firstChild);
    }
}

function buildContents(element) {
    applyAnchor('h1');
    applyAnchor('h2');

    newBuildList(document.getElementsByClassName('anchor'), document.getElementById(element));
}

function newBuildList(list, element) {
  var prev = null;
  var ul = document.createElement('ul');
  var header = document.createElement('h3');
  header.appendChild(document.createTextNode('Page contents'));
  element.appendChild(header);
  element.appendChild(ul); // Base list
  for (var i = 0; i < list.length; i++) {
    var link = document.createElement('a');
    var linkText = list[i].id.replace(/-/g, ' ');
    var currentTag = list[i].parentElement.nodeName;
    link.href = i === 0 ? '#' : '#' + list[i].id;
    if (currentTag === 'H1' || i === 0) {
      element.lastChild
             .appendChild(document.createElement('li'))
             .appendChild(link)
             .appendChild(document.createTextNode(linkText));
    } else { // H2
      if (prev === 'H1' || i === 1) {
        element.lastChild
               .appendChild(document.createElement('ul'))
               .appendChild(document.createElement('li'))
               .appendChild(link)
               .appendChild(document.createTextNode(linkText));
      } else {
        element.lastChild.lastChild
               .appendChild(document.createElement('li'))
               .appendChild(link)
               .appendChild(document.createTextNode(linkText));
      }
    }
    prev = currentTag;
  }
}

buildContents('tableOfContents');

(function navbar(nav) {
  var item = document.getElementsByTagName(nav)[0]; // first nav in doc
  var height = document.getElementById('headercontainer').clientHeight;
  function scroll(loc) { item.className = loc > height ? 'nav__fixed' : ''; }
  window.onscroll = function (e) { e.pageY ? scroll(e.pageY) : ''; };
})('nav');
