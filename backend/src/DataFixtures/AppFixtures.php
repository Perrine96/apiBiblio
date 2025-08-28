<?php

namespace App\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use App\Entity\Author;
use App\Entity\Book;
use App\Entity\Editor;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        // Création des éditeurs
        $editor1 = new Editor(); 
        $editor1->setName('Gallimard'); 
        $editor1->setHeadquarters('Paris, France'); 
        $editor1->setFoundedAt(new \DateTime('1911-05-31'));
        $manager->persist($editor1);
        
        $editor2 = new Editor(); 
        $editor2->setName('Penguin Books'); 
        $editor2->setHeadquarters('Londres, Royaume-Uni'); 
        $editor2->setFoundedAt(new \DateTime('1935-07-30'));
        $manager->persist($editor2);
        
        $editor3 = new Editor(); 
        $editor3->setName('Bloomsbury'); 
        $editor3->setHeadquarters('Londres, Royaume-Uni'); 
        $editor3->setFoundedAt(new \DateTime('1986-01-01'));
        $manager->persist($editor3);

        // Création des auteurs
        $author1 =new Author(); $author1->setFirstName('Antoine'); $author1->setLastName('de Saint Exupéry'); $author1->setCountry('France'); 
        $manager->persist($author1);
        $author2 = new Author(); $author2->setFirstName('George'); $author2->setLastName('Orwell'); $author2->setCountry('Royaume-Uni'); 
        $manager->persist($author2);
        $author3 = new Author(); $author3->setFirstName('Joanne'); $author3->setLastName('Rowling'); $author3->setCountry('Royaume-Uni'); 
        $manager->persist($author3);

        // Création des livres
        $book1 = new Book();
        $book1->setTitle('Le Petit Prince');
        $book1->setDescription('L\'histoire d\'un petit prince qui voyage de planète en planète.');
        $book1->setPages(96);
        $book1->setImage('https://m.media-amazon.com/images/I/71IF1ngy57L._SL1500_.jpg');
        $book1->setAuthor($author1);
        $manager->persist($book1);
        $book2 = new Book();
        $book2->setTitle('1984');
        $book2->setDescription('Un roman dystopique sur la surveillance de masse.');
        $book2->setPages(368);
        $book2->setImage('https://m.media-amazon.com/images/I/81ubGDY08IS._SL1500_.jpg');
        $book2->setAuthor($author2);
        $manager->persist($book2);
        $book3 = new Book();
        $book3->setTitle('Harry Potter à l\'école des sorciers');
        $book3->setDescription('Le début des aventures du célèbre sorcier.');
        $book3->setPages(320);
        $book3->setImage('https://m.media-amazon.com/images/I/915ZpZz-9ML._SL1500_.jpg');
        $book3->setAuthor($author3);
        $manager->persist($book3);

        $manager->flush();
    }
}
