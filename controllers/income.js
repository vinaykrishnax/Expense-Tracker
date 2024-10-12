const IncomeSchema = require('../models/Income');

exports.addIncome = async(req, res)=>{
    try{
        const {title, amount, category, description, date} = req.body

        const income = IncomeSchema({
            title,
            amount, 
            category,
            description,
            date
        })

        if(!title || !category || !description || !date){
            return res.status(400).json({message: "All Fields are required"})
        }
        if(amount <=0 || !amount === 'number'){
            return res.status(400).json({message: 'Amount must be a number'})
        }

        await income.save();
        res.status(200).json({message: 'Income Added'})
    }catch(err){
        res.status(500).send({message: 'Server error'});
    }

    console.log(income);
}

exports.getIncomes = async(req, res)=>{
    try{
        const incomes = await IncomeSchema.find().sort({createdAt: -1});
        res.status(200).json(incomes)
    }catch(err){
        res.status(500).json({message: 'Server Error'})
    }
}

exports.deleteIncome = async(req, res)=>{
    const {id} = req.params;
    IncomeSchema.findByIdAndDelete(id)
        .then((income)=>{
            res.status(200).json({message: 'Income Deleted'})
        })
        .catch((err)=>{
            res.status(500).json({message: 'Server Error'})
        })
}