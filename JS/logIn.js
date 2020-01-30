$(document).ready(function(){

    $("body").on('click',"#signUp",function(){

            $.ajax({
                url : "../PHP/SignUp.php",
                method : "POST",
                dataType: "text",
                success:function(data){
                console.log(data);
                $("body").html(data);
                },
                complete:function(data){
                    console.log(data);
                },
                error: function(data){
                    console.log("error");
                        console.log(data);
                }
                
        });

        });

});