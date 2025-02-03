<?php

namespace App\Services;

use DateTimeImmutable;
use Lcobucci\JWT\JwtFacade;
use Lcobucci\JWT\Signer\Hmac\Sha256;
use Lcobucci\JWT\Signer\Key\InMemory;
use Lcobucci\JWT\Validation\Constraint\SignedWith;
use Lcobucci\JWT\Validation\Constraint\StrictValidAt;
use Lcobucci\Clock\SystemClock;
use Exception;

class JwtService
{
    private $jwt;
    private $signer;
    private $key;

    public function __construct()
    {
        $this->jwt = new JwtFacade();
        $this->signer = new Sha256();
        $this->key = InMemory::base64Encoded(env('JWT_SECRET'));
    }

    public function generateToken($user): string
    {
        return $this->jwt->issue(
            $this->signer,
            $this->key,
            static fn ($builder, DateTimeImmutable $issuedAt) => $builder
                ->issuedBy(env('APP_URL'))
                ->relatedTo((string) $user->id)
                ->expiresAt($issuedAt->modify('+1 hour'))
        )->toString();
    }

    public function validateToken(string $token)
    {
        try {
            return $this->jwt->parse(
                $token,
                new SignedWith($this->signer, $this->key),
                new StrictValidAt(SystemClock::fromUTC())
            )->claims()->get('sub');
        } catch (Exception $e) {
            return null;
        }
    }
}
