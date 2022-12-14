/** 
 *  Columns short hand 
 *  entityname:[shorthand] 
 *  example = email:n:f-email
    :r = require (by default it has required)
    :n = nullable
    :f-[column_type] = format -> :f-string means the column will have string format
*/

const ApplicationStructure = {
    database:{
        table: [
            {
                name : 'user',
                column: [
                    "name",
                    "email",
                    "password"
                ],
                seeder: [
                    ['Tommy Saputra Wijaya', 'tommy.wijaya54@yahoo.com','$2y$10$5jVX3q8h6GnAqwN9KR9sVekmwYZQh0daV5.i65bzdXJMRYi/mtMZi'],
                    ['Eko Saputra Wijaya', 'eko.saputra.wijaya@gmail.com','$2y$10$5jVX3q8h6GnAqwN9KR9sVekmwYZQh0daV5.i65bzdXJMRYi/mtMZi'],
                    ['Shinta Purnama Sari', 'shinta.purnama.sari@outlook.com','$2y$10$5jVX3q8h6GnAqwN9KR9sVekmwYZQh0daV5.i65bzdXJMRYi/mtMZi'],
                    ['Dewi Puspita Sari', 'dewi.puspita.sari@email.com','$2y$10$5jVX3q8h6GnAqwN9KR9sVekmwYZQh0daV5.i65bzdXJMRYi/mtMZi']
                ],
                controller: ["index","edit"],
                simpleview:"Name,Email",
                dontIncludeOnGenerateMigrate:true
            },

            {
                name : 'employee',
                column: [
                    'nik',
                    'name',
                    'address',
                    'phone',
                    'email',
                    'roles', // Employee can have multiple role
                    'emergency_name',
                    'emergency_phone',
                    'join_date',
                    'exit_date',
                    'note',
                    'user_id',
                    'branches_id:n:ef',
                ],
                factory:30

            },

            {
                name: 'manager',
                column: [
                    'employee_id',
                    'branches_id:n:ef',
                    'note'
                ],
                factory:4
            },

            {
                name : 'branch',
                tablename : 'branches',
                column: [
                    "name",
                    "address",
                    "phone",
                    "manager_id:n:ef",
                    "email",
                    "open_date",
                    "status:n"
                ],
                factory:4,
                controller: ["index","create","edit","delete"],
                simpleview:"Name,Address"
            },


            {
                name : 'expense', // Branch Expenses
                column : [
                    'branches_id',
                    'expense_type',  // Listrik, Air, Internet, IPL, Others
                    'description',
                    'amount',
                    'date',
                    'approve_by:n'
                ]
            },
            
            {
                name : 'rental', // Branch Rental Expenses
                column : [
                    'branches_id',
                    'start_date',
                    'end_date',
                    'amount',
                    'owner_name',
                    'owner_phone',
                    'notaris_name',
                    'notaris_phone'
                ]
            },
            
            {
                name : 'assets', // Branch Asset
                column : [
                    'item_name',
                    'qty',
                    'cost',
                    'note'
                ]
            },
            
            
            
            {
                name:'parent',
                column:[
                    'nik:n',
                    'name',
                    'address',
                    'phone',
                    'email:n',
                    'birth_date:n',
                    'emergency_name:n',
                    'emergency_phone:n',
                    'bank_account_name:n',
                    'virtual_account_name:n',
                    'note:n',
                    'user_id:n',
                    'blacklist:n', // true , false
                ]
            },
            
            {
                name : 'student',
                column: [
                    "parent_id",
                    "school_id",
                    "grade", // ["tka, tkb, k1, k2, Grade 1 - 12 "]
                    "name",
                    "email",
                    "phone",
                    "address",
                    "join_date",
                    "exit_date",
                    "exit_reason",
                    "birth_date",
                    "type", // [regular/private]
                    "health_condition",
                    "note"
                ],
                controller: ["index","create","edit","delete"],
                factory:30,
                simpleview:"Name,Email,Phone"
            },
            
            {
                name: 'school',
                column : [
                    'name',
                    'address:n',
                    'city:n',
                    'type:n', // ['National','International','National + Internatiol']
                    'color_code:n',
                ]
            },
            
            {
                name: 'pricelist',
                column : [
                    'start_date', // start period
                    'end_date', // end period
                    'level',
                    'school_type',
                    'subject',
                    'price',
                    'week',
                    'branches_id'
                ]
            },
            
            {
                name: 'promolist',
                column : [
                    'start_date', // start period
                    'end_date', // end period
                    'label', // discount 30%, discount group, promo registasi
                    'discount_value', // discount 30%, -300000
                    'branches_id'
                ]
            },
            
            {
                name : 'registration',
                column: [
                    "student_id",
                    "branch_id",
                    "date", //registration
                    "reference", // note
                    "cashback", // untuk transfer ke temen  
                    "status:n", // 'In Progress' : 'Complete' : 'Active' // ToDo : Untuk di bahas
                    "note:n",
                ],
                controller: ["index","create","edit","delete"],
                factory:50
            },
            
            {
                name: 'registrationitem', // item list of registration
                column : [
                    'registration_id',
                    'pricelist_id:n',
                    'promolist_id:n',
                    'charges', // ["Late Payment Charges", "Adjustment Tagihan"]
                    'price:n',
                    'discount_amount:n'
                ]
            },
            
            {
                name:'salary',
                column: [
                    'employee_id',
                    'amount',
                    'start_date',
                    'end_date',
                    'note'
                ]
            },
            
            
            
            {
                name: 'advisor',
                column: [
                    'employee_id',
                    'note'
                ]
            },
            
            {
                name: 'teacher',
                column: [
                    'employee_id',
                    'subject',
                    'note'
                ]
            },
            
            {
                name: 'subject', // Subject Untuk Teacher
                column: [
                    'teacher_id',
                    'subject',
                    'school'
                ]
            },
            
            {
                name : 'employeerole',
                column:[
                    'employee_id',
                    'role_title',
                    'start_date:n',
                    'end_date:n'
                ]
            },
            
            {
                name: 'roletype', // user role
                column: [
                    'title' // ['Owner', 'Super Admin','Admin','Branch Manager','Advisor','Teacher','HRD','Finance']
                ]
            },
            
            {
                name: 'actionhistory',
                column: [
                    'action'
                ]
            },
            
            {
                name : 'schedule',
                column: [
                    "day",
                    "time_slot",
                    "subject",
                    "classroom",
                    "duration",
                    "date"
                ],
                controller: ["index","create","edit","delete"],
                factory:20,
                view:["index:simple"],
                simpleview:"Day,Subject,Duration"
            }
        ]
    }
}




