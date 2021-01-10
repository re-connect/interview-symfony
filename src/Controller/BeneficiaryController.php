<?php

namespace App\Controller;

use App\Entity\Beneficiary;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class BeneficiaryController extends AbstractController
{
    /**
     * @Route("/beneficiary", name="beneficiary")
     */
    public function index(): Response
    {
        $beneficiaries = $this->getDoctrine()->getRepository(Beneficiary::class)->findAll();
        return $this->json($beneficiaries);
    }

    /**
     * @Route("/beneficiary/add", name="add_beneficiary")
     */
    public function add(Request $request): Response
    {
        $entityManager = $this->getDoctrine()->getManager();

        if ($request->request->count() > 0) {
            $beneficiary = new Beneficiary();
            $beneficiary->setName($request->request->get('name'));
            $entityManager->persist($beneficiary);
            $entityManager->flush();
            return new Response("Saved new beneficiary named " . $beneficiary->getName());
        }
    }

    /**
     * @Route("/beneficiary/delete/${id}", name="delete_beneficiary")
     */
    public function delete(Beneficiary $beneficiary): Response
    {
        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->remove($beneficiary);
        $entityManager->flush();

        return new Response("Deleted beneficiary named " . $beneficiary->getName());
    }
}
