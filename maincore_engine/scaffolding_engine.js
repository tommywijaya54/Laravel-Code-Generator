if(!ApplicationStructure){
    const ApplicationStructure = {
        database:{
            table: [
                {
                    name : 'user_test',
                    // :r = require 
                    // :n = nullable
                    // :f = format -> :f(string) means the column will have string format
                    // by default will be required
                    columns: [
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

// Column Format List for Migration
const AutoColumnFormatList = {
    'name' : 'string',
    'phone' : 'string',
    'address' : 'string',
    'password' : 'string',
    'note' : 'text',
    'join_date' : 'date',
    'exit_date' : 'date',
    'relative_name' : 'string',
    'relative_phone' : 'string',
    'relative_phone' : 'text',
    'user_id' : 'integer',
    'role' : 'string',
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
                // c.type = 
            }else{
                c.type = AutoColumnFormatList[c.name] ? AutoColumnFormatList[c.name] : 'string';
            }

            return c;
        }
    }
}
const Database_Structure = ApplicationStructure.database;
const Tables = Database_Structure.table;
let AppCode = {};

// Process table
AppCode = {
    migration:{}
}

Tables.forEach(function(table){
    // Create Migration Code
    let MigrationCode = "";
    MigrationCode += "Schema::create('"+table.name+"', function (Blueprint $table) {  \n";
    MigrationCode += "\t$table->id();  \n";

    table.columns.forEach(function(column){
        const c = AutoEngine.process.column(column);

        MigrationCode += "\t$table->"+c.type+"('"+c.name+"')";
        MigrationCode += c.nullable ? "->nullable()" : "";
        MigrationCode += "; \n"

    });
    
    MigrationCode += "\t$table->integer('created_by')->nullable();  \n";
    MigrationCode += "\t$table->timestamps();  \n";
    MigrationCode += "});  \n";
    
    AppCode.migration[table.name] = MigrationCode;
})

console.log(AppCode);

function ShowToHTML(AppCode){
    const App = window.document.getElementById('app');

    // for table or migration;
    const migrate_row = document.createElement('div');
    migrate_row.className = "migrate-table";
    const migrate_row_heading = document.createElement('h1');
    migrate_row_heading.innerText = "Code for migrate : table";
    migrate_row.appendChild(migrate_row_heading);

    
    for (let table_name in AppCode.migration) {
        const code = AppCode.migration[table_name];
        
        const row = document.createElement("div");
        row.className = "row";

        const heading = document.createElement("h2");
        heading.innerHTML = table_name;
        
        const pre_code_ID = table_name+"_code"
        const pre = document.createElement("pre");        
        pre.id = pre_code_ID;
        pre.innerHTML = code;

        const copy_button = document.createElement("button");
        copy_button.innerText = "Copy to Clipboard";
        copy_button.addEventListener('click', function () {
            copy_to_clipboard(pre_code_ID)
        });

        row.appendChild(heading);
        row.appendChild(pre);
        row.appendChild(copy_button);
        
        migrate_row.appendChild(row);
    }
    App.appendChild(migrate_row);
}
ShowToHTML(AppCode);


function copy_to_clipboard(elementID) {
    const copyText = document.getElementById(elementID);
    navigator.clipboard.writeText(copyText.innerText);
}