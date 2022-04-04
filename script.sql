#------------------------------------------------------------
#        Script MySQL.
#------------------------------------------------------------


#------------------------------------------------------------
# Table: COURS
#------------------------------------------------------------

CREATE TABLE COURS(
        id        Int  Auto_increment  NOT NULL ,
        nom_cours Varchar (50) NOT NULL ,
        nb_topics Int NOT NULL
	,CONSTRAINT COURS_PK PRIMARY KEY (id)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: topics
#------------------------------------------------------------

CREATE TABLE topics(
        id         Int  Auto_increment  NOT NULL ,
        nom_topics Varchar (50) NOT NULL ,
        nb_posts   Int NOT NULL ,
        id_COURS   Int NOT NULL
	,CONSTRAINT topics_PK PRIMARY KEY (id)

	,CONSTRAINT topics_COURS_FK FOREIGN KEY (id_COURS) REFERENCES COURS(id)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: POSTS
#------------------------------------------------------------

CREATE TABLE POSTS(
        id          Int  Auto_increment  NOT NULL ,
        texte_posts Varchar (255) NOT NULL ,
        date_posts  Date NOT NULL ,
        id_topics   Int NOT NULL
	,CONSTRAINT POSTS_PK PRIMARY KEY (id)

	,CONSTRAINT POSTS_topics_FK FOREIGN KEY (id_topics) REFERENCES topics(id)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: etudiant
#------------------------------------------------------------

CREATE TABLE etudiant(
        id    Int  Auto_increment  NOT NULL ,
        login Varchar (255) NOT NULL ,
        pwd   Varchar (255) NOT NULL ,
        nom   Varchar (255) NOT NULL
	,CONSTRAINT etudiant_PK PRIMARY KEY (id)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: accedeA
#------------------------------------------------------------

CREATE TABLE accedeA(
        id          Int NOT NULL ,
        id_etudiant Int NOT NULL
	,CONSTRAINT accedeA_PK PRIMARY KEY (id,id_etudiant)

	,CONSTRAINT accedeA_COURS_FK FOREIGN KEY (id) REFERENCES COURS(id)
	,CONSTRAINT accedeA_etudiant0_FK FOREIGN KEY (id_etudiant) REFERENCES etudiant(id)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: ecrit
#------------------------------------------------------------

CREATE TABLE ecrit(
        id          Int NOT NULL ,
        id_etudiant Int NOT NULL
	,CONSTRAINT ecrit_PK PRIMARY KEY (id,id_etudiant)

	,CONSTRAINT ecrit_POSTS_FK FOREIGN KEY (id) REFERENCES POSTS(id)
	,CONSTRAINT ecrit_etudiant0_FK FOREIGN KEY (id_etudiant) REFERENCES etudiant(id)
)ENGINE=InnoDB;

