<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Support\HtmlString;

class AccEmploye extends Notification
{

    protected string $username;
    protected string $password;

    /**
     * Create a new notification instance.
     */
    public function __construct(string $username, string $password)
    {
        $this->username = $username;
        $this->password = $password;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('Status Akun Kinerja SAC Kamu')
            ->greeting('Hai, Sobat!')
            ->line('Akun Kinerja SAC kamu sudah bisa diakses.')
            ->line('')
            ->lineIf(!empty($this->username), new HtmlString('<strong>Username:</strong> ' . $this->username))
            ->lineIf(!empty($this->password), new HtmlString('<strong>Password:</strong> ' . $this->password))
            ->line('')
            ->action('Buka Aplikasi', 'https://absensi-sac.sac-po.com')
            ->line('')
            ->line('*Email ini dikirim otomatis, mohon untuk tidak membalas.*')
            ->salutation('Tetap semangat dan sukses selalu — Tim Kami')
            ->success();
    }
}
