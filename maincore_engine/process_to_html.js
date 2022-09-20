// Process it to html
function ShowToHTML(AppCode){
    const App = window.document.getElementById('app');

    // for table or migration;
    
    function createCodeHeader (BoxName, appendTo){
        const row_header = createEl('div',null,null,'row-header',appendTo);
        const heading = createEl('h1',"Code for "+BoxName,'','clickable',row_header);
        heading.addEventListener('click', function () {
            toggleClass(BoxName,"hide-row");
        });
        const button = createEl('button',"Copy All "+BoxName.toUpperCase()+" Code",'','',row_header);
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

    for (let keyname in AppCode) {
        const BoxID = keyname;
        const code_box = createEl('div',null,BoxID,"code-box hide-row",App);
        createCodeHeader(BoxID,code_box);

        for (let table_name in AppCode[BoxID]) {
            const code = AppCode[BoxID][table_name];
            code_box.appendChild(createCodeRow(code,table_name,BoxID));
        }

        // App.appendChild(code_box);
    }

    (function(){
        const BoxID = "PHP Code";
        const code_box = createEl('div',null,BoxID,"code-box",App);
        createCodeHeader(BoxID,code_box);
        code_box.appendChild(createCodeRow(PHPFunction.runSeederInBatch,"php_function",BoxID));
        
    })()   
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