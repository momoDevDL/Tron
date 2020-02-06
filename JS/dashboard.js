$('body').on("load","#nbrPartieJoué",function(){
    $.ajax({
        url : "nbrPartieJoué.php",
        method : "POST",
        dataType: "text",
        success:function(data){
        console.log(data);
        $("#nbrPartieJoué").html(data);
        },
        complete:function(data){
            console.log(data);
        },
        error: function(data){
            console.log("error");
                console.log(data);
        }
        
})