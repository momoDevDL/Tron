<?php
 echo "<div id='container-signUp' >

 <form  action='utilisateurSignUp.php'  method='GET'  id='formulaireVisiteur' >
                 
                 <!--label for='U_ID' >NOM :</label-->
                 <input type='text' name='U_ID' placeholder='NOM'>
     
                 <!--label for='Pseudo' >PSEUDO :</label-->
                 <input type='text' name='Pseudo' placeholder='PSEUDO'>
                 
                 <!--label for='U_ID' >EMAIL :</label-->
                 <input type='email' name='email' placeholder='EMAIL'>
 
                 <!--label for='date_Naiss' >DATE DE NAISSANCE</label-->
                 <input type='text' name='date_Naiss' placeholder=' DATE DE NAISSANCE ( AAAA-MM-JJ )'>
 
                 <!--label for='passwd' >MOT DE PASSE</label-->
                 <input type='password' name='passwd' placeholder='MOT DE PASSE'>
                 
                 <input id='submit' type='submit' name='formulaireVisiteur' value='SIGN UP'>
 </form>
 </div>";

?>