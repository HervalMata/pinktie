<?php
/**
 * Created by PhpStorm.
 * User: Herval
 * Date: 17/06/2020
 * Time: 13:28
 */

namespace App\Events;


use App\Models\User;

class UserCreatedEvent
{
    /**
     * @var User
     */
    private $user;

    /**
     * UserCreatedEvent constructor.
     * @param User $user
     */
    public function __construct(User $user)
    {
        $this->user = $user;
    }

    /**
     * @return User
     */
    public function getUser(): User
    {
        return $this->user;
    }
}
