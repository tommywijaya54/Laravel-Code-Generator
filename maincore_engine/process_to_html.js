// Process it to html
function ShowToHTML(AppCode){
    const App = window.document.getElementById('app');

    // for table or migration;
    const migrate_row = document.createElement('div');
    migrate_row.className = "code-box";
    migrate_row.id = "migrate";

        const migrate_row_header_div = document.createElement('div');
        migrate_row_header_div.className = "row-header";

        const migrate_row_heading = document.createElement('h1');
        migrate_row_heading.innerText = "Code for migrate : table";
        migrate_row_heading.className = "clickable"

        migrate_row_heading.addEventListener('click', function () {
            toggleClass("migrate","hide-row");
        });        

        migrate_row_header_div.appendChild(migrate_row_heading);

        const copy_button = document.createElement("button");
        copy_button.innerText = "Copy All Migrate Code to Clipboard";
        copy_button.addEventListener('click', function () {
            copy_all_to_clipboard(AppCode.migration)
        });

        migrate_row_header_div.appendChild(copy_button);


    migrate_row.appendChild(migrate_row_header_div);
    

    function createCodeHeader (BoxName, appendTo){
        const row_header = createEl('div',null,'row-header',null,appendTo);
        const heading = createEl('h1',"Code for "+BoxName,'','clickable',row_header);
        heading.addEventListener('click', function () {
            toggleClass(BoxName,"hide-row");
        });
        const button = createEl('button',"Copy All Migrate Code to Clipboard",'','',row_header);
        button.addEventListener('click', function () {
            copy_all_to_clipboard(AppCode[BoxName]);
        });
    }

    function createCodeRow (code,table_name,px){
        const row = document.createElement("div");
        row.className = "row";

        const heading = document.createElement("h2");
        heading.innerHTML = table_name;
        
        const pre_code_ID = table_name+"_code_"+px;
        const pre = document.createElement("pre");        
        pre.id = pre_code_ID;
        pre.innerHTML = code;

        const copy_button = document.createElement("button");
        copy_button.innerText = "Copy to Clipboard";
        copy_button.addEventListener('click', function () {
            copy_to_clipboard(pre_code_ID)
        });

        row.appendChild(heading);
        row.appendChild(copy_button);
        row.appendChild(pre);

        return row;
    }

    function createEl(tag,text,id,class_name,appendTo){
        const el = document.createElement(tag);
        el.id = id ? id : '' ;
        el.innerText = text ? text : "";
        el.className = class_name ? class_name : '' ;
        appendTo.appendChild(el);
        return el;
    }



    for (let table_name in AppCode.migration) {
        const code = AppCode.migration[table_name]; 
        migrate_row.appendChild(createCodeRow(code,table_name,"migrate"));
    }
    App.appendChild(migrate_row);






    const SeederID = "seeder"
    const seeder_code_box = createEl('div',SeederID,null,"code-box",App);
    
    createCodeHeader(SeederID,seeder_code_box);

    for (let table_name in AppCode.seeder) {
        const code = AppCode.seeder[table_name];
        seeder_code_box.appendChild(createCodeRow(code,table_name,SeederID));
    }

    App.appendChild(seeder_code_box);
}
ShowToHTML(AppCode);

function copy_to_clipboard(elementID) {
    const copyText = document.getElementById(elementID);
    navigator.clipboard.writeText(copyText.innerText);
}

function copy_all_to_clipboard(codeob){
    let all_code = "";
    for (let key in codeob) {
        all_code += codeob[key] + "\n\n";
    }
    navigator.clipboard.writeText(all_code);
}

function toggleClass(elID, class_name){
    const el = document.getElementById(elID);
    if(el.className.includes(class_name)){
        el.className = el.className.replace(" "+class_name, "");
    }else{
        el.className = el.className + " " +class_name;
    }
}