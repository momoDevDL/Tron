function calculK(elo, nbPartieJoue){
	var res = 0;
	if (elo < 2000){
		res = 20;
	}else if (elo < 2500){
		res = 10;
	}else if (elo < 3000){
		res = 5;
	}
	var bonusNouveauJoueur = 20* max(0,(1-(nbPartieJoue/10)));
	var bonusFaibleNbPartieJoue = res * max(0,(1-(nbPartieJoue/50)));
	res = res + bonusNouveauJoueur + bonusFaibleNbPartieJoue;
	
	return res;
}

function estimation(eloJ1, eloJ2){
	return 1/ (1 + pow(10,((eloJ2 - eloJ1) / 400)));
}

function nouveauRang(j1,j2,score){
	

	var nouveauRangJ1 = 0;  
	var nouveauRangJ2 = 0; 
	var nbMancheNul = NB_MANCHE - (score[0] + score[1]);


	nouveauRangJ1 = j1.elo + calculK(j1.elo,j1.nbPartieJoue) * ((score[0]+(0,5 * nbMancheNul)) - (NB_MANCHE * estimation(j1.elo,j2.elo)));
	nouveauRangJ2 = j2.elo + calculK(j2.elo,j2.nbPartieJoue) * ((score[1]+(0,5 * nbMancheNul)) - (NB_MANCHE * estimation(j2.elo,j1.elo)));
	
	return {nouveauRangJ1: nouveauRangJ1,nouveauRangJ2: nouveauRangJ2};
}