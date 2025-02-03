<?php

namespace App\Http\Middleware;

use App\Services\JwtService;
use App\Models\User;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class JwtMiddleware
{
    private $jwtService;

    public function __construct(JwtService $jwtService)
    {
        $this->jwtService = $jwtService;
    }

    public function handle(Request $request, Closure $next): Response
    {
        $token = $request->bearerToken();

        if (!$token || !$this->jwtService->validateToken($token)) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        // Extract user ID from token
        $payload = $this->jwtService->decodeToken($token);
        $user = User::find($payload['sub'] ?? null);

        if (!$user) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        // Attach user to request
        auth()->setUser($user);

        return $next($request);
    }
}
