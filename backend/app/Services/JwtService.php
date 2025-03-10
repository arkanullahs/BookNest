<?php

namespace App\Services;

use DateTimeImmutable;
use Lcobucci\JWT\Configuration;
use Lcobucci\JWT\Signer\Hmac\Sha256;
use Lcobucci\JWT\Signer\Key\InMemory;
use Lcobucci\JWT\Validation\Constraint\SignedWith;
use Exception;

class JwtService
{
    private $config;

    public function __construct()
    {
        $this->config = Configuration::forSymmetricSigner(
            new Sha256(),
            InMemory::base64Encoded(env('JWT_SECRET'))
        );
    }

    public function generateToken($user): string
{
    $now = new DateTimeImmutable();
    
    $token = $this->config->builder()
        ->issuedBy(env('APP_URL'))
        ->identifiedBy(uniqid())
        ->issuedAt($now)
        ->canOnlyBeUsedAfter($now)
        ->expiresAt($now->modify('+1 hour'))
        ->withClaim('user_id', $user->id)
        ->withClaim('role', $user->role) // ✅ Include role
        ->getToken($this->config->signer(), $this->config->signingKey());

    return $token->toString();
}


    public function validateToken(string $token)
{
    try {
        $token = $this->config->parser()->parse($token);

        $constraint = new SignedWith(
            $this->config->signer(),
            $this->config->signingKey()
        );

        $this->config->validator()->assert($token, $constraint);

        $now = new DateTimeImmutable();
        if ($token->isExpired($now)) {
            return null;
        }

        return [
            'user_id' => $token->claims()->get('user_id'), 
            'role' => $token->claims()->get('role') // ✅ Include role in claims
        ];
    } catch (Exception $e) {
        return null;
    }
}

}