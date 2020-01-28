$(document).ready(function(){

    $("body").on('click',"#signUp",function(){
        console.log("heey");
            $.ajax({
                url : "../HTML/SignUp.php",
                method : "POST",
                data : " ",
                dataType: "text",
                success:function(data){
                console.log(data);
                $("body").html(data);
                },
                complete:function(data){
                    console.log(data);
                },
                error: function(data){
                        console.log('error');
                        console.log(data);
                }
                
        });

        });

});