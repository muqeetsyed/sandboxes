<?php

namespace App\Twig\Components;

use Symfony\UX\LiveComponent\Attribute\AsLiveComponent;
use Symfony\UX\LiveComponent\Attribute\LiveAction;
use Symfony\UX\LiveComponent\Attribute\LiveArg;
use Symfony\UX\LiveComponent\DefaultActionTrait;

#[AsLiveComponent]
final class Blog
{
    use DefaultActionTrait;

    public array $messages = ['default message1'];


    #[LiveAction]
    public function submitMessage(#[LiveArg]string $message): void {
            $this->messages[] = $message;
    }
}
