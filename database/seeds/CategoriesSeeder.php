<?php

use App\Models\Category;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class CategoriesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('categories')->insert([
            'category_name' => 'Laços',
            'slug' => Str::slug('Laços')
        ]);

        DB::table('categories')->insert([
            'category_name' => 'Tiaras',
            'slug' => Str::slug('Tiaras')
        ]);

        DB::table('categories')->insert([
            'category_name' => 'Viseiras',
            'slug' => Str::slug('Viseiras')
        ]);

        DB::table('categories')->insert([
            'category_name' => 'Faixas',
            'slug' => Str::slug('Faixas')
        ]);

        factory(Category::class, 6)->create();
    }
}
