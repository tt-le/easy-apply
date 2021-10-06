/*This file contains the SQL reqiured to make the dummy database.
Execute all the commands in this file on the server in exactly this order from top to bottom*/

CREATE TABLE "Employers" (
	"EmployerID"	INTEGER,
	"CompanyName"	TEXT,
	"Email"	TEXT,
	"Password" TEXT,
	"Industry"	TEXT,
	"Introduction"	TEXT,
	PRIMARY KEY("EmployerID")
);

INSERT INTO Employers (CompanyName, Email, Password, Industry, Introduction)
VALUES ("Apple", "apple@gmail.com", "1234", "Software development", "We make software")