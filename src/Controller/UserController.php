<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\UserRepository;
use PhpParser\Node\Stmt\TryCatch;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;


/**
 * @Route("/user", name="user.")
 */


class UserController extends AbstractController
{
    // Route pour créer un user via Postman par exemple
    /**
     * @Route("/create", name="create")
     * @return $response
     */
    public function createUser(Request $request, UserPasswordEncoderInterface $passwordEncoder)
    {


        $user = new User();
        $em = $this->getDoctrine()->getManager();

        try {
            $user->setEmail('marcanmalas@gmail.com');
            $user->setPassword(
                $passwordEncoder->encodePassword($user, '280690')
            );
            $user->setRoles(['ROLE_USER']);

            $em->persist($user);
            $em->flush();

            $response = new JsonResponse(['message' => "User added to the database"]);
            return $response;
        } catch (\Exception $e) {

            $errorMessage = $e->getMessage();

            $response = new JsonResponse(['message' => $errorMessage]);
            return $response;
        }
    }

    // Route pour delete un user via Postman par exemple

    /**
     * @Route("/delete/{id}", name="delete")
     * @return $response
     */

    public function deleteUser($id, UserRepository $userRepository)
    {

        $em = $this->getDoctrine()->getManager();

        try {
            $post = $userRepository->find($id);

            $em->remove($post);
            $em->flush();

            $response = new JsonResponse(['message' => "User deleted from the database"]);
            return $response;
        } catch (\Exception $e) {

            $errorMessage = $e->getMessage();

            $response = new JsonResponse(['message' => $errorMessage]);
            return $response;
        }
    }
}
