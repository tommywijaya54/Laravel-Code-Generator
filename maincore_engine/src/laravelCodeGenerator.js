const LaravelCodeGenerator = {
    seeder : (table) => {
        if(table._original.seeder){
            const seeder = table._original.seeder;

            let code = "";
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
            table.column.forEach((col) => {
                code += "'"+col.entityname+"',"
            });
            code = code.slice(0, -1);
            code += ");\n";
            }
            code += `$tablename = "${table.tablename}";\n`;
            code += `runSeederInBatch($seeder,$column,$tablename);`
            return code;
        }
        return '// no seeder : application data';
    },
    migration : (table) => {
        let code = "";
        code += "Schema::create('"+table.tablename+"', function (Blueprint $table) {  \n";
        code += "\t$table->id();  \n";
        table.column.forEach(function(c){
            code += "\t$table->"+c.type+"('"+c.entityname+"')";
            code += c.nullable ? "->nullable()" : "";
            code += "; \n";
        });
        code += "\t$table->integer('created_by')->nullable();  \n";
        code += "\t$table->timestamps();  \n";
        code += "});  \n";
        return code;
    }, 
    factory : (table) => {
        let code = "";

        code += `for ($x = 1; $x <= ${table._original.factory}; $x++) {
                $arr = [`;
        
            table.column.forEach((col) => {
                code += `'${col.entityname}' => ${col.fakerString},`
            })
                
        code += `];
                    DB::table('${table.tablename}')->insert($arr); 
                }`;

        return code;
    }, 
    controller : (table) => {
        let code = "";
            
            if(table._original.controller.includes('index')){
                if(table._original.simpleview){
                    
                    code += `
                    public function index()
                    {
                        $data = \\App\\Models\\${table.model}::all();
                        return Inertia::render('Simple/Index', [
                            'pagetitle' => "${table.model} List",
                            'data' => $data,
                            'route' => '${table.name}.edit',
                            'view' => "${table._original.simpleview}"
                        ]);
                    }
                    `;
                }else{
                    code += `
                    public function index()
                    {
                        $data = \\App\\Models\\${table.model}::all();
                        return Inertia::render('${table.model}/Index', ['data' => $data]);
                    }
                    `;
                }
            }

            if(table._original.controller.includes('create')){
                let arry = "";
                table.column.forEach((col)=>{
                    arry += `\t\t\t  '${col.entityname}' => $request['${col.entityname}'],\n`
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
            if(table._original.controller.includes('edit')){
                code += `
                public function edit($id)
                {
                    $data = ${table.model}::find($id);
                    return Inertia::render('${table.model}/Edit', [
                        'data' => $data
                    ]);
                }
                `;
                code += `
                public function update(Request $request, $id)
                {
                    $entity = ${table.model}::find($id);\n`;
                
                table.column.forEach((col)=>{
                    code += ` \t\t    $entity->${col.entityname} = $request->${col.entityname};\n`
                })

                code += `  
                    $entity->update();
                    return Redirect::route('${table.name}.index');
                }
                `;
            }
            if(table._original.controller.includes('delete')){
                code +=`
                public function destroy(${table.model} $${table.name})
                {
                    $${table.name}->delete();
                    return Redirect::back()->with('message', '${table.model} deleted.');
                }
                `;
            }
        return code;
    }, 
}

const Generate = LaravelCodeGenerator;