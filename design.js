const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app . use (bodyParser . urlencoded ({extended: false}));
app . use(bodyParser.json());

const designs = [
    {id:1,title : 'helvira toukam', slug: 'KIA-125-87-56',description:45,price:1,date_added:5,image:1,thumbnail:4},
    {id:2, title: 'sonie durelle', slug: 'KIA-125-75-14',description:30,price:2,date_added:6,image:3,thumbnail:5},
    {id:3,title : 'ariane delva', slug: 'KIA-126-88-04',description:25,price:3,date_added:7,image:4,thumbnail:6},
    {id:4, title: 'jiress', slug:'KIA-125-80-24',description:15,price:4,date_added:8,image:5,thumbnail:7}
    

];

app.get('/api/designs',(req,res) =>{
    res.send(designs)
});

app.get('/api/designs/:id',(req,res) => {
    const design = designs.find(b => b.id === parseInt(req.params.id));
    if (!design) return res.status(404).send('The book with the given ID was not found. ')
    res.send(design)
});

app.post('/api/designs',bodyParser.json(), (req,res) =>{
    console.log(req.body)
    const design = {
        id : designs.length + 1,
        title : req.body.title,
        slug : req.body.slug,
        description : req.body.description,
        price : req.body.price,
        date_added: req.body.date_added,
        image : req.body.image,
        thumbnail:req.body.thumbnail
    
};

designs.push(design);
res.send(design);
});
 app.put('/api/designs/:id', (req,res) =>{
    const id=req.params.id
    const {body}=req
    const design = designs.find(b=> b.id === +id)
    if (!design) return res.status(404).send('The designs with the give ID was not found.')
    design.title=body.title,
    design.slug=body.slug,
    design.description=body.description,
    design.price=body.price,
    design.date_added=body.date_added,
    design.image=body.image,
    design.thumbnail=body.thumbnail

    res.status(200).json(design)
});

app.delete('/api/designs/:id', (req , res)=>{
    designs = designs.filter(b=> b.id !=parseInt(req.params.id));
    res.send(designs);
})



const port = process.env.PORT || 3000;
app.listen(port,() => console.log(`Listening on port ${port}...`));































































































































































































































































































































































































































