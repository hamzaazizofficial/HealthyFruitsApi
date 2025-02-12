import express from "express";
import fruits from "../data/fruits.js";
import vegetables from "../data/vegetables.js";
import allItems from "../data/allItems.js";
// import path from "path";
// import { fileURLToPath } from "url";

// Get __dirname equivalent for ES Modules
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

const mainRouter = express.Router();

mainRouter.get('/', (req, res) => {
    console.log(req.rawHeaders);
    res.render("index", {
        title: "My Home Page",
    });
    // res.json(
    //         [
    //             { message: 'Welcome to HealthyFruitsApi. Here is the basic documentation for you' },
    //             { for_all_fruits: 'hit /api/allFruits' },
    //             { for_random_fruit: 'hit /api/randomSingleFruit' },
    //             { for_sugar_patient_friendly_fruits: 'hit /api/sugarFriendlyFruits' },
    //             { for_bp_patient_friendly_fruits: 'hit /api/bpFriendlyFruits' },
    //             { for_uric_acid_patient_friendly_fruits: 'hit /api/uricAcidFriendlyFruits' },
    //         ]
    //     );
});

mainRouter.get('/documentation', (req, res) => {
    res.render("documentation", {
        title: "Documentation",
    })
});

mainRouter.get('/contact', (req, res) => {
    res.render("contact", {
      title: "Contact Us"  
    })
});

mainRouter.get('/services', (req, res) => {
    res.render("services", {
        title: "Services"
    })
});

/* API Routes start */

mainRouter.get('/api/allItems', (req, res) => {
    const { category, search } = req.query;
    
    console.log("Category:", category);

    let filteredAllItems = [...allItems];

    if (category === "sugarFriendly") {
        const sugarFriendlyItems = allItems.filter(item => item.isGoodForSugarPatient);
        return res.json(sugarFriendlyItems);
    } else if (category === "bpFriendly") {
        const bpFriendlyItems = allItems.filter(item => item.isGoodForBloodPressurePatient);
        return res.json(bpFriendlyItems);
    } else if (category === "uricAcidFriendly") {
        const uricAcidFriendlyItems = allItems.filter(item => item.isGoodForUricAcidPatient);
        return res.json(uricAcidFriendlyItems);
    }

    if (search) {
        const searchLower = search.toLowerCase();
        return res.json(filteredAllItems.filter(item => 
            item.name.toLowerCase() === searchLower || 
            item.regionalNames.some(regName => regName.toLowerCase() === searchLower) 
        ));
    }

    res.json(filteredAllItems);
});

mainRouter.get('/api/allItems/random', (req, res) => {
    res.json(allItems[Math.floor(Math.random() * allItems.length)]);
});

mainRouter.get('/api/fruits', (req, res) => {
    const { category } = req.query;
    let filteredFruits = fruits;

    if (category === "sugarFriendly") {
        filteredFruits = fruits.filter(fruit => fruit.isGoodForSugarPatient);
    } else if (category === "bpFriendly") {
        filteredFruits = fruits.filter(fruit => fruit.isGoodForBloodPressurePatient);
    } else if (category === "uricAcidFriendly") {
        filteredFruits = fruits.filter(fruit => fruit.isGoodForUricAcidPatient);
    } 

    res.json(filteredFruits);
});

mainRouter.get('/api/fruits/random', (req, res) => {
    res.json(fruits[Math.floor(Math.random() * fruits.length)]);
});

mainRouter.get('/api/vegetables', (req, res) => {
    const { category } = req.query;
    let filteredVegetables = vegetables;

    if(category === "sugarFriendly") {
        filteredVegetables = vegetables.filter(vegetable => vegetable.isGoodForSugarPatient);
    } else if (category === "bpFriendly") {
        filteredVegetables = vegetables.filter(vegetable => vegetable.isGoodForBloodPressurePatient);
    } else if (category === "uricAcidFriendly") {
        filteredVegetables = vegetables.filter(vegetable => vegetable.isGoodForUricAcidPatient);
    }

    res.json(filteredVegetables);
});

mainRouter.get('/api/vegetables/random', (req, res) => {
    res.json(vegetables[Math.floor(Math.random() * vegetables.length)]);
});

/* API Routes end */

export default mainRouter;
