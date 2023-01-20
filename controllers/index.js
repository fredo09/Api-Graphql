const BookSchema = require('./../models/Book');
const AuthorSchema = require('./../models/Author');

const getMessage = () => {
    return {
        saludo: `Todo esta Ok$`
    };
}

const saveBook = async ({ name, editorial, publication, author }) => {

    const searchAuthor = await AuthorSchema.findOne({ name: author });

    console.log(searchAuthor);

    const newBook = BookSchema({
        name,
        editorial,
        publication,
        author: searchAuthor._id,
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


const allBooks = async () => {
    console.log("all books");

    const books =  await BookSchema.find({}).populate("author");

    if (!books) throw new Error('No hay books que mostrar');

    return books;

}

// save author

const saveAuthor = async (input) => {
    console.log(input);

    // TO DO: Checar el error find 
    const isexistAuthor = await AuthorSchema.find({ name: input.name });

    if (!isexistAuthor) throw new Error('Existe el Author'); 

    try {
        const newAuthor = AuthorSchema({
            name: input.name,
            age: input.age,
            currentCity: input.currentCity,
            createAt: Date.now()
        });

        await newAuthor.save();

        return newAuthor;
    } catch (err) {
        console.log(err)
        throw new Error(err);
    }

    
    
}

module.exports = {
    getMessage,
    saveBook,
    allBooks,
    saveAuthor
}