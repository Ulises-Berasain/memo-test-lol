const { link } = require("fs");

const url ="127.0.0.1:8080"
const NUMEROS_CUADROS = 12

context("memotest", () => {
    before(() => {
        cy.visit(url);
    })

    it ("Se asegura que haya un tablero con cuadros", () =>{
        cy.get("#tablero").find(".cuadro").should("have.length", NUMEROS_CUADROS);
    });
    
    it("Se asegura que los cuadros sean aleatorios", () =>{
        cy.get(".cuadro").then((cuadros) => {
            let clasesOriginales = [];
            cuadros.each(function(i, cuadro){
                clasesOriginales.push(cuadro.className);
            });
        
            cy.visit(url);
            
            let clasesNuevas = [];
            cy.get(".cuadro").then((nuevosCuadros) => {
                nuevosCuadros.each(function(i, cuadro){
                    clasesNuevas.push(cuadro.className);
                });
            });

            cy.wrap(clasesOriginales).should("not.deep.equal", clasesNuevas);
        });
    });
});

describe("resuelve el juego", () => {
    let napaDePares, listaDePares;

    it("Elige una combinacion erronea", () => {   
        cy.get(".cuadro").then(cuadros =>{
        napaDePares = obtenerParesDeCuadros(cuadros);
        listaDePares = Object.values(napaDePares);
        listaDePares[0][0].click();
        listaDePares[1][0].click();

        cy.get(".cuadro").should("have.length", NUMEROS_CUADROS);
        });
    });

    it("resuelve el juego", () =>{
        cy.get(".cuadro").should("have.length", NUMEROS_CUADROS);

        listaDePares.forEach((par) => {
            cy.get(par[0]).click();
            cy.get(par[1]).click();
        });

        cy.get(".completo").should("have.length", 12);

        cy.get("#tablero").should("not.be.visible");
        
        const numeroTurnos = NUMEROS_CUADROS / 2 +1

        cy.get("#fin-juego").should("be.visible").contains(`Bien hecho! Tardaste ${numeroTurnos} turnos en terminar`);
    });
});

function obtenerParesDeCuadros(cuadros){
    const pares ={};

    cuadros.each((i,cuadro) => {
        const claseCampeon = cuadro.className.replace("cuadro h-100 ", "");

        if(pares[claseCampeon]){
            pares[claseCampeon].push(cuadro);
        }else{
            pares[claseCampeon] = [cuadro];
        };
    });

    return pares;
};