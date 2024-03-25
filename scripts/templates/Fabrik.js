class Fabrik{
    constructor(){
        this.body = document.querySelector('body');
        this.Main = document.querySelector('main');
        this.$recipeswrapper = document.querySelector('.recipes');

    }
     createfiltre(ClassName, Name , Resultat){
        const divfiltre = document.createElement('div');
        divfiltre.classList.add('.filterWrapper');
        const nom = document.createElement('p');
        nom.textContent = Name;
        const input = document.createElement('input');
        const filtreul = document.createElement('ul');
        const filtreli = document.createElement('li');
        filtreli.textContent= Resultat;
        filtreul.classList.add(ClassName);
        filtreul.appendChild(filtreli);
        divfiltre.appendChild(filtreul);
        
        


        this.$recipeswrapper.appendChild(divfiltre)
     }
}