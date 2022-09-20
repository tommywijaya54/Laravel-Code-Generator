<?php

class EntityCore
{
    public $DBData = array(
        'Entity' =>
        array(
            0 =>
            array(
                'TableName' => 'User',
                'Column' =>
                array(
                    0 =>
                    array(
                        'Label' => 'name',
                    ),
                    1 =>
                    array(
                        'Label' => 'email',
                    ),
                    2 =>
                    array(
                        'Label' => 'password',
                    ),
                ),
                'SeederData' =>
                array(
                    0 =>
                    array(
                        0 => 'Tommy Saputra Wijaya',
                        1 => 'tommy.wijaya54@yahoo.com',
                        2 => '$2y$10$5jVX3q8h6GnAqwN9KR9sVekmwYZQh0daV5.i65bzdXJMRYi/mtMZi',
                    ),
                    1 =>
                    array(
                        0 => 'Eko Saputra Wijaya',
                        1 => 'eko.saputra.wijaya@gmail.com',
                        2 => '$2y$10$5jVX3q8h6GnAqwN9KR9sVekmwYZQh0daV5.i65bzdXJMRYi/mtMZi',
                    ),
                    2 =>
                    array(
                        0 => 'Shinta Purnama Sari',
                        1 => 'shinta.purnama.sari@outlook.com',
                        2 => '$2y$10$5jVX3q8h6GnAqwN9KR9sVekmwYZQh0daV5.i65bzdXJMRYi/mtMZi',
                    ),
                    3 =>
                    array(
                        0 => 'Dewi Puspita Sari',
                        1 => 'dewi.puspita.sari@email.com',
                        2 => '$2y$10$5jVX3q8h6GnAqwN9KR9sVekmwYZQh0daV5.i65bzdXJMRYi/mtMZi',
                    ),
                ),
            ),
        ),
    );
}


<?php

use App\Models\MainCore;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public $DBData = array(
        'Entity' =>
        array(
            0 =>
            array(
                'TableName' => 'user_test',
                'Column' =>
                array(
                    array(
                        'Label' => 'name',
                    ),
                    array(
                        'Label' => 'email',
                    ),
                    array(
                        'Label' => 'password',
                    ),
                    array(
                        'Label' => 'role',
                    ),
                ),
                'SeederData' =>
                array(
                    0 =>
                    array(
                        0 => 'Tommy Saputra Wijaya',
                        1 => 'tommy.wijaya54@yahoo.com',
                        2 => '$2y$10$5jVX3q8h6GnAqwN9KR9sVekmwYZQh0daV5.i65bzdXJMRYi/mtMZi',
                    ),
                    1 =>
                    array(
                        0 => 'Eko Saputra Wijaya',
                        1 => 'eko.saputra.wijaya@gmail.com',
                        2 => '$2y$10$5jVX3q8h6GnAqwN9KR9sVekmwYZQh0daV5.i65bzdXJMRYi/mtMZi',
                    ),
                    2 =>
                    array(
                        0 => 'Shinta Purnama Sari',
                        1 => 'shinta.purnama.sari@outlook.com',
                        2 => '$2y$10$5jVX3q8h6GnAqwN9KR9sVekmwYZQh0daV5.i65bzdXJMRYi/mtMZi',
                    ),
                    3 =>
                    array(
                        0 => 'Dewi Puspita Sari',
                        1 => 'dewi.puspita.sari@email.com',
                        2 => '$2y$10$5jVX3q8h6GnAqwN9KR9sVekmwYZQh0daV5.i65bzdXJMRYi/mtMZi',
                    ),
                ),
            ),
        ),
    );

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        foreach ($this->DBData['Entity'] as $entity) {
            $GLOBALS['columns'] = $entity['Column'];
            Schema::create($entity['TableName'], function (Blueprint $table) {
                $table->id();
                foreach ($GLOBALS['columns'] as $column) {
                    $table->string($column['Label']);
                }
                $table->timestamps();
            });
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        foreach ($this->DBData['Entity'] as $entity) {
            Schema::dropIfExists($entity['TableName']);
        }
    }
};

