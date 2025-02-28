<?php

namespace App\Services;

use Illuminate\Auth\GuardHelpers;
use Illuminate\Contracts\Auth\Guard;
use Illuminate\Contracts\Auth\UserProvider;
use Illuminate\Http\Request;
use App\Models\User;

class JwtGuard implements Guard
{
    use GuardHelpers;

    protected $request;

    public function __construct(UserProvider $provider, Request $request)
    {
        $this->provider = $provider;
        $this->request = $request;
    }

    public function user()
    {
        if ($this->user) {
            return $this->user;
        }

        $token = $this->request->bearerToken();
        if (!$token) {
            return null;
        }

        $jwtService = app(JwtService::class);
        $payload = $jwtService->validateToken($token);

        if (!$payload || !isset($payload['user_id'])) {
            return null;
        }

        return $this->user = User::find($payload['user_id']);
    }

    public function validate(array $credentials = [])
    {
        return false; // JWT authentication does not validate credentials in the traditional way
    }
}
