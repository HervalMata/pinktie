<?php
/**
 * Created by PhpStorm.
 * User: Herval
 * Date: 22/06/2020
 * Time: 18:18
 */

namespace App\Payment\PagSeguro;


class CreditCard
{
    private $items;
    private $user;
    private $cardInfo;
    private $reference;

    /**
     * CreditCard constructor.
     * @param $items
     * @param $user
     * @param $cardInfo
     * @param $reference
     */
    public function __construct($items, $user, $cardInfo, $reference)
    {
        $this->items = $items;
        $this->user = $user;
        $this->cardInfo = $cardInfo;
        $this->reference = $reference;
    }

    /**
     * @return string
     * @throws \Exception
     */
    public function doPayment()
    {
        $creditCard = new \PagSeguro\Domains\Requests\DirectPayment\CreditCard();
        $creditCard->setReceiverEmail(env('PAGSEGURO_EMAIL'));
        $creditCard->setReference(base64_encode($this->reference));
        $creditCard->setCurrency('BRL');
        foreach ($this->items as $item)
        {
            $creditCard->addItems()->withParameters(
                $item['id'],
                $item['name'],
                $item['amount'],
                $item['price']
            );
        }
        $user = $this->user;
        $email = env('PAGSEGURO_EMAIL') === 'sandbox' ? 'test@sandbox.pagseguro.com.br' : $user->email;
        $creditCard->setSender()->setName($user->name);
        $creditCard->setSender()->setEmail($email);
        $creditCard->setSender()->setPhone()->withParameters(21, 981074535);
        $creditCard->setSender()->setDocument()->withParameters('CPF', '11111111111');
        $creditCard->setSender()->setHash($this->cardInfo['hash']);
        $creditCard->setSender()->setIp('127.0.2.0');
        $creditCard->setShipping()->setAddress()->withParameters(
            'Av. Brigadeiro Faria Lima',
            '1384',
            'Jardim Paulistano',
            '01452002',
            'São Paulo',
            'SP',
            'BRA',
            'apto. 114'
        );
        $creditCard->setBilling()->setAddress()->withParameters(
            'Av. Brigadeiro Faria Lima',
            '1384',
            'Jardim Paulistano',
            '01452002',
            'São Paulo',
            'SP',
            'BRA',
            'apto. 114'
        );
        $creditCard->setToken($this->cardInfo['card_token']);
        list($quantity, $installmentAmount) = explode('|', $this->cardInfo['installment']);
        $installmentAmount = number_format($installmentAmount, 2, '.', '');
        $creditCard->setInstallment()->withParameters($quantity, $installmentAmount);
        $creditCard->setHolder()->setBirthDate('01/10/1979');
        $creditCard->setHolder()->setName($this->cardInfo['card_name']);
        $creditCard->setHolder()->setPhone()->withParameters(21, 981074535);
        $creditCard->setHolder()->setDocument()->withParameters('CPF', '11111111111');
        $creditCard->setMode('DEFAULT');
        $result = $creditCard->register(\PagSeguro\Configuration\Configure::getAccountCredentials());
        return $result;
    }
}