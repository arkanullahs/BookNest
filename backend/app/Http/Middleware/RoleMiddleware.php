<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RoleMiddleware
{
    public function handle(Request $request, Closure $next, $role): Response
{
    // Ensure user is authenticated
    $user = auth()->user();

    if (!$user) {
        return response()->json(['message' => 'Unauthorized - No user found'], 403);
    }

    // Check if the user's role matches the required role
    if ($user->role !== $role) {
        return response()->json(['message' => 'Unauthorized - Insufficient permissions'], 403);
    }

    return $next($request);
}

}

