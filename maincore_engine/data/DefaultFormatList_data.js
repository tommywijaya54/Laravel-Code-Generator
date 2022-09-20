const _DefaultFormatList = [
            {
                column : 'phone,*_phone',
                type : "string", 
                faker : "fake()->phoneNumber()"
            },
            {
                column : 'name,*_name',
                type : "string", 
                faker : "fake()->name()"
            },
            {
                column : 'address,*_address',
                type : "string", 
                faker : "fake()->address()"
            },
            {
                column : 'password',
                type : "string", 
                faker : "fake()->text(20)"
            },
            {
                column : 'note,*_note',
                type : "string", 
                faker : "fake()->text(50)"
            },
            {
                column : 'date,*_date,day',
                type : "date", 
                faker : "fake()->date()"
            },
            {
                column : 'email,*_email',
                type : "email", 
                faker : "fake()->unique()->safeEmail()"
            },
            {
                column : '*_id',
                type : "integer", 
                faker : "fake()->numberBetween($min = 1, $max = 10)"
            }
        ];
