<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\DB;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    use Notifiable;
    use SoftDeletes;

    const ROLE_SELLER = 1;
    const ROLE_CUSTOMER = 2;

    protected $dates = ['deleted_at'];

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password', 'role'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    /**
     * @param array $attributes
     * @return mixed
     */
    public function fill(array $attributes)
    {
        !isset($attributes['password']) ? : $attributes['password'] = bcrypt($attributes['password']);
        return parent::fill($attributes);
    }

    public function updateWithProfile(array $data) : User
    {
        try {
            if (isset($data['photo'])) {
                UserProfile::uploadPhoto($data['photo']);
            }
            DB::beginTransaction();
            $this->fill($data);
            $this->save();
            UserProfile::saveProfile($this, $data);
            DB::commit();
        } catch (\Exception $e) {
            if (isset($data['photo'])) {
                UserProfile::deletePhoto($data['photo']);
            }
            DB::rollBack();
            throw $e;
        }
    }

    /**
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->id;
    }

    /**
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [
            'email' => $this->email,
            'name' => $this->name,
            'role' => $this->role,
            'profile' => [
                'has_photo' => $this->profile->photo ? true : false,
                'photo_url' => $this->profile->photo_url,
            ]
        ];
    }

    /**
     * @return HasOne
     */
    public function profile()
    {
        return $this->hasOne(UserProfile::class);
    }
}
