


$(document).ready(function(){

            $("body").on('click',"#signUp",function(){
        
                    $.ajax({
                        url : "SignUp.php",
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
     var pseudoExistant = document.getElementsByName("erreur")[0].value;
        console.log(pseudoExistant);
        if(pseudoExistant== "true"){
        console.log(pseudoExistant);
            alert("Ce pseudo existe déjà veuillez réessayer avec un nouveau pseudo");
        }

        var ErreurMdp = document.getElementsByName("erreur")[1].value;
        console.log(ErreurMdp);
        if(ErreurMdp== "true"){
        console.log(ErreurMdp);
            alert("le mot de passe ou le pseudo est incorrect veuillez réessayer");
        }

             
        });