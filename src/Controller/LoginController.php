<?php

// src/Controller/LoginController.php

namespace App\Controller;

use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Security\Core\Exception\BadCredentialsException;
use Symfony\Component\HttpFoundation\Request;
use App\Entity\User;
use App\Repository\UserRepository;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class LoginController extends AbstractController
{
    /**
     * @Route("/login", name="login", methods={"POST"})
     */
    public function login(Request $request, UserRepository $userRepository, UserPasswordHasherInterface $passwordHasher)
    {
        $data = json_decode($request->getContent(), true);

        $user = $userRepository->findOneBy(['email' => $data['email']]);

        if (!$user instanceof User) {
            throw new BadCredentialsException();
        }

        $isValid = $passwordHasher->isPasswordValid($user, $data['password']);

        if (!$isValid) {
            throw new BadCredentialsException();
        }

        return $this->json([
            'username' => $user->getUsername(),
            'token' => 'your_token_here', // replace with actual token generation logic
        ]);
    }
}
