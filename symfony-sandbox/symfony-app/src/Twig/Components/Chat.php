<?php

namespace App\Twig\Components;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\UX\LiveComponent\Attribute\AsLiveComponent;
use Symfony\UX\LiveComponent\Attribute\LiveAction;
use Symfony\UX\LiveComponent\Attribute\LiveArg;
use Symfony\UX\LiveComponent\DefaultActionTrait;

#[AsLiveComponent]
final class Chat extends AbstractController
{
    use DefaultActionTrait;

    public array $messages = ['Hello from chat bot'];

    public string $chat;

    #[LiveAction]
    public function submitMessage(#[LiveArg]string $message): void {
            $this->messages[] = $message;
    }


    #[LiveAction]
    public function process(): string {
        return $this->chat;
    }
}
