<?php

namespace App\Controller;

use App\Repository\BeneficiaryRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;
use Symfony\Component\Security\Core\Exception\AuthenticationException;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Exception\TokenNotFoundException;
use Symfony\Component\Security\Core\Exception\BadCredentialsException;
use App\Security\TokenAuthenticator;

class BeneficiaryController extends AbstractController
{
    /**
     * @Route("/beneficiaries", name="beneficiaries", methods={"GET"})
     */
    public function index(BeneficiaryRepository $beneficiaryRepository, TokenStorageInterface $tokenStorage, TokenAuthenticator $tokenAuthenticator): JsonResponse
    {
        $token = $tokenStorage->getToken();

        if (!$token instanceof TokenInterface) {
            throw new TokenNotFoundException('No token found');
        }

        try {
            $tokenAuthenticator->authenticateToken($token, $tokenStorage);
        } catch (AuthenticationException $e) {
            throw new BadCredentialsException('Invalid token');
        }

        $beneficiaries = $beneficiaryRepository->findAll();

        return $this->json($beneficiaries, 200, [], ['groups' => 'beneficiary:read']);
    }
}
