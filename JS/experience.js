function gainExperience(experienceJoueur1, boostJ1, experienceJoueur2, boostJ2, score){
	var gainJ1 = 256;
	var gainJ2 = 256;
	
	if (score[0]== 2 && score[1] == 0){
		gainJ1 += 64;
	} else if (score[1]== 2 && score[0] == 0){
		gainJ2 += 64;
	}
	
	if (score[0] > score[1]){
		gainJ1 += 128;
	} else if (score[1] > score[0]){
		gainJ2 += 128;
	}
	gainJ1 = gainJ1 * boostJ1;
	gainJ2 = gainJ2 * boostJ2;
	
	var miseAJourExperienceJ1 = experienceJoueur1 + gainJ1;
	var miseAJourExperienceJ2 = experienceJoueur2 + gainJ2;
	
	return {miseAJourExperienceJ1: miseAJourExperienceJ1, miseAJourExperienceJ2: miseAJourExperienceJ2};
}
