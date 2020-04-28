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
	
	let difference = 0;
	var nouveauRangJ1 = 0;  //j1.elo + calculK(j1.elo,j1.nbPartieJoue) * (score[0] - estimation(j1.elo,j2.elo));
	var nouveauRangJ2 = 0; //j2.elo + calculK(j2.elo,j2.nbPartieJoue) * (score[1] - estimation(j2.elo,j1.elo));

	if(score[0] > score[1]){
		difference = score[0] - score[1] ;
		nouveauRangJ1 = j1.elo + calculK(j1.elo,j1.nbPartieJoue) * (score[0] - estimation(j1.elo,j2.elo));
		nouveauRangJ2 = j2.elo + calculK(j2.elo,j2.nbPartieJoue) * (score[1] + 0.5*difference) (estimation(j2.elo,j1.elo));
	}else{
		difference = score[1] - score[0] ;
	}


	return {nouveauRangJ1: nouveauRangJ1,nouveauRangJ2: nouveauRangJ2};
}