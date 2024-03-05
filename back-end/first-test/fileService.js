import * as uuid from "uuid";
import * as path from "path";

class FileSevrice{
    saveFile(file){
       try{
            const fileName = uuid.v4() + '.png'
            const picPath = path.resolve('static', fileName)
            file.mv(picPath)
            return fileName;
       }catch(e){
            console.log(e)
       }
    }
}

export default new FileSevrice();