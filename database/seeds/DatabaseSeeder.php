<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(UsersSeeder::class);
        $this->call(CategoriesSeeder::class);
        $this->call(ColorSeeder::class);
        $this->call(MaterialSeeder::class);
        $this->call(ProductsSeeder::class);
        $this->call(ProductPhotosSeeder::class);
        $this->call(EstadoSeeder::class);
        $this->call(CidadeSeeder::class);
    }
}
