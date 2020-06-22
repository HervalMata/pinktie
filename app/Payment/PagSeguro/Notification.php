<?php
/**
 * Created by PhpStorm.
 * User: Herval
 * Date: 22/06/2020
 * Time: 18:04
 */

namespace App\Payment\PagSeguro;


class Notification
{
    public function getTransaction()
    {
        if (!\PagSeguro\Helpers\Xhr::hasPost()) throw new \InvalidArgumentException($_POST);
            $response = \PagSeguro\Services\Transactions\Notification::check(
                \PagSeguro\Configuration\Configure::getAccountCredentials()
            );
            return $response;
    }
}
