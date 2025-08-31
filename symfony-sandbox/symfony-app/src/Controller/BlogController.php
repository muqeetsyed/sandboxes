<?php

declare(strict_types=1);

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class BlogController extends AbstractController
{

    #[Route('/blog/list', name: 'blog_list')]
    public function list(): Response
    {
        return new Response('Blog list!');
    }

    #[Route('/share/{token}', name: 'share', requirements: ['token' => '.+'])]
    public function show(string $token): Response
    {
        return new Response("Blog shw! $token");
    }
}

enum OrderStatusEnum: string {
    case PENDING = 'pending';
    case APPROVED = 'approved';
    case REJECTED = 'rejected';
}
