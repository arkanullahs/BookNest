<?php
namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CheckAdmin
{
    public function handle(Request $request, Closure $next)
    {
        $role = DB::select('SELECT r.name FROM roles r 
                           JOIN users u ON u.role_id = r.id 
                           WHERE u.id = ?', 
                           [$request->user()->id]);

        if (!$role || $role[0]->name !== 'admin') {
            return response()->json(['message' => 'Admin access only!'], 403);
        }

        return $next($request);
    }
}