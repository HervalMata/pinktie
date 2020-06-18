<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\CustomerRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CustomerController extends Controller
{
    /**
     * @param CustomerRequest $request
     * @return array
     */
    public function store(CustomerRequest $request)
    {
        $data = $request->all();
        $token = $request->token;
        $data['photo'] = $data['photo']??null;
        $user = User::createCustomer($data);
        return [ 'token' => Auth::guard('api')->login($user)];
    }
}
