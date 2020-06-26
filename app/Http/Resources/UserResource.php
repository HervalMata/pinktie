<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'name' => $this->name,
            'email' => $this->email,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'profile' => [
                'has_photo' => $this->profile->photo ? true : false,
                'photo_url' => $this->profile->photo_url,
                'address' => $this->profile->address,
                'additional' => $this->profile->additional,
                'province' => $this->profile->province,
                'telefone' => $this->profile->telefone,
                'mobile' => $this->profile->mobile,
                'cpf' => $this->profile->cpf,
                /*'cidade' => $this->profile->cidade->cidade,
                'estado' => $this->profile->cidade->estado->estado*/
            ]
        ];
    }
}
