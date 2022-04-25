const { rejects } = require('assert');
const nedb= require('nedb');
const { resolve } = require('path');

class GuestBook{

    constructor(dbFilePath){
        if(dbFilePath){
            this.db= new Nedb({filename:dbFilePath, autoload: true});
            console.log('DB connected to' +dbFilePath);
        }else{
            this.db = new nedb();
        }
    }

    init(){
        this.db.insert({
            subject:'I liked the exhibition',
            content: 'nice',
            published:'2020-02-16',
            author:'Peter'
        });

        console.log('db entry Peter inserted');

        this.db.insert({
            subject:"Didn't like it",
            content: 'A really terrible style!',
            published:'2020-02-18',
            author:'Ann'
        });

        console.log('db entry Ann inserted');
    }

    //function to return all entries
    getAllEntries(){
        //return a promise object, which can be resolve or reject
        return new Promise((resolve,reject)=>{
            //use find() function to get data
            this.db.find({},(err,entries)=>{
                //if error reject
                if(err){
                    reject(err)
                }else{
                    resolve(entries);
                    //to see what return data look like
                    console.log('function all() returns: ',entries);
                }
            })
        })
    }

    getEntriesByUser(authorName){
        //return promise object
        return new Promise((resolve, reject)=>{
            //find author Peter retrives data
            //with error callback function
            this.db.find({'author': authorName},(err,entries)=>{
                if(err){
                    reject(err);
                }else{
                    resolve(entries);
                    //to see what the return data looks like
                    console.log('getEntriesByUser() returns: ',entries);
                }
            })
        })
    }

    addEntry(author, subject, content) {
        var entry = {
        author: author,
        subject: subject,
        content: content,
        published: new Date().toISOString().split('T')[0] 
        }
        console.log('entry created', entry);
        this.db.insert(entry, function(err, doc) {
            if (err) {
                console.log('Error inserting document', subject);
            } else {
                console.log('document inserted into the database', doc);
            }
        })
    }






}
//make the module visible
module.exports=GuestBook;