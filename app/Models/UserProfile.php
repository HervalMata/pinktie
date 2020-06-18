<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class UserProfile extends Model
{
    const BASE_PATH = 'app/public';
    const DIR_USERS = 'users';
    const DIR_USER_PHOTO = self::DIR_USERS . '/photos';
    const USER_PHOTO_PATH = self::BASE_PATH . '/' . self::DIR_USER_PHOTO;

    protected $fillable = ['user_id', 'cidade_id', 'country', 'address', 'number', 'additional', 'province', 'cpf', 'photo', 'telefone', 'mobile'];

    /**
     * @return string
     */
    public static function photosPath()
    {
        $path = self::USER_PHOTO_PATH;
        return storage_path($path);
    }

    public static function uploadPhoto($photo)
    {
    }

    public static function saveProfile(User $param, array $data)
    {
    }

    public static function deletePhoto($photo)
    {
    }

    /**
     * @return BelongsTo
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * @return BelongsTo
     */
    public function cidade()
    {
        return $this->belongsTo(Cidade::class);
    }
}
