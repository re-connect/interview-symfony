<?php

namespace App\Controller;

use App\Entity\Beneficiary;
use App\Repository\BeneficiaryRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class BeneficiaryController extends AbstractController
{
    /**
     * @Route("/beneficiaries", name="beneficiaries", methods={"GET"})
     */
    public function index(BeneficiaryRepository $beneficiaryRepository): JsonResponse
    {
        $beneficiaries = $beneficiaryRepository->findAll();

        return $this->json($beneficiaries, 200, [], ['groups' => 'beneficiary:read']);
    }
}
