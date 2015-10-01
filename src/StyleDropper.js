(function(win){

  var StyleDropper = function(){};

  // StyleDropper.
  // {
  //   mapKey: 'se-id',    // attribute name
  //   query: '',
  //   data:{
  //     "{mapKeyValue}": {
  //       "{CSSStyleDeclaration Keys}": "{MappingStyle}",
  //       ...
  //     },
  //     ...
  //   }
  // }

  // extract / insert

  var _elementReg = new RegExp("object HTML[^\s]+Element", "g");

  // var _getStyleCamelCase = function(str){
  //   var splits = str.split('-');
  //   if(splits[0] == "" && splits.length > 1) splits = splits.slice(1);
  //   for(var i = 1, len = splits.length; i < len; i++){
  //     splits[i] = splits[i]? splits[i][0].toUpperCase() : "";
  //   }
  //   return splits.join('');
  // };

  StyleDropper.drop = function(o, element){
    element = (element && _elementReg.test(Object.prototype.toString.call(element)) )? element : document.body;
    o = (typeof o == 'string')? JSON.parse(o || "{}") : o;

    var key = o.mapKey || "";
    var query = o.query || (key? ("[" + key + "]") : "*");
    var data = o.data;
    if(data){
      var els = element.querySelectorAll(query);
      for(var i = 0, len = els.length; i < len; i++){
        var el = els[i];
        var valueMaps = key ? data[el.getAttribute(key)] : data;
        for(var p in valueMaps){
          el.style[p] = valueMaps[p];
        }
      }  
    }
    
    // contain self ?
    // element
  };

  // element
  // mapKey
  // mapKey, element
  // query, mapKey
  // query, mapKey, fromElement
  StyleDropper.suck = function(query, mapKey, fromElement){
    if(_elementReg.test(Object.prototype.toString.call(query))){
      fromElement = query; mapKey = ''; query = '*'; 
    }else if(typeof query == 'string'){
      if(arguments.length == 1){
        mapKey = query; query = '';
      }else if(_elementReg.test(Object.prototype.toString.call(mapKey))) {
        fromElement = mapKey; mapKey = query; query = '';
      }
    }
    mapKey = mapKey || "";
    query = query || (mapKey? ("[" + mapKey + "]") : "*");
    fromElement = (fromElement && _elementReg.test(Object.prototype.toString.call(fromElement)) )? 
      fromElement : document.body;

    var res = {
      mapKey: mapKey,
      query: query,
      data: {}
    };

    var fetch = fromElement.querySelectorAll(query);
    
    for(var i = 0, len = fetch.length; i < len; i++){
      var el = fetch[i];
      var assignData = res.data;
      var assignValue = mapKey ? el.getAttribute(mapKey) : '';
      if(assignValue && !res.data[assignValue]){
        assignData = res.data[assignValue] = {};
      }
      for(var si = 0, slen = el.style.length; si < slen; si++){
        var styleKey = el.style[si];
        if(!assignData[styleKey])
          assignData[styleKey] = el.style[styleKey];
      }
    }
    return res;
  };


  win.StyleDropper = StyleDropper;
    
})(window);



