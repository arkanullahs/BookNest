<?php
namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CheckUser
{
    public function handle(Request $request, Closure $next)
    {
        $role = DB::select('SELECT r.name FROM roles r 
                           JOIN users u ON u.role_id = r.id 
                           WHERE u.id = ?', 
                           [$request->user()->id]);

        if (!$role || $role[0]->name !== 'user') {
            return response()->json(['message' => 'Regular user access only!'], 403);
        }

        return $next($request);
    }
}