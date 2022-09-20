class DefaultColumnFormatList{
    constructor () {
        this.defautlList = _DefaultFormatList;
        
        this.additionalList = [];
        if(!(AdditionalFormatList === undefined)){
            for(const key in AdditionalFormatList){
                const a = AdditionalFormatList[key].split(":");
                this.additionalList.push({
                    column : key,
                    type:a[0],
                    faker:a[1]
                })
            }
        }

        this.list = this.defautlList.concat(this.additionalList);

        // transform list to Object & Property
        this.Column = {};

        this.list.forEach((aColumn) => {
            const column_names = aColumn.column.split(',');

            column_names.forEach((column) => {
                if(this.Column[column]){
                    throw new ErrorException(column+' : Error Column Exist Default List');
                }

                this.Column[column] = {
                    type : aColumn.type,
                    faker : aColumn.faker
                }
            });
        });

        // for Error Listing
        this.ErrorList = [];
        this.ExistList = [];
    }

    getType (EntityName) {
        return this.getColumnByEntityName(EntityName).type;
    }

    getFaker (EntityName) {
        return this.getColumnByEntityName(EntityName).faker;
    }

    getColumnByEntityName (EntityName) {
        if(!this.Column[EntityName]){
            throw new ErrorException(EntityName +" : Entity name not found on Default Format List");
        }

        return this.Column[EntityName];
    }

    checkIfColumnExist(Str,TableName) {
        const EntityName = (Str.split(':')[0]);


        if(EntityName.includes("_")){
            if(flags.debugOnClasses){
                console.log(" --> "+EntityName);
            }

            const GenEntityName = "*_"+EntityName.split('_')[1];
            
            // Create New Column from generated one
            if(this.Column[GenEntityName]){
                this.Column[EntityName] = this.Column[GenEntityName];
            }
        }   

        if(this.Column[EntityName]){
            this.ExistList.push({
                entity_name : EntityName,
                type: this.Column[EntityName].type,
                table_name : TableName,
                faker: this.Column[EntityName].faker
            });

            return true; 
        }   
        
        
        this.ErrorList.push({
            entity_name : EntityName,
            table_name : TableName
        })
        return false;
    }
}

DefaultFormatList = new DefaultColumnFormatList();

class TableClass{
    constructor(table){
        this._original = table;

        this.name = table.name;
        this.tablename = this.name.plural();
        this.model = this.name.cap();
        this.code = {};
        
        if(flags.debugOnClasses){
            console.log("= > "+table.name);
        }

        this.column = table.column.map((column) => {
            if(flags.debugOnClasses){
                console.log("= > "+table.name+" ====> Column "+column);
            }
            return new ColumnClass(column, table);
        })
    }

    generateLaravelCode () {
        this.code.seeder = Generate.seeder(this);
        this.code.migration = Generate.migration(this);
        this.code.factory = Generate.factory(this);
        this.code.controller = Generate.controller(this);
    }
}


// Require DefaultColumnFormatList Class
class ColumnClass{
    constructor(ColumnOriginalString, table) {
        
        this.origialString = ColumnOriginalString;
        this.initString = this.origialString;
        
        const arr = this.initString.split(':');
        const str = this.initString;

        this.name = arr[0];
        this.entityname = this.name;
        this.nullable = arr.includes('n');

        // create label (:l-[Label Name]) 
        // or it default to capitalize name 

        this.label = capitalize(this.name);
        if(str.includes(":l-")){
            this.label = (str.split(":l-")[1]).split(":")[0];
        }

        // create column type (:t-[column type])
        // refer column type to https://laravel.com/docs/9.x/migrations#available-column-types
        if(str.includes(":t-")){
            this.type = (str.split(":t-")[1]).split(":")[0];
        }else{
            this.type = DefaultFormatList.getType(this.entityname);
        }

        this.noFactory = arr.includes('nf');
        this.fakerString = '';
        if(!this.noFactory){
            if(str.includes(":fk-")){
                this.fakerString = (str.split(":fk-")[1]).split(":")[0];
            }else{
                this.fakerString = DefaultFormatList.getFaker(this.entityname);
            }
        }
    }
}




