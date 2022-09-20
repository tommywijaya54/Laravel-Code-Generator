
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



// Process table
let AppCode = {
    migration:{},
    seeder:{},
    factory:{},
    controller:{},
    artisan:{},
    FakeString:{
        Exist:[],
        Missing:[]
    },
    Column:{
        All:[],
        Faker:[]
    }
}


// Column Format List for Migration
function gnFormatList(List){
    let Ob = {};
    for (let key in List) {
        const val = List[key];
        Ob[key] = val.split(":")[0];
    };
    return Ob;
};
function gnFactoryFormatList(List){
    let Ob = {};
    for (let key in List) {
        const val = List[key];
        let factoryCode = val.split(":")[1];
                
        if(factoryCode.includes('getRandom')){
                
        }

        if(factoryCode){
            Ob[key] = factoryCode;
        }
    }
    return Ob;
};
const FactoryFormatList = gnFactoryFormatList(ColumnList);
const FormatList = gnFormatList(ColumnList);
const EntityColumnFormatList = (function(ColumnList,Table){
    /*
    let EntityNameSet = new Set();
    Table.forEach((table)=>{
        table.column.forEach((column)=>{
            const entity_name = column.split(':')[0];
            EntityNameSet.add(entity_name);
        })
    })
    console.table(EntityNameSet);

    let EntityName = {};
    Table.forEach((table)=>{
        table.column.forEach((column)=>{
            const entity_name = column.split(':')[0];
            EntityName[entity_name] = {
                string : column,
                entity_name : entity_name
            }
        })
    })
    console.log('EntiryName >> '+Object.keys(EntityName).length);

    let EntityNameOb = {};
    EntityNameSet.forEach((entity_name)=>{
        let row = {
            label:entity_name,
            entity_name:entity_name,
            type:entity_name,
        };

        if(entity_name.includes("_date")){

        }

        if(entity_name.includes("_id")){
            
        }

        EntityNameOb[entity_name] = row;
    })

    */
    // run & transform from columnlist
    let List = {};
    for (let key in ColumnList) {
        const strVal = ColumnList[key].split(":");
        const type = strVal[0];
        let fakerString = strVal[1] || "";
        
        List[key] = {
            type:type,
            fakerString:fakerString
        };
    }

    return List;
})(ColumnList,ApplicationStructure.database.table);
console.table(EntityColumnFormatList);


function getType_and_FakerString(c){
    if(c.entity_name.contains("_id")){
        c.type = "integer"
        // 'manager_id' => $managers->random(),
        c.fakerString = ""
        return c
    }
    if(c.entity_name.contains("_date")){
        c.type = "date";
        c.fakerString = `'${c.entity_name}' => fake()->date(),`;
        return c
    }
    if(EntityColumnFormatList[c.entity_name]){

    }
    alert("Faker Not Found");
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
    process : {
        column : function (ColumnString,table) {
            const cArr = ColumnString.split(":");
            let c = {}
            
            c.name = cArr[0];
            c.label = capitalize(c.name);
            
            c.entityname = c.name;
            c.required = ColumnString.includes(":r");
            c.nullable = ColumnString.includes(":n");
            c.format = ColumnString.includes(":f");

            if(ColumnString.includes(":l-")){
                c.label = (ColumnString.split(":l-")[1]).split(":")[0];
            }

            if(c.format){
                c.type = (ColumnString.split(":f-")[1]).split(":")[0];
            }else if(c.name.includes("_id")){
                c.type = 'integer';
            }else if(c.name.includes("_date")){
                c.type = 'date';
            }else{
                c.type = FormatList[c.name] ? FormatList[c.name] : 'string';
            }

            // create factory string function 
            c.excludeFromFactory = ColumnString.includes(":ef");

            c.code = {
                factory:{
                    includeOnTop:[], // to include generated code for calling get random table entry id
                    row:[]
                }
            }

            // ToDo: code{factory:{}}
            if(!c.excludeFromFactory) {
                c.fakerString = FactoryFormatList[c.entityname] || '';

                if(c.fakerString){
                    c.code.factory = `'${c.entityname}' => fake()->${c.fakerString},`;
                    
                    AppCode.FakeString.Exist.push({   
                        entity_name:c.entityname,
                        fake_string:c.fakerString,
                        col_string:ColumnString,
                        tablename:table.name
                    });
                }else{
                    AppCode.FakeString.Missing.push({   
                        tablename:table.name,
                        entity_name:c.entityname,
                        col_string:ColumnString,
                    }) 
                }
            }
            AppCode.Column.Faker.push(
                {   
                    tablename:table.name,
                    entity_name:c.entityname,
                    entity_type:c.type,
                    fake_string:c.fakerString,
                    col_string:ColumnString
                }
            )

            AppCode.Column.All.push({...c,tablename:table.name});

            return c;
        },
        database : (Database) => {
            let NewDatabase = {...Database};
            // adding column array in table;

            NewDatabase.table.forEach(function(table){
                table.model = capitalize(table.name);
                table.varname = table.name;
                table.tablename = table.tablename || table.name+"s";
                table.entityname = table.entityname || table.name;

                table.column = table.column.map((column)=>{
                    return AutoEngine.process.column(column,table);
                });

                if(table.column){
                    table.columnToArray = table.column.map(function(c){
                        return c.entityname;
                    });
                }

                table.route = [];
                if(table.controller){
                    table.controller.forEach((fn)=>{
                        table.route.push(fn);
                        if(fn === 'create'){
                            table.route.push('store');;
                        }
                        if(fn === 'edit'){
                            table.route.push('update');
                        }
                    });
                }

                table.code = {
                    migrate:"",
                    seeder:"",
                    factory:"",
                    controller:""
                };

                return table;
            });

            return NewDatabase;
        }
    }
}

