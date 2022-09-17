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
const FactoryFormatList = gnFactoryFormatList(AFormatList);
const FormatList = gnFormatList(AFormatList);
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
    ColumnFormatList : FormatList,
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
                c.type = FormatList[c.name] ? FormatList[c.name] : 'string';
            }

            return c;
        },
        database : (Database) => {
            let NewDatabase = {...Database};
            // adding column array in table;

            NewDatabase.table.forEach(function(table){
                table.model = capitalize(table.name);
                table.varname = table.name;
                table.tablename = table.name+"s";
                table.entityname = table.name;

                if(table.column){
                table.columnArray = table.column.map(function(c){
                    return c.split(":")[0];
                })
                }

                table.route = [];
                table.controller.forEach((fn)=>{
                    table.route.push(fn);
                    if(fn === 'create'){
                        table.route.push('store');;
                    }
                    if(fn === 'edit'){
                        table.route.push('update');
                    }
                });

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
    controller:{},
    artisan:{}
}

// Create Migration & Seeder Code
Tables.forEach(function(table){
    // Code for Migration
    if(table.column){
        function gnMigrateCode (table) {
            let MigrationCode = "";
            MigrationCode += "Schema::create('"+table.tablename+"', function (Blueprint $table) {  \n";
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
    }
    
    if(table.seeder){
        function gnSeederCode (seeder,table,option){
            let code = "";
            if(option === "Each Table Insert"){
                seeder.forEach((seed) => {
                    code += "DB::table('"+table.tablename+"')->insert([    \n";
                    table.columnArray.forEach((column,id) => {
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
                table.columnArray.forEach((col) => {
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
                code += `
                public function index()
                {
                    $${table.varname}s = ${table.model}::all();
                    return Inertia::render('${table.model}/Index', ['${table.varname}s' => $${table.varname}s]);
                }
                `;
            }

            if(table.controller.includes('create')){
                let arry = "";
                table.columnArray.forEach((col)=>{
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
                
                table.columnArray.forEach((col)=>{
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
            table.columnArray.forEach((col) => {
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

console.log(AppCode.navlink.All);

function arrToPHPString(arr){
    let str = "[";
    arr.forEach((ax) => {str += "'"+ax+"',"});
    str = str.slice(0, -1);
    str += "]"
    return str;
}

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
