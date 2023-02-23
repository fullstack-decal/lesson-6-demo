"use strict";

console.log("Hello there Fullstackers!")

function add(a, b) {
    return a + b;
}

const add2 = (a, b) => {
    return a + b;
}

console.log("Compare regular vs arrow functions:", add(3, 5), add2(3, 5));

//return;

//hoisted = 5;

//console.log("Let's see what hoisted is:", hoisted);


function varInFunction() {
    var foo = 5;
}
varInFunction();
//console.log("What is foo?", foo); // What if you uncomment this?

function varInBlockInFunction() {
    var foo = 10;
    console.log("What is foo in the beginning?", foo);
    if (true) {
        var foo = 5;
        console.log("What is foo in this block?", foo);
    }
    // WWJsD
    console.log("After the block, what is foo?", foo);
}
varInBlockInFunction();

function letInBlockInFunction() {
    let bar = 10;
    console.log("What is bar in the beginning?", bar);
    if (true) {
        let bar = 5;
        console.log("What is bar in this block?", bar);
    }
    // WWJsD
    console.log("After the block, what is bar?", bar);
}
letInBlockInFunction();


const me = {
    petName: "dog",
    numberOfPets: 1,
    getPetName: function() {
        return this.petName;
    },
    morePets: function() {
        if (this !== undefined) {
            this.numberOfPets++;
        }
    }
};

console.log("If `this` refers to `me`, I should get my pet's name:", me.getPetName());

const stolenMorePets = me.morePets;
stolenMorePets();
stolenMorePets();
// WWJsD
console.log("If `this` refers to `me`, I should have 3 pets:", me.numberOfPets);

const you = {
    petName: "cat",
    numberOfPets: 1,
    defineFnLater: undefined
};
const youCanHaveThem = stolenMorePets.bind(you);
youCanHaveThem();
youCanHaveThem();

// WWJsD
console.log("If `this` refers to `you`, you should get 3 pets:", you.numberOfPets);

you.defineFnLater = me.getPetName;

// WWJsD
console.log("If `this` is re-bound, you should see your pet's name:", you.defineFnLater());

const justALittleSillyThing = {
    petName: "hamster",
    numberOfPets: 1,
    getPetNameButIAmLying: () => {
        return this.petName;
    }
}

// WWJsD
console.log("If `this` refers to `justALittleSillyThing`, I should get my pet's name:",
    justALittleSillyThing.getPetNameButIAmLying());

function callbackHell() {
    setTimeout(() => console.log("Late for school"), 1000);

    const somethingThatTakesAWhile = (doAfterJobCompletes) => {
        setTimeout(doAfterJobCompletes, 1000);
    }
    somethingThatTakesAWhile(
        () => {
            console.log("Finished the first job, going onto the second");
            somethingThatTakesAWhile(
                () => {
                    console.log("Finished second job, going onto the third");
                    somethingThatTakesAWhile(
                        () => console.log("Finished third job") // callback hell
                    );
                }
            );
        }
    );
}
//callbackHell(); // Comment this after
console.log("Why does this text appear so early?");

//setTimeout(() => console.log("Late for school1"), 0);
//setTimeout(() => console.log("Late for school2"), 0);
//setTimeout(() => console.log("Late for school3"), 0);

const betterJob = (willSucceed, time) => new Promise((res, rej) => {
    if (willSucceed) {
        setTimeout(res, time);
    } else {
        setTimeout(rej, time);
    }
});

function promiseChained() {
    const doTheBetterJob = betterJob(true, 1000);
    doTheBetterJob
        .then(
            () => console.log("Successfully did the job"),
            () => console.log("Job failed")
        ).catch(
            () => console.log("Wait what?")
        );

    const doTheBetterJob2 = betterJob(false, 2000);
    doTheBetterJob2
        .then(
            () => console.log("Successfully did the job"),
            () => console.log("Job failed")
        ).catch(
            () => console.log("Wait what?")
        );

    const doTheBetterJob3 = betterJob(true, 3000);
    doTheBetterJob3
        .then(
            () => Promise.reject("Nvm job failed"),
            () => console.log("Job failed")
        ).catch(
            (e) => console.log(e)
        );
}
//promiseChained(); // Comment this after

async function promiseAsync() {
    const actuallyResolvesSomething = (willSucceed, time, val) => new Promise((res, rej) => {
        if (willSucceed) {
            setTimeout(() => { res(val); }, time);
        } else {
            setTimeout(() => { rej(val); }, time);
        }
    });

    try {
        const betterJob4 = await actuallyResolvesSomething(true, 1000, 5);
        console.log("On success, returns 5:", betterJob4);
        const betterJob5 = await actuallyResolvesSomething(false, 1000, 10);
        console.log("On success, returns 10:", betterJob5);
    } catch (e) {
        console.log("Uh-oh:", e);
    }
    console.log("Notice how job 4 and 5 have the same timeout but didn't print at the same time");
}
promiseAsync();

console.log("Does this print last?"); // No
