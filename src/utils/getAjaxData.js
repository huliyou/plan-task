function getAjaxData(url,type,obj,sentdata){
 $.ajax({
       url:url,
       type:type,
       data:'param='+JSON.stringify(obj),
       datatype:'json',
       async:true,
       success:function(data){
       	sentdata(data)
       },
       error:function(data){
           sentdata(data)
       }

      })
}