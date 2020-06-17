<?php
/**
 * Created by PhpStorm.
 * User: Herval
 * Date: 17/06/2020
 * Time: 13:49
 */

namespace App\Notifications;


use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Support\Facades\Lang;

class MyResetPassword extends Notification
{
    public function __construct()
    {
    }

    public function via($notifiable)
    {
        return ['mail'];
    }

    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->subject(Lang::get('Notificação para recuperar senha'))
            ->line(Lang::get('Você está recebendo este email porquê nós recebemos uma requisição para recuperar a senha da sua conta.'))
            ->action(Lang::get('Recuperar Senha'), url(config('app.url').route('password.reset', $this->token, false)))
            ->line(Lang::get('Se você não requereu a recuperação da senha, nenhuma ação é requerida.'));
    }
}
