const fs = require('fs');
const chalk = require('chalk');
const { Console } = require('console');

const readNote = (title) => {
    notes = loadNotes();
    const noteToRead = notes.find(note => note.title === title)

    if (!noteToRead) {
        console.log(chalk.red('Note not found'))
    } else {
        console.log(chalk.magenta(noteToRead.title))
        console.log(noteToRead.body) 
    }
}

const listNotes = (title) => {
    console.log(chalk.bgCyan.black('Your Notes:'))
    notes = loadNotes();

    return notes.forEach((note) => {
        console.log(chalk.magenta(note.title))
    })
}


const removeNote = (title) => {
    const notes = loadNotes()
    
    const keepNotes = notes.filter((note) => note.title !== title )

    if (notes.length > keepNotes.length) {
        saveNotes(keepNotes)
        console.log(chalk.green(title + ', has been removed'));
    } else {
        console.log(chalk.red('No note found'));
    }

}

const addNote = (title, body) => {
    const notes = loadNotes()
    // const duplicateNotes = notes.filter((note) => note.title === title )
    const duplicateNote = notes.find(note => note.title === title)

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green('New note added!'))
    } else {
        console.log(chalk.red('Note title taken'))
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
    try{
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch(e) {
        return []
    }
}


module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}