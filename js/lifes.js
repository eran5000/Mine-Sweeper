'use strict'
const LIFE = '<img src="./Img/life.png">'

var glifes = 0
var gElLife = document.getElementById("lifesLeft")

function lifeRender(){
    gElLife = document.getElementById("lifesLeft")
    gElLife.innerHTML = ' '
    for(var i = 0; i < glifes; i++){
    gElLife.innerHTML += LIFE + ' '
    }
}