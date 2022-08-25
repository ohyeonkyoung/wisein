function TreeTagToList(tag,depth = 1,parentArr = []){
    //초기화
    var exceptionMap = {'ul' : '예외zdzdazzz'}

    if(!tag) return;

    //태그 넣기
    [...tag].forEach((el,idx) => {
        let subArr = [];
        let subTag = el.getElementsByClassName('side_mapping_' + (depth + 1));
        let tagTitle = el.innerText.replaceAll(/[\r|\n|' ']/g,'');
        if(Object.keys(exceptionMap).indexOf(el.localName) > -1){//예외 태그
            tagTitle = exceptionMap[el.localName];
        }
        parentArr.push({'tagTitle' : tagTitle,'subTag':subArr, 'depth' : depth, 'id' : el.id})
        tagToList(subTag,depth + 1,subArr)
    });

    return parentArr;
}


function hTagToList(tag, depth = 1,parentArr = []){

    var exceptionMap = {'' : ''}

    if(!tag) return;

    //태그 넣기
    [...tag.childNodes].forEach((el,idx) => {
        if(el.nodeName.startsWith("H")){
            let subArr = [];
            depth = el.nodeName.substring(el.nodeName.length-1)
            let tagTitle = el.innerText

            if(Object.keys(exceptionMap).indexOf(el.localName) > -1){//예외 태그
                tagTitle = exceptionMap[el.localName];
            }

            if(depth <= 3){
            // 1~3 태그만 등록
                parentArr.push({'tagTitle' : tagTitle, 'depth' : depth, 'id' : el.id})
            }
        }
    });

    return parentArr;
}


function listToTag(target,arr,depth){
    //초기화
    if(typeof target != 'object' || Array.isArray(target))
        return;

    depth = depth ? depth : 1

    arr.forEach(function(e){
        target.innerHTML +='<li style = "cursor: pointer; padding-left:' + (e.depth * 10) +'px"> <a href="#'+e.id+'">' +  e.tagTitle + ' </a></li>';
        if(Array.isArray(e.subTag) && e.subTag.length > 0){
            listToTag(target,e.subTag,depth + 1);
        }
    })

}


function listToHTag(target,arr,depth){
    //초기화
    if(typeof target != 'object' || Array.isArray(target))
        return;

    depth = depth ? depth : 1

    arr.forEach(function(e){
        target.innerHTML +='<li style = "cursor: pointer; padding-left:' + (e.depth * 10) +'px"> <a href="#'+e.id+'">' +  e.tagTitle + ' </a></li>';
        if(Array.isArray(e.subTag) && e.subTag.length > 0){
            listToTag(target,e.subTag,depth + 1);
        }
    })

}

export {hTagToList, listToHTag}