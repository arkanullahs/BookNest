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

    if (!$token) {
        return response()->json(['message' => 'Unauthorized - No token provided'], 401);
    }

    $payload = $this->jwtService->validateToken($token);

if (!$payload || !isset($payload['user_id'])) {
    return response()->json(['message' => 'Unauthorized - Invalid token'], 401);
}

$user = User::find($payload['user_id']); // ✅ Correctly extract user

if (!$user) {
    return response()->json(['message' => 'Unauthorized - User not found'], 401);
}

// ✅ Attach user to request
auth()->setUser($user);
$request->merge(['user' => $user]);

return $next($request);

}

}

