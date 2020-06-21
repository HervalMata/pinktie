<?php

use App\Models\Cidade;
use App\Models\User;
use App\Models\UserProfile;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Seeder;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;
use Faker\Factory as Faker;

class UsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker::create("pt_BR");
        File::deleteDirectory(UserProfile::photosPath(), true);
        factory(User::class, 1)->create([
            'email' => 'admin@user.com',
            'role' => User::ROLE_SELLER
        ])->each(function ($user) use ($faker) {
            Model::reguard();
            $user->updateWithProfile([
                'cidade_id' => Cidade::all()->random()->id,
                'address' => $faker->streetAddress,
                'number' => $faker->randomNumber(),
                'province' => $faker->region,
                'cpf' => $faker->cpf,
                'mobile' =>$faker->cellphone(true, true),
                'photo' => $this->getAdminPhoto(),
            ]);
            Model::unguard();
            $user->profile->save();
        });
        factory(User::class, 1)->create([
            'email' => 'customer@user.com',
            'role' => User::ROLE_CUSTOMER
        ])->each(function ($user) use ($faker) {
            Model::reguard();
            $user->updateWithProfile([
                'cidade_id' => Cidade::all()->random()->id,
                'address' => $faker->streetAddress,
                'number' => $faker->randomNumber(),
                'province' => $faker->region,
                'cpf' => $faker->cpf,
                'mobile' =>$faker->cellphone(true, true),
                'photo' => $this->getCustomerPhoto(),
            ]);
            Model::unguard();
            $user->profile->save();
        });
        factory(User::class, 50)->create([
            'role' => User::ROLE_CUSTOMER
        ]);
    }

    /**
     * @return UploadedFile
     */
    private function getAdminPhoto()
    {
        return new UploadedFile(
            storage_path('app/faker/users/1624_mod.png'),
            Str::random(16) . 'jpg'
        );
    }

    /**
     * @return UploadedFile
     */
    private function getCustomerPhoto()
    {
        return new UploadedFile(
            storage_path('app/faker/users/user_customer.png'),
            Str::random(16) . 'jpg'
        );
    }
}
