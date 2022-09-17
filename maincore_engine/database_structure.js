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
                controller: ["index"]
            },
            /* {
                name : 'user_test',
                column: [
                    "name",
                    "email",
                    "password",
                    "role:n:f-list-role"
                ],
                seeder: [
                    ['Tommy Saputra Wijaya', 'tommy.wijaya54@yahoo.com','$2y$10$5jVX3q8h6GnAqwN9KR9sVekmwYZQh0daV5.i65bzdXJMRYi/mtMZi'],
                    ['Eko Saputra Wijaya', 'eko.saputra.wijaya@gmail.com','$2y$10$5jVX3q8h6GnAqwN9KR9sVekmwYZQh0daV5.i65bzdXJMRYi/mtMZi'],
                    ['Shinta Purnama Sari', 'shinta.purnama.sari@outlook.com','$2y$10$5jVX3q8h6GnAqwN9KR9sVekmwYZQh0daV5.i65bzdXJMRYi/mtMZi'],
                    ['Dewi Puspita Sari', 'dewi.puspita.sari@email.com','$2y$10$5jVX3q8h6GnAqwN9KR9sVekmwYZQh0daV5.i65bzdXJMRYi/mtMZi']
                ],
                controller: ["index","create","edit","delete"]
            }, */
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
                view:["index:simple"]
            },
            {
                name : 'student',
                column: [
                    "name",
                    "email",
                    "phone",
                    "address",
                    "join_date",
                    "exit_date"
                ],
                controller: ["index","create","edit","delete"],
                factory:30
            },
            {
                name : 'branch',
                column: [
                    "name",
                    "address",
                    "phone",
                    "email",
                    "status:n"
                ],
                controller: ["index","create","edit","delete"],
                factory:4
            },{
                name : 'registration',
                column: [
                    "student_id",
                    "branch_id",
                    "reference",
                    "cashback",
                    "status:n",
                    "remarks:n"
                ],
                controller: ["index","create","edit","delete"],
                factory:50
            }
            
            

        ]
    }
    
}


const AFormatList = {
    'name' : 'string:name()',
    'phone' : 'string:phoneNumber()',
    'address' : 'string:address()',
    'password' : 'string:text(20)',
    'note' : 'text:text(50)',
    'join_date' : 'date:date()',
    'exit_date' : 'date:date()',
    'date' : 'date:date()',
    'day' : 'date:date()',
    'relative_name' : 'string:name()',
    'relative_phone' : 'string:phoneNumber()',
    'relative_note' : 'text:text(50)',
    'user_id' : 'integer:getRandom-user->id',
    'role' : 'string:getRandom-role->role',
    'time_slot':'string:time()',
    'subject':'string:sentence(3)',
    'classroom':'string:sentence(1)',
    'duration':'string:randomElement(["1","1.5","2"])',
    'student_id':'integer:getRandom',
    'branch_id':'integer:getRandom',
    'reference':'string:text(50)',
    'cashback':'integer:randomElement([100000,280000,300000])',
    'status':'string:text(10)',
    'remarks':'string:text(10)',
    'email':'string:safeEmail()'
}