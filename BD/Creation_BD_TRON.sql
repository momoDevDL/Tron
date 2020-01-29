/*
Fichier : Creation_BD_TRON.sql
Auteurs : 
Antoine AFFLATET 21709838
Mohamed MASBAH ABOU LAICH 21611213
*/

/*
A METTTRE OBLIGATOIREMENT AU DEBUT 
- SUPPRESSION DE LA BASE DE DONNEES
- CREATION DE LA BASE DE DONNEES
- SUPPRESSIONS DE TOUTES LES BASES CREEES POUR LE PROJET
*/


/*DROP DATABASE IF EXISTS  lightcyclefight;
CREATE DATABASE  lightcyclefight;
USE  lightcyclefight ;*/

/*
Création de la base de  données
*/

DROP TABLE IF EXISTS UTILISATEUR;
DROP TABLE IF EXISTS PARTIE;
DROP TABLE IF EXISTS LOT;
DROP TABLE IF EXISTS RANG;
DROP TABLE IF EXISTS MODE;
DROP TABLE IF EXISTS TOURNOI;
DROP TABLE IF EXISTS INSCRIT;
DROP TABLE IF EXISTS RECHERCHE_PARTIE;
-- **************************************   UTILISATEUR  


CREATE TABLE   UTILISATEUR  
(
	PSEUDO VARCHAR(45) NOT NULL,
    PASSWORD VARCHAR(45) NOT NULL,
    ROLE VARCHAR(45) NOT NULL, /* 2 ROLES SEULEMENT : admin / joueur */
    EMAIL VARCHAR(150) NOT NULL,
    NIVEAU NUMERIC(6) NOT NULL,
    MMR NUMERIC(4) NOT NULL,
    TAUX_MMR NUMERIC(2,2) NOT NULL, 	
    DATE_FIN_BOOST DATE NOT NULL,
    COULEUR_GENTIL VARCHAR(45) NOT NULL,
    COULEUR_MECHANT VARCHAR(45) NOT NULL,

CONSTRAINT UTILISATEUR_PK PRIMARY KEY ( PSEUDO ),
CONSTRAINT EMAIL_CT CHECK( EMAIL LIKE '%@%.%'),
CONSTRAINT COULEUR_GENT CHECK ( COULEUR_GENTIL IN ("ORANGE","VERT") ),
CONSTRAINT COULEUR_MECH CHECK (COULEUR_MECHANT IN("BLEU","ROUGE")),
CONSTRAINT ROLE_UTIL CHECK ( ROLE IN ("ADMIN","JOUEUR"))
);
-- **************************************   LOT

CREATE TABLE LOT  
(
   ID_LOT     INT NOT NULL AUTO_INCREMENT,
   NOM         VARCHAR(45) NOT NULL,
   TYPE    VARCHAR(45) NOT NULL,
   MONTANT NUMERIC(4),
   TAUX_MMR NUMERIC(2,2),
   DATE_FIN_BOOST DATE,

CONSTRAINT LOT_PK PRIMARY KEY ( ID_LOT ),
CONSTRAINT TYPE_LOT CHECK (TYPE IN ("ARGENT","TAUXMMR"))
);



-- **************************************  TOURNOI 


CREATE TABLE TOURNOI
(
  ID_TOURNOI         INT NOT NULL AUTO_INCREMENT,
  ID_CREATEUR      VARCHAR(45) NOT NULL,
  TITRE_EVENEMENTS  VARCHAR(45) NOT NULL,
  DATE_DEBUT        DATE NOT NULL,
  DATE_FIN          DATE NOT NULL,
  TYPE_TOURNOI      VARCHAR(45) NOT NULL,
  ID_LOT_1ER       	INT,
  ID_LOT_2EME      	INT,

CONSTRAINT TOURNOI_PK PRIMARY KEY ( ID_TOURNOI ),
CONSTRAINT  CREATEUR_FK FOREIGN KEY( ID_CREATEUR ) REFERENCES  UTILISATEUR  ( PSEUDO ),
CONSTRAINT  LOT_1ER_FK  FOREIGN KEY ( ID_LOT_1ER ) REFERENCES  LOT( ID_LOT ),
CONSTRAINT  LOT_2EME_FK  FOREIGN KEY ( ID_LOT_2EME ) REFERENCES  LOT( ID_LOT )
);


-- **************************************   MODE  

CREATE TABLE MODE  
(
   ID_MODE     INT NOT NULL AUTO_INCREMENT,
   NOM         VARCHAR(45) NOT NULL,
   ID_CREATEUR     VARCHAR(45) NOT NULL,

CONSTRAINT MODE_PK PRIMARY KEY ( ID_MODE ),
CONSTRAINT  CREATEUR_MODE_FK FOREIGN KEY( ID_CREATEUR ) REFERENCES  UTILISATEUR  ( PSEUDO )
);



-- **************************************  PARTIE

CREATE TABLE PARTIE 
(	
	ID_PARTIE     INT NOT NULL AUTO_INCREMENT,
   	JOUEUR_1     VARCHAR(45) NOT NULL,
   	JOUEUR_2     VARCHAR(45),
   	GAGNANT	   VARCHAR(45),
   	SCORE       VARCHAR(7) NOT NULL, /* */
   	DATE_MATCH     DATE  NOT NULL,
   	TYPE_MATCH     VARCHAR(45) NOT NULL,
   	TOURNOI     INT,
   	MODE     INT NOT NULL,

CONSTRAINT PARTIE_PK PRIMARY KEY (ID_PARTIE),
CONSTRAINT  JOUEUR_1_FK FOREIGN KEY( JOUEUR_1 ) REFERENCES  UTILISATEUR( PSEUDO ),
CONSTRAINT  JOUEUR_2_FK FOREIGN KEY( JOUEUR_2 ) REFERENCES  UTILISATEUR( PSEUDO ),
CONSTRAINT  TOURNOI_FK FOREIGN KEY( TOURNOI ) REFERENCES  TOURNOI( ID_TOURNOI ),
CONSTRAINT  MODE_FK FOREIGN KEY( MODE ) REFERENCES  MODE( ID_MODE )
);


-- **************************************  INSCRIT

CREATE TABLE  INSCRIT 
(	
  PSEUDO   VARCHAR(45) NOT NULL,
  ID_TOURNOI INT NOT NULL,
  POSITION_INIT  NUMERIC(2) NOT NULL,
  RESULTAT  NUMERIC(2) NOT NULL,

CONSTRAINT INSCRIT_PK PRIMARY KEY ( PSEUDO,ID_TOURNOI),
CONSTRAINT  INSCRIT_PSEUDO_FK FOREIGN KEY ( PSEUDO ) REFERENCES  UTILISATEUR  ( PSEUDO ),
CONSTRAINT  INSCRIT_TOURNOI_FK FOREIGN KEY ( ID_TOURNOI ) REFERENCES  TOURNOI ( ID_TOURNOI )

);

-- **************************************  RECHERCHE_MATCH

CREATE TABLE  RECHERCHE_MATCH
(	
  ID_RECHERCHE INT NOT NULL AUTO_INCREMENT,
  PSEUDO   VARCHAR(45) NOT NULL,
  HEURE_DEBUT TIME NOT NULL,
  PRIORITE   VARCHAR(45) NOT NULL,

CONSTRAINT RECHERCHE_MATCH_PK PRIMARY KEY ( ID_RECHERCHE),
CONSTRAINT  RECHERCHE_MATCH_PSEUDO_FK FOREIGN KEY ( PSEUDO ) REFERENCES  UTILISATEUR  ( PSEUDO )


);

