import {Router,Request,Response, NextFunction} from 'express'

const router = Router();

//Exemplo : http://localhost:3333/tarefas


// Query Params ? nome=Comprar pao
// Route Params /tarefas/2
// Request body {nome:"Comprar Pão",}




// router.get('/tarefas',(req:Request,res:Response)=>{
//     // Req é o que voce pega da requisição e Res é a resposta que vai ser enviada para o usuário
//     // res.send("Minha primeira API")

//     const tarefa=req.query.nomedatarefa;   //Pegando o query params (usado quando queremos pegar o corpo da requisição)

//     //res.json({ message:"Minha primeira api",aluno:"Robson Luan" })

//     res.json({nomedatarefa:tarefa})
// })


const carros =[
    {marca:"Fiat",modelo:"FastBack",valor:"130.000"},
    {marca:"Fiat",modelo:"Pulse",valor:"100.000"},
    {marca:"Fiat",modelo:"Cronos",valor:"100.000"},
    {marca:"Fiat",modelo:"Argo",valor:"80.000"},
    {marca:"VW",modelo:"Jetta",valor:"130.000"},
    {marca:"VW",modelo:"Golf",valor:"100.000"},
    {marca:"VW",modelo:"Voyage",valor:"80.000"},
    {marca:"VW",modelo:"Gol",valor:"50.000"},
    

    
]



router.use((req:Request,res:Response,next:NextFunction)=>{
    console.log("Passou pelo middleware global")

    return next();
    
})

function checkCarro(req:Request,res:Response,next:NextFunction){

    if(!req.body.modelo||!req.body.marca||!req.body.valor){
        return res.status(400).json({error:"Dados Inválidos!"})
    }
    return next()
}
function checkCarroOk(req:Request,res:Response,next:NextFunction) {
    const  carroExistente=carros.find(c=> c.modelo===req.params.modelo);

   if (!carroExistente){
       return res.status(404).json({ error : "Não encontrado"});
   }

   return next();
}   
// router.get('/tarefas/:id',(req:Request,res:Response)=>{
    
//     const id=req.params.id;   
//     res.json({tarefa:`Tarefa com ${id}`})
// })

interface Carro{
    marca:string;
    modelo: string;
    valor: string;

}

//listar todos os carros
router.get("/carros",(req:Request,res:Response)=>{
    const listaCarros :Carro[] = []

    carros.map((carro)=>{
        if (parseInt(carro.valor)>=1){
            listaCarros.push(carro)
        }
        
    })
    
    res.json(listaCarros)

})
//router listar um carro

router.get("/carro/:modelo",(req:Request,res:Response)=>{
    const carroMelo = req.params.modelo
    const carro:Carro|undefined  = carros.find(car=>car.modelo===carroMelo)
    
    res.json(carro)
})


//Rotas para adicionar um valor!

router.post("/carro",checkCarro,(req:Request,res:Response)=>{

    const novoCarro:Carro = req.body

    carros.push(novoCarro)

    res.json({	message:"Carro adicionado"})
})

//Atualizar um Item
router.put("/carro/:modelo",checkCarro,checkCarroOk,(req:Request,res:Response)=>{
    const modeloCarro = req.params.modelo
    const {marca,modelo,valor} = req.body

    
    let carroAtualizado=false
    carros.forEach((carro) => {
        if (carro.modelo === modeloCarro) {
            // Atualiza os dados do carro se o modelo corresponder
            carro.marca = marca || carro.marca;
            carro.modelo = modelo || carro.modelo;
            carro.valor = valor || carro.valor;
            carroAtualizado = true;
        }
    });

    
    
    if(carroAtualizado){
        res.json({msg:"Atualizado com sucesso!"});
    }else{
        res.status(400).json({message:`Não foi possível atualizar o Carro ${modeloCarro}`})
    }

}) 


router.delete('/carro/:index',checkCarroOk,(req:Request, res:Response)=>{

    const {index} = req.params
    carros.splice(Number(index),1)
    res.json({msg:"Deletado com sucesso!"})
})

export {router};