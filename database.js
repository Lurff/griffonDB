const fs = require("fs")

class DB {
    /**
    * @param {string} key
    */
    setItem(key,value){

        const file = JSON.parse(fs.readFileSync(`./database.json`,"utf-8"))

        file[key] = value

        fs.writeFileSync(`./database.json`, JSON.stringify(file, null, 1))
    
        return this.getItem(key)
    }

    getItem(key){

        const file = JSON.parse(fs.readFileSync(`./database.json`,"utf-8"))
        
        if(!file[key]) return;

        return file[key]

    }

    hasItem(key){

        const file = JSON.parse(fs.readFileSync(`./database.json`,"utf-8"))

        return file[key] ? true : false
    }

    deleteItem(key){

        const file = JSON.parse(fs.readFileSync(`./database.json`,"utf-8"))

        if(!file[key]) return;

        delete file[key]
    
        return fs.writeFileSync(`./database.json`, JSON.stringify(file, null, 1))

    }

    backup(fileName){

        const file = JSON.parse(fs.readFileSync(`./database.json`,"utf-8"))

        return fs.writeFileSync(`${fileName}.json`, JSON.stringify(file, null, 1))

    }

    addItem(key,value){

        const file = JSON.parse(fs.readFileSync(`./database.json`,"utf-8"))

        if(typeof value !== "number") return;

        if(!this.findItem(key)) return this.setItem(key,value)

        if(typeof this.getItem(key) !== "number") return;

        file[key] += value

        return fs.writeFileSync(`database.json`, JSON.stringify(file, null, 1))
    }

    subtractItem(key,value){

        const file = JSON.parse(fs.readFileSync(`./database.json`,"utf-8"))

        if(typeof value !== "number") return;

        if(!this.findItem(key)) return;

        if(typeof this.getItem(key) !== "number") return;

        file[key] -= value

        return fs.writeFileSync(`database.json`, JSON.stringify(file, null, 1))

    }

    clear(){
        return fs.writeFileSync(`database.json`, JSON.stringify({}, null, 1))
    }

    pushItem(key,value){

        const data = this.getItem(key);
        if (!data) {
            return this.setItem(key, [value]);
        }
        if (Array.isArray(data)) {
            data.push(value);
            return this.setItem(key, data);
        } else {
            return this.setItem(key, [value]);
        }
    }

    unpushItem(key,value){
        var arr = [];

    if(this.getItem(key)) {
      arr = this.getItem(key);
    }

    arr = arr.filter((x) => x !== value);

    this.setItem(key, arr);

    return this.getItem(key);
    }

    typeOfItem(key){

        const file = JSON.parse(fs.readFileSync(`./database.json`,"utf-8"))
        
        if(!file[key]) return;

        return Array.isArray(file[key]) ? "array" :  typeof file[key]

    }
    someArrayItem(key, callback){
        const file = JSON.parse(fs.readFileSync(`./database.json`,"utf-8"))
        return file[key].some(callback)
    }
    all(){
       return JSON.parse(fs.readFileSync(`./database.json`,"utf-8"))
    }
    filter(callback){
       const file = JSON.parse(fs.readFileSync(`./database.json`,"utf-8"))
       return file.filter(callback)
    }
    /*
    * @param {(value: any, key: string) => any} callback
    **/
    findItem(callback) {
      for(const allDB of this.all()){
         return callback(allDB.value, allDB.ID) ? allDB.value : undefined
      }
   }  
}

module.exports = new DB()
