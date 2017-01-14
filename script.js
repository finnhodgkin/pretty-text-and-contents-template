document.addEventListener("DOMContentLoaded", function () {
  buildContents("tableOfContents");
});

function applyAnchor(tag) {
    tag = document.getElementsByTagName(tag);
    var anchorName = "", tHTML = "";
    for(var i = 0; i < tag.length; i++){
      anchorName = tag[i].innerHTML.replace(/ /g, "-");
      tag[i].innerHTML = "<div id='" + anchorName + "' class='anchor'></div>\n" + tag[i].innerHTML;
    }
}

function buildContents(element) {
    applyAnchor("h1");
    applyAnchor("h2");

    document.getElementById(element).innerHTML = document.getElementById(element).innerHTML + buildList(document.getElementsByClassName('anchor'));
}

function buildList(list){
  var prev = null, ulP = "<ul>\n", ulA = "</ul>\n", liP = "<li>", liA = "</li>\n",
      one = "  ", two = "    ", a = null, contents = [];
  for(i = 0; i < list.length; i++){
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

  if (prev === "h2") { //Add closing tags
    contents.push([one,ulA,ulA].join(""));
  }else{ contents.push([ulA].join("")); }

  return contents.join("");
}
