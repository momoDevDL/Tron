<?php
 echo "<div id='container-signUp' >

 <form  action='../PHP/creationCompte.php'  method='POST'  id='formulaireVisiteur' >
            
                 <!--label for='Pseudo' >PSEUDO :</label-->
                 <input type='text' name='Pseudo' placeholder='PSEUDO'>
                 <span class='bar'></span>
                 <!--label for='U_ID' >EMAIL :</label-->
                 <input type='email' name='email' placeholder='EMAIL'>
                 <span class='bar'></span>
                 <!--label for='passwd' >MOT DE PASSE</label-->
                 <input type='password' name='passwd' placeholder='MOT DE PASSE'>
                 <span class='bar'></span>
                 <label for='colorG'>Couleur Gentil</label>
                 <input type='hidden' id='colorG' name='colorG' value='#181818' />
                 <div id='colorSelectorG'>
                 <div id='color1' class='color'>
                 color 1
                 </div>
                 <div id='color2' class='color'>
                 color 2
                 </div>
                 <div id='color3' class='color'>
                 color 3
                 </div>
                </div>
                <label for='colorM'>Couleur Mechant</label>
                <input type='hidden' id='colorM' name='colorM' value='#181818' />
                 <div id='colorSelectorM'>
                 <div id='color4' class='color'>
                 color 1
                 </div>
                 <div id='color5' class='color'>
                 color 2
                 </div>
                 <div id='color6' class='color'>
                 color 3
                 </div>
                </div>
                 <input id='submit' type='submit' name='submit' class='btn btn-primary btn-lg' value='Confirmer'>
 </form>
 </div>";

?>