if(!ApplicationStructure){
    const ApplicationStructure = {
        database:{
            table: [
                {
                    name : 'user_test',
                    column: [
                        "name",
                        "email",
                        "password",
                        "role:n"
                    ],
                    seeder: [
                        ['Tommy Saputra Wijaya', 'tommy.wijaya54@yahoo.com','$2y$10$5jVX3q8h6GnAqwN9KR9sVekmwYZQh0daV5.i65bzdXJMRYi/mtMZi'],
                        ['Eko Saputra Wijaya', 'eko.saputra.wijaya@gmail.com','$2y$10$5jVX3q8h6GnAqwN9KR9sVekmwYZQh0daV5.i65bzdXJMRYi/mtMZi'],
                        ['Shinta Purnama Sari', 'shinta.purnama.sari@outlook.com','$2y$10$5jVX3q8h6GnAqwN9KR9sVekmwYZQh0daV5.i65bzdXJMRYi/mtMZi'],
                        ['Dewi Puspita Sari', 'dewi.puspita.sari@email.com','$2y$10$5jVX3q8h6GnAqwN9KR9sVekmwYZQh0daV5.i65bzdXJMRYi/mtMZi']
                    ]
                }
            ]
        }
        
    }
}

let AppCode = {};

// Column Format List for Migration
const AutoColumnFormatList = {
    'name' : 'string',
    'phone' : 'string',
    'address' : 'string',
    'password' : 'string',
    'note' : 'text',
    'join_date' : 'date',
    'exit_date' : 'date',
    'date' : 'date',
    'day' : 'date',
    'relative_name' : 'string',
    'relative_phone' : 'string',
    'relative_phone' : 'text',
    'user_id' : 'integer',
    'role' : 'string',
}

const PHPFunction = {
    runSeederInBatch:`
function runSeederInBatch ($seeder,$column,$tablename){
    foreach ($seeder as $seed){
        $insert = [];
        foreach($column as $index => $col){
            if (isset($seed[$index])) {
                $insert[$col] = $seed[$index];
            }
        }
        DB::table($tablename)->insert($insert);
    }
};`
}

const AutoEngine = {
    ColumnFormatList : AutoColumnFormatList,
    process : {
        column : function (ColumnString) {
            const cArr = ColumnString.split(":");
            let c = {}
            
            c.name = cArr[0];

            c.required = ColumnString.includes(":r");
            c.nullable = ColumnString.includes(":n");
            c.format = ColumnString.includes(":f");
            
            if(c.format){
                c.type = (ColumnString.split(":f-")[1]).split(":")[0];
            }else if(c.name.includes("_id")){
                c.type = 'integer';
            }else if(c.name.includes("_date")){
                c.type = 'date';
            }else{
                c.type = AutoColumnFormatList[c.name] ? AutoColumnFormatList[c.name] : 'string';
            }

            return c;
        },
        database : (Database) => {
            let NewDatabase = {...Database};
            // adding column array in table;
            NewDatabase.table.forEach(function(table){
                table.columnArray = table.column.map(function(c){
                    return c.split(":")[0];
                })
                return table;
            });

            return NewDatabase;
        }
    }
}

const Database = AutoEngine.process.database(ApplicationStructure.database);
const Tables = Database.table;

// Process table
AppCode = {
    migration:{},
    seeder:{},
    factory:{},
}

// Create Migration & Seeder Code
Tables.forEach(function(table){
    // Code for Migration
    function gnMigrateCode (table) {
        let MigrationCode = "";
        MigrationCode += "Schema::create('"+table.name+"', function (Blueprint $table) {  \n";
        MigrationCode += "\t$table->id();  \n";
        table.column.forEach(function(column){
            const c = AutoEngine.process.column(column);
            MigrationCode += "\t$table->"+c.type+"('"+c.name+"')";
            MigrationCode += c.nullable ? "->nullable()" : "";
            MigrationCode += "; \n"
        });
        MigrationCode += "\t$table->integer('created_by')->nullable();  \n";
        MigrationCode += "\t$table->timestamps();  \n";
        MigrationCode += "});  \n";
        return MigrationCode;
    }
    AppCode.migration[table.name] = gnMigrateCode(table);

    function gnSeederCode (seeder,table,option){
        let code = "";
        if(option === "Each Table Insert"){
            seeder.forEach((seed) => {
                code += "DB::table('"+table.name+"')->insert([    \n";
                table.columnArray.forEach((column,id) => {
                    code +=  seed[id] ? "\t'"+column+"' => '"+ seed[id] +"'\n" : "";
                })
                code += "]);\n\n";
            })
        }

        if(option === "Batch"){
            code += PHPFunction.runSeederInBatch;

            code += "$seeder = array(";
                seeder.forEach((seed) => {
                    code += "\n\t\tarray("
                    seed.forEach((val) => {
                        code += "'"+val+"',"
                    });
                    code = code.slice(0, -1);
                    code += "),";
                });
                code = code.slice(0, -1);
            code += "\n);\n";

            code += "$column = array(";
            table.columnArray.forEach((col) => {
                code += "'"+col+"',"
            });
            code = code.slice(0, -1);
            code += ");";
            
            code += `$tablename = "${table.name}";\n`;
            code += `runSeederInBatch($seeder,$column,$tablename);`
            
        }
        return code;
    }
    if(table.seeder){
        AppCode.seeder[table.name] = gnSeederCode(table.seeder,table,"Batch");
    }
})
