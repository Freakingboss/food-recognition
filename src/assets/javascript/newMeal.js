const modelURL = '/ml_models/tm-my-image-model/';
let model, maxPredictions;
let valorCalorias = 0;
const listaItensInseridos = [];

async function init() {
    const jsonModelURL = modelURL + 'model.json';
    const metadataURL = modelURL + 'metadata.json';

    model = await tmImage.load(jsonModelURL, metadataURL);
    console.log("Model loaded.");
    maxPredictions = model.getTotalClasses();
    
    criarTitulosTabelaAlimentos();
    let date = 0;
    date = constroiData();
    document.getElementById("dataHora").innerHTML = date;
}

async function uploadImage() {
    let uploadedFile = document.getElementById("input-img").files[0];
    let imgContainer = document.getElementById('foodImage');
    imgContainer.src = URL.createObjectURL(uploadedFile);
}

async function predict() {
    let response = await model.predict(document.getElementById('foodImage'));
    return response;
}

function criarTitulosTabelaAlimentos(){
    
    let tabela = document.getElementById('tabelaAlimento');
    let line = document.createElement('tr');
    
    let food = document.createElement('th');
    let foodText = document.createTextNode('Alimento');
    food.appendChild(foodText);
    
    let kcal = document.createElement('th');
    let kcalText = document.createTextNode('Kcal');
    kcal.appendChild(kcalText);
    
    let protein = document.createElement('th');
    let proteinText = document.createTextNode('Proteínas');
    protein.appendChild(proteinText);
    
    let carbohydrate = document.createElement('th');
    let carbohydrateText = document.createTextNode('Carboidratos');
    carbohydrate.appendChild(carbohydrateText);
    
    let fiber = document.createElement('th');
    let fiberText = document.createTextNode('Fibras');
    fiber.appendChild(fiberText);
    
    line.appendChild(food);
    line.appendChild(kcal);
    line.appendChild(protein);
    line.appendChild(carbohydrate);
    line.appendChild(fiber);
    
    tabela.appendChild(line);
    
}

function insertFoodItem(pf) {
    // Se há alimento identificado pelo modelo,
    // inserir o nome numa lista
    
    if (Object.keys(pf).length > 0) {
        
        let tabela = document.getElementById('tabelaAlimento');
        
        pf.forEach(function(valor){
            
            let line = document.createElement('tr');

            let food = document.createElement('td');
            let kcal = document.createElement('td');
            let protein = document.createElement('td');
            let carbohydrate = document.createElement('td');
            let fiber = document.createElement('td');
            
            kcal.setAttribute("name", "calorias");
            line.setAttribute("name", valor.food_name);
            
            food.innerHTML=valor.food_name;
            kcal.innerHTML=valor.kcal;
            protein.innerHTML=valor.protein;
            carbohydrate.innerHTML=valor.carbohydrate;
            fiber.innerHTML=valor.fiber;

            line.appendChild(food);
            line.appendChild(kcal);
            line.appendChild(protein);
            line.appendChild(carbohydrate);
            line.appendChild(fiber);
            
            tabela.appendChild(line);
            valorCalorias += valor.kcal;
        });
    }
    
}

function constroiData(){
    
    var meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    
    let date = new Date();
    
    var dia = date.getDay() + 1;
    var mesNumerico = date.getMonth();
    var ano = date.getFullYear();
    
    var hora = date.getHours();
    var minuto = date.getMinutes();
    
    if(dia < 10){
        dia = '0' + dia;
    }
    
    var mesLetras = meses.filter( (valor, index) => (index === mesNumerico));
    
    
    var dataFormatada = dia + ' de ' + mesLetras + ' de ' + ano + ' - ' + hora + ':' + minuto;
    
    return dataFormatada;
}

init();
// Event listener que escuta as mudanças de imagens.
// Quando uma nova imagem carregar, prever o alimento
// que está nela.
const imgTag = document.getElementById('foodImage');
imgTag.addEventListener('load', async e =>{
    let predictedFood = {};
    const response = await predict();
    predictedFood = myNewMeal.getFoodWithHighestProbability(response);
    
    let foodComp = await myNewMeal.getFoodComposition(`/meal/get-food-composition?className=${predictedFood.className}`);

    insertFoodItem(foodComp);
    document.getElementById("valorSoma").innerHTML = valorCalorias;
}, false);

const fileInput = document.getElementById("input-img");
fileInput.addEventListener('change', e => {
    uploadImage();
}, false);

let myNewMeal = new Meal();
myNewMeal.mealSucessMessage();