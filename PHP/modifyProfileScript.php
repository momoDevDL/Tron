<?php
    echo " <h2>Profil</h2>
    <div id='avatar'>
    <img src='".$_POST['avatar']."' width='190px' height='190px'>
    </div>
    <div class='niveauMmr'>
        <p>".$_POST['niveau']."</p>
        <p>".$_POST['mmr']."</p>
        </div>
    <div id='info-profile'>
        <form action='confirmModif.php' method='post' enctype='multipart/form-data'>
        <label for='imgAvatar'>upload un avatar</label></br>
        <input id='imgAvatar' type='file' name='Avatar' required ></br>
        <label for='pseudo'>Pseudo</label></br>
        <input id='pseudo' type='text' name='Pseudo' value='".explode(": ",$_POST['pseudo'])[1]."' ></br>
        <label for='email'>E-mail</label></br>
        <input id='email' type='email' name='email' value='".explode(":",$_POST['email'])[1]."'></br>
        <label for='password'>mot de passe</label></br>
        <input id='password' type='password' name='password' placeholder='*******' required></br>
        <button id='confirmModif' type='submit' name='submit' class='btn btn-primary'>Confirmer</button>
        </form>
    </div>"
    ;


?>