<?php

declare(strict_types=1);

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Contracts\HttpClient\HttpClientInterface;use Symfony\UX\Turbo\TurboBundle;use Symfony\UX\Turbo\TurboStreamResponse;

final class AiChatController extends AbstractController
{
    public function __construct(
        private HttpClientInterface $client,
        private string $openaiApiKey,
    ) {}

    #[Route('/ai-chat-bot', name: 'ai_chat_bot', methods: ['POST', 'GET'])]
    public function chatBot(Request $request): Response
    {
        //        dd($request->getMethod());

        if ($request->getMethod() === 'POST') {
            $message = $request->request->get('user-query');

            // Enable this code when you have a valid OpenAI API key and want to make actual requests
            /* $response = $this->client->request('POST', 'https://api.openai.com/v1/chat/completions', [
             * 'headers' => [
             * 'Authorization' => 'Bearer ' . $this->openaiApiKey,
             * 'Content-Type' => 'application/json',
             * ],
             * 'json' => [
             * 'model' => 'gpt-4o-mini',
             * 'messages' => [
             * ['role' => 'user', 'content' => 'Hell0 how are?'],
             * ],
             * ],
             * ]);
             *
             * $data = $response->toArray();
             *
             * return $data['choices'][0]['message']['content'] ?? '';*/
            $request->setRequestFormat(TurboBundle::STREAM_FORMAT);
            return $this->render('turbo/agent-response.html.twig',
                ['response' => 'I am good'],
                new TurboStreamResponse());
        }

        return $this->render('ai-chat-bot.html.twig');
    }
}
