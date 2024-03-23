import {Router,Request,Response} from 'express'

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

// router.get('/tarefas/:id',(req:Request,res:Response)=>{
    
//     const id=req.params.id;   
//     res.json({tarefa:`Tarefa com ${id}`})
// })

interface Carro{
    marca:string;
    modelo: string;
    valor: string;

}
const listaCarros :Carro[] = []
//listar todos os carros
router.get("/carros",(req:Request,res:Response)=>{
    
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

router.post("/carro",(req:Request,res:Response)=>{

    const novoCarro:Carro = req.body
    console.log(typeof(novoCarro));

    if (Object.keys(novoCarro).length===0||novoCarro.marca===""||novoCarro.modelo===""||novoCarro.valor===""){
        res.status(400).json({message:"Error ao cadastrar!"})
        return;
    }
    
    

    carros.push(novoCarro)
    res.json({	message:"Carro adicionado"})
})

//Atualizar um Item
router.put("/carro/:modelo",(req:Request,res:Response)=>{
    const modeloCarro = req.params.modelo
    const {marca,modelo,valor} = req.body

    let carroEncontrado = false

    carros.forEach((carro)=>{
        if(carro.modelo===modeloCarro){
            carro.marca= marca || carro.marca
            carro.modelo= modelo || carro.modelo
            carro.valor= valor || carro.valor
            carroEncontrado = true
        }
    });

    if(!carroEncontrado){
        return res.status(400).json({mes: "Não encontrou o Carro!"})
    }  
    console.log(listaCarros)

    
    res.json({msg:"Atualizado com sucesso!"});

})

export {router};