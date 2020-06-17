<?php

use App\Models\User;
use App\Models\UserProfile;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Seeder;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;

class UsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        File::deleteDirectory(UserProfile::photosPath(), true);
        factory(User::class, 1)->create([
            'email' => 'admin@user.com',
            'role' => User::ROLE_SELLER
        ])->each(function ($user) {
            Model::reguard();
            $user->updateWithProfile([
                'photo' => $this->getAdminPhoto(),
            ]);
            Model::unguard();
            $user->profile->save();
        });
        factory(User::class, 1)->create([
            'email' => 'customer@user.com',
            'role' => User::ROLE_CUSTOMER
        ])->each(function ($user) {
            Model::reguard();
            $user->updateWithProfile([
                'photo' => $this->getCustomerPhoto(),
            ]);
            Model::unguard();
            $user->profile->save();
        });
        factory(User::class, 50)->create()->each(function ($user) {
            $user->profile->save();
        });
    }

    /**
     * @return UploadedFile
     */
    private function getAdminPhoto()
    {
        return new UploadedFile(
            storage_path('app/faker/users/1624_mod.jpg'),
            Str::random(16) . 'jpg'
        );
    }

    /**
     * @return UploadedFile
     */
    private function getCustomerPhoto()
    {
        return new UploadedFile(
            storage_path('app/faker/users/1624_mod.jpg'),
            Str::random(16) . 'jpg'
        );
    }
}
