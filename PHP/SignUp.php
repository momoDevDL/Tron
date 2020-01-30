<?php
 echo "<div id='container-signUp' >

 <form  action='utilisateurSignUp.php'  method='GET'  id='formulaireVisiteur' >
                 
                 <!--label for='Pseudo' >PSEUDO :</label-->
                 <input type='text' name='Pseudo' placeholder='PSEUDO'>
                 <span class='bar'></span>
                 <!--label for='U_ID' >EMAIL :</label-->
                 <input type='email' name='email' placeholder='EMAIL'>
                 <span class='bar'></span>
                 <!--label for='passwd' >MOT DE PASSE</label-->
                 <input type='password' name='passwd' placeholder='MOT DE PASSE'>
                 <span class='bar'></span>
                 <input id='submit' type='submit' name='formulaireVisiteur' value='Confirmer'>
 </form>
 </div>";
 
?>