const ExpenseSchema = require('../models/Expense');

exports.addExpense = async(req, res)=>{
    try{
        const {title, amount, category, description, date} = req.body

        const expense = ExpenseSchema({
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

        await expense.save();
        res.status(200).json({message: 'Expense Added'})
    }catch(err){
        res.status(500).send({message: 'Server error'});
    }

    console.log(expense);
}

exports.getExpense = async(req, res)=>{
    try{
        const expenses = await ExpenseSchema.find().sort({createdAt: -1});
        res.status(200).json(expenses)
    }catch(err){
        res.status(500).json({message: 'Server Error'})
    }
}

exports.deleteExpense = async(req, res)=>{
    const {id} = req.params;
    ExpenseSchema.findByIdAndDelete(id)
        .then((expense)=>{
            res.status(200).json({message: 'Expense Deleted'})
        })
        .catch((err)=>{
            res.status(500).json({message: 'Server Error'})
        })
}