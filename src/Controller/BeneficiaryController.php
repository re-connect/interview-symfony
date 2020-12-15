<?php

namespace App\Controller;

use App\Entity\Beneficiary;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;


/**
 * @Route("/beneficiary", name="beneficiary.")
 */

class BeneficiaryController extends AbstractController
{
    /**
     * @Route("/", name="index")
     */
    public function index()
    {
        return $this->render('beneficiary/index.html.twig', [
            'controller_name' => 'BeneficiaryController',
        ]);
    }


    /**
     * @Route("/create", name="create")
     * @return $response
     */
    public function createUser(Request $request)
    {


        $beneficiary = new Beneficiary();
        $beneficiary->setName('Marco');

        // $user->setRoles(['ROLE_USER']);
        // $user->setRoles(['ROLE_USER']);

        $em = $this->getDoctrine()->getManager();
        $em->persist($beneficiary);
        $em->flush();

        $response = new JsonResponse(['message' => "Beneficiary added to the database",]);
        return $response;
    }

    /**
     * @Route("/delete/{id}", name="delete")
     * @return $response
     */

    public function deleteUser($id, UserRepository $userRepository)
    {

        $post = $userRepository->find($id);

        // Entity Manager - Ce qui va nous permettre de faire nos query.
        $em = $this->getDoctrine()->getManager();

        $em->remove($post);
        $em->flush();

        $response = new JsonResponse(['message' => "User deleted from the database"]);
        return $response;
    }
}
