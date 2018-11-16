const errorHandler = require('../utils/errorHandler');
const Book = require('../models/Book');
module.exports.getAll = async (req, res) => {
    try{
        const books = await Book.find({});
        res.status(200).json(books);
    }catch(e) {
        errorHandler(res, e);
    }
};
module.exports.getById = async (req, res) => {
    try{
        const book = await Book.findById({
            _id: req.params.id
        });
        res.status(200).json(book);
    }catch(e) {
        errorHandler(res, e);
    }
};
module.exports.remove = async(req, res) => {
    try{
        await Book.remove({_id: req.params.id});
        res.status(200).json({
            message: 'Категория удалена!',
            id: req.params.id
        });
    }catch(e) {
        errorHandler(res, e);
    }
};
module.exports.create = async (req, res) => {
    const book = new Book({
        name: req.body.name,
        author: req.body.author,
        homePrinting: req.body.homePrinting,
        price: req.body.price,
        amount: req.body.amount,
        countOfPage: req.body.countOfPage,
        year: req.body.year,
        genres: req.body.genres,
        imageSrc: req.file ? req.file.path : ''
    });
    try{
        await book.save();
        res.status(201).json(book);
    }catch(e) {
        errorHandler(res, e);
    }
};
module.exports.update = async (req, res) => {
    try{
         const book = await Book.findOneAndUpdate(
             {
                _id: req.params.id
             },
             {
                 $set: req.body
             },
             {new: true}
         );
        res.status(200).json(book);
    }catch(e) {
        errorHandler(res, e);
    }
};