<?php

namespace App\Entity;

use App\Repository\EditorRepository;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource; 
use ApiPlatform\Metadata\GetCollection; 
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put; 
use ApiPlatform\Metadata\Patch; 
use ApiPlatform\Metadata\Delete;

#[ApiResource(
    operations: [
    new GetCollection(), new Post(),
    new Get(),
    new Put(),
    new Patch(),
    new Delete()
    ]
)]

#[ORM\Entity(repositoryClass: EditorRepository::class)]
class Editor
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[ORM\Column(type: 'date')]
    private ?\DateTimeInterface $foundedAt = null;

    #[ORM\Column(length: 255)]
    private ?string $headquarters = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
    }

    public function getFoundedAt(): ?\DateTimeInterface
    {
        return $this->foundedAt;
    }

    public function setFoundedAt(\DateTimeInterface $foundedAt): static
    {
        $this->foundedAt = $foundedAt;

        return $this;
    }

    public function getHeadquarters(): ?string
    {
        return $this->headquarters;
    }

    public function setHeadquarters(string $headquarters): static
    {
        $this->headquarters = $headquarters;

        return $this;
    }
}
