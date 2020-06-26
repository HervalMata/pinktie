<?php

use App\Models\Category;
use Carbon\Carbon;
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
            'slug' => Str::slug('Laços'),
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);

        DB::table('categories')->insert([
            'category_name' => 'Tiaras',
            'slug' => Str::slug('Tiaras'),
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);

        DB::table('categories')->insert([
            'category_name' => 'Viseiras',
            'slug' => Str::slug('Viseiras'),
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);

        DB::table('categories')->insert([
            'category_name' => 'Faixas',
            'slug' => Str::slug('Faixas'),
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);

        factory(Category::class, 6)->create();
    }
}
