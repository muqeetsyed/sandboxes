<?php

declare(strict_types=1);

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Contracts\HttpClient\HttpClientInterface;

class AiChatController extends AbstractController
{

    public function __construct(
        private HttpClientInterface $client,
        private string $openaiApiKey
    ) {
    }

    #[Route('/ai-chat-bot', name: 'ai_chat_bot', methods: ['POST','GET'])]
    public function chatBot(Request $request): Response
    {
//        dd($request->getMethod());

        if($request->getMethod() === 'POST') {
            $message = $request->request->get('user-query');


            $response = $this->client->request('POST', 'https://api.openai.com/v1/chat/completions', [
                'headers' => [
                    'Authorization' => 'Bearer ' . $this->openaiApiKey,
                    'Content-Type' => 'application/json',
                ],
                'json' => [
                    'model' => 'gpt-4o-mini',
                    'messages' => [
                        ['role' => 'user', 'content' => "Hell0 how are?"],
                    ],
                ],
            ]);

            $data = $response->toArray();

            return $data['choices'][0]['message']['content'] ?? '';

        }

        return $this->render('ai-chat-bot.html.twig');
    }
}
