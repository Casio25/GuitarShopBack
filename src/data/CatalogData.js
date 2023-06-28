/* eslint-disable prettier/prettier */


import * as variables from "./variables.js";
import * as func from "./util.js";


let offerId = 1;

const createJSON = () => {


    const getRandomTypeName = func.RandomNaturalNumber(0, variables.typeList.length);
    const typeValue = variables.typeList[getRandomTypeName];
    const randomNameSymbols = func.RandomSymbols();
    const slicedShuffledComments = (func.shuffle(variables.randomComments)).slice(0, func.RandomNaturalNumber(1, variables.randomComments.length))
    function RandomName(type) {
        const generatedNames = new Set();
        let name = "";

        do {
            name = `${type} ${randomNameSymbols}`
        } while (generatedNames.has(name));
        generatedNames.add(name);

        return name;
    }
    function stringRanger(type) {
        let stringNumber = undefined;
        switch (type) {
            case "acustic":
                stringNumber = variables.acusticString[func.RandomNaturalNumber(0, variables.acusticString.length)];
                break;
            case "electro":
                stringNumber = variables.electroString[func.RandomNaturalNumber(0, variables.electroString.length)];
                break;
            case "ukulele":
                stringNumber = variables.ukuleleString;
                break;
            default:
                break;
        }
        return stringNumber;
    }

    function priceRanger(type) {
        let price = "";
        switch (type) {
            case "acustic":
                price = func.RandomNaturalNumberStep(
                    variables.acusticPrice.MIN,
                    variables.acusticPrice.MAX,
                    variables.acusticPrice.STEP
                );
                break;
            case "electro":
                price = func.RandomNaturalNumberStep(
                    variables.electroPrice.MIN,
                    variables.electroPrice.MAX,
                    variables.electroPrice.STEP
                );
                break;
            case "ukulele":
                price = func.RandomNaturalNumberStep(
                    variables.ukulelePrice.MIN,
                    variables.ukulelePrice.MAX,
                    variables.ukulelePrice.STEP
                );
                break;
            default:
                break;
        }
        return price;
    }

    return {
        id: offerId++,
        guitarName: RandomName(typeValue),
        type: typeValue,
        photo: variables.photoList[getRandomTypeName],
        price: priceRanger(typeValue),
        string: stringRanger(typeValue),
        comments: slicedShuffledComments,
        rating: func.RandomNaturalNumber(variables.rating.MIN, variables.rating.MAX)
    };
};

export const offers = new Array(variables.numberOfOffers).fill(null).map(() => {
    return createJSON();
});

// // eslint-disable-next-line @typescript-eslint/no-var-requires
// const fs = require("fs");

// fs.writeFileSync("catalog.txt", JSON.stringify(offers));
