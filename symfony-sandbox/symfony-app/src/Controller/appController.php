<?php

declare(strict_types=1);

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class appController extends AbstractController
{
    #[Route('/app',
        condition: "request.headers.get('User-Agent') matches '/Chrome/i'",
        env: 'dev'
    )]
    public function index(): Response
    {
        return $this->render('base.html.twig');
    }
}