const Database = AutoEngine.process.database(ApplicationStructure.database);
const Tables = Database.table;




// Create Migration & Seeder Code
Tables.forEach(function(table){
    // Code for Migration
    if(table.column && !table.dontIncludeOnGenerateMigrate){
        function gnMigrateCode (table) {
            let code = "";
            code += "Schema::create('"+table.tablename+"', function (Blueprint $table) {  \n";
            code += "\t$table->id();  \n";
            table.column.forEach(function(c){
                code += "\t$table->"+c.type+"('"+c.name+"')";
                code += c.nullable ? "->nullable()" : "";
                code += "; \n";
            });
            code += "\t$table->integer('created_by')->nullable();  \n";
            code += "\t$table->timestamps();  \n";
            code += "});  \n";
            return code;
        }
        AppCode.migration[table.name] = gnMigrateCode(table);
    }
    
    if(table.seeder){
        function gnSeederCode (seeder,table,option){
            let code = "";
            if(option === "Each Table Insert"){
                seeder.forEach((seed) => {
                    code += "DB::table('"+table.tablename+"')->insert([    \n";
                    table.columnToArray.forEach((column,id) => {
                        code +=  seed[id] ? "\t'"+column+"' => '"+ seed[id] +"'\n" : "";
                    })
                    code += "]);\n\n";
                })
            }

            if(option === "Batch"){
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
                
                if(table.column){
                code += "$column = array(";
                table.columnToArray.forEach((col) => {
                    code += "'"+col+"',"
                });
                code = code.slice(0, -1);
                code += ");\n";
                }
                code += `$tablename = "${table.tablename}";\n`;
                code += `runSeederInBatch($seeder,$column,$tablename);`
                
            }
            return code;
        }
        
        AppCode.seeder[table.name] = gnSeederCode(table.seeder,table,"Batch");
    }

    // create controller
    if(table.controller){
        function gnController(table){
            let code = "";
            
            if(table.controller.includes('index')){
                if(table.simpleview){
                    code += `
                    public function index()
                    {
                        $data = \\App\\Models\\${table.model}::all();
                        return Inertia::render('Simple/Index', [
                            'pagetitle' => "${table.model} List",
                            'data' => $data,
                            'route' => '${table.varname}.edit',
                            'view' => "${table.simpleview}"
                        ]);
                    }
                    `;
                }else{
                    code += `
                    public function index()
                    {
                        $data = \\App\\Models\\${table.model}::all();
                        $${table.varname}s = ${table.model}::all();
                        return Inertia::render('${table.model}/Index', ['${table.varname}s' => $data]);
                    }
                    `;
                }
            }

            if(table.controller.includes('create')){
                let arry = "";
                table.columnToArray.forEach((col)=>{
                    arry += `\t\t\t  '${col}' => $request['${col}'],\n`
                });

                code += `
                public function create()
                {
                    return Inertia::render('${table.model}/Create');
                }

                public function store(Request $request)
                {
                    ${table.model}::create([\n${arry}                    ]);
                }
                
                `
            }
            if(table.controller.includes('edit')){
                code += `
                public function edit($id)
                {
                    $${table.varname} = ${table.model}::find($id);
                    return Inertia::render('${table.model}/Edit', [
                        '${table.varname}' => $${table.varname}
                    ]);
                }
                `;
                code += `
                public function update(Request $request, $id)
                {
                    $${table.varname} = ${table.model}::find($id);\n`;
                
                table.columnToArray.forEach((col)=>{
                    code += ` \t\t    $${table.varname}->${col} = $request->${col};\n`
                })

                code += `  
                    $${table.varname}->update();
                    return Redirect::route('${table.varname}.index');
                }
                `;
            }
            if(table.controller.includes('delete')){
                code +=`
                public function destroy(${table.model} $${table.varname})
                {
                    $${table.varname}->delete();
                    return Redirect::back()->with('message', '${table.model} deleted.');
                }
                `;
            }

            return code;
        }
        AppCode.controller[table.name] = gnController(table);
    }
    // create artisan command
    (function(table){
        AppCode.artisan['All'] = (AppCode.artisan['All']?AppCode.artisan['All']:"") +"php artisan make:model "+table.model+" -c && \n";
    })(table);


    
    (function(table){
        let cy = "route";

        AppCode[cy] = (AppCode[cy] || {});
        AppCode[cy]['All'] = (AppCode[cy]['All'] || "") + `
        Route::resource('${table.varname}', ${table.model}Controller::class, [
            'only' => ${arrToPHPString(table[cy])}
        ]);
        `;
        AppCode[cy]['Use'] = (AppCode[cy]['Use'] || "");
        AppCode[cy]['Use'] += "use App\\Http\\Controllers\\"+table.model+"Controller;\n";
    })(table);


    (function(table){
        let cy = "navlink";
        AppCode[cy] = (AppCode[cy] || {});
        AppCode[cy]['All'] = (AppCode[cy]['All'] || "") + `
        <NavLink href={route('${table.varname}.index')} active={route().current('${table.varname}.index')}>
            ${table.model}
        </NavLink>
        `;
    })(table); 
    
    if(table.factory){
        (function(table){
            let cy = "factory";
            let cx = table.name;
            AppCode[cy] = (AppCode[cy] || {});

            let pullList = "\n";
            let facCode = "\n\t\t\t[\n";
            table.columnToArray.forEach((col) => {
                if(FactoryFormatList[col] === "getRandom"){
                    let ob = col.split('_');
                    pullList += `\t\t$${ob[0]}s = DB::table('${ob[0]}s')->pluck('${ob[1]}');\n`;
                    facCode += `\t\t\t\t'${col}' => ` +`$${ob[0]}s->random(),\n`;
                }else if(FactoryFormatList[col]){
                    facCode += `\t\t\t\t'${col}' => ` +"fake()->"+FactoryFormatList[col]+",\n";
                }else{
                    console.log("missing column in factory : "+col);
                }
                
                
            })
            facCode += "\t\t\t]"

            AppCode[cy][cx] = (AppCode[cy][cx] || "") + `
                ${pullList}
                for ($x = 1; $x <= ${table.factory}; $x++) {
                    $arr = ${facCode};
                    DB::table('${table.tablename}')->insert($arr); 
                }
            `;
        })(table); 
    }


});

// console.log(AppCode.navlink.All);

// console.table(AppCode.FakeString.Missing);
// console.table(AppCode.FakeString.Exist);
// console.table(AppCode.Column.All);

console.table(AppCode.Column.Faker);
