function applyAnchor(tag) {
    tag = document.getElementsByTagName(tag);
    let anchorName = "", tHTML = "";
    for(let i = 0; i < tag.length; i++){
      if(!tag[i].innerHTML.includes('class="anchor"')){
        anchorName = tag[i].innerHTML.replace(/ /g, "-");
        tag[i].innerHTML = "<div id='" + anchorName + "' class='anchor'></div>\n" + tag[i].innerHTML;
      }
    }
}

function buildList(list){
  let prev = null, ulP = "<ul>\n", ulA = "</ul>\n", liP = "<li>", liA = "</li>\n",
      one = "  ", two = "    ", a = null, contents = [];
  for(let i = 0; i < list.length; i++){
    a = "<a href='#" + list[i].id + "'>" + list[i].id.replace(/-/g, " ") + "</a>"; //Define link
    if(!i){//IF FIRST ELEMENT
      a = "<a href='#'>" + list[i].id.replace(/-/g, " ") + "</a>";
      contents.push([
        ulP,
          one,liP,a,liA
      ].join(""));
      prev = "h1";
    }
    else if(list[i].parentElement.nodeName === "H1"){ //IF H1
      if(prev === "h1"){                              //IF H1 FOLLOWING H1
        contents.push([
          ulA,
          ulP,
            one,liP,a,liA
        ].join(""));
        prev = "h1";
      }
      else{                                           //IF H1 FOLLOWING H2
        contents.push([
          one,ulA,
          ulA,
          ulP,
            one,liP,a,liA
        ].join(""));
        prev = "h1";
      }
    }
    else{
      if(prev === "h1"){                             //IF H2 FOLLOWING H1
        contents.push([
          one,ulP,
            two,liP,a,liA
        ].join(""));
        prev = "h2";
      }
      else{                                           //IF H2 FOLLOWING H2
        contents.push([
            two,liP,a,liA
        ].join(""));
        prev = "h2";
      }
    }
  }

  if(prev = "h2"){ //Add closing tags
    contents.push([one,ulA,ulA].join(""))
  }else{ contents.push([ulA].join("")) }

  return contents.join("");
}

function buildContents(element) {
    applyAnchor("h1");
    applyAnchor("h2");

    document.getElementById(element).innerHTML = "<h3>Contents</h3>\n" + buildList(document.getElementsByClassName('anchor'));
}

function formatter (text) {
    let txt = text.split("\n");
    txt = txt.map(e => {
      if(e[0] === "#" && e[1] === "#") return `<h2>${e.substr(2)}</h2>`
      else if(e[0] === "#") return `<h1>${e.substr(1)}</h1>`
      else return `<p>${e}</p>`
    });
    return txt.join('\n')
}

document.getElementById('button').addEventListener('click', e => {
  const textEl = document.querySelector('.text');
  document.getElementById('content').innerHTML += formatter(textEl.value);
  textEl.value = "";
  buildContents('tableOfContents')
});


buildContents('tableOfContents');
