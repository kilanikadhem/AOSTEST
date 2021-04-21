# Titre du projet : 
AOSTEST 
 
AOSTest est un projet gere une liste des utilisateurs(Users) qu'ont des taches dans listes qu'on la gere 
(create, delete, get ,index, update ) + avec d'autres functions spsecifiques . 

---
## Requirements

For development, you will only need Node.js and a node global package, installed in your environement.

### Node
- #### Installation Node  sur  Windows

  Allez simplement sur [site Web officiel de Node.js] (https://nodejs.org/) et téléchargez le programme d'installation.
Assurez-vous également d'avoir `git` disponible dans votre PATH,` npm` pourrait en avoir besoin (vous pouvez trouver git [ici] (https://git-scm.com/)).

- #### installation Node sur Ubuntu

Vous pouvez installer facilement nodejs et npm avec apt install, exécutez simplement les commandes suivantes.

      $ sudo apt install nodejs
      $ sudo apt install npm
---

## Install
    $ git clone https://github.com/kilanikadhem/AOSTEST
    $ npm  install 

packages a installer : 
-typescript 
-graphql 
-@graphql-codegen/cli 
-uuid 
-mongoDb

cli : npm install typescript graphql @graphql-codegen/cli uuid 
      npm install mongodb --save 


## Structure  de l'application : 
config: 
  - fichier demo_create_mongo_db : contient la connexion avec la DB et les function d'interaction entre les controllers et la DB .
Data : 
  -dossier qui contient les listes des valeurs des Models  User, Taches, List (des tableaux des objets Json).
Resolvers: 
  - Dossiers qui contient des fichers de Query & Mutationde chaque Model  
     *   Itemresolver : fichier resolver  pour  le Model Item  : 
           Query :  getItemByUser(userId)
                    getSharedItemByUser(userId)
                 
           Mutation :  createItem(title, description, status,userId) 
                       updateItem(id, title, description, status,userId)
                       deleteItem(id,userId)
                       shareItem(id,userId)
                       completeItem(id,status,userId)
                       commentItem(id,userId,description)
     *   UserResolver : fichier resolver  pour le Model User  : 
            Query : listUser

            Mutation: createUser(name, lastName, email, password)
                      updateUser(id,name, lastName, email, password)
                      deleteUser(id)
                      loginUser(login, password)
                      goutUser(userId)

           function : isConnected : function pour verifier si l user est connecter  ou nn ( ou peut changer 
           cette methode  par un systeme de gestion des utilisatuer et les access  comme Passport Js ou autre  ... )
    * index : est le fichier main qui regroupe tous les resolvers dans le but de les  utilser dans le projet . 

graphql-types.ts : est le fichier ou il y a la definition des types , des models(Item , List and User ) , les arguments pour les functions
les fonctions utilisées dans le projets( tous les types qui se termient par Args )  . 

schema.graphql : est le schema graphql acvec les mutations & queries dans notre projets  .

server.ts : fichoer main du projet. 



## Running the project

    $ npm start

## Simple build for production

    $ npm build