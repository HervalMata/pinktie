<?php

namespace App\Http\Resources;

use App\Models\Cidade;
use App\Models\User;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $user = User::find($this->user_id);
        $cidade = Cidade::find($this->cidade_id);
        return [
            'user' => new UserResource($user),
            'name' => $this->name,
            'address' => $this->address,
            'cidade' => $cidade,
            'country' => $this->country,
            'number' => $this->number,
            'additional' => $this->additional,
            'province' => $this->province,
            'cep' => $this->cep,
            'cpf' => $this->cpf,
            'telefone' => $this->telefone,
            'mobile' => $this->mobile,
            'trasanctionID' => $this->transactionID,
            'orderStatus' => $this->orderStatus
        ];
    }
}
