<?php

namespace App\Entity;

use App\Repository\MessageRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: MessageRepository::class)]
class Message
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private null|int $id = null;

    #[ORM\Column]
    private null|\DateTimeImmutable $createdAt = null;

    #[ORM\Column]
    private null|int $userId = null;

    #[ORM\Column(length: 255, nullable: true)]
    private null|string $content = null;

    #[ORM\ManyToOne(inversedBy: 'messages')]
    #[ORM\JoinColumn(nullable: false)]
    private null|Conversation $messages = null;

    public function getId(): null|int
    {
        return $this->id;
    }

    public function getCreatedAt(): null|\DateTimeImmutable
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeImmutable $createdAt): static
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    public function getUserId(): null|int
    {
        return $this->userId;
    }

    public function setUserId(int $userId): static
    {
        $this->userId = $userId;

        return $this;
    }

    public function getContent(): null|string
    {
        return $this->content;
    }

    public function setContent(null|string $content): static
    {
        $this->content = $content;

        return $this;
    }

    public function getMessages(): null|Conversation
    {
        return $this->messages;
    }

    public function setMessages(null|Conversation $messages): static
    {
        $this->messages = $messages;

        return $this;
    }
}
