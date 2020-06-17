<?php
/**
 * Created by PhpStorm.
 * User: Herval
 * Date: 17/06/2020
 * Time: 13:35
 */

namespace App\Listeners;


use App\Events\UserCreatedEvent;
use App\Notifications\MyResetPassword;
use Illuminate\Support\Facades\Password;

class SendEmailToDefinedPassword
{
    /**
     * SendEmailToDefinedPassword constructor.
     */
    public function __construct()
    {
    }

    /**
     * @param UserCreatedEvent $event
     */
    public function handle(UserCreatedEvent $event)
    {
        $user = $event->getUser();
        $token = Password::broker()->createToken($user);
        $user->notify(new MyResetPassword($token));
        //$user->sendPasswordResetNotification($token);
    }
}
