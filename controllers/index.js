const BookSchema = require('./../models/Book');

const getMessage = () => {
    return {
        saludo: `Todo esta Ok$`
    };
}

const saveBook = async ({ name, editorial, publication }) => {
    const newBook = BookSchema({
        name,
        editorial,
        publication,
        createAt: Date.now(),
    });

   await newBook.save( (err, DbBook) => {
        if (err) {
            console.log("Ocurrio un error");
            return err
        } else {
            console.log("mostrando el mensaje ", DbBook);
        }
    });

    return newBook;
}

module.exports = {
    getMessage,
    saveBook
}