const ColumnList = {
    'name'              : 'string:name()',
    'phone'             : 'string:phoneNumber()',
    'address'           : 'string:address()',
    'password'          : 'string:text(20)',
    'note'              : 'text:text(50)',
    'join_date'         : 'date:date()',
    'exit_date'         : 'date:date()',
    'date'              : 'date:date()',
    'day'               : 'date:date()',
    'relative_name'     : 'string:name()',
    'relative_phone'    : 'string:phoneNumber()',
    'relative_note'     : 'text:text(50)',
    'time_slot'         : 'string:time()',
    'subject'           : 'string:sentence(3)',
    'classroom'         : 'string:sentence(1)',
    'duration'          : 'string:randomElement(["1","1.5","2"])',
    'reference'         : 'string:text(50)',
    'cashback'          : 'integer:randomElement([100000,280000,300000])',
    'status'            : 'string:text(10)',
    'remarks'           : 'string:text(10)',
    'email'             : 'string:safeEmail()',
    'open_date'         : 'date:date()',
    'grade'             : 'date:date()',
    'exit_reason'       : 'text:text(20)',
    'birth_date'        : 'date:date()',
    'type'              : 'string:sentence(4)',
    'health_condition'  : 'string:sentence(4)',
    'manager_id'        : 'integer:getRandom',
    'student_id'        : 'integer:getRandom',
    'branch_id'         : 'integer:getRandom',
    'parent_id'         : 'integer:getRandom',
    'school_id'         : 'integer:getRandom',
    'user_id'           : 'integer:getRandom-user->id',
    'role'              : 'string:getRandom-role->role'
}