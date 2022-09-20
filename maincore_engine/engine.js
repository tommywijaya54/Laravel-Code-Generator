
// Run Report of Existing List and Error List;
function runReport(){
    (()=>{
        if(DefaultFormatList.ExistList && flags.showExistList){
            console.log("Exist Column List on Default Format List");
            console.table(DefaultFormatList.ExistList);
        }
        
        (ErrorList => {
            if(ErrorList.length){
                console.log("ERROR List on Default Format List");
                console.table(DefaultFormatList.ErrorList);

                let PrintStr = "";
                let Printed = new Set();

                if(ErrorList.length > 0){
                    PrintStr += 'addToAdditionalList([\n';
                }

                ErrorList.forEach(element => {
                    if(!Printed.has(element.entity_name)){
                        Printed.add(element.entity_name);

                        PrintStr += `\t\t"${element.entity_name}:string:fake()->text()",\n`;
                        
                    }
                });

                PrintStr = PrintStr.slice(0,-2);

                if(ErrorList.length > 0){
                    PrintStr += '\n]);';
                }

                console.log(PrintStr);
                console.log(Printed.size);
            }
        })(DefaultFormatList.ErrorList);

    })();
}

/*

a = new ColumnClass('name');
b = new ColumnClass('name:n');
c = new ColumnClass('name:l-Name Lengkap');
d = new ColumnClass('name:t-text');
e = new ColumnClass('email:n:fk-unique,safeEmail');
// console.log(a,b,c,d);
console.log(e.fakerString);

*/

// Run Generator
var flags = {
    debug:false,
    debugOnClasses : false,
    debugTable: false,
    showExistList : false
};

var Tables = (table => {
    let AllUniqueColumn = new Set();
    // Run Check Before Generate the Table & Column

        // get all column
        ((table) => {
            table.forEach((table) => {
                table.column.forEach(col => {
                    AllUniqueColumn.add(col);
                })
            });
            if(flags.debug){
                console.log(AllUniqueColumn.size);
            }
        })(table);

        // run all check
        ((table) => {
            table.forEach((table) => {
                table.column.forEach(col => {
                    DefaultFormatList.checkIfColumnExist(col, table.name) 
                });
            });
        })(table);

        runReport();

    // Generate 
    if(DefaultFormatList.ErrorList.length == 0){
        const TableList = ApplicationStructure.database.table.map((table) => {
            let NewTable = new TableClass(table);
            
            if(flags.debugTable){
                console.log(NewTable);
            }

            return NewTable;
        });

        if(flags.debugTable){
            console.table(TableList);
        }
        return TableList;
    }else{
        alert("There are Error : please check console");
    }
})(ApplicationStructure.database.table);

// Run Tables to Generate Laravel Code for Migration, Seeder, Factory, Controller;
if(Tables && Tables.length > 0){
    (Tables => {
        Tables.forEach(Table => {
            Table.generateLaravelCode();
        })
    })(Tables);
}

// Run Code For Artisan && Route
if(Tables && Tables.length > 0){
    (Tables => {
        Tables.forEach(Table => {
            Table.generateLaravelCode();
        })
    })(Tables);
}

let Code = {
    all : {
        migrate:"",
        factory:"",
        seeder:"",
        controller:""
    }
};

((Tables) => {
    Tables.forEach(Table => {
        Code.all.migrate += "\n\n" + Table.code.migrate;
        Code.all.factory += "\n\n" + Table.code.factory;
        Code.all.seeder += "\n\n" + Table.code.seeder;
        Code.all.controller += "\n\n" + Table.code.controller;
    })
})(Tables);

_copy_to_clipboard(Code.all.controller);
_copy_to_clipboard(Code.all.migrate);
_copy_to_clipboard(Code.all.factory);
_copy_to_clipboard(Code.all.seeder);
