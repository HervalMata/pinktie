<?php

namespace App\Http\Resources;

use App\Models\Cidade;
use Illuminate\Http\Resources\Json\JsonResource;

class UserOrderResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $cidade = Cidade::find($this->cidade_id);
        return [
            'products' => $this->products,
            'totalPrice' => (float) $this->totalPrice,
            'address' => $this->address,
            'cidade' => $cidade,
            'country' => $this->country,
            'number' => (int) $this->number,
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
