let AdditionalFormatList = {
    'time_slot'         : 'string:fake()->time()',
    'subject'           : 'string:fake()->sentence(3)',
    'classroom'         : 'string:fake()->sentence(1)',
    'duration'          : 'string:fake()->randomElement(["1","1.5","2"])',
    'reference'         : 'string:fake()->text(50)',
    'cashback'          : 'integer:fake()->randomElement([100000,280000,300000])',
    'status'            : 'string:fake()->text(10)',
    'remarks'           : 'string:fake()->text(10)',
    'open_date'         : 'date:fake()->date()',
    'type'              : 'string:fake()->sentence(4)',
    'health_condition'  : 'string:fake()->sentence(4)',
}

addToAdditionalList([
        "school_type:string:fake()->randomElement(['International','National','International-National'])",
        "color_code:string:fake()->randomElement(['blue','yellow','red'])",
		"city:string:fake()->randomElement(['Jakarta Barat','Jakarta Timur','Jakarta Selatan'])",
        "label:string:fake()->randomElement(['Discount 30%','Grand Opening Discount'])",
		"discount_value:integer:fake()->randomElement(['30%','-200000'])",
        "blacklist:string:fake()->randomElement(['true','false'])",

		"nik:string:fake()->text()",
		"roles:string:fake()->text()",
		"expense_type:string:fake()->text()",
		"description:string:fake()->text()",

		"amount:integer:fake()->numberBetween($min = 1500, $max = 6000)",
		"qty:integer:fake()->randomDigitNotNull()",
		"cost:integer:fake()->numberBetween($min = 1500, $max = 6000)",
		"price:integer:fake()->numberBetween($min = 1500, $max = 6000)",

        "approve_by:string:fake()->text()",
		
        "bank_account_name:string:fake()->text()",
		"virtual_account_name:string:fake()->text()",
		
		
        "grade:string:fake()->text()",
		
        "exit_reason:string:fake()->text()",
        
        "level:string:fake()->randomElement(['Discount 30%','Grand Opening Discount'])",
		
        
        "week:string:fake()->text()",
		"label:string:fake()->text()",
		"charges:string:fake()->text()",
		"discount_amount:string:fake()->text()",
		"school:string:fake()->text()",
		"role_title:string:fake()->text()",
		"title:string:fake()->text()",
		"action:string:fake()->text()"
]);

